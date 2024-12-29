import { z } from 'zod'

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(8, { message: 'Name must be at least 8 characters long.' })
        .regex(/[a-zA-Z0-9]/, { message: 'Name must contain only letters and numbers.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export const LoginFormSchema = z.object({
    username: z.string().min(8, { message: "Be at least 8 characters long" }).trim(),
    password: z.string().min(8, { message: 'Be at least 8 characters long' }).trim(),
})

export type SignupFormState =
    | {
        errors?: {
            username?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export type LoginFormState =
    | {
        errors?: {
            username?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

