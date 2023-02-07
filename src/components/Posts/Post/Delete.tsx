import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC } from "react";
import { useDeletePostMutation } from "../../../redux/api/postApi";

type Props = {
  userId: number | null;
  postId: number;
};

const Delete: FC<Props> = ({ userId, postId }) => {
  const [deletePost] = useDeletePostMutation();
  if (!userId) return <></>;

  return (
    <Button size="small" color="primary" onClick={() => deletePost(postId)}>
      <DeleteIcon fontSize="small" />
      Delete
    </Button>
  );
};

export default Delete;
