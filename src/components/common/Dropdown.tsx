import React from 'react'
import {
  StyleProp,
  SafeAreaView,
  Dimensions,
  Text as RNText,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import styled from 'styled-components/native'
import Text from './Text'
import Dialog, { FadeAnimation } from 'react-native-popup-dialog'
import IconCheck from '../../assets/icon/icon-check-circle.svg'
import ArrowDown from '../../assets/icon/icon-arrow-down.svg'
import ArrowDownPurple from '../../assets/icon/icon-arrow-down-purple.svg'
import { fonts } from '../../theme/fonts'
import { colors } from '../../theme/colors'

type Props = {
  value: string
  label: string
  icon?: any
  options: Array<any>
  onValueChange?: (value: any) => void
  style?: StyleProp<ViewStyle>
  purpleArrow?: boolean
  arrowOnRight?: boolean
  textColor?: string
  fontSize?: string
  textAlign?: string
  prefixText?: string
  hideArrow?: boolean
  small?: boolean
}

const S = {
  ValueText: styled(Text)<{
    textColor?: string
    fontSize?: string
    textAlign?: string
    small?: boolean
  }>`
    ${props => !props.small && 'flex: 1'};
    font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
    color: ${props => (props.textColor ? props.textColor : colors.grey)};
    text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  `,

  ArrowDownPurple: styled(ArrowDownPurple)<{ arrowOnRight?: boolean }>`
    width: 18px;
    height: 18px;
    margin-right: ${props => (props.arrowOnRight ? '0px' : '12px')};
    margin-left: ${props => (props.arrowOnRight ? '12px' : '0px')};
  `,

  ArrowDown: styled(ArrowDown)<{ arrowOnRight?: boolean }>`
    width: 18px;
    height: 18px;
    margin-right: ${props => (props.arrowOnRight ? '0px' : '12px')};
    margin-left: ${props => (props.arrowOnRight ? '12px' : '0px')};
  `,

  PrefixText: styled(Text)`
    color: ${colors.purple};
    margin-right: 12px;
    font-size: 15px;
  `,

  Container: styled.TouchableOpacity<{ small?: boolean }>`
    align-items: center;
    padding: 0 ${p => (p.small ? 8 : 15)}px;
    flex-direction: ${p => (p.small ? 'column' : 'row')}
    height: 70px;
  `
}

class Dropdown extends React.Component<Props, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      showOptions: false
    }
  }

  arrowIcon = this.props.purpleArrow ? (
    <S.ArrowDownPurple arrowOnRight={this.props.arrowOnRight} />
  ) : (
    <S.ArrowDown arrowOnRight={this.props.arrowOnRight} />
  )

  render = () => {
    return (
      <S.Container
        small={this.props.small}
        onPress={this.showOptionPicker}
        style={this.props.style}
      >
        {!this.props.arrowOnRight && !this.props.hideArrow ? (
          this.arrowIcon
        ) : (
          <></>
        )}
        {!!this.props.prefixText && (
          <S.PrefixText>{this.props.prefixText}</S.PrefixText>
        )}
        <S.ValueText
          textColor={this.props.textColor}
          small={this.props.small}
          fontSize={this.props.fontSize}
          textAlign={this.props.textAlign}
        >
          {this.props.value && this.props.value !== 'Any'
            ? this.props.value
            : this.props.label}
        </S.ValueText>
        {this.props.arrowOnRight && !this.props.hideArrow ? (
          this.arrowIcon
        ) : (
          <></>
        )}
        {this.props.icon}
        {this.renderChoiceDialog()}
      </S.Container>
    )
  }

  renderChoiceDialog = () => {
    const { showOptions } = this.state
    const { options, value } = this.props
    return (
      <Dialog
        visible={showOptions}
        rounded={false}
        useNativeDriver={true}
        dialogStyle={styles.dialog}
        width={Dimensions.get('window').width}
        containerStyle={styles.popup}
        onHardwareBackPress={() => {
          this.setState({ showOptions: false })
          return true
        }}
        onTouchOutside={() => {
          this.setState({ showOptions: false })
        }}
        dialogAnimation={
          new FadeAnimation({
            toValue: 0,
            animationDuration: 150
          })
        }
      >
        <SafeAreaView>
          <FlatList
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            data={options}
            removeClippedSubviews
            initialNumToRender={10}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index
            })}
            extraData={value}
            renderItem={({ item }) => {
              const selected = value === item
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => this.selectItem(item)}
                    style={styles.item}
                  >
                    <RNText
                      style={selected ? styles.highlight : styles.text}
                      numberOfLines={1}
                    >
                      {item}
                    </RNText>
                    {selected && <IconCheck width={24} height={24} />}
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              )
            }}
          />
        </SafeAreaView>
      </Dialog>
    )
  }

  selectItem = (item: any) => {
    const { onValueChange } = this.props
    this.setState({ showOptions: false }, () => {
      onValueChange?.(item)
    })
  }

  showOptionPicker = () => {
    this.setState({ showOptions: true })
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontFamily: fonts.medium
  },
  highlight: {
    flex: 1,
    fontFamily: fonts.medium,
    color: colors.purple
  },
  item: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  popup: { justifyContent: 'flex-end' },
  dialog: {
    maxHeight: 400
  },
  separator: {
    height: 1
  }
})

export default Dropdown
