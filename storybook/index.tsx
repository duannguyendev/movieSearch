import { configure, getStorybookUI } from '@storybook/react-native'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation-locker'
import './storybookAddons'

configure(() => {}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUiRoot = getStorybookUI({})

const StorybookContainer: React.FC = () => {
  Orientation.unlockAllOrientations()

  return (
    <SafeAreaView style={styles.container}>
      <StorybookUiRoot />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default StorybookContainer
