import React from 'react';
import { Box, Button, Typography, IconButton, AppBar, Toolbar } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [showPromo, setShowPromo] = React.useState(true);

  return (
    <Box>
      {/* Promo Bar */}
      {showPromo && (
        <Box sx={{ bgcolor: '#000', color: '#fff', py: 0.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Typography sx={{ fontSize: 14, textAlign: 'center', width: '100%' }}>
            Sign up and get 20% off to your first order.<b>Sign Up Now</b>
          </Typography>
          <IconButton size="small" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#fff' }} onClick={() => setShowPromo(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      {/* Main Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: '#000', boxShadow: 'none', borderBottom: '1px solid #f0f0f0' }}>
        <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <img src="/izam-logo.png" alt="izam logo" style={{ width: 113, height: 'auto', objectFit: 'contain', marginRight: 8 }} />
          </Box>
          {/* Nav Buttons */}
          <Button component={RouterLink} to="/products" sx={{ fontWeight: 600, color: '#000', mr: 1, px: 2, bgcolor: 'transparent', '&:hover': { bgcolor: '#f5f5f5' } }} disableElevation>
            Products
          </Button>
          <Button sx={{ fontWeight: 600, color: '#fff', bgcolor: '#000', border: '1px solid #000', px: 2, mr: 2, '&:hover': { bgcolor: '#f5f5f5',color:'#000' } }} disableElevation>
            Sell Your Product
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {/* Cart Icon */}
          <IconButton sx={{ mr: 1 }}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
          {/* Login Button */}
          <Button component={RouterLink} to="/" variant="contained" sx={{ bgcolor: '#000', color: '#fff', fontWeight: 600, borderRadius: 1, px: 2, boxShadow: 'none', '&:hover': { bgcolor: '#222' } }} disableElevation>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header; 