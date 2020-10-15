import React, { useCallback, useContext, useMemo } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import styled from 'styled-components/native'
import IconLink from '../../assets/icon/icon-link.svg'
import { screens } from '../../constants/screens'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import Text from './Text'

type Props = {
  linkText?: string
  onPress?: () => void
  onLinkPress?: () => void
  style?: StyleProp<ViewStyle>
  uri?: string
}

const S = {
  WebsiteView: styled.View`
    flex-direction: row;
    align-items: center;
  `,

  LinkText: styled(Text)`
    font-size: 16px;
    font-family: ${fonts.regular};
    line-height: 24px;
    color: ${colors.purple};
    margin-right: 5px;
  `
}

const WebsiteLink: React.FC<Props> = props => {
  const nav = useContext(NavigationContext)

  const goToWebsite = useCallback(() => {
    props.onPress?.()
    nav?.navigate(screens.webView, { uri: props.uri })
  }, [nav, props])

  return useMemo(() => {
    return !props.uri && !props.onLinkPress ? (
      <></>
    ) : (
      <TouchableOpacity onPress={props.onLinkPress || goToWebsite}>
        <S.WebsiteView style={props.style}>
          <S.LinkText>{props.linkText || text.common.website}</S.LinkText>
          <IconLink width={13} height={12} />
        </S.WebsiteView>
      </TouchableOpacity>
    )
  }, [goToWebsite, props.linkText, props.onLinkPress, props.style, props.uri])
}

export default WebsiteLink
