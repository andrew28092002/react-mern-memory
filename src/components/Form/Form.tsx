import React, { FC, useState, useEffect } from "react";
import {
  root,
  paper,
  form,
  fileInput,
  buttonSubmit,
  textField,
} from "./FormStyles";
import FileBase from "react-file-base64";
import { Typography, Paper, Button, TextField } from "@mui/material";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../redux/api/postApi";
import { TPostFromClient, TFileBase } from "../../types/post";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import { clearUpdatingPost } from "../../redux/store/slice/updatingPostSlice";
import { MuiChipsInput } from "mui-chips-input";

const Form: FC = () => {
  const user = useTypedSelector((state) => state.token.user);
  const updatingPost = useTypedSelector((state) => state.updatingPost.post);
  const [postData, setPostData] = useState<TPostFromClient>({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (updatingPost) {
      setPostData({
        title: updatingPost?.title,
        message: updatingPost?.message,
        tags: updatingPost?.tags,
        selectedFile: updatingPost?.selectedFile,
      });
    }
  }, [updatingPost]);

  const clear = () => {
    dispatch(clearUpdatingPost(""));
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  const changeData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === 'tags'){
      console.log(e.target.value)
    }
    setPostData((prevPostData) => ({
      ...prevPostData,
      [e.target.name]:
        e.target.name === "tags" ? [] : e.target.value,
    }));
  };

  const changeFileBaseData = (obj: TFileBase) => {
    setPostData({ ...postData, selectedFile: obj.base64 });
  };

  if (!user) {
    return (
      <Paper sx={paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatingPost) {
      createPost({ ...postData, creatorName: user.name });
    } else {
      updatePost({
        id: updatingPost._id,
        updatedFields: postData,
      });
    }
    clear();
  };

  const changeTags = (tags: string[]) => {
    setPostData( prev => ({
      ...prev,
      tags: tags
    }))
  }

  return (
    <Paper sx={paper}>
      <form
        autoComplete="off"
        noValidate
        style={{ ...root, ...form }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {updatingPost ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={changeData}
          sx={textField}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={changeData}
          sx={textField}
        ></TextField>
        {/* <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={changeData}
          sx={textField}
        ></TextField> */}
        <MuiChipsInput 
          value={postData.tags}
          onChange={changeTags}
          fullWidth
          variant='outlined'
          label='Tags'
        />
        <div style={fileInput}>
          <FileBase type="file" multiple={false} onDone={changeFileBaseData} />
        </div>
        <Button
          style={{ marginBottom: "10px" }}
          variant="contained"
          type="submit"
          color="primary"
          size="large"
          fullWidth
        >
          {updatingPost ? "Edit" : "Submit"}
        </Button>
        <Button
          variant="contained"
          sx={buttonSubmit}
          type="reset"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
