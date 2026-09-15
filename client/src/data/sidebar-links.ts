import { FaRegUser } from "react-icons/fa";
import { FiSettings, FiLock } from "react-icons/fi";
import type { SidebarLinks } from "@/types/sidebar-links.types";

const sidebarLinks: SidebarLinks[] = [
  {
    id: "1",
    name: "profile",
    Icon: FaRegUser,
    href: "/account/profile",
  },
  {
    id: "2",
    Icon: FiLock,
    name: "change password",
    href: "/account/change-password",
  },
  {
    id: "3",
    name: "settings",
    Icon: FiSettings,
    href: "/account/settings",
  },
];

export default sidebarLinks;
