import { Dimensions } from 'react-native'

function getMovieCardWidth() {
  return Math.min(Dimensions.get('window').width - 28, 336)
}

export { getMovieCardWidth }
