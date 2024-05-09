import { useEffect } from "react";
import styles from "./MyInfo.module.css";
import { track } from "@amplitude/analytics-browser";

function MyInfo({ name, email, stu_id }) {
  useEffect(() => {
    track("view_mypage");
  }, []);
  return (
    <div className={styles.inforow}>
      <div className={styles.rowname}>
        <span className={styles.rowtitle}>이름</span>
        <span className={styles.text}>{name}</span>
      </div>
      <div className={styles.rowemail}>
        <span className={styles.rowtitle}>이메일</span>
        <span className={styles.text}>{email}</span>
      </div>
      <div className={styles.rowid}>
        <span className={styles.rowtitle}>학번</span>
        <span className={styles.text}>{stu_id}</span>
      </div>
    </div>
  );
}

export default MyInfo;
