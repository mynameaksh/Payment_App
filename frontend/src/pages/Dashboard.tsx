import React from 'react'
import { Heading } from '../components/Heading'
import { Heading2 } from '../components/Heading2'
import Button from '../components/Button'
import InputBox from '../components/InputBox'

function Dashboard() {



    return (
        <div className='bg-purple-100 w-screen h-screen flex justify-center items-center'>
            <div className='bg-white p-4 rounded-xl min-w-7xl min-h-min '>
                <div className='flex justify-between mb-5' >
                    <div className='flex flex-col '>
                        <Heading label='Payment Dashboard' />
                        <Heading2 label='Check your Balance and transfer to any user instantly' type='open' />
                    </div>
                    <Button label='Logout' variant='secondary' />
                </div>
                <div className='flex flex-col mb-5 mt-6'>
                    <Heading2 label='Current Balance' type='open' />
                    <Heading label='Rs 100,00,000' />
                    <Button label='Refresh Balance' variant='tertiary' />
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center '>
                        <Heading2 label='Find Users' type='related' />
                        <div className='flex flex-row justify-center items-center gap-3'>
                            <InputBox placeholder='Search by username' />
                            <Button label='Search' variant='tertiary' />
                        </div>
                    </div>
                    <div className='flex justify-between border border-gray-300 rounded-md p-3 mt-3'>
                        <div>
                            <Heading2 label='user1' type='related' />
                            <Heading2 label='@user1' type='open' />
                        </div>
                        <Button label='Send Money' variant='primary2' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard