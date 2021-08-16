import React, { useCallback, useEffect, useState } from 'react'
import { createTheme, Theme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router, Switch } from 'wouter'
import { EThemeType, IGlobalAttributes } from '../../types/global'
import { useGlobal } from 'reactn'
import { grey, orange } from '@material-ui/core/colors'

interface IAppPreloaderProps {
  children: JSX.Element[]
}

const initialTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: orange['800'],
    },
    secondary: {
      main: grey['800'],
    },

    tonalOffset: 0,
  },
})

const AppWrapper: React.FC<IAppPreloaderProps> = ({ children }) => {
  const [xTheme, setXTheme] = useState<Theme>(initialTheme)
  const [themeHTChallenge, setThemeHTChallenge] = useGlobal<
    IGlobalAttributes,
    'themeHTChallenge'
  >('themeHTChallenge')
  useEffect(() => {
    const theme: EThemeType =
      (localStorage.getItem('theme') as EThemeType) || EThemeType.light

    setThemeHTChallenge(theme)
  }, [])

  const getTheme = useCallback((): EThemeType => {
    if (themeHTChallenge) return EThemeType[themeHTChallenge]
    return EThemeType.light
  }, [themeHTChallenge])

  useEffect(() => {
    const _theme = getTheme()
    const theme = createTheme({
      palette: {
        type: getTheme(),
        primary: {
          main: orange['800'],
          light: orange['700'],
          dark: orange['900'],
        },
        secondary: {
          main: grey['900'],
          light: grey['700'],
          dark: grey['900'],
        },
        background: {
          default: _theme === 'light' ? grey['300'] : '#303030'
        },
        tonalOffset: 0,
      },
    })
    setXTheme(theme)
  }, [themeHTChallenge])

  return (
    <ThemeProvider theme={xTheme}>
      <CssBaseline />
        <Router>
          <Switch>{children}</Switch>
        </Router>
    </ThemeProvider>
  )
}

export default AppWrapper
