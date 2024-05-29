/* eslint-disable no-unused-vars */
import { useEffect, createContext, useState } from "react";
import "./styles/App.css";
import axios from "axios";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";

import News from "./components/pages/News.jsx";
import Business from "./components/pages/Business.jsx";
import Sports from "./components/pages/Sports.jsx";
import World from "./components/pages/World.jsx";
import Footer from "./components/Footer.jsx";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound.jsx";
import Users from "./components/admin/Users.jsx";
import Admin from "./components/Admin.jsx";
import Contacts from "./components/admin/Contacts.jsx";
import Create from "./components/admin/Create.jsx";
import CreatePost from "./components/Author/Create.jsx";
import AdmHome from "./components/admin/AdmHome.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import Post from "./components/Post.jsx";
import Author from "./components/Author.jsx";
import YourPosts from "./components/Author/YourPosts.jsx";
import Application from './components/pages/Application.jsx';
import ApplicationForm from './components/admin/Application.jsx';
import UpdatePost from "./components/Author/UpdatePost.jsx";
import UpdatePostAdm from "./components/admin/UpdatePostAdm.jsx";


export const AppContext = createContext();
const API_KEY = import.meta.env.VITE_REACT_APP_API;

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`/auth`)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <AppContext.Provider value={user}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<Home />} />

            <Route path="posts/latest/:id" element={<Post />} />
            <Route path="posts/news/:id" element={<Post />} />
            <Route path="news/:id" element={<Post />} />
            <Route path="posts/sports/:id" element={<Post />} />
            <Route path="sports/:id" element={<Post />} />
            <Route path="posts/business/:id" element={<Post />} />
            <Route path="business/:id" element={<Post />} />
            <Route path="posts/world/:id" element={<Post />} />
            <Route path="world/:id" element={<Post />} />

            <Route path="/news" element={<News />} />
            <Route path="/business" element={<Business />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/world" element={<World />} />
            <Route path="/apply-here" element={<Application />} />

            {/* Admin Route */}
            <Route path="/admin" element={<Admin />}>
              <Route index path="" element={<AdmHome />} />
              <Route path="update-user/:id" element={<UpdateUser />} />
              <Route path="update-post/:id" element={<UpdatePostAdm />} />
              <Route path="users" element={<Users />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="contacts/:id" element={<ApplicationForm />} />
              <Route path="create" element={<Create />} />
            </Route>

            {/* Author Route */}
            <Route path="/author" element={<Author />}>
              <Route path="" element={<YourPosts />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="update-post/:id" element={<UpdatePost />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </AppContext.Provider>
    </div>
  )
}

export default App
