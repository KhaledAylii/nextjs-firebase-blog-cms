import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../webapp-config";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  initializeApp(firebaseConfig);
  const router = useRouter();
  const { state } = router.query;
  if (state) {
    const url = new URL(window.location.href);
    const access_token = url.hash
      .match(/access_token=[\w\d]*/)[0]
      ?.split("=")[1];
    switch (state) {
      case "new":
        router.push(`/blog/post/new?access_token=${access_token}`);
        break;
      default:
        router.push(`/blog/post/${state}/edit?access_token=${access_token}`);
        break;
    }
  }
  return <Component {...pageProps} />;
}

export default MyApp;
