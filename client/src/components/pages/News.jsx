/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${API_KEY}/posts/getAllNews`)
      .then((result) => {
        // console.log(result);
        setPosts(result.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const filterNews = (posts) => {
    return posts.category === "News"
  }

  return (
    <div className='h-auto w-full flex flex-col mx-auto px-4 my-3'>
      <div className="py-3">
        <h2 className='border-l-4 rounded-sm border-[#FFD230] text-lg md:text-xl font-bold px-2'>News</h2>
      </div>
      <div className="flex flex-wrap items-center gap-y-4 justify-center md:justify-evenly gap-2 overflow-y-auto">
        {
          posts.filter(filterNews).map((item) => {
            return <Link key={item._id} to={`/${item.category}/${item._id}`}>
              <div className="w-[350px] overflow-hidden transition-shadow duration-300 bg-white rounded shadow-gray-200 shadow-lg">
                <img
                  className='h-[250px] w-full'
                  src={`http://localhost:8000/Images/${item.file}`}
                  alt="myImage"
                />
                <div className="p-5 border border-t-0">
                  <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                    <p

                      className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                      aria-label="Category"
                      title="traveling"
                    >
                      {item.category}
                    </p>
                    <span className="text-gray-600">— {item.createdAt}</span>
                  </p>
                  <p
                    aria-label="Category"
                    title="Visit the East"
                    className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700 w-full">
                    {item.title}
                  </p>
                  <p className="mb-2 text-gray-700">
                    {item.desc.slice(0, 30)}
                  </p>
                  <p
                    aria-label=""
                    className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    Learn more
                  </p>
                </div>
              </div>
            </Link>
          })
        }
      </div>
    </div>
  )
}

export default News