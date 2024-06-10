if (localStorage.getItem("notes")) {
  document.getElementById("container_main").innerHTML =
    localStorage.getItem("notes");
  deleteNotes();
}

function addNote() {

  var note = document.createElement("div");
  note.classList.add("flash_anim");
  note.style.position = "fixed";
  note.style.left = "50%";
  note.style.top = "50%";
  note.style.transform = "translate(-50%, -50%)";
  note.classList.add("body_note");
  note.draggable = true;
  var timedate = document.createElement("div");
  timedate.classList.add("time_and_date");
  timedate.innerHTML = new Date().toLocaleDateString();

  note.ondragend = function (event) {
    this.style.left = event.clientX - 40 + "px";
    this.style.top = event.clientY - 40 + "px";
    saveNotes();
  };



  var header = document.createElement("div");
  header.classList.add("header_note");


  var title = document.createElement("div");
  title.classList.add("header_title");
  title.contentEditable = true;
  title.oninput = saveNotes;
  title.innerHTML = "Title...";
  header.appendChild(title);

  var btn_delete = document.createElement("button");
  btn_delete.classList.add("icon_btn");
  btn_delete.innerHTML = '<i class="fas fa-trash-alt"></i>';
  btn_delete.onclick = function (e) {
    e.stopPropagation();
    note.remove();
    saveNotes();
  };

  header.appendChild(timedate);
  header.appendChild(btn_delete);
  note.appendChild(header);

  var content = document.createElement("div");
  content.classList.add("content_note");
  content.contentEditable = true;
  content.oninput = saveNotes;
  content.innerHTML = "Note content...";
  note.appendChild(content);
  document.getElementById("container_main").appendChild(note);
  saveNotes();
}
function saveNotes() {
  localStorage.setItem(
    "notes",
    document.getElementById("container_main").innerHTML
  );
  deleteNotes();
}

function clearNotes() { 
    var container = document.getElementById("container_main");
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }
    localStorage.removeItem("notes");
}

function deleteNotes() {
  var buttondelete = document.getElementsByClassName("icon_btn");
  for (var i = 0; i < buttondelete.length; i++) {
    buttondelete[i].onclick = function (e) {
      e.stopPropagation();
      if (e.target.innerHTML == '<i class="fas fa-trash-alt"></i>') {
        e.target.parentNode.parentNode.remove();
      }
      saveNotes();
    };
  }

}
document.getElementById("navbar_mid").style.display = "none";

function toggleNav() {
  var nav_top = document.getElementById("navbar_top");
  var nav_mid = document.getElementById("navbar_mid");

  if (nav_top.style.display == "none") {
    nav_top.classList.add("fade_anim");
    nav_mid.classList.add("fade_anim");
    nav_top.style.display = "block";
    nav_mid.style.display = "none";
  } else {
    nav_top.classList.add("fade_anim");
    nav_mid.classList.add("fade_anim");
    nav_top.style.display = "none";
    nav_mid.style.display = "block";
  }
  localStorage.setItem("nav_top_display", nav_top.style.display);
  localStorage.setItem("nav_mid_display", nav_mid.style.display);
}
window.onload = function() {
  var nav_top = document.getElementById("navbar_top");
  var nav_mid = document.getElementById("navbar_mid");

  if (localStorage.getItem("nav_top_display")) {
    nav_top.style.display = localStorage.getItem("nav_top_display");
  }
  if (localStorage.getItem("nav_mid_display")) {
    nav_mid.style.display = localStorage.getItem("nav_mid_display");
  }
}


