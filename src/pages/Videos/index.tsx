import React, { useState } from 'react'
import { Grid, IconButton } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import { useLocation } from 'wouter'

import Layout from '../../components/Layout'
import { routes } from '../../routes'

import { useStyles } from './styles'
import useFirebase from '../../hooks/useFirebase'
import { useEffect } from 'react'

interface IVideosProps {
  path?: string
}

const Videos: React.FC<IVideosProps> = () => {
  const classes = useStyles()
  const { listVideos } = useFirebase()
  const [location, setLocation] = useLocation()
  const [videos, setVideos] = useState<any>()

  useEffect(() => {
    listVideos().then(rs => {
      setVideos(rs)
    })
  }, [])

  const handleSeeVideo = (videoId: string) => {
    setLocation(`${routes.viewCuts}`.replace(':id', videoId))
  }

  return (
    <Layout title="HT Challenge - Videos">
      <Grid md={10} className={classes.gridHome}>
        {
          videos && 
          <table className={classes.table}>
            <thead>
              <th>Nome</th>
              <th>ID</th>
              <th>Data de Envio</th>
              <th>Quantidade de Cortes</th>
              <th></th>
            </thead>

            <tbody>
              {videos.map((video: { name: string; id: string; createdAt: string; numberOfParts: number }) => (<tr key={video.id}>
                  <td>{video.name}</td>
                  <td>{video.id}</td>
                  <td>{video.createdAt}</td>
                  <td>{video.numberOfParts}</td>
                  <td>
                    <IconButton onClick={e => handleSeeVideo(video.id)}>
                      <LaunchIcon />
                    </IconButton>
                  </td>
                </tr>))}
            </tbody>
          </table>
        }
      </Grid>
    </Layout>
  )
}

export default Videos
