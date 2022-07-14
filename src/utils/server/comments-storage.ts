import fs from "fs";
import path from "path";
import comments from "data/comments.json";
import IComment from "src/types/IComment";
import ICommentShort from "src/types/ICommentShort";

export function deleteComment(id: number) : boolean {
  const indexFound : number = comments.findIndex(comment => comment.id == id);

  if(indexFound < 0){
    return false;
  }

  comments.splice(indexFound,1);
  saveComments();
  return true;
}

export function getComment(id: number): IComment | undefined {
  return getComments().find((it) => it.id == id);
}

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
