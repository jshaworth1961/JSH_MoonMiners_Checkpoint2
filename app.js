//Moon Miner 2.0 2.3.2020 JSH
//holds player characteristics including storing
//click and auto upgrades in arrays
let player =
{
    cheeseBricks: 0,
    currentCheeseBricks: 0,
    clickInventory: [],
    autoInventory: []
};
//upgrades that influence how much can be mined
//newprice stores the price of the next purchase
//price stores price of current purchase
//harvest tells how much each item can extract in terms of cheesebricks

let clickUpgrades =
{
    shovel:
    {
        name: 'shovel',
        price: 60,
        newprice: 60,
        quantity: 0,
        multiplier: 1.2,
        harvest: 2
    },

    excavator:
    {
        name: 'excavator',
        price: 100,
        newprice: 100,
        quantity: 0,
        multiplier: 1.1,
        harvest: 20
    }

}

let autoUpgrades =
{
    jackhammer:
    {
        name: 'jackhammer',
        price: 80,
        newprice: 80,
        quantity: 0,
        multiplier: 1.5,
        harvest: 15
    },

    wheelbarrow:
    {
        name: 'wheelbarrow',
        price: 25,
        newprice: 25,
        quantity: 0,
        multiplier: 1.1,
        harvest: 6
    }

}

//this arrays are for interacting with local storage
let players = [];
let storedPlayers = [];

let storedClickInventory = [];
let storedAutoInventory = [];



//this string holds the html for a second form
let str = '';


loadPlayers(); //gets player characteristics from local storage
//loadInitialSettings(); //loads default settings
loadClickUpgrades(); //loads click upgrades that are in local storage (e.g. on a refresh)
loadAutoUpgrades(); //oads auto upgrades that are in local storage (e.g. on a refresh)

//turn buttons off that player does not have enough resources to buy
turnButtonsOnOff();

//loads default values
function loadInitialSettings() {

    let initialCheeseBricks = parseInt(players[0].currentCheeseBricks);
    player.cheeseBricks = parseInt(players[0].cheeseBricks);
    player.currentCheeseBricks = parseInt(players[0].currentCheeseBricks);
    //console.log(`init # of player.cheeseBricks is ${player.cheeseBricks}`);

    document.getElementById('input-tc').value =
        initialCheeseBricks;


    document.getElementById('input-tc').disabled = true;

    //shovel

    let initialShovelCount = clickUpgrades['shovel'].quantity;

    document.getElementById('i-shovel-count').value = initialShovelCount;

    document.getElementById('i-shovel-count').disabled = true;

    let initialShovelPrice = clickUpgrades['shovel'].price;

    document.getElementById('i-shovel-price').value
        = initialShovelPrice;

    document.getElementById('i-shovel-price').disabled = true;


    let initialShovelHarvestPower =
        clickUpgrades['shovel'].harvest;

    document.getElementById('i-shovel-harvest').value =
        initialShovelHarvestPower;

    document.getElementById('i-shovel-harvest').disabled = true;

    //excavator

    let initialExcavatorCount = clickUpgrades['excavator'].quantity;

    document.getElementById('i-excavator-count').value = initialExcavatorCount;

    document.getElementById('i-excavator-count').disabled;

    let initialExcavatorPrice = clickUpgrades['excavator'].price;

    document.getElementById('i-excavator-price').value = initialExcavatorPrice;

    document.getElementById('i-excavator-price').disabled;

    let initialExcavatorHarvestPower =
        clickUpgrades['excavator'].harvest;

    document.getElementById('i-excavator-harvest').value =
        initialExcavatorHarvestPower;

    document.getElementById('i-excavator-harvest').disabled = true;

    //jackhammer

    let initialJackhammerCount = autoUpgrades['jackhammer'].quantity;

    document.getElementById('i-jackhammer-count').value = initialJackhammerCount;

    document.getElementById('i-jackhammer-count').disabled;

    let initialJackhammerPrice = autoUpgrades['jackhammer'].price;

    document.getElementById('i-jackhammer-price').value = initialJackhammerPrice;

    document.getElementById('i-jackhammer-price').disabled;

    let initialJackhammerHarvestPower =
        autoUpgrades['jackhammer'].harvest;

    document.getElementById('i-jackhammer-harvest').value =
        initialJackhammerHarvestPower;

    document.getElementById('i-jackhammer-harvest').disabled = true;

    //wheelbarrow

    let initialWheelbarrowCount = autoUpgrades['wheelbarrow'].quantity;

    document.getElementById('i-wheelbarrow-count').value = initialWheelbarrowCount;

    document.getElementById('i-wheelbarrow-count').disabled;

    let initialWheelbarrowPrice = autoUpgrades['wheelbarrow'].price;

    document.getElementById('i-wheelbarrow-price').value = initialWheelbarrowPrice;

    document.getElementById('i-wheelbarrow-price').disabled;

    let initialWheelbarrowHarvestPower =
        autoUpgrades['wheelbarrow'].harvest;

    document.getElementById('i-wheelbarrow-harvest').value =
        initialWheelbarrowHarvestPower;

    document.getElementById('i-wheelbarrow-harvest').disabled = true;

}

