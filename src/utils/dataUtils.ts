import { Movie } from '../services/apiTypes'

function sortMoviesByPopularity(movies: Movie[], increase: boolean) {
  return movies.sort(function(a, b) {
    return increase
      ? a?.popularity - b?.popularity
      : b?.popularity - a?.popularity
  })
}

export { sortMoviesByPopularity }
