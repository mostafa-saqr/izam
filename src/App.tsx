import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
// import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          {/* <Header /> */}
          <AppRoutes />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
