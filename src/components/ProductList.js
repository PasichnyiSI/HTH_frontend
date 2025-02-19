import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";
import { getWishlistFromStorage, handleWishlistToggle } from "../utils/wishlistService";
import { getComparisonlistFromStorage, handleComparisonlistToggle } from "../utils/comparisonService";
import useAxios from "../utils/useAxios";

function ProductList({ products }) {

  const axiosInstance = useAxios();
  const [wishlist, setWishlist] = useState(getWishlistFromStorage());
  const [comparisonlist, setComparisonlist] = useState(getComparisonlistFromStorage());

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

  if (!products || products.length === 0) {
    return <p>Товари відсутні.</p>;
  }

  return (
  <div className="shop-product-list">
  {products.map((product) => {
    const hasDiscount = product.discount > 0;
    const discountedPrice = Math.round(product.price_per_sq_m * (1 - product.discount / 100));
    const isProductInWishlist = wishlist.some(item => item.id === product.id);
    const isProductInComparisonlist = comparisonlist.some(item => item.id === product.id);

  return (
    <div className="product-card">
      <div className="wrapper">
        <div className="product-image">
          {hasDiscount && <p className="discount-badge">-{Math.round(product.discount)}%</p>}
          <a
            href="/"
            className={`wishlist-btn ${isProductInWishlist ? "added" : ""}`}
            onClick={(e) => {
              e.preventDefault(); // Запобігаємо переходу по лінку
              handleWishlistToggle(axiosInstance, product, wishlist, setWishlist);
            }}
          >
            <i className={`fa-solid fa-heart ${isProductInWishlist ? "added" : ""}`}></i>
          </a>
          <a
            href="/"
            className={`compare-btn ${isProductInComparisonlist ? "added" : ""}`}
            onClick={(e) => {
              e.preventDefault(); // Запобігаємо переходу по лінку
              handleComparisonlistToggle(axiosInstance, product, comparisonlist, setComparisonlist);
            }}
          >
            <i className={`fa-solid fa-scale-balanced ${isProductInComparisonlist ? "added" : ""}`}></i>
          </a>
          <div className="color-block-img"></div>
          <img src={product.image} alt={product.name} />
        </div>
        <div className="infoProd">
          <span>{product.name}</span>
          <div className="rating-prod">
            <ProductRating productSlug={product.slug} />
          </div>
          <div className="price">
            {hasDiscount ? (
              <>
                <s className="old-price">{Math.round(product.price_per_sq_m)}</s>
                <p className="discounted-price">{discountedPrice} грн</p>
              </>
            ) : (
              <p className="product-price">{Math.round(product.price_per_sq_m)} грн</p>
            )}
          </div>
        </div>
      </div>
      <Link to={`/products/${product.slug}`} className="product-link">
        <button className="view-more-btn">
          <span> Детальніше.. </span>
        </button>
      </Link>
    </div>
      );
    })}
  </div>
  );
}
export default ProductList;
// Експортуємо компонент, щоб використовувати його в інших частинах програми.
