import IComment from "src/types/IComment";

export function isCommentValidIgnoreId(comment: IComment): boolean {
  let isValid;

  try {
    isValid =
      comment.author.length > 0 &&
      comment.description.length > 0 &&
      comment.email.length > 0;
  } catch (error) {
    console.error(error);
    isValid = false;
  }

  return isValid;
}
