import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CountryList from './components/CountryList';
import SavePredictions from './components/SavePredictions';
import { useDispatch, useSelector } from 'react-redux'
import { updatePredictions } from './reducers/user';

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
  const dispatch = useDispatch()
  const { predictions } = useSelector(state => state.user);

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
            <SavePredictions />
          </Grid>
          <Grid item xs={12}>
            <CountryList items={predictions} onDragEnd={onDragEnd} />
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
