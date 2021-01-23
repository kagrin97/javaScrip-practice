const toDoForm = document.querySelector(".jsForm");
const toDoInput = toDoForm.querySelector("input");
const toDoFin = document.querySelector(".finishedList");
const toDoPen = document.querySelector(".pendingList");

const PENDINGLS = "pending";
const FINISHEDLS = "finished";

let pendingArray = [];
let finishedArray = [];

const randomId = Date.now();

function upPenLS(li) {
  const leftPending = pendingArray.filter((todo) => {
    const text = li.querySelector("span").textContent;
    return todo.text !== text;
  });
  pendingArray = leftPending;
  savePending(pendingArray);
}

function upFinLS(li) {
  const leftFinished = finishedArray.filter((todo) => {
    const text = li.querySelector("span").textContent;
    return todo.text !== text;
  });
  finishedArray = leftFinished;
  saveFinish(finishedArray);
}

function switchBoard(event) {
  if (event.path[2] === toDoPen) {
    const li = event.path[1];
    const btn = event.path[0];
    btn.innerHTML = `↩`;
    const text = li.firstChild.textContent;
    saveFinishedToDos(li, text);
    upPenLS(li);
    toDoFin.appendChild(li);
  } else {
    const li = event.path[1];
    const btn = event.path[0];
    btn.innerHTML = `✅`;
    const text = li.firstChild.textContent;
    savePendingToDos(li, text);
    upFinLS(li);
    toDoPen.appendChild(li);
  }
}

function saveFinishedToDos(li, text) {
  const finishedObj = {
    id: randomId,
    text: text
  };
  li.id = finishedObj.id;
  finishedArray.push(finishedObj);
  saveFinish(finishedArray);
}

function saveFinish() {
  localStorage.setItem(FINISHEDLS, [JSON.stringify(finishedArray)]);
}

function savePending(array) {
  localStorage.setItem(PENDINGLS, [JSON.stringify(array)]);
}

function savePendingToDos(li, text) {
  const penObj = {
    id: randomId,
    text: text
  };
  li.id = penObj.id;
  pendingArray.push(penObj);
  savePending(pendingArray);
}

function deleteToDos(event) {
  if (event.path[2] === toDoPen) {
    const li = event.path[1];
    toDoPen.removeChild(li);
    upPenLS(li);
  } else {
    const li = event.path[1];
    toDoFin.removeChild(li);
    upFinLS(li);
  }
}

function addPen(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  checkBtn.addEventListener("click", switchBoard);
  delBtn.addEventListener("click", deleteToDos);
  span.innerHTML = text;
  delBtn.innerHTML = `❌`;
  checkBtn.innerHTML = `✅`;
  savePendingToDos(li, text);
  toDoPen.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
}

function addFin(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  checkBtn.addEventListener("click", switchBoard);
  delBtn.addEventListener("click", deleteToDos);
  span.innerHTML = text;
  delBtn.innerHTML = `❌`;
  checkBtn.innerHTML = `↩`;
  saveFinishedToDos(li, text);
  toDoFin.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
}

function loadData() {
  const loadDataPen = localStorage.getItem(PENDINGLS);
  const loadDataFin = localStorage.getItem(FINISHEDLS);
  if (loadDataPen !== null) {
    const parsePen = JSON.parse(loadDataPen);
    parsePen.forEach((pending) => {
      addPen(pending.text);
    });
    const parseFin = JSON.parse(loadDataFin);
    parseFin.forEach((finished) => {
      addFin(finished.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentText = toDoInput.value;
  addPen(currentText);
  toDoInput.value = "";
}

function init() {
  loadData();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
