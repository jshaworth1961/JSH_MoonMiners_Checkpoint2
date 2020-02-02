let player =
{
    cheeseBricks: 50,
    clickInventory: [],
    autoInventory: []
};

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

//turn buttons off that player does not have enough resources to buy
turnButtonsOnOff();

let initialCheeseBricks = player.cheeseBricks;
document.getElementById('input-tc').value =
    initialCheeseBricks;

document.getElementById('input-tc').disabled;

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

//start autopart of Game
startInterval();


function turnButtonsOnOff() {
    console.log(`Made it to turnButtonsOnOff`);
    if (clickUpgrades['shovel'].price > player.cheeseBricks) {
        document.getElementById('btn-buy-shovel').disabled = true;
    }
    else {
        document.getElementById('btn-buy-shovel').disabled = false;
    }

    if (clickUpgrades['excavator'].price > player.cheeseBricks) {
        document.getElementById('btn-buy-excavator').disabled = true;
    }
    else {
        document.getElementById('btn-buy-excavator').disabled = false;
    }

    if (autoUpgrades['jackhammer'].price > player.cheeseBricks) {
        document.getElementById('btn-buy-jackhammer').disabled = true;
    }
    else {
        document.getElementById('btn-buy-jackhammer').disabled = false;
    }

    if (autoUpgrades['wheelbarrow'].price > player.cheeseBricks) {
        document.getElementById('btn-buy-wheelbarrow').disabled = true;
    }
    else {
        document.getElementById('btn-buy-wheelbarrow').disabled = false;
    }

}

function updatePrices() {
    clickUpgrades['shovel'].price = clickUpgrades['shovel'].newprice;
    clickUpgrades['excavator'].price = clickUpgrades['excavator'].newprice;
    autoUpgrades['jackhammer'].price = autoUpgrades['jackhammer'].newprice;
    autoUpgrades['wheelbarrow'].price = autoUpgrades['wheelbarrow'].newprice;

}
function buyClickUpgrade(clickItem) {


    console.log(`You purchased a(n) ${clickItem}`);

    player.clickInventory.push(clickUpgrades[clickItem]);

    console.log(player.clickInventory);



    //find price
    /*
    let inv = player.clickInventory.filter(item => {
        console.log(player.clickInventory)
        console.log(item.name);
        console.log(clickItem);
        return item.name === clickItem;
    

    });
    */

    //console.log(inv);

    //update quantity and price of item
    clickUpgrades[clickItem].quantity++;

    let quantity = clickUpgrades[clickItem].quantity;

    console.log(`The current quantity of ${clickItem}s is ${quantity}`);

    clickUpgrades[clickItem].newprice *= clickUpgrades[clickItem].multiplier;

    clickUpgrades[clickItem].newprice =
        Math.round(clickUpgrades[clickItem].newprice);

    let price = clickUpgrades[clickItem].price;
    let newprice = clickUpgrades[clickItem].newprice;

    console.log(`The price of a ${clickItem} is ${clickUpgrades[clickItem].price}`);
    console.log(`The new price of a ${clickItem} is ${clickUpgrades[clickItem].newprice}`);

    player.cheeseBricks -= price;
    document.getElementById('input-tc').value =
        player.cheeseBricks;

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

}

function doSomeWorkOnClick() {

    console.log("Do some work on click");

    let cheeseHarvested =

        1
        +
        clickUpgrades['shovel'].quantity * clickUpgrades['shovel'].harvest
        +

        clickUpgrades['excavator'].quantity * clickUpgrades['excavator'].harvest;

    player.cheeseBricks += cheeseHarvested;

    document.getElementById('input-tc').value = player.cheeseBricks;

    turnButtonsOnOff();


}

function buyAutoUpgrade(autoItem) {
    console.log(`You purchased a(n) ${autoItem}`);

    player.autoInventory.push(autoUpgrades[autoItem]);

    console.log(player.autoInventory);

    //update quantity and price of item
    autoUpgrades[autoItem].quantity++;

    let quantity = autoUpgrades[autoItem].quantity;

    console.log(`The current quantity of ${autoItem}s is ${quantity}`);

    autoUpgrades[autoItem].newprice *= autoUpgrades[autoItem].multiplier;

    autoUpgrades[autoItem].newprice =
        Math.round(autoUpgrades[autoItem].newprice);

    let price = autoUpgrades[autoItem].price;
    let newprice = autoUpgrades[autoItem].newprice;

    console.log(`The price of a ${autoItem} is ${autoUpgrades[autoItem].price}`);
    console.log(`The new price of a ${autoItem} is ${autoUpgrades[autoItem].newprice}`);

    player.cheeseBricks -= price;
    document.getElementById('input-tc').value =
        player.cheeseBricks;

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

    turnButtonsOnOff();
    updatePrices();
    calcTotalAutoUpgradePower();
}



function calcTotalAutoUpgradePower() {
    let cheeseAutoHarvested =

        autoUpgrades['jackhammer'].quantity * autoUpgrades['jackhammer'].harvest

        +

        autoUpgrades['wheelbarrow'].quantity * autoUpgrades['wheelbarrow'].harvest;

    console.log(`The amount of cheese auto harvested at the last 3 sec interval was ${cheeseAutoHarvested}`);

    player.cheeseBricks += cheeseAutoHarvested;

    document.getElementById('input-tc').value = player.cheeseBricks;

    turnButtonsOnOff();


}

function startInterval() {

    console.log(`In Start Interval`);
    let checkAutoGame = setInterval(calcTotalAutoUpgradePower, 3000);

}





function showStatus() {

}