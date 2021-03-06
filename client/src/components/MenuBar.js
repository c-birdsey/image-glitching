import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

// for development only
// currently using same endpoint as from practical
const GOOGLE_CLIENT_ID =
  '380334959519-l3ffdodaun4lccn89hfm1g8pphhqvlte.apps.googleusercontent.com';

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
      anchorEl: null
    };

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleGoogleLogout = this.handleGoogleLogout.bind(this);
    this.handleGoogleFailure = this.handleGoogleFailure.bind(this);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.props.profile();
  };

  handleGoogleLogin(response) {
    fetch('/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${response.tokenId}`
      }
    }).then(fetchResponse => {
      console.log(fetchResponse);
      if (!fetchResponse.ok) {
        alert('Unable to authenticate', fetchResponse.statusText);
        this.props.logOut();
      } else {
        this.props.logIn();
      }
    });
  }

  handleGoogleLogout() {
    this.props.logOut();
  }

  handleGoogleFailure() {
    this.props.logOut();
  }

  render() {
    const { classes, home, loggedIn } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const loginButton = (
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        isSignedIn
        onSuccess={this.handleGoogleLogin}
        onFailure={this.handleGoogleFailure}
      />
    );

    const logoutButton = (
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={this.handleGoogleLogout}
      />
    );

    const profileMenu = (
      <div>
        {logoutButton}
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleClose}
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

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#0a61fe' }}>
          <Toolbar>
            <IconButton
              className={classes.homeButton}
              color="inherit"
              aria-label="Home"
              onClick={home}
              alt="HomeButton"
            >
              <Home />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Image Glitching
            </Typography>
            {loggedIn ? profileMenu : loginButton}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
  home: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  profile: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

export default withStyles(styles)(MenuBar);
