import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  gridHome: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  table: {
    width: '100%',
    textAlign: 'center'
  }
})
)
