import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import Text from './Text'
import { fonts } from '../../theme/fonts'

type Props = {
  text: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const StyledBorder = styled.View`
  height: 5px;
  background-color: ${colors.purple};
`
const ButtonText = styled(Text)`
  margin-top: 6px;
  font-size: 16px;
  color: ${colors.greyMedium};
  font-family: ${fonts.bold};
`

const SecondaryButton: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <StyledBorder />
      <ButtonText>{props.text}</ButtonText>
    </TouchableOpacity>
  )
}

const StyledSecondaryButton = styled(SecondaryButton)`
  align-self: flex-start;
  margin-top: 14px;
`

export default StyledSecondaryButton
