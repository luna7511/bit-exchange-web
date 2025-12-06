export const getLoadingScreen = (theme) => {
  let themes = {
    light: {
      // 背景色
      backgroundColor: '#ffffff',
      foregroundColor: 'rgb(49, 95, 238)'
    },
    dark: {
      // 背景色
      backgroundColor: 'rgb(19, 21, 26)',
      foregroundColor: '#fff'
    }
  }
  return themes[theme]
}
