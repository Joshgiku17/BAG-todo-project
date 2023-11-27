document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();

        // To create an element
        const li = document.createElement('li');
        li.innerHTML = `<span>${taskText}</span>
                        <button onclick="deleteTask(this)">Delete</button>
                        <button onclick="toggleImportant(this)">Important</button>`;

        // A task to the list
        taskList.insertBefore(li, taskList.firstChild);

        // Saving tasks to local storage
        saveTasks();

        // Clear input field
        taskInput.value = '';
    }
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList');
    const li = button.parentNode;
    taskList.removeChild(li);

    // Save tasks to local storage
    saveTasks();
}

function toggleImportant(button) {
    const li = button.parentNode;
    li.classList.toggle('important');

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Save each task's text and status
    taskList.childNodes.forEach((li) => {
        const task = {
            text: li.querySelector('span').innerText,
            important: li.classList.contains('important')
        };
        tasks.push(task);
    });

    // Store tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load tasks from local storage
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${task.text}</span>
                        <button onclick="deleteTask(this)">Delete</button>
                        <button onclick="toggleImportant(this)">Important</button>`;

        if (task.important) {
            li.classList.add('important');
        }

        taskList.appendChild(li);
    });
}
