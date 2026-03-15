let leaderboard = [
  {name:"Alice", earnings:1200},
  {name:"Bob", earnings:950},
  {name:"Charlie", earnings:800},
  {name:"Diana", earnings:600},
  {name:"Ethan", earnings:450}
];

const container = document.getElementById("leaderboard-container");

leaderboard.sort((a,b)=>b.earnings-a.earnings);

leaderboard.forEach((c,i)=>{
  const card = document.createElement("div");
  card.className="bounty-card";
  card.innerHTML=`<h3>#${i+1} ${c.name}</h3><p>Earnings: ${c.earnings} USDC</p>`;
  container.appendChild(card);
});

const walletBtn=document.getElementById("wallet-btn");
walletBtn.addEventListener("click", async()=>{
  if(window.solana && window.solana.isPhantom){
    try{
      const resp = await window.solana.connect();
      alert(`Wallet connected: ${resp.publicKey.toString()}`);
    }catch{alert("Wallet connection failed");}
  }else{alert("Phantom wallet not found! Install Phantom first.");}
});