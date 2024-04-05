let tasks = [
  {
    title: "اقرا كتاب",
    date: "15/0/2030",
    isDone: true,
  },
  {
    title: "اقرا كتاب",
    date: "15/1030",
    isDone: false,
  },
  {
    title: " كتاب",
    date: "15/10/2030",
    isDone: false,
  },
];

function gettaskfromstorage()
{
    let retrever= JSON.parse(localStorage.getItem('tasks'))
    tasks = retrever ?? []
}

gettaskfromstorage()
function filltaskonthepage() {
  document.getElementById("taskes").innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
        <div class="task ${task.isDone ? "done" : ""}">
        <div id="taskinfo">
            <h2>${task.title}</h2>
            
            <div id="history">
                <span class="material-symbols-outlined">
                    calendar_month
                    </span>
                <span>${task.date}</span>
            </div>
        </div>
        <div id="taskaction">
            <button onclick='deleteTask(${index})' class="circuler" id="delete">
                <span class="material-symbols-outlined">
                    delete
                    </span>
            </button>

             ${task.isDone ? `
             <button onclick='conmpletTask(${index})' class='circuler' id='wrong'>
                <span class='material-symbols-outlined'>
                    close
                </span>
            </button>
             `:`
                <button onclick='conmpletTask(${index})' class='circuler' id='correct'>
                    <span class='material-symbols-outlined'>
                        done
                    </span>
                </button>
             `}
           


            <button onclick='updateTask(${index})' class="circuler" id="edit">
                <span class="material-symbols-outlined">
                    edit
                    </span>
            </button>
        </div>
        </div>
        `;
    document.getElementById("taskes").innerHTML += content;
    index++;
  }
}
filltaskonthepage();

document.getElementById("btnadd").addEventListener("click", function () {
  let taskname = prompt("Please intpu title of duty ? ");
  let now = new Date();
  let date =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  let taskObj = {
    title: taskname,
    date: date,
    isDone: false,
  };
  tasks.push(taskObj);
  storagtask()


  filltaskonthepage();
});

function deleteTask(index) {
  let tas = tasks[index];
  let x = confirm("are you sure " + tas.title);
  if(x)
  {
    
    tasks.splice(index, 1);
    storagtask()
    filltaskonthepage();
  }
  
  
}

function updateTask(index) {
  let tak = tasks[index];
  let newTask = prompt("please enter new task", tak.title);

  tak.title = newTask;
  storagtask()
  filltaskonthepage();
}

function conmpletTask(index)
{
    let tak = tasks[index];
    tak.isDone = !tak.isDone
    storagtask()
    filltaskonthepage();
}

function storagtask()
{
    let taskString = JSON.stringify(tasks)
    localStorage.setItem('tasks',taskString)
}
