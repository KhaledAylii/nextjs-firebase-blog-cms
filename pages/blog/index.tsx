import Head from "next/head";
import { BlogCollection } from "../../components/blogCollection/BlogCollection";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { getPosts } from "../../hooks/usePosts";
import styles from "../../styles/Blogs.module.css";
import { config } from "../../webapp-config";

export default function BlogPage({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{config.metaTitleBlog}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.body}>
        <BlogCollection posts={posts} />
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let result = {
    props: {
      posts: {},
    },
    revalidate: 10,
  };
  await getPosts()
    .then((posts) => {
      result = {
        props: {
          posts,
        },
        revalidate: 10,
      };
    })
    .catch();
  return result;
}
