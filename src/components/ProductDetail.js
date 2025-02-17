import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductRating from "./ProductRating";

function ProductDetail({ product, user }) {
  const [selectedSize, setSelectedSize] = useState("default");
  const [price, setPrice] = useState(parseFloat(product.price_per_sq_m));
  const [originalPrice, setOriginalPrice] = useState(parseFloat(product.price_per_sq_m));
  const [quantity, setQuantity] = useState(1);
  const axiosInstance = useAxios(); // Використовуємо axios з токеном

  if (!product) {
    return <p>Товар відсутній.</p>;
  }

  const hasDiscount = product.discount && parseFloat(product.discount) > 0;
  const discountedPrice = hasDiscount ? (price - (parseFloat(product.discount) / 100) * price) : price;

  const handleSizeChange = (event) => {
    const sizeId = event.target.value;

    if (sizeId === "default") {
      setSelectedSize({ id: null, name: "1 м²" });
      setPrice(parseFloat(product.price_per_sq_m));
      setOriginalPrice(parseFloat(product.price_per_sq_m));
    } else {
      const selected = product.sizes.find((size) => size.size.id === Number(sizeId));
      if (selected) {
        setSelectedSize({ id: selected.size.id, name: selected.size.name });
        setPrice(parseFloat(selected.price));
        setOriginalPrice(parseFloat(selected.price));
      }
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };

  const addToCart = async () => {
    try {
      const response = await axiosInstance.post("http://127.0.0.1:8000/cart/cart/add_item/", {
        product_id: product.id,
        size_id: selectedSize.id,  // Тут вже збережений коректний id
        size_name: selectedSize.name,  // Ім'я розміру передається окремо
        quantity: quantity,
      });

      console.log("Товар додано до кошика:", response.data);
      alert("Товар успішно додано до кошика!");
    } catch (error) {
      console.error("Помилка при додаванні в кошик:", error.response ? error.response.data : error);
      alert(`Не вдалося додати товар до кошика: ${error.response?.data?.detail || "Невідома помилка"}`);
    }
  };

  return (
    <div className="product-page-container">
      <div key={product.id} className="card card-body mb-5">
        <div className="row row-cols-1 row-cols-lg-2 g-2">
          <div className="col d-none d-lg-block">
            <img className="w-100 rounded" src={product.image} alt={product.name} />
          </div>
          <div className="col">
            <div className="h-100 d-flex flex-column">
              <div className="flex-grow-1">
                <h5 className="text-muted text-uppercase mb-1">{product.category}</h5>
                <h3>{product.name}</h3>

                <div className="fs-4 fw-bold mb-2">
                  {hasDiscount ? (
                    <>
                      <s>{Math.round(originalPrice)} грн</s>
                      <p>{Math.round(discountedPrice)} грн</p>
                    </>
                  ) : (
                    <p>{Math.round(price)} грн</p>
                  )}
                </div>
                <ProductRating productSlug={product.slug} user={user} />
              </div>

              <div className="mt-2">
                <hr className="mt-0 mb-2" />
                <h6 className="text-uppercase fw-bold mb-2">Обрати розмір:</h6>
                <select
                  className="custom-select d-block w-100"
                  id="size"
                  required
                  value={selectedSize.id || "default"}
                  onChange={handleSizeChange}
                >
                  <option value="default">1 м² - {parseFloat(product.price_per_sq_m)} грн</option>
                  {product.sizes.map((sizeOption) => (
                    <option key={sizeOption.size.id} value={sizeOption.size.id}>
                      {sizeOption.size.name} - {parseFloat(sizeOption.price)} грн
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2">
                <hr className="mt-0 mb-2" />
                <h6 className="text-uppercase mb-0">Кількість</h6>
                <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-center">
                  <div className="flex-grow-1 mt-2">
                    <div className="d-flex flex-row flex-nowrap">
                      <button className="btn btn-secondary" type="button" onClick={() => handleQuantityChange(-1)}>
                        <ChevronLeftIcon className="quantity-icons" />
                      </button>
                      <input
                        type="text"
                        className="form-control border-0 bg-white text-center px-0 mx-1 w-25 fw-bold user-select-none pe-none"
                        value={quantity}
                        readOnly
                      />
                      <button className="btn btn-secondary" type="button" onClick={() => handleQuantityChange(1)}>
                        <ChevronRightIcon className="quantity-icons" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 d-flex flex-row flex-nowrap align-items-center">
                    <button className="btn btn-primary text-uppercase text-nowrap me-2">
                      <i className="fa-solid fa-scale-balanced"></i>
                    </button>
                    <button className="btn btn-primary text-uppercase text-nowrap me-2">
                      <i className="fa-solid fa-heart"></i>
                    </button>
                    <button className="btn btn-primary text-uppercase text-nowrap me-2" onClick={addToCart}>
                      В кошик
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-body mb-5">
        <div className="row">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
