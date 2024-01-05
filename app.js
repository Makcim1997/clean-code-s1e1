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
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const newTask = createNewTaskElement(taskInput.value);

    //Append newTask to incompleteTaskHolder
    containerListTask.append(newTask);
    bindTaskEvents(newTask, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.

var editTask = function() {

    var listItem = this.parentNode;

    var editInput = listItem.querySelector('.input-task');
    var label = listItem.querySelector(".list-tasks__name-task");
    var editBtn = listItem.querySelector(".btn-edit-task");
    var containsClass = listItem.classList.contains("list-tasks__task_edit-mode");
    //If class of the parent is .editmode
    if(containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("list-tasks__task_edit-mode");
};


//Delete task.
var deleteTask = function() {
    var listItem=this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted = function() {
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    containerListTask.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}
//The glue to hold it all together.


//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);



const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
//select ListItems children
    var checkBox = taskListItem.querySelector(".list-tasks__input-checkbox");
    var editButton = taskListItem.querySelector(".btn-edit-task");
    var deleteButton = taskListItem.querySelector(".btn-delete-task");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < containerListTask.children.length; i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(containerListTask.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.