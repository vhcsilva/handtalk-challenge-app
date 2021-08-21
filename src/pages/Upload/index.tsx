import React, { ChangeEvent, FormEvent } from 'react'
import { Grid } from '@material-ui/core'

import useFirebase from '../../hooks/useFirebase'

import Layout from '../../components/Layout'
import { useStyles } from './styles'
import { useState } from 'react'
import UploadForm from './parts/UploadForm'
import Uploading from './parts/Uploading'
import CutVideo from './parts/CutVideo'
import { VideoType } from '../../types/global'

interface IUploadProps {
  path?: string
}

const Upload: React.FC<IUploadProps> = () => {
  const classes = useStyles()
  const { createNewVideo } = useFirebase()
  const [file, setFile] = useState<File | any>(null)
  const [uploading, setUploading] = useState(false)
  const [video, setVideo] = useState<VideoType>()

  const handleUploadVideo = async (event: FormEvent) => {
    event.preventDefault()

    setUploading(true)

    createNewVideo(file).then(result => {
      console.log(result)

      setUploading(false)
      setVideo(result)
    }).catch(error => {
      console.log(error)
      setUploading(false)
    })
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0)
      return;

    setFile(event.target.files?.item(0))
  }

  return (
    <Layout title="HT Challenge - Cortar vídeo">
      <Grid className={classes.mainGrid}>
        {uploading ? <Uploading /> : !video ? 
          <UploadForm 
            handleUploadVideo={handleUploadVideo} 
            handleFileChange={handleFileChange} 
          /> : 
          <CutVideo video={video} />}
      </Grid>
    </Layout>
  )
}

export default Upload
