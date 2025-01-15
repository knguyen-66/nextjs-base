"use client"

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { editUserInformation } from '@/actions/user';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button variant="outline" type="submit" disabled={pending}>
            {pending ? "Loading..." : "Submit"}
        </Button>
    )
}

const UserForm = () => {
    const [state, editAction] = useActionState(editUserInformation, undefined);
    return (
        <div className='flex flex-col w-full'>
            <h2>Edit user information</h2>
            <form className='flex flex-col gap-2' action={editAction}>
                <label className='text-white' htmlFor='oldPassword'>Change password</label>
                {state?.message && <p className='text-green-400'>{state.message}</p>}

                <Input type='password' name='oldPassword' id='oldPassword' placeholder='Old password' />
                {state?.errors?.oldPassword && <p className='text-red-400'>{state.errors.oldPassword}</p>}

                <Input type='password' name='newPassword' id='newPassword' placeholder='New password' />
                {state?.errors?.newPassword && <p className='text-red-400'>{state.errors.newPassword}</p>}

                <Input type='password' name='confirmPassword' id='confirmPassword' placeholder='Re-enter new password' />
                {state?.errors?.confirmPassword && <p className='text-red-400'>{state.errors.confirmPassword}</p>}

                <SubmitButton />
            </form>
        </div>
    )
}

export default UserForm