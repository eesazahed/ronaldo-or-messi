import Vote from "../models/Vote.js";

const getAllVotes = async () => {
  try {
    const votes = await Vote.findAll({ raw: true });

    const ronaldoVoters = votes.filter((vote) => vote.option === 0).length;
    const messiVoters = votes.filter((vote) => vote.option === 1).length;
    let winning = "";

    if (ronaldoVoters > messiVoters) {
      winning = "Ronaldo is winning!";
    } else if (messiVoters > ronaldoVoters) {
      winning = "Messi is winning!";
    } else {
      winning = "It's a tie!";
    }

    return { ronaldoVoters, messiVoters, winning };
  } catch {
    return null;
  }
};

export default getAllVotes;
