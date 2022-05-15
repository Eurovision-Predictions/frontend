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
import { useSelector } from 'react-redux'

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lobster",
      "cursive",
    ].join(','),
  }
});

const score = (predictions, results) => {
  let count = 0;

  results.map((d, i) => {
    const pos = predictions.indexOf(d);
    const res = i - pos;

    if (res >= 0) {
      count += res;
    } else {
      count += (-1)*res;
    }

    return count;
  });

  return count;
}

const add_results = (users, results) => col => col.map(d => {
  const [ predictions ] = users.filter(u => u.key === d.key);

  if (predictions === undefined) {
    return {
      ...d,
      total: 0,
    }
  }

  const total = score(predictions.items, results.map(u => u.country_code));
  return {
    ...d,
    total,
  }
}).sort((a, b) => a.total - b.total)

const MemberCard = props => {
  const { picture, nickname, total } = props;
  let avatar = <Avatar sx={{ backgroundColor: "#92acdf" }}>{total}</Avatar>

  if (total === 0) {
    avatar = <Avatar sx={{ backgroundColor: "#eea2a2" }}>NA</Avatar>
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader avatar={<Avatar src={picture} />} subheader={nickname} action={avatar}/>
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
  const { users, results } = useSelector(state => state.user);
  const { name, key: group_key, user_info } = group;
  let col = user_info;

  if (user_info !== undefined) {
    col = add_results(users, results)(user_info);
  }

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
          {col !== undefined && user_info.length > 0 && <Grid container spacing={2}>
            {col.map(d => <MemberCard {...d} />)}
          </Grid>}
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default App;
