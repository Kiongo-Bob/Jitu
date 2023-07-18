let completedTask = []
let alltasks = []
let activetasks = []

let All_btn = document.querySelector('#all');
let Active_btn = document.querySelector('#active');
let complete_btn = document.querySelector('#completed');
let clear_btn = document.querySelector('#clear_btn');
let counter = document.querySelector('.count')

let form = document.querySelector('.task-form')
let newtodo = document.querySelector('#todo-input')
let checkbox = document.querySelector('#deselect')

checkbox.addEventListener('click', ()=>{
    // console.log(checkbox.checked);
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(newtodo.value !== ''){
        completedTask.push({
          task:newtodo.value,
          checked: checkbox.checked
    })
    sendtolocalstorage(completedTask)
    newtodo.value='';
    checkbox.checked=false;

    displayTask(completedTask)
    console.log(completedTask);
    }
})


function displayTask(){
    let taskItems = document.querySelectorAll('.lower-inner .taskitem')

    taskItems.forEach(el=>el.remove())

    completedTask.forEach(({
        task,
        checked
    },  index)=>{
            let checkbox = document.createElement('input')
            checkbox.type = "checkbox"
            checkbox.className = "dynamiCheckbox"
            checkbox.checked = checked

            let taskholder = document.createElement('div')
            taskholder.className = 'holder';
            taskholder.textContent = task
            taskholder.style.textDecoration = "none"
            if(checkbox.checked == true){
                 taskholder.style.textDecoration = "line-through"
            }
            checkbox.addEventListener('click', ()=>{
                if (taskholder.style.textDecoration == "none"){
                    taskholder.style.textDecoration = "line-through"
                    completedTask[index].checked = true
                    sendtolocalstorage(completedTask)
                    count()
                }else{
                    taskholder.style.textDecoration = "none"
                }
            })

            let taskitem = document.createElement('div')
            taskitem.className = 'taskitem';
            taskitem.appendChild(checkbox)
            taskitem.appendChild(taskholder)

            let completedTaskHolder = document.querySelector('.lower-inner')
            completedTaskHolder.appendChild(taskitem)
            count()
    })
    
}
displayTask(getfromlocalstorage())

btnAll.addEventListener('click', () => {
    console.log("clicked all");
    
    // renderTasks(completedtasks);
    renderTasks(getfromlocalstorage())
    count()
  });


btnActive.addEventListener('click', () => {
    mytasks=getfromlocalstorage()
    activetasks = mytasks.filter((task) => !task.checked);
   
    console.log("clicked active");
    renderTasks(activetasks);
    count()
  });



btnComplete.addEventListener('click', () => {
    mytasks=getfromlocalstorage()
    
    completedTask = mytasks.filter((task) => task.checked);
   
    console.log("clicked complete");
    renderTasks(completedTask);
    count()
    
});

btnClear.addEventListener('click', () => {
    mytasks=getfromlocalstorage()
    const filteredTasks = mytasks.filter((task) => !task.checked);
    localStorage.removeItem('completedTask');
    sendtolocalstorage(filteredTasks)
    // completedTask = filteredTasks;
    console.log(filteredTasks);
    renderTasks(filteredTasks);
    count()
});

function sendtolocalstorage(items){
    localStorage.setItem('completedTask',JSON.stringify(items))
}

function getfromlocalstorage(){
    items=localStorage.getItem('completedTask')
    return JSON.parse(items)
}

function count(){
    remaining = getfromlocalstorage() 
    remaining = remaining.filter((task) => !task.checked);
    count_remaining = remaining.length;
    console.log(count_remaining)
    itemsleft.textContent= count_remaining + "count"
}