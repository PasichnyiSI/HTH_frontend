import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Завантаження категорій та розмірів
  useEffect(() => {
    fetch("http://localhost:8000/api/router/categories/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // Зберігаємо категорії у стан
      })
      .catch((err) => console.error("Помилка отримання категорій:", err));
  }, []);

  // Функція для оновлення фільтрів
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Завантаження товарів відповідно до фільтрів
  useEffect(() => {
    let url = "http://localhost:8000/api/router/products/?";

    // Додавання фільтрів до URL
    if (filters.category) url += `category=${filters.category}&`;
    if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
    if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;

    // Лог для перевірки правильності сформованого запиту
    console.log("Fetching products with URL:", url);

    // Виконання запиту
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Products received:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [filters]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>Всі товари</Typography>

      {/* Фільтри */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Категорія</InputLabel>
            <Select
              name="category"
              value={filters.category || ""}
              onChange={handleFilterChange}
            >
              <MenuItem value="">Всі</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Мін. ціна"
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Макс. ціна"
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>

      {/* Список товарів */}
      <div className="shop-product-container">
        <ProductList products={products} />
      </div>
    </Container>
  );
};

export default Shop;
