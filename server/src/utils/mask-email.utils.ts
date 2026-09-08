export const maskEmail = (email: string) => {
  const [userName = "", domain = ""] = email.split("@");
  return `${userName[0]}${"*".repeat(userName.length - 1)}@${domain}`;
};
