export function reducer(state, action) {
  const { type, value, currentOperand, payload } = action
  const { operator, operand1, operand2, [currentOperand]: currOpValue } = state

  const isFloat = (n) => Number(n) === n && n % 1 !== 0

  const getResult = ({ operand1, operand2, operator }) => {
    switch (operator) {
      case '/':
        return operand1 / operand2
      case 'x':
        return operand1 * operand2
      case '-':
        return operand1 - operand2
      case '+':
        return operand1 + operand2
    }
  }
  function updateHandler() {}

  console.log()
  switch (type) {
    case 'updateValue':
      return { ...state, [currentOperand]: currOpValue + value }
    case 'setFloat':
    case 'setOperator':
    case 'delDigit':
    case 'resetValues':
    case 'calcResult':
  }
}
