import React from 'react'
import { Heading } from '../components/Heading'
import { Heading2 } from '../components/Heading2'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import Links from '../components/Links'

function SendMoney() {
    return (
        <div className='bg-purple-100 w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center bg-white p-4 rounded-xl'>
                <div className='mb-4'>
                    <Heading label='Send Money' />
                    <Heading2 label='Transfer funds securely  from your wallet' type='open' />
                </div>

                <div className='font-light bg-blue-100 rounded-2xl flex items-center pl-3 px-4 max-w-50 mb-4'>Recipent : Akshit</div>
                <div className='mb-2'>
                    <Heading2 label='Recipent User ID' type='related' />
                    <InputBox placeholder='Enter a valid userID' />
                    <Heading2 label='Amount ' type='related' />
                    <InputBox placeholder='Enter amount in rupees' />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='mb-3'>
                        <Button label='Send Payment' variant='primary' />
                    </div>
                    <Links text='Back to Dashboard' />
                </div>
            </div>
        </div>
    )
}

export default SendMoney