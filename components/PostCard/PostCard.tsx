"use client";
import "./PostCard.styles.scss";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import ForumIcon from "@mui/icons-material/Forum";
import AddComment from "../AddComment/AddComment";
import { useGetCommentsQuery } from "../../redux/services/commentsApi";
import PostComments from "./PostComments";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  author: string;
  id: string;
  date: string;
  content: string[] | null;
  params: {
    role: string;
  };
};

const PostCard: React.FC<Props> = ({ author, id, date, content, params }) => {
  const [expanded, setExpanded] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { data } = useGetCommentsQuery(null);
  const day = new Date(date).toLocaleDateString();
  const time = new Date(date).toLocaleTimeString();

  useEffect(() => {
    if (data) {
      setCommentsCount(
        data.filter((item) => item.target_post_id === id).length
      );
    }
  }, [data, id]);
  return (
    <Card
      sx={{
        width: "50vw",
        backgroundColor: "transparent",
        color: "white",
        border: "2px solid #ffffff1a",
        borderRadius: "0.315rem",
      }}
      className="card"
    >
      <Badge
        onClick={handleExpandClick}
        badgeContent={commentsCount}
        color="primary"
        sx={{ marginLeft: "20px" }}
        className="badge"
      >
        <ForumIcon color="action" sx={{ color: "#82959B" }} />
      </Badge>
      <CardHeader
        onClick={handleExpandClick}
        subheaderTypographyProps={{ color: "#82959B" }}
        sx={{ color: "#F2F4F5" }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author.slice(0, 1)}
          </Avatar>
        }
        title={author}
        subheader={`Posted on ${day}, at ${time} `}
      />
      <CardContent onClick={handleExpandClick}>
        {content?.map((item, index) => (
          <Typography variant="body2" sx={{ color: "#82959B" }} key={index}>
            {item}
          </Typography>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ color: "white" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <PostComments postID={id} />
          {params?.role === "commentator" && <AddComment postID={id} />}
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
