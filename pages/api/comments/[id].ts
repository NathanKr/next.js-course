// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteComment, getComment } from "src/utils/server/comments-storage";



export default function handleCommentWithId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  

  switch (req.method) {
    case 'GET':
      const comment = getComment(id);
      comment ? res.status(200).json(comment) :  res.status(404).send("");
      break;
  
    case 'DELETE':
      const isDelete = deleteComment(id);
      isDelete ?  res.status(200).send("") :  res.status(404).send("");
    break;

    default:
      throw `Unexpected request method : ${req.method}`;
  }

}
