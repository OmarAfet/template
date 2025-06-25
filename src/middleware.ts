import { updateSession } from '@/utils/supabase/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "./utils/supabase/server"

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // If user is authenticated and trying to access auth pages (except reset-password), redirect to home
    if (user && path.startsWith("/auth") && !path.startsWith("/auth/reset-password")) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    // update user's auth session
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}