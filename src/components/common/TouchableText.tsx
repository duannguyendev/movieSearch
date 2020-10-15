import React from 'react'
import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import Text from './Text'

type Props = {
  text: string
  color?: string
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
}

const S = {
  ButtonText: styled(Text)`
    color: ${colors.purple};
    font-size: 14px;
  `,

  Container: styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 28px;
    border-radius: 14px;
    border-width: 1px;
    padding-horizontal: 8px;
    border-color: ${colors.purple};
  `
}

const TouchableText: React.FC<Props> = props => {
  return (
    <S.Container onPress={props.onPress} style={props.style}>
      <S.ButtonText>{props.text}</S.ButtonText>
    </S.Container>
  )
}

export default TouchableText
