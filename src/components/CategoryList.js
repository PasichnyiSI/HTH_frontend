import React from "react";
import { Link } from "react-router-dom";

function CategoryList({ categories }) {
  if (!categories || categories.length === 0) {
    return <p>No categories available.</p>;
  }

  return (
    <div className="mega-menu-container">
      {categories.map((category) => (
        <div key={category.id} className="item">
          <ul>
            <span>{category.name}</span>
            {category.products && category.products.length > 0 ? (
              category.products.map((product) => (
                <li key={product.id}>
                  <Link to={`/products/${product.slug}`}>{product.name}</Link>
                </li>
              ))
            ) : (
              <li>Немає товарів</li>
            )}
          </ul>
            <button className="dropdown-menu-btn">
                <Link to={`/category/${category.slug}`}>Дивитись більше..</Link>
            </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
