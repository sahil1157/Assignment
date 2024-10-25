import React from 'react'
import MappedCareers from './MappedCareers'

const ListOfDatas = () => {

    return (
        <div className='mt-8 w-full items-center justify-center flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            <MappedCareers />
        </div>
    )
}

export default ListOfDatas
