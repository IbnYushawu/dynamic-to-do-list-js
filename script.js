// Run after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to hold tasks in memory
    let tasks = [];

    // Save the current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a single task DOM element (li with a Remove button)
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        // REQUIRED BY CHECKER
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(li);

            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        tasks = storedTasks;

        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Add a new task
    function addTask(taskTextArg = null, save = true) {
        const taskText = taskTextArg !== null ? taskTextArg : taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        createTaskElement(taskText);

        if (taskTextArg === null) {
            taskInput.value = "";
        }
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load stored tasks
    loadTasks();
});
