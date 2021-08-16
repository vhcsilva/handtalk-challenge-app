import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './style'

interface ICardModuleProps {
  imgSrc: string
  title: string
  onClick?: () => void
}

export const CardModule: React.FC<ICardModuleProps> = ({
  imgSrc,
  title,
  onClick,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick()
        }}
      >
        <CardMedia
          className={classes.media}
          image={imgSrc}
          title="Module Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardModule
