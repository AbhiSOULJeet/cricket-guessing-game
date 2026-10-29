const players = [
  {
    name: "Virat Kohli",
    country: "India",
    role: "Batter",
    initials: "VK",
    trophies: ["ICC Cricket World Cup 2011", "ICC Champions Trophy 2013", "ICC T20 World Cup 2024"],
  },
  {
    name: "Rohit Sharma",
    country: "India",
    role: "Batter",
    initials: "RS",
    trophies: ["ICC Cricket World Cup 2011", "ICC T20 World Cup 2024"],
  },
  {
    name: "MS Dhoni",
    country: "India",
    role: "Wicketkeeper",
    initials: "MD",
    trophies: ["ICC Cricket World Cup 2011", "ICC Champions Trophy 2013", "ICC T20 World Cup 2007"],
  },
  {
    name: "Travis Head",
    country: "Australia",
    role: "Batter",
    initials: "TH",
    trophies: ["ICC Cricket World Cup 2023"],
  },
  {
    name: "Pat Cummins",
    country: "Australia",
    role: "Bowler",
    initials: "PC",
    trophies: ["ICC Cricket World Cup 2023", "ICC World Test Championship 2021-23"],
  },
  {
    name: "Ben Stokes",
    country: "England",
    role: "All-Rounder",
    initials: "BS",
    trophies: ["ICC Cricket World Cup 2019", "ICC T20 World Cup 2022"],
  },
  {
    name: "Jos Buttler",
    country: "England",
    role: "Wicketkeeper",
    initials: "JB",
    trophies: ["ICC T20 World Cup 2022"],
  },
  {
    name: "Babar Azam",
    country: "Pakistan",
    role: "Batter",
    initials: "BA",
    trophies: ["ICC Champions Trophy 2017"],
  },
  {
    name: "Kagiso Rabada",
    country: "South Africa",
    role: "Bowler",
    initials: "KR",
    trophies: ["ICC Champions Trophy 2025"],
  },
  {
    name: "Shakib Al Hasan",
    country: "Bangladesh",
    role: "All-Rounder",
    initials: "SA",
    trophies: ["ICC Champions Trophy 2017 (Runner-up)"],
  },
  {
    name: "Kusal Mendis",
    country: "Sri Lanka",
    role: "Wicketkeeper",
    initials: "KM",
    trophies: ["ICC T20 World Cup 2014"],
  },
  {
    name: "Suryakumar Yadav",
    country: "India",
    role: "Batter",
    initials: "SY",
    trophies: ["ICC T20 World Cup 2024"],
  },
];

const spinner = document.getElementById("spinner");
const avatar = document.getElementById("avatar");
const mysteryName = document.getElementById("mysteryName");
const mysteryMeta = document.getElementById("mysteryMeta");
const optionsContainer = document.getElementById("options");
const statusText = document.getElementById("status");
const trophyList = document.getElementById("trophyList");
const randomBtn = document.getElementById("randomBtn");

let currentPlayer = null;
let roundLocked = false;

function shuffleArray(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderTrophies(player) {
  trophyList.innerHTML = "";
  player.trophies.forEach((trophy) => {
    const badge = document.createElement("span");
    badge.className = "trophy-pill";
    badge.textContent = trophy;
    trophyList.appendChild(badge);
  });
}

function revealPlayer(player) {
  avatar.textContent = player.initials;
  mysteryName.textContent = player.name;
  mysteryMeta.textContent = `${player.country} • ${player.role}`;
  renderTrophies(player);
}

function setStatus(message, type = "") {
  statusText.textContent = message;
  statusText.className = `status ${type}`.trim();
}

function buildRound() {
  const correctPlayer = players[Math.floor(Math.random() * players.length)];
  const incorrectPlayers = shuffleArray(players.filter((player) => player.name !== correctPlayer.name)).slice(0, 3);
  const answerOptions = shuffleArray([correctPlayer, ...incorrectPlayers]);

  currentPlayer = correctPlayer;
  roundLocked = false;

  avatar.textContent = "?";
  mysteryName.textContent = "?????";
  mysteryMeta.textContent = "Country • Role";
  trophyList.innerHTML = "";
  optionsContainer.innerHTML = "";

  answerOptions.forEach((player) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = player.name;
    button.addEventListener("click", () => handleGuess(player.name, button));
    optionsContainer.appendChild(button);
  });

  setStatus("Pick the correct player!");
}

function handleGuess(selectedName, buttonElement) {
  if (roundLocked) return;
  roundLocked = true;

  const allButtons = [...document.querySelectorAll(".choice-btn")];

  allButtons.forEach((button) => {
    button.disabled = true;
    const isCorrect = button.textContent === currentPlayer.name;
    if (isCorrect) {
      button.classList.add("correct");
    }
    if (button.textContent === selectedName && selectedName !== currentPlayer.name) {
      button.classList.add("wrong");
    }
  });

  if (selectedName === currentPlayer.name) {
    revealPlayer(currentPlayer);
    setStatus(`Correct! ${currentPlayer.name} has won: ${currentPlayer.trophies.join(" • ")}`, "success");
  } else {
    revealPlayer(currentPlayer);
    setStatus(`Not quite! The correct answer is ${currentPlayer.name}. They have won: ${currentPlayer.trophies.join(" • ")}`, "error");
  }
}

function spinForRandomPlayer() {
  spinner.classList.remove("spin");
  void spinner.offsetWidth;
  spinner.classList.add("spin");

  setStatus("Searching for a random player...");
  setTimeout(() => {
    spinner.classList.remove("spin");
    buildRound();
  }, 1200);
}

randomBtn.addEventListener("click", spinForRandomPlayer);

buildRound();
