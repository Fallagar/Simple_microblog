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
    const supabase = createMiddlewareClient<Database>({ req, res })
    const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
        return NextResponse.json({ error: 'You a not authorized!' }, { status: 401 })
    }
  
    let { data: queryData, error, status } = await supabase
        .from("profiles")
        .select(`user_email, role`)
        .eq("id", user?.id)
    .single();
  if (queryData?.role !== "commentator") {
        return NextResponse.json({ error: 'You a not the commentator!' }, { status: 403 })
    }
  if (queryData?.role === "commentator") {
    try {
      const updatedData = {
        content: data.comment,
        comment_author: user?.id,
        target_post_id: data.postID,
        comment_author_name: queryData?.user_email
      };
      let { error } = await supabase
        .from("comments")
        .upsert(updatedData)
      if (error) throw error;
      return NextResponse.json({ result: 'Comment Added' }, { status: 200 })
    } catch (error) {
      
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    } 
  }
    
  
    
}