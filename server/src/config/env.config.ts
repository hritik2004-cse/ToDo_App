import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT);
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const { MONGODB_URI } = process.env;

if (!Number.isInteger(SALT_ROUNDS) || SALT_ROUNDS <= 0) {
  throw new Error("salt rounds is not defined");
}

if (!Number.isInteger(PORT) || PORT <= 3000) {
  throw new Error("port is not defined or value is small");
}

if (!MONGODB_URI) {
  throw new Error("mongoDB uri is not defined");
}

const env = {
  port: PORT,
  saltRounds: SALT_ROUNDS,
  mongoDbUri: MONGODB_URI,
};

export default env;
