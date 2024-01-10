    document.addEventListener('DOMContentLoaded', (event) => {
    const backButton = document.getElementById('back-to-gallery-button');
    const saveButton = document.getElementById('save-button');
    const addRowButton = document.getElementById('add-row-button');
    const ingredientTable = document.getElementById('ingredient-table');

    // Add click event listener to the back button
    backButton.addEventListener('click', () => {
        // Navigate back to the gallery page
        window.location.href = 'gallery.html'; // Change to the actual gallery page
    });

    // Add click event listener to the save button
    saveButton.addEventListener('click', () => {
        // Get all ingredient values from the table
        const ingredients = Array.from(document.querySelectorAll('#ingredient-table tbody td:first-child')).map(td => td.textContent.trim());

        // Store the ingredients in localStorage
        localStorage.setItem('editedIngredients', JSON.stringify(ingredients));

        // Log the editedIngredients to the console for debugging
        console.log('editedIngredients:', ingredients);

        // Navigate to the recipe page
        window.location.href = 'recipePage.html'; // Change to the actual recipe page
    });

    // Add click event listener to the add row button
    addRowButton.addEventListener('click', () => {
        addRow();
    });

    // Add click event listener to dynamically added "Remove" buttons
    ingredientTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-row')) {
            removeRow(event.target.closest('tr'));
        }
    });

    function addRow() {
        const newRow = ingredientTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.contentEditable = true;
        cell2.innerHTML = '<button class="remove-row">Remove</button>';
    }

    function removeRow(row) {
        ingredientTable.deleteRow(row.rowIndex);
    }
});
