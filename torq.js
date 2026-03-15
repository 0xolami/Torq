const bounties = [
  {id:1, project:"NovaChain", task:"Create X thread", reward:"$250 USDC"},
  {id:2, project:"MetaLayer", task:"Design memes", reward:"$100 USDC"},
  {id:3, project:"CryptoPulse", task:"YouTube review", reward:"$500 USDC"},
  {id:4, project:"SolStarter", task:"Host a Twitter Space", reward:"$150 USDC"},
];

const container = document.getElementById("bounty-container");

bounties.forEach(b => {
  const card = document.createElement("div");
  card.className = "bounty-card";
  card.innerHTML = `
    <h3>${b.project}</h3>
    <p>${b.task}</p>
    <div class="reward">${b.reward}</div>
    <button>View</button>
  `;
  container.appendChild(card);
});

// Phantom Wallet Connect
const walletBtn = document.getElementById("wallet-btn");
walletBtn.addEventListener("click", async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      alert(`Wallet connected: ${resp.publicKey.toString()}`);
    } catch {
      alert("Wallet connection failed");
    }
  } else {
    alert("Phantom wallet not found! Install Phantom first.");
  }
});

const grid = document.getElementById('grid-bg');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  grid.style.backgroundPosition = `${x * 500}px ${y * 500}px, ${x * 500}px ${y * 500}px`;
});