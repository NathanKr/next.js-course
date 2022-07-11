import { FC } from "react";
import SimpleAccordion, {
  ISimpleAccordionItem,
} from "../src/components/gen-ui/SimpleAccordion";
import IPost from "../src/types/IPost";
import path from "path";
import { getServerAbsoluteUrl } from "../src/utils/server/server-utils";

export async function getStaticProps() {
  // -- get posts
  let posts: IPost[] = [];
  const url = path.join(getServerAbsoluteUrl(), "/api/posts");

  try {
    const response = await fetch(url);
    posts = await response.json();
  } catch (error) {
    console.error(error);
  }

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

interface IProps {
  posts: IPost[];
}

const Blog: FC<IProps> = ({ posts }) => {
  const items: ISimpleAccordionItem[] = posts.map((post) => {
    return { summary: post.subject, details: post.body };
  });

  return (
    <div>
      <h2>Posts</h2>
      <SimpleAccordion items={items} />
    </div>
  );
};

export default Blog;
