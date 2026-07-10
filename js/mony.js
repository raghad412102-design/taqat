let income = document.querySelector("#income");
let expense = document.querySelector("#expense");

let calculateBtn = document.querySelector("#calculateBtn");

let showIncome = document.querySelector("#showIncome");
let showExpense = document.querySelector("#showExpense");

let remaining = document.querySelector("#remaining");
let resultBox = document.querySelector("#resultBox");
let message = document.querySelector("#message");



calculateBtn.onclick = function () {


    let money = Number(income.value);
    let spend = Number(expense.value);


    let result = money - spend;



    showIncome.textContent = money;

    showExpense.textContent = spend;

    remaining.textContent = result;



    if (result < 0) {


        resultBox.classList.remove(
            "bg-green-100"
        );


        resultBox.classList.add(
            "bg-red-100"
        );


        message.textContent =
        "Warning: You exceeded your budget!";


        message.classList.remove(
            "text-green-600"
        );


        message.classList.add(
            "text-red-600"
        );


    } 

    else {


        resultBox.classList.remove(
            "bg-red-100"
        );


        resultBox.classList.add(
            "bg-green-100"
        );


        message.textContent =
        "Great! You still have money left";


        message.classList.remove(
            "text-red-600"
        );


        message.classList.add(
            "text-green-600"
        );


    }



};