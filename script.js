var cookiesCount;
var cpc; //cookies per click
var cps; //cookies per second (auto)

//buy upgrades in bulk (x1, x10, x100, x1000, Max)
var bulkBuy;

var cookiesCounterSpan = document.getElementById("cookiesCounterSpan")
var cpsSpan = document.getElementById("cpsSpan");
var cpcSpan = document.getElementById("cpcSpan");

var bulkBuyBtn = document.getElementById("bulkBuyBtn");

var farmsCountSpan = document.getElementById("farmsCountSpan");
var trucksCountSpan = document.getElementById("trucksCountSpan");
var factoriesCountSpan = document.getElementById("factoriesCountSpan");

var farmCostSpan = document.getElementById("farmCostSpan");
var truckCostSpan = document.getElementById("truckCostSpan");
var factoryCostSpan = document.getElementById("factoryCostSpan");

//amount of upgrades bought
var farms;
var trucks;
var factories;

// Upgrades cost
var farmCost;
var truckCost;
var factoryCost;

//Upgrade Cpc 
var farmCpc;
var truckCpc;
var factoryCpc;

window.onload = function () {
    if (localStorage.getItem("userdata") === null) {
        cookiesCount = 0;
        cookiesCounterSpan.innerHTML = cookiesCount;

        cps = 0;
        cpsSpan.innerHTML = cps;


        cpc = 1;
        cpcSpan.innerHTML = cpc;

        //amount of upgrades bought
        farms = 0;
        trucks = 0;
        factories = 0;

        //cost of upgrades
        farmCost = 100;
        truckCost = 1000;
        factoryCost = 100000;

    } else {
        var userdata = JSON.parse(localStorage.getItem('userdata'));
        cookiesCount = userdata.cookiesCount;
        cookiesCounterSpan.innerHTML = cookiesCount;

        cps = userdata.cps;
        cpsSpan.innerHTML = cps;

        cpc = userdata.cpc;
        cpcSpan.innerHTML = cpc;


        //amount of upgrades bought
        farms = userdata.farms;
        farmsCountSpan.innerHTML = farms;

        trucks = userdata.trucks;
        trucksCountSpan.innerHTML = trucks;

        factories = userdata.factories;
        factoriesCountSpan.innerHTML = factories;

        //cost of upgrades
        farmCost = userdata.farmCost;
        farmCostSpan.innerHTML = farmCost;

        truckCost = userdata.truckCost;
        truckCostSpan.innerHTML = truckCost;

        factoryCost = userdata.factoryCost;
        factoryCostSpan.innerHTML = factoryCost;

    }

    bulkBuy = 1;


    //cookies per click upgrade
    farmCpc = 1;
    truckCpc = 15;
    factoryCpc = 1600;

    //cookies per second upgrade
    farmCps = 0;
    truckCps = 5;
    factoryCps = 650;
};

window.onbeforeunload = function () {
    userdata = {
        cookiesCount: cookiesCount,
        cps: cps,
        cpc: cpc,
        farms: farms,
        trucks: trucks,
        factories: factories,
        farmCost: farmCost,
        truckCost: truckCost,
        factoryCost: factoryCost
    };
    localStorage.setItem('userdata', JSON.stringify(userdata));

};

function cookieClicked() {
    updateCookiesCount(cpc);
}

function updateCookiesCount(cookiesAddedOrSubtracted) {
    cookiesCount += cookiesAddedOrSubtracted;
    cookiesCounterSpan.innerHTML = cookiesCount;
}

function cpcCount(cpcAdded) {
    cpc += cpcAdded;
    cpcSpan.innerHTML = cpc;
}

function cpsCount(cpsAdded) {
    cps += cpsAdded
    cpsSpan.innerHTML = cps;
}

function farmClicked() {
    var upgradesBought = updateCookiesInfo(farmCost, farmCps, farmCpc)
    // {amountBought: maxBuy, nextUpgradeCost: upgradeCost};
    console.log(upgradesBought)
    if (upgradesBought.nextUpgradeCost >= 0) {
        farms += upgradesBought.amountBought;
        console.log(upgradesBought.amountBought)
        farmsCountSpan.innerHTML = farms;

        farmCost = upgradesBought.nextUpgradeCost;
        farmCostSpan.innerHTML = upgradesBought.nextUpgradeCost;

        console.log(upgradesBought)
    }

}

