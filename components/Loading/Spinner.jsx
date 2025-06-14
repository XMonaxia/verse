import styles from "@/style/Loading/Spinner.module.css";
export default function Spinner() {
  return (
    <div className={styles.barcon}>
      <p className={styles.ext}>
        <span className={styles.dot}>W</span>
        <span className={styles.dot}>a</span>
        <span className={styles.dot}>i</span>
        <span className={styles.dot}>t</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
      </p>
      <div className={styles.barloader}></div>
    </div>
  );
}
