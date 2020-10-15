import { Dispatch, useContext, useEffect } from 'react'
import { loadMovieDetails } from '../../services/api'
import { MovieDetails } from '../../services/apiTypes'
import { isLoadingOrReloading } from '../../utils/stateUtils'
import { Action, MovieDetailsReducerContext } from './movieDetailsReducer'

function useMovieDetails(propertyId: number) {
  const { state, dispatch } = useContext(MovieDetailsReducerContext)

  useEffect(() => {
    let mounted = true

    if (isLoadingOrReloading(state.propertyStatus)) {
      loadMovieDetails(propertyId).then(
        movieDetails => mounted && onSuccess(movieDetails, dispatch),
        error => mounted && onError(error, dispatch)
      )
    }

    return () => {
      mounted = false
    }
  }, [dispatch, propertyId, state.propertyStatus])
}

function onSuccess(movieDetails: MovieDetails, dispatch: Dispatch<Action>) {
  dispatch({ type: 'setProperty', payload: movieDetails })
}

function onError(error: any, dispatch: Dispatch<Action>) {
  console.warn(`Failed to load property: ${error}`)
  dispatch({ type: 'propertyError' })
}

export default useMovieDetails
