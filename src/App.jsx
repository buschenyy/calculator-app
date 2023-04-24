import { useReducer } from 'react'
import './App.css'
import Button from './components/Button'
import { operationButtons } from './data/operButtons'

const calcMemoInit = {
  operand1: '',
  operator: '',
  operand2: '',
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
          [currentOperand]: value.toString(),
          calculated: false,
        }
      }

      return {
        ...state,
        [currentOperand]: state[currentOperand] + value,
      }
    case 'setOperator':
      return { ...state, operator: value }
    case 'delDigit':
      return { ...state, [currentOperand]: '' }
    case 'resetValues':
      return { ...calcMemoInit }
    case 'calcResult':
      return {
        ...calcMemoInit,
        operand1: calculate(state).toString(),
        calculated: true,
      }
  }
}

const calculate = ({ operand1, operand2, operator }) => {
  const a = parseInt(operand1)
  const b = parseInt(operand2)
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
