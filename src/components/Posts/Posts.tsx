import Post from "./Post/Post";
import { mainContainer } from "./PostsStyles";
import { Grid, CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useGetPostsQuery } from "../../redux/api/postApi";
import { useTypedSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { setCountPages } from "../../redux/store/slice/tokenSlice";

const Posts: FC = () => {
  const search = useTypedSelector((state) => state.search);
  const { data } = useGetPostsQuery(search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCountPages(data.countPages));
    }
  }, [data]);

  
  if (!data) return <CircularProgress />;

  const posts = data.posts;

  return (
    <>
      <Grid sx={mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
