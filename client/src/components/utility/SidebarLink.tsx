import Link from "next/link";
import { SidebarLinkProps } from "@/types/sidebar-links.types";

const SidebarLink = ({ href, name, Icon, className, onClick }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={`w-full flex items-center justify-start gap-2 py-3 px-8 capitalize text-base border-2 transition-all duration-300 ${className}`}
    >
      {Icon && <Icon className="text-xl" />} {name}
    </Link>
  );
};

export default SidebarLink;
