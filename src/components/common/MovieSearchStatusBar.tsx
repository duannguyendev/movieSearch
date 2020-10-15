import React, { useContext, useLayoutEffect, useMemo } from 'react'
import { Platform, StatusBar, StyleProp, ViewStyle } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import styled from 'styled-components/native'

type Props = {
  backgroundColor?: string
  hidden?: boolean
  lightIcons?: boolean
  style?: StyleProp<ViewStyle>
}

const S = {
  TopViewAndroid: styled.View<{ backgroundColor: string }>`
    background: ${props => props.backgroundColor};
    height: ${() => StatusBar.currentHeight}px;
  `,

  TopViewIos: styled.SafeAreaView<{ backgroundColor: string }>`
    background: ${props => props.backgroundColor};
  `
}

const MovieSearchStatusBar: React.FC<Props> = props => {
  const nav = useContext(NavigationContext)

  useLayoutEffect(() => {
    const updateStatusBar = () => {
      StatusBar.setBarStyle(props.lightIcons ? 'light-content' : 'dark-content')
      StatusBar.setHidden(props.hidden ?? false)

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setTranslucent(true)
      }
    }

    updateStatusBar()
    const navListener = nav?.addListener('focus', updateStatusBar)
    return navListener
  }, [nav, props.hidden, props.lightIcons])

  return useMemo(() => {
    const backgroundColor = props.backgroundColor || '#000'

    if (Platform.OS === 'android') {
      return <S.TopViewAndroid backgroundColor={backgroundColor} />
    } else {
      return <S.TopViewIos backgroundColor={backgroundColor} />
    }
  }, [props.backgroundColor])
}

export default MovieSearchStatusBar
