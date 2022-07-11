import { FC } from "react";
import SimpleAccordion, {
  ISimpleAccordionItem,
} from "../src/components/gen-ui/SimpleAccordion";
import IPost from "../src/types/IPost";
import path from "path";
import { getServerAbsoluteUrl } from "../src/utils/server/server-utils";
import MuiSnackbar from "../src/components/gen-ui/MuiSnackbar";
import { AlertColor } from "@mui/material";

export async function getStaticProps() {
  // -- get posts
  let posts: IPost[] = [];
  const url = path.join(getServerAbsoluteUrl(), "/api/posts");
  let sevirity : AlertColor;
  let message : string = "";

  try {
    const response = await fetch(url);
    posts = await response.json();
    sevirity = 'success'
  } catch (error) {
    sevirity = 'error';
    message = 'Fetch error'
    console.error(error);
  }

  return {
    props: { posts ,sevirity, message}, // will be passed to the page component as props
  };
}

interface IProps {
  posts: IPost[];
  sevirity : AlertColor;
  message : string;
}

const Blog: FC<IProps> = ({ posts ,sevirity, message}) => {
  const items: ISimpleAccordionItem[] = posts.map((post) => {
    return { summary: post.subject, details: post.body };
  });

  

  return (
    <div>
      <h2>Posts</h2>
      {(sevirity != 'success') ? <MuiSnackbar
        isOpen={true}
        durationMs={6000}
        sevirity={sevirity}
        message={message}/> : null}
      
      <SimpleAccordion items={items} />
    </div>
  );
};

export default Blog;
