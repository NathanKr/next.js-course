// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import IComment from "src/types/IComment";
import {
  deleteComment,
  editComment,
  getComment,
} from "src/utils/server/comments-storage";
import { isCommentValidIgnoreId } from "src/utils/server/validation";

export default function handleCommentWithId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  switch (req.method) {
    case "GET":
      {
        const comment = getComment(id);
        comment ? res.status(200).json(comment) : res.status(404).send("");
      }
      break;

    case "DELETE":
      const isDelete = deleteComment(id);
      isDelete ? res.status(200).send("") : res.status(404).send("");
      break;

    case "PATCH":
      {
        const comment: IComment = req.body;
        if (comment.id != id || !isCommentValidIgnoreId(comment)) {
          return res.status(400).send("");
        }

        const isEditOk = editComment(comment);
        isEditOk ? res.status(200).send("") : res.status(404).send("");
      }

      break;

    default:
      throw `Unexpected request method : ${req.method}`;
  }
}
