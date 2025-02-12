import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Додаємо стан завантаження
  const [error, setError] = useState(null); // Додаємо стан помилки

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/router/products/${slug}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductPage;
