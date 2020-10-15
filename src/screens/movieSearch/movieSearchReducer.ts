import React, { createContext, Dispatch } from 'react'
import {
  LoadingStatus,
  MovieSearchFilters,
  MovieSearchResults,
  PagingResponse
} from '../../services/apiTypes'
import moment from 'moment'

export type SearchViewType = 'this_year' | 'last_year'

export type State = {
  viewType: SearchViewType
  searchFilters: MovieSearchFilters
  searchResultsStatus: LoadingStatus
  searchResults: MovieSearchResults | null
  query: string
}

export type Action =
  | { type: 'reload'; payload?: 'error' }
  | { type: 'propertyError' }
  | { type: 'setViewType'; payload: SearchViewType }
  | { type: 'setSearchFilters'; payload: MovieSearchFilters }
  | { type: 'setSearchResultsLoading' }
  | { type: 'setSearchResults'; payload: MovieSearchResults }
  | { type: 'searchResultsError' }
  | { type: 'setQuery'; payload: string }

const initialFilters: MovieSearchFilters = {
  page: 1,
  year: parseInt(moment().format('YYYY')),
  query: ''
}

const initialState: State = {
  viewType: 'this_year',
  searchResultsStatus: 'success',
  searchResults: null,
  searchFilters: initialFilters,
  query: ''
}

const MovieSearchReducerContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => {}
})

const movieSearchReducer: React.Reducer<State, Action> = (
  state,
  action
): State => {
  switch (action.type) {
    case 'reload':
      const reloadStatus = action.payload === 'error' ? 'loading' : 'reloading'
      return {
        ...state,
        searchResultsStatus: reloadStatus
      }
    case 'setViewType':
      const viewType = action.payload
      let requestYear = parseInt(moment().format('YYYY'))
      if (viewType !== 'this_year') {
        requestYear = parseInt(
          moment()
            .subtract('year', 1)
            .format('YYYY')
        )
      }
      let searchFilters = state.searchFilters
      return {
        ...state,
        viewType: viewType,
        searchFilters: { ...searchFilters, year: requestYear, page: 1 },
        searchResults: null,
        searchResultsStatus: 'loading'
      }
    case 'setSearchFilters':
      let filterPayload = action.payload
      const isNewQuery = filterPayload.query !== state.searchFilters.query
      return {
        ...state,
        searchFilters: {
          ...filterPayload,
          page: isNewQuery ? 1 : filterPayload.page
        },
        searchResults: isNewQuery ? null : state.searchResults,
        searchResultsStatus: isNewQuery ? 'loading' : 'reloading'
      }
    case 'setSearchResultsLoading':
      return {
        ...state,
        searchResults:
          state.searchFilters.page === 1 ? null : state.searchResults,
        searchResultsStatus: 'loading'
      }
    case 'setSearchResults':
      let payload = action.payload
      if (
        state.searchFilters.page > 1 &&
        state.searchResults?.results?.length
      ) {
        payload.results.unshift(...state.searchResults?.results)
      }
      return {
        ...state,
        searchResults: payload,
        searchResultsStatus: 'success'
      }
    case 'searchResultsError':
      console.warn('Failed to get search results')
      return {
        ...state,
        searchResultsStatus: 'fail'
      }
    case 'setQuery':
      return {
        ...state,
        query: action.payload
      }

    default:
      return state
  }
}

export { MovieSearchReducerContext, initialFilters, initialState }
export default movieSearchReducer
