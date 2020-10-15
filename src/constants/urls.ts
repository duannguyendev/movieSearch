export const host = 'api.themoviedb.org/3'
const rootUrl = 'https://' + host

const urls = {
  rootUrl,
  api: () => `${rootUrl}`
}

export default urls
