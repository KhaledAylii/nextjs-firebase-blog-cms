import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import styles from "../../../../styles/Post.module.css";
import { Footer } from "../../../../components/footer/Footer";
import { config, firebaseConfig } from "../../../../webapp-config";
import { mockPosts } from "../../../../hooks/usePosts";
import ReactMarkdown from "react-markdown";

export default function PostPage({ post }) {
  return (
    <div className={styles.container}>
      <a className={styles.backBtn} href={"/blog"}>
        back
      </a>
      {!post?.shouldHideCover && (
        <div
          className={styles.coverImage}
          style={{
            backgroundImage: `url(${post?.imageURL})`,
            display: post?.imageURL ? "block" : "none",
          }}
        />
      )}
      <div className={styles.articleContainer}>
        <h1>{post?.title}</h1>
        <ReactMarkdown className={styles.body}>{post?.body}</ReactMarkdown>
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const myRef = ref(db, `posts/${params.postId}`);
  const post = config.isDemo
    ? mockPosts.find((post) => post.postId == params.postId) || null
    : await (await get(myRef)).val();

  return { props: { post, key: params.postId }, revalidate: 60 };
}

export async function getStaticPaths() {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const myRef = ref(db, "posts/");
  const data = await get(myRef);
  const paths = config.isDemo
    ? mockPosts.map(({ postId }) => ({ params: { postId: `${postId}` } }))
    : Object.keys(data.val() || {}).map((id) => ({
        params: { postId: id },
      }));
  return { paths, fallback: "blocking" };
}
