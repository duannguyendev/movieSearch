import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IconSearch from '../assets/icon/icon-search.svg'
import IconNavMore from '../assets/icon/icon-about.svg'
import { screens } from '../constants/screens'
import { colors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import SearchRouter from './SearchRouter'
import InforRouter from './InforRouter'

const Tab = createBottomTabNavigator()

function HomeRouter(): React.ReactElement {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.purple,
        inactiveTintColor: colors.grey,
        labelStyle: {
          fontSize: 12,
          fontFamily: fonts.medium
        },
        style: {
          paddingHorizontal: 30,
          backgroundColor: colors.blueLight,
          borderTopColor: colors.greyMedium,
          borderTopWidth: 0.5
        },
        tabStyle: {
          paddingVertical: 4
        }
      }}
    >
      <Tab.Screen
        name={screens.search}
        component={SearchRouter}
        options={{
          tabBarLabel: screens.search,
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return focused ? (
              <IconSearch width={15} height={15} fill={colors.purple} />
            ) : (
              <IconSearch width={15} height={15} />
            )
          }
        }}
      />

      <Tab.Screen
        name={screens.infor}
        component={InforRouter}
        options={{
          tabBarLabel: screens.infor,
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return focused ? (
              <IconNavMore width={15} height={15} fill={colors.purple} />
            ) : (
              <IconNavMore width={15} height={15} />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeRouter
