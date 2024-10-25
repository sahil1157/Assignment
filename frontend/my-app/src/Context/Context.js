import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const storeContext = createContext(null)

const StoreContextProvider = (props) => {
    const url = "http://localhost:5000"
    const [details, setDetails] = useState()
    const [jobDatas, setJobDatas] = useState([])
    const location = useLocation()
    const path = location.pathname
    const id = path.split('/').pop()
    const [currPageId, setCurrPageId] = useState(id)
    const [loader, setLoader] = useState(true)  //will be used for lazy loading purpose for future...
    const [editJobDetals, setEditJobDetails] = useState(currPageId)
    const nav = useNavigate()

    // this useeffect is used to rerender or reexecute the page/path id so that current page details could be shown...
    useEffect(() => {
        setCurrPageId(id);
    }, [location.pathname]);

    // created a seperate function for getting job datas, so that they can be called for other CRUD operations like edit,delete,create etc...
    const fetch = async () => {
        try {
            const getDatas = await axios.get(`${url}/api/getJobs`)
            if (getDatas && getDatas.data.message) {
                setJobDatas(getDatas.data.message)
                setLoader(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    // this useffect is used to find the current clicked detail's page with the help of currPageId from URL....
    useEffect(() => {
        if (currPageId && jobDatas.length > 0) {
            const findItems = jobDatas && jobDatas.find(x => x._id === currPageId)
            setDetails(findItems)
        }
    }, [currPageId, jobDatas])

    // this will scroll user to top...
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // deleting job with the use of deleteId

    const Delete = async (id) => {
        const deleteId = id.toString()
        try {
            const res = await axios.delete(`${url}/api/delete`, { data: { deleteId } })
            console.log("send req")
            if (res) {
                console.log("Deleted")
                fetch()
                nav("/admin")
                toast.success("Successfully deleted Job")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const contextValue = {
        url,
        setDetails,
        details,
        jobDatas,
        currPageId,
        setCurrPageId,
        fetch,
        setEditJobDetails,
        editJobDetals,
        scrollToTop,
        Delete
    }


    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider