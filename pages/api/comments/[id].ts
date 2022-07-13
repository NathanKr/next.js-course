// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import IComment from "src/types/IComment";
import { getComments } from "src/utils/server/comments-storage";

function getComment(id: number): IComment | undefined {
  return getComments().find((it) => it.id == id);
}

export default function handleCommentWithId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  const comment = getComment(id);

  comment ? res.status(200).json(comment) :  res.status(404).send("");
}
