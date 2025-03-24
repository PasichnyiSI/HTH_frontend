import ProductCardService from "../utils/ProductCardService";
import useProductCardService from "../utils/ProductCardService";
import ProductCardComp from "./ProductCard";

function ProductList({ products }) {
  const { wishlist, comparisonlist, isProductInWishlist, isProductInComparisonlist, toggleWishlist, toggleComparisonlist } = useProductLists();
  
  if (!products || products.length === 0) {
    return <p>Товари відсутні.</p>;
  }

  return (
  <div className="shop-product-list">
  {products.map((product) => {

  return (
      <ProductCardComp 
        product={product}
        isProductInWishlist={isProductInWishlist(product)}
        isProductInComparisonlist={isProductInComparisonlist(product)}
        toggleWishlist={toggleWishlist}
        toggleComparisonlist={toggleComparisonlist}
      />
      );
    })}
  </div>
  );
}
export default ProductList;
