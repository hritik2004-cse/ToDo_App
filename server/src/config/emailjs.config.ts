import env from "./env.config.js";
import type { SendEmailOptions } from "../types/email-js.types.js";

const sendEmail = async ({ templateId, templateParams }: SendEmailOptions) => {
  const result = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: env.emailjsServiceId,
      template_id: templateId,
      user_id: env.emailjsPublicKey,
      accessToken: env.emailjsPrivateKey,
      template_params: templateParams,
    }),
  });

  if (!result.ok) {
    const errorMsg = await result.text;
    throw new Error(`error: ${errorMsg}`);
  }

  // if response is ok
  return result;
};

export default sendEmail;
