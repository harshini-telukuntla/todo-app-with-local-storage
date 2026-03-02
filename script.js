let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.onclick = function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let text = taskInput.value;

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
}

renderTasks();
