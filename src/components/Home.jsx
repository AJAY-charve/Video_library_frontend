import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    const handleEmailclick = () => {
        navigate('/login')
    }

    return (
        <>
            <Navbar />
            <div className="min-h-[85vh]  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
                    <div className="flex items-center justify-center mb-4">
                        <label className="block text-gray-800 text-2xl font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                    </div>
                    <div className="flex">
                        <input
                            className="shadow appearance-none border rounded-l-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                            type="email"
                            placeholder="Enter your email address"
                        />
                        <button onClick={handleEmailclick} className="bg-red-600 text-white rounded-r-lg text-xl py-2 px-4 hover:bg-red-500 transition duration-200">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
