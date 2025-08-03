"use client"

import ScheduleCard from '@/components/ScheduleCard';
import { Calendar } from '@/components/ui/calendar';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { useState, useEffect } from 'react'

const SchedulePage = () => {
    const { setTitle } = useGlobalContext();
    const [date, setDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        setTitle("Schedule");
    }, [setTitle]);

    return (
        <div className='grid grid-cols-3 gap-5'>
            <div className='col-span-2 flex flex-col px-5 gap-2'>
                {date && (
                    <>
                        <ScheduleCard date={date} />
                        <ScheduleCard date={date} />
                    </>
                )}
            </div>
            <div className='flex flex-row justify-center'>
                <Calendar mode="single" selected={date} onSelect={setDate} className="w-full rounded-md border" />
            </div>
        </div>
    )
}

export default SchedulePage
