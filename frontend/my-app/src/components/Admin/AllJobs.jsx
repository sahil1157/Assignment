import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Add from './Add';
import Edit from './Edit';
import AdminUi from './AdminUi';

const AllJobs = () => {
    const nav = useNavigate()
    const location = useLocation()

    return (
        <div className='flex flex-col gap-3 mt-10 text-black'>
            <div className='w-full px-6 h-10 border-gray-500 text-center items-center justify-between flex'>
                <p className='text-2xl font-Ubuntu font-medium'>{
                    location.pathname === "/admin/create" ? "Add Job" : "Admin Panel"
                }</p>
                <div className='flex flex-row gap-2'>
                    {
                        location.pathname === "/admin/create" ? (
                            <button onClick={() => nav("/admin")} className='w-24 h-10 rounded-md bg-blue-500 text-white'>Back</button>
                        )
                            : (
                                <button onClick={() => nav("/career")} className={`${location.pathname === "/admin/create" && "hidden"} w-24 h-10 rounded-md bg-blue-500 text-white`}>Back</button>

                            )
                    }
                    <button onClick={() => nav("/admin/create")} className={`${location.pathname === "/admin/create" && "hidden"} w-24 h-10 rounded-md bg-red-500 text-white`}>Create + </button>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<AdminUi />} />
                <Route path="/create" element={<Add />} />
                {/* <Route path="/edit" element={<Edit />} /> */}
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </div>
    )
}

export default AllJobs
