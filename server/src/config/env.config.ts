import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

const PORT = Number(process.env.PORT);
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const OTP_EXPIRY_DURATION = Number(process.env.OTP_EXPIRY_DURATION);
const TOKEN_EXPIRY_DURATION = Number(process.env.TOKEN_EXPIRY_DURATION);
const {
  NODE_ENV,
  CLIENT_URL,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  EMAIL_JS_PUBLIC_KEY,
  EMAIL_JS_SERVICE_ID,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  EMAIL_JS_PRIVATE_KEY,
  REFRESH_TOKEN_EXPIRY,
  EMAIL_JS_VERIFY_EMAIL_TEMPLATE_ID,
  EMAIL_JS_RESET_PASSWORD_TEMPLATE_ID,
} = process.env;

if (!Number.isInteger(SALT_ROUNDS) || SALT_ROUNDS <= 0) {
  throw new Error("salt rounds is not defined or value is small");
}

if (!Number.isInteger(PORT) || PORT <= 3000) {
  throw new Error("port is not defined or value is small");
}

if (!Number.isInteger(OTP_EXPIRY_DURATION) || OTP_EXPIRY_DURATION <= 300000) {
  throw new Error("otp expiry is not defined or value is small");
}

if (
  !Number.isInteger(TOKEN_EXPIRY_DURATION) ||
  TOKEN_EXPIRY_DURATION <= 300000
) {
  throw new Error("token expiry is not defined or value is small");
}

if (
  NODE_ENV !== "development" &&
  NODE_ENV !== "production" &&
  NODE_ENV !== "testing"
) {
  throw new Error("node env is not defined");
}

if (!MONGODB_URI) {
  throw new Error("mongoDB uri is not defined");
}

if (!CLIENT_URL) {
  throw new Error("client url is not defined");
}

// for validation for emailjs
if (!EMAIL_JS_SERVICE_ID) {
  throw new Error("emailjs service id is not defined");
}

if (!EMAIL_JS_PUBLIC_KEY) {
  throw new Error("emailjs public id is not defined");
}

if (!EMAIL_JS_PRIVATE_KEY) {
  throw new Error("emailjs private id is not defined");
}

if (!EMAIL_JS_VERIFY_EMAIL_TEMPLATE_ID) {
  throw new Error("emailjs verify email template id is not defined");
}

if (!EMAIL_JS_RESET_PASSWORD_TEMPLATE_ID) {
  throw new Error("emailjs reset password template id is not defined");
}

// jwt

if (!REFRESH_TOKEN_EXPIRY) {
  throw new Error("refresh token expiry is not defined");
}

if (!ACCESS_TOKEN_EXPIRY) {
  throw new Error("access token expiry is not defined");
}

if (!ACCESS_TOKEN_SECRET) {
  throw new Error("access token secret is not defined");
}

if (!REFRESH_TOKEN_SECRET) {
  throw new Error("refresh token secret is not defined");
}

const env = {
  port: PORT,
  nodeEnv: NODE_ENV,
  clientUrl: CLIENT_URL,
  saltRounds: SALT_ROUNDS,
  mongoDbUri: MONGODB_URI,
  emailjsPublicKey: EMAIL_JS_PUBLIC_KEY,
  emailjsServiceId: EMAIL_JS_SERVICE_ID,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  otpExpiryDuration: OTP_EXPIRY_DURATION,
  accessTokenExpiry: ACCESS_TOKEN_EXPIRY,
  emailjsPrivateKey: EMAIL_JS_PRIVATE_KEY,
  refreshTokenSecret: REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,
  tokenExpiryDuration: TOKEN_EXPIRY_DURATION,
  emailjsVerifyEmailTemplateId: EMAIL_JS_VERIFY_EMAIL_TEMPLATE_ID,
  emailjsResetPasswordTemplateId: EMAIL_JS_RESET_PASSWORD_TEMPLATE_ID,
};

export default env;
