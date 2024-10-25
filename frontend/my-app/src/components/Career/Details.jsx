import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { storeContext } from '../../Context/Context';
import MappedCareers from './MappedCareers';

const Details = () => {
    const { id } = useParams();
    const { details } = useContext(storeContext);

    return (
        <>
            {
                details && (
                    <div className="flex -mt-3 h-screen">
                        <div className="max-w-[380px] w-full gap-4 flex flex-col h-full bg-zinc-200 p-8 border-gray-300 overflow-y-scroll">
                            <MappedCareers dataId={id} />
                        </div>

                        <div className="max-w-[700px] w-full p-8 bg-white">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center justify-center h-16 w-16 bg-purple-500 rounded-full">
                                    <span className="text-white font-bold text-2xl">U</span>
                                </div>

                                <div>
                                    <p className="text-black font-[600] font-Ubuntu text-lg">{details.companyName}</p>
                                    <p className="text-gray-500 text-sm">{details.website || 'www.example.com'}</p>
                                </div>
                            </div>

                            {/* Job Title */}
                            <h2 className="text-black font-[600] text-xl font-ubuntu mt-5">
                                {details.title}
                            </h2>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-5">
                                <button className="bg-emerald-200 text-black px-4 py-[5px] rounded-full">Urgent</button>
                                <button className="bg-emerald-200 text-black px-4 py-[5px] rounded-full">New</button>
                            </div>

                            {/* Job Details */}
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <p className="text-black font-medium font-Ubuntu">Location</p>
                                    <p className="text-gray-500">{details.location}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-black font-medium font-Ubuntu">Salary</p>
                                    <p className="text-gray-500">{details.salary}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-black font-medium font-Ubuntu">Work Hours</p>
                                    <p className="text-gray-500">{details.workhours}</p>
                                </div>
                            </div>

                            {/* This will link user to google form.. */}
                            <div className="mt-5">
                                <button
                                    disabled={details.status === "No longer accepting applications"}
                                    onClick={() => {
                                        if (details.status !== "No longer accepting applications") {
                                            // Handle the apply action, e.g., redirect to the Google Form or show a modal
                                            window.open("https://docs.google.com/forms/d/e/1FAIpQLSdMNkzTkvyQ6lqnz5SaX3tC5JUOCF48ydb9LRgeMGiyLgk_sw/viewform?usp=sf_link", "_blank");
                                        }
                                    }}
                                    className={`rounded-full text-white px-12 py-2 ${details.status === "No longer accepting applications" ? 'bg-gray-400 cursor-not-allowed' : "bg-blue-800"}`}>
                                    Apply Now
                                </button>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-black font-bold">Description</h3>
                                <p className="text-gray-500">{details.description}</p>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-black font-bold">Skills Required</h3>
                                <ul className="list-disc list-inside text-gray-500">
                                    {details.skillsRequired.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Details;
