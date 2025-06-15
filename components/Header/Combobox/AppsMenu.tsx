"use client";
import { FaUsers } from "react-icons/fa";
import { BsFillBookmarksFill } from "react-icons/bs";
import { GiBookmarklet, GiNotebook } from "react-icons/gi";
import ComboBoxMenu, {
  ComboBoxItem,
} from "@/components/Header/Combobox/ComboBoxMenu";
import { useAuth } from "@/components/Provider/AuthWrapper";
type AppsMenuProps = {
  onClose: () => void;
};
const AppsMenu = ({ onClose }: AppsMenuProps) => {
  const { isLoggedIn } = useAuth();
  const items: ComboBoxItem[] = [
    isLoggedIn
      ? {
          type: "link",
          name: "Article",
          href: "/article",
          icon: <GiBookmarklet />,
        }
      : {
          type: "button",
          name: "Article",
          icon: <GiBookmarklet />,
          onClick: () =>
            alert("Silakan login terlebih dahulu untuk mengakses Buku."),
        },
    {
      type: "button",
      name: "Save Article",
      icon: <BsFillBookmarksFill />,
      onClick: () => alert("Save Article Sedang Dalam Building"),
    },
    {
      type: "button",
      name: "Notes",
      icon: <GiNotebook />,
      onClick: () => alert("Notes Sedang Dalam Building"),
    },
    {
      type: "button",
      name: "Show Alert",
      icon: <FaUsers />,
      onClick: () => alert("Hallo Saya Morbyna!"),
    },
  ];
  const footerLinks = [
    { name: "Privacy", link: "#" },
    { name: "Hak Cipta", link: "#" },
    { name: "Licency", link: "#" },
  ];
  return (
    <ComboBoxMenu
      title="App Menu"
      items={items}
      footerLinks={footerLinks}
      onClose={onClose}
    />
  );
};
export default AppsMenu;