//call to function that loads default settings 
loadInitialSettings();

//start autopart of Game
startInterval();

//function to turn buttons on and off based on if there are enough cheesebricks to buy the
//resource
function turnButtonsOnOff() {
    //console.log(`Made it to turnButtonsOnOff`);
    if (clickUpgrades['shovel'].price > player.currentCheeseBricks) {
        document.getElementById('btn-buy-shovel').disabled = true;
    }
    else {
        document.getElementById('btn-buy-shovel').disabled = false;
    }

    if (clickUpgrades['excavator'].price > player.currentCheeseBricks) {
        document.getElementById('btn-buy-excavator').disabled = true;
    }
    else {
        document.getElementById('btn-buy-excavator').disabled = false;
    }

    if (autoUpgrades['jackhammer'].price > player.currentCheeseBricks) {
        document.getElementById('btn-buy-jackhammer').disabled = true;
    }
    else {
        document.getElementById('btn-buy-jackhammer').disabled = false;
    }

    if (autoUpgrades['wheelbarrow'].price > player.currentCheeseBricks) {
        document.getElementById('btn-buy-wheelbarrow').disabled = true;
    }
    else {
        document.getElementById('btn-buy-wheelbarrow').disabled = false;
    }

}

//updates old prices to new prices after price calculations have been performed;
function updatePrices() {
    clickUpgrades['shovel'].price = clickUpgrades['shovel'].newprice;
    clickUpgrades['excavator'].price = clickUpgrades['excavator'].newprice;
    autoUpgrades['jackhammer'].price = autoUpgrades['jackhammer'].newprice;
    autoUpgrades['wheelbarrow'].price = autoUpgrades['wheelbarrow'].newprice;

}

//function that does cost and quantity calculations and resets prices when a clickUpgrade is purchased
function buyClickUpgrade(clickItem) {


    //console.log(`You purchased a(n) ${clickItem}`);

    player.clickInventory.push(clickUpgrades[clickItem]);

    //console.log(player.clickInventory);



    //find price
    /*
    let inv = player.clickInventory.filter(item => {
        console.log(player.clickInventory)
        console.log(item.name);
        console.log(clickItem);
        return item.name === clickItem;
    });
    */

    //console.log(`the inventory for ${clickItem} is ${inv}`);

    //update quantity and price of item
    clickUpgrades[clickItem].quantity++;

    let quantity = clickUpgrades[clickItem].quantity;

    //console.log(`The current quantity of ${clickItem}s is ${quantity}`);

    clickUpgrades[clickItem].newprice *= clickUpgrades[clickItem].multiplier;

    clickUpgrades[clickItem].newprice =
        Math.round(clickUpgrades[clickItem].newprice);

    let price = clickUpgrades[clickItem].price;
    let newprice = clickUpgrades[clickItem].newprice;

    //console.log(`The price of a ${clickItem} is ${clickUpgrades[clickItem].price}`);
    //console.log(`The new price of a ${clickItem} is ${clickUpgrades[clickItem].newprice}`);

    player.currentCheeseBricks -= price;
    players[0].currentCheeseBricks = player.currentCheeseBricks;

    document.getElementById('input-tc').value =
        player.currentCheeseBricks;
    //console.log(`in buyClickUpgrade player.cheeseBricks = ${player.cheeseBricks}`);

    switch (clickItem) {
        case ('shovel'):
            document.getElementById('i-shovel-count').value = quantity;
            document.getElementById('i-shovel-price').value = newprice;
            break;
        case ('excavator'):
            document.getElementById('i-excavator-count').value = quantity;
            document.getElementById('i-excavator-price').value = newprice;
            break;

        default:
            break;
    }



    turnButtonsOnOff();
    updatePrices();
    saveClickUpgrades(); //saves clickUpgrade to local storage
    savePlayer(); //any player updates are stored such as number of cheeseBricks

}

