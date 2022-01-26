import { get, getDatabase, ref } from "firebase/database";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Divider } from "../components/divider/Divider";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import styles from "../styles/Home.module.css";
import { config } from "../webapp-config";

export default function Home() {
  const [body, setBody] = useState("");
  useEffect(() => {
    const db = getDatabase();
    const homeRef = ref(db, "posts/home");
    get(homeRef).then((snapshot) => {
      setBody(snapshot.val()?.body || "");
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>{config.metaTitleHome}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
      <Footer />
    </div>
  );
}
