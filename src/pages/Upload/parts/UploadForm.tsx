import React, { FormEventHandler, ChangeEventHandler } from 'react'
import { IconButton } from '@material-ui/core'

import PublishIcon from '@material-ui/icons/Publish'

import { useStyles } from '../styles'

interface IUploadFormProps {
  handleUploadVideo: FormEventHandler<HTMLFormElement>,
  handleFileChange: ChangeEventHandler<HTMLInputElement>
}

const UploadForm: React.FC<IUploadFormProps> = ({
  handleUploadVideo,
  handleFileChange
}) => {
  const classes = useStyles()

  return(
    <form onSubmit={handleUploadVideo}>
      <input type="file" name="video"  onChange={ e => handleFileChange(e)} className={classes.fileInput} />

      <IconButton aria-label="Upload" type="submit">
          <PublishIcon />
      </IconButton> 
    </form>
  )
}

export default UploadForm