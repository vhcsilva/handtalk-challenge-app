import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import MuiAppBar from '@material-ui/core/AppBar'
import {
  Typography,
  Box,
  Button,
} from '@material-ui/core'
import { Brightness4 } from '@material-ui/icons'
import { useGlobal } from 'reactn'
import {
  IGlobalAttributes,
  EThemeType,
} from '../../types/global'
import { useStyles } from './styles'

interface IAppBarProps {
  title: string
}

const AppBar: React.FC<IAppBarProps> = ({ title }) => {
  const classes = useStyles()
  const [themeHTChallenge, setThemeHTChallenge] = useGlobal<
    IGlobalAttributes,
    'themeHTChallenge'
  >('themeHTChallenge')

  const handleChangeTheme = () => {
    let newTheme: EThemeType = EThemeType.light
    if (themeHTChallenge === 'light') newTheme = EThemeType.dark
    setThemeHTChallenge(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {title && (
          <Box className={classes.boxTitle}>
            <Typography className={classes.title} variant="h6">
              {title}
            </Typography>
          </Box>
        )}
        <Box className={classes.boxRight}>
          <Box className={classes.boxOptions}>
            <Button onClick={handleChangeTheme}>
              <Brightness4 className={classes.icon} />
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
