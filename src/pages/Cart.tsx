import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  IconButton,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const cartItems = [
  {
    id: 1,
    name: 'Gradient Graphic T-shirt',
    price: 145,
    image: 'https://placehold.co/180x180?text=T-shirt',
    type: 'T-shirts',
    stock: 25,
    qty: 1,
  },
  {
    id: 2,
    name: 'Gradient Graphic T-shirt',
    price: 145,
    image: 'https://placehold.co/180x180?text=Polo',
    type: 'T-shirts',
    stock: 25,
    qty: 1,
  },
  {
    id: 3,
    name: 'Gradient Graphic T-shirt',
    price: 145,
    image: 'https://placehold.co/180x180?text=Polo',
    type: 'T-shirts',
    stock: 25,
    qty: 1,
  },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
const shipping = 15;
const tax = 12.5;
const total = subtotal + shipping + tax;
const orderNumber = 123;
const orderDate = new Date(2025, 4, 5).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

const Cart = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left: Cart Items */}
        <Box sx={{ flex: 3, width: '100%' }}>
          <Box sx={{ color: 'grey.600', fontSize: 14, mb: 2 }}>Home / <b>Casual</b></Box>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Your cart</Typography>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 3, p: 2, borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2, mr: 3, bgcolor: '#f7f8fa' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600} sx={{ fontSize: 18, mb: 0.5, display: 'flex', alignItems: 'center' }}>
                    {item.name}
                    <Chip label={item.type} size="small" sx={{ ml: 1, fontSize: 11, fontWeight: 600, bgcolor: '#f7f8fa' }} />
                  </Typography>
                  <Typography fontWeight={700} sx={{ fontSize: 16, mb: 0.5 }}>${item.price}</Typography>
                  <Typography sx={{ color: 'grey.500', fontSize: 14, mb: 1 }}>Stock: {item.stock}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small">
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 24, textAlign: 'center', fontSize: 16 }}>{item.qty}</Typography>
                    <IconButton size="small">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <IconButton size="large" sx={{ color: 'red', ml: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
        {/* Right: Order Summary */}
        <Box sx={{ flex: 1, minWidth: 300, width: { xs: '100%', md: 350 }, mt: { xs: 4, md: 0 } }}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontWeight={700} fontSize={18}>Order Summary ( #{orderNumber} )</Typography>
              <Typography color="primary" fontSize={14}>{orderDate}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary" fontSize={15}>Subtotal</Typography>
              <Typography fontWeight={600} fontSize={15}>${subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary" fontSize={15}>Shipping</Typography>
              <Typography fontWeight={600} fontSize={15}>${shipping.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary" fontSize={15}>Tax</Typography>
              <Typography fontWeight={600} fontSize={15}>${tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography fontWeight={700} fontSize={16}>Total</Typography>
              <Typography fontWeight={700} fontSize={16}>${total.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                fontWeight: 600,
                borderRadius: 1,
                py: 1.5,
                fontSize: 15,
                bgcolor: '#000',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { bgcolor: '#222' }
              }}
            >
              Place the order
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart; 