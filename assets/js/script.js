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

    let momBudget = document.getElementById("budget").value;
 
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`)

    return momBudget
}

function addCost() {
    alert(`Cost ${x}  added`)
}


function categoryRemoved() {
    let category = document.getElementById("category").value;
    alert(`The category ${category} is removed`)
}


/**
 * This is the main function that calculates the sum of all the monthly costs
 */
//Calculates the costs multiplied by counts in the same row and adds all the rows
function costsTimesCounts() {
    //    let Total = (cost1 * count1) + (cost2 * count2) + (cost3* count3) + (cost4 * count4)
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

    let total = costsTimesCounts()
    document.getElementById('totalCosts').innerHTML = ('Costs TOTAL : ') + formatter.format(Number(total)) + (' €')


    let balance = confirmBudget() - total
    document.getElementById('yourBalance').innerHTML = ('This month\'s balance: : ') + formatter.format(Number(balance)) + (' €')


    return total

}

// VISUALIZATION TEST

google.charts.load('current', {'packages':['corechart']});
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
  title:'Life Expenses Budgeting Pie Chart'
};

let chart = new google.visualization.PieChart(document.getElementById('myChart'));
  chart.draw(data, options);
}