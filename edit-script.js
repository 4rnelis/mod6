document.addEventListener('DOMContentLoaded', (event) => {
    const backButton = document.getElementById('back-to-gallery-button');
    const saveButton = document.getElementById('save-button');
    const addRowButton = document.getElementById('add-row-button');
    const ingredientTable = document.getElementById('ingredient-table');

    backButton.addEventListener('click', () => {
        window.location.href = 'gallery.html';
    });

    saveButton.addEventListener('click', () => {
        const ingredients = Array.from(document.querySelectorAll('#ingredient-table tbody td:first-child')).map(td => td.textContent.trim());

        localStorage.setItem('editedIngredients', JSON.stringify(ingredients));

        console.log('editedIngredients:', ingredients);

        window.location.href = 'recipePage.html';
    });

    addRowButton.addEventListener('click', () => {
        addRow();
    });

    ingredientTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-row')) {
            removeRow(event.target.closest('tr'));
        }
    });

    function addRow() {
    const newRow = ingredientTable.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2); // Added for unit select box
    const cell4 = newRow.insertCell(3); // Added for "Remove" button

    cell1.contentEditable = true;
    cell2.innerHTML = '<input type="number" min="0">';

    // Create and append the unit select box
    const unitSelect = document.createElement('select');
    unitSelect.innerHTML = `
        <option value="grams">Grams</option>
        <option value="pieces">Pieces</option>
        <option value="milliliters">Milliliters</option>
    `;
    cell3.appendChild(unitSelect);

    cell4.innerHTML = '<button class="remove-row">Remove</button>';
}


    function removeRow(row) {
        ingredientTable.deleteRow(row.rowIndex);
    }
});