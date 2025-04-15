import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsGift } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaRegSun } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
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

      {/* section-1 */}
      <div div className="trend-section">
        <div className="trends">
          <h3 className={`text-center ${darkmode ? "text-white" : ""}`}>
            Check out the season's biggest trends
          </h3>
        </div>

        <div
          className={`trendContainer text-center d-flex justify-content-between align-items-center w-75 mx-auto ${
            darkmode ? "text-white" : ""
          }`}
        >
          <div
            className="vintage-charm trend d-flex flex-column justify-content-center"
            onClick={handleButtonClick}
          >
            <Link to="/vintage">
              <div className="imgcontainer">
                <img
                  src="/img/vintage.jfif"
                  className={`${darkmode ? "borderWhite" : ""}`}
                  height={120}
                  width={120}
                  alt="vintage charm"
                />
              </div>
            </Link>
            <p>Vintage</p>
            <p className="child">Charms</p>
          </div>

          <div
            className="marble-furnishings trend d-flex flex-column justify-content-center"
            onClick={handleButtonClick}
          >
            <Link to="/marble">
              <div className="imgcontainer">
                <img
                  src="/img/Marble.jfif"
                  className={`${darkmode ? "borderWhite" : ""}`}
                  height={120}
                  width={120}
                  alt="marble"
                />
              </div>
            </Link>
            <p>Marble</p>
            <p className="child">Furnishings</p>
          </div>

          <div
            className="maximalist-decor trend d-flex flex-column justify-content-center"
            onClick={handleButtonClick}
          >
            <Link to="/maximalist">
              <div className="imgcontainer">
                <img
                  src="/img/maximalist.jfif"
                  className={`${darkmode ? "borderWhite" : ""}`}
                  height={120}
                  width={120}
                  alt="maximalist-decor"
                />
              </div>
            </Link>
            <p>Maximalist</p>
            <p className="child">Decor</p>
          </div>

          <div
            className="kids-jumpers trend d-flex flex-column justify-content-center"
            onClick={handleButtonClick}
          >
            <Link to="/jumpers">
              <div className="imgcontainer">
                <img
                  src="/img/branded.jfif"
                  className={`${darkmode ? "borderWhite" : ""}`}
                  height={120}
                  width={120}
                  alt="jumpers"
                />
              </div>
            </Link>
            <p>Branded</p>
            <p className="child">Outfits</p>
          </div>

          <div
            className="statement-Halls-Art trend d-flex flex-column justify-content-center"
            onClick={handleButtonClick}
          >
            <Link to="/arts">
              <div className="imgcontainer">
                <img
                  src="/img/art.jfif"
                  className={`${darkmode ? "borderWhite" : ""}`}
                  height={120}
                  width={120}
                  alt="halls-art"
                />
              </div>
            </Link>
            <p>Statement</p>
            <p className="child">Halls Art</p>
          </div>

          <div
            className="best-friend-gifts trend d-flex flex-column justify-content-center"
            onClick={handleButtonClick}
          >
            <Link to="/gifts">
              <div className="imgcontainer">
                <img
                  src="/img/friend.jfif"
                  className={`${darkmode ? "borderWhite" : ""}`}
                  height={120}
                  width={120}
                  alt="friend-gifts"
                />
              </div>
            </Link>
            <p>Best Friend</p>
            <p className="child">Gifts</p>
          </div>
        </div>
      </div>

      {/* section-2 */}
      <div
        div
        className={`Categories card-item mt-5 ${darkmode ? "text-white" : ""}`}
      >
        <h3 className="mb-3">Shop our popular gift categories</h3>
        <div className="Cards d-flex g-2 gift-cards">
          <div className="Card gift-card">
            <div className="card-img">
              <img
                src="/img/anniversary.jfif"
                height={200}
                width={255}
                alt=""
              />
            </div>
            <div className="card-title pt-3 pb-3">
              <h5>Anniversary Gifts</h5>
            </div>
          </div>

          <div className="Card gift-card">
            <div className="card-img">
              <img src="/img/himgift.jfif" height={200} width={255} alt="" />
            </div>
            <div className="card-title pt-3 pb-3">
              <h5>Gifts for him</h5>
            </div>
          </div>

          <div className="Card gift-card">
            <div className="card-img">
              <img src="/img/hergift.jfif" height={200} width={255} alt="" />
            </div>
            <div className="card-title pt-3 pb-3">
              <h5>Gifts for her</h5>
            </div>
          </div>

          <div className="Card gift-card">
            <div className="card-img">
              <img
                src="/img/personalised.jfif"
                height={200}
                width={255}
                alt=""
              />
            </div>
            <div className="card-title pt-3 pb-3">
              <h5>Personalised Gifts</h5>
            </div>
          </div>

          <div className="Card gift-card">
            <div className="card-img">
              <img src="/img/wedding.jfif" height={200} width={255} alt="" />
            </div>
            <div className="card-title pt-3 pb-3">
              <h5>Wedding Gifts</h5>
            </div>
          </div>
        </div>

        {/* section-3 */}
        <div className="blog-Container mt-5">
          <h3 className="mb-3">Fresh from the blog</h3>
          <div className="blogs d-flex blog-cards">
            <div className="blog">
              <div className="blog-img">
                <img src="/img/comfy.jfif" height={350} width={420} alt="" />
              </div>
              <div className="card-body pt-3 pb-3 d-flex flex-column align-items-start">
                <span className="mx-3 mb-3">Shopping Guides</span>
                <h5 className="mx-3 mb-3">
                  9 Comfy Throws for Cosy Autumn Vibes
                </h5>
                <span className="mx-3">
                  Embrace the snuggling season with stylish throws
                </span>
                <p className="">that will warm your hearts.</p>
              </div>
            </div>

            <div className="blog">
              <div className="blog-img">
                <img src="/img/style.jfif" height={350} width={420} alt="" />
              </div>
              <div className="card-body pt-3 pb-3 d-flex flex-column align-items-start">
                <span className="mx-3 mb-3">Shopping Guides</span>
                <h5 className="mx-3 mb-3">
                  Beautiful Bags That Express Your Style
                </h5>
                <span className="mx-3">
                  Amp up your fashion game with bags that perfectly
                </span>
                <p className="">match your aesthetic.</p>
              </div>
            </div>

            <div className="blog">
              <div className="blog-img">
                <img src="/img/jumper.jfif" height={350} width={420} alt="" />
              </div>
              <div className="card-body pt-3 pb-3 d-flex flex-column align-items-start">
                <span className="mx-3 mb-3">Gift Ideas</span>
                <h5 className="mx-3 mb-3">
                  The Best Gift Ideas for Kids of All Ages
                </h5>
                <span className="mx-3">
                  Shop the sweetest surprises for little
                </span>
                <p className="">ones in your family.</p>
              </div>
            </div>
          </div>
        </div>

        {/* section-4 */}
        <div>
          <div className="brandContainer mt-5 ">
            <h3 className="mb-3">Featured Brands</h3>
            <div
              id="carouselExampleRide"
              className="carousel slide"
              data-bs-ride="true"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className={`d-flex ${darkmode ? "text-dark" : ""}`}>
                    <div className="brand me-3">
                      <div className="brand-img">
                        <img
                          src="/img/apple.jfif"
                          height={220}
                          width={450}
                          alt=""
                        />
                      </div>
                      <div className="brand-title pt-2 d-flex justify-content-between mx-2">
                        <h5>From $300</h5>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </div>
                    <div className="brand me-3">
                      <div className="brand-img">
                        <img
                          src="/img/airpods.jfif"
                          height={220}
                          width={450}
                          alt=""
                        />
                      </div>
                      <div className="brand-title pt-2 d-flex justify-content-between mx-2">
                        <h5>From $200</h5>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </div>
                    <div className="brand me-3">
                      <div className="brand-img">
                        <img
                          src="/img/Nike.jfif"
                          height={220}
                          width={450}
                          alt=""
                        />
                      </div>
                      <div className="brand-title pt-2 d-flex justify-content-between mx-2">
                        <h5>Upto 40% off</h5>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`carousel-item ${darkmode ? "text-dark" : ""}`}>
                  <div className="d-flex">
                    <div className="brand me-3">
                      <div className="brand-img">
                        <img
                          src="/img/pampers.jfif"
                          height={220}
                          width={450}
                          alt=""
                        />
                      </div>
                      <div className="brand-title pt-2 d-flex justify-content-between mx-2">
                        <h5>Upto 60% off</h5>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </div>
                    <div className="brand me-3">
                      <div className="brand-img">
                        <img
                          src="/img/Backpack.jfif"
                          height={220}
                          width={450}
                          alt=""
                        />
                      </div>
                      <div className="brand-title pt-2 d-flex justify-content-between mx-2">
                        <h5>From $300</h5>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </div>
                    <div className="brand me-3">
                      <div className="brand-img">
                        <img src="/img/deo.jfif" height={220} alt="" />
                      </div>
                      <div className="brand-title pt-2 d-flex justify-content-between mx-2">
                        <h5>From $300</h5>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
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

export default Navbar;
