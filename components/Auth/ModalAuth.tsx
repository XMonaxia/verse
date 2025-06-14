"use client";
import React, { ReactNode, useEffect } from "react";
import style from "@/style/Auth/AuthModal.module.css";

interface ModalAuthProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}
const ModalAuth: React.FC<ModalAuthProps> = ({ show, onClose, children }) => {
  useEffect(() => {
    const html = document.documentElement;
    if (show) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      html.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [show]);
  if (!show) return null;
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <button className={style.closeBtn} onClick={onClose}>
          ×
        </button>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};

export default ModalAuth;
