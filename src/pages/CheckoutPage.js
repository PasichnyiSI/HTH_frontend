import React, { useState } from "react";
import { Container, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Button, Divider } from "@mui/material";

const CheckoutPage = () => {
    const [order, setOrder] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        delivery: "",
        payment: "",
    });

    const cartItems = [
        { id: 1, name: "Подушка ортопедична", price: 750, quantity: 1 },
        { id: 2, name: "Матрац преміум", price: 3500, quantity: 1 },
    ];

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        alert("Замовлення оформлено!");
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Оформлення замовлення</Typography>

            <Grid container spacing={3}>
                {/* Ліва колонка - форма для даних */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Контактні дані</Typography>
                            <TextField fullWidth label="Ім'я та прізвище" name="name" value={order.name} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Телефон" name="phone" value={order.phone} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Email" name="email" value={order.email} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Адреса доставки" name="address" value={order.address} onChange={handleChange} sx={{ mb: 2 }} />

                            <Typography variant="h6" gutterBottom>Спосіб доставки</Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Оберіть доставку</InputLabel>
                                <Select name="delivery" value={order.delivery} onChange={handleChange}>
                                    <MenuItem value="nova_poshta">Нова Пошта</MenuItem>
                                    <MenuItem value="courier">Кур'єр</MenuItem>
                                    <MenuItem value="pickup">Самовивіз</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant="h6" gutterBottom>Спосіб оплати</Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Оберіть оплату</InputLabel>
                                <Select name="payment" value={order.payment} onChange={handleChange}>
                                    <MenuItem value="card">Оплата карткою</MenuItem>
                                    <MenuItem value="cash">Готівка при отриманні</MenuItem>
                                    <MenuItem value="bank">Банківський переказ</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Права колонка - підсумок замовлення */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Ваше замовлення</Typography>
                            {cartItems.map((item) => (
                                <div key={item.id}>
                                    <Typography>{item.name} x{item.quantity}</Typography>
                                    <Typography color="textSecondary">{item.price} грн</Typography>
                                    <Divider sx={{ my: 1 }} />
                                </div>
                            ))}
                            <Typography variant="h6" sx={{ mt: 2 }}>Загальна сума: {totalPrice} грн</Typography>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
                                Оформити замовлення
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckoutPage;
