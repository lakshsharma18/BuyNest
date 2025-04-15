import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsGift } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
import { GoGift } from "react-icons/go";
import { FaRegSun } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [AuthUser, setAuthUser] = useAuth();

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        };


        try {
            const res = await axios.post("http://localhost:3000/User/signup", userInfo);
            // const res = await axios.post("https://buynest-ecommerce-backend-27.onrender.com/User/signup", userInfo);
            console.log(res.data);
            if (res.data) {
                toast.success("Signup successful!");
            }


            // storing user details in localstorage
            localStorage.setItem("Users", JSON.stringify(res.data.user));
            setAuthUser(res.data.user);
            navigate('/');
        } catch(error) {
            console.log(error);
            toast.error(error);
        }
    }

    // theme changing
    const [darkmode, setdarkmode] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = darkmode ? 'black' : 'white';
    }, [darkmode]);

    const toggleTheme = () => {
        setdarkmode(!darkmode);
    }

    // modal opening function
    const [isModal, setisModal] = useState(false);

    const modalOpen = () => {
        setisModal(!isModal);
    }

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
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>

            <div className={`my-3 row  ${isSticky && darkmode ? "sticky nav" : "" || isSticky ? 'sticky bg-white' : ''}`}>
                <div className="nav-items d-flex justify-content-between align-items-center">
                    <Link to="/" className='no-underline'>
                        <div className="logo topper">
                            <h3>BuyNest</h3>
                        </div>
                    </Link>

                    <div className="categories topper topper-1" onClick={modalOpen}>
                        <div className={`d-flex ${darkmode ? "text-white" : ""}`}>
                            <RxHamburgerMenu className="hamburg" />
                            <h6 className="mx-1">Categories</h6>
                        </div>
                    </div>
                    {isModal && <div className={`box ${darkmode ? "text-white bg-dark" : " text-white bg-dark"}`}>
                        <div className="content">
                            <ul className='list-unstyled'>
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
                    </div>}

                    <div className="search">
                        <div className="input-group">
                            <input type="text" className="form-control rounded-5 input" placeholder="Search for anything" aria-label="Search" aria-describedby="search-icon" />
                            <div className="icon"><CiSearch /></div>
                        </div>
                    </div>

                    <Link to="/login" className="no-underline text-black">
                        <div className={`${darkmode ? "text-white" : "UserLogin content"} topper topper-1`}>
                            <span>Login</span>
                        </div></Link>
                    <div className="d-flex justify-content-between align-items-center items-2 topper topper-1 same">

                        <div className="flag content">
                            <img src="/img/Flag.jfif" height={15} alt="indian flag" />
                        </div>

                        <div className="theme content" onClick={toggleTheme}>
                            {darkmode ? <FaRegSun className={`${darkmode ? "text-white" : ""}`} />
                                : <FaRegMoon />}

                        </div>

                        <div className="giftIcon content">
                            <BsGift className={`${darkmode ? "text-white" : ""}`} />

                        </div>

                        <div className="kart content">
                            <BsCart className={`${darkmode ? "text-white" : ""}`} />
                        </div>
                    </div>

                </div>
                <div className="content">
                    <div className={`items d-flex items justify-content-center my-2 mb-3  ${darkmode ? "text-white" : ""}`}>
                        <li><span><GoGift /></span> Gift Mode</li>
                        <li>Shop Birthday Gifts</li>
                        <li>Home Favourites</li>
                        <li>Fashion Finds</li>
                        <li>Registry</li>
                    </div>
                </div>
                <hr className={`${darkmode ? "text-white" : ""} line`} />
            </div>
            <div className='container border shadow rounded d-flex flex-md-column justify-content-center align-items-center col-md-4 mt-5'>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <h1 className={`${darkmode ? "text-white" : ""}`} id="exampleModalLabel">Signup</h1>
                        </div>
                        <div className="my-2 d-flex flex-column">
                            <span className={`mx-1 mb-1 ${darkmode ? "text-white" : ""}`}>Fullname</span>
                            <input type="text"
                                className='mx-3'
                                placeholder="enter your name"
                                {...register("fullname", { required: true })} />
                            {errors.email && <span className='red'>This field is required</span>}
                        </div>
                        <div className="my-2 d-flex flex-column">
                            <span className={`mx-1 mb-1 ${darkmode ? "text-white" : ""}`}>Email</span>
                            <input type="email"
                                className='mx-3'
                                placeholder="enter your email"
                                {...register("email", { required: true })} />
                            {errors.email && <span className='red'>This field is required</span>}
                        </div>
                        <div className="my-2 d-flex flex-column">
                            <span className={`mx-1 mb-1 ${darkmode ? "text-white" : ""}`}>Password</span>
                            <input type="password"
                                className='mx-3'
                                placeholder="enter your password"
                                {...register("password", { required: true })} />
                            {errors.password && <span className='red'>This field is required</span>}
                        </div>
                        <div className='d-flex justify-content-center mb-2 my-2'>
                            <button className='btn btn-danger'>Signup</button>
                        </div>
                    </form>
                </div>
                <div className="footer">

                </div>


            </div>
            </>
    )
}

export default Signup