import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    area: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      width: '30px',
      height: '95px',
      borderRadius: '5px',
      boxSizing: 'border-box'
    }
  })
)
