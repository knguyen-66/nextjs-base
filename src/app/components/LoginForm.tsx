"use client";

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom';
import { login } from '@/app/actions/auth'

const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit">Login</button>
    )
}

const LoginForm = () => {
    const [state, loginAction] = useActionState(login, undefined);
    return (
        <form className='flex flex-col gap-2' action={loginAction}>
            <div>
                <label htmlFor="username">Username</label>
                <input name="username" type='text' placeholder='Username' className='text-black' />
                {state?.errors?.username && <p className='text-red-400'>{state.errors.username}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type='password' className='text-black' />
                {state?.errors?.password && <p className='text-red-400'>{state.errors.password}</p>}
            </div>
            <div>
                <LoginButton />
            </div>
        </form>
    )
}

export default LoginForm