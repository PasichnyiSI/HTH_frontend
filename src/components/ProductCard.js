import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, IconButton, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BalanceIcon from "@mui/icons-material/Balance";
import ProductRating from "../components/ProductRating";

const ProductCardComp = ({
  product,
  isProductInWishlist,
  isProductInComparisonlist,
  toggleWishlist,
  toggleComparisonlist
}) => {
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price_per_sq_m * (1 - product.discount / 100))
    : product.price_per_sq_m;

  return (
    <Box className="product-card" sx={{ border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden", p: 2 }}>
      <Box className="wrapper">
        <Box className="product-image" sx={{ position: "relative", textAlign: "center" }}>
          {hasDiscount && (
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: "red",
                color: "white",
                px: 1,
                borderRadius: "5px"
              }}
            >
              -{Math.round(product.discount)}%
            </Typography>
          )}
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            sx={{ position: "absolute", top: 10, right: 10, color: isProductInWishlist ? "red" : "gray" }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              toggleComparisonlist(product);
            }}
            sx={{ position: "absolute", top: 10, right: 50, color: isProductInComparisonlist ? "blue" : "gray" }}
          >
            <BalanceIcon />
          </IconButton>
          <img src={product.image} alt={product.name} style={{ maxWidth: "100%", height: "auto" }} />
        </Box>
        <Box className="infoProd" sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6">{product.name}</Typography>
          <Box className="rating-prod">
            <ProductRating productSlug={product.slug} />
          </Box>
          <Box className="price">
            {hasDiscount ? (
              <>
                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                  {Math.round(product.price_per_sq_m)} грн
                </Typography>
                <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
                  {discountedPrice} грн
                </Typography>
              </>
            ) : (
              <Typography variant="h6">{Math.round(product.price_per_sq_m)} грн</Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Link to={`/products/${product.slug}`} style={{ textDecoration: "none", display: "block", marginTop: "10px" }}>
        <Button fullWidth variant="contained" color="primary">
          Детальніше..
        </Button>
      </Link>
    </Box>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price_per_sq_m: PropTypes.number.isRequired,
    discount: PropTypes.number
  }).isRequired,
  isProductInWishlist: PropTypes.bool.isRequired,
  isProductInComparisonlist: PropTypes.bool.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  toggleComparisonlist: PropTypes.func.isRequired
};

export default ProductCardComp;
