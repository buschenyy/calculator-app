const Button = ({ value, i, onClick }) => {
  const valueForDisplay = value !== 'result' ? value : '='
  return (
    <button className={`btn${i + 1}`} onClick={onClick}>
      {valueForDisplay}
    </button>
  )
}

export default Button
