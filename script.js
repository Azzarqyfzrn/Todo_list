let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("No task entered!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function renderTasks() {

    const list = document.getElementById("todoList");
    list.innerHTML = "";

    if (tasks.length === 0) {

        list.innerHTML = '<div class="empty">Empty</div>';
    }

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = task.completed? "todo-item completed": "todo-item";
        li.innerHTML = `
            <div class="todo-left">
                <input
                    type="checkbox"
                    class="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">

                <span class="todo-text">
                    ${task.text}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    const remaining = tasks.filter(task => !task.completed).length;
    document.getElementById("remaining").textContent = remaining;
}

document
    .getElementById("taskInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    });

renderTasks();