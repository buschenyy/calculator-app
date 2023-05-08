const getFormatNum = (num, separator = ' ') => {
  if (isNaN(+num) || !Number.isFinite(+num)) return 'Error'
  const completeDecimal = num.endsWith('.') ? '.' : ''
  const [int, decimal = ''] = num.split('.', 2)
  const formatInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  return `${formatInt}${decimal ? `.${decimal}` : ''}${completeDecimal}`
}

export default getFormatNum
