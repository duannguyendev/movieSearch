import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { fromRight } from 'react-navigation-transitions'
import { screens } from '../constants/screens'
import InforScreen from '../screens/infor/InforScreen'
export type MoreRootStackParamList = {
  More: undefined
  Agents: undefined
  News: undefined
  Research: undefined
  Calculator: undefined
}

const Stack = createStackNavigator()
function InforRouter(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName={screens.infor}
      screenOptions={{ gestureEnabled: true, headerShown: false }}
    >
      <Stack.Screen
        name={screens.infor}
        component={InforScreen}
        options={{ title: screens.infor }}
      />
    </Stack.Navigator>
  )
}

export default InforRouter
