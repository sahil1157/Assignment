import React, { useContext, useState } from 'react';
import { storeContext } from '../../Context/Context';

const Filters = () => {

    const [selectedValues, setSelectedValues] = useState({});
    const { jobDatas } = useContext(storeContext)


    const filters = [
        {
            title: 'Role',
            options: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Blockchain Developer']
        },
        {
            title: 'Location',
            options: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Butwal', 'Biratnagar', 'Nepalgunj', 'Bhaktapur', 'Dharan', 'Hetauda']
        },
        {
            title: 'Experience',
            options: ['Internship', 'Junior', 'Mid-Junior', "Full-Time"]
        }
    ];

    // this is for getting the user's selected value...if needed this function will be made...
    const handleSelectedValues = (title, role) => {
        setSelectedValues((prev) => ({
            ...prev, [title]: role
        }))
    }


    const handleSearch = () => {
        if (!selectedValues.Location || !selectedValues.Experience || !selectedValues.Role) {
            return console.warn("All the fields are mandatory..")
        }
        console.log(selectedValues)
    }

    return (
        <div className='mt-5'>
            <div className='flex w-fit items-center gap-4'>
                <span className='text-lg font-medium'>Filters</span>

                <div className='flex gap-4 w-fit overflow-x-auto'>
                    {filters.map((filter) => (
                        <div key={filter.title} className='relative'>
                            <select
                                onChange={(e) => handleSelectedValues(filter.title, e.target.value)}
                                className='px-4 py-2 w-52 rounded-full border border-gray-300 bg-white text-gray-700 cursor-pointer'>
                                <option>{filter.title}</option>
                                {filter.options.map((option) => (
                                    <option key={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSearch}
                    className='px-6 py-[6px] rounded-full bg-blue-500 text-white cursor-pointer'
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Filters;
