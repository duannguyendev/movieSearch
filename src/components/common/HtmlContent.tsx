import React, { useContext, useMemo } from 'react'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import HTML from 'react-native-render-html'
import WebView from 'react-native-webview'
import { NavigationContext } from '@react-navigation/native'
import styled from 'styled-components/native'
import { widescreenAspectRatio } from '../../constants/styleConstants'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import Image from 'react-native-scalable-image'

const SALE_OR_RENT_REGEX = /\/(?:sale|rent)\/.*-(\d+)\/?$/

const tagsStyles = {
  a: { color: colors.purple, textDecorationLine: 'none' }
}

const baseFontStyle = {
  color: colors.greyMedium,
  fontSize: 16,
  textAlign: 'left',
  lineHeight: 24,
  fontFamily: fonts.regular,
  textDecorationLine: 'none'
}

const renderers: Record<string, any> = {
  iframe: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => {
    const source = htmlAttribs.srcdoc
      ? { html: htmlAttribs.srcdoc }
      : { uri: htmlAttribs.src }
    return <S.WebView key={passProps.key} source={source} />
  },
  img: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => {
    const source = htmlAttribs.srcdoc
      ? { html: htmlAttribs.srcdoc }
      : { uri: htmlAttribs.src }
    return (
      <Image
        key={passProps.key}
        source={source}
        resizeMode='contain'
        width={Dimensions.get('window').width - 30}
      />
    )
  }
}

const S = {
  WebView: styled(WebView)`
    width: 100%;
    aspect-ratio: ${widescreenAspectRatio};
  `
}

type Props = {
  color?: string
  content: string
  fontFamily?: string
  fontSize?: number
  textAlign?: string
  onCustomAction?: (action: string, parameters: Record<string, string>) => void
  style?: StyleProp<ViewStyle>
}

const HtmlContent: React.FC<Props> = props => {
  const nav = useContext(NavigationContext)

  const fontStyle = useMemo(() => {
    return {
      ...baseFontStyle,
      color: props.color ?? baseFontStyle.color,
      fontFamily: props.fontFamily ?? baseFontStyle.fontFamily,
      fontSize: props.fontSize ?? baseFontStyle.fontSize,
      textAlign: props.textAlign ?? baseFontStyle.textAlign
    }
  }, [props.color, props.fontFamily, props.fontSize, props.textAlign])

  return (
    <HTML
      baseFontStyle={fontStyle}
      html={props.content}
      imagesMaxWidth={Dimensions.get('window').width - 50}
      renderers={renderers}
      tagsStyles={tagsStyles}
    />
  )
}

export default HtmlContent
