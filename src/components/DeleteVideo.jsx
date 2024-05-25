import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteVideo = () => {
    const [video, setVideo] = useState(null);
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/video/videos/${params.id}`);
                setVideo(response.data.video);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };
        fetchVideo();
    }, [params.id]);

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/video/deletevideo/${params.id}`);
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate('/admindashboard')
            }, 1500)
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Failed to delete the video');
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

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h3 className="text-2xl font-bold text-center mb-6">Delete Video</h3>
                    {video && (
                        <>
                            <h3 className="text-xl font-semibold mb-4">{video.Title}</h3>
                            <div className="mb-6">
                                <iframe
                                    width="100%"
                                    height="300"
                                    src={video.Url}
                                    title={video.Title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-md"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleDeleteClick}
                                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                >
                                    Delete
                                </button>
                                <Link
                                    to="/admindashboard"
                                    className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </>
                    )}
                    {!video && (
                        <div className="text-center text-gray-500">
                            Loading video details...
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DeleteVideo;
