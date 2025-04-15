import React from 'react'
import { useAuth } from './context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Logout = ({ dark }) => {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                user: null
            });
            toast.success("Logged Out successfully!");
            navigate("/");
            setTimeout(() => {
                localStorage.removeItem("Users");
                window.location.reload();


            }, 2000);

        } catch (error) {
            toast.error("Couldn't log out!");
        }
    }
    return (
        <button className={`btn mx-2 ${dark ? "text-white" : "logout"}`} onClick={handleLogout}  >Logout</button>
    )

}

export default Logout;