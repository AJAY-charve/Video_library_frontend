import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const [cookies, setCookies, removeCookies] = useCookies(["userName"])
    const navigate = useNavigate()

    const logoutClick = () => {
        toast.warn("Logout Successfully", {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(() => {
            navigate('/')
            removeCookies("userName")
            window.location.reload()
        }, 1200)
    }



    return (
        <>
            <div className="navbar bg-gray-100 p-4 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                            <li>
                                <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Home</Link>
                            </li>
                            <li>
                                {
                                    cookies["userName"] === undefined ?
                                        <Link to="/login" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Login</Link> :
                                        <Link onClick={logoutClick} className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Logout</Link>
                                }

                            </li>
                            <li>
                                <Link to="/adminlogin" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Admin Login</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className="text-3xl font-bold text-red-600 hover:text-red-800 cursor-pointer rounded-2xl px-3 py-2">Video Library</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {/* Add more navigation items here if needed */}
                </div>
                <div className="navbar-end hidden lg:flex space-x-4">
                    {
                        cookies["userName"] === undefined ?
                            <Link to="/login" className="block bg-blue-500 py-2 rounded-md px-4 text-white hover:bg-blue-600">Login</Link> :
                            <Link onClick={logoutClick} className="block bg-red-500 py-2 rounded-md px-4 text-white hover:bg-red-600">Logout</Link>
                    }
                    <Link to='/adminlogin' className='btn bg-purple-500 text-white hover:bg-purple-700'>Admin Login</Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;
