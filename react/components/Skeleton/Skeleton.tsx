import { CSSProperties } from "react";
import styles from "./Skeleton.css";

const Skeleton = (props: CSSProperties) => {
  return <div style={{ ...props }} className={styles.skeleton}></div>;
};

export default Skeleton;
