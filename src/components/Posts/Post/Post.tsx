import {
  card,
  media,
  overlay,
  overlay2,
  details,
  title,
  cardActions,
  cardAction,
} from "./PostStyles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from "@mui/material";
import { TPostFromDB } from "../../../types/post";
import { FC } from "react";
import moment from "moment";
import { useTypedSelector } from "../../../redux/store/store";
import Like from "./Like";
import Delete from "./Delete";
import Update from "./Update";
import { useNavigate } from "react-router-dom";

type Props = {
  post: TPostFromDB;
};

const Post: FC<Props> = ({ post }) => {
  const user = useTypedSelector((state) => state.token.user);
  const id = user ? ("googleId" in user ? user.googleId : user._id) : null;
  const navigate = useNavigate()

  const openPost = () => {
    navigate(`/react-mern-memory/posts/${post._id}`)
  }
  return (
    <Card sx={card}>
      <ButtonBase sx={cardAction} onClick={openPost}>
        <CardMedia
          sx={media}
          image={post.selectedFile}
          title={post.title}
          component="div"
        />
        <div style={overlay}>
          <Typography variant="h6">{post.creatorName}</Typography>

          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div style={overlay2} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <Update
            userId={id && (String(id) === post.creatorId ? id : null)}
            post={post}
          />
        </div>
        <div style={details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography sx={title} variant="h5" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" component="p" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions sx={cardActions}>
        <Like likes={post?.likes} userId={id} postId={post._id} />
        <Delete
          userId={id && (String(id) === post.creatorId ? id : null)}
          postId={post._id}
        />
      </CardActions>
    </Card>
  );
};

export default Post;
