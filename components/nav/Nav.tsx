import { useRouter } from "next/router";
import styles from "./Nav.module.css";
export interface NavBarOption {
  text: string;
  path: string;
}

const defaultNavbarOptions: NavBarOption[] = [
  {
    text: "home",
    path: "/",
  },
  {
    text: "blog",
    path: "/blog",
  },
];
export const Nav = ({ options = defaultNavbarOptions }) => {
  const router = useRouter();

  return (
    <div className={styles.navbarContainer}>
      {options.map((option) => (
        <a
          className={`${styles.navbarButton} ${
            router.pathname === option.path ? styles.navbarButtonSelected : ""
          }`}
          key={option.path}
          href={option.path}
        >
          {option.text}
        </a>
      ))}
    </div>
  );
};
