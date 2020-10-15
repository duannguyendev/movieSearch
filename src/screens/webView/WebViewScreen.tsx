import React, { useMemo } from 'react'
import WebView from 'react-native-webview'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MainRootStackParamList } from '../../routes/MainRouter'
import styled from 'styled-components/native'
import BackButtonBar from '../../components/common/BackButtonBar'
import MovieSearchStatusBar from '../../components/common/MovieSearchStatusBar'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import useOrientation from '../../utils/useOrientation'

const S = {
  Body: styled.SafeAreaView`
    flex: 1;
  `,

  WebView: styled(WebView)`
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  `
}

type WebViewScreenRouteProp = RouteProp<MainRootStackParamList, 'WebViewScreen'>

type WebViewScreenNavigationProp = StackNavigationProp<
  MainRootStackParamList,
  'WebViewScreen'
>

type Props = {
  route: WebViewScreenRouteProp
  navigation: WebViewScreenNavigationProp
}
const WebViewScreen: React.FC<Props> = props => {
  useOrientation({ portrait: true, landscape: true })

  return (
    <>
      <MovieSearchStatusBar backgroundColor={colors.grey} lightIcons />

      <S.Body>
        <BackButtonBar mode='dark' title={text.common.back} />
        <S.WebView source={{ uri: props.route.params.uri ?? '' }} />
      </S.Body>
    </>
  )
}

export default WebViewScreen
