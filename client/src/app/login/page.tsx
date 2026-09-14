import type { Metadata } from "next";
import Login from "@/components/pages/Login";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your ToDo App account to manage and organize your daily tasks.",
};

const loginPage = () => {
  return <Login />;
};

export default loginPage;
