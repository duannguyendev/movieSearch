import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { StyleProp, ViewStyle, Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import styled from 'styled-components/native'
import appReducer, {
  AppReducerContext,
  initialState
} from '../../app/appReducer'
import useSearchParams from '../../hooks/useSearchParams'
import AppRouter from '../../routes/AppRouter'

type Props = {
  style?: StyleProp<ViewStyle>
}

const S = {
  Container: styled.View`
    flex: 1;
  `
}

const GlobalDataLoader: React.FC = () => {
  useSearchParams()
  return <></>
}

const Nav: React.FC<Props> = props => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const reducer = useMemo(() => ({ state, dispatch }), [state, dispatch])
  const appRef = useRef(null)

  return (
    <AppReducerContext.Provider value={reducer}>
      <S.Container>
        <NavigationContainer {...props} ref={appRef}>
          <AppRouter />
          <GlobalDataLoader />
        </NavigationContainer>
      </S.Container>
    </AppReducerContext.Provider>
  )
}

export default Nav
