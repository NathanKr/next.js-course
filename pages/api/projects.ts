// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import projects from 'data/projects.json'
import IProject from 'src/types/IProject'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProject[]>
) {
  res.status(200).json(projects)
}
