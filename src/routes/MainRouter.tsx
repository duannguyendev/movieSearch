import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screens } from '../constants/screens'
import MovieDetailsScreen from '../screens/movieDetails/MovieDetailsScreen'
import WebViewScreen from '../screens/webView/WebViewScreen'
import HomeRouter from './HomeRouter'
import { SearchViewType } from '../screens/movieSearch/movieSearchReducer'

export type MainRootStackParamList = {
  FilterSearchScreen: undefined
  PrestigeSearchScreen: undefined
  MovieDetailsScreen: { propertyId?: number }
  PropertyMediaScreen: {
    property?: any
    mediaType?: any
    index?: number
    isAutoTriggered?: boolean
    onBackFromPropertyMedia?: Function
    onPressContactAgent?: Function
  }
  AgentDetailsScreen: { slug?: string }
  AgencyDetailsScreen: { id?: number; slug?: string }
  WebViewScreen: { uri?: string }
  NewListingsScreen: { listingType?: any; propertyCount?: any }
  NewsArticleScreen: { articleId: number }
  DisclaimerScreen: { type: string }
  ForgotPasswordScreen: undefined
  MovieSearchScreen: {
    viewType?: SearchViewType
    searchItems?: any
    isMyMovieSearch?: boolean
    filters?: any
    screen?: any
    frequency?: number
  }
  ResearchSuburbScreen: { slug?: string }
  ResearchAddressScreen: { slug?: string }
  ResearchStreetScreen: { slug?: string }
  ResearchRegionScreen: { slug: string; title: string }
  DevelopmentMediaScreen: {
    development?: any
    mediaType?: any
    index?: number
    isAutoTriggered?: boolean
    onBackFromDevelopmentMedia?: Function
    onPressContactAgent?: Function
  }
  DevelopmentDetailsScreen: { developmentSlug?: string }
}

const Stack = createStackNavigator()

function MainRouter(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName={screens.home}
      screenOptions={{ gestureEnabled: true, headerShown: false }}
    >
      <Stack.Screen
        name={screens.home}
        component={HomeRouter}
        options={{ title: screens.home, headerShown: false }}
      />
      <Stack.Screen
        name={screens.movieDetails}
        component={MovieDetailsScreen}
        options={{ title: screens.movieDetails }}
      />
      <Stack.Screen
        name={screens.webView}
        component={WebViewScreen}
        options={{ title: screens.webView }}
      />
    </Stack.Navigator>
  )
}

export default MainRouter
