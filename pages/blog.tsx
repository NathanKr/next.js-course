import { useEffect, useState } from "react";
import SimpleAccordion, {
  ISimpleAccordionItem,
} from "../src/components/gen-ui/SimpleAccordion";
import IPost from "../src/types/IPost";

const Blog = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(getPosts, []);

  function getPosts() {
    const url = "/api/posts";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }
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
