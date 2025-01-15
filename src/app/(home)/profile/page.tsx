"use client"

import { logout } from '@/actions/auth';
import UserForm from '@/components/UserForm';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { useEffect } from 'react';

const ProfilePage = () => {
    const { setTitle } = useGlobalContext();
    useEffect(() => {
        setTitle("Profile");
    }, []);

    return (
        <div className='grid grid-cols-5 gap-10'>
            <div className='col-span-4 w-full flex flex-col gap-5'>
                <span>Profile Page</span>
                <button className="w-40 bg-gray-700" onClick={logout}>Log out</button>
                <span className='col-span-5 h-[1px] bg-gray-700' />
                <UserForm />
            </div>
            <div className='flex flex-col items-center gap-2'>
                <div className='aspect-square w-full bg-blue-900 rounded-full'></div>
                <span className='text-center'>Change profile pic</span>
            </div>
            <span className='col-span-5 h-[1px] bg-gray-700' />
        </div>
    )
}

export default ProfilePage