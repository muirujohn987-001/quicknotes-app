// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

// 2. Load saved notes from localStorage
function loadNotes() {
    try {
        const savedNotes = localStorage.getItem("quickNotes");

        if (savedNotes === null) {
            return [];
        }

        const parsedNotes = JSON.parse(savedNotes);

        return Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch (error) {
        console.error("Could not load saved notes:", error);
        return [];
    }
}

// Our notes array starts with previously saved notes
let notes = loadNotes();

// 3. Save the current notes array to localStorage
function saveNotes() {
    try {
        localStorage.setItem("quickNotes", JSON.stringify(notes));
    } catch (error) {
        errorMessage.textContent =
            "Unable to save notes. Check your browser storage.";
        console.error("Could not save notes:", error);
    }
}

// 4. Update the note count
function updateNoteCount() {
    const total = notes.length;

    if (total === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (total === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${total} notes.`;
    }
}

// 5. Render notes and filter search results
function render() {
    notesList.replaceChildren();

    const query = searchInput.value.trim().toLowerCase();

    const visibleNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(query);
    });

    // Show a message if the search has no matches
    if (visibleNotes.length === 0 && query !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
    }

    // Create a card for every visible note
    visibleNotes.forEach(function (note) {
        const listItem = document.createElement("li");

        listItem.classList.add(`category-${note.category}`);

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        const dateLabel = document.createElement("small");
        dateLabel.classList.add("note-date");
        dateLabel.textContent = `Created: ${note.createdAt}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        // Delete this note when its button is clicked
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            saveNotes();
            render();
        });

        listItem.append(
            noteText,
            categoryLabel,
            dateLabel,
            deleteButton
        );

        notesList.appendChild(listItem);
    });

    // Count all notes, not just search results
    updateNoteCount();
}

// 6. Handle form submission
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();

    // Reject empty notes
    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Reject notes longer than 200 characters
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Create a new note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    // Add the note to the array
    notes.push(newNote);

    // Save the updated array
    saveNotes();

    // Clear the form and update the page
    noteInput.value = "";
    errorMessage.textContent = "";

    render();
});

// 7. Listen for search input
searchInput.addEventListener("input", function () {
    render();
});

// 8. Display saved notes when the page opens
render();