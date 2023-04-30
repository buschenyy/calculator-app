import { useReducer, useState } from 'react'
import './App.css'
import './themes/index.css'
import Button from './components/Button'
import { operationButtons } from './data/operButtons'
import { reducer } from './utils/reducer'
import ThemeSwitch from './components/ThemeSwitch'
const calcMemoInit = {
  operand1: '',
  operator: '',
  operand2: '',
  calculated: false,
}

function App() {
  const [theme, setTheme] = useState('darkBlue')
  const [calcState, dispatch] = useReducer(reducer, calcMemoInit)
  const currentOperand = calcState.operator ? 'operand2' : 'operand1'

  const onClickHandler = (action) => {
    dispatch(action)
  }

  return (
    <div className={`App ${theme}`}>
      <div className={`header`}>
        <span className={`title`}>calc</span>
        <ThemeSwitch theme={theme} setTheme={setTheme} className={`switch`} />
      </div>
      <div className={`display`}>{calcState[currentOperand]}</div>
      <div className={`operationPad`}>
        {operationButtons.map(({ value, action }, i) => (
          <Button
            key={`btn${i}`}
            onClick={() =>
              onClickHandler({ value, currentOperand, type: action, payload: calcMemoInit })
            }
            value={value}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default App
