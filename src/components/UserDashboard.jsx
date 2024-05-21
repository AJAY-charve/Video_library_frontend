import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addToLibrary } from '../redux/video-slicer';
import store from '../redux/store';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {

    const [cookies, setCookies, removeCookies] = useCookies("userName")
    const [videos, setVideos] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const select = useSelector((state) => state.store.videosCount)

    const VideoLoad = async () => {
        const api = await axios.get(`https://video-library-api-eqd9.onrender.com/api/video/getvideo`)
        setVideos(api.data.videos)
    }

    useEffect(() => {
        if (cookies['userName']) {
            VideoLoad()
        } else {
            navigate('/')
        }

    }, [select])

    const handleSaveClick = (video) => {
        toast.success("Video Added to Your Library", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch(addToLibrary(video))
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

            <div className='bg-slate-200 h-[100%]'>
                <Navbar />
                <h1 className='text-2xl font-semibold ml-5 m-3 flex justify-center items-center'>
                    {cookies["userName"]} - Dashboard
                    <button className="btn relative ml-3 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => document.getElementById('my_modal_5').showModal()}>
                        Your Library
                        <div className="badge badge-secondary ml-2">{select}</div>
                    </button>
                </h1>

                <dialog id="my_modal_5" className="modal modal-bottom lg:modal-middle sm:modal-middle">
                    <div className="modal-box p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Your Saved Videos</h3>
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                            </form>
                        </div>
                        <div className="mt-4">
                            {
                                store.getState().store.MyVideoLibrary.map((video, index) => (
                                    <div key={index} className='my-4'>
                                        <div className='flex justify-center'>
                                            <iframe
                                                className="w-[70%] max-w-lg h-60 rounded-lg shadow-2xl"
                                                src={video.Url}
                                            ></iframe>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </dialog>




                <div className="lg:flex md:flex  mt-5 items-center justify-center flex-wrap">
                    {
                        videos.map((video) =>
                            <div >
                                <div className="card m-2 p-2 max-w-xs bg-base-300 hover:bg-white hover:text-black hover:shadow-pink-400 shadow-2xl">
                                    <figure className="w-full h-48">
                                        <iframe src={video.Url} className="w-full h-full  hover:bg-slate-200" alt="videos" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-lg font-bold mb-2">
                                            {video.Title}
                                            <div className="badge badge-secondary flex items-center justify-center p-3">
                                                <button onClick={() => handleSaveClick(video)}>Save</button>
                                            </div>
                                        </h2>
                                        <p className="text-sm text-gray-600 mb-4"> Comments : {video.Comments}</p>
                                        <div className="card-actions flex justify-between items-center">
                                            <div className="flex">
                                                <div className=" outline-none  mr-2"> Likes : {video.Likes}</div>
                                                <div className="outline-none "> Dislikes :{video.Dislikes}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        )
                    }
                </div>



            </div>
        </>
    )
}

export default UserDashboard