//function that calculates cheeseBricks mined on a click
//always at least one cheesebrick mined
function doSomeWorkOnClick() {

    //console.log("Do some work on click");

    let cheeseHarvested =

        1
        +
        clickUpgrades['shovel'].quantity * clickUpgrades['shovel'].harvest
        +

        clickUpgrades['excavator'].quantity * clickUpgrades['excavator'].harvest;

    player.currentCheeseBricks += cheeseHarvested;
    players[0].currentCheeseBricks = player.currentCheeseBricks;

    //console.log(`total cheeseBricks in doSomeWorkOnClick is ${player.cheeseBricks}`);

    document.getElementById('input-tc').value = player.currentCheeseBricks;

    turnButtonsOnOff();
    savePlayer();


}

//function that calculates costs and quantities and updates prices on an autoUpgrade purchase
function buyAutoUpgrade(autoItem) {
    //console.log(`You purchased a(n) ${autoItem}`);

    player.autoInventory.push(autoUpgrades[autoItem]);

    //console.log(player.autoInventory);

    //update quantity and price of item
    autoUpgrades[autoItem].quantity++;

    let quantity = autoUpgrades[autoItem].quantity;

    //console.log(`The current quantity of ${autoItem}s is ${quantity}`);

    autoUpgrades[autoItem].newprice *= autoUpgrades[autoItem].multiplier;

    autoUpgrades[autoItem].newprice =
        Math.round(autoUpgrades[autoItem].newprice);

    let price = autoUpgrades[autoItem].price;
    let newprice = autoUpgrades[autoItem].newprice;

    //console.log(`The price of a ${autoItem} is ${autoUpgrades[autoItem].price}`);
    //console.log(`The new price of a ${autoItem} is ${autoUpgrades[autoItem].newprice}`);

    player.currentCheeseBricks -= price;
    players[0].currentCheeseBricks = player.currentCheeseBricks;

    document.getElementById('input-tc').value =
        player.currentCheeseBricks;

    switch (autoItem) {
        case ('jackhammer'):
            document.getElementById('i-jackhammer-count').value = quantity;
            document.getElementById('i-jackhammer-price').value = newprice;
            break;
        case ('wheelbarrow'):
            document.getElementById('i-wheelbarrow-count').value = quantity;
            document.getElementById('i-wheelbarrow-price').value = newprice;
            break;

        default:
            break;
    }

    turnButtonsOnOff(); //turn buttons on off based on resources available 
    updatePrices(); //update prices
    calcTotalAutoUpgradePower(); //calculates the impact of autoUpgrades when setInterval invokes
    saveAutoUpgrades(); //saves auto upgrades to local storage
    savePlayer(); //saves player updates (e.g number of cheesebricks)
}


//calculates how many cheesebricks can be mined when the setInterval invokes this method
function calcTotalAutoUpgradePower() {
    let cheeseAutoHarvested =

        autoUpgrades['jackhammer'].quantity * autoUpgrades['jackhammer'].harvest

        +

        autoUpgrades['wheelbarrow'].quantity * autoUpgrades['wheelbarrow'].harvest;

    //console.log(`The amount of cheese auto harvested at the last 3 sec interval was ${cheeseAutoHarvested}`);

    player.currentCheeseBricks += cheeseAutoHarvested;
    players[0].currentCheeseBricks = player.currentCheeseBricks;
    //console.log(player.cheeseBricks);

    //console.log(`The total number of cheeseBricks in calcTotalAutoUpgradePower  is ${player.cheeseBricks}`);

    document.getElementById('input-tc').value = player.currentCheeseBricks;

    turnButtonsOnOff();
    savePlayer();


}

