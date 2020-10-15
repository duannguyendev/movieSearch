import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screens } from '../constants/screens'
import MovieSearchScreen from '../screens/movieSearch/MovieSearchScreen'

export type BuyRootStackParamList = {
  MovieSearchScreen: undefined
}
const Stack = createStackNavigator()
function SearchRouter(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName={screens.movieSearch}
      screenOptions={{ gestureEnabled: true, headerShown: false }}
    >
      <Stack.Screen
        name={screens.movieSearch}
        component={MovieSearchScreen}
        options={{ title: 'search' }}
      />
    </Stack.Navigator>
  )
}

export default SearchRouter
