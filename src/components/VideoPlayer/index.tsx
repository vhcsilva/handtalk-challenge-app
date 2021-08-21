import React, { MouseEvent, useEffect, useRef } from 'react'
import { Grid, IconButton } from '@material-ui/core'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ReplayIcon from '@material-ui/icons/Replay'

interface IVideoPlayer{
  frames: Array<string>,
  areaBegin?: number,
  areaEnd?: number
}

type Area = {
  begin: number,
  end: number
}

const VideoPlayer: React.FC<IVideoPlayer> = ({
  frames,
  areaBegin,
  areaEnd
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef(0)
  const areaRef = useRef<Area>({
    begin: Math.ceil(areaBegin || 0),
    end: Math.ceil(areaEnd || 0) || (frames.length - 1)
  })
  const isPlayingRef = useRef(true)

  const updateArea = () => {
    let area = areaRef.current

    if (area.begin + 1 <= area.end)
      area.begin += 1
  }

  const setPlay = () => {
    isPlayingRef.current = true
  }

  const setPause = () => {
    isPlayingRef.current = false
  }

  const setReplay = () => {
    areaRef.current.begin = areaBegin || 0
    setPlay()
  }

  const renderFrame = () => {
    let context = canvasRef?.current?.getContext('2d')
    let isPlaying = isPlayingRef.current

    if (isPlaying) {
      updateArea()
      if (frames) {
        let img = new Image()
        img.src = `data:image/png;base64,${frames[Math.ceil(areaRef.current.begin)]}`

        img.onload = () => {
          if (context)
          context.drawImage(img, 0, 0, 450, 250)
        }
      }
    }
  }

  const tick = () => {
    if (!canvasRef) return;
    
    renderFrame()

    requestIdRef.current = requestAnimationFrame(() => setTimeout(tick, 1000 / 30))
  }

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(() => setTimeout(tick, 1000 / 30))

    return () => {
      window.cancelAnimationFrame(requestIdRef.current)
    }
  }, [])

  useEffect(() => {
    if (areaBegin) {
      let area = areaRef.current
      area.begin = areaBegin
    }

  }, [areaBegin])

  return(
    <Grid container>
      <Grid item sm={12}>
        <canvas ref={canvasRef} width="450" height="250">
        </canvas>
      </Grid>

      <Grid item sm={12}>
        <IconButton aria-label="Play" onClick={e => setPlay()}>
          <PlayArrowIcon />
        </IconButton> 
        
        <IconButton aria-label="Pause" onClick={e => setPause()}>
          <PauseIcon />
        </IconButton> 

        <IconButton aria-label="Replay" onClick={e => setReplay()}>
          <ReplayIcon />
        </IconButton> 
      </Grid>
    </Grid>
  )
}

export default VideoPlayer