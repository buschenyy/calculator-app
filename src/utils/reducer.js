export function reducer(state, action) {
  const { type, value, payload } = action
  // const { operator, operand1, operand2 } = state
  const currOperand = state.operator ? 'operand2' : 'operand1'
  const {
    operator,
    operand2,
    floatBuffer,
    [currOperand]: currOperandVal,
  } = state

  const isFloat = (n) => Number(n) === n && n % 1 !== 0
  const isNotValidValLength = (value) =>
    value?.toString().replace(/\D+/g, '').length >= 9
  const isInputNotAllowed =
    isNotValidValLength(currOperandVal) || isNotValidValLength(floatBuffer)

  function updateHandler() {
    const { operand1, calculated, floatBuffer } = state

    if (isInputNotAllowed && !calculated) return { ...state }

    // Если оператор установлен:
    if (operator) {
      // Если первый операнд равен null:
      if (isNaN(operand1) || operand1 === 0) {
        // Если float-буфер заканчивается на '0':
        if (floatBuffer.endsWith('0')) {
          // Сохраняем значение из буфера как первый операнд и устанавливаем значение value как второй операнд:
          return {
            ...state,
            operand1: Number(floatBuffer),
            operand2: value,
            floatBuffer: '',
          }
        } else if (floatBuffer.endsWith('.')) {
          return {
            ...state,
            operand1: Number(floatBuffer.slice(0, -1)),
            operand2: value,
            floatBuffer: '',
          }
        } else {
          // Устанавливаем 0 как первый операнд и значение value как второй операнд:
          return {
            ...state,
            operand1: 0,
            operand2: value,
          }
        }
      }
      // Если float-буфер заканчивается на '.' и текущий операнд не является вторым операндом:
      else if (floatBuffer.endsWith('.') && currOperand !== 'operand2') {
        // Сохраняем значение из буфера как первый операнд и устанавливаем значение value как второй операнд:
        return {
          ...state,
          operand1: Number(floatBuffer),
          operand2: value,
          floatBuffer: '',
        }
      }
    }

    // Если есть float-буфер, то вызываем floatBufferHandler():
    if (floatBuffer) {
      return floatBufferHandler()
    }

    // Если был выполнен предыдущий расчет или текущее значение операнда является числом с плавающей точкой и значение равно 0:
    if (calculated || (isFloat(currOperandVal) && value === 0)) {
      // Устанавливаем новое значение текущего операнда и сбрасываем флаг выполненного расчета; если текущее значение операнда является числом с плавающей точкой и значение равно 0, то устанавливаем float-буфер:
      return {
        ...state,
        [currOperand]: value,
        calculated: false,
        floatBuffer:
          isFloat(currOperandVal) && value === 0 && !isInputNotAllowed
            ? `${currOperandVal}${value}`
            : '',
      }
    }

    // Если текущее значение операнда не является null, то добавляем новое значение к существующему, иначе устанавливаем новое значение в качестве значения текущего операнда:
    const newValue =
      currOperandVal !== null ? Number(`${state[currOperand]}${value}`) : value
    return {
      ...state,
      [currOperand]: newValue,
    }
  }

  function floatBufferHandler() {
    const isFilledDecimal =
      (floatBuffer.endsWith('.') || value) &&
      !(floatBuffer.endsWith('.') && !value)
    return {
      ...state,
      [currOperand]: Number(floatBuffer + value),
      floatBuffer: isFilledDecimal ? '' : floatBuffer + value,
    }
  }

  function calcHandler() {
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
    // Если текущий операнд является вторым операндом и буфер заканчивается на '0' или '.', то сохраняем значение буфера как второй операнд и вычисляем результат.
    if (
      (currOperand === 'operand2' && floatBuffer.endsWith('0')) ||
      floatBuffer.endsWith('.')
    ) {
      return {
        ...payload,
        operand1: getResult({
          ...state,
          operand2: Number(floatBuffer),
        }),
        calculated: true,
      }
    }
    const filledRequiredValues = operand2 !== null && operator
    if (!filledRequiredValues) return { ...state }

    return {
      ...payload,
      operand1: getResult(state),
      calculated: true,
    }
  }

  function setFloatHandler() {
    // Если результат уже вычислен или текущий операнд уже имеет дробную часть, то ничего не делаем.
    if (isFloat(currOperandVal) || floatBuffer || isInputNotAllowed)
      return { ...state }

    // Если текущий операнд равен null, то устанавливаем 0. как значение буфера.
    if (currOperandVal === null || state.calculated) {
      return {
        ...state,
        floatBuffer: `0.`,
        [currOperand]: Number(floatBuffer),
        calculated: false,
      }
    }

    // В остальных случаях добавляем '.' в конец значения текущего операнда.
    return {
      ...state,
      floatBuffer: currOperandVal + '.',
      [currOperand]: Number(floatBuffer),
    }
  }

  switch (type) {
    case 'updateValue':
      return updateHandler()

    case 'setFloat':
      return setFloatHandler()

    case 'setOperator':
      if (operator && operand2 !== null) {
        return { ...calcHandler(), operator: value }
      }
      // Устанавливаем значение оператора.
      return { ...state, operator: value }

    case 'delDigit':
      // Удаляем последний символ из текущего операнда и буфера.
      return { ...state, [currOperand]: payload[currOperand], floatBuffer: '' }

    case 'resetValues':
      // Сбрасываем все значения до начальных.
      return { ...payload }

    case 'calcResult':
      return calcHandler()
  }
}
