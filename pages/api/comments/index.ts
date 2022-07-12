// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import comments from "../../../data/comments.json";
import ICommentShort from "../../../src/types/ICommentShort";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICommentShort[]>
) {
  let commentsShort: ICommentShort[] = comments.map((comment) => {
    const { id, description } = comment;
    return { id, description };
  });
  
  res.status(200).json(commentsShort);
}
