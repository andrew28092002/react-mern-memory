import { Container } from "@mui/system";
import { Grid, Grow, Paper } from "@mui/material";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "../Pagination/Paginate";
import Search from "./Search";
import { mainContainer, pagination } from "./HomeStyles";
import { useSearchParams } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import { useEffect } from "react";
import { setCurrentPage } from "../../redux/store/slice/searchSlice";

const Home = () => {
  const [params] = useSearchParams();
  const page = params.get("page");
  const { countPages } = useTypedSelector((state) => state.token);
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (page){
      dispatch(setCurrentPage(page))
    }
  }, [page])

  return (
    <Container maxWidth="xl">
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            sx={mainContainer}
            alignItems="stretch"
            spacing={3}
          >
            <Grid item sm={12} md={8} lg={9}>
              <Posts />
            </Grid>
            <Grid item sm={12} md={4} lg={3}>
              <Search />
              <Form />
              {countPages > 1 && (
                <Paper sx={pagination} elevation={6}>
                  <Paginate />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
