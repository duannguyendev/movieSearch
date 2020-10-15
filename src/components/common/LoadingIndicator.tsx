import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, ImageStyle, StyleProp } from 'react-native'
import styled from 'styled-components/native'
import IconLoading from '../../assets/icon/icon-loading.svg'

type Props = {
  style?: StyleProp<ImageStyle>
  width?: number
  height?: number
  color?: string
}

const S = {
  AnimatedView: styled(Animated.View)<{
    rotation: number
    width: number
    height: number
  }>`
    width: ${p => p.width}px;
    height: ${p => p.height}px;
    align-self: center;
  `
}

const LoadingIndicator: React.FC<Props> = props => {
  const { width = 44, height = 44, color = '#8c59fc' } = props

  const rotation = useRef(new Animated.Value(0))

  useEffect(() => {
    let mounted = true

    const spin = () => {
      rotation.current.setValue(0)
      Animated.timing(rotation.current, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => mounted && spin())
    }

    spin()

    return () => {
      mounted = false
    }
  })

  const style = useMemo(() => {
    const spin = rotation.current.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return [props.style, { transform: [{ rotate: spin }] }]
  }, [props.style])

  return (
    <S.AnimatedView style={style} width={width} height={height}>
      <IconLoading width={width} height={height} color={color} />
    </S.AnimatedView>
  )
}

export default LoadingIndicator
