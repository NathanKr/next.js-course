import { AlertColor, Tooltip } from "@mui/material";
import path from "path";
import { FC, useState } from "react";
import MuiSnackbar from "src/components/gen-ui/MuiSnackbar";
import ICommentShort from "src/types/ICommentShort";
import {
  getConcatedRelativeUrlToBaseServer,
  isProduction,
} from "src/utils/server/server-utils";
import styles from "styles/comments.module.css";

import {
  AiOutlineFileAdd,
  AiOutlineDelete,
  AiOutlineInfoCircle,
  AiFillEdit,
} from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import DialogYesNo from "src/components/gen-ui/DialogYesNo";

interface IMessageDetails {
  sevirity: AlertColor;
  message: string;
}

interface IProps {
  commentsShort: ICommentShort[];
  messageDetails: IMessageDetails;
}
export async function getServerSideProps() {
  let props: IProps = {
    commentsShort: [],
    messageDetails: { sevirity: "success", message: "" },
  };
  // -- get comments

  const url = getConcatedRelativeUrlToBaseServer("/api/comments");
  console.log(url);

  try {
    const response = await fetch(url);
    props.commentsShort = await response.json();
    props.messageDetails.sevirity = "success";
  } catch (error) {
    props.messageDetails.sevirity = "error";
    props.messageDetails.message = "Fetch error";
    console.error(error);
  }

  return {
    props, // will be passed to the page component as props
  };
}

// SSR - get comments short
// CSR - delete

const Comments: FC<IProps> = (props) => {
  const [commentsShort, setcommentsShort] = useState<ICommentShort[]>(
    props.commentsShort
  );
  const [messageDetails, setMessageDetails] = useState<IMessageDetails>(
    props.messageDetails
  );
  const { sevirity, message } = messageDetails;

  function deleteComment(id: number): void {
    axios
      .delete(`/api/comments/${id}`)
      .then(function (response) {
        setMessageDetails({
          sevirity: "success",
          message: "Message delete is success",
        });
        const tempCommentsShort = commentsShort.filter(
          (comment) => comment.id != id
        );
        setcommentsShort(tempCommentsShort);
      })
      .catch(function (error) {
        console.error(error);
        setMessageDetails({
          sevirity: "error",
          message: "Message delete is failure",
        });
      });
  }

  const elems = commentsShort.map((it, i) => (
    <div className={styles.grid_container} key={i}>
      <span>{it.description}</span>
      {!isProduction() ? (
        <DialogYesNo
          dialogTitle="Are you sure you want to delete this comment ?"
          dialogContent="You can not recover this operation"
          yes="Agree"
          yesClickHandler={() => {
            deleteComment(it.id);
          }}
          no="Disagree"
          noClickHandler={() => {
            console.log("clicked no");
          }}
        >
          <Tooltip title="Delete comment">
            <a>
              <AiOutlineDelete />
            </a>
          </Tooltip>
        </DialogYesNo>
      ) : null}
      {!isProduction() ? (
        <Link href={`/comments/edit/${it.id}`}>
          <Tooltip title="Edit comment">
            <a>
              <AiFillEdit />
            </a>
          </Tooltip>
        </Link>
      ) : null}

      <Link href={`/comments/${it.id}`}>
        <Tooltip title="Comment details">
          <a>
            <AiOutlineInfoCircle />
          </a>
        </Tooltip>
      </Link>
    </div>
  ));

  return (
    <div className={styles.comments}>
      <h2>Comments</h2>
      <Link href="/comments/create">
        <Tooltip title="Add comment">
          <a>
            <AiOutlineFileAdd />
          </a>
        </Tooltip>
      </Link>

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
