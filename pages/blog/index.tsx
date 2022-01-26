import Head from "next/head";
import { BlogCollection } from "../../components/blogCollection/BlogCollection";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import styles from "../../styles/Blogs.module.css";
import { config } from "../../webapp-config";

export default function BlogPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{config.metaTitleBlog}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.body}>
        <BlogCollection />
      </div>
      <Footer />
    </div>
  );
}
