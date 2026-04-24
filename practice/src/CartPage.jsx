import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import "./css/Cart.css";

const itemIcons = {
  books: "📘",
  pdfs: "📄",
  software: "💻",
  games: "🎮",
  courses: "📚",
};

const itemLabels = {
  books: "Book",
  pdfs: "PDF",
  software: "Software",
  games: "Game",
  courses: "Course",
};

export default function CartPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    formatPrice,
  } = useCart();

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      toast.info("Please log in before checkout.");
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cartPage">
        <div className="cartEmptyState">
          <h1>Your cart is empty</h1>
          <p>Add books, PDFs, software, games, or courses to continue with checkout.</p>
          <Link to="/books" className="cartPrimaryBtn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cartPage">
      <div className="cartLayout">
        <section className="cartItemsSection">
          <div className="sectionIntro">
            <p className="cartEyebrow">Shopping Cart</p>
            <h1>{cartCount} item(s) ready for checkout</h1>
            <p>Review your selected items, then continue to address and payment selection.</p>
          </div>

          <div className="cartItemsList">
            {cartItems.map((item) => (
              <article key={item.id} className="cartItemCard">
                <div className="cartItemIcon">{itemIcons[item.type] ?? "🛍️"}</div>

                <div className="cartItemInfo">
                  <div className="cartItemTopRow">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="cartMeta">
                        {itemLabels[item.type] ?? "Item"} • {item.categoryName}
                      </p>
                    </div>
                    <strong>{item.price}</strong>
                  </div>

                  <p className="cartMeta">Author: {item.author}</p>
                  <p className="cartMeta">Release Year: {item.year}</p>

                  <div className="cartItemActions">
                    <div>
                      <div className="quantityControl">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.type === "pdfs"}
                        >+
                        </button>
                      </div>
                      {item.type === "pdfs" ? (
                        <p className="cartMeta singleItemNote">PDF can be added only one time.</p>
                      ) : null}
                    </div>

                    <button className="removeBtn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="cartSummaryCard">
          <h2>Price Summary</h2>
          <div className="summaryRow">
            <span>Items</span>
            <span>{cartCount}</span>
          </div>
          <div className="summaryRow">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summaryRow">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
          </div>
          <div className="summaryRow totalRow">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button className="cartPrimaryBtn" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
          <Link to="/books" className="continueLink">
            + Add more items
          </Link>
        </aside>
      </div>
    </div>
  );
}
