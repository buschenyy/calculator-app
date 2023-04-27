export function reducer(state, action) {
  const { type, value, payload } = action
  const { operator, operand1, operand2 } = state
  const currOperand = operator && operand1 !== null ? 'operand2' : 'operand1'
  const filledRequiredValues =
    operand1 !== null && operand2 !== null && operator
  const { calculated, floatBuffer, [currOperand]: currOperandVal } = state
  const isNotValidValLength = (value) =>
    value?.toString().replace(/\D+/g, '').length >= 9
  const isInputNotAllowed =
    isNotValidValLength(currOperandVal) || isNotValidValLength(floatBuffer)

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
  function updateHandler() {
    if (floatBuffer) {
      return floatBufferHandler()
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
  }

  function floatBufferHandler() {
    const isFilledDecimal =
      (floatBuffer.endsWith('.') || value !== 0 || floatBuffer.length <= 1) &&
      !(floatBuffer.endsWith('.') && value === 0)
    return {
      ...state,
      [currOperand]: parseFloat(floatBuffer + value),
      floatBuffer: isFilledDecimal ? '' : floatBuffer + value,
    }
  }

  switch (type) {
    case 'updateValue':
      if (operator && operand1 === null && floatBuffer.endsWith('0')) {
        return {
          ...state,
          [currOperand]: parseFloat(floatBuffer),
          operand2: value,
          floatBuffer: '',
        }
      }

      if (operator && floatBuffer.endsWith('.') && currOperand !== 'operand2') {
        return {
          ...state,
          operand1: Number(floatBuffer),
          operand2: value,
          floatBuffer: '',
        }
      }

      if (operator && operand1 === null) {
        return {
          ...state,
          operand1: 0,
          operand2: value,
        }
      }

      if (!isInputNotAllowed || calculated) {
        return updateHandler()
      }
      return { ...state }

    case 'setFloat':
      if (calculated || isFloat(currOperandVal)) return { ...state }

      if (!currOperandVal) {
        return {
          ...state,
          floatBuffer: `0.`,
          [currOperand]: null,
        }
      }

      return {
        ...state,
        floatBuffer: currOperandVal + '.',
        [currOperand]: null,
      }

    case 'setOperator':
      return { ...state, operator: value }
    case 'delDigit':
      return { ...state, [currOperand]: null, floatBuffer: '' }
    case 'resetValues':
      return { ...payload }
    case 'calcResult':
      if (
        (currOperand === 'operand2' && floatBuffer.endsWith('0')) ||
        floatBuffer.endsWith('.')
      ) {
        return {
          ...payload,
          operand1: getResult({
            ...state,
            operand2: parseFloat(floatBuffer),
          }),
          calculated: true,
        }
      }
      if (!filledRequiredValues) return { ...state }

      return {
        ...payload,
        operand1: getResult(state),
        calculated: true,
      }
  }
}
