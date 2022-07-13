import fs from "fs";
import path from "path";
import comments from "data/comments.json";
import IComment from "src/types/IComment";
import ICommentShort from "src/types/ICommentShort";

export function getCommentsShort(): ICommentShort[] {
  return comments.map((comment) => {
    const { id, description } = comment;
    return { id, description };
  });
}

export function getComments(): IComment[] {
  return comments;
}

export function saveComments(): void {
  const data = JSON.stringify(comments);
  fs.writeFileSync(path.join("data", "comments.json"), data);
}

export function addComment(newComment: IComment): void {
  comments.push(newComment);
}
