"use client";
import { useState, useEffect } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useGetPostsQuery } from "@/redux/services/postsApi";
import styles from "./page.module.scss";
import PostCard from "../../components/PostCard/PostCard";

type Props = {
  params: {
    role: string;
  };
};

const StyledTextarea = styled(TextareaAutosize)(
  () => `
    width: 50vw;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: #afb8c1;
    background: #24292f;
    border: 1px solid #29444d;
    

    &:hover {
      border-color: #24292f;
    }

    &:focus {
      border-color: #24292f;
      box-shadow: 0 0 0 3px #b6daff;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const Search = ({ params }: Props) => {
  const { isLoading, isFetching, data, error } = useGetPostsQuery(null, {
    pollingInterval: 300000,
  });
  const [filtered, setFiltered] = useState<typeof data>([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  useEffect(() => {
    if (data) {
      setFiltered(
        [
          ...data.filter((item) => item.author_name.includes(searchValue)),
        ].reverse()
      );
    }
  }, [data, searchValue]);

  return (
    <main className={styles.posts_container}>
      <StyledTextarea
        aria-label="empty textarea"
        placeholder="Filter posts by author..."
        onChange={handleChange}
      />
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          {filtered?.map((post) => {
            console.log(post.post_id);
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
};

export default Search;
