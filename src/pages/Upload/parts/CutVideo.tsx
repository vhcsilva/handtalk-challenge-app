import React, { useState } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import { useLocation } from 'wouter'

import { useStyles } from '../styles'

import { CutArea, VideoType } from '../../../types/global'
import { routes } from '../../../routes'

import VideoPlayer from '../../../components/VideoPlayer'
import Cut from '../../../components/Cut'
import useFirebase from '../../../hooks/useFirebase'

interface ICutVideo {
  video?: VideoType
}

const CutVideo: React.FC<ICutVideo> = ({
  video
}) => {
  const classes = useStyles()
  const { saveVideoCuts }= useFirebase()
  const [areas, setAreas] = useState<CutArea[]>([])
  const [selectedArea, setSelectedArea] = useState<number>(0)
  const [location, setLocation] = useLocation()


  const updateArea = (index: number, begin: number, end: number) => {
    let tmp = [...areas]

    tmp[index].begin = begin
    tmp[index].end = end

    setAreas(tmp)
  }

  const handleCreateArea = () => {
    let tmpAreas = [...areas]
    let newArea = {
      begin: 0,
      end: 50
    }

    if (tmpAreas.length === 0)
      tmpAreas.push(newArea)
    else {
      let lastArea = areas[areas.length -1]

      newArea.begin = lastArea.end + 1
      newArea.end = lastArea.end + 11

      tmpAreas.push(newArea)
    }

    setAreas(tmpAreas)
  }

  const handleSaveCuts = () => {
    if (areas.length === 0) return;

    if (!video) return;
    
    saveVideoCuts(video?.id, areas).then(result => {
      setLocation(routes.home)
    }).catch(error => {

    })
  }

  const handleRemoveArea = () =>{
    let tmpAreas = areas
    tmpAreas = tmpAreas.filter((area, index) => index !== selectedArea)

    setAreas(tmpAreas)
  }

  const handleSelectArea = (index: number) => {
    setSelectedArea(index)
  }

  const handleUnselectArea = () => {
    setSelectedArea(0)
  }

  return(
    <Grid item md={10} className={classes.cuttingRoot}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Typography className={classes.videoName}>
            {video?.name}
          </Typography>
        </Grid>

        <Grid item sm={12}>
          {video && <VideoPlayer frames={video.frames} areaBegin={areas[selectedArea] ? areas[selectedArea].begin : undefined} areaEnd={areas[selectedArea] ? areas[selectedArea].end : undefined} />}
        </Grid>

        <Grid item sm={12} className={classes.timelineContainer}>
          <Box component="div" className={classes.timelineControls}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              className={classes.addButton}
              onClick={handleCreateArea}
            >
              Adicionar corte
            </Button>

            <Button
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              className={classes.deleteButon}
              onClick={e => handleRemoveArea()}
            >
              Remover corte
            </Button>
          </Box>

          <Box component="div" style={{width:`${video && video?.frames.length}px`}} className={classes.timeline}>
            {areas.map((area, index) => <Cut {...area} key={index} index={index} updateArea={updateArea} handleSelectArea={handleSelectArea} handleUnselectArea={handleUnselectArea} /> )}
          </Box>

          <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              className={classes.saveButon}
              onClick={e => handleSaveCuts()}
            >
              Salvar cortes
            </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CutVideo