import React, { useState, useEffect, useContext } from "react";
import { 
    Container, Typography, Button, List, ListItem, ListItemText, 
    Grid, Divider, CircularProgress, TextField, MenuItem, 
    CardContent, StepLabel, Card, Stepper, Step, Stack, Box, 
} from "@mui/material";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { fetchCart, clearCart } from "../utils/cartService";

const steps = ['Дані покупця', 'Payment details', 'Review your order'];

const CheckoutPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutData, setCheckoutData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        postal_code: "",
        payment_method: "card",
        card_number: "",
        expiration_date: "",
    });

    const [activeStep, setActiveStep] = useState(0);

    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Завантажуємо кошик при завантаженні сторінки
    useEffect(() => {
        fetchCart(axiosInstance, setCart, setLoading, setError);
    }, []);

    // Обчислюємо загальну вартість
    useEffect(() => {
        if (cart && cart.items) {
            const price = cart.items.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
            setTotalPrice(price);
        }
    }, [cart]);

    // Функція для оновлення стану checkoutData при введенні користувачем даних
    const handleChange = (event) => {
        setCheckoutData({ ...checkoutData, [event.target.name]: event.target.value });
    };

    // Функція оформлення замовлення
    const handleCheckout = async () => {
        const token = localStorage.getItem('authTokens');
        if (!token) {
          setError('Please log in to proceed.');
          navigate('/login');
          return;
        }
    
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
    
        const checkoutPayload = {
          user: userId,
          first_name: checkoutData.first_name,
          last_name: checkoutData.last_name,
          email: checkoutData.email,
          address: checkoutData.address,
          city: checkoutData.city,
          country: checkoutData.country,
          postal_code: checkoutData.postal_code,
          payment_method: checkoutData.payment_method
        };
    
        if (checkoutData.payment_method === 'card') {
          checkoutPayload.card_number = checkoutData.card_number.slice(-4);
          checkoutPayload.expiration_date = checkoutData.expiration_date.slice(0, 5);
        }
    
        try {
          const orderResponse = await axiosInstance.post('/orders/orders/', {
            user: userId,
            items: cart.items.map(item => ({
              product_id: item.product.id,
              size_id: item.size_id,
              quantity: item.quantity,
              price: item.product_price
            })),
            total_price: totalPrice
          });
    
          if (orderResponse.status === 201) {
            const orderId = orderResponse.data.id;
            await axiosInstance.post('/checkout/checkout/', {
              ...checkoutPayload,
              order: orderId
            });
    
            await clearCart(axiosInstance);
            navigate('/order-success');
          } else {
            setError(`Error: ${orderResponse.statusText}`);
          }
        } catch (error) {
          console.error('Error during checkout:', error);
          setError(error.response?.data?.detail || 'Failed to process request.');
        }
      };


      const getStepContent = (step) => {
        switch (step) {
          case 0:
            return (
              <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                <TextField fullWidth label="Ім'я" name="first_name" value={checkoutData.first_name} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                <TextField fullWidth label="Прізвище" name="last_name" value={checkoutData.last_name} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Email" type="email" name="email" value={checkoutData.email} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Адреса" name="address" value={checkoutData.address} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Місто" name="city" value={checkoutData.city} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Країна" name="country" value={checkoutData.country} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Поштовий індекс" name="postal_code" value={checkoutData.postal_code} onChange={handleChange} required />
                </Grid>
              </Grid>
            );
          case 1:
            return (
              <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                    <TextField
                        select
                        fullWidth
                        label="Спосіб оплати"
                        name="payment_method"
                        value={checkoutData.payment_method}
                        onChange={handleChange}
                    >
                        <MenuItem value="card">Кредитна/Дебетова картка</MenuItem>
                        <MenuItem value="paypal">PayPal</MenuItem>
                        <MenuItem value="cash">Готівка при отриманні</MenuItem>
                    </TextField>
                    {checkoutData.payment_method === "card" && (
                        <>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Номер картки" name="card_number" value={checkoutData.card_number} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Дата закінчення" name="expiration_date" value={checkoutData.expiration_date} onChange={handleChange} required />
                            </Grid>
                        </>
                    )}
                </Grid>
                {/* Other fields */}
              </Grid>
            );
          case 2:
            return (
              <Stack spacing={2} mt={3}>
                <List>
                {cart.items.map((item) => (
                    <ListItem key={item.id}>
                        <Grid container alignItems="center">
                            <Grid item xs={5}>
                                <ListItemText
                                    primary={item.product_name}
                                    secondary={`Розмір: ${item.size_name || "1 м. кв."}`}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1">{item.product_price * item.quantity} грн</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1">Кількість: {item.quantity}</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
                </List>
                <Typography variant="body1">Всього: {totalPrice} UAH</Typography>
                {/* Add order details review */}
              </Stack>
            );
          default:
            throw new Error('Unknown step');
        }
      };
    
      const handleNext = () => {
        setActiveStep(activeStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <Container>
                <Typography variant="h6">Ваша корзина порожня</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Оформлення замовлення
            </Typography>
            <Card>
                <Divider sx={{ my: 2 }} />
                <CardContent>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<ChevronLeftRoundedIcon />}
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={<ChevronRightRoundedIcon />}
                                onClick={activeStep === steps.length - 1 ? handleCheckout : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Підтвердити замовлення' : 'Далі'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CheckoutPage;
