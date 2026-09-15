import type { IconType } from "react-icons";

export type SidebarLinks = {
  id: string;
  name: string;
  href: string;
  Icon: IconType;
};

export type SidebarLinkProps = {
  name: string;
  href: string;
  Icon: IconType;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}