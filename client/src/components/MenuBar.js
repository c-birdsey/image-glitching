import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  homeButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      auth: true
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, home, login } = this.props;
    const { anchorEl, auth } = this.state;
    const open = Boolean(anchorEl);
    const profileMenu = (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </Menu>
      </div>
    );

    const loginButton = (
      <Button color="inherit" onClick={login}>
        Login
      </Button>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#0a61fe' }}>
          <Toolbar>
            <IconButton
              className={classes.homeButton}
              color="inherit"
              aria-label="Home"
              onClick={home}
            >
              <Home />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Image Glitching
            </Typography>
            {auth ? profileMenu : loginButton}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuBar);
