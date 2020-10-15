import React, { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { priceFormatter } from '../../utils/numberUtils'
import Text from '../common/Text'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import { MovieDetails } from '../../services/apiTypes'

type Props = {
  movie: MovieDetails
  style?: StyleProp<ViewStyle>
}

const S = {
  AddressText: styled(Text)`
    font-size: 21px;
    font-family: ${fonts.light};
    color: ${colors.greyMedium};
    margin-vertical: 12px;
  `,

  InspectionWrap: styled(Text)``,

  InspectionText: styled(Text)`
    color: ${colors.purple};
  `,

  LabelText: styled(Text)`
    font-size: 16px;
    margin-vertical: 4px;
  `,

  BlockSizeText: styled(Text)`
    font-size: 16px;
  `,

  ValueText: styled(Text)`
    color: ${colors.greyMedium};
    font-size: 16px;
  `,

  FeatureView: styled.View`
    margin-vertical: 8px;
    flex-direction: row;
    align-items: center;
  `,

  CountText: styled(Text)`
    margin-left: 12px;
  `,

  Line: styled.View`
    height: 48px;
    width: 1px;
    margin-horizontal: 11px;
    background-color: ${colors.solitude};
  `,

  AuctionWrap: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
  `,

  MainText: styled(Text)`
    font-size: 20px;
    margin-right: 16px;
    padding-bottom: 4px;
  `,

  CalculateText: styled(Text)`
    padding-bottom: 4px;
    color: ${colors.purple};
    font-size: 14px;
  `,

  SquareView: styled.View`
    flex-direction: row;
    margin-vertical: 4px;
  `,

  Container: styled.View`
    padding: 14px;
  `
}

const PrimaryDetails: React.FC<Props> = props => {
  const { movie, style } = props

  const { budget, tagline } = movie

  const priceDisplay = useMemo<string>(() => {
    return budget != 0 ? priceFormatter(budget) : ''
  }, [budget])
  return (
    <S.Container style={style}>
      {!!tagline && <S.AddressText>{tagline}</S.AddressText>}
      {!!priceDisplay && <S.LabelText>{priceDisplay}</S.LabelText>}
    </S.Container>
  )
}

export default PrimaryDetails
