const { NEXT_PUBLIC_SERVER_URL } = process.env;

if (!NEXT_PUBLIC_SERVER_URL) {
  throw new Error("server url is not defined");
}

export const env = {
  serverUrl: NEXT_PUBLIC_SERVER_URL,
};