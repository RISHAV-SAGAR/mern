import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { libraryInventory } from "./data/libraryData";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import "./css/ProductDetails.css";

const typeLabels = {
  books: "Books",
  pdfs: "PDFs",
  software: "Software",
  games: "Games",
  courses: "Courses",
};

const parentRoutes = {
  books: "/books",
  pdfs: "/books",
  software: "/software",
  games: "/games",
  courses: "/courses",
};

const creatorLabels = {
  books: "Author",
  pdfs: "Author",
  software: "Publisher",
  games: "Studio",
  courses: "Instructor",
};

export default function ProductDetails() {
  const navigate = useNavigate();
  const { type, category } = useParams();
  const { addToCart, cartItems } = useCart();
  const { isLoggedIn } = useAuth();
  const selectedCategory = libraryInventory[type]?.[category];

  const isPdfAlreadyInCart = (itemName) =>
    type === "pdfs" &&
    cartItems.some((cartItem) => cartItem.id === `${type}-${category}-${itemName}`);

  const createCartItem = (item) => ({
    ...item,
    id: `${type}-${category}-${item.name}`,
    type,
    category,
    categoryName: selectedCategory.title,
  });

  const handleAddToCart = (item) => {
    if (isPdfAlreadyInCart(item.name)) {
      toast.info("This PDF can only be added once.");
      return;
    }

    addToCart(createCartItem(item));
    toast.success(`${item.name} added to cart`);
  };

  const handleBuyNow = (item) => {
    if (!isPdfAlreadyInCart(item.name)) {
      addToCart(createCartItem(item));
    }

    if (!isLoggedIn) {
      toast.info("Please log in to continue to checkout.");
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    navigate("/checkout");
  };

  if (!selectedCategory) {
    return (
      <div className="detailsPage emptyState">
        <h2>Category not found</h2>
        <p>Please go back and choose one of the available categories.</p>
        <Link to="/books" className="backLink actionLink">
          ← Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="detailsPage">
      <section className="detailsHero">
        <Link to={parentRoutes[type] ?? "/books"} className="backLink">
          ← Back to categories
        </Link>
        <span className="detailsBadge">{typeLabels[type] ?? "Library"}</span>
        <h1>{selectedCategory.title}</h1>
        <p>{selectedCategory.description}</p>
      </section>

      <section className="itemsGrid">
        {selectedCategory.items.map((item) => {
          const pdfLocked = isPdfAlreadyInCart(item.name);

          return (
            <article className="itemCard" key={item.name}>
              <div className="itemHeader">
                <h3>{item.name}</h3>
                <span className="itemPrice">{item.price}</span>
              </div>

              <p className="itemMeta">
                <strong>{creatorLabels[type] ?? "Author"}:</strong> {item.author}
              </p>
              <p className="itemMeta">
                <strong>Release Year:</strong> {item.year}
              </p>
              <p className="itemDescription">{item.description}</p>

              <div className="itemActions">
                <button
                  className="primaryActionBtn"
                  onClick={() => handleAddToCart(item)}
                  disabled={pdfLocked}
                >
                  {pdfLocked ? "Already Added" : "Add to Cart"}
                </button>
                <button
                  className="secondaryActionBtn"
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
