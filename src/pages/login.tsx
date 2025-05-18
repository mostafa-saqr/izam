import React from 'react';
import { Paper, TextField, Button, Typography, Box, InputAdornment, IconButton, Link as MuiLink } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    navigate('/products');
  };

  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
      <Box sx={{ minHeight: '100vh', bgcolor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)',
            p: { xs: 3, sm: 4 },
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       
          <Typography variant="h5" component="h1" fontWeight={700} align="center" gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your details to sign in
          </Typography>
          
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Email
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label=""
            placeholder="Enter your email"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            sx={{ mb: 2, bgcolor: '#f7f8fa' }}
          />
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label=""
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{ mb: 1, bgcolor: '#f7f8fa' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <MuiLink href="#" underline="none" sx={{ fontWeight: 500, fontSize: 14 }}>
              Forgot password?
            </MuiLink>
          </Box>
          <Button
            onClick={handleLogin}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2, bgcolor: '#000', color: '#fff', fontWeight: 700, fontSize: 16, borderRadius: 2, py: 1.5, '&:hover': { bgcolor: '#222' } }}
          >
            Login
          </Button>
          <Typography align="center" sx={{ fontSize: 14, color: 'text.secondary' }}>
            Don&apos;t have an account?{' '}
            <MuiLink href="#" underline="none" sx={{ fontWeight: 600 }}>
              Sign Up
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
