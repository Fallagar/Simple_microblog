import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


//@ts-ignore
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL("/account", request.url)
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    return NextResponse.redirect(requestUrl)
  } else {
    console.log("redirecting")
return NextResponse.redirect(requestUrl)
  }

  
}