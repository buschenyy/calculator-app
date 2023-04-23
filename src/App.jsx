import { useEffect } from 'react'
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
  const a = parseInt(num1)
  const b = parseInt(num2)
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
  const currentFillNum = calcMemo.operator ? 'num2' : 'num1'

  useEffect(() => {
    const memo = { ...calcMemo, [currentFillNum]: output }
    stateHandler([null, memo])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output])

  const stateHandler = ([output, memo]) => {
    output != null && setOutput(output)
    memo != null && setCalcMemo(memo)
  }

  const operations = {
    reset: () => ['', calcMemoInitial],
    del: () => [output.slice(0, -1), null],
    '=': () => [calculation(calcMemo).toString(), calcMemoInitial],
  }

  const buttonHandler = (target) => {
    if (typeof target === 'number') {
      if (calcMemo.operator && !calcMemo.num2) {
        setOutput(target.toString())
      } else {
        setOutput(output + target)
      }
    } else {
      if (target in operations) {
        stateHandler(operations[target]())
      } else {
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
