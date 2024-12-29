"use client";

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const SignupButton = () => {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit">Sign up</button>
    )
}

// export default SignupButton

export function SignupForm() {
    const [state, signupAction] = useActionState(signup, undefined)
    return (
        <form action={signupAction}>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" placeholder="Username" className='text-black' />
                {state?.errors?.username && <p className='text-red-400'>{state.errors.username}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" className='text-black' />
                {state?.errors?.email && <p className='text-red-400'>{state.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className='text-black' />
                {state?.errors?.password && <p className='text-red-400'>{state.errors.password}</p>}
            </div>
            <div>
                <SignupButton />
            </div>
        </form>
    )
}