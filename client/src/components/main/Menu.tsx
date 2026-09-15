"use client";

import { useState } from "react";
import Logo from "../utility/Logo";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { IoMenu } from "react-icons/io5";
import useAuth from "@/context/AuthContext";
import { MenuProps } from "@/types/menu.types";
import sidebarLinks from "@/data/sidebar-links";
import { LuLoaderCircle } from "react-icons/lu";
import SidebarLink from "../utility/SidebarLink";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";

const Menu = ({ open, setOpen }: MenuProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/logout");
      setOpen(false);
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
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
      <DrawerTrigger
        render={
          <button className="inline-block md:hidden">
            <IoMenu className="text-4xl" />
          </button>
        }
      />
      <DrawerContent className="p-3">
        <DrawerHeader>
          <Logo />
        </DrawerHeader>
        <div className="flex flex-1 flex-col justify-center gap-3">
          {sidebarLinks.map((link) => {
            return (
              <SidebarLink
                key={link.id}
                name={link.name}
                href={link.href}
                Icon={link.Icon}
                onClick={(_e) => {
                  setOpen(false);
                  router.push(link.href);
                }}
                className={`${pathName === link.href ? "bg-accent border-foreground text-background font-extrabold" : "font-medium border-gray hover:bg-accent/20 text-foreground"}`}
              />
            );
          })}
        </div>
        <DrawerFooter>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
