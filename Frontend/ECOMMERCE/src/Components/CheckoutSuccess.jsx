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
import { useSelector } from "react-redux";

const CheckoutSuccess = () => {
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

  // Function to handle scroll event and toggle sticky className
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

  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <>
      {/* navbar */}
      <div
        className={`my-3 row   ${
          isSticky && darkmode
            ? "sticky black"
            : "" || isSticky
            ? "sticky bg-white alligner"
            : ""
        }`}
      >
        <div className="nav-items d-flex justify-content-between align-items-center">
          <Link to="/" className="no-underline">
            <div className="logo LOGO-1">
              <h3>BuyNest</h3>
            </div>
          </Link>

          <div className="categories CHECKOUT" onClick={modalOpen}>
            <div className={`d-flex ${darkmode ? "text-white" : ""}`}>
              <RxHamburgerMenu className="hamburg" />
              <h6 className="mx-1">Categories</h6>
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

          <div className="search CHECKOUT" onClick={handleButtonClick}>
            {/* both if the user clicks on enter or if the user clicks on the icon */}
            <form className="input-group" onSubmit={handleSearch}>
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

          <div className="CHECKOUT">
            {authUser ? (
              <Logout dark={darkmode} />
            ) : (
              <Link to="/login" className="no-underline text-black ">
                <div
                  className={`${darkmode ? "text-white" : "UserLogin content"}`}
                >
                  <span>Login</span>
                </div>
              </Link>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center items-2">
            <div className="flag content CHECKOUT">
              <img src="/img/Flag.jfif" height={15} alt="indian flag" />
            </div>

            <div className="theme content CHECKOUT" onClick={toggleTheme}>
              {darkmode ? (
                <FaRegSun className={`${darkmode ? "text-white" : ""}`} />
              ) : (
                <FaRegMoon />
              )}
            </div>

            <div className="giftIcon content CHECKOUT">
              <BsGift className={`${darkmode ? "text-white" : ""}`} />
            </div>

            <div className="kart content CHECKOUT" onClick={handleButtonClick}>
              <Link to="/cart" className="cart-decoration">
                <BsCart className={`${darkmode ? "text-white" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div
            className={`items d-flex items justify-content-center my-2 mb-3  ${
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
        <hr className={darkmode ? "text-white" : ""} />
      </div>

      <h2
        className={`d-flex justify-content-center checkout ${
          darkmode ? "text-white" : ""
        } `}
      >
        Checkout Success!
      </h2>

      <div className="footer checkfooter">
        <footer className="py-3 border-top">
          <ul className="nav justify-content-center pb-2 mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 ">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 ">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 ">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 ">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 ">
                About
              </a>
            </li>
          </ul>
          <p className="text-center">&copy; 2024 BuyNest, Inc</p>
        </footer>
      </div>
    </>
  );
};

export default CheckoutSuccess;
