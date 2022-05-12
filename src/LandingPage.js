import React from 'react';
import { styled } from '@mui/material/styles';
import GroupButton from './components/GroupButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Wrapper from './components/Wrapper';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lobster",
      "cursive",
    ].join(','),
  }
});

const LinkWrapper = styled(Link)(() => ({
  textDecoration: 'none',
}));

const Avatars = props => {
  const { user_info } = props;

  return (
    <AvatarGroup total={user_info.length}>
      {user_info.map(d => <Avatar key={d.key} src={d.picture} />)}
    </AvatarGroup>
  )
}

const BasicCard = props => {
  const { id, name, ...rest } = props;

  return (
    <Card>
      <CardHeader title={
        <LinkWrapper to={`/group/${id}`}>
          <Typography variant="h3">{name.join('-')}</Typography>
        </LinkWrapper>
      } />
      <CardContent>
        <Avatars {...rest} />
      </CardContent>
    </Card>
  );
}

const App = () => {
  const { groups } = useSelector(state => state.user);
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom component="div">
            My Groups!
          </Typography>
          <Typography variant="body1" gutterBottom>
            You can create new groups by clicking on the "Create Group" button. Then, click on the group's name to find more information on how you'll be able to share it with your friends, so that they can join it.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {isAuthenticated && <GroupButton />}
        </Grid>
        <ThemeProvider theme={theme}>
        {groups.map(d => (
          <Grid item xs={12} md={6} key={d.key}>
            <BasicCard {...d} id={d.key} />
          </Grid>
        ))}
        </ThemeProvider>
      </Grid>
    </Wrapper>
  );
}

export default App;
