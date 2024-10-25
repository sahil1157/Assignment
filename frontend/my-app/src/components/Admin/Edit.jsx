import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storeContext } from '../../Context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Edit = () => {

    const { details, url, fetch, scrollToTop } = useContext(storeContext);
    const { id } = useParams();
    const nav = useNavigate();
    const [inp, setInp] = useState({
        id: "",
        title: "",
        companyName: "",
        job_role: "",
        date: "",
        location: "",
        type: "",
        salary: "",
        description: "",
        workhours: "",
        email: "",
        website: "",
        skillsRequired: "",
        status: "Pending"
    });

    // inp will contain default value which needs to be edited and once all the items are filled they will be sent to backend...
    useEffect(() => {
        if (details && id) {
            setInp({
                id: details._id.toString(),
                title: details.title || "",
                companyName: details.companyName || "",
                job_role: details.job_role || "",
                date: details.date || "",
                location: details.location || "",
                type: details.type || "",
                salary: details.salary || "",
                description: details.description || "",
                workhours: details.workhours || "",
                email: details.email || "",
                website: details.website || "",
                skillsRequired: details.skillsRequired || "",
                status: details.status || "Pending"
            });
        }
    }, [details, id]);

    const inpFunc = (e) => {
        const { name, value } = e.target;
        setInp((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${url}/api/edit/`, { ...inp }, { headers: { 'Content-Type': 'application/json' } });
            if (response) {
                console.log(response);
                fetch();
                nav("/admin");
                scrollToTop()
                toast.success("Successfully edited Job")
            }
        } catch (error) {
            console.log(error);
            nav("/admin")
            toast.error("Edit failed")
            scrollToTop()
        }
    };

    const fields = [
        { label: 'Job Title', name: 'title', type: 'text' },
        { label: 'Company Name', name: 'companyName', type: 'text' },
        { label: 'Job Role', name: 'job_role', type: 'text' },
        { label: 'Date', name: 'date', type: 'date' },
        { label: 'Location', name: 'location', type: 'text' },
        { label: 'Job Type', name: 'type', type: 'text' },
        { label: 'Salary', name: 'salary', type: 'text' },
        { label: 'Description', name: 'description', type: 'textarea', rows: 4 },
        { label: 'Work Hours', name: 'workhours', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Website', name: 'website', type: 'url' },
        { label: 'Skills Required', name: 'skillsRequired', type: 'text' }
    ];

    return (
        <div className='text-black flex-col h-fit flex w-full'>
            <form onSubmit={submit} className='p-6 w-full shadow-lg rounded-lg'>

                {fields.map((field, index) => (
                    <div className='mb-4' key={index}>
                        <label className='text-sm text-gray-700 font-Ubuntu block mb-2'>{field.label}</label>

                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                className='w-full rounded-lg border-[1px] border-gray-300 p-3 text-sm'
                                rows={field.rows}
                                onChange={inpFunc}
                                value={inp[field.name]}
                                required
                            />
                        ) : (
                            <input
                                required
                                name={field.name}
                                type={field.type}
                                className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm'
                                onChange={inpFunc}
                                value={inp[field.name]}
                            />
                        )}
                    </div>
                ))}

                {/* Dropdown for Job Status */}
                <div className='mb-4'>
                    <label className='text-sm text-gray-700 font-Ubuntu block mb-2'>Job Status</label>
                    <select
                        name="status"
                        className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm'
                        value={inp.status}
                        onChange={inpFunc}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className='flex justify-center w-full'>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400 text-sm'
                    >
                        Update Job
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Edit;
