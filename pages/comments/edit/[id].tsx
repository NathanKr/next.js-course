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

const CommentEdit: FC<IProps> = ({ details, sevirity, message }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    try {
      const response = await axios.patch(
        `/api/comments/${commentToEdit.id}`,
        commentToEdit
      );
      await response.data;
      sevirity = "success";
      message = "Comment is edited";
      setIsOpen(true);
    } catch (error) {
      sevirity = "error";
      message = "Comment is not edited";
      setIsOpen(true);
      console.error(error);
    }
  }

  return isOpen  || sevirity != "success" || !details ? 
     (
      <MuiSnackbar
        isOpen={true}
        durationMs={6000}
        sevirity={sevirity}
        message={message}
      />
    ) 
   : (
    <form onSubmit={editComment}>
      <Stack spacing={2}>
        <TextField
          required
          name="author"
          label="Author"
          defaultValue={details.author}
        />
        <TextField
          required
          type="email"
          name="email"
          label="Email"
          defaultValue={details.email}
        />
        <TextField
          required
          name="description"
          label="Description"
          defaultValue={details.description}
        />
        <Button variant="contained" type="submit">
          Edit Comment
        </Button>
      </Stack>
    </form>
  )
};

export default CommentEdit;
