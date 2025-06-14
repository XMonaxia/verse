"use client";
import React, { useState } from "react";
import style from "@/style/Auth/FormModal.module.css";
import toast from "react-hot-toast";
import { LoginInput } from "@/utils/testing/zod";
type LoginProps = {
  onLoginSuccess: () => void;
};
const ModalLogin = ({ onLoginSuccess }: LoginProps) => {
  const [formData, setFormData] = useState<LoginInput>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      onLoginSuccess();
      toast.success(`Selamat Datang : ${data.user?.username || "Kami ?"}`, {
        style: {
          background: "rgb(0, 70, 70)",
          color: "rgb(240, 240, 240)",
          borderRadius: "0 10px 0 10px",
        },
        duration: 5000,
      });
    } catch (err) {
      console.log("Error", err);
      toast.error(`Login Gagal: ${err}`, {
        style: {
          background: "rgb(255, 0, 0)",
          color: "rgb(240, 240, 240)",
          borderRadius: "0 10px 0 10px",
        },
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={style.messageForm} onSubmit={handleSubmit}>
      <h2 className={style.title}>Log In</h2>
      <div className={style.wrapp}>
        <label className={style.label} htmlFor="usernamelogin">
          Email
        </label>
        <input
          type="text"
          id="usernamelogin"
          name="username"
          placeholder="User Name"
          required
          className={style.input}
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className={style.wrapp}>
        <label className={style.label} htmlFor="passwordlogin">
          Password
        </label>
        <input
          type="password"
          id="passwordlogin"
          name="password"
          placeholder="Password"
          required
          className={style.input}
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <label className={style.radioTerms}>
        <input type="checkbox" id="remember" name="remember" />
        <span>Remember Me</span>
      </label>

      <div className={style.Send}>
        <button type="submit" disabled={loading} className={style.sendBtn}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default ModalLogin;
