import { calculate, isFloat } from '.'

const floatBufferHandler = (state, buffer, operand, value) => {
  const isFilledDecimal =
    (buffer.endsWith('.') || value !== 0 || buffer.length <= 1) &&
    !(buffer.endsWith('.') && value === 0)

  return {
    ...state,
    [operand]: parseFloat(buffer + value),
    floatBuffer: isFilledDecimal ? '' : buffer + value,
  }
}

export function reducer(state, action) {
  const { type, value, payload } = action
  const { operator, operand1, operand2 } = state
  const currOperand = operator && operand1 ? 'operand2' : 'operand1'
  const filledRequiredValues = operand1 && operand2 && operator
  const { calculated, floatBuffer, [currOperand]: currOperandVal } = state

  switch (type) {
    case 'updateValue':
      if (floatBuffer) {
        return floatBufferHandler(state, floatBuffer, currOperand, value)
      }

      if (isFloat(currOperandVal) && value === 0) {
        return {
          ...state,
          floatBuffer: `${currOperandVal}${value}`,
          [currOperand]: null,
        }
      }

      if (calculated) {
        return {
          ...state,
          [currOperand]: value,
          calculated: false,
        }
      }
      return {
        ...state,
        [currOperand]:
          currOperandVal !== null
            ? parseFloat(`${state[currOperand]}${value}`)
            : value,
      }
    case 'setFloat':
      if (calculated) return { ...state }

      if (isFloat(currOperandVal)) return { ...state }

      return {
        ...state,
        floatBuffer: currOperandVal + '.',
        [currOperand]: null,
      }

    case 'setOperator':
      return { ...state, operator: value }
    case 'delDigit':
      return { ...state, [currOperand]: null }
    case 'resetValues':
      return { ...payload }
    case 'calcResult':
      if (!filledRequiredValues) return { ...state }
      return {
        ...payload,
        operand1: calculate(state),
        calculated: true,
      }
  }
}
