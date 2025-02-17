import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import useAxios from "../utils/useAxios";
import { TextField, Button, Rating, Box, Typography, Card, CardContent, Avatar } from "@mui/material";

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // Додано стан для відгуків
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const axiosInstance = useAxios();

  // Для запобігання повторним запитам
  const [isProductFetched, setIsProductFetched] = useState(false);
  const [areReviewsFetched, setAreReviewsFetched] = useState(false);  // Новий стейт для перевірки відгуків

  // Завантаження продукту
  useEffect(() => {
    if (isProductFetched) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/router/products/${slug}/`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setIsProductFetched(true);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug, isProductFetched]);

  // Завантаження відгуків тільки один раз
  useEffect(() => {
    if (areReviewsFetched || !slug) return;

    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/rating/ratings/${slug}/`);
        setReviews(response.data);
        setAreReviewsFetched(true);  // Оновлюємо стан, що відгуки завантажено
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [slug, areReviewsFetched, axiosInstance]); // Додаємо axiosInstance та перевірку на наявність відгуків

  // Додавання нового відгуку
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await axiosInstance.post(
        `http://127.0.0.1:8000/rating/ratings/${slug}/rate/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Відгук успішно додано!");
      setRating(0);
      setComment("");
      setPhoto(null);

      // Оновлюємо список відгуків після додавання нового
      const response = await axiosInstance.get(`/rating/ratings/${slug}/`);
      setReviews(response.data);

    } catch (error) {
      setMessage("Помилка при додаванні відгуку: " + (error.response?.data?.error || error.message));
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div>
      <ProductDetail product={product} />

      {/* Відображення відгуків */}
      <Box mt={4}>
        <Typography variant="h6">Відгуки</Typography>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} sx={{ mb: 2, p: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      {review.user && review.user.username
                        ? review.user.username.charAt(0).toUpperCase()
                        : "U"}
                    </Avatar>
                    <Typography variant="subtitle1">
                      {review.user && review.user.username ? review.user.username : "Анонім"}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} readOnly precision={0.5} />
                  <Typography variant="body2" mt={1}>{review.comment}</Typography>
                  {review.photo && (
                    <Box mt={2}>
                      <img src={review.photo} alt="Review" width="100" style={{ borderRadius: 8 }} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Ще немає відгуків.</Typography>
          )}


      </Box>

      {/* Форма для додавання відгуку */}
      <Box mt={4}>
        <Typography variant="h6">Додати відгук</Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={0.5}
              size="large"
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Ваш коментар"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Надіслати відгук
          </Button>
        </form>

        {message && (
          <Typography mt={2} color={message.includes("успішно") ? "green" : "red"}>
            {message}
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default ProductPage;
