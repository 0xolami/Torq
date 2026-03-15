let projectBounties = JSON.parse(localStorage.getItem("projectBounties")) || [
  {id:1, task:"Create X thread", reward:250},
  {id:2, task:"Design memes", reward:100},
];

const container = document.getElementById("project-bounties");
const addBtn = document.getElementById("add-bounty");

function renderProjectBounties(){
  container.innerHTML="";
  projectBounties.forEach(b=>{
    const card = document.createElement("div");
    card.className="bounty-card";
    card.innerHTML=`<h3>${b.task}</h3><div class="reward">${b.reward} USDC</div>`;
    container.appendChild(card);
  });
}

addBtn.addEventListener("click",()=>{
  const name = document.getElementById("task-name").value;
  const reward = parseInt(document.getElementById("task-reward").value);
  if(name && reward){
    const id = projectBounties.length+1;
    projectBounties.push({id, task:name, reward});
    localStorage.setItem("projectBounties", JSON.stringify(projectBounties));
    renderProjectBounties();
  }
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

renderProjectBounties();