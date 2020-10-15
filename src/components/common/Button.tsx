import React from 'react'
import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { colors, primary } from '../../theme/colors'
import Text from './Text'
import { fonts } from '../../theme/fonts'

type Props = {
  text: string
  icon?: any
  loading?: boolean
  textColor?: string
  color?: string
  noTopLine?: boolean
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
}

const S = {
  Line: styled.View`
    height: 5px;
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.2);
  `,

  Body: styled.View`
    height: 46px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 17px;
    padding-right: 17px;
  `,

  ButtonText: styled(Text)<{ textColor?: string }>`
    color: ${p => p.textColor ?? colors.white};
    font-family: ${fonts.bold};
    font-size: 16px;
    margin-bottom: 2px;
    flex: 1;
  `,

  Container: styled.TouchableOpacity<{ color?: string }>`
    background-color: ${props => (props.color ? props.color : primary)};
  `
}

const Button: React.FC<Props> = props => {
  return (
    <S.Container
      disabled={props.loading}
      onPress={props.onPress}
      style={props.style}
      color={props.color}
    >
      <S.Body>
        <S.ButtonText textColor={props.textColor}>{props.text}</S.ButtonText>
        {props.icon}
      </S.Body>
      {props.noTopLine ? null : <S.Line />}
    </S.Container>
  )
}

export default Button
