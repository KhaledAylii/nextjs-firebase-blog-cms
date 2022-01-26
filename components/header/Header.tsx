import styles from "../../styles/Home.module.css";
import { config } from "../../webapp-config";
import { FlashingCursor } from "../flashingCursor/flashingCursor";
import { Nav } from "../nav/Nav";

export const Header = ({}) => {
  return (
    <div className={styles.header}>
      <FlashingCursor className={styles.title} cursorSize={5}>
        {config.headerTitle}
      </FlashingCursor>
      <Nav />
    </div>
  );
};
