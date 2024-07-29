/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
// import { MdOutlineClock } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { AuthorContext } from './Author.jsx';
import { AdminContext } from './Admin.jsx';

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const Post = () => {
    const authorId = useContext(AuthorContext);
    const adminId = useContext(AdminContext);
    const [post, setPost] = useState([]);
    const [author, setAuthor] = useState([]);

    const { id } = useParams();

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

    const fetchCreator = async (userId) => {
        try {
            const res = await axios.get(`${API_KEY}/auth/get-single-user/${userId}`);
            if(res.data.success) {
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
        fetchCreator(post.createdBy);
    }, [])
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
      };
    const formattedDate = formatDate(post.createdAt);

    return (
        <article className="max-w-2xl px-6 py-24 mx-auto space-y-16 my-3">
            <div className="w-full mx-auto space-y-4">
                <h1 className="text-5xl font-bold leading-none">{post.title}</h1>

                <p className="text-sm text-black">by 
                <span className="text-blue-600"> {author.name}</span> on 
                    <time dateTime="2021-02-12 15:34:18-0200"> {formattedDate}</time>
                </p>
                <img className='my-4 w-full' src={`http://localhost:8000/Images/${post.file}`} alt="myImage" />
            </div>
            <div className="">
                <p>{post.desc}</p>
            </div>
        </article>
    )
}

export default Post