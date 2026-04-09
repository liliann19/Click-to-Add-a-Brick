let score = 100;
let pointsPerClick = 1;
let pointsPerSec = 0;
const intervalBrick = setInterval(() => {
    score += pointsPerSec;
    renderUpgrades();
}, 1000);
let upgradeArray = [{
    id: 1,
    name: "Bigger Bricks",
    cost: 100,
    bonus: 1
}, {
    id: 2,
    name: "Better Tools",
    cost: 150,
    bonus: 2
}, {
    id: 3,
    name: "Cement Mixer",
    cost: 200,
    bonus: 3
}, {
    id: 4,
    name: "Brick Mixer",
    cost: 300,
    bonus: 4
}]

let specialArray = [{
    id: 1,
    name: "Hire Worker",
    cost: 100,
    bonus: 1
}, {
    id: 2,
    name: "Hire 5 Workers",
    cost: 500,
    bonus: 5
}, {
    id: 3,
    name: "Hire 25 Workers",
    cost: 2500,
    bonus: 25
}, {
    id: 4,
    name: "Hire a crew",
    cost: 12500,
    bonus: 125
}, {
    id: 5,
    name: "Hire the devs (Orion & Lilian)",
    cost: 25000,
    bonus: 600
}]

const scoreDisplay = document.getElementById("score-display");
const rateDisplay = document.getElementById("rate-display");
const ratesecDisplay = document.getElementById("rates-display");
const upgradesDiv = document.getElementById("upgrades")
const supgradesDiv = document.getElementById("supgrades")

function updateDisplay() {
    scoreDisplay.innerText = `Bricks: ${score}`;
    rateDisplay.innerText = `Bricks per click: ${pointsPerClick}`;
    ratesecDisplay.innerText = `Bricks per second: ${pointsPerSec}`;
}

function renderUpgrades() {
    upgradesDiv.innerHTML = "";
    supgradesDiv.innerHTML= "";
    upgradeArray.forEach((el) => {
        const upgradeSection = document.createElement("div");

        // Like we discussed in class, everytime it reloads the upgrades section
        // it will check if the specific upgrade is buyable and will just use
        // either one of these HTML blocks to stop the user from buying it.
        // Its not a proper implement but it works.
        if (score >= el.cost) {
            //Can afford upgrade
            upgradeSection.innerHTML = `
            <strong>${el.name}</strong> \n Cost: ${el.cost} | ${el.bonus} bricks per click
            <button onclick="buyUpgrade(${el.id})" class="buybtn">Buy</button>`;
            upgradesDiv.appendChild(upgradeSection);
        } else {
            //Can't afford upgrade
            upgradeSection.innerHTML = `
            <strong>${el.name}</strong> \n Cost: ${el.cost} | ${el.bonus} bricks per click
            <button onclick="buyUpgrade(${el.id})" class="buybtn" disabled>Buy</button>`;
            upgradesDiv.appendChild(upgradeSection);
        }
    })
    specialArray.forEach((el) => {
        const upgradeSection = document.createElement("div");

        // Like we discussed in class, everytime it reloads the upgrades section
        // it will check if the specific upgrade is buyable and will just use
        // either one of these HTML blocks to stop the user from buying it.
        // Its not a proper implement but it works.
        if (score >= el.cost) {
            //Can afford upgrade
            upgradeSection.innerHTML = `
            <strong>${el.name}</strong> \n Cost: ${el.cost} | ${el.bonus} bricks per second
            <button onclick="sbuyUpgrade(${el.id})" class="buybtn">Buy</button>`;
            supgradesDiv.appendChild(upgradeSection);
        } else {
            //Can't afford upgrade
            upgradeSection.innerHTML = `
            <strong>${el.name}</strong> \n Cost: ${el.cost} | ${el.bonus} bricks per second
            <button onclick="sbuyUpgrade(${el.id})" class="buybtn" disabled>Buy</button>`;
            supgradesDiv.appendChild(upgradeSection);
        }
    })
    updateDisplay();
    updateMilestones();
}


function buyUpgrade(elementUpgrade) {
    const upgradePurchase = upgradeArray.find((el) => el.id === elementUpgrade)
    console.log(upgradePurchase)
    score -= upgradePurchase.cost;
    pointsPerClick += upgradePurchase.bonus
    renderUpgrades()
}
function sbuyUpgrade(elementUpgrade) {
    let upgradePurchase = specialArray.find((el) => el.id === elementUpgrade)
    console.log(upgradePurchase)
    score -= upgradePurchase.cost;
    pointsPerSec += upgradePurchase.bonus
    specialArray.splice(upgradePurchase-1, 1)
    renderUpgrades()
}

document.getElementById("click-btn").addEventListener("click", (event) => {
    score += pointsPerClick;
    renderUpgrades();

});

//milestone function 
function updateMilestones() {
    const title = document.querySelector("h1");
    const winMessage = document.getElementById("win");

    if (score >= 50000) {
        document.body.style.backgroundColor = "#aec7a5";
        title.textContent = "Building Completed!";
        winMessage.style.display = "block";
    }
    else if (score >= 25000) {
        document.body.style.backgroundColor = "#c97b63"; 
        title.textContent = "Building Taking Shape"
    } else if (score >= 15000) {
        document.body.style.backgroundColor = "#e8c27d";
        title.textContent = "Walls Going Up"
    } else if (score >= 5000) {
        document.body.style.backgroundColor = "#b7c9a8";
        title.textContent = "Foundation Started"
    }
    
}

renderUpgrades()