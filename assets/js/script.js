// Javascript for the calculator goes here


console.log('Hello Mom!')



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

function greetWithAlert(){
    let momName = document.getElementById("username").value;
    alert(`Hello ${momName}`)
}

let momBudget;
function confirmBudget(){
    momBudget = document.getElementById("budget").value;
    alert(`Your budget of ${formatter.format(Number(momBudget))}  is confirmed`)
}


function categoryRemoved() {
    let category = document.getElementById("category").value;
    alert(`The category ${category} is removed`)
}


function submitResult() {
    let result = document.getElementById("result").value;
    alert(`The total costs this month are: ${formatter.format(Number(result))}`)
}


