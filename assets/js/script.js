/**This function is used to display numbers in EURO currency format. For example it takes a number 1500 and displays it as €1,500
 *  Code source: Converting the number into currency:  https://www.codegrepper.com/code-examples/javascript/javascript+currency+format+euro
 */

let formatter = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});
formatter.format();

// Show About section
//This section is a guidance on how to use the calculator, is activated on click

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
}

/** This code I took and modified from: https://www.ceos3c.com/javascript/store-user-input-in-a-variable-with-javascript/#:~:text=The%20JavaScript%20File,-The%20JavaScript%20part&text=To%20be%20able%20to%20store,input%20from%20the%20input%20form.
 * Great the user by name. This function is also used to thank the user personally for contacting us.
 */

function greetByUsername() {

    // clears the submit name area after the name has been given or calculation fired
    let submitUsername = document.getElementById("submitUsername");
    submitUsername.style.display = 'none';

    let momName = document.getElementById("username").value;
    document.getElementById('helloUser').innerHTML = (`Hello ${momName}`);
}

// writes the budget to the document for further evaluation
function confirmBudget() {

    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))}`);

    return momBudget;
}

/**
 *  Removes specified corresponding row from the default set
 */

function rowOneRemoved() {
    let row = document.querySelector("#grid-container #row1");
    row.parentNode.removeChild(row)[1];
}

function rowTwoRemoved() {
    let row = document.querySelector("#grid-container #row2");
    row.parentNode.removeChild(row)[2];
}

function rowThreeRemoved() {
    let row = document.querySelector("#grid-container #row3");
    row.parentNode.removeChild(row)[3];
}

function rowFourRemoved() {
    let row = document.querySelector("#grid-container #row4");
    row.parentNode.removeChild(row)[4];
}

function rowFiveRemoved() {
    let row = document.querySelector("#grid-container #row5");
    row.parentNode.removeChild(row)[5];
}

/**
 * New Category row is appended
 */
// Code source and inspiration: https://github.com/learn-webdevYT/Javascript-Beginner-Tutorials To-Do LIst

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
    newRoundButton.classList.add('round');
    newRoundButton.innerText = '-';

    //find the last row and add a button to it
    let all_rows = document.querySelectorAll("#newRow");
    let last_row = all_rows[all_rows.length - 1];
    last_row.appendChild(newRoundButton);

    newRoundButton.addEventListener('click', function () {
        gridContainerNew.removeChild(newDiv);
    });
}

/**
 * This is the main function that calculates the sum of all the monthly costs
 * Calculates the costs multiplied by counts in the same row and adds all the rows together
 */

function costsTimesCounts() {

    let total = 0;
    let costs = document.getElementsByClassName('cost');
    let counts = document.getElementsByClassName('count');

    for (let row = 0; row < costs.length; row++) {
        let cost = costs[row].value;
        let count = counts[row].value;
        total += cost * count;
    }

    return total;
}

/**
Is creating a data Array for visualisation and is called inside the drawChart function 
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

/**
Make a table of user input data, this table will be displayed obove the calculation results area
Source code: https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
*/

function makeTableHTML(myArray) {

    let result = "<table border=0><th><b>Expenses on:</b></td><td><b>Cost in € </b></th>";
    for (let tableRow = 0; tableRow < myArray.length; tableRow++) {
        result += "<tr>";
        for (let tableCell = 0; tableCell < myArray[tableRow].length; tableCell++) {
            result += "<td>" + myArray[tableRow][tableCell] + "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

// Combined with the costsTimesCounts functiom shows the total expenses calculation
function calculateTotal() {

    let hideCalculationArea = document.getElementById("hide-calculation-area");
    if (hideCalculationArea.style.display === "none") {
        hideCalculationArea.style.display = "block";
    } else {
        hideCalculationArea.style.display = "none";
    }

    // clears the submit name area after the name has been given or calculation fired
    let submitUsername = document.getElementById("submitUsername");
    submitUsername.style.display = 'none';

    // writes the user input generated data table to the document
    let visArrayDataToTable = makeTableHTML(visArrayData());
    document.getElementById('dataTable').innerHTML = (`${visArrayDataToTable}`);

    // writes the budget to the document
    let momBudget = document.getElementById("budget").value;
    document.getElementById('yourBudget').innerHTML = (`Your budget: ${formatter.format(Number(momBudget))} <br><br>`);

    // writes the total costs to the document
    let total = costsTimesCounts();
    document.getElementById('totalCosts').innerHTML = ('Your TOTAL costs: ').bold() + formatter.format(Number(total)).bold();

    // writes the balance (costs deducted from budget) to the document
    let balance = confirmBudget() - total;
    document.getElementById('yourBalance').innerHTML = ('This month\'s balance: ') + formatter.format(Number(balance));

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
        document.getElementById('balanceStatusRed').innerHTML = (`Overspent € ${Math.abs(balanceStatus)}.00 this month. <br><br>`);
    } else if (budget > total) {
        //green
        document.getElementById('balanceStatusGreen').innerHTML = (`Saved € ${balanceStatus}.00 this month. <br><br>`);

    } else if (budget == total) {
        //blue
        document.getElementById('balanceStatusBlue').innerHTML = (`No savings this month. <br><br>`);

    } else {
        //error
        document.getElementById('balanceStatus').innerHTML = (`Can't calcualate the balance status. <br><br>`);
    }

}

