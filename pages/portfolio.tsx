import { AlertColor } from "@mui/material";
import { FC } from "react";
import MasonryImageList from "src/components/gen-ui/MasonaryImageList";
import MuiSnackbar from "src/components/gen-ui/MuiSnackbar";
import IProject from "src/types/IProject";
import { getConcatedRelativeUrlToBaseServer } from "src/utils/server/server-utils";

interface IProps {
  projects: IProject[];
  sevirity: AlertColor;
  message: string;
}

export async function getStaticProps() {
  // -- get projects
  let props: IProps = {
    projects: [],
    sevirity: "success",
    message: "",
  };

  const url = getConcatedRelativeUrlToBaseServer("/api/projects");

  try {
    const response = await fetch(url);
    props.projects = await response.json();
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

const Portfolio: FC<IProps> = ({ projects, sevirity, message }) => {
  return (
    <div>
      <h2>Projects</h2>
      {sevirity != "success" ? (
        <MuiSnackbar
          isOpen={true}
          durationMs={6000}
          sevirity={sevirity}
          message={message}
        />
      ) : null}
      <MasonryImageList projects={projects} />
    </div>
  );
};

export default Portfolio;
