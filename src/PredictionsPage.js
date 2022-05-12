import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CountryList from './components/CountryList';
import SavePredictions from './components/SavePredictions';
import { useDispatch, useSelector } from 'react-redux'
import { updatePredictions } from './reducers/user';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import ReorderIcon from '@mui/icons-material/Reorder';

const reorder = (col, start, end) => {
  const result = Array.from(col);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
}

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  const { predictions, ready } = useSelector(state => state.user);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }

    const newItems = reorder(predictions, source.index, destination.index);
    dispatch(updatePredictions(newItems));
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom component="div">
              My Predictions!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Pick a country by clicking and holding on the selection's drag and drop handle ({<ReorderIcon />}) and move it up or down to change its ranking.
            </Typography>
            <Typography variant="body1" gutterBottom>
              You can make changes and save your predictions as many times as you want up until the end of the final performance on 14 May 2022.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Turn the Eurovision Final into a fun game for everyone to play!
            </Typography>
            {!isAuthenticated && <Typography variant="body1" gutterBottom>
              Please login to continue.
            </Typography>}
          </Grid>
          <Grid item xs={12}>
            <SavePredictions />
          </Grid>
          {isAuthenticated && <Grid item xs={12}>
            {ready ? <CountryList items={predictions} onDragEnd={onDragEnd} /> : <LinearProgress /> }
          </Grid>}
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
