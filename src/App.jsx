import { useReducer } from 'react'
import './App.css'
import Button from './components/Button'
import { operationButtons } from './data/operButtons'

const calcMemoInit = {
  operand1: null,
  operator: null,
  operand2: null,
  calculated: false,
}

function reducer(state, action) {
  const { operator, calculated } = state
  const { type, value } = action
  const currentOperand = operator ? 'operand2' : 'operand1'
  switch (type) {
    case 'updateValue':
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
          state[currentOperand] != null
            ? parseFloat(state[currentOperand].toString() + value)
            : value,
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
    calcState.operator && calcState.operand2 ? 'operand2' : 'operand1'

  return (
    <div>
      <div>
        <span>calc</span>
        <span>theme</span>
      </div>
      <div>{calcState[currentOperand]}</div>
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
