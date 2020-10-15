import React, { useState } from 'react'
import { StyleProp, KeyboardTypeOptions, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import Text from './Text'
import { fonts } from '../../theme/fonts'
import { colors } from '../../theme/colors'

type Props = {
  placeholder?: string
  value?: string
  keyboardType?: KeyboardTypeOptions
  placeholderTextColor?: string
  onEndEditing?: () => void
  label: string
  multiline?: boolean
  onChangeText?: (text: string) => void
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<ViewStyle>
  left?: any
  right?: any
  labelColor?: string
  font?: string
  transparent?: boolean
}

const S = {
  LabelText: styled(Text)<{ labelColor?: string }>`
    font-size: 16px;
    margin-bottom: 12px;
    line-height: 24px;
    color: ${props => (props.labelColor ? props.labelColor : colors.grey)};
  `,

  Row: styled.View<{ focus: boolean; transparent?: boolean }>`
    flex-direction: row;
    background: ${p => (p.transparent ? 'transparent' : colors.white)};
    border: 1px solid
      ${props => (props.focus ? colors.purple : colors.linkWater)};
    align-items: center;
  `,

  TextInput: styled.TextInput<{ font?: string }>`
    padding-vertical: 0px;
    padding-horizontal: 13px;
    height: 48px;
    font-family: ${props => (props.font ? props.font : fonts.medium)};
    color: ${colors.grey}
    flex: 1;
  `,

  Container: styled.View`
    padding: 15px;
  `
}

const Input: React.FC<Props> = props => {
  const [focus, setFocus] = useState(false)
  return (
    <S.Container style={props.style}>
      <S.LabelText labelColor={props.labelColor}>{props.label}</S.LabelText>
      <S.Row focus={focus} transparent={props.transparent}>
        {props.left}
        <S.TextInput
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onEndEditing={props.onEndEditing}
          value={props.value}
          style={props.inputStyle}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          autoCapitalize='none'
          multiline={props.multiline}
          onChangeText={props.onChangeText}
          placeholderTextColor={props.placeholderTextColor ?? colors.stormGrey}
          font={props.font}
        />
        {props.right}
      </S.Row>
    </S.Container>
  )
}

export default Input
