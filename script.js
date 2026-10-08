const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");

let notes = [];

function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    const card = document.createElement("li");
    card.classList.add(`category-${note.category.toLowerCase()}`);

    const content = document.createElement("div");
    content.className = "note-content";

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const details = document.createElement("div");
    details.className = "note-meta";

    const category = document.createElement("span");
    category.className = `note-category category-${note.category.toLowerCase()}`;
    category.textContent = note.category;

    const createdAt = document.createElement("time");
    createdAt.className = "note-date";
    createdAt.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-note";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((savedNote) => savedNote.id !== note.id);
      render();
    });

    details.append(category, createdAt);
    content.append(text, details);
    card.append(content, deleteButton);
    notesList.appendChild(card);
  });

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = "Please type a note first.";
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }

  notes.unshift({
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  });

  noteInput.value = "";
  errorMessage.textContent = "";
  render();
});

render();
