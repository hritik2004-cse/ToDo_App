import ChangePassword from "@/components/pages/ChangePassword";
import type { Metadata } from "next";

// page metadata
export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Update your ToDo App account password to keep your account secure.",
};

const changePasswordPage = () => {
  return <ChangePassword />;
};

export default changePasswordPage;
