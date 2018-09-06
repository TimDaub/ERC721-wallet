import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { connect } from "react-redux";
import { fetchChallenge } from "../actions/index"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };

  handleLogin = () => {
    this.props.dispatch(fetchChallenge())
  }

  render() {
    const { classes, loading, address } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
            <div tabIndex={0} role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}>
              <div className={classes.list}>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItem>
                </List>
              </div>
            </div>
          </Drawer>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit"
              onClick={this.toggleDrawer(!this.state.open)}
              aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit"
              className={classes.flex}>
              Cinemarket
            </Typography>
            {address && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )}
            {!address && loading && (
              <div>Open Metamask</div>
            )}
            {!address && !loading && (
              <Typography variant="body2" color="inherit">
                <a onClick={this.handleLogin}>Login</a>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    address: state.items,
    loading: state.loading,
    error: state.error
    // TODO: Handle error
  }
}

export default connect(mapStateToProps)(withStyles(styles)(MenuAppBar))
