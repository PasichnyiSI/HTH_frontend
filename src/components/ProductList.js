import React from "react"; 
import { Link } from "react-router-dom";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p>Товари відсутні.</p>;
  }

  return (
  <div className="shop-product-list">
  {products.map((product) => {
    const hasDiscount = product.discount > 0;
    const discountedPrice = Math.round(product.price_per_sq_m * (1 - product.discount / 100));

  return (
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
      );
    })}
  </div>
  );
}
export default ProductList;
// Експортуємо компонент, щоб використовувати його в інших частинах програми.
