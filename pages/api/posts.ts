// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import posts from '../../data/posts.json'



interface IPost{
  id:number;
  subject : string;
  body:string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPost[]>
) {
  res.status(200).json(posts)
}
