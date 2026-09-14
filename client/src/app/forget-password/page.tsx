import type { Metadata } from "next";
import ForgetPassword from "@/components/pages/ForgetPassword";

// page metadata
export const metadata: Metadata = {
  title: "Forget Password",
  description:
    "Forgot your password? Enter your email address and we'll send you a link to reset it.",
};

const forgetPasswordPage = () => {
  return <ForgetPassword />;
};

export default forgetPasswordPage;
