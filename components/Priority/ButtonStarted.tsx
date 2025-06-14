"use client";
import React, { useState } from "react";
import Link from "next/link";
import ModalAuth from "../Auth/ModalAuth";
import Login from "../Auth/Login/Login";
import { useAuth } from "../Provider/AuthWrapper";

const ButtonStarted = () => {
  const { isLoggedIn, refreshUser } = useAuth();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleScroll = () => {
    const section = document.getElementById("contentBook");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex-wrap gap-05 jus-c merienda m-t-2">
      <button
        className="radius-10-custom p-tb-05-lr-1 fw-700 border-custom trans-color-bg-03 backdrop-5 b-black-opacity-low bg-hover-white-opacity"
        onClick={handleScroll}
      >
        Get Started
      </button>
      {isLoggedIn ? (
        <Link
          href="/article"
          className="radius-10-custom p-tb-05-lr-1 fw-700 border-custom trans-color-bg-03 bg-hover-white-opacity"
        >
          Books
        </Link>
      ) : (
        <button
          onClick={() => setShowModalLogin(true)}
          className="radius-10-custom p-tb-05-lr-1 fw-700 border-custom trans-color-bg-03 bg-hover-white-opacity"
        >
          Login
        </button>
      )}
      <ModalAuth show={showModalLogin} onClose={() => setShowModalLogin(false)}>
        <Login
          onLoginSuccess={async () => {
            await refreshUser();
            setShowModalLogin(false);
          }}
        />
      </ModalAuth>
    </div>
  );
};

export default ButtonStarted;
