import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { createUser } from './api/user';
import { fetchUserGroups } from './reducers/groups';
import { setUser } from './reducers/user';
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles';

const LinkWrapper = styled(Link)(() => ({
  textDecoration: 'none',
  display: 'block',
  color: 'white',
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const setUserDetails = async () => {
      const rs = await createUser(user)
      dispatch(setUser(rs))
      dispatch(fetchUserGroups(rs.key))
    }

    if(isAuthenticated) {
      setUserDetails()
    }
  }, [isAuthenticated, user, dispatch])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }}}>
            Eurovision Predictions
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <LinkWrapper to="/predictions">
              <IconButton size="large" edge="end" color="inherit">
                <QueryStatsIcon />
              </IconButton>
            </LinkWrapper>
            <LinkWrapper to="/groups">
              <IconButton size="large" edge="end" color="inherit">
                <GroupsIcon />
              </IconButton>
            </LinkWrapper>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={isMenuOpen} onClose={handleMenuClose}>
        {isAuthenticated && <MenuItem onClick={handleMenuClose}>Profile</MenuItem>}
        {isAuthenticated && <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</MenuItem>}
        {!isAuthenticated && <MenuItem onClick={loginWithRedirect}>Login</MenuItem>}
      </Menu>
    </Box>
  );
}
