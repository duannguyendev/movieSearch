import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { MovieDetails } from '../../services/apiTypes'
import MovieImage from '../common/MovieImage'

type Props = {
  movie: MovieDetails
  onPressContactAgent?: () => void
}

const S = {
  Container: styled.View`
    width: 100%;
    aspect-ratio: 1.78;
  `,

  MovieImage: styled(MovieImage)`
    flex: 1;
  `
}

const MovieHero: React.FC<Props> = props => {
  const { movie } = props

  const coverImage = useMemo(() => {
    return [
      {
        uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`
      }
    ]
  }, [movie])
  return (
    <S.Container>
      <S.MovieImage source={coverImage} />
    </S.Container>
  )
}

export default MovieHero
