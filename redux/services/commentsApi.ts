import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type Comment = {
  id: string,
        created_at: string,
        content: string[],
  comment_author_name: string,
      target_post_id: string
};

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/comments?select=*`,
    prepareHeaders: (headers) => {
      // You can set your custom headers here
     headers.set("apikey", `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
      return headers;
    },
    
  }),
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], null>({
      query: () => "comments",
    }),   
  }),
});

export const { useGetCommentsQuery } = commentsApi;
