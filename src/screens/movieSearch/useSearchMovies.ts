import { Dispatch, useContext, useEffect } from 'react'
import { loadMovieSearch } from '../../services/api'
import { MovieSearchResults } from '../../services/apiTypes'
import { isLoadingOrReloading } from '../../utils/stateUtils'
import { Action, MovieSearchReducerContext } from './movieSearchReducer'
import { AppReducerContext } from '../../app/appReducer'

function useSearchMovies() {
  const { state, dispatch } = useContext(MovieSearchReducerContext)
  const { state: appState } = useContext(AppReducerContext)

  useEffect(() => {
    let mounted = true
    if (isLoadingOrReloading(state.searchResultsStatus)) {
      if (appState.searchParams.query.length >= 3) {
        const searchFilters = {
          ...state.searchFilters,
          query: appState.searchParams.query
        }

        loadMovieSearch(searchFilters).then(
          searchResults => mounted && onSuccess(searchResults, dispatch),
          error => mounted && onError(error, dispatch)
        )
      }
    }

    return () => {
      mounted = false
    }
  }, [
    dispatch,
    state.searchFilters,
    state.viewType,
    appState.searchParams.query,
    state.searchResultsStatus
  ])
}

function onSuccess(
  searchResults: MovieSearchResults,
  dispatch: Dispatch<Action>
) {
  dispatch({ type: 'setSearchResults', payload: searchResults })
}

function onError(error: any, dispatch: Dispatch<Action>) {
  console.warn(`Failed to load property search results: ${error}`)
  dispatch({ type: 'searchResultsError' })
}

export default useSearchMovies
