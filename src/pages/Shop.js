import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import baseURL from "../config";

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
    fetch(`${baseURL}api/router/categories/`)
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

  useEffect(() => {
    let url = `${baseURL}api/router/products/?timestamp=${new Date().getTime()}&`; // Додаємо timestamp
  
    if (filters.category) url += `category=${filters.category}&`;
    if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
    if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
  
    console.log("Fetching products with URL:", url);
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Products received:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [filters]);
  

  // Завантаження товарів без фільтрів при першому рендері
  useEffect(() => {
    if (!filters.category && !filters.minPrice && !filters.maxPrice) {
      setFilters({ category: "", minPrice: "", maxPrice: "" }); // Очистити фільтри при першому завантаженні
    }
  }, []); // Запуск лише один раз при завантаженні сторінки

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Всі товари
      </Typography>

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
