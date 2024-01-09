export const formatNumber = (number = 0) => {
  const str = String(number)

  return str
    .split('')
    .reduce(
      (a, b, i) =>
        a + (i && !((str.length - i) % 3) ? ',' : '') + b,
      '',
    )
}

export { formatDistance } from 'date-fns'
