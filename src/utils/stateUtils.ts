import { LoadingStatus } from '../services/apiTypes'

function isLoadingOrReloading(...statuses: LoadingStatus[]) {
  return isLoading(...statuses) || isReloading(...statuses)
}

function isLoading(...statuses: LoadingStatus[]) {
  return hasStatus(statuses, 'loading')
}

function isReloading(...statuses: LoadingStatus[]) {
  return hasStatus(statuses, 'reloading')
}

function isFailure(...statuses: LoadingStatus[]) {
  return hasStatus(statuses, 'fail')
}

function hasStatus(statuses: LoadingStatus[], status: LoadingStatus) {
  return statuses.find(it => it === status) !== undefined
}

export { isLoadingOrReloading, isLoading, isReloading, isFailure }
