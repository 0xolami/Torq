let bounties = JSON.parse(localStorage.getItem("creatorBounties")) || [
  {id:1, project:"NovaChain", task:"Create X thread", reward:250, claimed:false},
  {id:2, project:"MetaLayer", task:"Design memes", reward:100, claimed:false},
  {id:3, project:"CryptoPulse", task:"YouTube review", reward:500, claimed:false},
  {id:4, project:"SolStarter", task:"Host a Twitter Space", reward:150, claimed:false},
];

let totalEarnings = parseFloat(localStorage.getItem("totalEarnings")) || 0;
const container = document.getElementById("creator-bounties");
const earningsDisplay = document.getElementById("total-earnings");
const walletBtn = document.getElementById("wallet-btn");
let walletPublicKey = localStorage.getItem("walletPublicKey") || null;

function renderBounties(){
  container.innerHTML="";
  bounties.forEach(b=>{
    const card = document.createElement("div");
    card.className="bounty-card";
    card.innerHTML=`<h3>${b.project}</h3><p>${b.task}</p><div class="reward">${b.reward} USDC</div><button ${b.claimed?"disabled":""}>Claim</button>`;
    card.querySelector("button").addEventListener("click",()=>claimBounty(b.id));
    container.appendChild(card);
  });
  earningsDisplay.textContent = totalEarnings;
}

function claimBounty(id){
  if(!walletPublicKey){alert("Connect your wallet first!"); return;}
  const bounty = bounties.find(b=>b.id===id);
  if(!bounty.claimed){
    bounty.claimed = true;
    const platformFee = bounty.reward*0.1;
    totalEarnings += bounty.reward-platformFee;
    localStorage.setItem("totalEarnings", totalEarnings);
    localStorage.setItem("creatorBounties", JSON.stringify(bounties));
    alert(`Simulated USDC transfer: ${bounty.reward-platformFee} sent to ${walletPublicKey}`);
    renderBounties();
  }
}

walletBtn.addEventListener("click", async()=>{
  if(window.solana && window.solana.isPhantom){
    try{
      const resp = await window.solana.connect();
      walletPublicKey = resp.publicKey.toString();
      localStorage.setItem("walletPublicKey", walletPublicKey);
      alert(`Wallet connected: ${walletPublicKey}`);
    }catch{alert("Wallet connection failed");}
  }else{alert("Phantom wallet not found! Install Phantom first.");}
});

renderBounties();