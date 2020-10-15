import React, { useContext } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import ArrowLeft from '../../assets/icon/icon-left.svg'
import ArrowLeftWhite from '../../assets/icon/icon-arrow-left-white.svg'
import ArrowLeftGrey from '../../assets/icon/icon-arrow-left-grey.svg'
import Text from '../../components/common/Text'
import { primary, secondary, colors } from '../../theme/colors'
import { NavigationContext } from '@react-navigation/native'

export type BackMode = 'dark' | 'light' | 'normal' | 'primary'

type Props = {
  style?: StyleProp<ViewStyle>
  title: string
  mode?: BackMode
}

const S = {
  BackToResultText: styled(Text)<{ mode?: BackMode }>`
    color: ${props =>
      props.mode === 'dark' || props.mode === 'primary'
        ? colors.white
        : props.mode === 'light'
        ? colors.grey
        : primary};
    margin-left: 3px;
  `,

  ArrowLeft: styled(ArrowLeft)`
    width: 14px;
    height: 14px;
    margin-left: 10px;
  `,

  ArrowLeftWhite: styled(ArrowLeftWhite)`
    width: 14px;
    height: 14px;
    margin-left: 10px;
  `,

  ArrowLeftGrey: styled(ArrowLeftGrey)`
    width: 14px;
    height: 14px;
    margin-left: 10px;
  `,

  BackToResultButton: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding-vertical: 11px;
    padding-right: 24px;
  `,

  SafeAreaView: styled.SafeAreaView<{ mode?: BackMode }>`
    flex-direction: row;
    align-items: center;
    background-color: ${props =>
      props.mode === 'dark'
        ? colors.grey
        : props.mode === 'primary'
        ? primary
        : secondary};
  `
}

const BackButtonBar: React.FC<Props> = props => {
  const navigation = useContext(NavigationContext)

  return (
    <S.SafeAreaView mode={props.mode}>
      <View style={props.style}>
        <S.BackToResultButton
          onPress={() => {
            if (navigation) {
              navigation.goBack()
            }
          }}
        >
          {props.mode === 'dark' || props.mode === 'primary' ? (
            <S.ArrowLeftWhite />
          ) : props.mode === 'light' ? (
            <S.ArrowLeftGrey />
          ) : (
            <S.ArrowLeft />
          )}
          <S.BackToResultText mode={props.mode}>
            {props.title}
          </S.BackToResultText>
        </S.BackToResultButton>
      </View>
    </S.SafeAreaView>
  )
}

export default BackButtonBar
