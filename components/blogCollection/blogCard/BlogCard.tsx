import Image from "next/image";
import { useRouter } from "next/router";
import { Post } from "../../../hooks/usePosts";
import styles from "./BlogCard.module.css";

export const BlogCard: React.FC<{ post: Post; postId: string }> = ({
  post,
  postId,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`blog/post/${postId}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={styles.backgroundPhoto}
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${post.imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className={styles.textSection}>{post.title}</div>
    </div>
    // <div className={styles.flipCard} onClick={handleClick}>
    //   <div className={styles.flipCardInner}>
    //     <div className={styles.flipCardFront}>
    //       <div className={styles.textSection}>
    //         <span className={styles.title}>{post.title}</span>
    //       </div>
    //     </div>
    //     <div className={styles.flipCardBack}>
    //       <div
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //           backgroundImage: `url(${post.imageURL})`,
    //           backgroundSize: "cover",
    //           backgroundPosition: "center",
    //         }}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};
