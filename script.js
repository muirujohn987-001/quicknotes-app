// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

// 2. Store notes in an array
let notes = [];


// 3. Update the note count
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


// 4. Render notes on the page
function render() {
    // Clear the existing list
    notesList.replaceChildren();

    // Create a card for each note
    notes.forEach(function (note) {
        const listItem = document.createElement("li");

        listItem.classList.add(`category-${note.category}`);

        // Note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Category label
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Creation date
        const dateLabel = document.createElement("small");
        dateLabel.classList.add("note-date");
        dateLabel.textContent = `Created: ${note.createdAt}`;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        // Remove this particular note when clicked
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            render();
        });

        // Assemble the card
        listItem.append(
            noteText,
            categoryLabel,
            dateLabel,
            deleteButton
        );

        notesList.appendChild(listItem);
    });

    // Refresh the count after rendering
    updateNoteCount();
}


// 5. Handle form submission
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();

    // Validate empty input
    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Validate the 200-character limit
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Create a new note
    const newNote = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    // Add the note
    notes.push(newNote);

    // Clear the error and input
    errorMessage.textContent = "";
    noteInput.value = "";

    // Update the page
    render();
});


// 6. Render the initial state
render();