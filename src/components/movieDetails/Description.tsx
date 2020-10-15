import React, { useMemo, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import HtmlContent from '../common/HtmlContent'
import SecondaryButton from '../common/SecondaryButton'
import Text from '../common/Text'
type Props = {
  headline: string
  description: string
  smallTitle?: boolean
  style?: StyleProp<ViewStyle>
}
const S = {
  Container: styled.View`
    padding-vertical: 20px;
    padding-horizontal: 14px;
  `,
  TitleText: styled(Text)<{ smallTitle?: boolean }>`
    font-size: ${props => (props.smallTitle ? 21 : 27)}px;
    line-height: 30px;
    margin-bottom: 15px;
  `,
  Overlay: styled(LinearGradient)`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 96px;
  `
}
const limitCharacter = 264
const Description: React.FC<Props> = props => {
  const about = props.description
  const [state, setState] = useState({
    isShowMore: about.length < limitCharacter
  })
  const content = useMemo(() => {
    return state.isShowMore ? about : about.slice(0, limitCharacter)
  }, [about, state.isShowMore])
  const secondaryButton = useMemo(() => {
    return about.length < limitCharacter ? (
      <></>
    ) : (
      <>
        {!state.isShowMore && (
          <S.Overlay colors={[colors.blurOverlay, colors.white]} />
        )}
        <SecondaryButton
          onPress={() => {
            setState({
              ...state,
              isShowMore: !state.isShowMore
            })
          }}
          text={
            state.isShowMore
              ? text.movieDetails.readLess
              : text.movieDetails.readMore
          }
        />
      </>
    )
  }, [about.length, state])
  return (
    <S.Container style={props.style}>
      <S.TitleText smallTitle={props.smallTitle}>{props.headline}</S.TitleText>
      <HtmlContent content={content} />
      {secondaryButton}
    </S.Container>
  )
}
export default Description
