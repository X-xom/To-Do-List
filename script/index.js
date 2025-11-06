const input = document.querySelector(".search_input");
const addButton = document.querySelector(".search_add");
const toDoList = document.querySelector(".todo-list");


async function downloadData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');

        const todos = await response.json();
        dataOutput(todos);

    } catch (error) {
        alert('Не удалось загрузить задачи');
    }
}

function dataOutput(todos) {
    todos.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";

        listItem.innerHTML = `
            <span class="task-text ${todo.completed ? 'completed' : ''}">${todo.title}</span>
            <img src="./trash.svg" alt="Удалить" class="delete-btn">
        `;

        toDoList.appendChild(listItem);
    })
}

function addToDo() {
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    listItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <img src="./trash.svg" alt="Удалить" class="delete-btn">
    `;

    toDoList.prepend(listItem);
    input.value = "";
    input.focus();
}

function toggleTodo(event) {
    if (event.target.classList.contains("task-text")) {
        event.target.classList.toggle("completed");
    }
}

function deleteTodo(event) {
    if (event.target.classList.contains("delete-btn")) {
        const listItem = event.target.closest(".todo-item");

        if (listItem) {
            listItem.remove();
        }
    }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addToDo();
  }
})

addButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", toggleTodo);
toDoList.addEventListener("click", deleteTodo);
document.addEventListener('DOMContentLoaded', downloadData);
