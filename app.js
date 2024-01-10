//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".main__new-task");//Add a new task.
const addTaskButton = document.querySelector(".main__btn-add-task");//first button
const containerListTask = document.querySelector(".list-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".completed-tasks");//completed-tasks



//New task list item
const createNewTaskElement = (task) => {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    listItem.classList.add("list-tasks__task");
    checkBox.classList.add("list-tasks__input-checkbox");
    label.classList.add('list-tasks__name-task');
    editInput.classList.add("input-task");
    editButton.classList.add("btn-edit-task");
    editButton.classList.add("btn");
    deleteButton.classList.add("btn-delete-task");
    deleteButton.classList.add("btn");
    deleteButtonImg.classList.add("btn__cross-icon");

    checkBox.type = "checkbox";
    editInput.type = "text";
    

    editButton.innerText = "Edit";
    label.innerText = task;
    
    deleteButtonImg.src = './assets/remove.svg';
    
    deleteButtonImg.alt = "cross-icon";

    deleteButton.append(deleteButtonImg);
    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}


function addTask() {

    if (!taskInput.value) return;
    const newTask = createNewTaskElement(taskInput.value);

    containerListTask.append(newTask);
    bindTaskEvents(newTask, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.

function editTask() {

    const listItem = this.parentNode;

    const editInput = listItem.querySelector('.input-task');
    const label = listItem.querySelector(".list-tasks__name-task");
    const editBtn = listItem.querySelector(".btn-edit-task");
    const containsClass = listItem.classList.contains("list-tasks__task_edit-mode");
    
    if(containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("list-tasks__task_edit-mode");
};


//Delete task.
function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    
    ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
    const listItem = this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


function taskIncomplete() {
    const listItem = this.parentNode;
    containerListTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".list-tasks__input-checkbox");
    const editButton = taskListItem.querySelector(".btn-edit-task");
    const deleteButton = taskListItem.querySelector(".btn-delete-task");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < containerListTask.children.length; i++){
    bindTaskEvents(containerListTask.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}