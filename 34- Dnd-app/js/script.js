const itemContainers = document.querySelectorAll('.table-inner');
const tasks = document.getElementsByClassName('item-task');
let taskList = [{
    id: 'item-0',
    title: 'First task',
    description: 'description'
}];
let selectedTask;
let position;


/*Drag & drop functions*/
const dragStart = (e) => {
    /*select item dragged*/
    selectedTask = e.target;
}

const dragOver = (e) => {
    /*to allow dropping an element into new container*/
    e.preventDefault();
    
   position = e.clientY;

}

const containerHandler = (e) => {

    if(e.target.id.includes('item')){
        return e.target.parentElement
    }
    else {
       return e.target
    }
}

const setPosition = (tasks, selectedContainer) => {
    let itemsPosition = [];

    tasks.forEach(item => {
        let top = item.offsetTop;
        let bottom = item.offsetTop + item.clientHeight;

        itemsPosition.push({id: item.id, top, bottom})
    })

    
    itemsPosition.forEach(item => {
        let middle = (item.bottom - item.top) / 2;
        let top = item.top + middle;

        /*what item is on top cursor */
        if(position > item.top && position < item.bottom){
            let child = document.getElementById(`${item.id}`)

            /*cursor is at top or bottom of the element?*/
            if(position < top){
                selectedContainer.insertBefore(selectedTask, child);
            }
            else {
                selectedContainer.insertBefore(selectedTask, child.nextElementSibling);        
            }
        }
    })

}

const dragDrop = (e) => {

    /*set parent container to append children*/
   let selectedContainer = containerHandler(e);
 
    /*get items in target container*/
    let containerChildren = [...selectedContainer.children];
    
    /*append functions*/
    if(containerChildren.length == 0  || e.target == selectedContainer){
        selectedContainer.append(selectedTask);
    }
    /*get items positions in container & append*/
    setPosition(containerChildren, selectedContainer);


    /*icon change & styles*/
    styleHandler(selectedContainer.id)

}

/*Add Events*/
const addTaskEvent = () => {

    for(let i = 0; i < tasks.length; i++){
        tasks[i].addEventListener('dragstart', dragStart);
        tasks[i].addEventListener('click', openTask);
    }
}


for(let i = 0; i < itemContainers.length; i++){
    itemContainers[i].addEventListener('dragover', dragOver);
    itemContainers[i].addEventListener('drop', dragDrop);
}


/* Task edit functions*/
const colorPicker = (color) => {
    let colorId;

    switch(color){
        case 'yellow':
            colorId = '#f0f031';
            break;
        case 'blue':
            colorId = ' #4646d1';
            break;
        case 'green':
            colorId = '#208020';
            break;
        case 'violet':
            colorId = '#9c3a9c';
            break;
    }
    return colorId
}

const editTitle = (e) => {
    let id = e.target.id;
    let ref = e.target.dataset.type
    let task = e.target.value;
    let selected = taskList.filter( item => item.id == id)[0];

    selected[ref] = task;
}

const editTextarea = (e) => {
    let textArea = e.target.previousElementSibling;
    let id = textArea.id;
    let selected = taskList.filter( item => item.id == id)[0];
    let ref = textArea.dataset.type;

    selected[ref] = textArea.value;

}
const editDate = (e) => {
    let id = e.target.id;
    let selected = taskList.filter( item => item.id == id)[0];
    let ref = e.target.dataset.type;

    selected[ref] = e.target.value;
}
const openColorPicker = () => {
    const colorPicker = document.querySelector('.item-display .detail .colors');
    colorPicker.classList.remove('hidden');

    
}
const editColor = (e) => {
    let id = e.target.parentElement.id;
    let selected = taskList.filter( item => item.id == id)[0];
    let ref = e.target.parentElement.dataset.type;
    let colorOption = e.target.id;
    let colorId = colorPicker(colorOption);
  
    selected[ref] = colorId;

    const colorPickerDiv = document.querySelector('.item-display .detail .colors');
    colorPickerDiv.classList.add('hidden');

    const colorDisplay = document.querySelector('.item-display .detail .color');
    colorDisplay.style.backgroundColor = colorId;

}
const deleteTask = (id, parentId) => {
    let confirmation =  confirm('Are you sure you want to delete the task?');

    
    if(confirmation){
        const task = taskList.filter(item => item.id == id)[0];
        let index = taskList.indexOf(task);
        taskList.splice(index,1);

        const children = [...document.getElementById(`${parentId}`).children];
        const item = children.filter(child => child.id === id)[0];
        const parent = document.getElementById(`${parentId}`);

        parent.removeChild(item);

        closeModal('item-container');
    }
    else {
        closeModal('item-container');
        
    }
}