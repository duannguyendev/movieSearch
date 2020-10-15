import React, { useCallback, useState } from 'react'
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { loadingPlaceholder2x } from '../../assets/images/loadingPlaceholder'

type Props = {
  source: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

const S = {
  Container: styled.View``,

  Image: styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    resize-mode: cover;
  `
}

const MovieImage: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true)

  const hideLoadingIndicator = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <S.Container style={props.style}>
      <S.Image source={props.source} onLoadEnd={hideLoadingIndicator} />

      {!loading ? <></> : <S.Image source={{ uri: loadingPlaceholder2x }} />}
    </S.Container>
  )
}

export default MovieImage
