import Vote from "../models/Vote.js";
import alreadyVoted from "./alreadyVoted.js";

const vote = async (userid, username, option) => {
  const userAlreadyVoted = await alreadyVoted(userid, username);

  if (userAlreadyVoted === "already voted") {
    // user already voted
    return false;
  }

  if (option !== 0 && option !== 1) {
    return false; // not valid option
  }

  await Vote.create({ userid: userAlreadyVoted, option });

  return true;
};

export default vote;