// VISUALIZATION through Google charts

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

// Draws a pie chart in the visualization area that is opened by vizualize button
function drawChart() {

    //Source for toggle and hide: https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    let visualizationArea = document.getElementById("visualization-area");
    if (visualizationArea.style.display === "none") {
        visualizationArea.style.display = "block";
    } else {
        visualizationArea.style.display = "none";
    }

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Costs');
    data.addRows(visArrayData());

    let options = {
        title: 'Life Expenses Budgeting Pie Chart',
        // change piechart size here, it does not adjast responsively, so the smallest screen size width is chosen to avoid distortion on mobiles
        width: 320,
        height: 300,

        // the colours of slices in the pie chart are generated through google visualization tool and the css is embedded here as part of the options object
        slices: {
            0: {
                // Brown
                color: '#6A4C39'
            },
            1: {
                // Sea Green
                color: '#455359'
            },
            2: {
                // Mokka Beige
                color: '#D8CBC4'
            },
            3: {
                // Grey
                color: '#9C9FA6'
            },
            4: {
                // Black-Brown
                color: '#0D0D0D'
            },
            5: {
                // Pink
                color: '#ebb3b2'
            },
            6: {
                // Brown
                color: '#6A4C39'
            },
            7: {
                // Sea Green
                color: '#455359'
            },
            8: {
                // Mokka Beige
                color: '#D8CBC4'
            },
            9: {
                // Grey
                color: '#9C9FA6'
            },
            10: {
                // Black-Brown
                color: '#0D0D0D'
            },
            11: {
                // Pink
                color: '#ebb3b2'
            }
        }
    };

    let chart = new google.visualization.PieChart(document.getElementById('pieChart'));
    chart.draw(data, options);
}

/**
Toggles the Contact section similar to How to use section, is closed by default
  * 
  */

let showContact = document.getElementsByClassName("showContact");
let goThrough;

for (goThrough = 0; goThrough < showContact.length; goThrough++) {
    showContact[goThrough].addEventListener("click", function () {
        this.classList.toggle("active");
        let contactContent = this.nextElementSibling;
        if (contactContent.style.display === "block") {
            contactContent.style.display = "none";
        } else {
            contactContent.style.display = "block";
        }
    });
}

// Replaces the contact form with the thank you response

function thankYouforContacting() {
    // clears the contact form after the name has been given or calculation fired
    let hideContactArea = document.getElementById("contact");
    hideContactArea.style.display = 'none';

    // adresses the user by name, if known
    let momName = document.getElementById("username").value;

    // writes thank you for contacting on the document page
    document.getElementById("contactUs").innerHTML = (`Thank you for contacting us ${momName}!<br> We'll respond to you shortly.<br><br>`);
}

// Makes sure the user does not send an empty message

function validateForm() {
    let subject = document.forms["myForm"]["subject"].value;
    let email = document.forms["myForm"]["email"].value;

    //  Code source: https://www.javatpoint.com/javascript-form-validation
    // The if statement is checking if the user's input email is correct
    let atposition = email.indexOf("@");
    let dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        alert("Please enter a valid e-mail address");
        return false;
        // Making sure the message (text area) is not empty
    } else if (subject == "") {
        alert(`What is your message or comment?`);
        return false;
        // Letting the user know the message has been sent successfully (dummy message as the contact form is not connected to a database yet)
    } else {
        thankYouforContacting()
    }
}