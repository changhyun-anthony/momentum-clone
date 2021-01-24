const toDoform = document.querySelector(".js-toDoForm");
const toDoinput = toDoform.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const toDoList_finished = document.querySelector(".js-toDoList__finished");

const TODO_LS = 'PENDING';
const FIN_LS = 'FINISHED';

let toDos = [];
let finished = [];

function deleteToDo(event) {
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // console.log(cleanToDos);
    toDos = cleanToDos;
    savdToDos();
}

function finishedToDo(event) {
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList_finished.appendChild(li);
    console.log(li);
    const finishedtoDoObj = {
        text: li.querySelector("span").innerText,
        id: li.id
    };
    finished.push(finishedtoDoObj);
    // console.log(finished);
    // toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // console.log(cleanToDos);
    toDos = cleanToDos;
    savdToDos();
}

function pendingToDo(event) {
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.appendChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // console.log(cleanToDos);
    toDos = cleanToDos;
    savdToDos();
}


function savdToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
    localStorage.setItem(FIN_LS, JSON.stringify(finished));
}


function paintToDo(text,newId, isFinished) {
    // console.log(text);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delbtn = document.createElement("button");
    const donebtn = document.createElement("button");
    const switchbtn = document.createElement("button");

    delbtn.innerText = "❌";
    delbtn.addEventListener("click",deleteToDo);
    donebtn.innerText = "✅";
    donebtn.addEventListener("click",finishedToDo);
    switchbtn.innerText = "⏸";
    switchbtn.addEventListener("click",pendingToDo);

    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delbtn);
    const toDoObj = {
        text: text,
        id: newId
    };
    if(isFinished) {
        li.appendChild(switchbtn);
        toDoList_finished.appendChild(li);
        finished.push(toDoObj);
        savdToDos();
    } else {
        li.appendChild(donebtn);
        toDoList.appendChild(li);
        toDos.push(toDoObj);
        savdToDos();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoinput.value;
    const newId_after =  Date.now();
    paintToDo(currentValue, newId_after, false);
    toDoinput.value = "";
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null) {
        // console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);
        parsedToDos.forEach(function(toDo) {
            // console.log(toDo.text);
            const newId_load =  toDos.length + finished.length + 1;
            isFinished = false;
            paintToDo(toDo.text, newId_load, isFinished);
        });
    } 
    const loadedFinished = localStorage.getItem(FIN_LS);
    if(loadedFinished !== null) {
        // console.log(loadedFinished);
        const parsedToDos = JSON.parse(loadedFinished);
        // console.log(parsedToDos);
        parsedToDos.forEach(function(toDo) {
            // console.log(toDo.text);
            const newId_load =  toDos.length + finished.length + 1;
            isFinished = true;
            paintToDo(toDo.text, newId_load, isFinished);
        });
    } 
}

function init() {

    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();