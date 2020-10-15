import React, { createContext, Dispatch } from 'react'
import {
  propertyEnquiredStatus,
  propertyViewedStatus
} from '../constants/constants'
import {
  AuthenticatePopup,
  Favourite,
  LoadingStatus,
  NewsArticleItem,
  PropertyEnquiries,
  PropertyEnquiryStatus,
  PropertyListing,
  RecentSearches,
  SavedAlert,
  User,
  SearchParams
} from '../services/apiTypes'

export type State = {
  userStatus: LoadingStatus
  user: User | null
  authError: string | null
  tokenStatus: LoadingStatus
  token: string | null
  propertyEnquiriesStatus: LoadingStatus
  propertyEnquiries: PropertyEnquiries
  recentSearchesStatus: LoadingStatus
  recentSearches: RecentSearches
  favourites: Favourite[]
  savedListingsStatus: LoadingStatus
  savedListings: PropertyListing[]
  savedNewsListingsStatus: LoadingStatus
  savedNewsListings: NewsArticleItem[]
  savedAlertsStatus: LoadingStatus
  savedAlerts: SavedAlert[]
  signupError: string[]
  authenticatePopup: AuthenticatePopup
  searchParams: SearchParams
}

export type Action =
  | { type: 'setUser'; payload: User }
  | { type: 'setUserError' }
  | { type: 'setAuthError'; payload: string }
  | { type: 'logIn'; payload: string }
  | { type: 'setTokenError' }
  | { type: 'setPropertyEnquiries'; payload: PropertyEnquiries }
  | {
      type: 'setPropertyEnquiryStatus'
      payload: { propertyId: number; status: PropertyEnquiryStatus }
    }
  | { type: 'setPropertyEnquiriesError' }
  | { type: 'setRecentSearches'; payload: RecentSearches }
  | { type: 'setRecentSearchesError' }
  | { type: 'logOut' }
  | { type: 'addFavourite'; payload: Favourite }
  | { type: 'removeFavourite'; payload: Favourite }
  | { type: 'setFavourite'; payload: Favourite[] }
  | { type: 'setSavedListings'; payload: PropertyListing[] }
  | { type: 'savedListingsError' }
  | { type: 'setSavedNewsListings'; payload: NewsArticleItem[] }
  | { type: 'savedNewsListingsError' }
  | { type: 'setSavedAlerts'; payload: SavedAlert[] }
  | { type: 'savedAlertsError' }
  | { type: 'updateSavedAlerts'; payload: SavedAlert }
  | { type: 'reloadSavedContent'; payload?: 'error' }
  | { type: 'setSignupError'; payload: string[] }
  | { type: 'setAuthenticatePopup'; payload: AuthenticatePopup }
  | { type: 'setSearchParams'; payload: SearchParams }
  | { type: 'setSearchParamsError' }

const initialState: State = {
  userStatus: 'loading',
  user: null,
  authError: null,
  tokenStatus: 'loading',
  token: null,
  propertyEnquiriesStatus: 'loading',
  propertyEnquiries: {},
  recentSearchesStatus: 'loading',
  recentSearches: [],
  favourites: [],
  savedListingsStatus: 'success',
  savedListings: [],
  savedNewsListingsStatus: 'success',
  savedNewsListings: [],
  savedAlertsStatus: 'success',
  savedAlerts: [],
  signupError: [],
  authenticatePopup: {
    visible: false,
    x: 0,
    y: 0
  },
  searchParams: {
    orderBy: 'popularity',
    query: ''
  }
}

const AppReducerContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => {}
})

const appReducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        userStatus: 'success',
        user: action.payload
      }
    case 'setUserError':
      return {
        ...state,
        userStatus: 'fail'
      }
    case 'setAuthError':
      return {
        ...state,
        authError: action.payload
      }
    case 'logIn':
      return {
        ...state,
        tokenStatus: 'success',
        token: action.payload,
        savedListingsStatus: 'loading',
        savedNewsListingsStatus: 'loading',
        savedAlertsStatus: 'loading'
      }
    case 'setTokenError':
      return {
        ...state,
        tokenStatus: 'fail'
      }
    case 'setPropertyEnquiries':
      return {
        ...state,
        propertyEnquiries: action.payload
      }
    case 'setPropertyEnquiriesError':
      return {
        ...state,
        tokenStatus: 'fail'
      }
    case 'setPropertyEnquiryStatus':
      const status = state.propertyEnquiries[action.payload.propertyId] ?? []

      if (status[0] === propertyEnquiredStatus) {
        // We don't want to update the timestamp for an enquired property, as
        // there's a message telling the user how long ago they enquired.
        return state
      }

      const newStatus = Math.max(
        status[0] ?? propertyViewedStatus,
        action.payload.status
      ) as PropertyEnquiryStatus

      return {
        ...state,
        propertyEnquiries: {
          ...state.propertyEnquiries,
          [action.payload.propertyId]: [newStatus, Date.now()]
        }
      }
    case 'setRecentSearches':
      return {
        ...state,
        recentSearches: action.payload
      }
    case 'setRecentSearchesError':
      return {
        ...state,
        recentSearchesStatus: 'fail'
      }
    case 'logOut':
      return {
        ...state,
        user: null,
        token: null,
        propertyEnquiries: [],
        favourites: []
      }
    case 'addFavourite':
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
        ...(action.payload?.type === 'listing'
          ? { savedListingsStatus: 'loading' }
          : action.payload?.type === 'post'
          ? { savedNewsListingsStatus: 'loading' }
          : action.payload?.type === 'alert'
          ? { savedAlertsStatus: 'loading' }
          : {})
      }
    case 'removeFavourite':
      return {
        ...state,
        favourites: state.favourites.filter(it => it.id !== action.payload.id),
        ...(action.payload?.type === 'listing'
          ? { savedListingsStatus: 'reloading' }
          : action.payload?.type === 'post'
          ? { savedNewsListingsStatus: 'reloading' }
          : action.payload?.type === 'alert'
          ? { savedAlertsStatus: 'reloading' }
          : {})
      }

    case 'setSavedListings':
      return {
        ...state,
        savedListingsStatus: 'success',
        savedListings: action.payload
      }
    case 'savedListingsError':
      return {
        ...state,
        savedListingsStatus: 'fail'
      }
    case 'setSavedNewsListings':
      return {
        ...state,
        savedNewsListingsStatus: 'success',
        savedNewsListings: action.payload
      }
    case 'savedNewsListingsError':
      return {
        ...state,
        savedNewsListingsStatus: 'fail'
      }
    case 'setSavedAlerts':
      return {
        ...state,
        savedAlertsStatus: 'success',
        savedAlerts: action.payload
      }
    case 'savedAlertsError':
      return {
        ...state,
        savedAlertsStatus: 'fail'
      }
    case 'updateSavedAlerts':
      return {
        ...state,
        savedAlertsStatus: 'success',
        savedAlerts: state.savedAlerts.map(it =>
          it.id === action.payload.id ? action.payload : it
        )
      }
    case 'reloadSavedContent':
      const reloadStatus = action.payload === 'error' ? 'loading' : 'reloading'
      return {
        ...state,
        savedListingsStatus: reloadStatus,
        savedNewsListingsStatus: reloadStatus,
        savedAlertsStatus: reloadStatus
      }
    case 'setFavourite':
      return {
        ...state,
        favourites: action.payload
      }
    case 'setSignupError':
      return {
        ...state,
        signupError: action.payload
      }
    case 'setAuthenticatePopup':
      return {
        ...state,
        authenticatePopup: action.payload
      }
    case 'setSearchParams':
      return {
        ...state,
        searchParams: action.payload
      }
    default:
      return state
  }
}

export { AppReducerContext, initialState }
export default appReducer
