import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsGift } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { FaRegSun } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/User/login",
        // "https://buynest-ecommerce-backend-27.onrender.com/User/login",
        userInfo
      );
      console.log(res.data);
      if (res.data) {
        toast.success("Login successfull");
        setTimeout(() => {
          window.location.reload();
          // setting up to localstorage in order to protect "add"
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 2000);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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

  return (
    <>
      <div
        className={`my-3 row  ${
          isSticky && darkmode
            ? "sticky nav"
            : "" || isSticky
            ? "sticky bg-white"
            : ""
        }`}
      >
        <div className="LOGO-2">
          <Link to="/" className="no-underline ">
            <div className="logo">
              <h3>BuyNest</h3>
            </div>
          </Link>
        </div>

        <hr className={`${darkmode ? "text-white" : ""} line`} />
      </div>
      <div className="container border shadow rounded d-flex flex-column justify-content-center align-items-center col-md-4 mt-5 login">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${darkmode ? "text-white" : ""}`}>
              <h1 className="mb-3 login1" id="exampleModalLabel">
                Login
              </h1>
            </div>
            <div
              className={`mb-2 ${
                darkmode ? "text-white" : ""
              }  d-flex flex-column`}
            >
              <span className="mx-1 mb-1 email">Email</span>
              <input
                type="email"
                className="mx-3"
                placeholder="enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="red">This field is required</span>
              )}
            </div>
            <div
              className={`mb-2 ${
                darkmode ? "text-white" : ""
              }  d-flex flex-column`}
            >
              <span className="mx-1 mb-1 password">Password</span>
              <input
                type="password"
                className="mx-3"
                placeholder="enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="red">This field is required</span>
              )}
            </div>
            <div
              className={`d-flex justify-content-center mb-2 ${
                darkmode ? "text-white" : ""
              }`}
            >
              <button className="btn btn-danger">Login</button>
            </div>

            <div className="d-flex justify-content-between">
              <h6 className={`${darkmode ? "text-white" : ""}`}>
                Create new account?
              </h6>
              <h6>
                {" "}
                <Link to="/signup">Signup</Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
