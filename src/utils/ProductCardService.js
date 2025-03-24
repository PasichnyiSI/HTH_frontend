import { useState, useEffect } from "react";
import { getWishlistFromStorage, handleWishlistToggle } from "../utils/wishlistService";
import { getComparisonlistFromStorage, handleComparisonlistToggle } from "../utils/comparisonService";
import useAxios from "../utils/useAxios";

const useProductCardService = () => {
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

  return {
    wishlist,
    comparisonlist,
    isProductInWishlist: (product) => wishlist.some((item) => item.id === product.id),
    isProductInComparisonlist: (product) => comparisonlist.some((item) => item.id === product.id),
    toggleWishlist: (product) => handleWishlistToggle(axiosInstance, product, wishlist, setWishlist),
    toggleComparisonlist: (product) => handleComparisonlistToggle(axiosInstance, product, comparisonlist, setComparisonlist)
  };
};

export default useProductCardService;
