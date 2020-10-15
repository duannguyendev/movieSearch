import React, { useContext } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import styled from 'styled-components/native'
import IconArrowLeft from '../../assets/icon/icon-arrow-left-white.svg'
import { colors, primary } from '../../theme/colors'
import Text from './Text'

type Props = {
  backButton?: boolean
  style?: StyleProp<ViewStyle>
  title: string
}

const Container = styled.View`
  flex-direction: row;
  height: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`

const StyledTitle = styled(Text)`
  flex: 1;
  color: ${colors.white};
  font-size: 24px;
  text-align: center;
`

const IconButton = styled.TouchableOpacity`
  padding: 12px;
`

const Toolbar: React.FC<Props> = props => {
  const navigation = useContext(NavigationContext)

  return (
    <Container style={props.style}>
      {props.backButton && (
        <IconButton onPress={() => navigation?.goBack()}>
          <IconArrowLeft width={20} height={20} />
        </IconButton>
      )}
      <StyledTitle numberOfLines={1}>{props.title}</StyledTitle>
    </Container>
  )
}

const StyledToolbar = styled(Toolbar)`
  height: 74px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${primary};
`

export default StyledToolbar
