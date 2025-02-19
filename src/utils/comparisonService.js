export const fetchComparisonlist = async (axiosInstance, setComparisonlist, setError, setLoading) => {
    try {
        const response = await axiosInstance.get("http://hth-backend-tks7.onrender.com/comparisonlist/comparisonlist/");
        console.log(response.data);
        if (response.data.length > 0 && response.data[0].items) {
            setComparisonlist(response.data[0]);
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

// removeItem тепер приймає axiosInstance як параметр
export const removeItem = async (axiosInstance, productId = null) => {
    if (!productId) {
        alert("Помилка: productId не знайдено!");
        return;
    }

    try {
        const response = await axiosInstance.post("/comparisonlist/comparisonlist/remove_item/", {
            product_id: productId
        });

        console.log("Успішно видалено:", response.data);

        const updatedComparisonlist = getComparisonlistFromStorage().filter(item => item.id !== productId);
        localStorage.setItem("comparisonlist", JSON.stringify(updatedComparisonlist));

        window.dispatchEvent(new Event("storage"));

    } catch (error) {
        console.error("Помилка при видаленні товару з кошика", error);
    }
};


export const addToComparisonlist = async (axiosInstance, product, discountedPrice) => {
    try {
      const response = await axiosInstance.post("http://hth-backend-tks7.onrender.com/comparisonlist/comparisonlist/add_item/", {
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

export const getComparisonlistFromStorage = () => {
    const savedComparisonlist = localStorage.getItem("comparisonlist");
    return savedComparisonlist ? JSON.parse(savedComparisonlist) : [];
};

export const handleComparisonlistToggle = (axiosInstance, product, comparisonlist, setComparisonlist) => {
    const isProductInComparisonlist = comparisonlist.some(item => item.id === product.id);

    if (isProductInComparisonlist) {
        removeItem(axiosInstance, product.id);
        setComparisonlist(prevComparisonlist => {
            const updatedComparisonlist = prevComparisonlist.filter(item => item.id !== product.id);
            localStorage.setItem("comparisonlist", JSON.stringify(updatedComparisonlist));
            return updatedComparisonlist;
        });
    } else {
        const discountedPrice = Math.round(product.price_per_sq_m * (1 - product.discount / 100));
        addToComparisonlist(axiosInstance, product, discountedPrice);
        setComparisonlist(prevComparisonlist => {
            const updatedComparisonlist = [...prevComparisonlist, product];
            localStorage.setItem("comparisonlist", JSON.stringify(updatedComparisonlist));
            return updatedComparisonlist;
        });
    }
};