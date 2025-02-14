function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  document.getElementById('txt').innerHTML =  h + ":" + m ;
  setTimeout(startTime, 1000);
}
  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function openTODO() {
  document.getElementById('todo-container').classList.add('todo-transition');
}
function closeTODO() {
  document.getElementById('todo-container').classList.remove('todo-transition');
}

