"use client";
import { useAuth } from "@/components/Provider/AuthWrapper";
import styles from "@/style/Combobox/ComboBoxMenu.module.css";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
type UserMenuProps = {
  onClose: () => void;
  onLogoutSuccess: () => void;
  setShowModal: (show: boolean) => void;
  setActiveModalTabIndex: (index: number) => void;
};
const UserMenu = ({
  onClose,
  setShowModal,
  setActiveModalTabIndex,
  onLogoutSuccess,
}: UserMenuProps) => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "DELETE" });
      onClose();
      onLogoutSuccess();
      router.push("/");
      toast.success("Logout berhasil", {
        style: {
          background: "rgb(0, 70, 70)",
          color: "rgb(240, 240, 240)",
          borderRadius: "0 10px 0 10px",
        },
        duration: 5000,
        icon: "↩️",
      });
    } catch (error) {
      console.error("Logout gagal:", error);
      toast.error(`Logout gagal: ${error}`, {
        style: {
          background: "rgb(255, 0, 0)",
          color: "rgb(240, 240, 240)",
          borderRadius: "0 10px 0 10px",
        },
        duration: 5000,
        icon: "❌",
      });
    }
  };
  return (
    <div className={styles.combobox}>
      <div className={styles.comboboxmenu}>
        <div className={styles.useinfo}>
          <p>Hallo, {user?.username}</p>
        </div>
        <div className={styles.menuUser}>
          <button className={styles.menuItem}>Profile</button>
          {isLoggedIn && user?.role === "Admin" && (
            <>
              <Link href="/dashboard" className={styles.menuItem}>
                Dashboard
              </Link>
              <button className={styles.menuItem}>
                Create Article <span className={styles.iconPlus}>＋</span>
              </button>
            </>
          )}
          <button className={styles.menuItem}>
            Gift
            <span>🎁</span>
          </button>
          <button className={styles.menuItem}>Settings</button>
          <button className={styles.menuItem} onClick={handleLogout}>
            Log Out<span>↩</span>
          </button>
        </div>
        {/* CTA */}
        <div className={styles.upgradeWrap}>
          <button
            className={styles.upgradeBtn}
            onClick={() => {
              onClose();
              setShowModal(true);
              setActiveModalTabIndex(0);
            }}
          >
            Upgrade Account
          </button>
        </div>
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default UserMenu;
