import React, { useEffect, useRef, useState } from "react";
import PopularProductList from "../components/PopularProductList";

const HomePage = ({ popularProducts, noveltiesProducts, bestProducts }) => {
    const sliderContentRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false); // Стан паузи
    const sliderLength = 3; // Кількість слайдів
    const autoSlideInterval = 3000; // Інтервал для автоматичного перемикання (мс)
    const [activeCategory, setActiveCategory] = useState("popular");

    // Обробники кнопок
    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderLength);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderLength) % sliderLength);
    };

    // Автоматичне перемикання
    useEffect(() => {
        if (isPaused) return; // Якщо пауза, інтервал не запускається
        const interval = setInterval(() => {
            handleNext();
        }, autoSlideInterval);

        return () => clearInterval(interval); // Очищення інтервалу
    }, [isPaused]);

    // Оновлення класу для слайдів
    useEffect(() => {
        const sliders = sliderContentRef.current?.children;
        if (sliders) {
            Array.from(sliders).forEach((slide, index) => {
                slide.classList.toggle("show", index === currentSlide);
            });
        }
    }, [currentSlide]);

    const getCategoryProducts = () => {
        switch (activeCategory) {
            case "novelties":
                return noveltiesProducts;
            case "best":
                return bestProducts;
            default:
                return popularProducts;
        }
    };

    return (
        <div className="content-container">
            <div className="slider-container">
                <div
                    className="slider"
                    onMouseEnter={() => setIsPaused(true)} // Зупиняємо автоперемикання
                    onMouseLeave={() => setIsPaused(false)} // Відновлюємо автоперемикання
                >
                    <div className="slider-content" ref={sliderContentRef}>
                        <figure>
                            <img src="/static/img/slider1.png" alt="1" />
                        </figure>
                        <figure>
                            <img src="/static/img/slider2.png" alt="2" />
                        </figure>
                        <figure>
                            <img src="/static/img/slider3.png" alt="3" />
                        </figure>
                    </div>
                    <div className="slider-navigation">
                        <button onClick={handlePrev}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button onClick={handleNext}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mattress-manufacturers-container">
                <div className="mattress-manufacturers">
                    <div className="manufacter-item">
                        <div className="manufacter">
                            <i class="fa-solid fa-face-grin-stars"></i>
                        </div>
                        <p>Висока якість та сучасний дизайн</p>
                    </div>
                    <div className="manufacter-item">
                        <div className="manufacter">
                            <i class="fa fa-handshake"></i>
                        </div>
                        <p>Індивідуальний підхід до клієнтів</p>
                    </div>
                    <div className="manufacter-item">
                        <div className="manufacter">
                            <i class="fa-solid fa-truck-fast"></i>
                        </div>
                        <p>Швидка та надійна доставка</p>
                    </div>
                </div>
            </div>
            <div className="popular-products-container">
                <div className="popular-products">
                    <div className="popular-products-type">
                        <button
                            onClick={() => setActiveCategory("popular")}
                            className={activeCategory === "popular" ? "active" : ""}
                        >
                            Хіти продажу
                        </button>
                        <button
                            onClick={() => setActiveCategory("novelties")}
                            className={activeCategory === "novelties" ? "active" : ""}
                        >
                            Новинки
                        </button>
                        <button
                            onClick={() => setActiveCategory("best")}
                            className={activeCategory === "best" ? "active" : ""}
                        >
                            Розпродаж
                        </button>
                    </div>
                    <div className="product-container">
                        <PopularProductList
                            products={getCategoryProducts()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;