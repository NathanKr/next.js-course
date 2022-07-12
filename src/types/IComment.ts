import ICommentShort from "./ICommentShort";

export default interface IComment extends ICommentShort{
    // description : string; got from ICommentShort
    author : string;
    email : string;
    // id : number;  got from ICommentShort
}