import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import React, { useMemo, useReducer } from 'react'
import Nav from '../components/common/Nav'
import appReducer, { AppReducerContext, initialState } from './appReducer'
import ToastProvider from './ToastProvider'

const App: React.FC = props => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const reducer = useMemo(() => ({ state, dispatch }), [state, dispatch])
  console.disableYellowBox = true

  return (
    <ActionSheetProvider>
      <AppReducerContext.Provider value={reducer}>
        <ToastProvider>
          <Nav {...props} />
        </ToastProvider>
      </AppReducerContext.Provider>
    </ActionSheetProvider>
  )
}

export default App
