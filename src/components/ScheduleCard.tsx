import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

const ScheduleCard = ({ date }: { date: Date }) => {
    return (
        <div className='flex flex-row w-full p-2 rounded-sm border'>
            <div className='flex-1'>
                <time className="flex flex-row gap-2 font-bold">
                    <span>{date.toLocaleDateString("en-GB", options)}</span>
                </time>
            </div>
            <div className='flex flex-col gap-2'>
                <Button variant='warning'>
                    <Pencil />
                </Button>
                <Button variant='destructive'>
                    <Trash2 />
                </Button>
            </div>
        </div>
    )
}

export default ScheduleCard
