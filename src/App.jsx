import { useReducer } from 'react'
import './App.css'
import Button from './components/Button'
import { operationButtons } from './data/operButtons'

const isFloat = (n) => Number(n) === n && n % 1 !== 0

const calcMemoInit = {
  operand1: null,
  operator: null,
  operand2: null,
  floatBuffer: '',
  calculated: false,
}

function reducer(state, action) {
  const { type, value } = action
  const currentOperand = state.operator ? 'operand2' : 'operand1'
  const {
    calculated,
    floatBuffer,
    [currentOperand]: currentOperandValue,
  } = state
  switch (type) {
    case 'updateValue':
      if (floatBuffer) {
        if (floatBuffer.endsWith('.') && floatBuffer.length > 1) {
          return {
            ...state,
            floatBuffer: '',
            [currentOperand]: parseFloat(floatBuffer + value),
          }
        }
        return {
          ...state,
          floatBuffer: floatBuffer + value,
          [currentOperand]: parseFloat(floatBuffer + value),
        }
      }

      if (calculated) {
        return {
          ...state,
          [currentOperand]: value,
          calculated: false,
        }
      }
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
      return { ...calcMemoInit }
    case 'calcResult':
      return {
        ...calcMemoInit,
        operand1: calculate(state),
        calculated: true,
      }
  }
}

const calculate = ({ operand1, operand2, operator }) => {
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

function App() {
  const [calcState, dispatch] = useReducer(reducer, calcMemoInit)
  const currentOperand =
    calcState.operator && calcState.operand2 !== null ? 'operand2' : 'operand1'

  return (
    <div>
      <div>
        <span>calc</span>
        <span>theme</span>
      </div>
      <div>
        {calcState.floatBuffer
          ? calcState.floatBuffer
          : calcState[currentOperand]}
      </div>
      <div className="operationPad">
        {operationButtons.map(({ value, action }, i) => (
          <Button
            key={`btn${i}`}
            onClick={() => dispatch({ value, type: action })}
            digit={value}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default App
