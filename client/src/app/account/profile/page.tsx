import Profile from "@/components/pages/Profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and update your account details, personal information, and profile photo.",
};

const profilePage = () => {
  return <Profile />;
};

export default profilePage;
