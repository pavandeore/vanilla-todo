const allTasksWrapper = document.querySelector('.allTasks');
const newTaskRef = document.querySelector('.new-task input');

const allTasksFilterRef = document.querySelector('.filters .all-filter');
const activeTasksFilterRef = document.querySelector('.filters .active-filter');
const completedFilterRef = document.querySelector('.filters .completed-filter');
const itemCountRef = document.querySelector('.todo-footer .item-count')
const clearFilterRef = document.querySelector('.todo-footer .clear-completed');

//object to store all tasks
let allTasks = [
    {
        "task_id": "123",
        "task_content": "Complete the task 1",
        "isCompleted": "false"
    }, {
        "task_id": "321",
        "task_content": "Complete the task 2",
        "isCompleted": "false"
    }, {
        "task_id": "131",
        "task_content": "Complete the task 3",
        "isCompleted": "false"
    }, {
        "task_id": "331",
        "task_content": "Complete the task 4",
        "isCompleted": "true"
    }
];
//This will create html code for task
const createTask = (task) => {
    if (task.isCompleted == "true") {
        classForCompleted = "completed-task";
        circle = "fa-circle-check";
    } else if(task.isCompleted == "false") {
        classForCompleted = "";
        circle = "fa-circle";
    }
    return (`
    <div>
        <i class="fa-regular ${circle} unticked" data-task-id="${task.task_id}"></i>
        <span class="${classForCompleted}" taskId=${task.task_id}>${task?.task_content}</span>
    </div>
    <div>
        <i class="fa-solid"></i>
    </div>
    `
    );
}
//render all tasks
const renderAllTasks = (tasksArray) => {
    allTasksWrapper.innerHTML = "";
    tasksArray.forEach(item => {
        const task = document.createElement('div');
        task.classList.add('task')
        task.innerHTML = createTask(item);
        allTasksWrapper.appendChild(task);
    });
    countActiveItems();
    console.log(allTasks)
}
//On press of enter add task in object and re-render tasks
newTaskRef.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        const taskContent = event.target.value;
        const newTask = {
            "task_id": Math.random(),
            "task_content": taskContent,
            "isCompleted": "false"
        }
        allTasks.push(newTask);
        event.target.value = "";
        renderAllTasks(allTasks);
    }
})
//All tasks filter
allTasksFilterRef.addEventListener('click', function () {
    renderAllTasks(allTasks);
});
//function to filter tasks based on isCompleted.value
function filterTasks(value) {
    const activeTasks = allTasks.filter(activeTask => activeTask.isCompleted == value);
    renderAllTasks(activeTasks);
}
//filter active tasks
activeTasksFilterRef.addEventListener('click', function (e) {
    filterTasks(value = "false");
});
//filter completed tasks
completedFilterRef.addEventListener('click', function (e) {
    filterTasks(value = "true")
});
//function to show currently active (isCompleted==false) tasks count
const countActiveItems = (e) => {
    const countRef = document.createElement('span');
    const count = allTasks.filter(activeTask => activeTask.isCompleted === "false");
    countRef.innerText = `${count.length} items left`;
    itemCountRef.innerHTML = "";
    itemCountRef.appendChild(countRef);
}
//clear the completed tasks and re-render tasks
clearFilterRef.addEventListener('click', function (e) {
    allTasks = allTasks.filter(tasks => tasks.isCompleted === "false");
    renderAllTasks(allTasks);
})
const allTasksReference = allTasks; 

allTasksWrapper.addEventListener('click', function (e) {
    const untickedElement = e.target.closest('.unticked');
    console.log(e.target)
    if (!untickedElement) return;
  
    const taskElement = untickedElement.closest('.task');
    const taskId = taskElement.querySelector('span').getAttribute('taskid');
    const taskToUpdate = allTasksReference.find(task => task.task_id == taskId);
    taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
  
    renderAllTasks(allTasksReference);
  });

renderAllTasks(allTasks);

