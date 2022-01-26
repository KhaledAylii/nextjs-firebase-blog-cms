import styles from "../../styles/Home.module.css";
export const Footer = () => {
  return (
    <div className={styles.footer}>
      ©️ copyright khaled ali 2022 - fork this website (it&apos;s got a full cms
      to edit/create content out of the box) and use for free on{" "}
      <a
        className={styles.rainbowText}
        href="https://github.com/KhaledAylii/nextjs-firebase-blog-cms"
        target="_blank"
        rel="noreferrer"
      >{` github`}</a>
    </div>
  );
};
