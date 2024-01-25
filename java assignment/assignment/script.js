// Initialization: Start with an empty array to store tasks.
let tasks = [];

// Adding tasks: Function to add a task to the array.
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (task !== "") {
        tasks.push(task);
        taskInput.value = "";
        displayTasks();
    }
}

// Removing tasks: Function to remove a task from the array.
function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Displaying tasks: Function to display all tasks on the webpage.
function displayTasks() {
    const taskList = document.getElementById("taskList");

    // Clear the current list
    taskList.innerHTML = "";

    // Populate the list with tasks
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        li.setAttribute("onclick", `removeTask(${index})`);
        taskList.appendChild(li);
    });
}

// Add event listener for the Enter key
document.getElementById("taskInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Initial display
displayTasks();
