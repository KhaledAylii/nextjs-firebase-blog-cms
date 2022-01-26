import { Post } from "../../hooks/usePosts";
import { BlogCard } from "./blogCard/BlogCard";
import styles from "./BlogCollection.module.css";

export const BlogCollection = ({ posts }: { posts: Post[] }) => {
  return (
    <div className={styles.container}>
      {Object.entries(posts)?.map(([postId, post]) => {
        if (postId === "home") return;
        return <BlogCard post={post} postId={postId} key={post.title} />;
      })}
    </div>
  );
};
