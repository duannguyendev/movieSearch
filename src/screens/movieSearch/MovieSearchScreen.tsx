import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MainRootStackParamList } from '../../routes/MainRouter'
import styled from 'styled-components/native'
import LoadingIndicator from '../../components/common/LoadingIndicator'
import Text from '../../components/common/Text'
import MovieSearchStatusBar from '../../components/common/MovieSearchStatusBar'
import ResultCards from '../../components/search/ResultCards'
import SearchHeader from '../../components/search/SearchHeader'
import ErrorCard from '../../components/common/ErrorCard'
import options from '../../constants/options'
import { text } from '../../constants/text'
import { MovieSearchFilters } from '../../services/apiTypes'
import { isFailure, isLoading } from '../../utils/stateUtils'
import { colors } from '../../theme/colors'
import { fonts } from '../../theme/fonts'
import { sortMoviesByPopularity } from '../../utils/dataUtils'
import useOrientation from '../../utils/useOrientation'
import movieSearchReducer, {
  initialFilters,
  initialState,
  MovieSearchReducerContext,
  SearchViewType
} from './movieSearchReducer'
import useSearchMovies from './useSearchMovies'
import { AppReducerContext } from '../../app/appReducer'

const S = {
  LoadingIndicator: styled(LoadingIndicator)``,

  Container: styled.View`
    flex: 1;
  `,

  Top: styled.SafeAreaView`
    background-color: ${colors.orange};
  `,

  Body: styled.SafeAreaView`
    flex: 1;
  `,

  LoadingView: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `
}

type MovieSearchScreenRouteProp = RouteProp<
  MainRootStackParamList,
  'MovieSearchScreen'
>

type MovieSearchScreenNavigationProp = StackNavigationProp<
  MainRootStackParamList,
  'MovieSearchScreen'
>

type Props = {
  route: MovieSearchScreenRouteProp
  navigation: MovieSearchScreenNavigationProp
}

const MovieSearchScreen: React.FC<Props> = props => {
  useOrientation({ portrait: true })
  const params = props.route?.params ?? {}
  const searchFilters = (params.filters ?? initialFilters) as MovieSearchFilters

  const [state, dispatch] = useReducer(movieSearchReducer, {
    ...initialState,
    viewType: params.viewType ?? 'this_year',
    searchFilters: {
      ...searchFilters
    }
  })

  const reducer = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <MovieSearchReducerContext.Provider value={reducer}>
      <MovieSearchScreenContents {...props} />
    </MovieSearchReducerContext.Provider>
  )
}

const MovieSearchScreenContents: React.FC<Props> = props => {
  const { state, dispatch } = useContext(MovieSearchReducerContext)
  const { state: appState, dispatch: appDispatch } = useContext(
    AppReducerContext
  )

  useSearchMovies()

  const toggleViewType = useCallback(
    (viewType: SearchViewType) => {
      dispatch({ type: 'setViewType', payload: viewType })
    },
    [dispatch]
  )

  const { searchResults, searchResultsStatus } = state

  const sortBy = useMemo(() => {
    return (
      options.sortBy.find(it => it.value === appState.searchParams.orderBy)
        ?.label ?? options.sortBy[0].label
    )
  }, [appState.searchParams.orderBy])

  const resultList = useMemo(() => {
    const resultData = sortMoviesByPopularity(
      searchResults?.results ?? [],
      appState.searchParams.orderBy === 'popularity'
    )
    let headerText = ''
    if (resultData && resultData?.length <= 0) {
      headerText = text.movieSearch.noResults
    } else {
      headerText = `${text.movieSearch.resultStart} '${state.searchFilters.query}' in ${state.searchFilters.year}`
    }
    if ((state?.searchFilters?.query?.length ?? 0) < 3) {
      headerText = text.movieSearch.guideText
    }

    const handleLoadMore = () => {
      if (
        searchResultsStatus === 'success' &&
        searchResults?.page !== searchResults?.total_pages
      ) {
        dispatch({
          type: 'setSearchFilters',
          payload: {
            ...state.searchFilters,
            page: state.searchFilters.page + 1
          }
        })
      }
    }

    const statuses = [searchResultsStatus]
    if (isLoading(...statuses) && !isFailure(...statuses)) {
      return (
        <S.LoadingView>
          <LoadingIndicator />
        </S.LoadingView>
      )
    } else if (isFailure(...statuses)) {
      const refresh = () => dispatch({ type: 'reload', payload: 'error' })
      return <ErrorCard onRefresh={refresh} />
    }

    return (
      <ResultCards
        movies={resultData ?? []}
        headerText={headerText}
        handleLoadMore={handleLoadMore}
        isAllDataLoaded={
          searchResults?.total_pages && searchResults?.total_pages > 0
            ? searchResults?.page === searchResults?.total_pages
            : true
        }
      />
    )
  }, [
    searchResults,
    appState.searchParams.orderBy,
    state.searchFilters,
    state.viewType,
    searchResultsStatus,
    dispatch
  ])

  const onKeywordChange = useCallback(
    (it: string) => {
      appDispatch({
        type: 'setSearchParams',
        payload: {
          ...appState.searchParams,
          query: it
        }
      })
    },
    [dispatch]
  )

  const onSortByChanged = (order_by: string) => {
    const orderBy =
      options.sortBy.find(it => it.label === order_by)?.value ??
      options.sortBy[2].value
    let filters = Object.assign({}, state.searchFilters)
    dispatch({
      type: 'setSearchFilters',
      payload: { ...filters, page: 1 }
    })
    appDispatch({
      type: 'setSearchParams',
      payload: {
        ...appState.searchParams,
        orderBy: orderBy
      }
    })
  }

  useEffect(() => {
    if (appState.searchParams.query.length >= 3) {
      dispatch({
        type: 'setSearchFilters',
        payload: {
          ...state.searchFilters,
          query: appState.searchParams.query,
          page: 1
        }
      })
    }
  }, [appState.searchParams.query])

  return (
    <S.Container>
      <MovieSearchStatusBar backgroundColor={colors.yellow} />
      <S.Top />
      <S.Body>
        <SearchHeader
          viewType={state.viewType}
          onViewTypeChange={toggleViewType}
          value={appState?.searchParams?.query}
          onChangeText={onKeywordChange}
          onSortByChanged={onSortByChanged}
          sortBy={sortBy}
        />
        {resultList}
      </S.Body>
    </S.Container>
  )
}

export default MovieSearchScreen
