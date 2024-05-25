import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const Login = () => {
    const navigate = useNavigate();
    const [UserId, setUserId] = useState("");
    const [Password, setPassword] = useState("");
    const [cookies, setCookies, removeCookies] = useCookies(["userName"])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', {
                UserId,
                Password
            }, {
                withCredentials: true
            });

            const id = response.data.user.UserName;

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setCookies("userName", id);

            setTimeout(() => {
                navigate('/userdashboard');
            }, 2000);
        } catch (error) {
            //console.log(error);
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

            <div className="flex justify-center  items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="w-full max-w-md bg-slate-200 shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                                User Id
                            </label>
                            <input
                                id="userId"
                                value={UserId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your User Id"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                                type="submit"
                            >
                                Login
                            </button>
                            <div
                                className="  text-blue-500 font-bold py-2 px-4 rounded focus:outline-none cursor-default focus:shadow-outline "
                            >
                                Don't Have an account  <Link className='text-red-500 cursor-pointer flex justify-end' to='/register'> ?Register</Link>
                            </div>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mt-4">
                        <Link to="/" className='text-blue-600 underline cursor-pointer text-[13px] font-semibold' >go to home page</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
