"use client"
import { useGlobalContext } from '@/context/GlobalContextProvider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export const AppHeader = () => {
    const { title } = useGlobalContext();
    const [username, setUsername] = useState('Profile');

    useEffect(() => {
        const fetchUserData = async () => {
            console.info("app header fetching user");
            const user = await getUser();
            if (!user) {
                console.error('User not found');
                return;
            }
            setUsername(user.username);
        };
        fetchUserData();
    }, []);

    return (
        <div className='flex flex-col'>
            <div className="flex shrink-0 items-center h-10 m-2 gap-2">
                <SidebarTrigger />
                <span className='h-full w-px bg-gray-600'></span>
                <h1 className="text-xl font-bold ml-4">
                    {title}
                </h1>
                <div className="grow" />  {/* fill remaining space */}
                <div>
                    <Button onClick={() => redirect("/profile")}>
                        {username}
                    </Button>
                </div>
            </div>
            <span className="w-full h-px bg-gray-600"></span>
        </div>
    )
}
