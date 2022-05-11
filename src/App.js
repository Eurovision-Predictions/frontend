import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import GroupPage from './GroupPage';
import LandingPage from './LandingPage';
import PredictionsPage from './PredictionsPage';
import AppBar from './AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#16213d',
    },
    secondary: {
      main: '#eea2a2',
    },
    info: {
      main: '#e8dbb4',
    },
    success: {
      main: '#92acdf',
    },
    divider: 'rgb(115, 83, 86)',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/groups" exact element={<LandingPage />} />
          <Route path="/group/:key" element={<GroupPage />} />
          <Route path="/" element={<PredictionsPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
