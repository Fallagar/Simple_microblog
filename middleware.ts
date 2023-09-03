import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
//@ts-ignore
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
   const {
    data: { user },
  } = await supabase.auth.getUser()
  

  // if user is signed in and the current path is / redirect the user to /account
  if (user) {
    const getProfile = await supabase
        .from("profiles")
        .select(`username, role`)
        .eq("id", user?.id)
      .single();    
    if (getProfile.data?.role === "no_role") {
      console.log("Not in account!")
      if (req.nextUrl.pathname !== "/account")
     return NextResponse.redirect(new URL('/account', req.url))     
    }    
    if (getProfile.data?.role !== "no_role" && req.nextUrl.pathname === "/account") {
      console.log("Role chosen!")
     return NextResponse.redirect(new URL('/', req.url))
    }    

  }
  if (!user && req.nextUrl.pathname === "/account") {
    return NextResponse.redirect(new URL('/', req.url))
  }  

  return res
}

export const config = {
  matcher: ['/', "/search", "/account"],
}