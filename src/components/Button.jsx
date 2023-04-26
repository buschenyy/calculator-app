import cn from 'classnames/bind'

const Button = ({ value, i, theme, onClick }) => {
  const valueForDisplay = value !== 'result' ? value : '='
  const classNames = {
    button: value !== 'reset' && value !== 'del' && value !== 'result',
    darkButton: value === 'reset' || value === 'del',
    brightButton: value === 'result',
  }

  return (
    <button className={cn(`btn${i + 1}`, theme, classNames)} onClick={onClick}>
      {valueForDisplay}
    </button>
  )
}

export default Button
