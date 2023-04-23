const Button = ({ digit, i, onClick }) => {
  return (
    <button className={`btn${i + 1}`} onClick={onClick}>
      {digit}
    </button>
  )
}

export default Button
