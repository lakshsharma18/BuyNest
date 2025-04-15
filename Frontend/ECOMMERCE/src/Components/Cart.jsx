import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotal,
} from "../slices/cartSlice.js";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsGift } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { FaRegSun } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import PayButton from "./PayButton.jsx";

const Cart = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  // theme changing
  const [darkmode, setdarkmode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkmode ? "black" : "white";
  }, [darkmode]);

  const toggleTheme = () => {
    setdarkmode(!darkmode);
  };

  // modal opening function
  const [isModal, setisModal] = useState(false);

  const modalOpen = () => {
    setisModal(!isModal);
  };

  // sticky navbar
  const [isSticky, setSticky] = useState(false);

  // Function to handle scroll event and toggle sticky class
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // event listner is a sideeffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // login
  const [isLogin, setIsLogin] = useState(false);

  const openLogin = () => {
    setIsLogin(true);
  };

  const handleButtonClick = () => {
    if (!authUser) {
      navigate("/signup");
    }
  };

  // targeting search input
  const [searchTerm, setsearchTerm] = useState("");

  // submitting form
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  // adding element to cart
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  // removing element from cart
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  // decreasing element from cart
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  // clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {/* navbar */}
      <div
        className={`my-3 row   ${
          isSticky
            ? darkmode
              ? "sticky black"
              : "sticky bg-white alligner"
            : ""
        }`}
      >
        <div className="nav-items d-flex justify-content-between align-items-center">
          <Link to="/" className="no-underline">
            <div className="logo topper">
              <h3>BuyNest</h3>
            </div>
          </Link>

          <div className="categories topper " onClick={modalOpen}>
            <div className={`d-flex ${darkmode ? "text-white" : ""}`}>
              <RxHamburgerMenu className="hamburg" />
              <span className="mx-1 CATEGORIES">Categories</span>
            </div>
          </div>
          {isModal && (
            <div
              className={`box ${
                darkmode ? "text-white bg-dark" : "text-white bg-dark"
              }`}
            >
              <div className="content">
                <ul className="list-unstyled">
                  <li>Accessories</li>
                  <li>Art & Collectibles</li>
                  <li>Baby</li>
                  <li>Bags & Purses</li>
                  <li>Bath & Beautify</li>
                  <li>Books, Films & Music</li>
                  <li>Clothing</li>
                  <li>Craft Supplies & Tools</li>
                  <li>Electronics & Accessories</li>
                  <li>Gifts</li>
                  <li>Home & Living</li>
                  <li>Jewellery</li>
                  <li>Paper & Party Supplies</li>
                  <li>Pet Supplies</li>
                  <li>Shoes</li>
                  <li>Toys & Games</li>
                  <li>Weddings</li>
                </ul>
              </div>
            </div>
          )}

          <div className="search" onClick={handleButtonClick}>
            {/* both if the user clicks on enter or if the user clicks on the icon */}
            <form className="input-group form" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-5 input"
                  placeholder="Search for anything"
                  aria-label="Search"
                  aria-describedby="search-icon"
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                />
              </div>
              <div className="icon">
                <CiSearch onClick={handleSearch} />
              </div>
            </form>
          </div>

          {authUser ? (
            <Logout dark={darkmode} />
          ) : (
            <Link to="/login" className="no-underline text-black">
              <div
                className={`${
                  darkmode ? "text-white" : "UserLogin content"
                } topper topper-1`}
              >
                <span>Login</span>
              </div>
            </Link>
          )}
          <div className="d-flex justify-content-between align-items-center items-2 topper topper-1 same">
            <div className="flag content">
              <img src="/img/Flag.jfif" height={15} alt="indian flag" />
            </div>

            <div className="theme content" onClick={toggleTheme}>
              {darkmode ? (
                <FaRegSun className={`${darkmode ? "text-white" : ""}`} />
              ) : (
                <FaRegMoon />
              )}
            </div>

            <div className="giftIcon content">
              <BsGift className={`${darkmode ? "text-white" : ""}`} />
            </div>

            <div className="kart content" onClick={handleButtonClick}>
              <Link to="/cart" className="cart-decoration">
                <BsCart className={`${darkmode ? "text-white" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div
            className={`items d-flex justify-content-center my-2 mb-3  ${
              darkmode ? "text-white" : ""
            }`}
          >
            <li>
              <span>
                <GoGift />
              </span>{" "}
              Gift Mode
            </li>
            <li>Shop Birthday Gifts</li>
            <li>Home Favourites</li>
            <li>Fashion Finds</li>
            <li>Registry</li>
          </div>
        </div>
        <hr className={`${darkmode ? "text-white" : ""} line`} />
      </div>

      <div className={`cart-container ${darkmode ? "text-white" : ""}`}>
        <h2 className="">Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className={`cart-empty ${darkmode ? "text-white" : ""}`}>
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/" className="no-underline">
                <span className={darkmode ? "text-white" : ""}>
                  <FaArrowLeft /> Start Shopping
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            {darkmode ? <div className=" border borderWhite"></div> : ""}
            <div className="cart-items">
              {cart.cartItems?.map((cartItem, index) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img
                      src={cartItem.urls.regular}
                      height={120}
                      width={120}
                      alt={cartItem.alt_description}
                    />
                    <div>
                      <p>{cartItem.alt_description}</p>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${800}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${800 * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
            </div>
            {darkmode ? <div className=" border borderWhite"></div> : ""}
            <div className="cart-summary">
              <button
                className="clear-cart btn btn-danger"
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </button>
              <div className="card-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <PayButton cartItems={cart.cartItems} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
