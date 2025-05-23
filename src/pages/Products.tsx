import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  Chip,
  Divider,
  Paper,


} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';


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

const categories = ['T-shirts', 'Polo', 'Jeans', 'Shirts'];

const PRODUCTS_PER_PAGE = 6;

const Products = () => {
  const [cart, setCart] = useState(initialCart);
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {} as Record<number, number>)
  );

  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [price, setPrice] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [appliedPrice, setAppliedPrice] = useState([0, 300]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Order summary calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 15;
  const tax = 12.5;
  const total = subtotal + shipping + tax;

  // Filtered products logic
  const filteredProducts = products.filter((product) => {
    // Search by name
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    // Filter by price
    const matchesPrice = product.price >= appliedPrice[0] && product.price <= appliedPrice[1];
    // Filter by category
    const matchesCategory =
      appliedCategories.length === 0 || appliedCategories.includes(product.type);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Add to cart logic
  const handleAddToCart = (product: typeof products[0]) => {
    const qty = quantities[product.id];
    if (qty > 0 && qty <= product.stock) {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          // Prevent exceeding stock
          const newQty = Math.min(existing.qty + qty, product.stock);
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: newQty } : item
          );
        } else {
          return [...prev, { ...product, qty }];
        }
      });
      setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    }
  };

  // Order summary management
  const handleOrderQtyChange = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };
  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Checkout navigation
  const handleCheckout = () => {
    navigate('/cart', { state: { cart } });
  };

  const filterButtonStyle = {
    position: 'fixed' as const,
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1301,
    bgcolor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    p: 0,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Filter Button */}
      <Button
        onClick={() => setDrawerOpen(true)}
        sx={filterButtonStyle}
      >
        <img src="/filterico.png" alt="Filter" style={{ width: 48, height: 48 }} />
      </Button>
      {/* Filter Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography fontWeight={600} sx={{ mb: 1 }}>Price</Typography>
          <Slider
            value={price}
            onChange={(_, v) => setPrice(v as number[])}
            min={0}
            max={300}
            valueLabelDisplay="auto"
            sx={{ mb: 2, color: '#000' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>$0</Typography>
            <Typography>$300</Typography>
          </Box>
          <Typography fontWeight={600} sx={{ mb: 1 }}>Category</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.length === 0}
                  onChange={() => setSelectedCategories([])}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#000',
                    },
                  }}
                />
              }
              label="All"
            />
            {categories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    sx={{
                      color: '#000',
                      '&.Mui-checked': {
                        color: '#000',
                      },
                    }}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, mb: 1, bgcolor: '#000', color: '#fff', fontWeight: 700, borderRadius: 2, py: 1.2, fontSize: 16, '&:hover': { bgcolor: '#222' } }}
            onClick={() => {
              setAppliedPrice(price);
              setAppliedCategories([...selectedCategories]);
              setDrawerOpen(false);
            }}
          >
            Apply Filter
          </Button>
          <Typography align="center" sx={{ color: 'grey.600', fontSize: 13, mt: 1, cursor: 'pointer' }}
            onClick={() => {
              setPrice([0, 300]);
              setSelectedCategories([]);
              setAppliedPrice([0, 300]);
              setAppliedCategories([]);
            }}
          >
            Clear all filters
          </Typography>
        </Box>
      </Drawer>
      {/* Search Input */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          placeholder="Search products by name"
          size="small"
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
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
            {paginatedProducts.map((product) => (
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
                        borderRadius: 8,
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
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ fontWeight: 700, borderRadius: 2, mt: 1, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#222' } }}
                    onClick={() => handleAddToCart(product)}
                    disabled={quantities[product.id] === 0 || quantities[product.id] > product.stock}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
            <Button
              size="small"
              disabled={currentPage === 1}
              sx={{ minWidth: 80, bgcolor: '#fafbfc', color: 'grey.500', fontWeight: 600 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              &lt; Previous
            </Button>
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx + 1}
                size="small"
                variant={currentPage === idx + 1 ? 'contained' : 'text'}
                sx={{ minWidth: 40, fontWeight: 700, bgcolor: currentPage === idx + 1 ? '#000' : '#fafbfc', color: currentPage === idx + 1 ? '#fff' : 'grey.700', borderRadius: 2, '&:hover': { bgcolor: '#222' } }}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              size="small"
              disabled={currentPage === totalPages}
              sx={{ minWidth: 80, bgcolor: '#fafbfc', color: 'grey.500', fontWeight: 600 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next &gt;
            </Button>
          </Box>
        </Box>
        {/* Right: Order Summary */}
        <Box sx={{ flex: 1, minWidth: 300, width: { xs: '100%', md: 350 }, mt: { xs: 4, md: 0 }, position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'white' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Order Summary
            </Typography>
            {cart.length === 0 ? (
              <Typography align="center" sx={{ color: 'grey.600', fontSize: 15, mb: 2 }}>
                Your cart is empty.
              </Typography>
            ) : (
              cart.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontSize={15} fontWeight={600} noWrap>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        {item.name}
                        <IconButton size="small" sx={{ color: 'red' }} onClick={() => handleRemoveFromCart(item.id)}>
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 0.5 }}
                        onClick={() => handleOrderQtyChange(item.id, -1)}
                      >
                        <RemoveIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography sx={{ mx: 2, fontSize: 15 }}>{item.qty}</Typography>
                      <IconButton
                        size="small"
                        sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 0.5 }}
                        onClick={() => handleOrderQtyChange(item.id, 1)}
                      >
                        <AddIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography fontWeight={600} sx={{ ml: 'auto', fontSize: 15 }}>
                        ${item.price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
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
              sx={{ fontWeight: 600, borderRadius: 1, py: 1.5, fontSize: 15, bgcolor: '#000', color: '#fff', textTransform: 'none', '&:hover': { bgcolor: '#222' } }}
              onClick={handleCheckout}
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