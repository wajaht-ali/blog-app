/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_REACT_APP_API;

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API_KEY}/admin/getAllUsers`, { withCredentials: true })
            .then((res) => {
                // console.log(res);
                setUsers(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleDelete = (id) => {
        axios.delete(`${API_KEY}/admin/deleteUser/` + id)
            .then((res) => {
                window.location.reload();
                // if(res.data === "Success") {
                //     // navigate(0);
                // }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='h-screen bg-blue-600 border-2 text-black w-full py-3 px-2 md:px-8 flex flex-col items-center justify-center text-center'>
            <div className='bg-white h-full w-full rounded-md'>
                <div className="p-3 head shadow-md shadow-gray-400">
                    <h2 className='text-xl font-bold'>Total Users</h2>
                    <p>All users who are registered with the <span className='uppercase font-semibold'>news</span>.</p>
                </div>

                <div className='md:px-4 py-2 w-full text-[14px] md:text-base overflow-y-scroll'>
                    <table className="table w-full">
                        <thead>
                            <tr className='bg-gray-400 text-white'>
                                <th className="py-2 md:px-4">Sr #</th>
                                <th className="py-2 md:px-4">Name</th>
                                <th className="py-2 md:px-4">Email</th>
                                <th className="py-2 md:px-4">Role</th>
                                <th className="py-2 md:px-4">Edit</th>
                                <th className="py-2 md:px-4">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr key={item._id} className='bg-blue-100 text-center border-b-2 border-white'>
                                    <td className="py-2 md:px-4">{index + 1}</td>
                                    <td className="py-2 md:px-4">{item.name}</td>
                                    <td className="py-2 md:px-4">{item.email}</td>
                                    <td className="py-2 md:px-4">{item.role}</td>

                                    <td className="py-2 md:px-4"><Link className="bg-green-500 text-white py-1 px-2 rounded" to={`/admin/update-user/${item._id}`}>Edit</Link></td>

                                    <td className="py-2 md:px-4"><Link className="bg-red-500 text-white py-1 px-2 rounded" onClick={(e) => handleDelete(item._id)}>Delete</Link></td>
                                </tr>
                            ))}
                            <Outlet />
                        </tbody>
                    </table>
                    {/* <Table /> */}
                </div>
            </div>
        </div >
    )
}

export default Users