"use client"

import { useGlobalContext } from '@/context/GlobalContextProvider';
import React, { useEffect } from 'react'

const SupportPage = () => {
    const { setTitle } = useGlobalContext();
    useEffect(() => {
        setTitle("Support");
    }, []);
    return (
        <div>SupportPage</div>
    )
}

export default SupportPage