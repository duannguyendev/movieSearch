import React, { createContext, Dispatch } from 'react'
import { LoadingStatus, MovieDetails } from '../../services/apiTypes'

export type State = {
  propertyStatus: LoadingStatus
  property: MovieDetails | null
}

export type Action =
  | { type: 'reload'; payload?: 'error' }
  | { type: 'requestMovieDetails' }
  | { type: 'setProperty'; payload: MovieDetails }
  | { type: 'propertyError' }

const initialState: State = {
  propertyStatus: 'loading',
  property: null
}

const MovieDetailsReducerContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => {}
})

const movieDetailsReducer: React.Reducer<State, Action> = (
  state,
  action
): State => {
  switch (action.type) {
    case 'reload':
      const reloadStatus = action.payload === 'error' ? 'loading' : 'reloading'
      return {
        ...state,
        propertyStatus: reloadStatus
      }

    case 'requestMovieDetails':
      return {
        ...state,
        propertyStatus: 'loading',
        property: null
      }
    case 'setProperty':
      return {
        ...state,
        propertyStatus: 'success',
        property: action.payload
      }
    case 'propertyError':
      return {
        ...state,
        propertyStatus: 'fail'
      }
    default:
      return state
  }
}

export { MovieDetailsReducerContext, initialState }
export default movieDetailsReducer
