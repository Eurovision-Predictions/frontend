import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import JoinGroupButton from './components/JoinGroupButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useGroup } from './hooks/useGroup';

const Wrapper = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const TypographyMargin = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

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

const GroupCard = props => {
  const { name, group_key, user_info } = props;

  if (name === undefined) {
    return <div></div>
  }

  return (
    <Wrapper item xs={12}>
      <Card>
        <CardHeader title={name.join('-')} action={<JoinGroupButton group_key={group_key} />} />
        <CardContent>
          <TypographyMargin variant="h5" component="h5">Members</TypographyMargin>
          {user_info.length > 0 && <Grid container spacing={2}>
            {user_info.map(d => <MemberCard {...d} />)}
          </Grid>}
        </CardContent>
      </Card>
    </Wrapper>
  );
}

const App = () => {
  const { key } = useParams();
  const group = useGroup(key)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <GroupCard {...group} group_key={group.key} />
      </Grid>
    </React.Fragment>
  );
}

export default App;
