export const fetchCart = async (axiosInstance, setCart, setLoading, setError) => {
    try {
        const response = await axiosInstance.get("https://hth-backend-tks7.onrender.com/cart/cart/");
        console.log(response.data);
        if (response.data.length > 0 && response.data[0].items) {
            setCart(response.data[0]);
        } else {
            setError("Ваш кошик порожній");
        }
    } catch (err) {
        setError("Не вдалося завантажити корзину.");
        console.error(err);
    } finally {
        setLoading(false);
    }
};

export const removeItem = async (axiosInstance, productId, sizeId = null) => {
    console.log("Отримані значення для видалення:", { productId, sizeId });
  
    if (!productId) {
      alert("Помилка: productId не знайдено!");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/cart/cart/remove_item/", {
        product_id: productId,
        size_id: sizeId
      });
  
      console.log("Успішно видалено:", response.data);
    } catch (error) {
      console.error("Помилка при видаленні товару з кошика", error);
    }
};

export const addToCart = async (axiosInstance, product, selectedSize, quantity, discountedPrice) => {
    try {
      const response = await axiosInstance.post("https://hth-backend-tks7.onrender.com/cart/cart/add_item/", {
        product_id: product.id,
        size_id: selectedSize.id,
        size_name: selectedSize.name,
        quantity: quantity,
        price: Math.round(discountedPrice), // Передаємо кінцеву ціну
      });
  
      console.log("Товар додано до кошика:", response.data);
      alert("Товар успішно додано до кошика!");
    } catch (error) {
      console.error("Помилка при додаванні в кошик:", error.response ? error.response.data : error);
      alert(`Не вдалося додати товар до кошика: ${error.response?.data?.detail || "Невідома помилка"}`);
    }
};
  
export const clearCart = async (axiosInstance) => {
  try {
      const response = await axiosInstance.post("/cart/cart/clear/");
      console.log("Кошик очищено:", response.data);
  } catch (error) {
      console.error("Помилка при очищенні кошика:", error);
  }
};
