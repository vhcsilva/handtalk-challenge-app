import React from 'react' 
import { Grid, LinearProgress, Typography, } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import { useStyles } from '../styles'

const Uploading: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()

  return(
    <Grid item md={10} className={classes.loadingRoot}>
      <Typography variant="h6">
        Só um instante, o vídeo está sendo processado...
      </Typography>

      <LinearProgress color={theme.palette.type === 'light' ? 'primary' : 'secondary' } />
    </Grid>
  )
}

export default Uploading