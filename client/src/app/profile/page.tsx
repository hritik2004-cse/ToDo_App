"use client";

import Image from "next/image";
import { FaPen } from "react-icons/fa";
import React, { useState } from "react";
import useAuth from "@/context/AuthContext";
import NavBar from "@/components/main/NavBar";
import { LuLoaderCircle } from "react-icons/lu";

const page = () => {
  const { user, userLoading, fetchCurrentUser } = useAuth();
  const [profileImgLoading, setProfileImageLoading] =
    React.useState<boolean>(false);

  const editProfile = () => {};

  if (!user) return null;

  return (
    <main className="flex flex-col h-screen w-full page">
      <NavBar />
      <section className="w-full h-full main flex items-center justify-center">
        {userLoading ? (
          <div className="w-[95%] xl:w-[35%] border-2 border-foreground p-6 flex items-center justify-center">
            <LuLoaderCircle className="animate-spin text-2xl text-accent" />
          </div>
        ) : (
          <div className="w-[95%] xl:w-[35%] border-2 border-foreground p-6 flex flex-col gap-4">
            <figure className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full relative">
                <Image
                  src={user?.profileImgUrl || "/temp.jpg"}
                  height={100}
                  width={100}
                  alt={`${user.firstname} ${user.lastName}'s profile img`}
                  loading="eager"
                  className="object-cover border-2 border-foreground h-full w-full rounded-full"
                />
              <button className="absolute bottom-0 bg-accent text-foreground h-7 w-7 rounded-full flex items-center justify-center right-0">
                <FaPen className="text-base " />
              </button>
              </div>
            </figure>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <input
                type="text"
                className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
                defaultValue={user.firstname}
              />
              <input
                type="text"
                className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
                defaultValue={user.lastName}
              />
            </div>
            <input
              type="email"
              name=""
              id=""
              defaultValue={user.email}
              className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
