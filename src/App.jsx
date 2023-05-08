import { useEffect, useReducer, useState } from 'react'
import './App.css'
import './themes/themes.css'
import Button from './components/Button'
import { operationButtons } from './data/operButtons'
import { reducer } from './utils/reducer'
import ThemeSwitch from './components/ThemeSwitch'
import getFormatNum from './utils/getFromatNum'
import getInitTheme from './utils/getInitTheme'
const MAX_OPERAND_LENGTH = 9
const calcInit = {
  operand1: '0',
  operator: '',
  operand2: '',
  calculated: false,
}

function App() {
  const [theme, setTheme] = useState(getInitTheme)
  const [calc, dispatch] = useReducer(reducer, calcInit)

  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: light)')
    const updPreferTheme = (e) => setTheme(e.matches ? 'lightGray' : 'darkBlue')
    const updStorageTheme = (e) => setTheme(e.newValue)

    themeQuery.addEventListener('change', updPreferTheme)
    window.addEventListener('storage', updStorageTheme)
    return () => {
      themeQuery.removeEventListener('change', updPreferTheme)
      window.removeEventListener('storage', updStorageTheme)
    }
  }, [])

  useEffect(() => {
    if (theme && document.hasFocus()) localStorage.setItem('theme', theme)
  }, [theme])

  const currentOperand = calc.operator ? 'operand2' : 'operand1'
  const displayValue = getFormatNum(
    calc[currentOperand] && calc.operand2 ? calc.operand2 : calc.operand1
  )

  const onClickHandler = (action) => {
    switch (action.type) {
      case 'updateValue':
        return updateValueHandler()
      case 'setOperator':
        return setOperatorHandler()
      case 'calcResult':
        return calcResultHandler()
      default:
        return dispatch(action)
    }

    function updateValueHandler() {
      const isDecimal = calc[currentOperand].includes('.')
      const maxLength = isDecimal ? MAX_OPERAND_LENGTH + 1 : MAX_OPERAND_LENGTH
      if (calc[currentOperand].length >= maxLength && !calc.calculated) return
      if (isDecimal && action.value === '.' && !calc.calculated) return
      if (calc[currentOperand] === '0' && !action.value) return
      if (calc.calculated && !calc.operator)
        dispatch({ ...action, type: 'resetValues' })
      dispatch(action)
    }
    function calcResultHandler(outsideAction = action) {
      if (calc.operand1 && calc.operator && calc.operand2)
        dispatch(outsideAction)
    }
    function setOperatorHandler() {
      if (calc.operator) calcResultHandler({ ...action, type: 'calcResult' })
      dispatch(action)
    }
  }

  return (
    <div className={`App ${theme}`}>
      <div className={`header`}>
        <span className={`title`}>calc</span>
        <ThemeSwitch theme={theme} setTheme={setTheme} className={`switch`} />
      </div>
      <div className={`display`}>{displayValue}</div>
      <div className={`operationPad`}>
        {operationButtons.map(({ value, action }, i) => (
          <Button
            key={`btn${i}`}
            onClick={() =>
              onClickHandler({
                value,
                currentOperand,
                type: action,
                payload: calcInit,
                maxLength: MAX_OPERAND_LENGTH,
              })
            }
            activeOperator={calc.operator}
            value={value}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default App
