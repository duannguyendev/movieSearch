import React, { ReactElement } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screens } from '../constants/screens'
import MainRouter from './MainRouter'

const Stack = createStackNavigator()
function AppRouter(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName={screens.main}
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screens.main}
        component={MainRouter}
        options={{ title: screens.main, animationEnabled: false }}
      />
    </Stack.Navigator>
  )
}

export default AppRouter
