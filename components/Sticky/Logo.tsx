import React from "react";
import Link from "next/link";
import { SiCodeceptjs } from "react-icons/si";

export default function Logo() {
  return (
    <Link
      href="/"
      className="fixed top-06 trans-color-03 c-hover-white z-1500 left-10px animatePopIn fs-2 md-fs-1-8 logo"
    >
      <SiCodeceptjs />
    </Link>
  );
}
