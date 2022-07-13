import { AlertColor, Button, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import IComment from "src/types/IComment";
import axios from 'axios'
import MuiSnackbar from "src/components/gen-ui/MuiSnackbar";

const CommentCreate = () => {
    const [isOpen,setIsOpen]=useState(false);
    let sevirity : AlertColor = 'error';
    let message : string = '';

    async function sendNewCommentToServer(comment : IComment){
        try {
            const response = await axios.post('/api/comments',comment);
            await response.data;
            sevirity = 'success';
            message = 'Comment is created'
            setIsOpen(true);
        } catch (error) {
            sevirity = 'error';
            message = 'Comment is not created';
            setIsOpen(true);
            console.error(error);
        }
    }

    function addComment(evt : SyntheticEvent) : void{
        evt.preventDefault();
        const form = evt.target as any;
        let comment : IComment = {
            author: form.author.value,
            email: form.email.value,
            description: form.description.value,
            id : -1
        };
        setIsOpen(false);
        sendNewCommentToServer(comment);
        (form as HTMLFormElement).reset();
    }

  return (
    <div>
      <form onSubmit={addComment}>
        <Stack spacing={2}>
          <TextField required name="author" label="Author" />
          <TextField required name="email" label="Email" />
          <TextField required name="description" label="Description" />
          <Button variant="contained" type="submit">Add Comment</Button>
        </Stack>
      </form>
      <MuiSnackbar isOpen={isOpen} durationMs={6000} sevirity={sevirity} message={message}/>
    </div>
  );
};

export default CommentCreate;
