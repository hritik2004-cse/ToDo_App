import type { Metadata } from "next";
import Settings from "@/components/pages/Settings";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your ToDo App preferences and manage your account settings.",
};

const settingsPage = () => {
  return <Settings />;
};

export default settingsPage;
