const Button = ({ value, i, theme, onClick }) => {
  const valueForDisplay = value !== 'result' ? value : '='
  return (
    <button className={`btn${i + 1} ${theme} buttonDark`} onClick={onClick}>
      {valueForDisplay}
    </button>
  )
}

export default Button
