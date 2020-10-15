import React, { ReactNode } from 'react'
import { Text, Animated } from 'react-native'
import styled from 'styled-components/native'

const VIEW_MORE_HEIGHT = 35

type Props = {
  onReady?: () => void
  numberOfLines: number
  renderTruncatedFooter?: (func: Function) => ReactNode
  renderRevealedFooter?: (func: Function) => ReactNode
}

const Button = styled(Text)`
  color: #888;
  margin-top: 5px;
`

const BottomView = styled.View`
  height: 40px;
`

export default class ReadMore extends React.Component<Props> {
  _isMounted!: boolean
  _text!: Text

  state = {
    measured: false,
    shouldShowReadMore: false,
    showAllText: false,
    fullHeight: 0,
    height: new Animated.Value(0),
    limitedHeight: 0
  }

  async componentDidMount() {
    this._isMounted = true
    await nextFrameAsync()

    if (!this._isMounted) {
      return
    }

    // Get the height of the text with no restriction on number of lines
    const fullHeight = await measureHeightAsync(this._text)
    this.setState({ measured: true })
    await nextFrameAsync()

    if (!this._isMounted) {
      return
    }

    // Get the height of the text now that number of lines has been set
    const limitedHeight = await measureHeightAsync(this._text)
    if (fullHeight > limitedHeight) {
      this.state.height.setValue(limitedHeight + VIEW_MORE_HEIGHT)
      this.setState({ shouldShowReadMore: true }, () => {
        this.props.onReady && this.props.onReady()
      })
      this.setState({
        fullHeight: fullHeight + VIEW_MORE_HEIGHT,
        limitedHeight: limitedHeight + VIEW_MORE_HEIGHT
      })
    } else {
      this.props.onReady && this.props.onReady()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    let {
      measured,
      shouldShowReadMore,
      limitedHeight,
      showAllText,
      height
    } = this.state
    let { numberOfLines } = this.props
    return (
      <Animated.View style={{ height: limitedHeight ? height : undefined }}>
        <Text
          numberOfLines={measured && !showAllText ? numberOfLines : 0}
          ref={(text: Text) => {
            this._text = text
          }}
        >
          {this.props.children}
        </Text>
        {shouldShowReadMore && (
          <BottomView>{this._maybeRenderReadMore()}</BottomView>
        )}
      </Animated.View>
    )
  }

  _handlePressReadMore = () => {
    this.setState({ showAllText: true }, () => {
      Animated.spring(this.state.height, {
        toValue: this.state.fullHeight
      }).start()
    })
  }

  _handlePressReadLess = () => {
    this.setState({ showAllText: false }, () => {
      Animated.spring(this.state.height, {
        toValue: this.state.limitedHeight
      }).start()
    })
  }

  _maybeRenderReadMore(): ReactNode {
    let { shouldShowReadMore, showAllText } = this.state

    if (shouldShowReadMore && !showAllText) {
      if (this.props.renderTruncatedFooter) {
        return this.props.renderTruncatedFooter(this._handlePressReadMore)
      }

      return <Button onPress={this._handlePressReadMore}>Read more</Button>
    } else if (shouldShowReadMore && showAllText) {
      if (this.props.renderRevealedFooter) {
        return this.props.renderRevealedFooter(this._handlePressReadLess)
      }

      return <Button onPress={this._handlePressReadLess}>Hide</Button>
    }
  }
}

function measureHeightAsync(component: Text): Promise<number> {
  return new Promise(resolve => {
    component.measure((x: number, y: number, w: number, h: number) => {
      resolve(h)
    })
  })
}

function nextFrameAsync() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()))
}
