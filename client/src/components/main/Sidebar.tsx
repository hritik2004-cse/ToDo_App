"use client";

import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import useAuth from "@/context/AuthContext";
import sidebarLinks from "@/data/sidebar-links";
import { LuLoaderCircle } from "react-icons/lu";
import SidebarLink from "../utility/SidebarLink";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/logout");
      fetchCurrentUser();
      router.push("/");
      toast.success(response?.data?.message);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to logout";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="hidden h-full bg-gray border-r-2 border-foreground p-4 md:flex flex-col items-center justify-between min-w-2xs">
      <div className=""></div>
      {/* sidebar links map */}
      <section className="flex flex-col gap-3">
        {sidebarLinks.map((link) => {
          return (
            <SidebarLink
              key={link.id}
              name={link.name}
              href={link.href}
              Icon={link.Icon}
              className={`${pathName === link.href ? "bg-accent border-foreground text-background font-extrabold" : "font-medium border-gray hover:bg-accent/20"}`}
            />
          );
        })}
      </section>
      <button
        className="w-full bg-delete py-3 hover:bg-red capitalize text-base font-medium cursor-pointer hover:scale-105 active:scale-95 hover:bg-delete/70 transition-all duration-300"
        onClick={logoutHandler}
      >
        {loading ? (
          <LuLoaderCircle className="text-foreground text-2xl animate-spin" />
        ) : (
          "log out"
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
