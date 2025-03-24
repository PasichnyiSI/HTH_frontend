import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCardService from "../utils/ProductCardService";
import useProductCardService from "../utils/ProductCardService";
import ProductCardComp from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PopularProductList({ products }) {
  const { wishlist, comparisonlist, isProductInWishlist, isProductInComparisonlist, toggleWishlist, toggleComparisonlist } = useProductLists();
  
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
          return (
            <SwiperSlide key={product.id}>
              <ProductCardComp 
                product={product}
                isProductInWishlist={isProductInWishlist(product)}
                isProductInComparisonlist={isProductInComparisonlist(product)}
                toggleWishlist={toggleWishlist}
                toggleComparisonlist={toggleComparisonlist}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default PopularProductList;
