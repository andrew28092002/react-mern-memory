import { FC } from "react";
import { useLikePostMutation } from "../../../redux/api/postApi";
import { Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { ThumbUpAltOutlined } from "@mui/icons-material";

type Props = {
  likes: number[];
  userId: number | null;
  postId: number;
};

const Like: FC<Props> = ({ likes, userId, postId }) => {
  const [likePost] = useLikePostMutation();
  const likeColor = userId && likes.includes(userId) ? "error" : "primary";
  const likeCount = likes.length;

  return (
    <Button
      size="small"
      disabled={!postId}
      color={likeColor}
      onClick={() => (postId ? likePost(postId) : "")}
    >
      {likeCount ? (
        <ThumbUpAltIcon fontSize="small" />
      ) : (
        <ThumbUpAltOutlined fontSize="small" />
      )}
      &nbsp;
      {likeCount > 0 ? likeCount : ""}&nbsp; Like
    </Button>
  );
};

export default Like;
