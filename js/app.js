// CODE EXPLAINED channel

//select elements
const clear = document.querySelector('.clear');
//date
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//class names

const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Vars
let LIST,
id;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;//set id to the last one in list
    loadList(LIST);//load the list to the user interface
}else {
    //if data isnt empty
    LIST = [];
    id = 0;
}

//load items to the user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


//clear localstorage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})
/*
//add item to localestorage(this code must be everywhere we update list array is update)
localStorage.setItem("TODO",JSON.stringify(LIST));
*/
//show todays date
const options = {weekday: 'long', month:'short', day:'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to function
function addToDo(toDo, id, done, trash){

    //check if item is not in trash
    if(trash){return;}

    const DONE = done? CHECK:UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class=item><i class="fa  ${DONE} co" job="complete" id="${id}"></i> 
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i></li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position,item)
}


//add an item to list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        //if the input is not empty
        if(toDo){
            addToDo(toDo, id, false,false);

            LIST.push({
                name:toDo,
                id: id,
                done: false,
                trash:false
            });
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

//complete todo when complete btn is clicked
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done =LIST[element.id].doen ? false:true;
}

//remove todo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target;//return the clicked element inside list
    const elementJob = element.attributes.job.value;// complete or delete

    if(elementJob == 'complete'){
        completeToDo(element)
    }else if(elementJob == 'delete'){
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
});