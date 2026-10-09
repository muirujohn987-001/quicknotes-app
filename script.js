// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

// 2. Create an array to store notes
let notes = [];


// 3. Render notes on the page
function render() {
    // Clear the existing list before rebuilding it
    notesList.replaceChildren();

    // Create an HTML element for every note
    notes.forEach(function (note) {
        const listItem = document.createElement("li");

        // Add the category class for styling
        listItem.classList.add(`category-${note.category}`);

        // Display the note text safely
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Display the category
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Display the creation date and time
        const dateLabel = document.createElement("small");
        dateLabel.classList.add("note-date");
        dateLabel.textContent = `Created: ${note.createdAt}`;

        // Create a Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        // Assemble the note card
        listItem.append(
            noteText,
            categoryLabel,
            dateLabel,
            deleteButton
        );

        // Add the card to the notes list
        notesList.appendChild(listItem);
    });
}


// 4. Handle form submission
noteForm.addEventListener("submit", function (event) {
    // Prevent the browser from refreshing the page
    event.preventDefault();

    // Get the text entered by the user
    const text = noteInput.value.trim();

    // Create a new note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    // Add the note to the array
    notes.push(newNote);

    // Update the page
    render();

    // Clear the input
    noteInput.value = "";

    // Remove any previous error message
    errorMessage.textContent = "";
});


// 5. Display the initial state
render();