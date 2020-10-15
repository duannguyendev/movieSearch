import React, { useCallback, useMemo } from 'react'
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import { widescreenAspectRatio } from '../../constants/styleConstants'
import useMovieDetailsNavigation from '../../screens/movieDetails/useMovieDetailsNavigation'
import { Movie } from '../../services/apiTypes'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import { text } from '../../constants/text'
import { getMovieCardWidth } from '../../utils/propertyUtils'
import MovieImage from '../common/MovieImage'
import Text from '../common/Text'

type Props = {
  movie: Movie
  style?: StyleProp<ViewStyle>
}

const S = {
  TopView: styled.View`
    width: 100%;
    aspect-ratio: ${widescreenAspectRatio};
    justify-content: space-between;
  `,

  MovieImage: styled(MovieImage)`
    width: 100%;
    height: 100%;
    position: absolute;
  `,

  Overlay: styled(LinearGradient)`
    position: absolute;
    height: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  `,

  BodyView: styled.View`
    width: 100%;
    padding: 10px 16px;
    justify-content: space-between;
  `,

  BodyRow: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `,

  TitleText: styled(Text)`
    margin-vertical: 2px;
    color: ${colors.greyMedium};
    line-height: 18px;
    color: ${colors.greyMedium};
    font-family: ${fonts.medium};
  `,

  Container: styled.View`
    width: ${getMovieCardWidth()}px;
    shadow-color: #000;
    flex: 0;
    margin-horizontal: 5px;
    shadow-offset: 0 2px;
    shadow-opacity: 0.2;
    shadow-radius: 1.41px;
    elevation: 2;
    margin-bottom: 4px; /* Space for the bottom shadow */
    background-color: ${colors.white};

    flex-direction: column;
  `
}

const MovieCard: React.FC<Props> = ({ movie, style }) => {
  const nav = useMovieDetailsNavigation()
  const navToMovieDetails = useCallback(() => {
    nav.toMovieDetails(movie.id)
  }, [nav, movie.id])

  const coverImage = useMemo(() => {
    return [
      {
        uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`
      }
    ]
  }, [movie])

  const bodyView = useMemo(() => {
    return (
      <S.BodyView>
        <View>
          <S.BodyRow>
            <S.TitleText>
              {movie.title}
              {'\n'}
              Popularity : {movie.popularity}
            </S.TitleText>
          </S.BodyRow>
        </View>
      </S.BodyView>
    )
  }, [movie])

  return (
    <TouchableWithoutFeedback onPress={navToMovieDetails}>
      <S.Container style={style}>
        <S.TopView>
          <S.MovieImage source={coverImage} />
          <S.Overlay
            colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
          />
        </S.TopView>
        {bodyView}
      </S.Container>
    </TouchableWithoutFeedback>
  )
}

export default MovieCard
