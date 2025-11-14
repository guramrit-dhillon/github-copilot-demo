// TaskManager - Simple JavaScript Implementation
// This app manages tasks using localStorage for persistence

// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Initialize tasks array
let tasks = [];

/**
 * Load tasks from localStorage when the page loads
 */
function loadTasks() {
    // Retrieve tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    
    // Parse stored tasks or use empty array if none exist
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        tasks = [];
    }
    
    // Render all tasks to the page
    renderTasks();
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    // Convert tasks array to JSON string and store in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Add a new task to the list
 */
function addTask() {
    // Get the task text from input field
    const taskText = taskInput.value.trim();
    
    // Validate input - don't add empty tasks
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create task object with unique ID and text
    const task = {
        id: Date.now(), // Use timestamp as unique ID
        text: taskText
    };
    
    // Add task to array
    tasks.push(task);
    
    // Save to localStorage
    saveTasks();
    
    // Clear input field
    taskInput.value = '';
    
    // Re-render task list
    renderTasks();
}

/**
 * Delete a task from the list
 * @param {number} taskId - The ID of the task to delete
 */
function deleteTask(taskId) {
    // Filter out the task with matching ID
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Save updated list to localStorage
    saveTasks();
    
    // Re-render task list
    renderTasks();
}

/**
 * Render all tasks to the DOM
 */
function renderTasks() {
    // Clear the current task list
    taskList.innerHTML = '';
    
    // Check if there are no tasks
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="list-group-item text-center text-muted">No tasks yet. Add one above!</li>';
        return;
    }
    
    // Loop through each task and create list item
    tasks.forEach(task => {
        // Create list item element
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';
        
        // Create span for task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        // Append text and button to list item
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        
        // Append list item to task list
        taskList.appendChild(li);
    });
}

// Event Listeners
// Add task when button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when Enter key is pressed in input field
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);
