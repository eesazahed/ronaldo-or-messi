import express from "express";
import { getUserInfo } from "@replit/repl-auth";

const app = express();

import Vote from "./models/Vote.js";
import alreadyVoted from "./utils/alreadyVoted.js";
import vote from "./utils/vote.js";
import getAllVotes from "./utils/getAllVotes.js";

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
})

app.get("/", async (req, res) => {
  const user = getUserInfo(req);
  const loggedIn = !!user;
  const votes = await getAllVotes();
	
	const userAlreadyVoted = loggedIn ? await alreadyVoted(user.name) === "already voted" : false;
	
  res.render("index", { loggedIn, votes, userAlreadyVoted });
});

app.post("/vote/:player", async (req, res) => {
  const user = getUserInfo(req);

  if (user) {
    const username = user.name;

    const success = await vote(username, parseInt(req.params.player));

    if (success) {
      const votes = await getAllVotes();
      return res.status(200).json({ ...votes, message: "Success."});
    } else {
      return res.status(400).json({ message: "There was an error in voting." });
    }
  } else {
		 return res.status(401).json({ message: "You must be logged in to vote." });
	}
});

app.get("/api", async(req, res) => {
	const votes = await getAllVotes();
  return res.status(200).json(votes);
});

app.get("/api/data", async(req, res) => {
	const votes = await Vote.findAll({ raw: true });
	return res.status(200).json(votes);
});

app.listen(8080);
