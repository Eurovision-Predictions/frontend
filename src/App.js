import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import GroupPage from './GroupPage';
import LandingPage from './LandingPage';
import PredictionsPage from './PredictionsPage';
import AppBar from './AppBar';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/groups" exact element={<LandingPage />} />
          <Route path="/group/:key" element={<GroupPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
