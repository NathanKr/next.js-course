import { AlertColor } from "@mui/material";
import path from "path";
import { FC } from "react";
import MuiSnackbar from "src/components/gen-ui/MuiSnackbar";
import ICommentShort from "src/types/ICommentShort";
import { getServerAbsoluteUrl } from "src/utils/server/server-utils";
import styles from "styles/comments.module.css";

import {
  AiOutlineFileAdd,
  AiOutlineDelete,
  AiOutlineInfoCircle,
  AiFillEdit,
} from "react-icons/ai";
import Link from "next/link";

interface IProps {
  commentsShort: ICommentShort[];
  sevirity: AlertColor;
  message: string;
}
export async function getServerSideProps() {
  let props: IProps = {
    commentsShort: [],
    sevirity: "success",
    message: "",
  };
  // -- get comments

  const url = path.join(getServerAbsoluteUrl(), "/api/comments");

  try {
    const response = await fetch(url);
    props.commentsShort = await response.json();
    props.sevirity = "success";
  } catch (error) {
    props.sevirity = "error";
    props.message = "Fetch error";
    console.error(error);
  }

  return {
    props, // will be passed to the page component as props
  };
}

const Comments: FC<IProps> = ({ commentsShort, sevirity, message }) => {
  const elems = commentsShort.map((it, i) => (
    <div className={styles.grid_container} key={i}>
      <span>{it.description}</span>
      <AiOutlineDelete />
      <AiFillEdit />
      <Link href={`/comments/${it.id}`}>
        <AiOutlineInfoCircle />
      </Link>
    </div>
  ));

  return (
    <div className={styles.comments}>
      <h2>Comments</h2>
      <AiOutlineFileAdd />
      {elems}
      {sevirity != "success" ? (
        <MuiSnackbar
          isOpen={true}
          durationMs={6000}
          sevirity={sevirity}
          message={message}
        />
      ) : null}
    </div>
  );
};

export default Comments;
