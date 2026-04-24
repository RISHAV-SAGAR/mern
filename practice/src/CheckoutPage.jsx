import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./context/CartContext";
import "./css/Checkout.css";

const addressOptions = [
  {
    key: "home",
    label: "Home",
    line1: "House 27, Street 10, Gulberg",
    city: "Lahore, Pakistan",
  },
  {
    key: "work",
    label: "Work",
    line1: "Office 14, Business Hub, Johar Town",
    city: "Lahore, Pakistan",
  },
  {
    key: "hostel",
    label: "Hostel",
    line1: "Room 212, Student Residency, Canal Road",
    city: "Lahore, Pakistan",
  },
];

export default function CheckoutPage() {
  const { cartItems, cartCount, subtotal, deliveryFee, total, formatPrice } = useCart();
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [contactInfo, setContactInfo] = useState({
    fullName: "Ali Student",
    phone: "+92 300 1234567",
    note: "Please call before delivery.",
  });

  if (cartItems.length === 0) {
    return (
      <div className="checkoutPage">
        <div className="checkoutEmptyState">
          <h1>No items available for checkout</h1>
          <p>Add books, PDFs, software, or games first, then return here to choose address and payment type.</p>
          <Link to="/books" className="checkoutBtnPrimary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const selectedAddressDetails = addressOptions.find(
    (address) => address.key === selectedAddress
  );

  const handleContinue = () => {
    toast.success(
      `Address and ${paymentMethod.toUpperCase()} selected. You can connect the payment gateway next.`
    );
  };

  return (
    <div className="checkoutPage">
      <div className="checkoutLayout">
        <section className="checkoutMain">
          <div className="checkoutIntro">
            <p className="checkoutEyebrow">Checkout</p>
            <h1>Confirm delivery details</h1>
            <p>Choose one saved address, review the amount, and select a payment method.</p>
          </div>

          <div className="checkoutCard">
            <h2>Contact Details</h2>
            <div className="checkoutFormGrid">
              <label>
                Full Name
                <input
                  type="text"
                  value={contactInfo.fullName}
                  onChange={(e) =>
                    setContactInfo((current) => ({ ...current, fullName: e.target.value }))
                  }
                />
              </label>

              <label>
                Phone Number
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((current) => ({ ...current, phone: e.target.value }))
                  }
                />
              </label>
            </div>

            <label className="noteField">
              Delivery Note
              <textarea
                rows="3"
                value={contactInfo.note}
                onChange={(e) =>
                  setContactInfo((current) => ({ ...current, note: e.target.value }))
                }
              />
            </label>
          </div>

          <div className="checkoutCard">
            <h2>Select Address</h2>
            <div className="addressGrid">
              {addressOptions.map((address) => (
                <label
                  key={address.key}
                  className={`addressOption ${selectedAddress === address.key ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === address.key}
                    onChange={() => setSelectedAddress(address.key)}
                  />
                  <div>
                    <strong>{address.label}</strong>
                    <p>{address.line1}</p>
                    <p>{address.city}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="checkoutCard">
            <h2>Payment Method</h2>
            <div className="paymentOptions">
              <label className={`paymentOption ${paymentMethod === "cod" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>

              <label className={`paymentOption ${paymentMethod === "upi" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI
              </label>

              <label className={`paymentOption ${paymentMethod === "netbanking" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "netbanking"}
                  onChange={() => setPaymentMethod("netbanking")}
                />
                Net Banking
              </label>
            </div>
          </div>
        </section>

        <aside className="checkoutSidebar">
          <div className="checkoutCard stickyCard">
            <h2>Order Summary</h2>
            <p className="miniText">{cartCount} item(s) selected</p>

            <div className="orderPreviewList">
              {cartItems.map((item) => (
                <div key={item.id} className="orderPreviewItem">
                  <span>{item.name} × {item.quantity}</span>
                  <strong>{formatPrice(item.numericPrice * item.quantity)}</strong>
                </div>
              ))}
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

            <div className="selectionPreview">
              <h3>Selected Address</h3>
              <p>{selectedAddressDetails?.label}</p>
              <p>{selectedAddressDetails?.line1}</p>
              <p>{selectedAddressDetails?.city}</p>

              <h3>Payment</h3>
              <p>{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI" : "Net Banking"}</p>
            </div>

            <button className="checkoutBtnPrimary" onClick={handleContinue}>
              Continue with {paymentMethod === "cod" ? "COD" : paymentMethod === "upi" ? "UPI" : "Net Banking"}
            </button>
            <Link to="/cart" className="backToCartLink">← Back to cart</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
