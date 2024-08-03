/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Date from "./Date.jsx";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bgImg from '../assets/reel_bg.jpg';
import bgImg2 from '../assets/p0836dcl.jpg';
import Newsletter from './Newsletter.jsx';
import AuthorSteps from './AuthorSteps.jsx';

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  const latestNews = (posts) => {
    return posts.category === "latest"
  }

  const filterNews = (posts) => {
    return posts.category === "News"
  }

  const filterSports = (posts) => {
    return posts.category === "sports"
  }
  const filterBusiness = (posts) => {
    return posts.category === "business"
  }
  const filterWorld = (posts) => {
    return posts.category === "world"
  }

  return (
    <div className='h-auto w-full flex flex-col mx-auto px-4 my-3'>

      {/* Welcome page section  */}
      <div className="flex items-center justify-between py-3 mt-2">
        <h2 className='border-l-4 rounded-sm border-blue-400 text-lg md:text-xl font-bold px-2'>Welcome to Blog <span className='uppercase font-bold'>Byte</span></h2>

        <p className='hidden md:block text-lg text-gray-500 font-semibold'><Date /></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:place-items-stretch gap-4 text-white">
        <div className='w-full col-span-1 h-full'>

          <Carousel showArrows={true} stopOnHover={true} infiniteLoop={true} interval={2000} autoPlay={true} showThumbs={false}>
            {
              posts.filter(latestNews).map((item) => {
                return (
                  <Link key={item._id} to={`posts/${item.category}/${item._id}`}>
                    <div style={{ backgroundImage: `url(http://localhost:8000/Images/${item.file})` }} className='relative w-full h-[410px] p-2 bg-center bg-no-repeat bg-cover flex flex-col justify-end'>
                      <div className="absolute inset-0" style={{ zIndex: '1' }}>
                        <div className='absolute inset-0 bg-black opacity-30'></div>
                      </div>
                      <p className='px-4 text-start z-10 font-bold text-xl md:text-3xl'>{item.title}</p>
                      <p className='px-4 text-start z-10 md: text-lg font-semibold'>{item.category}</p>
                    </div>
                  </Link>
                )
              })
            }
          </Carousel>
        </div>

        <div className="hidden col-span-1 md:flex flex-wrap gap-2 md:justify-between w-full md:w-auto">
          {
            posts.slice(1, 5).map((item) => {
              return (
                <Link key={item._id} to={`posts/${item.category}/${item._id}`}>
                  <div style={{ backgroundImage: `url(http://localhost:8000/Images/${item.file})` }} className='relative w-full md:w-[310px] h-auto md:h-[200px] p-2 bg-center bg-no-repeat bg-cover flex flex-col justify-end' key={posts.id}>
                    <div className="absolute inset-0" style={{ zIndex: '1' }}>
                      <div className='absolute inset-0 bg-black opacity-30'></div>
                    </div>
                    <p className='z-10 font-bold text-xl md:text-2xl'>{item.title}</p>
                    <p className='z-10 md: text-lg font-semibold'>{item.category}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>

      {/* News heading */}
      <div className="py-3 my-4">
        <h2 className='border-l-4 rounded-sm border-[#FFD230] text-lg md:text-2xl font-bold px-2'>News</h2>
      </div>

      <div className="flex flex-wrap items-center gap-y-4 justify-center md:justify-around gap-2">
        {
          posts.filter(filterNews).slice(0, 3).map((item) => {
            return <Link key={item._id} to={`posts/${item.category}/${item._id}`}>
              <div className="w-[350px] overflow-hidden transition-shadow duration-300 bg-white rounded shadow-gray-200 shadow-lg">
                <img
                  className='h-[250px] w-full object-contain'
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

      {/* Business Heading */}
      <div className="py-3 my-4">
        <h2 className='border-l-4 rounded-sm border-[#FA6400] text-lg md:text-2xl font-bold px-2'>Business</h2>
      </div>
      <div style={{ backgroundImage: `url(${bgImg2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="flex flex-wrap items-center gap-y-4 justify-center md:justify-around gap-2 p-4 rounded">
        {
          posts.filter(filterBusiness).slice(0, 3).map((item) => {
            return <Link key={item._id} to={`posts/${item.category}/${item._id}`}>
              <div className="w-[350px] overflow-hidden transition-shadow duration-300 bg-white rounded shadow-gray-200 shadow-lg">
                <img
                  className='h-[250px] w-full object-cover'
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

      {/* Sports Heading */}
      <div className="py-3 my-4">
        <h2 className='border-l-4 rounded-sm border-[#FF4C98] text-lg md:text-2xl font-bold px-2'>Sports</h2>
      </div>
      <div className="flex flex-wrap items-center gap-y-4 justify-center md:justify-around gap-2">
        {
          posts.filter(filterSports).slice(0, 3).map((item) => {
            return <Link key={item._id} to={`posts/${item.category}/${item._id}`}>
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

      {/* World Heading */}
      <div className="py-3 my-4">
        <h2 className='border-l-4 rounded-sm border-[#149EDC] text-lg md:text-2xl font-bold px-2'>World</h2>
      </div>
      <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="flex flex-wrap items-center gap-y-4 justify-center md:justify-around gap-2 p-4 rounded">
        {
          posts.filter(filterWorld).slice(0, 3).map((item) => {
            return <Link key={item._id} to={`posts/${item.category}/${item._id}`}>
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
      <AuthorSteps />
      <Newsletter />
    </div>
  )
}

export default Home