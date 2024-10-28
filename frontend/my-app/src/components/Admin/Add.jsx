import axios from 'axios';
import React, { useContext, useState } from 'react';
import { storeContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJob = () => {
    const { url, scrollToTop, fetch } = useContext(storeContext);
    const nav = useNavigate()

    const fields = [
        { label: 'Job Title', name: 'title', type: 'text', placeholder: 'e.g. Graphic Designer' },
        { label: 'Company Name', name: 'companyName', type: 'text', placeholder: 'e.g. Design Studio' },
        { label: 'Job Role', name: 'job_role', type: 'text', placeholder: 'e.g. Senior Developer' },
        { label: 'Date', name: 'date', type: 'date', placeholder: 'e.g. 2024-10-24' },
        { label: 'Location', name: 'location', type: 'text', placeholder: 'e.g. Lalitpur' },
        { label: 'Skills Required', name: 'skillsRequired', type: 'text', placeholder: 'e.g. JavaScript, React' },
        { label: 'Job Type', name: 'type', type: 'text', placeholder: 'e.g. Mid-junior' },
        { label: 'Salary', name: 'salary', type: 'text', placeholder: 'e.g. 40,000 - 60,000' },
        { label: 'Description', name: 'description', type: 'textarea', rows: 4, placeholder: 'e.g. Looking for a creative individual...' },
        { label: 'Work Hours', name: 'workhours', type: 'text', placeholder: 'e.g. 10AM - 6PM' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'e.g. jobs@designstudio.com' },
        { label: 'Website', name: 'website', type: 'url', placeholder: 'e.g. https://designstudio.com' }
    ];


    const [inp, setInp] = useState({
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
        status: "Pending" // default status..
    });

    const inpFunc = (e) => {
        const { name, value } = e.target;
        setInp((x) => ({
            ...x,
            [name]: value
        }));
    };
    const submit = async (e) => {
        e.preventDefault();
        if (
            !inp.title ||
            !inp.companyName ||
            !inp.job_role ||
            !inp.date ||
            !inp.location ||
            !inp.type ||
            !inp.salary ||
            !inp.description ||
            !inp.workhours ||
            !inp.email ||
            !inp.website ||
            !inp.skillsRequired
        ) {
            return console.log("Some required fields are missing!..");
        }

        try {
            const response = await axios.post(`${url}/api/add`, { ...inp }, { headers: { 'Content-Type': 'application/json' } });
            if (response) {
                console.log(response);
                fetch()
                nav("/admin")
                scrollToTop()
                toast.success("Successfully created new Job")
            }
        } catch (error) {
            console.log(error);
            nav("/admin")
            toast.error("Adding job failed")
            scrollToTop()
        }
    };

    return (
        <div className='text-black flex-col h-fit flex w-full'>
            <form onSubmit={submit} className='p-6 w-full shadow-lg rounded-lg'>

                {fields.map((field, index) => (
                    <div className='mb-4' key={index}>
                        <label className='text-sm text-gray-700 font-Ubuntu block mb-2'>{field.label}</label>

                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                className='w-full rounded-lg border-[1px] text-gray-800 border-gray-300 p-3 text-sm'
                                rows={field.rows}
                                onChange={inpFunc}
                                required
                                placeholder={field.placeholder}
                            />
                        ) : (
                            <input
                                required
                                name={field.name}
                                type={field.type}
                                className='w-full h-10 rounded-lg border-[1px] text-gray-800 border-gray-300 p-3 text-sm'
                                onChange={inpFunc}
                                placeholder={field.placeholder}
                            />
                        )}
                    </div>
                ))}

                {/* dropdown for job status... */}
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

                {/* submitting button.. */}
                <div className='flex justify-center w-full'>
                    <button
                        type='submit'
                        className='bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 text-sm'
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddJob;
