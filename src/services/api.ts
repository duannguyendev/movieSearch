import fetchIntercept from 'fetch-intercept'
import VersionNumber from 'react-native-version-number'
import urls from '../constants/urls'
import {
  MovieSearchFilters,
  HttpMethod,
  MovieSearchResults,
  MovieDetails
} from './apiTypes'
import { replaceSmartPunctuation } from './stringHelpers'

fetchIntercept.register({
  response: (response: Response) => {
    if (response.status >= 400) {
    }
    return response
  },
  responseError: error => {
    return Promise.reject(error)
  }
})

const API_KEY = '3b6d59f3df99856f731e706def0e4fd2'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'MovieSearch-App-Version': VersionNumber.appVersion
}

async function responseWithStatusCode(res: Response) {
  const data = await res.json()
  return {
    ...data,
    statusCode: res.status
  }
}

async function loadMovieDetails(movieId: number): Promise<MovieDetails> {
  const url = `${urls.api()}/movie/${movieId}`
  return await getApiData(url, {
    api_key: API_KEY
  })
}

async function loadMovieSearch(
  filters: MovieSearchFilters
): Promise<MovieSearchResults> {
  const url = `${urls.api()}/search/movie`
  return await getApiData(url, {
    ...filters,
    api_key: API_KEY
  })
}

export function buildUrl(url: string, params?: any) {
  if (!params) {
    return url
  }

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === null || value === undefined || value === '') {
      delete params[key]
    }
  })

  const query = Object.keys(params)
    .map(
      k =>
        encodeURIComponent(k) +
        '=' +
        encodeURIComponent(replaceSmartPunctuation(params[k]))
    )
    .join('&')

  return `${url}?${query}`
}

async function getApiData(url: string, params?: any, authToken?: string) {
  const res = await fetch(
    buildUrl(url, params),
    buildHeader('GET', null, authToken)
  )
  const data = await res.json()
  if (res.ok) {
    return data
  } else {
    throw new Error(res.statusText)
  }
}

function buildHeader(method: HttpMethod, body?: any, authToken?: string) {
  return {
    method,
    headers: {
      ...defaultHeaders,
      Authorization: authToken ? `JWT ${authToken}` : undefined
    },
    body: body ? JSON.stringify(body) : undefined
  } as RequestInit
}

export { loadMovieSearch, loadMovieDetails }
