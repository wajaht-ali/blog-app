/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import logo from "../assets/logoImg1.png";

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    axios.post(`${API_KEY}/auth/registerUser`, { name, email, password })
      .then((response) => {
        console.log(response);
        if (response.data === "Success") {
          navigate("/login");
        }
        else {
          alert(`${response.data}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className='h-screen w-full text-black mx-auto flex items-center justify-center'>
      <div className=' rounded-md mx-auto border-2 border-white p-4 shadow-md shadow-gray-300'>

        <div className="flex flex-col items-center">
          <img width={"100px"} height={"100px"} src={logo} alt="imgLogo" />
          <h2 className='font-bold text-center text-black text-2xl mb-4'>Register your account here.</h2>
        </div>

        <form className='w-[300px]' onSubmit={handleSubmit}>
          <div className='flex flex-col my-2'>
            <label className='my-2 font-semibold' htmlFor="name">Name:</label>
            <input className='w-[300px] md:w-full border border-gray-400 px-2 py-1 rounded-md outline-none text-black' type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
          </div>

          <div className='flex flex-col my-2'>
            <label className='my-2 font-semibold' htmlFor="email">Email:</label>
            <input className='w-[300px] md:w-full border border-gray-400 px-2 py-1 rounded-md outline-none text-black' type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='flex flex-col my-2'>
            <label className='my-2 font-semibold' htmlFor="password">Passowrd:</label>
            <input className='w-[300px] md:w-full border border-gray-400 px-2 py-1 rounded-md outline-none text-black' type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button onClick={handleSubmit} className="w-[300px] md:w-full bg-gray-800 text-white px-3 py-2 rounded-lg my-4 font-bold ">Register</button>
        </form>
        <div className='my-3 text-black flex flex-row items-center justify-center'>
          <p className='mx-2'>Dont&apos;t have an account! </p>
          <Link className=" text-blue-600 mx-2 font-semibold" to={"/login"}>Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register