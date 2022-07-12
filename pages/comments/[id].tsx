import { AlertColor, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import path from "path";
import { FC } from "react";
import MuiSnackbar from "src/components/gen-ui/MuiSnackbar";
import IComment from "src/types/IComment";
import { getServerAbsoluteUrl } from "src/utils/server/server-utils";

interface IProps {
  details: IComment | null;
  sevirity: AlertColor;
  message: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as any;
  let props: IProps = {
    details: null,
    sevirity: "success",
    message: "",
  };

  if (id) {
    const url = path.join(getServerAbsoluteUrl(), `/api/comments/${id}`);

    try {
      const response = await fetch(url);
      props.details = await response.json();
      props.sevirity = "success";
    } catch (error) {
      props.sevirity = "error";
      props.message = "Fetch error";
      console.error(error);
    }
  }

  return {
    props, // will be passed to the page component as props
  };
};

const CommentDetails: FC<IProps> = ({ details, sevirity, message }) => {
  //   const router = useRouter();
  //   const { id } = router.query;
  //   console.log(`id : ${id}`);

  if (sevirity != "success") {
    return (
      <MuiSnackbar
        isOpen={true}
        durationMs={6000}
        sevirity={sevirity}
        message={message}
      />
    );
  }

  if (!details) {
    return <div>Comment is not defined ...</div>;
  }

  return (
    <div>
      CommentDetails
      <span>{details.id}</span>
      <span>{details.author}</span>
      <span>{details.email}</span>
      <span>{details.description}</span>
    </div>
  );
};

export default CommentDetails;
