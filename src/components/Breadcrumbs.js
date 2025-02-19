import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Breadcrumbs = () => {
    const location = useLocation();
    const [customNames, setCustomNames] = useState({});

    // Словник назв для основних розділів
    const sectionNames = {
        "products": "Товари",
        "categories": "Категорії",
        "dashboard": "Профіль",
        "wishlist": "Список бажаного",
        "comparison": "Список порівнянь",
        "cart": "Кошик",
        "contacts": "Контакти",
        "aboutus": "Про нас",
        "return": "Повернення товару",
        "shipping": "Доставка та оплата",
        "checkout": "Оформлення замовлення",
        "order-success": "Успішне оформлення",
    };

    const excludedPaths = ["/", "/login", "/register"];

    const pathnames = location.pathname.split("/").filter((x) => x);

    useEffect(() => {
        const fetchNames = async () => {
            let newNames = {};

            // Перевіряємо, чи поточний шлях в excludedPaths
            if (excludedPaths.includes(location.pathname) || pathnames.length === 0) {
                return null;
            }

            // Перевіряємо частини шляху
            for (let i = 0; i < pathnames.length; i++) {
                const segment = pathnames[i];

                // Якщо це продукт
                if (pathnames[i - 1] === "products") {
                    try {
                        const response = await axios.get(`http://localhost:8000/api/router/products/${segment}/`);
                        newNames[segment] = response.data.name;
                    } catch (error) {
                        console.error("Помилка завантаження продукту:", error);
                    }
                }

                // Якщо це категорія
                if (pathnames[i - 1] === "categories") {
                    try {
                        const response = await axios.get(`http://localhost:8000/api/router/categories/${segment}/`);
                        newNames[segment] = response.data.name;
                    } catch (error) {
                        console.error("Помилка завантаження категорії:", error);
                    }
                }
            }

            setCustomNames(newNames);
        };

        fetchNames();
    }, [location.pathname]);

    return (
        // Перевірка на головну сторінку та інші сторінки
        !(excludedPaths.includes(location.pathname) || pathnames.length === 0) && (
            <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2, mt: 2 }} separator={<NavigateNextIcon fontSize="small" />}>
                <Link to="/" style={{ textDecoration: "none", color: "#064469", display: "flex", alignItems: "center"}}>
                    <HomeIcon fontSize="tiny" sx={{ marginRight: 1 }}/>
                    <Typography fontSize="large">Головна</Typography> 
                </Link>
                {pathnames.map((value, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const displayName = customNames[value] || sectionNames[value] || value;

                    return isLast ? (
                        <Typography fontSize="large" key={index} color="#fff">
                            {displayName}
                        </Typography>
                    ) : (
                        <Link key={index} to={routeTo} style={{ textDecoration: "none", color: "#064469", fontSize: "large" }}>
                            {displayName}
                        </Link>
                    );
                })}
            </MUIBreadcrumbs>
        )
    );
};

export default Breadcrumbs;
