"use client";

import React, { useState } from "react";
import { CategoryResponse } from "@/utils/testing/types";
import toast from "react-hot-toast";
import styles from "./ListCategory.module.css";
import { useAuth } from "@/components/Provider/AuthWrapper";

interface ListCategoryProps {
  all: CategoryResponse[];
}

const ListCategory = ({ all }: ListCategoryProps) => {
  const [categories, setCategories] = useState<CategoryResponse[]>(all);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");
  const { isLoggedIn, user } = useAuth();
  const handleEdit = (category: CategoryResponse) => {
    setEditingId(category.id);
    setNewName(category.name);
  };
  const handleCancel = () => {
    setEditingId(null);
    setNewName("");
  };
  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error("Gagal update kategori");
      const { data } = await res.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name: data.name } : cat))
      );
      toast.success("Kategori berhasil diperbarui");
      setEditingId(null);
      setNewName("");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Gagal memperbarui kategori");
    }
  };
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Yakin ingin menghapus kategori ini?");
    if (!confirm) return;
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal hapus kategori");
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Kategori berhasil dihapus");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Gagal menghapus kategori");
    }
  };

  return (
    <>
      <div className={styles.container}>
        {isLoggedIn && user?.role === "Admin" && (
          <>
            <h2 className={styles.title}>Daftar Kategori</h2>
            {categories.map((cat) => (
              <div key={cat.id} className={styles.categoryItem}>
                {editingId === cat.id ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={styles.input}
                    />
                    <button
                      onClick={() => handleSave(cat.id)}
                      className={`${styles.button} ${styles.save}`}
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`${styles.button} ${styles.cancel}`}
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1 }}>{cat.name}</span>
                    <button
                      onClick={() => handleEdit(cat)}
                      className={`${styles.button} ${styles.edit}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      Hapus
                    </button>
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      {isLoggedIn && user?.role === "User" && (
        <h2 className={styles.user}>Swipper jangan Mencurii !!!</h2>
      )}
    </>
  );
};

export default ListCategory;
