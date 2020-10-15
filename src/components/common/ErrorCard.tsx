import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import ArrowRight from '../../assets/icon/icon-arrow-right.svg'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import Text from '../common/Text'

type Props = {
  onRefresh: () => void
  style?: StyleProp<ViewStyle>
}

const S = {
  ScrollView: styled.ScrollView`
    flex: 1;
    background: ${colors.aliceBlue};
  `,

  Container: styled.View`
    margin: 56px 15px 8px 15px;
    background: ${colors.white};
    elevation: 2;
    shadow-opacity: 1;
    shadow-radius: 5px;
    shadow-color: rgba(0, 0, 0, 0.12);
    shadow-offset: 0 6px;
  `,

  TopBorder: styled.View`
    height: 5px;
    background-color: ${colors.purple};
  `,

  HeaderText: styled(Text)`
    margin-top: 30px;
    font-size: 21px;
    line-height: 23px;
    text-align: center;
    margin-horizontal: 40px;
  `,

  BodyText: styled(Text)`
    margin-top: 15px;
    margin-horizontal: 15px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    font-family: ${fonts.regular};
    color: ${colors.greyMedium};
  `,

  ActionsContainer: styled.View`
    margin-horizontal: 60px;
    margin-top: 35px;
    margin-bottom: 20px;
  `,

  ActionButton: styled.TouchableOpacity`
    flex-direction: row;
    height: 49px;
    align-items: center;
  `,

  ActionText: styled(Text)`
    font-size: 16px;
    color: ${colors.greyMedium};
    flex: 1;
  `,

  ArrowRight: styled(ArrowRight)`
    width: 20px;
    height: 20px;
    margin-right: 10px;
  `,

  Border: styled.View`
    height: 1px;
    background-color: ${colors.greyLight};
  `
}

const ErrorCard: React.FC<Props> = props => {
  const { style } = props

  return (
    <S.ScrollView style={style}>
      <S.Container>
        <S.TopBorder />
        <S.HeaderText>{text.error.error500}</S.HeaderText>
        <S.BodyText>{text.error.error500Description}</S.BodyText>

        <S.ActionsContainer>
          <S.ActionButton onPress={props.onRefresh}>
            <S.ActionText>{text.error.tryAgain}</S.ActionText>
            <S.ArrowRight />
          </S.ActionButton>
        </S.ActionsContainer>
      </S.Container>
    </S.ScrollView>
  )
}

export default ErrorCard
