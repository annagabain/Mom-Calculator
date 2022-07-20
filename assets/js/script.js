// Javascript for the calculator functionality goes here


// Converting the number into currency
// https://www.codegrepper.com/code-examples/javascript/javascript+currency+format+euro
let formatter = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});
formatter.format(1500); /* €1,500.00 */

let toEuro = formatter.format(Number(document.getElementById("budget").value));

// Show About section
let showAboutInfo = document.getElementsByClassName("showAboutInfo");
let index;

for (index = 0; index < showAboutInfo.length; index++) {
    showAboutInfo[index].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
};


// This code I took and modified from: https://www.ceos3c.com/javascript/store-user-input-in-a-variable-with-javascript/#:~:text=The%20JavaScript%20File,-The%20JavaScript%20part&text=To%20be%20able%20to%20store,input%20from%20the%20input%20form.

// Great the user by name
function greetByUsername() {
    // clears the submit name area after the name has been given or calculation fired
    let submitUsername = document.getElementById("submitUsername");
    submitUsername.style.display = 'none';

    let momName = document.getElementById("username").value;
    document.getElementById('helloUser').innerHTML = (`Hello ${momName}`);
}


function confirmBudget() {

    // writes the budget to the document for further evaluation
    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`);

    return momBudget;
};


/**
 *  Removes specific rows
 */

function rowOneRemoved() {
    let row = document.querySelector("#grid-container #row1");
    row.parentNode.removeChild(row)[1];
};

function rowTwoRemoved() {
    let row = document.querySelector("#grid-container #row2");
    row.parentNode.removeChild(row)[2];
};

function rowThreeRemoved() {
    let row = document.querySelector("#grid-container #row3");
    row.parentNode.removeChild(row)[3];
};

function rowFourRemoved() {
    let row = document.querySelector("#grid-container #row4");
    row.parentNode.removeChild(row)[4];
};

function rowFiveRemoved() {
    let row = document.querySelector("#grid-container #row5");
    row.parentNode.removeChild(row)[5];
};


/**
 * New Category row is appended
 */
// Code source: https://github.com/learn-webdevYT/Javascript-Beginner-Tutorials To-Do LIst
function categoryAdded() {

    let gridContainerNew = document.getElementById("grid-container-new");

    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div id= "newRow">
        <div class="grid-item grid-item-new"><input type="text" name="text" class="category" placeholder="Anything else?..." value=""></div>
        <div class="grid-item grid-item-new"><input type="number" name="cost" class="cost" placeholder="eg. 500" value="" required></div>
        <div class="grid-item grid-item-new"><input type="number" class="count" name="count" class="sub-category" placeholder="1" value="1"></div>  
         
        </div>`;

    gridContainerNew.appendChild(newDiv);

    let newRoundButton = document.createElement("button");
    newRoundButton.classList.add('round')
    newRoundButton.innerText = '-';

    //find the last row and add a button to it
    let all_rows = document.querySelectorAll("#newRow")
    let last_row = all_rows[all_rows.length - 1]
    last_row.appendChild(newRoundButton);

    newRoundButton.addEventListener('click', function () {
        gridContainerNew.removeChild(newDiv)
    });
};

/**
 * This is the main function that calculates the sum of all the monthly costs
 */
//Calculates the costs multiplied by counts in the same row and adds all the rows
function costsTimesCounts() {

    let total = 0;
    let costs = document.getElementsByClassName('cost');
    let counts = document.getElementsByClassName('count');

    for (let row = 0; row < costs.length; row++) {
        let cost = costs[row].value;
        let count = counts[row].value;
        total += cost * count;
    };

    return total;
};
/**
Is creating a data Array for visualisation and is called upon calling the drawChart function 
 */
