// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ICommentShort from "src/types/ICommentShort";
import { addComment, getCommentsShort, saveComments } from "src/utils/server/comments-storage";
import { isCommentValidIgnoreId } from "src/utils/server/validation";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
switch (req.method) {
  case 'GET':
    let commentsShort: ICommentShort[] = getCommentsShort().map((commentShort) => {
      const { id, description } = commentShort;
      return { id, description };
    });
    
    res.status(200).json(commentsShort);
    break;

  case 'POST':
    const newComment = req.body;
    if(!isCommentValidIgnoreId(newComment)){
      return res.status(400).send('')
    }

    newComment.id = Date.now();
    addComment(newComment);
    saveComments();
    res.status(201).send(newComment);
  break;

  default:
    throw `Unexpected request method : ${req.method}`
}
 
}
