import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditVideo = () => {
    const [VideoId, setVideoId] = useState('');
    const [Title, setTitle] = useState('');
    const [Url, setUrl] = useState('');
    const [Likes, setLikes] = useState('');
    const [Dislikes, setDislikes] = useState('');
    const [Comments, setComments] = useState('');
    const [Views, setViews] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`https://video-library-api-eqd9.onrender.com/api/video/videos/${params._id}`);
                const video = response.data.video;
                setVideoId(video.VideoId);
                setTitle(video.Title);
                setUrl(video.Url);
                setLikes(video.Likes);
                setDislikes(video.Dislikes);
                setComments(video.Comments);
                setViews(video.Views);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideoData();
    }, [params._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = await axios.put(`https://video-library-api-eqd9.onrender.com/api/video/editvideo/${params._id}`, {
                VideoId,
                Title,
                Url,
                Likes,
                Dislikes,
                Comments,
                Views,
            });
            console.log(api);
            navigate('/admindashboard');
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    return (
        <>
            <div>
                <div className="max-w-md mx-auto px-4 py-8 bg-slate-300 text-black shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Edit Video</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <input
                                value={VideoId}
                                onChange={(e) => setVideoId(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Id"
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Title"
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                value={Url}
                                onChange={(e) => setUrl(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Url"
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                value={Likes}
                                onChange={(e) => setLikes(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Likes"
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                value={Dislikes}
                                onChange={(e) => setDislikes(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Dislikes"
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                value={Comments}
                                onChange={(e) => setComments(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Comments"
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                value={Views}
                                onChange={(e) => setViews(e.target.value)}
                                type="text"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Video Views"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditVideo;
