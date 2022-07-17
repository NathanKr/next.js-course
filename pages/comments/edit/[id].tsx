import { AlertColor, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import path from "path";
import React, { FC, SyntheticEvent, useState } from "react";
import MuiSnackbar from "src/components/gen-ui/MuiSnackbar";
import IComment from "src/types/IComment";
import { getServerAbsoluteUrl } from "src/utils/server/server-utils";

interface IProps {
  details: IComment | null;
  sevirity: AlertColor;
  message: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as any;
  let props: IProps = {
    details: null,
    sevirity: "error",
    message: "",
  };

  if (id) {
    const url = path.join(getServerAbsoluteUrl(), `/api/comments/${id}`);

    try {
      const response = await fetch(url);
      props.details = await response.json();
      props.sevirity = "success";
    } catch (error) {
      props.sevirity = "error";
      props.message = "Fetch error";
      console.error(error);
    }
  }

  return {
    props, // will be passed to the page component as props
  };
};

const CommentEdit: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sevirity,setSevirity] = useState(props.sevirity);
  const [message,setMessage] = useState(props.message);
  const {details} = props;

  function editComment(evt: SyntheticEvent): void {
    evt.preventDefault();
    const id = details ? details.id : -1;
    const form = evt.target as any;
    let commentToEdit: IComment = {
      author: form.author.value,
      email: form.email.value,
      description: form.description.value,
      id,
    };
    sendEditCommentToServer(commentToEdit);
  }

  async function sendEditCommentToServer(commentToEdit: IComment) {
    setIsOpen(false);
    try {
      const response = await axios.patch(
        `/api/comments/${commentToEdit.id}`,
        commentToEdit
      );
      await response.data;
      setSevirity("success");
      setMessage("Comment is edited");
      setIsOpen(true);
    } catch (error) {
      setSevirity("error");
      setMessage("Comment is not edited");
      setIsOpen(true);
      console.error(error);
    }
  }

  const elemSnackBar = (
    <MuiSnackbar
      isOpen={true}
      durationMs={6000}
      sevirity={sevirity}
      message={message}
    />
  );

  const elemForm = (
    <form onSubmit={editComment}>
      <Stack spacing={2}>
        <TextField
          required
          name="author"
          label="Author"
          defaultValue={details ? details.author : ""}
        />
        <TextField
          required
          type="email"
          name="email"
          label="Email"
          defaultValue={details ? details.email : ""}
        />
        <TextField
          required
          name="description"
          label="Description"
          defaultValue={details ? details.description : ""}
        />
        <Button variant="contained" type="submit">
          Edit Comment
        </Button>
      </Stack>
    </form>
  );

  return (
    <>
      {elemForm}
      {isOpen || sevirity != "success" ? elemSnackBar : ""}
    </>
  );
};

export default CommentEdit;
