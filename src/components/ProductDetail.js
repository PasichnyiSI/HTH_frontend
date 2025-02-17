import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductRating from "./ProductRating";
import { addToCart } from "../utils/cartService"
import { getWishlistFromStorage, handleWishlistToggle } from "../utils/wishlistService";
import { getComparisonlistFromStorage, handleComparisonlistToggle } from "../utils/comparisonService";

function ProductDetail({ product, user }) {
  const [selectedSize, setSelectedSize] = useState("default");
  const [price, setPrice] = useState(parseFloat(product.price_per_sq_m));
  const [originalPrice, setOriginalPrice] = useState(parseFloat(product.price_per_sq_m));
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(getWishlistFromStorage());
  const [comparisonlist, setComparisonlist] = useState(getComparisonlistFromStorage());
  const axiosInstance = useAxios(); // Використовуємо axios з токеном

  useEffect(() => {
    const handleStorageChange = () => {
        setWishlist(getWishlistFromStorage()); // Оновлюємо локальний state
        setComparisonlist(getComparisonlistFromStorage()); 
    };

    window.addEventListener("storage", handleStorageChange); // Слідкуємо за змінами localStorage

    return () => {
        window.removeEventListener("storage", handleStorageChange); // Прибираємо слухача при розмонтуванні
    };
}, []);

  const hasDiscount = product.discount && parseFloat(product.discount) > 0;
  const discountedPrice = hasDiscount ? (price - (parseFloat(product.discount) / 100) * price) : price;
  const isProductInWishlist = wishlist.some(item => item.id === product.id);
  const isProductInComparisonlist = comparisonlist.some(item => item.id === product.id);

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

  if (!product) {
    return <p>Товар відсутній.</p>;
  }

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
                      <s className="originalPrice">{Math.round(originalPrice)} грн</s>
                      <p className="discountedPrice">{Math.round(discountedPrice)} грн</p>
                    </>
                  ) : (
                    <p className="price">{Math.round(price)} грн</p>
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
                  <option value="default">1 м²</option>
                  {product.sizes.map((sizeOption) => (
                    <option key={sizeOption.size.id} value={sizeOption.size.id}>
                      {sizeOption.size.name}
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
                    <button className={`compare-btn-product btn btn-primary text-uppercase text-nowrap me-2 ${isProductInComparisonlist ? "added" : ""}`}
                      onClick={(e) => {
                        e.preventDefault(); // Запобігаємо переходу по лінку
                        handleComparisonlistToggle(axiosInstance, product, comparisonlist, setComparisonlist);
                      }}
                    >
                      <i className="fa-solid fa-scale-balanced"></i>
                    </button>
                    <button className={`wishlist-btn-product btn btn-primary text-uppercase text-nowrap me-2 ${isProductInWishlist ? "added" : ""}`}
                      onClick={(e) => {
                        e.preventDefault(); // Запобігаємо переходу по лінку
                        handleWishlistToggle(axiosInstance, product, wishlist, setWishlist);
                      }}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>
                    <button className="btn btn-primary text-uppercase text-nowrap me-2" onClick={() => addToCart(axiosInstance, product, selectedSize, quantity, discountedPrice)}>
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
