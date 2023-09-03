import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


//@ts-ignore
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const res = NextResponse.next()
  const requestUrl = new URL(req.url)
  const data = await req.json()
  console.log(data)
    const supabase = createMiddlewareClient<Database>({ req, res })
    const {
    data: { user },
    } = await supabase.auth.getUser()
    
    try {
        const updatedData = {
      role: data.role,
    };
        let { error } = await supabase
            .from("profiles")
            .update(updatedData)
            .eq('id', user?.id)
      if (error) throw error;
      console.log("Profile updated!");
    } catch (error) {
      console.log("Error updating the data!", error);
    } finally {
    }
  
    
    return new NextResponse("Hello")

}