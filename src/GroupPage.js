import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const App = () => {
  const params = useParams();

  return (
    <React.Fragment>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Group {params.key}
            </Typography>
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
