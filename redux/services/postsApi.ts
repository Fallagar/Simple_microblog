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
    baseUrl: "https://pqcwbsgdadtfvhdtvxec.supabase.co/rest/v1/post?select=*",
    prepareHeaders: (headers) => {
      // You can set your custom headers here
     headers.set("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY3dic2dkYWR0ZnZoZHR2eGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NjEyOTQsImV4cCI6MjAwOTEzNzI5NH0.FaOSZk5w3C_wn65M1WIFm1YRojNXO4fDhxiPqvCbp5E")
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
