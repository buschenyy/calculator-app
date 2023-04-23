const Button = ({ num, i }) => {
  return <button className={`btn${i + 1}`}>{num}</button>
}

export default Button
