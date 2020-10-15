import { AppRegistry } from 'react-native'
import App from './src/app/App'
import { name as appName } from './app.json'

/** Uncomment the lines below to enable Storybook. */
// import Storybook from './storybook'
// AppRegistry.registerComponent(appName, () => Storybook)

/** Comment out the line below when enabling storybook. */
AppRegistry.registerComponent(appName, () => App)
