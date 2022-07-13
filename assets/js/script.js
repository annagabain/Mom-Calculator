// Javascript for the calculator goes here


// Converting the number into currency
// https://www.codegrepper.com/code-examples/javascript/javascript+currency+format+euro
let formatter = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});
formatter.format(1500); /* €1,500.00 */


let toEuro = formatter.format(Number(document.getElementById("budget").value))
console.log(toEuro);





// This code I took and modified from 
// https://www.ceos3c.com/javascript/store-user-input-in-a-variable-with-javascript/#:~:text=The%20JavaScript%20File,-The%20JavaScript%20part&text=To%20be%20able%20to%20store,input%20from%20the%20input%20form.

// ADD LATER FOR USERNAME
// function greetWithAlert(){
//     let momName = document.getElementById("username").value;
//     alert(`Hello ${momName}`)
// }




function confirmBudget() {
    // // clears the submit budget area after the budget has been given
    // let momBudgetButton = document.getElementById("submitMomBudget")
    // momBudgetButton.style.display = 'none';

    // writes the budget to the document for further evaluation

    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`)

    return momBudget
}


/**
 * New Category row is appended
 */
function categoryAdded() {

    // let moreRowsButton = document.getElementById("more-rows-button")
    // moreRowsButton.style.display = 'none';

    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div id= "newRow">
    <div class="grid-item class="grid-item-new"><input type="text" name="text" class="category" placeholder="Anything else?..." value=""></div>
    <div  class="grid-item class="grid-item-new"><input type="number" name="cost" class="cost" placeholder="eg. 500" value="" required></div>
    <div " class="grid-item class="grid-item-new"><input type="number" class="count" name="count" class="sub-category" placeholder="1" value="1"></div>   
    
    </div>`;

    let gridContainerNew = document.getElementById("grid-container-new")
    gridContainerNew.appendChild(newDiv);

}


/**
 * Removes the created extra rows
 */
function categoryRemoved() {

    let newRow = document.querySelector("#grid-container-new  #newRow")
    newRow.parentNode.removeChild(newRow)


}



/**
 * This is the main function that calculates the sum of all the monthly costs
 */
//Calculates the costs multiplied by counts in the same row and adds all the rows
function costsTimesCounts() {

    let total = 0
    let costs = document.getElementsByClassName('cost')
    let counts = document.getElementsByClassName('count')

    for (let row = 0; row < costs.length; row++) {

        let cost = costs[row].value
        // console.log('cost ' + cost)

        let count = counts[row].value
        // console.log('count ' + count)

        console.log(total += cost * count)

        console.log('TOTAL ' + total)

    }

    return total
}


// Combined with the costsTimesCounts functiom shos the total expenses calculation
function calculateTotal() {

    // if (document.getElementById("balanceStatus").childNodes.length == 0) {
    //     document.getElementById("balanceStatus").style.display = 'none';
    // }


    // writes the budget to the document for further evaluation
    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`)


    let total = costsTimesCounts()
    document.getElementById('totalCosts').innerHTML = ('Costs TOTAL : ').bold() + formatter.format(Number(total)).bold()


    let balance = confirmBudget() - total
    document.getElementById('yourBalance').innerHTML = ('This month\'s balance: : ') + formatter.format(Number(balance))


    balanceStatus()


    return total

}


/**
 * Evaluates if the balance is positive or negative
 * 
 * This function is called inside the calculateTotal function along with the calculation of the total budget
 */
function balanceStatus() {

    // Removes old balance Status first before displaying the new
    // Source code found on:
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    let oldBalanceStatus = document.querySelector("#balanceStatus")
    while (oldBalanceStatus.firstChild) {
        oldBalanceStatus.removeChild(oldBalanceStatus.lastChild);
    }


    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div id="balanceStatusRed"></div>
    <div id="balanceStatusGreen"></div>
    <div id="balanceStatusBlue"></div>
    `;

    let balanceStatusNew = document.getElementById("balanceStatus")
    balanceStatusNew.appendChild(newDiv);



    let budget = confirmBudget()
    let total = costsTimesCounts()
    let balanceStatus = budget - total


    if (budget < total) {
        //red
        document.getElementById('balanceStatusRed').innerHTML = (`Overspent € ${Math.abs(balanceStatus)}.00 this month`);
    } else if (budget > total) {
        //green
        document.getElementById('balanceStatusGreen').innerHTML = (`Saved € ${balanceStatus}.00 this month`)

    } else if (budget == total) {
        //blue
        document.getElementById('balanceStatusBlue').innerHTML = (`No savings this month`)

    } else {
        //error
        document.getElementById('balanceStatus').innerHTML = (`Can't calcualate the balance status`)
    }


}






// VISUALIZATION TEST

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let data = google.visualization.arrayToDataTable([
        ['Category', 'Mhl'],
        ['Food', 1200],
        ['Takeout', 500],
        ['Clothing', 500],
        ['Accomodation', 700],
    ]);

    let options = {
        title: 'Life Expenses Budgeting Pie Chart',
        slices: {
            0: {
                color: '#9C9FA6'
            },
            1: {
                color: '#0D0D0D'
            },
            2: {
                color: '#455359'
            },
            3: {
                color: '#6A4C39'
            },
            4: {
                color: 'grey'
            }
        }
    };

    let chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
}