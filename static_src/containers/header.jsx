import React from 'react';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PushToggle from '../components/popup_toggle';

const appServerKey = 'BD6_Zv9VIvWTtPUppd076WvBF6yPj8mhwvtCdtWNaxvYV-uSnv9CiqCMzpsdunY-DluV0FeLkIRRGF13nztCPFk';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userName = useSelector(state => state.profile.name);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePushSubscribe = () => {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        alert('push-уведомления не поддерживаются вашим браузером.');
        return false;
      }
   
      // Подписываемся
      registration.pushManager.subscribe({
        userVisibleOnly: true, // Всегда показывать уведомления
        applicationServerKey: appServerKey
      })
      .then(function (subscription) {
        alert('Успешно подписаны.');
        console.info('Подписаны на push-уведомления.');
        console.log(subscription);
      })
      .catch(function (error) {
        console.error('Ошибка подписки на push-уведомления: ', error);
      });
    })
  }

  return <>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}><Link to="/chat">Chats</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          ChatRoom
        </Typography>
        <div className={classes.grow} />
          <div>
            <PushToggle handleClick={handlePushSubscribe} />
          </div>
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            { userName }
          </div>
      </Toolbar>
    </AppBar>
  </>
};

export default Header;