"use client"
import { useGlobalContext } from '@/context/GlobalContextProvider'
import { SidebarTrigger } from './ui/sidebar'

export const AppHeader = () => {
    const { title } = useGlobalContext();
    return (
        <div className='flex flex-col'>
            <div className="flex shrink-0 items-center h-10 m-2 gap-2">
                <SidebarTrigger />
                <span className='h-full w-px bg-gray-600'></span>
                <h1 className="text-xl font-bold ml-4">
                    {title}
                </h1>
                <div className="grow" />
                <div>
                    <button className="bg-blue-500 text-white font-bold py-2 px-2 rounded">
                        User
                    </button>
                </div>
            </div>
            <span className="w-full h-px bg-gray-600"></span>
        </div>
    )
}
