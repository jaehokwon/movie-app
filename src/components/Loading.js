import styles from "./Loading.module.css";
import SyncLoader from "react-spinners/SyncLoader";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__inner}>
        <SyncLoader color="black" size={35} />
      </div>
    </div>
  );
}

export default Loading;