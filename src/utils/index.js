export const isFloat = (n) => Number(n) === n && n % 1 !== 0

export const calculate = ({ operand1, operand2, operator }) => {
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
