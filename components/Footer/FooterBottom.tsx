import React from "react";
import Link from "next/link";
import { BsShop } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { SiNativescript } from "react-icons/si";
const socialLinks = [
  { icon: BsShop, href: "#" },
  { icon: FaBook, href: "/book" },
  { icon: SiNativescript, href: "#" },
];
const FooterBottom = () => {
  return (
    <div className="flex-center jus-around p-07 border-t-custom c-hover-white trans-color-03 md-flex-col md-text-c md-gap-1 md-m-b-3">
      <p>© {new Date().getFullYear()} Naliverse,</p>
      <div className="flex gap-08">
        {socialLinks.map(({ icon: Icon, href }, icon) => (
          <Link key={icon} href={href}>
            <div className="relative border-custom radius-10-custom p-04 text-c flex-center item-c fs-1-02 c-hover-white trans-color-03 z-1 sendBtn c-hover-black">
              <Icon />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterBottom;
