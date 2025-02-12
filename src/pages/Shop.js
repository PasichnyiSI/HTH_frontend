import React from 'react';
import ProductList from "../components/ProductList";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Select, MenuItem, TextField, FormControl, InputLabel } from "@mui/material";




const Shop = ({products}) => {

  return (
    <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Всі товари</Typography>

            {/* Фільтри */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Категорія</InputLabel>
                        <Select name="category" value="">
                            <MenuItem value="">Всі</MenuItem>
                            <MenuItem value="Подушки">Подушки</MenuItem>
                            <MenuItem value="Матраци">Матраци</MenuItem>
                            <MenuItem value="Ковдри">Ковдри</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Макс. ціна" type="number" name="price" value=""/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Розмір</InputLabel>
                        <Select name="size" value="" >
                            <MenuItem value="">Будь-який</MenuItem>
                            <MenuItem value="Small">Small</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Large">Large</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* Список товарів */}
            <div className="shop-product-container">
              <ProductList products={products}/>
            </div>
        </Container>
  );
};

export default Shop;


{/* <div class="shop-container">
<div className='filter-container'>

</div>

</div> */}