import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './IndexHome'
import Blogs from './IndexBlogs'
import Career from './IndexCareer'
import Programs from './IndexProgram'
import Navbar from './Navbar'
import Details from '../components/Career/Details'
import IndexAdmin from './IndexAdmin'
import PageNotFound from './pageNotFound'

const Routing = () => {
    const location = useLocation()
    const locName = location.pathname
    return (
        // routing based on thier link.....
        <div className='flex flex-col gap-2'>
            {
                !locName.includes("/admin") && (
                    <Navbar />
                )
            }
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/career" element={<Career />} />
                <Route path="/career/details/:id" element={<Details />} />
                <Route path="/admin/*" element={<IndexAdmin />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default Routing
