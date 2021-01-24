const toDoform = document.querySelector(".js-toDoForm");
const toDoinput = toDoform.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const toDoList_finished = document.querySelector(".js-toDoList__finished");

const PENDING_LS = 'PENDING';
const FINISHED_LS = 'FINISHED';

let toDos = [];
let finished = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    if(ul.classList.contains('js-toDoList')) {
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
    } else {
        toDoList_finished.removeChild(li);
        const cleanfinished = finished.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });
        finished = cleanfinished;
    }
    savdToDos();
}

function finishedToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
    paintToDo(li.querySelector("span").innerText, li.id, true)
}

function pendingToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList_finished.removeChild(li);
    const cleanfinished = finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanfinished;
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
    paintToDo(li.querySelector("span").innerText, li.id, false)
}


function savdToDos() {
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
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
    switchbtn.innerText = "▶";
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
        localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
    } else {
        li.appendChild(donebtn);
        toDoList.appendChild(li);
        toDos.push(toDoObj);
        localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
    }
}

function appendDate(text) {
    const date = new Date();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const newText = `[${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}] ${text}`;
    return newText;
}

function handleSubmit(event) {
    event.preventDefault();
    // const currentValue = toDoinput.value;
    const currentValue = appendDate(toDoinput.value);
    const newId_after =  Date.now();
    paintToDo(currentValue, newId_after, false);
    toDoinput.value = "";
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(PENDING_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            const newId_load =  toDos.length + finished.length + 1;
            paintToDo(toDo.text, newId_load, false);
        });
    } 
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if(loadedFinished !== null) {
        const parsedToDos = JSON.parse(loadedFinished);
        parsedToDos.forEach(function(toDo) {
            const newId_load =  toDos.length + finished.length + 1;
            paintToDo(toDo.text, newId_load, true);
        });
    } 
}

function init() {

    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();