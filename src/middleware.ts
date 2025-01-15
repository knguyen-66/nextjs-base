import { NextRequest, NextResponse } from 'next/server'
import { getSessionPayload } from '@/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
// const protectedRoutes = ['/']
const publicRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {
    console.info("middleware validating")
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    // const isProtectedRoute = protectedRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value;
    const payload = await getSessionPayload(cookie);

    // 4. Redirect to /login if the user is not authenticated
    if (!isPublicRoute && !payload) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // 5. Redirect to / if the user is authenticated
    if (isPublicRoute && payload?.userId) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}