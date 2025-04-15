import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsGift } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { FaRegSun } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice.js";

const Vintage = () => {
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

  // Unsplash api
  const [Vintages, setVintages] = useState([]);

  // function to fetch results from api
  const fetchUnsplashImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=lockets&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}&per_page=16`
      );
      const data = await response.json();
      setVintages(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // only hit once the api when component mounts
  useEffect(() => {
    fetchUnsplashImages();
  }, []);

  const dispatch = useDispatch();
  const handleAddToCart = (image) => {
    dispatch(addToCart(image));
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

      <div
        className={`first-image d-flex card-item ${
          darkmode ? "text-white" : ""
        }`}
      >
        <img
          src="/img/vintage.jfif"
          className="rounded"
          height={220}
          width={350}
          alt=""
        />
        <div className="first-content">
          <span className="mt-3">RosinessDesigns(1,290)</span>
          <h3>
            Early Vintage Gold filled Padlock Clasp - 1930s Vintage Jewelry
          </h3>
          <h5 className="mb-2">$800</h5>
          <div
            className={`btn btn-secondary rounded-5 py-3 mt-3 px-3 ${
              darkmode ? "text-white border" : ""
            }`}
          >
            Shop this item
          </div>
        </div>
      </div>
      <hr className={darkmode ? "text-white" : ""} />
      <div className="vintage-container mt-5 d-flex justify-content-center dynamic-cards">
        {Vintages.map((image) => (
          <div
            className={`Card m-2 ${darkmode ? "text-white" : ""}`}
            key={image.id}
          >
            <div className="card-img">
              <img
                src={image.urls.regular}
                height={200}
                width={300}
                alt={image.alt_description}
              />
            </div>
            <div className="card-title pt-1 pb-3 mx-1 d-flex flex-column align-items-start">
              <h6 className="short-title ">{image.slug}</h6>
              <span
                className={`d-flex align-items-center child2 ${
                  darkmode ? "text-white" : ""
                }`}
              >
                4.9 <IoMdStar />
                (259) Ad by BuyNest seller
              </span>
              <h5 className="mb-2 mt-2">$800</h5>
              <div className="d-flex justify-content-between align-items-center gapper">
                <div
                  className={`btn btn-secondary rounded-5 button mx-1 ${
                    darkmode ? "text-white border" : ""
                  }`}
                >
                  Add to Cart
                </div>
                <div
                  className={`${
                    darkmode ? "text-white circle-white" : "circle"
                  } kart-icon`}
                  onClick={() => handleAddToCart(image)}
                >
                  <BsCart />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <footer className="py-3 mt-4 border-top">
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

export default Vintage;
