"use client";
import React from "react";
import Link from "next/link";
import styles from "@/style/Combobox/ComboBoxMenu.module.css";
type BaseItem = {
  name: string;
  icon?: React.ReactNode;
};
type LinkItem = BaseItem & {
  type: "link";
  href: string;
};
type ButtonItem = BaseItem &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type: "button";
  };
export type ComboBoxItem = LinkItem | ButtonItem;
type ComboBoxProps = {
  title: string;
  items: ComboBoxItem[];
  footerLinks?: { name: string; link: string }[];
  onClose: () => void;
};
const ComboBoxMenu = ({
  title,
  items,
  footerLinks = [],
  onClose,
}: ComboBoxProps) => {
  return (
    <div className={styles.combobox}>
      <div className={styles.comboboxmenu}>
        <div className={styles.useinfo}>
          <h3>{title}</h3>
        </div>
        <div className={styles.menuContent}>
          {items.map((item, button) => {
            if (item.type === "link") {
              return (
                <Link href={item.href} key={button}>
                  <div className={styles.appItem}>
                    <div className={styles.appIcon}>{item.icon}</div>
                    <div className={styles.appName}>{item.name}</div>
                  </div>
                </Link>
              );
            }
            if (item.type === "button") {
              return (
                <button
                  key={button}
                  className={styles.appItem}
                  onClick={item.onClick}
                  {...item}
                >
                  <div className={styles.appIcon}>{item.icon}</div>
                  <div className={styles.appName}>{item.name}</div>
                </button>
              );
            }
            return null;
          })}
        </div>
        {footerLinks.length > 0 && (
          <div className={styles.useinfos}>
            <div className={styles.team}>
              {footerLinks.map((link, links) => (
                <Link key={links} href={link.link}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default ComboBoxMenu;