//every 3 seconds invokes the method that calculates the harvest power of autoupgrades
function startInterval() {

    //console.log(`In Start Interval`);
    let checkAutoGame = setInterval(calcTotalAutoUpgradePower, 3000);

}

//loads players from local storage: if there are no players creates a new default player
function loadPlayers() {
    //console.log('IN LOAD PLAYERS');


    storedPlayers =
        JSON.parse(window.localStorage.getItem('players'));

    if (storedPlayers !== 0) {

        players = storedPlayers;
    }
    else {
        player.cheeseBricks = 100;
        player.currentCheeseBricks = 100;
        players.push(player);
        savePlayer();

    }
}

//load in click upgrades that have been stored in local storage
function loadClickUpgrades() {
    let storedClickInventory = JSON.parse(window.localStorage.getItem('player.clickInventory'));
    console.log(storedClickInventory);

    if (storedClickInventory.length !== 0) {
        console.log('inside loadClickUpgrades');
        console.log(storedClickInventory);
        player.clickInventory = storedClickInventory;
        console.log(player.clickInventory);


        let shovelCount = 0;
        let excavatorCount = 0;
        player.clickInventory.forEach(item => {
            if (item.name === 'shovel') {
                shovelCount++;
                excavatorCount++;
            }

        });

        console.log(shovelCount);

        clickUpgrades['shovel'].quantity = shovelCount;
        clickUpgrades['excavator'].quantity = excavatorCount;

        let shovels = [];
        let excavators = [];

        storedClickInventory.forEach(item => {
            if (item.name === 'shovel') {
                shovels.push(item);
            }

            if (item.name === 'excavator') {
                excavators.push(item);
            }
        });

        //console.log(shovels);
        //console.log(shovels.length);
        //console.log(shovels.length - 1);
        //console.log(shovels[shovels.length -1].price);

        if (shovels.length !== 0) {



            let shovelPrice = shovels[shovels.length - 1].price;
            let shovelNewPrice = shovels[shovels.length - 1].newprice;

            clickUpgrades['shovel'].price = shovelPrice;
            clickUpgrades['shovel'].newprice = shovelNewPrice;

        }

        if (excavators.length !== 0) {

            let excavatorPrice = excavators[excavators.length - 1].price;
            let excavatorNewPrice = excavators[excavators.length - 1].newprice;

            clickUpgrades['excavator'].price = excavatorPrice;
            clickUpgrades['excavator'].newprice = excavatorNewPrice;

        }

    }
    else {
        loadInitialSettings();
    }

}

//loads in auto upgrades that have been stored in local storage
function loadAutoUpgrades() {
    let storedAutoInventory = JSON.parse(window.localStorage.getItem('player.autoInventory'));

    if (storedAutoInventory.length !== 0) {
        console.log('inside loadAutoUpgrades');
        console.log(storedAutoInventory);
        player.autoInventory = storedAutoInventory;
        console.log(player.autoInventory);


        let jackhammerCount = 0;
        let wheelbarrowCount = 0;
        player.autoInventory.forEach(item => {
            if (item.name === 'jackhammer') {
                jackhammerCount++;

            }
            if (item.name === "wheelbarrow") {
                wheelbarrowCount++;
            }

        });

        console.log(`wheelbarrow count is ${wheelbarrowCount}`);

        autoUpgrades['jackhammer'].quantity = jackhammerCount;
        autoUpgrades['wheelbarrow'].quantity = wheelbarrowCount;

        let jackhammers = [];
        let wheelbarrows = [];

        storedAutoInventory.forEach(item => {
            if (item.name === 'jackhammer') {
                jackhammers.push(item);
            }

            if (item.name === 'wheelbarrow') {
                wheelbarrows.push(item);
            }
        });


        if (jackhammers.length !== 0) {
            let jackhammerPrice = jackhammers[jackhammers.length - 1].price;
            let jackhammerNewPrice = jackhammers[jackhammers.length - 1].newprice;

            autoUpgrades['jackhammer'].price = jackhammerPrice;
            autoUpgrades['jackhammer'].newprice = jackhammerNewPrice;
        }

        if (wheelbarrows.length !== 0) {

            let wheelbarrowPrice = wheelbarrows[wheelbarrows.length - 1].price;
            let wheelbarrowNewPrice = wheelbarrows[wheelbarrows.length - 1].newprice;

            autoUpgrades['wheelbarrow'].price = wheelbarrowPrice;
            autoUpgrades['wheelbarrow'].newprice = wheelbarrowNewPrice;
        }

    }
    else {
        loadInitialSettings();
    }

}

