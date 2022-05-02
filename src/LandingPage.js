import React from 'react';
import { styled } from '@mui/material/styles';
import GroupButton from './components/GroupButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const rand = n => Math.floor(Math.random() * n) + 1

const Avatars = () => {
  const n = rand(24)

  return (
    <AvatarGroup total={n}>
      {Array(n).fill().map(() => rand(1000)).map(d => <Avatar alt={`${d} hey there`} src={`https://i.pravatar.cc/100?u=${d}`} />)}
    </AvatarGroup>
  )
}

const BasicCard = props => {
  const { id, name } = props;

  return (
    <Link to={`/group/${id}`}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name.join('-')}
          </Typography>
          <Avatars />
        </CardContent>
      </Card>
    </Link>
  );
}

const App = () => {
  const groups = useSelector(state => state.groups);

  return (
    <React.Fragment>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GroupButton />
          </Grid>
          {groups.map(d => (
            <Grid item xs={4} key={d.key}>
              <BasicCard {...d} id={d.key} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
