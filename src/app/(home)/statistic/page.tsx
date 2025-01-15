"use client"

import { useGlobalContext } from '@/context/GlobalContextProvider';
import React, { useEffect } from 'react'

const StatisticPage = () => {
    const { setTitle } = useGlobalContext();
    useEffect(() => {
        setTitle("Statistic");
    }, []);
    return (
        <div>Statistic</div>
    )
}

export default StatisticPage