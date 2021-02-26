/* Modal handler*/
const openModal = () => {
    const div = document.createElement('div');
    div.classList.add('modal');

    div.innerHTML = `
        <div class="new-item">
            <div class="form">
                <div class="form__text">
                    <input type="text" placeholder="Task title" required>
                    <textarea name="" id="" cols="30" rows="2" placeholder="Description" required></textarea >
                </div>
                <div class="form__dates">
                    <div class="date-input start-date">
                        <label for="start">Start Date</label>
                        <input type="date"  name="start" id="">
                    </div>
                    <div class="date-input end-date">
                        <label for="finish">End Date</label>
                        <input type="date" name="finish" id="">
                    </div>
                </div>
                
                <div class="form__colors">
                    <p>Color Id</p>
                    <div class="colors">
                        <div id="yellow" class="option" onclick="active(event)">
                            <input type="radio" name="color-id" id="" value="yellow">
                        </div>
                        <div id="blue" class="option" onclick="active(event)">
                            <input type="radio" name="color-id" id="" value="blue">
                        </div>
                        <div id="green" class="option" onclick="active(event)">
                            <input type="radio" name="color-id" id="" value="green">
                        </div>
                        <div id="violet" class="option" onclick="active(event)">
                            <input type="radio" name="color-id" id="" value="violet">
                        </div>
                    </div>
                </div>
                <div class="form__actions">
                    <button class="btn" onclick="newTask()">Create</button>
                    <button class="btn" onclick="closeModal('modal')">Cancel</button>
                </div>

            </div>
            <div class="modal-actions">
                <button class="btn start-date" onclick="displayOption('start-date')">
                    Start Date
                </button>
                <button class="btn end-date" onclick="displayOption('end-date')">
                    End Date
                </button>
                <button class="btn color-id" onclick="displayOption('form__colors')">
                    Color Tag
                </button>
            </div>
        </div>
    `
    document.body.appendChild(div);
}
const closeModal = (container) => {
  
    const modal = document.querySelector(`.${container}`);
    document.body.removeChild(modal);
    
}

const newTask = (e) => {
    const taskTitle = document.querySelector('.modal .new-item .form .form__text input').value;
    const taskDescrip = document.querySelector('.modal .new-item .form .form__text textarea').value;
    const startDate = document.querySelector('.modal .new-item .form .start-date input').value;
    const endDate = document.querySelector('.modal .new-item .form .end-date input').value;
    const colorOptions = [...document.querySelectorAll('.modal .new-item .form .colors input[type="radio"]')];

    if(taskTitle == "" || taskDescrip == ""){
        alert('Title and Description must be completed');
        return
    }
    
    let colorId = colorOptions.filter(item => {
        if (item.checked == true){
            return item
        }
        else {
            return ""
        }
    } )[0];

    if(colorId != undefined){
        colorId = colorPicker(colorId.value)
    }
    else {
        colorId = ""
    }


    taskList.push({
        id: `item-${taskList.length}`,
        title: taskTitle,
        description: taskDescrip,
        start: startDate,
        end: endDate,
        color: colorId
    });

    closeModal('modal');
    printTasks();
}

/*functions for modal elements*/
const active = (e) => {
    const colorOptionsDiv = document.querySelectorAll('.modal .colors div');
    const colorOptionsRadio = [...document.querySelectorAll('.modal .colors input[type="radio"]')];

    /*check input*/
    colorOptionsRadio.forEach(item => item.checked == false)

    let isCheck = colorOptionsRadio.filter(item => item.value == e.target.id)[0];
    isCheck.checked = true;

    /*apply style active*/
    for(let i = 0; i < colorOptionsDiv.length; i++){
        colorOptionsDiv[i].classList.remove('active')
    }
    e.target.className += " active"
}

/*show date and color selector*/
const displayOption = (name) => {
    const element = document.querySelector(`.form .${name}`);

    element.classList.toggle('display')
}

/* Printing items*/
const printTasks = () => {
    const openTasks = document.querySelector('#open');

     taskList.forEach((task, i) => {

        if(i == taskList.length - 1){
            openTasks.innerHTML += `
            <div id=${task.id} class="item-task" draggable="true">
                <div class="group-id">
                    <div class="group-id__color" style="background-color: ${task.color}"></div>
                </div>
                <div class="title">
                    <h4>${task.title}</h4>
                </div>
                <div class="progress-icon">
                    <i class="far fa-circle"></i>
                </div>
            </div>
        `
        }
    })

    addTaskEvent();
}

const printChanges = (id, parentId) => {
    const task = taskList.filter(item => item.id == id)[0];
    const children = [...document.getElementById(`${parentId}`).children];
    const parent = document.getElementById(`${parentId}`)
    const item = children.filter(child => child.id === id)[0]
    
    /*apply changes */
    let title = item.children[1].children[0];
    let tag = item.children[0].children[0];

    title.innerHTML = task.title;
    tag.style.backgroundColor = task.color;
 
    closeModal('item-container');
}


