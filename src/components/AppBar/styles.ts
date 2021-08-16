import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GradientColor } from "../../types/global";

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  appBar: {
    background: GradientColor[theme.palette.type],
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  boxTitle: {
    justifySelf: 'center',
  },
  boxRight: {
    position: 'absolute',
    right: theme.spacing(2),
  },
  boxOptions: {
    display: 'flex',
  },
  icon: {
    color: 'white',
  },
  toolbar: {},
  menuButton: {
    marginRight: theme.spacing(0),
  },
})
)
