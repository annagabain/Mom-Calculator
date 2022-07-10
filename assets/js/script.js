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

        // ADD LATER FOR USERNAME
// function greetWithAlert(){
//     let momName = document.getElementById("username").value;
//     alert(`Hello ${momName}`)
// }




function confirmBudget(){

    let momBudget = document.getElementById("budget").value;
    // alert(`Your budget of ${formatter.format(Number(momBudget))}  is confirmed`)
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
function calculateTotal() {
   let Total = (cost1 * count1) + (cost2 * count2) + (cost3* count3) + (cost4 * count4)

}

// Combine this with the function that actually calculates the sum of all (see calculateTotal functiom)
function submitTotal() {

    let total = document.getElementById("total").value;
    total = (100 * 3) + (1500 * 1) + (200 * 1) + (1450 * 1)
    //total = (cost1 * count1) + (cost2 * count2) + (cost3* count3) + (cost4 * count4)
    // console.log(`The total costs this month are: ${formatter.format(Number(total))}`)
    document.getElementById('totalCosts').innerHTML = ('Costs TOTAL : ') + formatter.format(Number(total)) + (' €')

    let balance = confirmBudget() - total 
    document.getElementById('yourBalance').innerHTML = ('This month\'s balance: : ') + formatter.format(Number(balance)) + (' €')
  

    return total

}



