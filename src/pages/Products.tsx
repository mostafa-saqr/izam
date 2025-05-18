import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  Badge,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';


const products = [
  {
    id: 1,
    name: 'Gradient Graphic T-shirt',
    price: 145,
    image: 'https://placehold.co/300x300?text=Gradient+T-shirt',
    type: 'T-shirts',
    stock: 25,
  },
  {
    id: 2,
    name: 'Polo with Tipping Details',
    price: 180,
    image: 'https://placehold.co/300x300?text=Polo',
    type: 'Polo',
    stock: 18,
  },
  {
    id: 3,
    name: 'Black Striped T-shirt',
    price: 120,
    image: 'https://placehold.co/300x300?text=Striped+T-shirt',
    type: 'T-shirts',
    stock: 30,
  },
  {
    id: 4,
    name: 'Skinny Fit Jeans',
    price: 240,
    image: 'https://placehold.co/300x300?text=Jeans',
    type: 'Jeans',
    stock: 15,
  },
  {
    id: 5,
    name: 'Checkered Shirt',
    price: 180,
    image: 'https://placehold.co/300x300?text=Checkered+Shirt',
    type: 'Shirts',
    stock: 22,
  },
  {
    id: 6,
    name: 'Sleeve Striped T-shirt',
    price: 130,
    image: 'https://placehold.co/300x300?text=Sleeve+Striped+T-shirt',
    type: 'T-shirts',
    stock: 28,
  },
];

const initialCart = [
  { id: 1, name: 'Gradient Graphic T-shirt', price: 145, image: 'https://placehold.co/300x300?text=Gradient+T-shirt', qty: 1 },
  { id: 3, name: 'Black Striped T-shirt', price: 145, image: 'https://placehold.co/300x300?text=Striped+T-shirt', qty: 2 },
];

const Products = () => {
  const [cart, setCart] = useState(initialCart);
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {} as Record<number, number>)
  );
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  // Order summary calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 15;
  const tax = 12.5;
  const total = subtotal + shipping + tax;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left: Products */}
        <Box sx={{ flex: 3, width: '100%' }}>
          {/* Breadcrumb */}
          <Box sx={{ color: 'grey.600', fontSize: 14, mb: 2 }}>
            Home / <b>Casual</b>
          </Box>
          {/* Search and Filter */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <IconButton sx={{ border: '1px solid #eee', bgcolor: '#fff' }}>
              <FilterListIcon />
            </IconButton>
            <TextField
              placeholder="Search by product name"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, bgcolor: '#fafbfc' },
              }}
            />
          </Box>
          {/* Title and count */}
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            Casual
          </Typography>
          <Typography sx={{ color: 'grey.600', fontSize: 14, mb: 2 }}>
            Showing 1-6 of 6 Products
          </Typography>
          {/* Product Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {products.map((product) => (
              <Card key={product.id} sx={{ p: 1, borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
            
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ width: '100%', height: 200, mb: 2 }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: 8
                      }}
                    />
                  </Box>
                  <Typography fontWeight={600} sx={{ fontSize: 16, mb: 0.5 }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography fontWeight={700} sx={{ fontSize: 15 }}>
                      ${product.price}
                    </Typography>
                    <Chip label={product.type} size="small" sx={{ fontSize: 11, fontWeight: 600, bgcolor: '#f7f8fa' }} />
                  </Box>
                  <Typography sx={{ color: 'grey.500', fontSize: 13, mb: 1 }}>
                    Stock: {product.stock}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <IconButton size="small" onClick={() => handleQtyChange(product.id, -1)}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{quantities[product.id]}</Typography>
                    <IconButton size="small" onClick={() => handleQtyChange(product.id, 1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Button variant="contained" fullWidth sx={{ fontWeight: 700, borderRadius: 2, mt: 1, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#222' } }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
            <Button size="small" disabled sx={{ minWidth: 80, bgcolor: '#fafbfc', color: 'grey.500', fontWeight: 600 }}>
              &lt; Previous
            </Button>
            <Button size="small" variant="contained" sx={{ minWidth: 40, fontWeight: 700, bgcolor: '#000', color: '#fff', borderRadius: 2, '&:hover': { bgcolor: '#222' } }}>
              1
            </Button>
            <Button size="small" disabled sx={{ minWidth: 80, bgcolor: '#fafbfc', color: 'grey.500', fontWeight: 600 }}>
              Next &gt;
            </Button>
          </Box>
        </Box>
        {/* Right: Order Summary */}
        <Box sx={{ flex: 1, minWidth: 300, width: { xs: '100%', md: 350 }, mt: { xs: 4, md: 0 } }}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'white' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Order Summary
            </Typography>
            {cart.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography fontSize={15} fontWeight={600} noWrap>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      {item.name}
                      <IconButton size="small" sx={{ color: 'red' }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        p: 0.5
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Typography sx={{ mx: 2, fontSize: 15 }}>{item.qty}</Typography>
                    <IconButton
                      size="small"
                      sx={{
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        p: 0.5
                      }}
                    >
                      <AddIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Typography fontWeight={600} sx={{ ml: 'auto', fontSize: 15 }}>
                      ${item.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <Divider sx={{ my: 2.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary" fontSize={15}>Subtotal</Typography>
              <Typography fontWeight={600} fontSize={15}>${subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary" fontSize={15}>Shipping</Typography>
              <Typography fontWeight={600} fontSize={15}>${shipping}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
              <Typography color="text.secondary" fontSize={15}>Tax</Typography>
              <Typography fontWeight={600} fontSize={15}>${tax}</Typography>
            </Box>
            <Divider sx={{ mb: 2.5 }} />
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
              onClick={() => navigate('/cart')}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Products; 