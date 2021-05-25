import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import LeftMenu from './leftMenu.component';
import {Context as AdminContext} from "../../contexts/AdminContext";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBarSplash() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const { state: {token}, logout } = useContext(AdminContext);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSession = () => {
    logout();
  }

  return (
    <AppBar position="static" style={{backgroundColor:"#601683"}}>
        <Toolbar>

            <LeftMenu />

            <Typography variant="h6" className={classes.title}>
                Splash
            </Typography>
            {auth && (
            <div>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
                <hr/>
                <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                </Menu>
            </div>
            )}
        </Toolbar>
    </AppBar>
  );
}