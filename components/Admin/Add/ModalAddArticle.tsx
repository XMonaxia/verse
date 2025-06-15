"use client";

import React, { useState } from "react";
import style from "@/style/Auth/FormModal.module.css";
import toast from "react-hot-toast";
import { CategoryResponse } from "@/utils/testing/types";
import Image from "next/image";
import { AddArticleInput } from "@/utils/testing/zod";

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !categoryId || !image) {
      toast.error("Lengkapi semua data termasuk gambar!");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Gagal upload gambar");
      const { url } = await res.json();
      const payload: AddArticleInput = {
        title,
        content,
        imageUrl: url,
        categoryId,
      };
      await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      toast.success("Artikel berhasil ditambahkan!");
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
          rows={5}
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
          className={style.radioWrapper}
        />
        <button type="submit" disabled={loading} className={style.sendBtn}>
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </button>
      </div>
      {previewUrl && (
        <div className={style.imagetambahan}>
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={style.image}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className={style.tombolremove}
          >
            ×
          </button>
        </div>
      )}
    </form>
  );
};

export default ModalAddArticle;
