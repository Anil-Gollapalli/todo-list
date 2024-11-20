
import './style.css';

const addTaskButton = document.getElementById('addtask');
const inputContainer = document.getElementById('input-container');
const submitButton = document.getElementById('submit-button');
const taskTable = document.getElementById('tasks');
const taskInput = document.getElementById('task');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');

let tasks = [];


function showTaskForm() {
    inputContainer.style.display = 'flex';
}

function hideTaskForm() {
    inputContainer.style.display = 'none';
}

class Task {
    constructor(task, description, dueDate, priority) {
        this.task = task;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}


function addTask() {
    const newTask = new Task(
        taskInput.value,
        descriptionInput.value,
        dueDateInput.value,
        priorityInput.value
    );

    tasks.push(newTask);
    displayTask(newTask, tasks.length - 1);
    clearForm();
    hideTaskForm();
}


function displayTask(task, index) {
    const row = document.createElement('tr');
    row.id = `task${index}`;
    row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.dueDate}</td>
        <td>${task.description}</td>
        <td>${task.priority}</td>
        <td><input type="checkbox"></td>
        <td><button class="remove-button">X</button></td>
    `;
    taskTable.appendChild(row);
}


function clearForm() {
    taskInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'Low';
}


function deleteTask(index) {
    tasks.splice(index, 1);
    document.getElementById(`task${index}`).remove();
    updateTaskIds();
}


function updateTaskIds() {
    const rows = document.querySelectorAll('#tasks tr');
    rows.forEach((row, index) => {
        row.id = `task${index}`;
    });
}

taskTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const row = event.target.parentElement.parentElement;
        const taskIndex = Array.from(taskTable.children).indexOf(row);
        deleteTask(taskIndex);
    }
});

addTaskButton.addEventListener('click', showTaskForm);
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    addTask();
});
const cancelButton = document.getElementById('cancel-button');

cancelButton.addEventListener('click', (event) => {
    
    event.preventDefault();  
    clearForm();            
    hideTaskForm();         
});