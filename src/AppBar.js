import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { createUser } from './api/user';
import { setUser } from './reducers/user';
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const LinkWrapper = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'white',
}));

export default function PrimarySearchAppBar() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const setUserDetails = async () => {
      const rs = await createUser(user)
      dispatch(setUser(rs))
    }

    if (isAuthenticated) {
      setUserDetails()
    }
  }, [isAuthenticated, user, dispatch])

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
            <LinkWrapper to="/">
              <IconButton size="large" edge="end" color="inherit">
                <QueryStatsIcon />
              </IconButton>
            </LinkWrapper>
            {isAuthenticated && <LinkWrapper to="/groups">
              <IconButton size="large" edge="end" color="inherit">
                <GroupsIcon />
              </IconButton>
            </LinkWrapper>}
            {!isAuthenticated && <Button color="inherit" onClick={loginWithRedirect}>Login</Button>}
            {isAuthenticated && <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
