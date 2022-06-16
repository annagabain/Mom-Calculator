// Javascript for the calculator goes here


console.log('Hello Mom!')


// This code I took and modified from 
// https://www.ceos3c.com/javascript/store-user-input-in-a-variable-with-javascript/#:~:text=The%20JavaScript%20File,-The%20JavaScript%20part&text=To%20be%20able%20to%20store,input%20from%20the%20input%20form.

function greetWithAlert(){
    let momName = document.getElementById("username").value;
    alert(`Hello ${momName}`)
}

function confirmBudget(){
    let momBudget = document.getElementById("budget").value;
    alert(`Your budget of ${momBudget} Euros is confirmed`)
}
