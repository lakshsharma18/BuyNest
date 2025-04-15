import React from "react";
import axios from "axios";

const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {

    axios.post("http://localhost:3000/Stripe/create-checkout-session", { cartItems })
    // axios.post("https://buynest-ecommerce-backend-27.onrender.com/Stripe/create-checkout-session", { cartItems })
      .then((res) => {
        if (res.data?.url) {
          window.location.href = res.data.url; // Redirect to Stripe Checkout
        }
      })
      .catch((err) => console.log(err.message));
  }

  

  return (
    <button className="btn btn-primary" onClick={() => handleCheckout()}>Check Out</button>
  )
}

export default PayButton;