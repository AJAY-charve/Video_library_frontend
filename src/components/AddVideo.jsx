import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const AddVideo = () => {

    const [VideoId, setVideoId] = useState()
    const [Title, setTitle] = useState()
    const [Url, setUrl] = useState()
    const [Likes, setLikes] = useState()
    const [Dislikes, setDislikes] = useState()
    const [Comments, setComments] = useState()
    const [Views, setViews] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const api = await axios.post(`http://localhost:4000/api/video/addvideo`, {
            VideoId,
            Title,
            Url,
            Likes,
            Dislikes,
            Comments,
            Views
        })
        toast.success(api.data.message, {
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
    }


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
            <div>

                <div className="max-w-md mx-auto px-4 py-8 bg-slate-300 text-black shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Add Video</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <input value={VideoId} onChange={(e) => setVideoId(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Id" />
                        </div>
                        <div className='mb-4'>
                            <input value={Title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Title" />
                        </div>
                        <div className='mb-4'>
                            <input value={Url} onChange={(e) => setUrl(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Url" />
                        </div>
                        <div className='mb-4'>
                            <input value={Likes} onChange={(e) => setLikes(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Likes" />
                        </div>
                        <div className='mb-4'>
                            <input value={Dislikes} onChange={(e) => setDislikes(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Dislikes" />
                        </div>
                        <div className='mb-4'>
                            <input value={Comments} onChange={(e) => setComments(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Comments" />
                        </div>
                        <div className='mb-4'>
                            <input value={Views} onChange={(e) => setViews(e.target.value)} type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter Video Views" />
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
                            <Link to="/admindashboard" className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600">Cancel</Link>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AddVideo