const ronaldoBtn = document.getElementById("ronaldoBtn");
const messiBtn = document.getElementById("messiBtn");
const ronaldoVoters = document.getElementById("ronaldoVoters");
const messiVoters = document.getElementById("messiVoters");
const isWinning = document.getElementById("isWinning");
const vote = document.getElementById("vote");
const loading = document.getElementById("loading");

if (ronaldoBtn && messiBtn) {console.log(1)
	ronaldoBtn.onclick = async () => {
	  loading.innerText = "Loading...";
	  const response = await fetch("/vote/0", { method: "POST" });
		const data = await response.json();
		
	  if (response.status === 200) {
	    isWinning.innerText = data.winning;
	    ronaldoVoters.innerText = data.ronaldoVoters;
	    messiVoters.innerText = data.messiVoters;
	    vote.innerHTML = "<h3>You've already voted!</h3>";
	    loading.innerText = "";
	  } else {
	    loading.innerText = data.message;
	  }
	};
	
	messiBtn.onclick = async () => {
	  loading.innerText = "Loading...";
	  const response = await fetch("/vote/1", { method: "POST" });
		const data = await response.json();
		
	  if (response.status === 200) {
	    isWinning.innerText = data.winning;
	    ronaldoVoters.innerText = data.ronaldoVoters;
	    messiVoters.innerText = data.messiVoters;
	    vote.innerHTML = "<h3>You've already voted!</h3>";
	    loading.innerText = "";
	  } else {
	    loading.innerText = data.message;
	  }
	};

}
