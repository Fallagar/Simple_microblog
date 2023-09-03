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
    baseUrl: "https://pqcwbsgdadtfvhdtvxec.supabase.co/rest/v1/comments?select=*",
    prepareHeaders: (headers) => {
      // You can set your custom headers here
     headers.set("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY3dic2dkYWR0ZnZoZHR2eGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NjEyOTQsImV4cCI6MjAwOTEzNzI5NH0.FaOSZk5w3C_wn65M1WIFm1YRojNXO4fDhxiPqvCbp5E")
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
