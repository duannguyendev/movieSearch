/*
  ----------------------------------------------------------------------------------------------------
  priceFormatter()
  ----------------------------------------------------------------------------------------------------
  turn a number into a price
*/
export const priceFormatter = (val?: number | null) => {
  return val === null || val === undefined
    ? ''
    : '$' +
        Math.floor(val)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
