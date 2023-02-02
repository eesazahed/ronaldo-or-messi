import crypto from "crypto";

import Vote from "../models/Vote.js";

const alreadyVoted = async (username) => {

	const cipher = crypto.createCipheriv("aes-256-gcm", process.env.SECRET_KEY.substr(0, 32), process.env.SECRET_KEY.substr(0, 32));

	const encrypted = cipher.update(username.toString(), "utf8", "hex") + cipher.final("hex");
	
  const exists = await Vote.findOne({ where: { username: encrypted } });

  if (exists) {
    return "already voted";
  } else {
    return encrypted;
  }
};

export default alreadyVoted;
