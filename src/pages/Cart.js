import React, { useEffect, useState } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton, Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { fetchCart, removeItem } from "../utils/cartService";
import useAxios from "../utils/useAxios";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosInstance = useAxios();

    useEffect(() => {
      fetchCart(axiosInstance, setCart, setLoading, setError);
  }, [axiosInstance]);  // Додаємо axiosInstance до масиву залежностей
   

    if (loading) {
        return <Typography variant="h6">Завантаження...</Typography>;
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
                Ваша корзина
            </Typography>
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
                            <Grid item xs={2}>
                                <Typography variant="body1">Кількість: {item.quantity}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => removeItem(axiosInstance, item.product, item.size)} color="error">
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>

            <Button variant="contained" color="primary" fullWidth href="/checkout">
                Оформити замовлення
            </Button>
        </Container>
    );
};

export default Cart;
