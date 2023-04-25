import { useReducer } from 'react'
import './App.css'
import Button from './components/Button'
import { operationButtons } from './data/operButtons'
import { reducer } from './utils/reducer'
const calcMemoInit = {
  operand1: null,
  operator: null,
  operand2: null,
  floatBuffer: '',
  calculated: false,
}

function App() {
  const [calcState, dispatch] = useReducer(reducer, calcMemoInit)
  const currentOperand =
    calcState.operator && calcState.operand2 !== null ? 'operand2' : 'operand1'

  let displayValue = calcState[currentOperand]

  if (calcState.floatBuffer) {
    displayValue = calcState.floatBuffer
  } else if (displayValue?.toString().length > 9) {
    displayValue = displayValue.toExponential(0)
  }

  return (
    <div>
      <div>
        <span>calc</span>
        <span>theme</span>
      </div>
      <div>{displayValue}</div>
      <div className="operationPad">
        {operationButtons.map(({ value, action }, i) => (
          <Button
            key={`btn${i}`}
            onClick={() =>
              dispatch({ value, type: action, payload: calcMemoInit })
            }
            digit={value}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default App
