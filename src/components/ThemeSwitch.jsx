const availableThemes = ['darkBlue', 'lightGray', 'darkViolet']

const ThemeSwitch = ({ theme, setTheme, ...props }) => {
  const themeNum = availableThemes.indexOf(theme)
  return (
    <div>
      <input
        type="range"
        max="2"
        min="0"
        value={themeNum}
        onChange={(e) => setTheme(availableThemes[e.target.value])}
        {...props}
      />
    </div>
  )
}

export default ThemeSwitch
