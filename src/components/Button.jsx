import cn from 'classnames/bind'

const Button = ({ value, i, onClick, activeOperator }) => {
  const valueForDisplay = value !== 'result' ? value : '='
  const classNames = {
    specOpButton: value === 'reset' || value === 'del',
    resultButton: value === 'result',
    active: value === activeOperator,
  }

  return (
    <button className={cn(`btn${i + 1}`, classNames)} onClick={onClick}>
      {valueForDisplay}
    </button>
  )
}

export default Button
