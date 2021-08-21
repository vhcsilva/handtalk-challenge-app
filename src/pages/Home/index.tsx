import React from 'react'
import { Grid } from '@material-ui/core'
import { useLocation } from 'wouter'

import CardModule from '../../components/CardModule'
import Layout from '../../components/Layout'
import { routes } from '../../routes'

import { useStyles } from './styles'
import imgCutVideo from '../../images/imgCutVideo.png'
import imgShowCutedVideo from '../../images/imgShowCutedVideo.png'

interface IHomeProps {
  path?: string
}

const Home: React.FC<IHomeProps> = () => {
  const classes = useStyles()
  const [location, setLocation] = useLocation()

  const handleClickGoToCutVideo = () => {
    setLocation(routes.upload)
  }

  const handleClickGoToShowCutedVideo = () => {
    setLocation(routes.videos)
  }

  return (
    <Layout>
      <Grid md={10} className={classes.gridHome}>
        <CardModule
          title="Cortar parte de vídeo"
          imgSrc={imgCutVideo}
          onClick={handleClickGoToCutVideo}
        />
        <CardModule
          title="Visualizar parte de vídeo"
          imgSrc={imgShowCutedVideo}
          onClick={handleClickGoToShowCutedVideo}
        />
      </Grid>
    </Layout>
  )
}

export default Home
