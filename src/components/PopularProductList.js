import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductRating from "./ProductRating";
import { getWishlistFromStorage, handleWishlistToggle } from "../utils/wishlistService";
import { getComparisonlistFromStorage, handleComparisonlistToggle } from "../utils/comparisonService";
import useAxios from "../utils/useAxios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PopularProductList({ products }) {
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
    return <p>No products available.</p>;
  }

  return (
    <div className="product-list">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        loop={false}
        allowTouchMove={true}
        breakpoints={{
          1300: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            swiper.allowSlideNext = false; // Забороняємо перехід вперед на останньому слайді
          } else {
            swiper.allowSlideNext = true;
          }
        }}
        style={{ width: "85%" }}
      >
        {products.map((product) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = Math.round(product.price_per_sq_m * (1 - product.discount / 100));
          const isProductInWishlist = wishlist.some(item => item.id === product.id);
          const isProductInComparisonlist = comparisonlist.some(item => item.id === product.id);

          return (
            <SwiperSlide key={product.id}>
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
                      <i className="fa-solid fa-heart"></i>
                    </a>
                    <a
                      href="/"
                      className={`compare-btn ${isProductInComparisonlist ? "added" : ""}`}
                      onClick={(e) => {
                        e.preventDefault(); // Запобігаємо переходу по лінку
                        handleComparisonlistToggle(axiosInstance, product, comparisonlist, setComparisonlist);
                      }}
                    >
                      <i className="fa-solid fa-scale-balanced"></i>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default PopularProductList;
