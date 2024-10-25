import React, { useState } from 'react';

const Filters = () => {
    
    const [selectedValues, setSelectedValues] = useState({
        'Job Role': 'Select Job Role',
        'Location': 'Select Location',
        'Experience': 'Select Experience',
    });


    const filters = [
        {
            title: 'Job Role',
            options: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Blockchain Developer']
        },
        {
            title: 'Location',
            options: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Butwal', 'Biratnagar', 'Nepalgunj', 'Bhaktapur', 'Dharan', 'Hetauda']
        },
        {
            title: 'Experience',
            options: ['Internship', 'Junior', 'Mid-Junior']
        }
    ];

    const handleSelectedValues = (title,role) => {

    }

    return (
        <div className='mt-5'>
            <div className='flex w-fit items-center gap-4'>
                {/* Filters Title */}
                <span className='text-lg font-medium'>Filters</span>

                {/* Displaying filter dropdowns */}
                <div className='flex gap-4 w-full overflow-x-auto'>
                    {filters.map((filter) => (
                        <div key={filter.title} className='relative'>
                            {/* Dropdown with plain select */}
                            <select className='px-4 py-2 w-52 rounded-full border border-gray-300 bg-white text-gray-700 cursor-pointer'>
                                <option>{filter.title}</option>
                                {filter.options.map((option) => (
                                    <option key={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                {/* Search Button */}
                <button
                    className='px-6 py-[6px] rounded-full bg-blue-500 text-white cursor-pointer'
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Filters;
