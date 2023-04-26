import { useReducer, useState } from 'react'
import './App.css'
import './themes/themes.css'
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
  const [theme, setTheme] = useState('lightGray')
  const [calcState, dispatch] = useReducer(reducer, calcMemoInit)
  const currentOperand =
    calcState.operator && calcState.operand2 !== null ? 'operand2' : 'operand1'

  let displayValue = calcState[currentOperand]

  const toggleTheme = () => {}

  // If there is a float buffer, display it
  if (calcState.floatBuffer) {
    displayValue = calcState.floatBuffer
  }
  // If the value is a decimal and the calculation has been completed, round it to 9 decimal places
  else if (
    !Number.isInteger(displayValue) &&
    calcState.calculated &&
    displayValue?.toString().replace(/\D+/g, '').length > 9
  ) {
    const integerLength = Math.round(displayValue).toString().length
    displayValue = displayValue?.toFixed(9 - integerLength)
  }
  // If the value has more than 9 digits, display it in scientific notation
  else if (displayValue?.toString().replace(/\D+/g, '').length > 9) {
    displayValue = displayValue.toExponential(0)
  }
  //If there is no value, output 0
  else if (displayValue === null) {
    displayValue = '0'
  }
  return (
    <div className={`App ${theme}`}>
      <div className={`header ${theme}`}>
        <span className={`title ${theme}`}>calc</span>
        <span>theme</span>
      </div>
      <div className={`display ${theme}`}>{displayValue}</div>
      <div className={`operationPad ${theme}`}>
        {operationButtons.map(({ value, action }, i) => (
          <Button
            key={`btn${i}`}
            onClick={() =>
              dispatch({ value, type: action, payload: calcMemoInit })
            }
            value={value}
            theme={theme}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default App
