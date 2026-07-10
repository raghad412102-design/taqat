let taskInput = document.querySelector("#taskInput");
let addBtn = document.querySelector("#addBtn");
let taskList = document.querySelector("#taskList");


addBtn.onclick = function () {

    let taskText = taskInput.value;


    if (taskText.trim() === "") {

        return;

    }


    let li = document.createElement("li");

    li.classList.add(
        "bg-gray-200",
        "p-4",
        "rounded-lg",
        "flex",
        "justify-between",
        "items-center"
    );



    let span = document.createElement("span");

    span.textContent = taskText;



    let buttons = document.createElement("div");

    buttons.classList.add("flex", "gap-3");



    let doneBtn = document.createElement("button");

    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    doneBtn.classList.add(
        "text-green-600",
        "hover:scale-110",
        "transition"
    );



    let deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    deleteBtn.classList.add(
        "text-red-600",
        "hover:scale-110",
        "transition"
    );



    doneBtn.onclick = function () {

        span.classList.toggle("line-through");

        span.classList.toggle("text-gray-400");

    };



    deleteBtn.onclick = function () {

        li.remove();

    };



    buttons.appendChild(doneBtn);

    buttons.appendChild(deleteBtn);


    li.appendChild(span);

    li.appendChild(buttons);


    taskList.appendChild(li);


    taskInput.value = "";

};