export const fetchWishlist = async (axiosInstance, setWishlist, setError, setLoading) => {
    try {
        const response = await axiosInstance.get("http://hth-backend-tks7.onrender.com/wishlist/wishlist/");
        console.log(response.data);
        if (response.data.length > 0 && response.data[0].items) {
            setWishlist(response.data[0]);
        } else {
            setError("Ваш список бажаного порожній!");
        }
    } catch (err) {
        setError("Не вдалося завантажити список бажаного.");
        console.error(err);
    } finally {
        setLoading(false);
    }
};

export const removeItem = async (axiosInstance, productId = null) => {
    if (!productId) {
        alert("Помилка: productId не знайдено!");
        return;
    }

    try {
        const response = await axiosInstance.post("/wishlist/wishlist/remove_item/", {
            product_id: productId
        });

        console.log("Успішно видалено:", response.data);

        // Оновлюємо localStorage
        const updatedWishlist = getWishlistFromStorage().filter(item => item.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        // Генеруємо подію "storage", щоб оновити інші компоненти
        window.dispatchEvent(new Event("storage"));

    } catch (error) {
        console.error("Помилка при видаленні товару", error);
    }
};



export const addToWishlist = async (axiosInstance, product, discountedPrice) => {
    try {
      const response = await axiosInstance.post("http://hth-backend-tks7.onrender.com/wishlist/wishlist/add_item/", {
        product_id: product.id,
        price: Math.round(discountedPrice), // Додаємо ціну зі знижкою
      });
  
      console.log("Товар додано до списку бажаного:", response.data);
      alert("Товар успішно додано до списку бажаного!");
    } catch (error) {
      console.error("Помилка при додаванні в список бажаного:", error.response ? error.response.data : error);
      alert(`Не вдалося додати товар до списку бажаного: ${error.response?.data?.detail || "Невідома помилка"}`);
    }
  };

export const getWishlistFromStorage = () => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
};

export const handleWishlistToggle = (axiosInstance, product, wishlist, setWishlist) => {
    const isProductInWishlist = wishlist.some(item => item.id === product.id);

    if (isProductInWishlist) {
        removeItem(axiosInstance, product.id);
        setWishlist(prevWishlist => {
            const updatedWishlist = prevWishlist.filter(item => item.id !== product.id);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            window.dispatchEvent(new Event("storage"));  // Сповіщаємо інші компоненти
            return updatedWishlist;
        });
    } else {
        const discountedPrice = Math.round(product.price_per_sq_m * (1 - product.discount / 100));
        addToWishlist(axiosInstance, product, discountedPrice);
        setWishlist(prevWishlist => {
            const updatedWishlist = [...prevWishlist, product];
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            window.dispatchEvent(new Event("storage"));  // Сповіщаємо інші компоненти
            return updatedWishlist;
        });
    }
};


