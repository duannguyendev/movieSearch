import { Feature, Point } from '@turf/helpers/lib/geojson'
import { BBox, FeatureCollection, GeoJsonProperties, Polygon } from 'geojson'

export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export type LoadingStatus = 'loading' | 'reloading' | 'success' | 'fail'

export type MyMovieSearchViewType = 'login' | 'sign-up'

export type PagingResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type MovieSearchFilters = {
  language?: string
  query?: string
  page: number
  include_adult?: boolean
  region?: string
  year?: number
  primary_release_year?: number
}

export type Movie = {
  popularity: number
  vote_count: number
  video: boolean
  poster_path: string
  id: number
  adult: boolean
  backdrop_path: string
  original_language: string
  original_title: string
  genre_ids: number
  title: string
  vote_average: number
  overview: string
  release_date: string
}

export type MovieDetails = Movie & {
  budget: number
  homepage: string
  original_title: string
  production_companies: Company[]
  production_countries: Country[]
  genres: Genre[]
  tagline: string
}
export type Genre = {
  id: number
  name: string
}
export type Country = {
  iso_3166_1: string
  name: string
}
export type Company = {
  id: number
  name: string
  logo_path: string
  origin_country: string
}

export type MovieSearchResults = {
  page: number
  total_results: number
  total_pages: number
  results: Movie[]
}

export type SearchParams = {
  orderBy: string
  query: string
}
