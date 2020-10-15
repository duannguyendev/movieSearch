import { useCallback, useContext, useState } from 'react'
import { NavigationContext } from '@react-navigation/native'
import { screens } from '../../constants/screens'

/**
 * Because the property details navigation pushes a new screen onto the stack,
 * a user can tap a button multiple times and multiple screens will be pushed.
 * This constant is used to ignore subsequent taps for a short time to prevent
 * accidental double screen pushes.
 */
const msBetweenTaps = 1000

function useMovieDetailsNavigation() {
  const nav = useContext(NavigationContext)

  const [lastPushed, setLastPushed] = useState(0)

  const toMovieDetails = useCallback(
    (propertyId: number) => {
      if (Date.now() - lastPushed > msBetweenTaps) {
        setLastPushed(Date.now())
        nav?.navigate(screens.movieDetails, { propertyId })
      }
    },
    [lastPushed, nav]
  )

  return {
    toMovieDetails
  }
}

export default useMovieDetailsNavigation
