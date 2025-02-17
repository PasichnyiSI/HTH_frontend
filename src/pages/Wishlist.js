import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid, ListItem, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { fetchWishlist, removeItem } from "../utils/wishlistService";
import useAxios from "../utils/useAxios";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const axiosInstance = useAxios();  // Отримуємо axiosInstance з хуку

    useEffect(() => {
        fetchWishlist(axiosInstance, setWishlist, setError, setLoading);  // Передаємо axiosInstance
    }, [axiosInstance]);  // Додаємо axiosInstance до масиву залежностей

    if (loading) {
        return <Typography variant="h6">Завантаження...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
        return (
            <Container>
                <Typography variant="h6">Ваш список бажаного порожній</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Список бажаного</Typography>
            {wishlist.items.map((item) => (
                <ListItem key={item.id}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia component="img" height="140" image={item.product_image} alt={item.product_name} />
                                <CardContent>
                                    <Typography variant="h6">{item.product_name}</Typography>
                                    <Typography color="textSecondary">{item.product_price} грн</Typography>
                                </CardContent>
                                <IconButton onClick={() => removeItem(axiosInstance, item.product)} color="error">
                                    <Delete />
                                </IconButton>
                            </Card>
                        </Grid>
                    </Grid>
                </ListItem>
            ))}
        </Container>
    );
};

export default Wishlist;
