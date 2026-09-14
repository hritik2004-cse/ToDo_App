import Register from "@/components/pages/Register";
import type { Metadata } from "next";

// page metadata
export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a free ToDo App account to start tracking, organizing, and completing your daily tasks.",
};

const registerPage = () => {
  return <Register />;
};

export default registerPage;
