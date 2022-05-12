import * as React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import JoinGroupButton from './components/JoinGroupButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useGroup } from './hooks/useGroup';
import CopyButton from './components/CopyButton';
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

const MemberCard = props => {
  const { picture, nickname } = props;

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader avatar={<Avatar src={picture} />} subheader={nickname} />
      </Card>
    </Grid>
  )
}

const Group = props => {
  const { group_key } = props;

  return (
    <ButtonGroup variant="contained" color="info">
      <Link to="/">
        <Button>Predictions</Button>
      </Link>
      <CopyButton />
      <JoinGroupButton group_key={group_key} />
    </ButtonGroup>
  )
}

const App = () => {
  const { key } = useParams();
  const group = useGroup(key);
  const { name, group_key, user_info } = group;

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <Typography variant="h3" gutterBottom>
              {name !== undefined && name.join('-')}
            </Typography>
          </ThemeProvider>
          <Typography variant="body1" gutterBottom>
            Do you want to invite more members to your group? You can simply share this page's url by either copying it from the top of your browser or by clicking on the "Share" button below and sending it to your friends! Once they click on the url, they will get redirected to your group and they can select "Join" after signing up.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Group group_key={group_key} />
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h5" component="h5" gutterBottom>Members</Typography>
          {user_info !== undefined && user_info.length > 0 && <Grid container spacing={2}>
            {user_info.map(d => <MemberCard {...d} />)}
          </Grid>}
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default App;
