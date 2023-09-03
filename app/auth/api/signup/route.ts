import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

//@ts-ignore
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  console.log("IN SIGNUP")
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/api/callback`,
    },
  })
  if (error) { 
    console.log("🚀 ~ file: route.ts:26 ~ POST ~ error:", error)    
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}