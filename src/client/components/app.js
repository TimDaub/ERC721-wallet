import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import MenuAppBar from './menu-app-bar'
import SignUpForm from './sign-up-form'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

const App = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <MenuAppBar />
          <SignUpForm />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(App)
