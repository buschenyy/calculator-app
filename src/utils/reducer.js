export function reducer(state, action) {
  const { type, currentOperand } = action

  switch (type) {
    case 'updateValue':
      return { ...state, [currentOperand]: getCorrectPrevVal() + action.value }
    case 'setOperator':
      return { ...state, operator: action.value, calculated: false }
    case 'delValue':
      return { ...state, [currentOperand]: '0' }
    case 'resetValues':
      return { ...action.payload }
    case 'calcResult':
      return { ...action.payload, operand1: getResult(), calculated: true }
  }

  function getCorrectPrevVal() {
    if (state[currentOperand] === '0' && action.value !== '.') return ''
    if (!state[currentOperand] && action.value === '.') return '0'
    return state[currentOperand]
  }

  function getResult() {
    const result = calcResult()
    // log
    console.table({ ...state, result })
    const hasAllowableLength = result.toString().length <= action.maxLength
    if (hasAllowableLength) return `${result}`

    const intLength = Math.round(Math.abs(result)).toString().length
    if (intLength > action.maxLength) return result.toPrecision(1)

    if (!Number.isInteger(result))
      return `${Number(result.toFixed(action.maxLength - intLength))}`

    return `${result}`
  }

  function calcResult() {
    const a = Number(state.operand1)
    const b = Number(state.operand2)
    switch (state.operator) {
      case '/':
        return a / b
      case 'x':
        return a * b
      case '-':
        return a - b
      case '+':
        return a + b
    }
  }
}
