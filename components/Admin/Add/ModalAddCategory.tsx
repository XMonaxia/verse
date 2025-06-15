"use client";
import React, { useState } from "react";
import style from "@/style/Auth/FormModal.module.css";
import toast from "react-hot-toast";
const ModalAddCategory = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Lengkapi semua data termasuk gambar!");
      return;
    }
    try {
      setLoading(true);
      await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: title }),
      });
      toast.success("Category berhasil ditambahkan!");
      setTitle("");
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <form className={style.messageForm} onSubmit={handleSubmit}>
      <h2 className={style.title}>Tambah Category</h2>
      <div className={style.wrapp}>
        <label className={style.label} htmlFor="category">
          Title
        </label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="tambahkan category"
          required
          className={style.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={style.Send}>
        <button type="submit" disabled={loading} className={style.sendBtn}>
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </button>
      </div>
    </form>
  );
};
export default ModalAddCategory;
