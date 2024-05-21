import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [UserId, setUserId] = useState("");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://video-library-api-eqd9.onrender.com/api/users/register', {
                UserId,
                UserName,
                Email,
                Password,
                Mobile
            });
            toast.success("Registration Successful!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate('/login')
            }, 2000)
            //console.log(api);
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
            //console.log(error);
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

            <div className="flex justify-center bg-gradient-to-r from-blue-500 to-purple-600 items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Register User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="UserId">
                                User Id
                            </label>
                            <input
                                id="UserId"
                                value={UserId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Enter your Id"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="UserName">
                                Username
                            </label>
                            <input
                                id="UserName"
                                value={UserName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                                Email Address
                            </label>
                            <input
                                id="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="mb-3">
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
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Mobile">
                                Mobile
                            </label>
                            <input
                                id="Mobile"
                                value={Mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Enter your mobile number"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register
                            </button>

                            <div
                                className="  text-blue-500 font-bold py-2 px-4 rounded focus:outline-none cursor-default focus:shadow-outline "
                            >
                                Have an account  <Link className='text-red-500 cursor-pointer flex justify-end' to='/login'> ?Login</Link>
                            </div>

                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mt-2">
                        <Link to="/" className='text-blue-600 underline cursor-pointer font-semibold text-[13px]' >go to home page</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
