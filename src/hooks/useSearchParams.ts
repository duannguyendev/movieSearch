import { Dispatch, useContext, useEffect } from 'react'
import { Action, AppReducerContext } from '../app/appReducer'
import { SearchParams } from '../services/apiTypes'
import { loadSearchParams, storeSearchParams } from '../utils/asyncStorageUtil'

function useSearchParams() {
  const { state, dispatch } = useContext(AppReducerContext)

  useEffect(() => {
    let mounted = true

    loadSearchParams().then(
      searchParams => mounted && onSuccess(searchParams, dispatch),
      error => mounted && onError(error, dispatch)
    )

    return () => {
      mounted = false
    }
  }, [dispatch])

  useEffect(() => {
    storeSearchParams(state.searchParams).catch(e => {
      console.warn(`Failed to store search params: ${e}`)
    })
  }, [state.searchParams])
}

function onSuccess(searchParams: SearchParams, dispatch: Dispatch<Action>) {
  dispatch({ type: 'setSearchParams', payload: searchParams })
}

function onError(error: any, dispatch: Dispatch<Action>) {
  console.warn(`Failed to load search params: ${error}`)
  dispatch({ type: 'setSearchParamsError' })
}

export default useSearchParams
