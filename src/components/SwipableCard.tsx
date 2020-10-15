import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  style?: StyleProp<ViewStyle>
  isNewsCard?: boolean
}

const S = {
  SwipeableWrap: styled.View`
    margin-horizontal: 14px;
    margin-vertical: 6px;
  `
}

const SwipeableCard: React.FC<Props> = ({ style, children }) => {
  return <S.SwipeableWrap style={style}>{children}</S.SwipeableWrap>
}

export default SwipeableCard
