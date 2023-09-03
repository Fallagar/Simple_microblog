import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetPostsQuery } from "../../redux/services/postsApi";
import { memo, useState } from "react";
import "./AddPostCard.styles.scss";

type FormValues = {
  addPost: string;
};

const AddPostCard = memo(() => {
  const [disableButton, setDisableButton] = useState(false);
  const { refetch } = useGetPostsQuery(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const post = data.addPost.split("\n");
    try {
      setDisableButton(true);
      const response = await fetch("/db-query/addpost", {
        method: "POST",
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        // Handle server errors, e.g., by showing an error message
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }
      const responseData = await response.json();
      if (responseData.result === "Post Added") {
        reset();
        setDisableButton(false);
        refetch();
      }
    } catch (error) {
      reset();
      setDisableButton(false);
      console.error("An error occurred:", error);
    }
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

  return (
    <form className="add-post-form" onSubmit={handleSubmit(onSubmit)}>
      <StyledTextarea
        aria-label="empty textarea"
        placeholder="Post Something..."
        required
        {...register("addPost")}
      />
      <button type="submit" disabled={disableButton}>
        Add Post
      </button>
    </form>
  );
});

export default AddPostCard;
