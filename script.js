var input = document.getElementById("input_todo");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add_update_btn").click();
  }
});

Todo_list = [];
var storedNames;

function refrestList() {
  var clear_ul_list = document.getElementById("todo_list");
  clear_ul_list.innerHTML = "";

  storedNames = JSON.parse(localStorage.getItem("Todo_list"));
  if (storedNames != null && storedNames.length > 0) {
    Todo_list = storedNames;
  }
  for (var i = 0; i < Todo_list.length; i++) {
    var new_Todo = document.createElement("li");
    new_Todo.id = i;
    new_Todo.append(Todo_list[i]);
    var close_btn = document.createElement("span");
    var close_ = document.createElement("img");
    close_.src = "baseline_clear_black_18dp.png";
    close_btn.appendChild(close_);
    close_btn.id = "close";
    close_btn.setAttribute("onclick", `delete_todo(${i})`);

    new_Todo.appendChild(close_btn);
    var edit_btn = document.createElement("span");

    var edit_ = document.createElement("img");
    edit_.src = "baseline_create_black_18dp.png";
    edit_btn.appendChild(edit_);
    edit_btn.id = "edit";
    edit_btn.setAttribute("onclick", `edit_todo_list(${i})`);

    new_Todo.appendChild(edit_btn);

    var up_btn = document.createElement("span");
    var up_ = document.createElement("img");
    up_.src = "baseline_keyboard_arrow_up_black_18dp.png";
    up_btn.appendChild(up_);
    up_btn.id = "up";
    up_btn.setAttribute("onclick", `up_list(${i})`);
    var down_btn = document.createElement("span");
    var down_ = document.createElement("img");
    down_.src = "baseline_keyboard_arrow_down_black_18dp.png";
    down_btn.appendChild(down_);
    down_btn.id = "down";
    down_btn.setAttribute("onclick", `down_list(${i})`);

    new_Todo.appendChild(up_btn);
    new_Todo.appendChild(down_btn);

    document.getElementById("todo_list").appendChild(new_Todo);

    add_update_btn.innerText = "Add";
    input_todo.value = "";
    document
      .getElementById("add_update_btn")
      .setAttribute("onclick", `add_update_List()`);
  }
}
function edit_todo_list(index) {
  var e = document.getElementById(`${index}`);
  var editInput = document.querySelector("input[type=text]");
  editInput.value = Todo_list[index];
  var va = document.getElementById("input_todo").value;
  add_update_btn.innerText = "Update";
  document
    .getElementById("add_update_btn")
    .setAttribute("onclick", `add_update_List(${index})`);
}

function up_list(index) {
  console.log(0 - 1);
  if (index - 1 === -1) {
      alert("No Task's present above to switch :D");
    refrestList();
    
  } else {
    var temp = Todo_list[index];
    Todo_list[index] = Todo_list[index - 1];
    Todo_list[index - 1] = temp;

    localStorage.setItem("Todo_list", JSON.stringify(Todo_list));
    refrestList();
  }
}

function down_list(index) {
  if (Todo_list[index + 1] === undefined) {
    alert("No Task's present below to switch :D");
    refrestList();

  } else {
    var temp = Todo_list[index];
    Todo_list[index] = Todo_list[index + 1];
    Todo_list[index + 1] = temp;
  }

  localStorage.setItem("Todo_list", JSON.stringify(Todo_list));
  refrestList();
}
function delete_todo(index) {
  Todo_list.splice(index, 1);

  localStorage.setItem("Todo_list", JSON.stringify(Todo_list));
  refrestList();
}
function add_update_List(add_or_update = -1) {
  if (add_or_update === -1) {
    var input_value = document.getElementById("input_todo").value;
    if (input_value === "") {
      alert("Please Dont Leave me Blank :D");
    } else {
      Todo_list.push(input_value);
    }
  } else {
    var current_value = document.getElementById("input_todo").value;
    Todo_list.splice(add_or_update, 1, current_value);
  }
  localStorage.setItem("Todo_list", JSON.stringify(Todo_list));
  refrestList();
}

var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function(ev) {

    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      ev.preventDefault();
      
    }
  },
  false
);
