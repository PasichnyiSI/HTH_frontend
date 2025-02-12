import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Підключаємо стилі Swiper (без зайвих змін вашого дизайну)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PopularProductList({ popularProducts }) {
  if (!popularProducts || popularProducts.length === 0) {
    return <p>No popular products available.</p>;
  }

  return (
    <div className="product-list">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        loop={false} // Вимикаємо безкінечний цикл
        allowTouchMove={true} // Дозволяємо ручне гортання
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
        {popularProducts.map((product) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = Math.round(product.price_per_sq_m * (1 - product.discount / 100));

          return (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="wrapper">
                  <div className="product-image">
                    {hasDiscount && <p className="discount-badge">-{Math.round(product.discount)}%</p>}
                    <a href="/" className="wishlist-btn"><i className="fa-regular fa-heart"></i></a>
                    <a href="/" className="compare-btn"><i class="fa-solid fa-scale-balanced"></i></a>
                    <div className="color-block-img"></div>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="infoProd">
                    <span>{product.name}</span>
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
                <Link to={`/product/${product.slug}`} className="product-link">
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
