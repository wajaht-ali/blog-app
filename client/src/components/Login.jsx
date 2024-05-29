/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logoImg1.png";

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post(`${API_KEY}/auth/loginUser`, { email, password })
            .then((res) => {
                // console.log(res);
                if (res.data.status === true) {
                    if (res.data.role === 'admin') {
                        window.location.href = "/admin";
                    }
                    else if (res.data.role === 'author') {
                        window.location.href = "/author";
                    }
                    else if (res.data.role === 'visitor') {
                        window.location.href = "/";
                    }
                    else {
                        Window.location.href = "/";
                    }
                }
                else {
                    alert(`${res.data}`);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className='h-screen w-full mx-auto flex items-center justify-center rounded-md'>
            <div className='max-w-[90%] rounded-md mx-auto shadow-md shadow-gray-300 p-4'>
                <div className="flex flex-col items-center">
                    <img width={"100px"} height={"100px"} src={logo} alt="imgLogo" />
                    <h2 className='font-bold text-center text-black text-2xl mb-4'>Sign in to your account</h2>
                </div>
                <form className='w-[300px]' onSubmit={handleSubmit}>

                    <div className='flex flex-col'>
                        <label className='my-2 text-black font-semibold' htmlFor="email">Email:</label>
                        <input className='w-[300px] md:w-full border border-gray-400 px-2 py-1 rounded-md outline-none text-black' type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='my-2 text-black font-semibold' htmlFor="password">Passowrd:</label>
                        <input className='w-[300px] md:w-full border border-gray-400 px-2 py-1 rounded-md outline-none text-black' type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onSubmit={handleSubmit} className="w-[300px] md:w-full bg-gray-800 text-white px-3 py-2 rounded-lg mt-4 font-bold">Login</button>
                </form>
                <div className='my-3 text-black flex flex-row items-center justify-center'>
                    <p className='mx-2'>Dont&apos;t have an account! </p>
                    <Link className=" text-blue-600 mx-2 font-semibold" to={"/register"}>Create One</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;