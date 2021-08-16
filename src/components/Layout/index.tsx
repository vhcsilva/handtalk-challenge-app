import { Grid } from '@material-ui/core'
import AppBar from '../AppBar'
import React from 'react'

interface ILayoutProps {
  children: JSX.Element
}

const Layout: React.FC<ILayoutProps> = ({
  children,
}) => {
  return (
    <Grid item xs container direction="column" style={{ height: '100%' }}>
      <AppBar title="HT-Challenge" />
      <Grid
        style={{
          position: 'relative',
          marginTop: '80px',
        }}
        item
        xs
        container
        wrap="nowrap"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        {children}
      </Grid>
    </Grid>
  )
}

export default Layout