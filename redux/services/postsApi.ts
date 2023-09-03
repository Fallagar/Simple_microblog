import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type Post = {
  id: string,
        created_at: string,
        content: string[],
  author_name: string,
      post_id: string
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
     baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/post?select=*`,
    prepareHeaders: (headers) => {
      
     headers.set("apikey", `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
      return headers;
    },
    
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], null>({
      query: () => "posts",
    }),   
  }),
});

export const { useGetPostsQuery } = postsApi;
