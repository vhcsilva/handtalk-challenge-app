import { Grid } from '@material-ui/core'
import React from 'react'
import CardModule from '../../components/CardModule'
import Layout from '../../components/Layout'
import { useStyles } from './styles'
import imgCutVideo from '../../images/imgCutVideo.png'
import imgShowCutedVideo from '../../images/imgShowCutedVideo.png'

interface IHomeProps {
  path?: string
}

const Home: React.FC<IHomeProps> = () => {
  const classes = useStyles()

  const handleClickGoToCutVideo = () => {
    alert('Redirecionar. . .')
  }

  const handleClickGoToShowCutedVideo = () => {
    alert('Redirecionar. . .')
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
