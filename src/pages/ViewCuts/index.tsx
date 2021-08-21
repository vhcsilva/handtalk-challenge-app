import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { useLocation, useRoute } from 'wouter'

import CardModule from '../../components/CardModule'
import Layout from '../../components/Layout'
import { routes } from '../../routes'

import { useStyles } from './styles'
import imgCutVideo from '../../images/imgCutVideo.png'
import imgShowCutedVideo from '../../images/imgShowCutedVideo.png'
import VideoPlayer from '../../components/VideoPlayer'
import { useEffect } from 'react'
import useFirebase from '../../hooks/useFirebase'

interface IHomeProps {
  path?: string,
  params?: any
}

const ViewCuts: React.FC<IHomeProps> = () => {
  const classes = useStyles()
  const [location, setLocation] = useLocation()
  const [frames, setFrames] = useState<any>()
  const [cuts, setCuts] = useState<any>()
  const { getFrames, getCuts } = useFirebase()
  const [match, params] = useRoute(routes.viewCuts)

  const handleClickGoToCutVideo = () => {
    setLocation(routes.upload)
  }

  const handleClickGoToShowCutedVideo = () => {
    alert('Redirecionar. . .')
  }

  useEffect(() => {
    if (params) {
      getFrames(params.id).then(rs => {
        setFrames(rs)
      })

      getCuts(params.id).then(rs => {
        setCuts(rs)
      })
    }
  }, [params?.id])

  return (
    <Layout title="HT Challenge - Ver cortes">
      <Grid container className={classes.gridHome}>
        {cuts && cuts.map((cut: {id: string, startFrame: number, endFrame: number }) => <Grid item sm={12} md={4} key={cut.id} >
        <VideoPlayer frames={frames} areaBegin={cut.startFrame} areaEnd={cut.endFrame} />
        </Grid>)}
      </Grid>
    </Layout>
  )
}

export default ViewCuts
