export function reducer(state, action) {
  const { type, value, currentOperand, payload } = action
  const { operator, operand1, operand2, [currentOperand]: currOpValue } = state

  const isFloat = (n) => Number(n) === n && n % 1 !== 0

  const getResult = () => {
    const a = Number(operand1)
    const b = Number(operand2)
    switch (operator) {
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
  function updateHandler() {}

  console.log()
  switch (type) {
    case 'updateValue':
      return { ...state, [currentOperand]: currOpValue + value }
    case 'setFloat':
    case 'setOperator':
      return { ...state, operator: value }
    case 'delValue':
      return { ...state, [currentOperand]: '' }
    case 'resetValues':
      return { ...payload }
    case 'calcResult':
      return { ...payload, operand1: `${getResult()}`, calculated: true }
  }
}
