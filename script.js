let notes = JSON.parse(localStorage.getItem("notes")) || [];

const container = document.getElementById("notesContainer");

function renderNotes() {
  container.innerHTML = "";

  notes.forEach((note, index) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${note.title}</strong><br>
      <small>${note.semester}</small>
      <br><br>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function addNote() {
  let title = document.getElementById("noteTitle").value;
  let semester = document.getElementById("noteSemester").value;

  if (title === "") return alert("Enter note title");

  notes.push({ title, semester });
  localStorage.setItem("notes", JSON.stringify(notes));

  closeModal();
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function filterNotes() {
  let search = document.getElementById("searchInput").value.toLowerCase();
  let semester = document.getElementById("semesterFilter").value;

  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let text = card.textContent.toLowerCase();
    let matchesSearch = text.includes(search);
    let matchesSemester = semester === "all" || text.includes(semester.toLowerCase());

    if (matchesSearch && matchesSemester) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function openModal() {
  document.getElementById("noteModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("noteModal").style.display = "none";
  document.getElementById("noteTitle").value = "";
}

function toggleDark() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

renderNotes();
