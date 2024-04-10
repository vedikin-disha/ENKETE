import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#ffffff',
    textDark: '#000000',
    primary: '#bdbdbd',
    primaryDark: '#8d8d8d',
    primaryLight: '#efefef',
    placeholder: '#bdbdbd', 
    secondary: '#2c2f40',
    secondaryDark: '#03051a',
    secondaryLight: '#55586b',
    error: '#f13a59',
    background: '#363a46',
    backgroundDark: '#10141f',
    backgroundLight: '#606471',
    default: '#f5f5f5',
    defaultBlue: '#5387c4',
    success: '#43a047',
    danger: '#e53935',
    warningYellow: '#FFC107',
    orange: '#FFE0B2',
    blue: '#80DEEA',
    purpel: '#E1BEE7'
  },
  fontsizes: {
    ...DefaultTheme.fontsizes,
    xsmall: 8,
    small: 10,
    mid: 12,
    large: 14,
    xlarge: 16,
    xxlarge: 18,
  }
}
