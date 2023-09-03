"use client";

import { Typography } from "@mui/material";
import { useGetCommentsQuery } from "../../redux/services/commentsApi";
import { useEffect, useState } from "react";

type Props = {
  postID: string | null;
};

const PostComments: React.FC<Props> = ({ postID }) => {
  const { isLoading, isFetching, data, error } = useGetCommentsQuery(null, {
    pollingInterval: 300000,
  });
  return (
    <>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div style={{ color: "white", width: "100%" }}>
          {data
            .filter((item) => item.target_post_id === postID)
            .map((comment, i) => {
              const date = new Date(comment.created_at).toLocaleDateString();
              const time = new Date(comment.created_at).toLocaleTimeString();
              return (
                <Typography paragraph key={comment.id}>
                  {comment.comment_author_name} said on {date} {time}:
                  <br />
                  {comment.content.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </Typography>
              );
            })}
        </div>
      ) : null}
    </>
  );
};

export default PostComments;
