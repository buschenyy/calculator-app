const getInitTheme = () => {
  const theme = localStorage.getItem('theme')
  const themeQuery = window.matchMedia('(prefers-color-scheme: light)')

  return theme ? theme : themeQuery.matches ? 'lightGray' : 'darkBlue'
}

export default getInitTheme