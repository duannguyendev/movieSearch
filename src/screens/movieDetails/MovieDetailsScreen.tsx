import React, { useContext, useMemo, useReducer } from 'react'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MainRootStackParamList } from '../../routes/MainRouter'
import styled from 'styled-components/native'
import BackButtonBar from '../../components/common/BackButtonBar'
import ErrorCard from '../../components/common/ErrorCard'
import LoadingIndicator from '../../components/common/LoadingIndicator'
import Text from '../../components/common/Text'
import WebsiteLink from '../../components/common/WebsiteLink'
import MovieSearchStatusBar from '../../components/common/MovieSearchStatusBar'
import Description from '../../components/movieDetails/Description'
import PrimaryDetails from '../../components/movieDetails/PrimaryDetails'
import MovieHero from '../../components/movieDetails/MovieHero'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import { isFailure, isLoading } from '../../utils/stateUtils'
import useOrientation from '../../utils/useOrientation'
import movieDetailsReducer, {
  initialState,
  MovieDetailsReducerContext
} from './movieDetailsReducer'
import useMovieDetails from './useMovieDetails'

const S = {
  LoadingView: styled.View`
    flex: 1;
    align-self: center;
    justify-content: center;
  `,

  Line: styled.View`
    height: 1px;
    background-color: ${colors.greyLight};
    margin-horizontal: 14px;
    margin-vertical: 8px;
  `,

  Body: styled.SafeAreaView`
    flex: 1;
  `,

  Wrap: styled.View`
    flex: 1;
  `
}

const styles = StyleSheet.create({
  subView: {
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
})

type MovieDetailsScreenRouteProp = RouteProp<
  MainRootStackParamList,
  'MovieDetailsScreen'
>

type MovieDetailsScreenNavigationProp = StackNavigationProp<
  MainRootStackParamList,
  'MovieDetailsScreen'
>

type Props = {
  route: MovieDetailsScreenRouteProp
  navigation: MovieDetailsScreenNavigationProp
}

const MovieDetailsScreen: React.FC<Props> = props => {
  useOrientation({ portrait: true })

  const [state, dispatch] = useReducer(movieDetailsReducer, initialState)
  const reducer = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <MovieDetailsReducerContext.Provider value={reducer}>
      <MovieSearchStatusBar backgroundColor={colors.yellow} />
      <S.Body>
        <BackButtonBar title={text.common.back} />
        <MovieDetailsScreenContent {...props} />
      </S.Body>
    </MovieDetailsReducerContext.Provider>
  )
}

const MovieDetailsScreenContent: React.FC<Props> = ({ route }) => {
  const { state, dispatch } = useContext(MovieDetailsReducerContext)
  const propertyId = route?.params?.propertyId ?? -1

  const { property } = state

  useMovieDetails(propertyId)

  const propertyHero = useMemo(() => {
    return property ? <MovieHero movie={property} /> : <></>
  }, [property])

  const statuses = [state.propertyStatus]
  if (isLoading(...statuses) && !isFailure(...statuses)) {
    return (
      <S.LoadingView>
        <LoadingIndicator />
      </S.LoadingView>
    )
  } else if (!property?.id || isFailure(...statuses)) {
    const refresh = () => dispatch({ type: 'reload', payload: 'error' })
    return <ErrorCard onRefresh={refresh} />
  }

  return (
    <S.Wrap>
      <KeyboardAwareScrollView>
        {propertyHero}
        <PrimaryDetails movie={property} />
        <S.Line />

        <Description
          headline={property.original_title}
          description={property.overview}
        />
        <S.Line />
      </KeyboardAwareScrollView>
    </S.Wrap>
  )
}

export default MovieDetailsScreen
