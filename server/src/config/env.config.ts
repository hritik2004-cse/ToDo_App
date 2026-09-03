import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT);
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const OTP_EXPIRY_DURATION = Number(process.env.OTP_EXPIRY_DURATION);
const TOKEN_EXPIRY_DURATION = Number(process.env.TOKEN_EXPIRY_DURATION);
const { MONGODB_URI, CLIENT_URL } = process.env;

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

if (!MONGODB_URI) {
  throw new Error("mongoDB uri is not defined");
}

if (!CLIENT_URL) {
  throw new Error("client url is not defined");
}

const env = {
  port: PORT,
  clientUrl: CLIENT_URL,
  saltRounds: SALT_ROUNDS,
  mongoDbUri: MONGODB_URI,
  otpExpiryDuration: OTP_EXPIRY_DURATION,
  tokenExpiryDuration: TOKEN_EXPIRY_DURATION,
};

export default env;
