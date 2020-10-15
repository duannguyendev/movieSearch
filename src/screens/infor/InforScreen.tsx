import React from 'react'
import styled from 'styled-components/native'
import Toolbar from '../../components/common/Toolbar'
import Text from '../../components/common/Text'
import MovieSearchStatusBar from '../../components/common/MovieSearchStatusBar'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import useOrientation from '../../utils/useOrientation'
import { SvgUri } from 'react-native-svg'

const S = {
  ContainerView: styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.white};
  `,

  ScrollView: styled.ScrollView`
    flex: 1;
  `,

  ScrollViewPadding: styled.View`
    padding: 16px 8px;
  `,

  BottomContainerView: styled.View`
    flex-direction: row;
  `,

  BottomView: styled.View`
    width: 100%;
    align-self: flex-end;
  `,

  InforText: styled(Text)`
    flex: 1;
    margin-top: 10px;
  `
}

const InforScreen = () => {
  useOrientation({ portrait: true })

  return <InforScreenContent />
}

const InforScreenContent: React.FC = () => {
  return (
    <>
      <MovieSearchStatusBar backgroundColor={colors.purple} lightIcons />
      <S.ContainerView>
        <Toolbar title={text.infor.title} />
        <S.ScrollView>
          <S.ScrollViewPadding>
            <S.InforText>
              Source data and images in this app are distributed by
              themoviedb.org
            </S.InforText>
            <SvgUri
              uri={
                'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
              }
              width={67}
              height={67}
            />
            <S.InforText>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </S.InforText>
            <S.InforText>
              https://www.themoviedb.org/documentation/api/terms-of-use
            </S.InforText>
          </S.ScrollViewPadding>
        </S.ScrollView>
      </S.ContainerView>
    </>
  )
}

export default InforScreen
