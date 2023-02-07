import React, { FC } from "react";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TPostFromDB } from "../../../types/post";
import { useTypedDispatch } from "../../../redux/store/store";
import { setUpdatingPost } from "../../../redux/store/slice/updatingPostSlice";

type Props = {
  userId: number | null;
  post: TPostFromDB;
};

const Update: FC<Props> = ({ userId, post }) => {
  const dispatch = useTypedDispatch();

  if (!userId) return <></>;

  return (
    <Button
      style={{ color: "white" }}
      size="medium"
      onClick={() => {
        dispatch(setUpdatingPost(post));
      }}
    >
      <MoreHorizIcon fontSize="small" />
    </Button>
  );
};

export default Update;
