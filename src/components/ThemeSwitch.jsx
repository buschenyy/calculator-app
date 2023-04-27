const availableThemes = ['darkBlue', 'lightGray', 'darkViolet']

const ThemeSwitch = ({ theme, setTheme, ...props }) => {
  const themeNum = availableThemes.indexOf(theme)
  return (
    <div className="themeSwitch">
      <label htmlFor="switch">Theme</label>
      <input
        type="range"
        max="2"
        min="0"
        id="switch"
        value={themeNum}
        list="themes"
        onChange={(e) => setTheme(availableThemes[e.target.value])}
        {...props}
      />
      <datalist id="themes">
        {availableThemes.map((_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </datalist>
    </div>
  )
}

export default ThemeSwitch