/* display elements */
const openTask = (e) => {
    let id = e.target.id;
    let parent = e.target.parentElement.id;
    let selected = taskList.filter(item => item.id === id)[0];

    let status;
    switch(parent){
        case "open":
            status = "Open";
            break;
        case 'progress':
            status = "In Progress";
            break;
        case 'review':
            status = "Review";
            break;
        case 'close':
            status = "Close";
            break;
    }

    const div = document.createElement('div');
    div.classList.add('item-container');

    div.innerHTML = `
    <div class="item-display">
    <div class="close" onclick="closeModal('item-container')">
        <i class="fas fa-times"></i>
    </div>
    <div class="title">
        <input id="${selected.id}" data-type="title" type="text" value="${selected.title}" onkeyup="editTitle(event)">
        <p>Status: <strong>${status}</strong></p>
    </div>
    <div class="item-description">
        <h4>Description</h4>
        <p  onclick="displayTextarea(event)">${selected.description}</p>
        <textarea id="${selected.id}" data-type="description" class="hidden" name="" id="" cols="30" rows="2" >${selected.description}</textarea>
        <button class="hidden" onclick="closeTextarea(event)">Save</button>
        <button class="hidden" onclick="closeTextareaNoChange(event)"> X </button>
    </div>
    <div class="detail">
        <div  class="${selected.start ? "start" : "hidden"}">
            <p>Start Date</p>
            <input id="${selected.id}" data-type="start" type="date" value="${selected.start}" onchange="editDate(event)">
        </div>
        <div class="${selected.end ? "end" : "hidden"}">
            <p>End Date</p>
            <input id="${selected.id}" data-type="end" type="date"  value="${selected.end}" onchange="editDate(event)">
        </div>
        <div class="${selected.color ? "tag" : "hidden"}">
            <p>Color Tag</p>
            <div class="color" onclick="openColorPicker()" style="background-color: ${selected.color};"></div>
            <div id="${selected.id}" data-type="color" class="colors hidden">
                <div id="yellow" class="option" onclick="editColor(event)">
                    <input type="radio" name="color-id" id="" value="yellow">
                </div>
                <div id="blue" class="option" onclick="editColor(event)">
                    <input type="radio" name="color-id" id="" value="blue">
                </div>
                <div id="green" class="option" onclick="editColor(event)">
                    <input type="radio" name="color-id" id="" value="green">
                </div>
                <div id="violet" class="option" onclick="editColor(event)">
                    <input type="radio" name="color-id" id="" value="violet">
                </div>
            </div>
        </div>
    </div>
    <button class="btn" onclick="printChanges('${selected.id}','${parent}')">Save</button>
    <button class="btn" onclick="deleteTask('${selected.id}','${parent}')">Delete</button>
</div>
    `
    document.body.appendChild(div);


}

const displayTextarea = (e) => {
    let p = e.target;
    p.classList.add('hidden');
    

    let textArea = e.target.nextElementSibling;
    let saveButton = e.target.nextElementSibling.nextElementSibling;
    let closeButton = saveButton.nextElementSibling;
    textArea.classList.remove('hidden');
    saveButton.classList.remove('hidden');
    closeButton.classList.remove('hidden');


}
const closeTextarea = (e) => {
    editTextarea(e);

    let id = e.target.previousElementSibling.id;
    let selected = taskList.filter( item => item.id == id)[0];

    let saveButton = e.target;
    let closeButton = saveButton.nextElementSibling;
    let textArea = saveButton.previousElementSibling;
    textArea.classList.add('hidden');
    saveButton.classList.add('hidden');
    closeButton.classList.add('hidden');

    let p = textArea.previousElementSibling;
    p.classList.remove('hidden');
    
    p.innerHTML = selected.description;



}
const closeTextareaNoChange = (e) => {
    let closeButton = e.target;
    let saveButton = e.target.previousElementSibling;
    let textArea = saveButton.previousElementSibling;
    
    textArea.classList.add('hidden');
    closeButton.classList.add('hidden');
    saveButton.classList.add('hidden');

    let p = textArea.previousElementSibling;
    p.classList.remove('hidden');

    let id = saveButton.previousElementSibling.id;
    let selected = taskList.filter( item => item.id == id)[0];
   
    textArea.value = selected.description;

}


/*styles on drag*/
const styleHandler = (id) => {
    const title = selectedTask.children[1];
    const iconContainer = selectedTask.children[2];
    let icon;

    switch(id){
        case 'open':
           icon = '<i class="far fa-circle"></i>';
           titleStyle = 'none';
           break;
        case 'progress':
           icon = '<i class="fas fa-spinner"></i>';
           titleStyle = 'none';
           break;
        case 'review':
            icon = '<i class="fas fa-exclamation"></i>';
            titleStyle = 'none';
            break;
        case 'close':
            icon = '<i class="fas fa-check"></i>';
            titleStyle = 'line-through';
            break;
    }

    iconContainer.innerHTML = icon;
    title.style.textDecoration = titleStyle;
}