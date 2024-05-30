import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [cookies, setCookies, removeCookies] = useCookies(["adminName", "userName"]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = await axios.post(`http://localhost:4000/api/admin/login`, {
                UserName,
                Password
            })
            const adminname = api.data.admin.UserName;
            toast.success(api.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setCookies("adminName", adminname);
            removeCookies("userName")
            setTimeout(() => {
                navigate('/admindashboard');
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="flex justify-center items-center min-h-screen  bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 ">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="UserName">
                                User Name
                            </label>
                            <input
                                id="UserName"
                                value={UserName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Enter your UserName"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
                                Password
                            </label>
                            <input
                                id="Password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                                type="submit"
                            >
                                Login
                            </button>
                            <Link to="/" className='text-blue-600 underline cursor-pointer' >go to home page</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
