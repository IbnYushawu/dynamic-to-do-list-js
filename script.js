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
    // This function only creates the DOM element and the removal logic.
    // It does NOT push the task into the `tasks` array (so it can be safely used when loading).
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Use a separate span for the task text so we don't include "Remove" in the text
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When clicked, remove the li from the DOM and remove the task from the tasks array,
        // then update Local Storage.
        removeBtn.onclick = function () {
            // Remove element from DOM
            taskList.removeChild(li);

            // Remove one occurrence of the task text from the tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Load tasks from Local Storage and render them on the page
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Initialize the in-memory tasks array with stored tasks
        tasks = storedTasks;

        // Create DOM elements for each stored task
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Add a new task. If `taskTextArg` is provided use it; otherwise use the input field.
    // `save` controls whether to save the task to Local Storage (default true).
    function addTask(taskTextArg = null, save = true) {
        const taskText = taskTextArg !== null ? taskTextArg : taskInput.value.trim();

        // Validate input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add task to in-memory array if instructed to save (for normal add flow)
        if (save) {
            tasks.push(taskText);
            saveTasks();
        } else {
            // If not saving (e.g., loading from storage), ensure tasks array already reflects this item.
            // We assume loadTasks initialized tasks array already, so do nothing here.
        }

        // Create the DOM element for the task
        createTaskElement(taskText);

        // Clear input only when adding from input field
        if (taskTextArg === null) {
            taskInput.value = "";
        }
    }

    // Event listener: add task when "Add Task" button is clicked
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Event listener: add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
