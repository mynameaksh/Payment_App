import React, { useEffect, useRef, useState } from 'react'
import { Heading } from '../components/Heading'
import { Heading2 } from '../components/Heading2'
import Button from '../components/Button'
import InputBox from '../components/InputBox'
import api from '../api'
import { useNavigate } from 'react-router-dom'
interface BalanceResponse {
    balance: number

}
interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
}

function Dashboard() {

    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const query = searchRef.current?.value || "";
            const response = await api.get<{ user: User[] }>(`/user/search?q=${query}`)
            setUsers(response.data.user)
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        const getBalance = async () => {
            try {
                const balanceResponse = await api.get<BalanceResponse>("/account/balance");
                setBalance(balanceResponse.data.balance);




            } catch (error) {
                console.log(error);


            } finally {
                setLoading(false)
            }
        }


        getBalance();
        fetchUsers();
    }, [])



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
                    <Heading label={`₹ ${balance?.toLocaleString() ?? "0."}`} />
                    <Button label='Refresh Balance' variant='tertiary' />
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center '>
                        <Heading2 label='Find Users' type='related' />
                        <div className='flex flex-row justify-center items-center gap-3'>
                            <InputBox ref={searchRef} placeholder='Search by username' />
                            <Button onClick={fetchUsers} label='Search' variant='tertiary' />
                        </div>
                    </div>

                    {/* <div className='flex justify-between border border-gray-300 rounded-md p-3 mt-3'>
                        <div>
                            
                            <Heading2 label='user1' type='related' />
                            <Heading2 label='@user1' type='open' />
                        </div>
                        <Button label='Send Money' variant='primary2' />
                    </div> */}
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className='flex justify-between border border-gray-300 rounded-md p-3 mt-3'>
                                <div>
                                    <Heading2 label={user.firstName} type='related' />
                                    <Heading2 label={`@${user.username}`} type='open' />
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <Button label='Send Money' variant='primary2' onClick={() => navigate(`/account/transfer?to=${user._id}&name=${encodeURIComponent(user.firstName)}`)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='mt-3 text-gray-500'>No user found</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Dashboard