function visArrayData() {

    let ActualArrayData = [];
    let categories = document.getElementsByClassName('category');
    let costs = document.getElementsByClassName('cost');
    let counts = document.getElementsByClassName('count');

    for (let row = 0; row < categories.length; row++) {
        let category = categories[row].value;
        let cost = costs[row].value;
        let count = counts[row].value;

        ActualArrayData.push([category, parseInt(cost * count)]);
    }

    return ActualArrayData;
};
/**
Make a table aout of user input data
Source code: https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
*/
function makeTableHTML(myArray) {

    let result = "<table border=0><td><b>Expenses on:</b></td><td><b>Cost in € </b></td>";
    for (let i = 0; i < myArray.length; i++) {
        result += "<tr>";
        for (let j = 0; j < myArray[i].length; j++) {
            result += "<td>" + myArray[i][j] + "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

console.log(makeTableHTML(visArrayData()))


// Combined with the costsTimesCounts functiom shows the total expenses calculation
function calculateTotal() {

    let hideCalculationArea = document.getElementById("hide-calculation-area");
    if (hideCalculationArea.style.display === "none") {
        hideCalculationArea.style.display = "block";
    } else {
        hideCalculationArea.style.display = "none";
    };

    // clears the submit name area after the name has been given or calculation fired
    let submitUsername = document.getElementById("submitUsername");
    submitUsername.style.display = 'none';

    // writes the user input generated data table to the document
    let visArrayDataToTable = makeTableHTML(visArrayData());
    document.getElementById('dataTable').innerHTML = (`${visArrayDataToTable}`);

    // writes the budget to the document
    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`);

    let total = costsTimesCounts();
    document.getElementById('totalCosts').innerHTML = ('Your TOTAL costs: ').bold() + formatter.format(Number(total)).bold();

    let balance = confirmBudget() - total;
    document.getElementById('yourBalance').innerHTML = ('This month\'s balance: ') + formatter.format(Number(balance));


    balanceStatus();

    return total;

};

/**
 * Evaluates if the balance is positive or negative
 * 
 * This function is called inside the calculateTotal function along with the calculation of the total budget
 */
function balanceStatus() {

    // Removes old balance Status first before displaying the new
    let oldBalanceStatus = document.querySelector("#balanceStatus");
    while (oldBalanceStatus.firstChild) {
        oldBalanceStatus.removeChild(oldBalanceStatus.lastChild);
    }

    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div id="balanceStatusRed"></div>
    <div id="balanceStatusGreen"></div>
    <div id="balanceStatusBlue"></div>
    `;

    let balanceStatusNew = document.getElementById("balanceStatus");
    balanceStatusNew.appendChild(newDiv);

    let budget = confirmBudget();
    let total = costsTimesCounts();
    let balanceStatus = budget - total;

    if (budget < total) {
        //red
        document.getElementById('balanceStatusRed').innerHTML = (`Overspent € ${Math.abs(balanceStatus)}.00 this month`);
    } else if (budget > total) {
        //green
        document.getElementById('balanceStatusGreen').innerHTML = (`Saved € ${balanceStatus}.00 this month`);

    } else if (budget == total) {
        //blue
        document.getElementById('balanceStatusBlue').innerHTML = (`No savings this month`);

    } else {
        //error
        document.getElementById('balanceStatus').innerHTML = (`Can't calcualate the balance status`);
    }

};



// VISUALIZATION through Google charts


google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {

    //Source for toggle and hide: https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    let visualizationArea = document.getElementById("visualization-area");
    if (visualizationArea.style.display === "none") {
        visualizationArea.style.display = "block";
    } else {
        visualizationArea.style.display = "none";
    }




    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Population');
    data.addRows(visArrayData());



    let options = {
        title: 'Life Expenses Budgeting Pie Chart',

        // change piechart size here
        width: 350,
        height: 350,

        slices: {
            0: {
                color: '#0D0D0D'
            },
            1: {
                color: '#455359'
            },
            2: {
                color: '#6A4C39'
            },
            3: {
                color: '#D8CBC4'
            },
            4: {
                color: '#9C9FA6'
            },
            5: {
                color: '#ebb3b2'
            }
        }
    };

    let chart = new google.visualization.PieChart(document.getElementById('pieChart'));
    chart.draw(data, options);
};