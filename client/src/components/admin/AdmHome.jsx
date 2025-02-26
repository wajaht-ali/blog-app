/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const AdmHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_KEY}/posts/getAllNews`)
      .then((res) => {
        console.log("adm posts: ", res);
        setPosts(res.data.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  
  const handleDeletePost = (id) => {
    axios.defaults.withCredentials = true;
    axios.delete(`${API_KEY}/posts/deletePostById/` + id)
      .then((res) => {
        console.log(res);
        if (res.data === "Deleted") {
          window.location.href = "/admin";
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='h-screen md:h-auto bg-white text-black w-full flex flex-col items-center'>
      <div className="p-4 w-full border-2 border-black flex flex-row flex-wrap justify-center md:justify-around gap-4 overflow-y-scroll">
        {
          posts.map(item => {
            return (
              <div key={item._id} className="w-full md:w-[400px] text-start">
                <Link to={`/posts/${item.category}/${item._id}`} >
                  {/* <div className="border-2 border-black">
                    <img className="h-[180px] w-[200px]" src={`http://localhost:8000/Images/${item.file}`} alt="" />
                    <p>{item.title}</p>
                    <p>{item.category}</p>
                  </div> */}
                  <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-gray-200 shadow-lg">
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
                        className="inline-block mb-3 text-xl text-wrap md:text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                      >
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
                <div>
                  <div className='mt-4'>
                    <button onClick={() => handleDeletePost(item._id)} className="bg-red-600 p-2 rounded text-white mx-2">Delete</button>
                    <Link className="bg-green-500 p-2 rounded text-white px-4 mx-2" to={`/admin/update-post/${item._id}`}>Edit</Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AdmHome