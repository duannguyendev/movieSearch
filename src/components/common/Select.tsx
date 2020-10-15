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
import ArrowDown from '../../assets/icon/icon-arrow-down-purple.svg'
import ArrowDownYellow from '../../assets/icon/icon-arrow-down-yellow.svg'
import { fonts } from '../../theme/fonts'
import { colors } from '../../theme/colors'

type Props = {
  borderless?: boolean
  disabled?: boolean
  value: string
  label?: string
  icon?: any
  options: Array<any>
  valueColor?: string
  valueFont?: string
  placeholder?: string
  keepVisibleWhenSelect?: boolean
  onValueChange?: (value: any) => void
  style?: StyleProp<ViewStyle>
  transparent?: boolean
  prestige?: boolean
}

const S = {
  ValueText: styled(Text)<{ valueColor?: string; valueFont?: string }>`
    flex: 1;
    font-size: 15px;
    margin: 0 12px;
    color: ${props => (props.valueColor ? props.valueColor : colors.grey)};
    font-family: ${props => (props.valueFont ? props.valueFont : fonts.medium)};
  `,

  LabelText: styled(Text)`
    font-size: 16px;
    margin-bottom: 12px;
  `,

  Container: styled.View``,

  Body: styled.TouchableOpacity<{
    focus: boolean
    hasBorder: boolean
    transparent?: boolean
    disabled?: boolean
  }>`
    border-width: ${p => (p.hasBorder ? 1 : 0)}px;
    border-color: ${p => (p.focus ? colors.purple : colors.linkWater)};
    flex-direction: row;
    height: 48px;
    background: ${p =>
      p.disabled
        ? colors.greyLight
        : p.transparent
        ? 'transparent'
        : colors.white};
    align-items: center;
  `,

  ArrowWrap: styled.View`
    margin-horizontal: 12px;
  `
}

class Select extends React.Component<Props, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      showOptions: false
    }
  }

  render = () => {
    const { valueColor, valueFont } = this.props
    const { showOptions } = this.state
    return (
      <S.Container style={this.props.style}>
        {!!this.props.label && <S.LabelText>{this.props.label}</S.LabelText>}
        <S.Body
          hasBorder={!this.props.borderless}
          disabled={this.props.disabled}
          focus={showOptions}
          onPress={this.showOptionPicker}
          transparent={this.props.transparent}
        >
          <S.ValueText valueFont={valueFont} valueColor={valueColor}>
            {this.props.value || this.props.placeholder}
          </S.ValueText>
          <S.ArrowWrap>
            {this.props.prestige ? (
              <ArrowDownYellow width={18} height={10} />
            ) : (
              <ArrowDown width={18} height={10} />
            )}
          </S.ArrowWrap>
          {this.renderChoiceDialog()}
        </S.Body>
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
    const { onValueChange, keepVisibleWhenSelect } = this.props
    if (onValueChange) {
      onValueChange(item)
    }
    if (!keepVisibleWhenSelect) {
      this.setState({ showOptions: false })
    }
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

export default Select
