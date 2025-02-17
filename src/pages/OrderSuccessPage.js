import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Ваше замовлення успішно оформлено!
      </Typography>
      <Typography variant="body1" paragraph>
        Дякуємо за покупку. Ми отримали ваше замовлення і скоро з вами зв'яжуться.
      </Typography>
      <Button variant="contained" onClick={handleGoHome} sx={{ mt: 3 }}>
        Повернутися на головну
      </Button>
    </Box>
  );
};

export default OrderSuccessPage;
