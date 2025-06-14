"use client";

import React, { useState } from "react";
import style from "@/style/Auth/FormModal.module.css";
import toast from "react-hot-toast";
import { addArticle } from "@/lib/config/testing/axios";
import { CategoryResponse } from "@/utils/testing/types";

import Image from "next/image";
import { AddArticleInput } from "@/utils/testing/zod";
import { getToken } from "@/utils/testing/getToken";

interface AddArticleProps {
  categories: CategoryResponse[];
}

const ModalAddArticle = ({ categories }: AddArticleProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !categoryId || !image) {
      toast.error("Lengkapi semua data termasuk gambar!");
      return;
    }

    setLoading(true);
    try {
      // 1. Upload gambar ke /api/image
      const formData = new FormData();
      formData.append("image", image); // <-- PENTING! harus sama dengan key yang digunakan di backend: `formData.get("image")`
      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Gagal upload gambar");
      const { url } = await res.json();
      // 2. Kirim data artikel ke backend eksternal
      const payload: AddArticleInput = {
        title,
        content,
        imageUrl: url,
        categoryId,
      };
      await addArticle(payload, token);
      toast.success("Artikel berhasil ditambahkan!");
      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      setPreviewUrl(null);
      setCategoryId("");
    } catch (err) {
      console.log("err", err);
      toast.error("Gagal menambahkan artikel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={style.messageForm} onSubmit={handleSubmit}>
      <h2 className={style.title}>Tambah Artikel</h2>
      <div className={style.wrapp}>
        <label className={style.label} htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="tambahkan Title"
          required
          className={style.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={style.wrapp}>
        <label className={style.label} htmlFor="conten">
          Konten
        </label>
        <textarea
          id="conten"
          name="conten"
          placeholder="tambahkan Konten"
          required
          className={style.input}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <select
        value={categoryId}
        className={style.input}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Pilih Kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className={style.Send}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={style.sendBtn}
        />
        <button type="submit" disabled={loading} className={style.sendBtn}>
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </button>
      </div>
      {previewUrl && (
        <Image src={previewUrl} alt="Preview" width={200} height={150} />
      )}
    </form>
  );
};

export default ModalAddArticle;
