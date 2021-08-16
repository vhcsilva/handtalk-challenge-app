import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '300px',
      margin: '10px',
      backgroundColor: theme.palette.type === 'light' ? '#D3D3D3' : '#0d0d0d'
    },
    media: {
      minHeight: '140px',
      backgroundColor: '#FFF'
    },
  })
)