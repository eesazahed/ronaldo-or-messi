import crypto from "crypto";
import Vote from "../models/Vote.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const oldUsers = require("../oldUsers.json");

const key = process.env.SECRET_KEY.substr(0, 32);
const method = "aes-256-gcm";

const alreadyVoted = async (userid, username) => {
  const usernameCipher = crypto.createCipheriv(method, key, key);
  const useridCipher = crypto.createCipheriv(method, key, key);

  const encryptedId =
    useridCipher.update(userid.toString(), "utf8", "hex") +
    useridCipher.final("hex");
  const encryptedUsername =
    usernameCipher.update(username.toString(), "utf8", "hex") +
    usernameCipher.final("hex");

  const usernameExists = oldUsers.includes(encryptedUsername);

  if (usernameExists) {
    return "already voted";
  }

  const exists = await Vote.findOne({ where: { userid: encryptedId } });

  if (exists) {
    return "already voted";
  } else {
    return encryptedId;
  }
};

export default alreadyVoted;
