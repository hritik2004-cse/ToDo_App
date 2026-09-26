"use client";

import { isAxiosError } from "axios";
import Button from "../utility/Button";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { LuLoaderCircle } from "react-icons/lu";

const Settings = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, userLoading, fetchCurrentUser } = useAuth();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

  // delete account function
  const deleteAccount = async () => {
    try {
      setLoading(true);
      const response = await api.delete("/auth/delete-account");
      fetchCurrentUser();
      router.push("/");
      toast.success(response?.data?.message);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to delete account";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="w-full h-full">
      {userLoading ? (
        <section className="h-full w-full flex items-center justify-center">
          <LuLoaderCircle className="text-accent text-2xl animate-spin" />
        </section>
      ) : !user ? null : (
        <section className="flex flex-col">
          <article className="bg-gray p-3 border-2 border-foreground flex items-center justify-between">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-accent text-lg font-semibold">
                Delete Account
              </h2>
              <p className="text-sm text-foreground/70 font-medium">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button varient="danger" onClick={() => deleteAccount}>
              {loading ? (
                <LuLoaderCircle className="text-foreground text-2xl animate-spin" />
              ) : (
                "delete"
              )}
            </Button>
          </article>
        </section>
      )}
    </main>
  );
};

export default Settings;
