"use client";

import { register } from '@/actions/auth'
import Image from 'next/image';
import Link from 'next/link';
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button";

const RegisterButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending} type="submit">Sign up</Button>
    )
}

export function RegisterForm() {
    const [, signupAction] = useActionState(register, undefined)
    return (

        <div
            className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">

            <a href=""
                className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                <Image src="/logo.svg" alt="Grac Logo" width={44} height={44} />
                <span>Grac</span>
            </a>


            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create a Free Account
                </h2>
                <form className="mt-8 space-y-6" action={signupAction}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            email</label>
                        <input type="email" name="email" id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required />
                    </div>
                    <div>
                        <label htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                            password</label>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                required />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">I accept
                                the <a href="#" className="text-primary-700 hover:underline dark:text-primary-500">Terms
                                    and Conditions</a></label>
                        </div>
                    </div>
                    <RegisterButton />
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href="/login" className='text-primary-700 hover:underline dark:text-primary-500'>Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}