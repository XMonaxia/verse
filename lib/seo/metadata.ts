import type { Metadata } from "next";
export const defaultMetadata: Metadata = {
  title: {
    default:
      "Naliverse E-Book Space | Ruangan E-Book Untuk Remaja Pecinta Buku",
    template: "%s | Naliverse",
  },
  description:
    "Naliverse Hadir Sebagai Ruang Digital Yang Mendukung Eksplorasi Kata Dan Karya, Khususnya Bagi Remaja Indonesia. Lebih Dari Sekadar Platform, Naliverse Menjadi Jembatan Untuk Menumbuhkan Minat Baca, Menyemai Semangat Literasi, Dan Mendorong Lahirnya Karya-Karya Orisinal Anak Bangsa.",
  keywords: [
    "Naliverse",
    "Nali",
    "Verse",
    "Narasi",
    "Narative",
    "Literasi",
    "Literative",
    "Universal",
    "Universe",
    "Minat-Baca",
    "Belajar-Baca",
    "Baca-Novel",
    "E-Book",
    "E-Book Anak Muda",
    "Novel",
    "Karya",
    "Fiksi",
    "Non-Fiksi",
  ],
  authors: [{ name: "Morbyna", url: "https://naliverse.xyz" }],
  creator: "Morbyna",
  applicationName: "Naliverse",
  generator: "Naliverse",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/naliverse/default/android-chrome-512x512.png",
    apple: "/naliverse/default/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://naliverse.xyz"),
  openGraph: {
    title: "Narasi Literasi Universal",
    description:
      "Naliverse Hadir Sebagai Ruang Digital Yang Mendukung Eksplorasi Kata Dan Karya, Khususnya Bagi Remaja Indonesia. Lebih Dari Sekadar Platform, Naliverse Menjadi Jembatan Untuk Menumbuhkan Minat Baca, Menyemai Semangat Literasi, Dan Mendorong Lahirnya Karya-Karya Anak Bangsa.",
    url: "https://naliverse.xyz",
    siteName: "Naliverse",
    images: [
      {
        url: "https://naliverse.xyz/naliverse/naliverse.webp",
        width: 1200,
        height: 600,
        alt: "Naliverse OG Image",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narasi Literasi Universal",
    description:
      "Naliverse Hadir Sebagai Ruang Digital Yang Mendukung Eksplorasi Kata Dan Karya, Khususnya Bagi Remaja Indonesia. Lebih Dari Sekadar Platform, Naliverse Menjadi Jembatan Untuk Menumbuhkan Minat Baca, Menyemai Semangat Literasi, Dan Mendorong Lahirnya Karya-Karya Anak Bangsa.",
    images: ["https://naliverse.xyz/naliverse/naliverse.webp"],
    creator: "@Morbyna",
  },
};
export const BookMetadata: Metadata = {
  title: "Ruangan E-Book Yang Di Soroti | Recommended E-Books",
  description:
    "Ruangan Ini Adalah Sorotan Bagi Buku-Buku Yang Populer, Tentunya Banyak Mengandung Ilmu",
  keywords: [
    "buku",
    "book",
    "baca",
    "populer",
    "kosa-kata",
    "narasi",
    "buku-recomended",
    "recomended",
    "sorotan",
    "naliverse",
  ],
  authors: [{ name: "Morbyna", url: "https://naliverse.xyz/book" }],
  creator: "Morbyna",
  applicationName: "Naliverse",
  generator: "Naliverse",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  metadataBase: new URL("https://naliverse.xyz/book"),
  openGraph: {
    title: "Ruangan E-Book Yang Di Soroti",
    description:
      "Ruangan Ini Adalah Sorotan Bagi Buku-Buku Yang Populer, Tentunya Banyak Mengandung Ilmu",
    url: "https://naliverse.xyz/book",
    siteName: "Naliverse",
    images: [
      {
        url: "https://naliverse.xyz/naliverse/thumbnail/book.webp",
        width: 1200,
        height: 600,
        alt: "Naliverse OG Image",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruangan E-Book Yang Di Soroti",
    description:
      "Ruangan Ini Adalah Sorotan Bagi Buku-Buku Yang Populer, Tentunya Banyak Mengandung Ilmu",
    images: ["https://naliverse.xyz/naliverse/thumbnail/book.webp"],
    creator: "@Morbyna",
  },
};
