import React from 'react';
import { styled } from '@mui/material/styles';
import GroupButton from './components/GroupButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
// import AddUserButton from './components/AddUserButton';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const LinkWrapper = styled(Link)(() => ({
  textDecoration: 'none',
}));

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
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
      <CardHeader title={<LinkWrapper to={`/group/${id}`}>{name.join('-')}</LinkWrapper>} />
      <CardContent>
        <Avatars {...rest} />
      </CardContent>
    </Card>
  );
}

const App = () => {
  const { groups } = useSelector(state => state.user);

  return (
    <React.Fragment>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GroupButton />
          </Grid>
          {groups.map(d => (
            <Grid item xs={6} key={d.key}>
              <BasicCard {...d} id={d.key} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
