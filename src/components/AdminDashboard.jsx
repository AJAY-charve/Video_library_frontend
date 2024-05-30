import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [videos, setVideos] = useState([]);
    const [cookies, setCookies, removeCookies] = useCookies(['adminName']);
    const navigate = useNavigate();

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/video/getvideo');
            setVideos(response.data.videos);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        if (cookies["adminName"]) {
            fetchVideos();
        } else {
            navigate('/adminlogin')
        }
    }, []);

    const logoutClick = async () => {
        try {
            const api = await axios.post('http://localhost:4000/api/users/logout');
            toast.warn(api.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                removeCookies('adminName');
                navigate('/adminlogin');
            }, 1500);
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Logout failed. Please try again.', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <ToastContainer />
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-8 px-4 lg:px-0">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 lg:mb-0">{cookies["adminName"]} - Admin Dashboard</h2>
                    <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                        <Link to='/addvideo'
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Add Video
                        </Link>
                        <button
                            onClick={logoutClick}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                    {videos.map((video) =>
                        <div key={video._id} className=" rounded-lg overflow-hidden bg-base-300 hover:bg-white hover:text-black hover:shadow-purple-500 shadow-2xl">
                            <div className="relative">
                                <iframe
                                    className="w-full h-56"
                                    src={video.Url}
                                    title={video.Title}
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-3">{video.Title}</h3>
                                <div className="flex justify-between">
                                    <Link
                                        to={`/editvideo/${video.VideoId}`}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/deletevideo/${video.VideoId}`}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
