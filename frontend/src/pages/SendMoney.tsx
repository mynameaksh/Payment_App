import React, { useContext, useRef } from 'react'
import { Heading } from '../components/Heading'
import { Heading2 } from '../components/Heading2'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import Links from '../components/Links'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api'
function SendMoney() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const receiverId = searchParams.get("to") || "";
    const recieverName = searchParams.get("name") || "";

    const amountRef = useRef<HTMLInputElement>(null);


    const sendAmount = async () => {
        try {
            const amount = Number(amountRef.current?.value || 0);

            if (!receiverId) {
                alert('Receiver Id missing')
                return;
            }
            if (!Number.isInteger(amount) || amount <= 0) {
                alert('Enter a valid amount')
                return
            }

            await api.post("/account/transfer", {
                to: receiverId,
                amount: amount
            })
            alert("amount sent")
            navigate('/account/dashboard')

        } catch (error) {
            console.log(error);

        }


    }





    return (
        <div className='bg-purple-100 w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center bg-white p-4 rounded-xl'>
                <div className='mb-4'>
                    <Heading label='Send Money' />
                    <Heading2 label='Transfer funds securely  from your wallet' type='open' />
                </div>

                <div className='font-light bg-blue-100 rounded-2xl flex items-center pl-3 px-4 max-w-50 mb-4'> Recipient: {decodeURIComponent(recieverName)}</div>
                <div className='mb-2'>
                    <Heading2 label='Recipent User ID' type='related' />
                    <InputBox placeholder={receiverId} />
                    <Heading2 label='Amount ' type='related' />
                    <InputBox ref={amountRef} placeholder='Enter amount in rupees' />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='mb-3'>
                        <Button label='Send Payment' variant='primary' onClick={sendAmount} />
                    </div>
                    <div onClick={() => navigate('/account/dashboard')}>
                        <Links text='Back to Dashboard' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney