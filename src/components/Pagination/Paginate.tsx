import { Pagination, PaginationItem } from "@mui/material";
import { FC} from "react";
import { Link,} from "react-router-dom";
import { useTypedSelector, useTypedDispatch } from "../../redux/store/store";
import { ul } from "./PaginationStyles";

const Paginate: FC = () => {
  const countPages = useTypedSelector((state) => state.token.countPages);
  const page = useTypedSelector(state => state.search.currentPage)

  return (
    <Pagination
      sx={{ul: ul}}
      count={countPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
