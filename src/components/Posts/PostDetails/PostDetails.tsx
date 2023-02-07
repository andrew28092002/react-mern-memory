import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Container,
} from "@mui/material";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetOnePostQuery,
  useGetPostsQuery,
} from "../../../redux/api/postApi";
import {
  card,
  imageSection,
  section,
  media,
  loadingPaper,
  recommendedPostsStyles,
} from "./PostDatailsStyles";
import CommentSection from "../CommentSection/CommentSection";
import { useTypedSelector } from "../../../redux/store/store";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const search = useTypedSelector((state) => state.search);
  const { data, isLoading } = useGetOnePostQuery(id || "");
  const { data: allData, isLoading: isLoading2 } = useGetPostsQuery(search);

  if (isLoading || isLoading2)
    return (
      <Paper elevation={6} sx={loadingPaper}>
        <CircularProgress size="3em" />
      </Paper>
    );
  if (!data || !allData)
    return (
      <Paper elevation={6} sx={loadingPaper}>
        <Typography>No Post with current ID</Typography>
      </Paper>
    );
  const post = data.post;
  const posts = allData.posts;

  const recommendedPosts = posts
    .filter(({ _id }) => _id !== post._id)
    .filter((post, index) => {
      if (index < 4) {
        return post;
      }
    });

  const openPost = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <Container sx={card}>
        <Container sx={section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post.creatorName}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${post.creatorName}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </Container>
        <Container sx={imageSection}>
          <img
            style={media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </Container>
      </Container>
      {!!recommendedPosts.length && (
        <Container sx={section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Container sx={recommendedPostsStyles}>
            {recommendedPosts.map(
              ({ title, creatorName, message, likes, selectedFile, _id }) => (
                <Container
                  style={{
                    margin: "20px",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {creatorName}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </Container>
              )
            )}
          </Container>
        </Container>
      )}
    </Paper>
  );
};

export default PostDetails;
