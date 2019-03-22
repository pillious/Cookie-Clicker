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


    }

    bulkBuy = 1;

    //buy cost
    farmCost = 100;
    truckCost = 1000;
    factoryCost = 100000;

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
    alert(cookiesCount);
    userdata = {
        cookiesCount: cookiesCount,
        cps: cps,
        cpc: cpc,
        farms: farms,
        trucks: trucks,
        factories: factories
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
    if (upgradesBought >= 0) {
        farms += upgradesBought;
        farmsCountSpan.innerHTML = farms;
    }

}

function truckClicked() {
    var upgradesBought = updateCookiesInfo(truckCost, truckCps, truckCpc)
    if (upgradesBought >= 0) {
        trucks += upgradesBought;
        trucksCountSpan.innerHTML = trucks;
    }
}

function factoryClicked() {
    var upgradesBought = updateCookiesInfo(factoryCost, factoryCps, factoryCpc)
    if (upgradesBought >= 0) {
        factories += upgradesBought;
        factoriesCountSpan.innerHTML = factories;
    }
}

function updateCookiesInfo(upgradeCost, upgradeCps, upgradeCpc) {
    if (bulkBuy === "Max") {
        var maxBuy = Math.floor(cookiesCount / upgradeCost);
        updateCookiesCount(-Math.abs(upgradeCost * maxBuy));
        cpsCount(upgradeCps * maxBuy);
        cpcCount(upgradeCpc * maxBuy);
        return maxBuy;
    } else if (cookiesCount > upgradeCost * bulkBuy) {
        updateCookiesCount(-Math.abs(upgradeCost * bulkBuy));
        cpsCount(upgradeCps * bulkBuy);
        cpcCount(upgradeCpc * bulkBuy);
        return bulkBuy;
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
        cookiesCount = 0;
        cookiesCounterSpan.innerHTML = cookiesCount;
        cpc = 1;
        cpcSpan.innerHTML = cps;
        cps = 0;
        cpsSpan.innerHTML = cps;
    
        farms = 0;
        farmsCountSpan.innerHTML = farms;
        trucks = 0;
        trucksCountSpan.innerHTML = trucks;
        factories = 0;
        factoriesCountSpan.innerHTML = factories;
    }

}