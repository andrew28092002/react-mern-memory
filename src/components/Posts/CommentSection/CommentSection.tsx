import { Typography, TextField, Button, Paper } from "@mui/material";
import { useState, useRef, FC, useEffect } from "react";
import {
  commentsOuterContainer,
  commentsInnerContainer,
} from "./CommentSectionStyles";
import { useCommentPostMutation } from "../../../redux/api/postApi";
import { TPostFromDB } from "../../../types/post";
import { useTypedSelector } from "../../../redux/store/store";
import { useNavigate } from "react-router-dom";

type Props = {
  post: TPostFromDB;
};

const CommentSection: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");
  const commentsRef = useRef<HTMLDivElement>(null);
  const [commentPost] = useCommentPostMutation();
  const user = useTypedSelector((state) => state.token.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setComments(post.comments);
    }
  }, [post]);

  if (!user)
    return (
      <Paper
        elevation={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button onClick={() => navigate("/react-mern-memory/auth")}>Log In to Comment</Button>
      </Paper>
    );

  const handleComment = async () => {
    const finalComment = `${user.name}: ${comment}`;

    const newPost = await commentPost({
      id: post._id,
      comment: finalComment,
    })

    if (commentsRef && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (newPost && 'data' in newPost){
      setComments(newPost.data.comments)
    }

    setComment("");
  };
  return (
    <div>
      <div style={commentsOuterContainer}>
        <div style={commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
