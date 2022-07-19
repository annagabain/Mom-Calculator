// Javascript for the calculator goes here


// Converting the number into currency
// https://www.codegrepper.com/code-examples/javascript/javascript+currency+format+euro
let formatter = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});
formatter.format(1500); /* €1,500.00 */


let toEuro = formatter.format(Number(document.getElementById("budget").value));
console.log(toEuro);

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
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`);

    return momBudget;
}


/**
 * 
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

    // let addNewRowsButton = document.getElementById('addNewRows');
    let gridContainerNew = document.getElementById("grid-container-new");

    // addNewRowsButton.addEventListener('click', function () {

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
    // newDiv.appendChild(b);

    //find the last row and add a button to it
    let all_rows = document.querySelectorAll("#newRow")
    let last_row = all_rows[all_rows.length - 1]
    last_row.appendChild(newRoundButton);



    newRoundButton.addEventListener('click', function () {
        gridContainerNew.removeChild(newDiv)
    });


    // });
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
        // console.log('cost ' + cost)

        let count = counts[row].value;
        // console.log('count ' + count)

        console.log(total += cost * count);

        console.log('TOTAL ' + total);

    }

    return total;
}


// Combined with the costsTimesCounts functiom shows the total expenses calculation
function calculateTotal() {


    let x = document.getElementById("hide-calculation-area");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }


    // writes the budget to the document for further evaluation
    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`);


    let total = costsTimesCounts();
    document.getElementById('totalCosts').innerHTML = ('Costs TOTAL : ').bold() + formatter.format(Number(total)).bold();


    let balance = confirmBudget() - total;
    document.getElementById('yourBalance').innerHTML = ('This month\'s balance: : ') + formatter.format(Number(balance));


    balanceStatus();


    return total;

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

}

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
}



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




    // console.log(visArrayData())


    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Population');
    data.addRows(visArrayData());



    let options = {
        title: 'Life Expenses Budgeting Pie Chart',

        // change piechart size here
        width: 500,
        height: 500,

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
};