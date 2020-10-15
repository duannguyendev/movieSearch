import AsyncStorage from '@react-native-community/async-storage'
import { SearchParams } from '../services/apiTypes'

async function loadSearchParams(): Promise<SearchParams> {
  const json = await AsyncStorage.getItem('@search_params')
  return json
    ? (JSON.parse(json) as SearchParams)
    : { orderBy: 'popularity', query: '' }
}

async function storeSearchParams(searchParams: SearchParams) {
  const json = JSON.stringify(searchParams)
  await AsyncStorage.setItem('@search_params', json)
}

export { loadSearchParams, storeSearchParams }
