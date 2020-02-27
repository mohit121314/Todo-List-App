var input = document.getElementById("input_todo");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add_update_btn").click();
  }
});

Todo_list = [];

function refrestList() {
  var clear_ul_list = document.getElementById("todo_list");
  clear_ul_list.innerHTML = "";
  localStorage.setItem("Todo_list", JSON.stringify(Todo_list));
  var storedNames = JSON.parse(localStorage.getItem("Todo_list"));

  for (var i = 0; i < storedNames.length; i++) {
    var new_Todo = document.createElement("li");
    new_Todo.id = i;
    new_Todo.append(storedNames[i]);
    var close_btn = document.createElement("span");
    close_btn.innerText = "x";
    close_btn.id = "close";
    close_btn.setAttribute("onclick", `delete_todo(${i})`);

    new_Todo.appendChild(close_btn);
    var edit_btn = document.createElement("span");
    edit_btn.innerText = "Edit";
    edit_btn.id = "edit";
    edit_btn.setAttribute("onclick", `edit_todo_list(${i})`);

    new_Todo.appendChild(edit_btn);
    document.getElementById("todo_list").appendChild(new_Todo);
    localStorage.setItem("Todo_list", JSON.stringify(storedNames));

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

function delete_todo(index) {
  Todo_list.splice(index, 1);
  refrestList();
}
function add_update_List(add_or_update = -1) {
  if (add_or_update === -1) {
    var input_value = document.getElementById("input_todo").value;
    if (input_value === "") {
      alert("Please Insert A Todo :D");
    } else {
      Todo_list.push(input_value);

      refrestList();
    }
  } else {
    var current_value = document.getElementById("input_todo").value;
    Todo_list.splice(add_or_update, 1, current_value);
    refrestList();
  }
}

var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);
