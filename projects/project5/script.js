let taskStack = [];

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    taskStack.push(taskInput);
    document.getElementById("taskInput").value = ""; // Clear input field
    updateTaskStack();
}

function undoTask() {
    if (taskStack.length === 0) {
        alert("No tasks to undo!");
        return;
    }

    taskStack.pop(); // Remove the last task (LIFO behavior)
    updateTaskStack();
}

function updateTaskStack() {
    let taskStackDiv = document.getElementById("taskStack");
    taskStackDiv.innerHTML = taskStack.map(task => `<p>${task}</p>`).join("") || "";
}