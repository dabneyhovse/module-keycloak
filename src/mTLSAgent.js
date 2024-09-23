import { Agent } from "https";
import { readFile } from "fs/promises";

const mTLSAgent = new Agent({
  key: await readFile(process.env.CLIENT_KEY_PATH, "utf8"),
  cert: await readFile(process.env.CLIENT_CERT_PATH, "utf8"),
});

export default mTLSAgent;