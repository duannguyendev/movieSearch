import { useContext, useLayoutEffect } from 'react'
import { NavigationContext } from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker'

type Props = {
  portrait?: boolean
  landscape?: boolean
}

function useOrientation(orientation: Props) {
  const nav = useContext(NavigationContext)

  const { portrait, landscape } = orientation

  useLayoutEffect(() => {
    const navListener = nav?.addListener('focus', () => {
      if (portrait && landscape) {
        Orientation.unlockAllOrientations()
      } else if (landscape) {
        Orientation.lockToLandscape()
      } else {
        Orientation.lockToPortrait()
      }
    })

    return navListener
  }, [landscape, nav, portrait])
}

export default useOrientation