function truckClicked() {
    var upgradesBought = updateCookiesInfo(truckCost, truckCps, truckCpc)
    // {amountBought: maxBuy, nextUpgradeCost: upgradeCost};
    if (upgradesBought.nextUpgradeCost >= 0) {
        trucks += upgradesBought.amountBought;
        trucksCountSpan.innerHTML = trucks;

        truckCost = upgradesBought.nextUpgradeCost;
        truckCostSpan.innerHTML = upgradesBought.nextUpgradeCost;
    }
}

function factoryClicked() {
    var upgradesBought = updateCookiesInfo(factoryCost, factoryCps, factoryCpc)
    // {amountBought: maxBuy, nextUpgradeCost: upgradeCost};
    console.log(upgradesBought)
    if (upgradesBought.nextUpgradeCost >= 0) {
        factories += upgradesBought.amountBought;
        factoriesCountSpan.innerHTML = factories;

        factoryCost = upgradesBought.nextUpgradeCost;
        factoryCostSpan.innerHTML = upgradesBought.nextUpgradeCost;
    }
}

function updateCookiesInfo(upgradeCost, upgradeCps, upgradeCpc) {
    if (bulkBuy === "Max") {
        var maxBuy = 0;
        while (upgradeCost <= cookiesCount) {
            updateCookiesCount(-Math.abs(Math.floor(upgradeCost)));
            upgradeCost = upgradeCost * 1.1;
            maxBuy++;
            console.log(maxBuy);
        }
        upgradeCost = Math.floor(upgradeCost)
        cpsCount(upgradeCps * maxBuy);
        cpcCount(upgradeCpc * maxBuy);
        return {
            amountBought: maxBuy,
            nextUpgradeCost: upgradeCost
        };
    }
    else {
        var bulkUpgradeCost = upgradeCost;
        for (var i = 0; i < bulkBuy - 1; i++) {
                // console.log(bulkUpgradeCost + "," + cookiesCount)
                bulkUpgradeCost += upgradeCost * Math.pow(1.1, i + 1);
                console.log(Math.floor(bulkUpgradeCost))
        }
        bulkUpgradeCost = Math.floor(bulkUpgradeCost)
        if (bulkUpgradeCost <= cookiesCount) {
            console.log("enough cookies" + bulkUpgradeCost)
            updateCookiesCount(-bulkUpgradeCost);
            cpsCount(upgradeCps * bulkBuy);
            cpcCount(upgradeCpc * bulkBuy);
            return {
                amountBought: bulkBuy,
                nextUpgradeCost: Math.floor(upgradeCost * Math.pow(1.1, bulkBuy))
            };
        } else {
            console.log("not enough cookies" + bulkUpgradeCost)
            return {
                amountBought: 0,
                nextUpgradeCost: upgradeCost
            };
        }
    }
}

function rotateThroughBulkBuyOptions() {
    if (bulkBuy === 1) {
        bulkBuy = 10;
        bulkBuyBtn.innerHTML = "x" + bulkBuy;
    } else if (bulkBuy === 10) {
        bulkBuy = 100;
        bulkBuyBtn.innerHTML = "x" + bulkBuy;
    } else if (bulkBuy === 100) {
        bulkBuy = 1000;
        bulkBuyBtn.innerHTML = "x" + bulkBuy;
    } else if (bulkBuy === 1000) {
        bulkBuy = "Max";
        bulkBuyBtn.innerHTML = bulkBuy;
    } else {
        bulkBuy = 1;
        bulkBuyBtn.innerHTML = "x" + bulkBuy;
    }
}

function resetGame() {
    var isConfirmed = confirm("Are you sure you want to reset your game?\n(You will lose all your progress!)")
    if (isConfirmed) {
        //reset cookie stats
        cookiesCount = 0;
        cookiesCounterSpan.innerHTML = 0;
        cpc = 1;
        cpcSpan.innerHTML = 1;
        cps = 0;
        cpsSpan.innerHTML = 0;

        //reset upgrades bought
        farms = 0;
        farmsCountSpan.innerHTML = farms;
        trucks = 0;
        trucksCountSpan.innerHTML = trucks;
        factories = 0;
        factoriesCountSpan.innerHTML = factories;

        //reset cost of upgrades
        farmCost = 100;
        farmCostSpan.innerHTML = farmCost;

        truckCost = 1000;
        truckCostSpan.innerHTML = truckCost;

        factoryCost = 100000;
        factoryCostSpan.innerHTML = factoryCost;
    }

}