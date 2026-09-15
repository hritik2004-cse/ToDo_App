"use client";

import Image from "next/image";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useAuth from "@/context/AuthContext";
import Input from "@/components/utility/Input";
import { LuLoaderCircle } from "react-icons/lu";
import { FaPen, FaRegSave } from "react-icons/fa";
import { ProfileData } from "@/types/profile.types";
import { ChangeEvent, SubmitEventHandler, useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const { user, userLoading, fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [editProfile, setEditprofile] = useState<boolean>(false);
  const [profileImgLoading, setProfileImageLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: user?.firstname || "",
    lastName: user?.lastName || "",
  });

  // Sync profileData when user is fetched
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstname || "",
        lastName: user.lastName || "",
      });
    }
  }, [user]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

  const editUserProfile: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch("/user/update-profile", profileData);
      toast.success(response?.data?.message);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to save details";
      toast.error(errMsg);
    } finally {
      setEditprofile(false);
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="h-full flex items-center justify-center">
      {userLoading || loading ? (
        <div className="w-[95%] lg:w-[40%] border-2 border-foreground p-6 flex items-center justify-center">
          <LuLoaderCircle className="animate-spin text-2xl text-accent" />
        </div>
      ) : !user ? null : (
        <form
          className="w-[95%] xl:w-[40%] border-2 border-foreground p-6 flex flex-col gap-4 relative"
          onSubmit={editUserProfile}
        >
            <button
              type="button"
              className="absolute right-5 top-5 transition-all duration-300"
              onClick={(e) => {
                if (editProfile) {
                  e.currentTarget.form?.requestSubmit();
                } else {
                  setEditprofile(true);
                }
              }}
            >
              {editProfile ? (
                <FaRegSave className="text-accent text-2xl" />
              ) : (
                <TbEdit className="text-accent text-2xl" />
              )}
            </button>

            <figure className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full relative">
                <Image
                  src={user?.profileImgUrl || "/temp.jpg"}
                  height={100}
                  width={100}
                  alt={`${user?.firstname || ""} ${user?.lastName || ""}'s profile img`}
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
                  id="profileImg"
                  name="profileImg"
                  className="hidden"
                  onChange={updateProfileImg}
                  disabled={profileImgLoading}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                />
              </div>
            </figure>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Input
                required
                type="text"
                name="firstName"
                title="first name"
                onChange={handleChange}
                readOnly={!editProfile}
                autoFocus={editProfile}
                value={profileData.firstName}
                className={`${editProfile ? "focus-within:border-accent focus:border-accent active:accent-accent border-green" : ""}`}
              />
              <Input
                type="text"
                name="lastName"
                title="last name"
                onChange={handleChange}
                readOnly={!editProfile}
                value={profileData.lastName}
                className={`${editProfile ? "focus-within:border-accent focus:border-accent active:accent-accent" : ""}`}
              />
            </div>
            <Input
              type="email"
              title="email address"
              defaultValue={user?.email || ""}
              readOnly
            />
      </form>
      )}
    </div>
  );
};

export default Profile;
