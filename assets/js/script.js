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
        
    // let category = document.getElementsByClassName('category');
        // alert(`The category ${category} is removed`)



        // Doesnt work as expected just yet
        let new_button = document.querySelector("#grid-container-new  #newRow")
        new_button.parentNode.removeChild(new_button)


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