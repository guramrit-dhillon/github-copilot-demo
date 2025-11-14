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
 * Enter edit mode for a task
 * @param {number} taskId - The ID of the task to edit
 */
function editTask(taskId) {
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Find the list item in the DOM
    const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
    if (!listItem) return;
    
    // Store original text in case of cancel
    listItem.dataset.originalText = task.text;
    
    // Replace content with edit mode UI
    listItem.innerHTML = '';
    listItem.className = 'list-group-item d-flex align-items-center task-item task-item-editing';
    
    // Create input field with current text
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control form-control-sm me-2';
    input.value = task.text;
    input.id = `edit-input-${taskId}`;
    
    // Create button container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'd-flex gap-2';
    
    // Create Save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-success btn-sm';
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => saveTaskEdit(taskId);
    
    // Create Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary btn-sm';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => cancelEdit(taskId);
    
    // Add keyboard support
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveTaskEdit(taskId);
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cancelEdit(taskId);
        }
    });
    
    // Append elements
    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(cancelBtn);
    listItem.appendChild(input);
    listItem.appendChild(btnContainer);
    
    // Focus the input
    input.focus();
    input.select();
}

/**
 * Save the edited task
 * @param {number} taskId - The ID of the task being edited
 */
function saveTaskEdit(taskId) {
    // Get the input value
    const input = document.getElementById(`edit-input-${taskId}`);
    if (!input) return;
    
    const newText = input.value.trim();
    
    // Validate input
    if (newText === '') {
        alert('Task cannot be empty!');
        input.focus();
        return;
    }
    
    // Find and update the task
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.text = newText;
        
        // Save to localStorage
        saveTasks();
        
        // Re-render
        renderTasks();
    }
}

/**
 * Cancel editing and restore original view
 * @param {number} taskId - The ID of the task being edited
 */
function cancelEdit(taskId) {
    // Simply re-render to restore original state
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
        li.dataset.taskId = task.id;
        
        // Create span for task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.className = 'task-text';
        taskText.style.cursor = 'pointer';
        taskText.onclick = () => editTask(task.id);
        taskText.setAttribute('role', 'button');
        taskText.setAttribute('tabindex', '0');
        taskText.setAttribute('aria-label', `Edit task: ${task.text}`);
        
        // Add keyboard support for task text
        taskText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                editTask(task.id);
            }
        });
        
        // Create button container
        const btnContainer = document.createElement('div');
        btnContainer.className = 'd-flex gap-2';
        
        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary btn-sm';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(task.id);
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        // Append buttons to container
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        
        // Append text and buttons to list item
        li.appendChild(taskText);
        li.appendChild(btnContainer);
        
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
