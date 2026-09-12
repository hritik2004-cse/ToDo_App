"use client";

import Image from "next/image";
import { isAxiosError } from "axios";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "@/context/AuthContext";
import NavBar from "@/components/main/NavBar";
import Input from "@/components/utility/Input";
import { LuLoaderCircle } from "react-icons/lu";
import React, { ChangeEvent } from "react";
import api from "@/config/axios.config";

const page = () => {
  const { user, userLoading, fetchCurrentUser } = useAuth();
  const [profileImgLoading, setProfileImageLoading] =
    React.useState<boolean>(false);

  const editProfile = async () => {};

  const updateProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validate file types
    const allowedTypes = ["image/jpg", "image/jpeg", "image/webp", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only jpg, jpeg, png and webp files are allowed");
      e.target.value = "";
      return;
    }

    // validate file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("image must be smaller then 5MB.");
      e.target.value = "";
      return;
    }

    try {
      setProfileImageLoading(true);
      const formData = new FormData();
      formData.append("profileImg", file);
      const response = await api.patch("/user/update-profile-img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response?.data?.message);
      await fetchCurrentUser();
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to update profile image";
      toast.error(errMsg);
    } finally {
      setProfileImageLoading(false);
      e.target.value = "";
    }
  };

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
                {/* label to upload profile img */}
                <label
                  htmlFor={profileImgLoading ? undefined : "profileImg"}
                  className={`absolute bottom-0 bg-accent text-foreground h-7 w-7 rounded-full flex items-center justify-center right-0 ${profileImgLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {profileImgLoading ? (
                    <LuLoaderCircle className="text-base text-foreground animate-spin" />
                  ) : (
                    <FaPen className="text-base text-foreground" />
                  )}
                </label>
                {/* file uploading input */}
                <input
                  type="file"
                  name="profileImg"
                  id="profileImg"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={updateProfileImg}
                  disabled={profileImgLoading}
                />
              </div>
            </figure>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Input type="text" defaultValue={user.firstname} />
              <Input type="text" defaultValue={user.lastName} />
            </div>
            <Input type="email" name="" id="" defaultValue={user.email} />
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
