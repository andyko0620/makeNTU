const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const list_index=document.getElementsByClassName('todo-app__item');
const total = document.getElementById('total_count');
const text = document.getElementsByClassName('todo-app__item-detail');

var count=0;
let LIST,ID;
//localStorage.clear();
let data=localStorage.getItem("TODO");
if(data){
    LIST=JSON.parse(data);
    ID = LIST.length;
    loadlist(LIST);
}
else{
    LIST=[];
    ID=0;
}


function loadlist(array){
    array.forEach(element => {
        addToDo(element.name,element.id,element.done,element.remove);
    });
      
}

function addToDo(toDo,index,done,remove){
    if(remove) return;
    
    const LINE = done ? "line-through" : "";
    const bgColor = done ? "#26ca299b" : "rgba(99, 99, 99, 0.698)";
    console.log(LINE);
    const item =`<li class="todo-app__item">
                    <div class="todo-app__checkbox" >
                        <input type="checkbox"  id="${index}" style="background=${bgColor};">
                        <label for="${index}"  id="${index}" job="complete"></label>
                     </div>
                    <h1 class="todo-app__item-detail " style="text-decoration: ${LINE};">${toDo}</h1>
                    <img src="img/x.png" class="todo-app__item-x" job="delete" id="${index}">
                </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position,item);
}


function showActiveNumber(){
    let number=0;
    for(i=0;i<LIST.length;i++){
        if(LIST[i].done === false && LIST[i].remove===false){
            number++;
        }
    }
    count=number;
}
function completeToDo(element){
    element.parentNode.parentNode.querySelector(".todo-app__item-detail").classList.toggle("checked");
  /*  console.log(element.id);
    console.log(LIST[element.id].done);
    */
    LIST[element.id].done = LIST[element.id].done ? false :true;
  /*  console.log(LIST[element.id].done);
    localStorage.setItem("TODO",JSON.stringify(LIST));
    console.log("test");*/
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].remove = !LIST[element.id].remove;
 //   localStorage.setItem("TODO",JSON.stringify(LIST));
}
list.addEventListener("click",event=>{
    const element=event.target;
    const elementjob=element.attributes.job.value;
    if(elementjob==="complete"){
        completeToDo(element);
    }
    else if(elementjob==="delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));

});

function showAllToDo(){
    for(i=0;i<LIST.length;i++){
        if(LIST[i].remove===false)
            list_index[i].style.display="flex";
    }
}

function showActiveToDo(){
    for(i=0;i<LIST.length;i++){
        if(LIST[i].done === false && LIST[i].remove===false)
            list_index[i].style.display="flex";
        else
        list_index[i].style.display="none";
    }
}

function showCompletedToDo(){
    for(i=0;i<list_index.length;i++){
        if(LIST[i].done === true && LIST[i].remove===false)
            list_index[i].style.display="flex";
        else
            list_index[i].style.display="none";
    }
}

function ClearCompletedToDo(){
    for(i=0;i<LIST.length;i++){
        if(LIST[i].done === true && LIST[i].remove===false){
            list_index[i].style.display="none";
            LIST[i].remove = true;
            LIST[i].done = false;
        }     
    }
    showActiveNumber();
    total.innerHTML=count+" left";
}

input.addEventListener('keyup', event => {
    if(event.keyCode === 13 && event.target.value !== ''){
        const toDo = input.value;
        addToDo(toDo,ID,false,false);
        LIST.push({
            name :toDo,
            id: ID,
            done: false,
            remove: false
        });
        ID++;
        localStorage.setItem("TODO",JSON.stringify(LIST));
        showActiveNumber();
        total.innerHTML=count+" left";
        input.value="";
    }
});
console.log(LIST);
/*
function toggleToDo(index){
    LIST[index].done = LIST[index].done ? false :true;
    text[index].classList.toggle('checked');
    showActiveNumber();
    total.innerHTML=count+" left";
}

function deleteToDo(index){
    LIST[index].remove = true;
    LIST[index].done = false;
    list_index[index].style.display="none"
    //localStorage.setItem("TODO",JSON.stringify(LIST));
    showActiveNumber();
    total.innerHTML=count+" left";
}
*/