//save player characteristics to local storage
function savePlayer() {
    window.localStorage.setItem('players',
        JSON.stringify(players));
}

//save click upgrades to local storage
function saveClickUpgrades() {
    //save to local storage
    window.localStorage.setItem('player.clickInventory', JSON.stringify(player.clickInventory));
}

//save auto upgrades to local storage
function saveAutoUpgrades() {
    //save to local storage
    window.localStorage.setItem('player.autoInventory', JSON.stringify(player.autoInventory));

}

//on second form this method loads the form and fills in current data on the number of starting cheesebricks: it allows the user to change the initial value
function loadPlayerSettings() {

    document.getElementById("main-form").hidden = true;
    document.getElementById('player-settings').disabled = true;

    loadPlayers();

    console.log(`The number of cheesebricks from players initially is ${players[0].cheeseBricks}`);




    str =

        `
        <fieldset id = "fieldset-player" class = "fieldset-player">
            <div class = "row container-fluid">
                <div class = "col-12 col-md-12">
                    <p class = "p-player-edit">
                        <label>Edit Player Settings</label>
                    </p>
                    <p class = "p-info">
                        <label class = "lbl-edit-cb">Initial Number of Cheesebricks</label>
                        <input  id = "num-cheesebricks" class ="input-edit-cb"   type = "text">
                    </p>
                    <p class = "p-info">
                        <button class = "btn-change-cb" onclick = 'changePlayerSettings()'>Edit Settings</class>
                    </p>
                    
                </div>
        </fieldset>
    
    `
    document.getElementById("player-form").innerHTML = str;

    document.getElementById('num-cheesebricks').value = players[0].cheeseBricks;


}

//on a button click this method changes the default value of number of cheesebricks available
function changePlayerSettings() {


    players[0].cheeseBricks = document.getElementById('num-cheesebricks').value;
    players[0].currentCheeseBricks = players[0].cheeseBricks;

    document.getElementById('input-tc').value = players[0].cheeseBricks;

    player.cheeseBricks = parseInt(players[0].cheeseBricks);
    player.currentCheeseBricks = parseInt(players[0].currentCheeseBricks);

    savePlayer();





    document.getElementById('fieldset-player').hidden = true;
    document.getElementById('main-form').hidden = false;

    turnButtonsOnOff();

}

//this method resets all upgrade properties to their default values
function resetToDefaultUpgrades() {

    clickUpgrades =
    {
        shovel:
        {
            name: 'shovel',
            price: 60,
            newprice: 60,
            quantity: 0,
            multiplier: 1.2,
            harvest: 2
        },

        excavator:
        {
            name: 'excavator',
            price: 100,
            newprice: 100,
            quantity: 0,
            multiplier: 1.1,
            harvest: 20
        }

    }

    autoUpgrades =
    {
        jackhammer:
        {
            name: 'jackhammer',
            price: 80,
            newprice: 80,
            quantity: 0,
            multiplier: 1.5,
            harvest: 15
        },

        wheelbarrow:
        {
            name: 'wheelbarrow',
            price: 25,
            newprice: 25,
            quantity: 0,
            multiplier: 1.1,
            harvest: 6
        }

    }

}
//this method clears local storage and resets cheesebricks available to default values;
function resetGame() {
    console.log(player.clickInventory);
    player.clickInventory = player.clickInventory.filter(item => item.name === '');
    saveClickUpgrades();

    player.autoInventory = player.autoInventory.filter(item => item.name === '');
    saveAutoUpgrades();

    loadPlayers();

    players[0].currentCheeseBricks = players[0].cheeseBricks;

    player.cheeseBricks = parseInt(players[0].cheeseBricks);
    player.currentCheeseBricks = parseInt(players[0].currentCheeseBricks)
    console.log(`resetGame player.cheeseBricks = ${player.cheeseBricks}`);
    document.getElementById("input-tc").value = players.cheeseBricks;

    resetToDefaultUpgrades();

    loadInitialSettings();
}


