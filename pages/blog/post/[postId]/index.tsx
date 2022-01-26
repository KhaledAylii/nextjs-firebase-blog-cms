import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import styles from "../../../../styles/Post.module.css";
import { Footer } from "../../../../components/footer/Footer";
import { firebaseConfig } from "../../../../webapp-config";

export default function PostPage({ post }) {
  return (
    <div className={styles.container}>
      <a className={styles.backBtn} href={"/blog"}>
        back
      </a>
      <div
        className={styles.coverImage}
        style={{
          backgroundImage: `url(${post.imageURL})`,
          display: post.imageURL ? "block" : "none",
        }}
      />
      <h1>{post.title}</h1>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  try {
    initializeApp(firebaseConfig);
    const db = getDatabase();
    console.log("prms", params.postId);
    const myRef = ref(db, `posts/${params.postId}`);
    const post = await (await get(myRef)).val();

    return { props: { post, key: params.postId }, revalidate: 60 };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticPaths() {
  try {
    initializeApp(firebaseConfig);
    const db = getDatabase();
    const myRef = ref(db, "posts/");
    const data = await get(myRef);
    const paths = Object.keys(data.val() || {}).map((id) => ({
      params: { postId: id },
    }));
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
    return { paths: [], fallback: false };
  }
}
