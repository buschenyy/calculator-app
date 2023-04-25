import { calculate, isFloat } from '.'

const floatBufferHandler = (state, buffer, operand, value) => {
  const isFilledDecimal = buffer.endsWith('.') && buffer.length > 1

  return {
    ...state,
    [operand]: parseFloat(buffer + value),
    floatBuffer: isFilledDecimal ? '' : buffer + value,
  }
}

export function reducer(state, action) {
  const { type, value, payload } = action
  const currentOperand = state.operator ? 'operand2' : 'operand1'
  const {
    calculated,
    floatBuffer,
    [currentOperand]: currentOperandValue,
  } = state
  switch (type) {
    case 'updateValue':
      if (floatBuffer) {
        return floatBufferHandler(state, floatBuffer, currentOperand, value)
      }

      if (calculated) {
        return {
          ...state,
          [currentOperand]: value,
          calculated: false,
        }
      }
      console.log(`${state[currentOperand]}${value}`)
      return {
        ...state,
        [currentOperand]:
          currentOperandValue !== null
            ? parseFloat(`${state[currentOperand]}${value}`)
            : value,
      }
    case 'setFloat':
      if (isFloat(currentOperandValue)) return { ...state }

      return {
        ...state,
        floatBuffer: currentOperandValue + '.',
        [currentOperand]: null,
      }

    case 'setOperator':
      return { ...state, operator: value }
    case 'delDigit':
      return { ...state, [currentOperand]: null }
    case 'resetValues':
      return { ...payload }
    case 'calcResult':
      return {
        ...payload,
        operand1: calculate(state),
        calculated: true,
      }
  }
}
