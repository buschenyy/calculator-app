import './App.css'
import Button from './components/Button'
const operators = ['.', '/', 'x', '-', '+', 'del', 'reset', '=']
const buttons = Array.from({ length: 10 }, (_, i) => i).concat(operators)

function App() {
  return (
    <div>
      <div>
        <span>calc</span>
        <span>theme</span>
      </div>
      <div>Output</div>
      <div>calculator</div>
      <div className="operationPad">
        {buttons.map((num, i) => (
          <Button key={`btn${num}`} num={num} i={i} />
        ))}
      </div>
    </div>
  )
}

export default App
