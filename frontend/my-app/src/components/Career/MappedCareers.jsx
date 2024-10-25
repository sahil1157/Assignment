import React, { useContext } from 'react';
import { MdOutlineDateRange } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoMail } from "react-icons/io5";
import { PiTargetBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { storeContext } from '../../Context/Context';

const MappedCareers = ({ dataId }) => {

    const nav = useNavigate()
    const { jobDatas, currPageId } = useContext(storeContext)
    // this function is used to navigate and as well as storing the current clicked job details and are stored inside local storage...
    const navigate = (id) => {
        localStorage.setItem("details", JSON.stringify(id))
        // setDetails(data)
        nav(`/career/details/${id}`)
    }

    // this component can be useful for any of the other component for layout purpose, one component might need layout flex and another might need grid,
    // so this reduces the component size in this application....
    return (
        <>
            {jobDatas && jobDatas.map((data, index) => (
                <div key={index} className={`cursor-pointer shadow-md w-full max-w-[320px] rounded-lg mb-4 ${currPageId === data._id ? "bg-white border-[1px] border-black" : "bg-transparent border-[2px] border-gray-200"}`}>
                    <div className='px-5 flex flex-col gap-3 py-5'>
                        <div className='flex gap-3'>
                            <div className='box-border flex items-center justify-center bg-orange-400 border-2 w-14 rounded-md h-14'>
                                <p className='text-2xl font-bold text-white'>U</p>
                            </div>
                            <div>
                                <p className='text-lg font-Ubuntu font-[500]'>{data.job_role}</p>
                                <p>- {data.companyName}</p>
                            </div>
                        </div>
                        {/* List of all the details... */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center'>
                                <MdOutlineDateRange size={23} />
                                <p className='ml-2 text-gray-600'>{data.date}</p>
                            </div>
                            <div className='flex items-center'>
                                <CiLocationOn size={23} />
                                <p className='ml-2 text-gray-600'>{data.location}</p>
                            </div>
                            <div className='flex items-center'>
                                <IoMail size={23} />
                                <p className='ml-2 text-gray-600'>{data.type}</p>
                            </div>
                            <div className='flex items-center'>
                                <PiTargetBold size={23} />
                                <p className={`ml-2 text-gray-600 ${data.status === "No longer accepting applications" ? 'text-red-600' : 'bg-yellow-200 p-[2px] rounded'}`}>{data.status}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 mt-2'>
                            <button onClick={() => navigate(data._id)} className='bg-black text-white rounded-md px-4 py-2 text-sm'>
                                Details
                            </button>
                            <button
                                className={`rounded-md px-4 py-2 text-sm text-white ${data.status === "No longer accepting applications" ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                                disabled={data.status === "No longer accepting applications"}
                                onClick={() => {
                                    if (data.status !== "No longer accepting applications") {
                                        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdMNkzTkvyQ6lqnz5SaX3tC5JUOCF48ydb9LRgeMGiyLgk_sw/viewform?usp=sf_link", "_blank");
                                    }
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default MappedCareers;
