import VerifyAccount from "@/components/pages/VerifyAccount";
import type { Metadata } from "next";

// page metadata
export const metadata: Metadata = {
  title: "Verify Account",
  description:
    "Enter the OTP sent to your email to verify and activate your ToDo App account.",
};

const verifyAccountPage = () => {
  return <VerifyAccount />
};

export default verifyAccountPage;
