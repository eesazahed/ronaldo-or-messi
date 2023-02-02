import Vote from "../models/Vote.js";
import alreadyVoted from "./alreadyVoted.js";

const vote = async (username, option) => {
  const userAlreadyVoted = await alreadyVoted(username);
	
  if (userAlreadyVoted === "already voted") { // user already voted
    return false;
  }

	if (option !== 0 && option !== 1) {
		return false; // not valid option
	}

  await Vote.create({ username: userAlreadyVoted, option: option });
	
	return true;
};

export default vote;
