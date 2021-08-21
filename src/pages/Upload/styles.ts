import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { GradientColor } from "../../types/global";

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  mainGrid: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  fileInput: {
    borderRadius: '5px',
    padding: '8px',
    backgroundColor: theme.palette.type === 'light' ? '#D3D3D3' : '#0d0d0d'
  },
  videoName: {
    
  },
  loadingRoot: {
    width: '100%',
    marginTop: '35vh',
    textAlign: 'center'
  },
  cuttingRoot: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '25px'
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  timeline: {
    touchAction: 'none',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px' ,
    height: '100px',
    background: GradientColor[theme.palette.type]
  },
  timelineControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: '50px'
  },
  addButton: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.info.main : '#0d0d0d',
    fontWeight: 'bold',
    color: '#fff'
  },
  deleteButon: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.error.main : '#0d0d0d',
    fontWeight: 'bold',
    color: '#fff'
  },
  saveButon: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.success.main : '#0d0d0d',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: '#fff'
  }
})
)
