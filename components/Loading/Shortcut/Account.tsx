import React from "react";
import styles from "@/style/Loading/Shortcut/Account.module.css";

const AccountSkeleton: React.FC = () => {
  return (
    <div className="relative flex-col w-100 gap-1 radius-10-custom">
      <div className={styles.accountTop}>
        <div className={styles.accountImage} />
        <div className={styles.accountStats}>
          <h2 className={styles.title} />
          <div className={styles.stats}>
            <div className={styles.statsinfo} />
            <div className={styles.statsinfo} />
          </div>
          <div className={styles.actions}>
            <div className={styles.actionsButton} />
            <div className={styles.actionsButton} />
          </div>
        </div>
      </div>
      <div className={styles.books}>
        <div className={styles.booksInfo} />
        <div className={styles.bookListDescripsi} />
        <div className={styles.bookListDescripsi} />
        <div className={styles.bookListDescripsi} />
      </div>
    </div>
  );
};

export default AccountSkeleton;
