"use client";

import { useGetPostsQuery } from "@/redux/services/postsApi";
import styles from "./page.module.scss";
import PostCard from "../components/PostCard/PostCard";
import AddPostCard from "../components/AddPostCard/AddPostCard";
import { useState, useEffect, memo } from "react";

type Props = {
  params: {
    role: string;
  };
};

export default function Home({ params }: Props) {
  const { isLoading, isFetching, data, error } = useGetPostsQuery(null, {
    pollingInterval: 300000,
  });
  const [reversedQuery, setReversedQuery] = useState<typeof data>([]);
  useEffect(() => {
    if (data) {
      let reversed = [...data];

      setReversedQuery(reversed.reverse());
    }
  }, [data]);

  return (
    <main className={styles.posts_container}>
      {params.role === "author" && <AddPostCard />}
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          {reversedQuery?.map((post) => {
            return (
              <PostCard
                author={post.author_name}
                id={post.post_id}
                date={post.created_at}
                content={post.content}
                key={post.post_id}
                params={params}
              />
            );
          })}
        </>
      ) : null}
    </main>
  );
}
