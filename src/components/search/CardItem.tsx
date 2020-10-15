import React, { useMemo } from 'react'
import { StyleProp, Animated, Dimensions, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import SwipeableCard from '../SwipableCard'
import { Movie } from '../../services/apiTypes'
import MovieCard from '../movieCard/MovieCard'

type Props = {
  item: Movie
  style?: StyleProp<ViewStyle>
}

const S = {
  MovieCard: styled(MovieCard)`
    width: ${Dimensions.get('window').width - 28}px;
    margin: 0px;
  `
}

const CardItem: React.FC<Props> = props => {
  const { item } = props

  const card = useMemo(() => {
    return <S.MovieCard movie={item} />
  }, [item])

  return <SwipeableCard>{card}</SwipeableCard>
}

export default CardItem
