import { useState } from 'react'
import './App.css'
import Button from './components/Button'
const operators = ['.', '/', 'x', '-', '+', 'del', 'reset', '=']
const buttons = Array.from({ length: 10 }, (_, i) => i).concat(operators)
const calcMemoInitial = {
  num1: '',
  operator: '',
  num2: '',
}

const calculation = ({ num1, num2, operator }) => {
  const a = parseInt(num1),
    b = parseInt(num2)
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
  const [calcMemo, setCalcMemo] = useState(calcMemoInitial)
  const [output, setOutput] = useState('')

  const buttonHandler = (target) => {
    if (typeof target === 'number') {
      if (calcMemo.operator && !calcMemo.num2) {
        setOutput(target.toString())
      } else {
        setOutput(output.concat(target))
      }
      setCalcMemo({
        ...calcMemo,
        [calcMemo.operator ? 'num2' : 'num1']: calcMemo.operator
          ? calcMemo.num2.concat(target)
          : calcMemo.num1.concat(target),
      })
    } else {
      switch (target) {
        case 'reset':
          setCalcMemo(calcMemoInitial)
          setOutput('')
          break
        case 'del':
          setOutput(output.slice(0, -1))
          setCalcMemo({
            ...calcMemo,
            [calcMemo.operator ? 'num2' : 'num1']: output.slice(0, -1),
          })
          break
        case '=':
          setOutput(calculation(calcMemo).toString())
          setCalcMemo({
            ...calcMemoInitial,
            num1: calculation(calcMemo).toString(),
          })
          break
        default:
          setCalcMemo({ ...calcMemo, operator: target })
      }
    }
  }
  return (
    <div>
      <div>
        <span>calc</span>
        <span>theme</span>
      </div>
      <div>{output}</div>
      <div className="operationPad">
        {buttons.map((digit, i) => (
          <Button
            key={`btn${i}`}
            onClick={() => buttonHandler(digit)}
            digit={digit}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default App
