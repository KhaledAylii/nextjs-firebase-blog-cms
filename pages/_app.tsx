import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../webapp-config";

function MyApp({ Component, pageProps }) {
  initializeApp(firebaseConfig);

  return <Component {...pageProps} />;
}

export default MyApp;
