const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-button");
const storageKey = "quicknotes-notes";

function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(savedNotes)) {
      return [];
    }

    return savedNotes.filter((note) =>
      note &&
      typeof note.id === "string" &&
      typeof note.text === "string" &&
      typeof note.category === "string" &&
      typeof note.createdAt === "string"
    );
  } catch {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(storageKey, JSON.stringify(notes));
}

let notes = loadNotes();

function render() {
  notesList.replaceChildren();
  const searchWords = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visibleNotes = notes.filter((note) => {
    const noteText = note.text.toLowerCase();
    return searchWords.every((word) => noteText.includes(word));
  });

  visibleNotes.forEach((note) => {
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
      saveNotes();
      render();
    });

    details.append(category, createdAt);
    content.append(text, details);
    card.append(content, deleteButton);
    notesList.appendChild(card);
  });

  if (searchWords.length > 0 && visibleNotes.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-search-message";
    emptyMessage.setAttribute("role", "status");
    emptyMessage.textContent = "No notes match your search.";
    notesList.appendChild(emptyMessage);
  }

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

  saveNotes();
  noteInput.value = "";
  errorMessage.textContent = "";
  render();
});

searchInput.addEventListener("input", render);

clearAllButton.addEventListener("click", () => {
  if (!confirm("Delete all notes?")) {
    return;
  }

  notes = [];
  saveNotes();
  render();
});

render();
