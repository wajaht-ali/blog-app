/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
// import { MdOutlineClock } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { AuthorContext } from './Author.jsx';
import { AdminContext } from './Admin.jsx';
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const Post = () => {
    const authorId = useContext(AuthorContext);
    const adminId = useContext(AdminContext);
    const [post, setPost] = useState({});
    const [author, setAuthor] = useState([]);
    const [click, setClick] = useState(false);
    const { id } = useParams();

    const fetchCreator = async (userId) => {
        try {
            const res = await axios.get(`${API_KEY}/auth/get-single-user/${userId}`);
            if (res.data.success) {
                setAuthor(res.data.user);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching user ${error}`);
        }
    }
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${API_KEY}/posts/latest/` + id)
            .then((result) => {
                setPost(result.data.post);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    const handleClick = () => {
        setClick(!click);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };
    const formattedDate = formatDate(post.createdAt);
    

    useEffect(() => {
        const userId = post.createdBy;
        fetchCreator(userId);
    }, [id, post])

    const handleLike = async (postId) => {
        try {
            const res = await axios.put(`${API_KEY}/posts/like-post/${postId}`, {authorId});
            if (res.data.success) {
                console.log(res.data.message);
            }
            else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(`Error with liking post ${error}`);
        }
    }
    const handleUnLike = async (postId) => {
        try {
            const res = await axios.put(`${API_KEY}/posts/unlike-post/${postId}`);
            if (res.data.success) {
                console.log(res.data.message);
            }
            else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(`Error with liking post ${error}`);
        }
    }
    return (
        <article className="max-w-2xl px-6 py-24 mx-auto space-y-16 my-3">
            <div className="w-full mx-auto space-y-4">
                <h1 className="text-5xl font-bold leading-none mb-4">{post.title}</h1>

                <div className="flex flex-row items-center justify-evenly">
                <p className="text-sm text-black">by
                    <span className="text-blue-600"> {author.name}</span> on
                    <time dateTime="2021-02-12 15:34:18-0200"> {formattedDate}</time>
                </p>
                <span className="cursor-pointer transition-all delay-100" onClick={handleClick}>{click ? <HiThumbUp size={20} /> :<HiOutlineThumbUp  size={20} />}</span>
                </div>
                <img className='my-4 w-full mt-4' src={`http://localhost:8000/Images/${post.file}`} alt="myImage" />
            </div>
            <div className="">
                <p>{post.desc}</p>
            </div>
        </article>
    )
}

export default Post