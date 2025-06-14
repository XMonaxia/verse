"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "./CategoryListEditor.module.css";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/config/testing/axios";
import { AddCategoryInput, categoryPayload } from "@/utils/testing/zod";
import { useCategory } from "@/components/Admin/Add/CategoryContext";
import { getToken } from "@/utils/testing/getToken";

const CategoryListEditor = () => {
  const { categories, refreshCategories } = useCategory();
  const [editId, setEditId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const handleAdd = async () => {
    if (!newCategory) {
      toast.error("Silakan pilih kategori untuk ditambahkan");
      return;
    }
    const token = getToken();
    if (!token) return toast.error("Token tidak ditemukan");
    try {
      await addCategory(
        { name: newCategory as AddCategoryInput["name"] },
        token
      );
      toast.success("Kategori berhasil ditambahkan");
      setNewCategory("");
      refreshCategories();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan kategori");
    }
  };
  const handleUpdate = async (id: string) => {
    if (!newValue) {
      toast.error("Silakan pilih kategori baru");
      return;
    }
    const token = getToken();
    if (!token) return toast.error("Token tidak ditemukan");
    try {
      await updateCategory(
        id,
        { name: newCategory as AddCategoryInput["name"] },
        token
      );
      toast.success("Kategori diperbarui");
      setEditId(null);
      setNewValue("");
      refreshCategories();
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui kategori");
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    const token = getToken();
    if (!token) return toast.error("Token tidak ditemukan");
    try {
      await deleteCategory(id, token);
      toast.success("Kategori dihapus");
      refreshCategories();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus kategori");
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kelola Kategori</h2>
      {/* Tambah Kategori */}
      <div className={styles.addContainer}>
        <select
          className={styles.select}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="">-- Pilih Kategori Baru --</option>
          {categoryPayload.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          className={`${styles.button} ${styles.save}`}
          onClick={handleAdd}
        >
          Tambahkan
        </button>
      </div>
      {/* Daftar Kategori */}
      <ul className={styles.list}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.item}>
            {editId === cat.id ? (
              <>
                <select
                  className={styles.select}
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                >
                  {categoryPayload.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className={styles.actions}>
                  <button
                    className={`${styles.button} ${styles.save}`}
                    onClick={() => handleUpdate(cat.id)}
                  >
                    Simpan
                  </button>
                  <button
                    className={`${styles.button} ${styles.cancel}`}
                    onClick={() => {
                      setEditId(null);
                      setNewValue("");
                    }}
                  >
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className={styles.actions}>
                  <button
                    className={`${styles.button} ${styles.edit}`}
                    onClick={() => {
                      setEditId(cat.id);
                      setNewValue(cat.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(cat.id)}
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryListEditor;
