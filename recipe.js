
let selectedList = [];
let minCals = Number.MIN_VALUE;
let maxCals = Number.MAX_VALUE;

function select_option(id) {
    const selectOptionElements = document.querySelectorAll('.' + id);
    const searchForm = document.getElementById('searchForm');

    selectOptionElements.forEach(function (selectOption) {
        selectOption.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedOptions = document.querySelectorAll('.selected');
        selectedList = Array.from(selectedOptions).map(option => option.dataset.value);
        minCals = document.getElementById('minValue').value;
        maxCals = document.getElementById('maxValue').value;
        minCals = minCals.trim() === '' || isNaN(minCals) ? 0 : parseFloat(minCals);
        maxCals = maxCals.trim() === '' || isNaN(maxCals) ? Number.MAX_VALUE : parseFloat(maxCals);
    });
}

select_option("select-option");



function expandList() {
    const container = document.querySelector('.container');
    const triangleButton = document.querySelector('.triangleButton');

    container.classList.toggle('expanded');
    triangleButton.classList.toggle('expanded');

    const newDiv = document.querySelector('.newDiv');


    if (container.classList.contains('expanded')) {
        if (!newDiv) {
            const newDiv = document.createElement('div');
            newDiv.className = 'newDiv';
            newDiv.textContent = 'New Content';

            newDiv.innerHTML = `
            <div class="filters">
                <div class="filter-container">
                    <div class="select-container">
                        <h2>Extra filters</h2>
                        <div class="select-option1" data-value="Low-Sugar">Low-Sugar</div>
                        <div class="select-option1" data-value="Lupine-Free">Lupine-Free</div>
                        <div class="select-option1" data-value="Mediterranean">Mediterranean</div>
                        <div class="select-option1" data-value="Mollusk-Free">Mollusk-Free</div>
                        <div class="select-option1" data-value="Mustard-Free">Mustard-Free</div>
                        <div class="select-option1" data-value="No-Oil-Added">No-Oil-Added</div>
                        <div class="select-option1" data-value="Paleo">Paleo</div>
                        <div class="select-option1" data-value="Peanut-Free">Peanut-Free</div>
                        <div class="select-option1" data-value="Pescatarian">Pescatarian</div>
                        <div class="select-option1" data-value="Pork-Free">Pork-Free</div>
                        <div class="select-option1" data-value="Red-Meat-Free">Red-Meat-Free</div>
                        <div class="select-option1" data-value="Sesame-Free">Sesame-Free</div>
                        <div class="select-option1" data-value="Shellfish-Free">Shellfish-Free</div>
                        <div class="select-option1" data-value="Soy-Free">Soy-Free</div>
                        <div class="select-option1" data-value="Sugar-Conscious">Sugar-Conscious</div>
                        <div class="select-option1" data-value="Sulfite-Free">Sulfite-Free</div>
                        <div class="select-option1" data-value="Tree-Nut-Free">Tree-Nut-Free</div>
                        <div class="select-option1" data-value="Vegan">Vegan</div>
                        <div class="select-option1" data-value="Vegetarian">Vegetarian</div>
                        <div class="select-option1" data-value="Wheat-Free">Wheat-Free</div>
                        </div>
                </div>
                <h2 id="cals">Calories (kcal)</h2>
                <div class="calorie-container">
                    <input type="number" id="minValue" name="min" placeholder="min" step="1" required>

                    <input type="number" id="maxValue" name="max" placeholder="max" step="1" required>
                </div>
            </div>
            `

            // Find the second existing div
            const secondSelectOption = container.children[1];

            // Insert the new div after the second existing div
            container.insertBefore(newDiv, secondSelectOption.nextSibling);
            select_option("select-option1");

        }
        newDiv.style.display = 'block';
    } else {
        newDiv.style.display = 'none';
    }

}

document.addEventListener('DOMContentLoaded', (event) => {
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('#search');
    const resultsList = document.querySelector('#results');
    const editedIngredients = JSON.parse(localStorage.getItem('editedIngredients')) || [];
    searchInput.value = editedIngredients.join(', ');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchRecipes();
    });

    async function searchRecipes() {
        const input = searchInput.value.trim();
        const response = await fetch(`https://api.edamam.com/search?q=${input}&app_id=4bd3f107&app_key=dacb92dab378b016829d59eeeaf827d3&from=0&to=50`);
        const data = await response.json();
        const results = data.hits.filter(recipe => {
            const healthLabelsMatch = selectedList.every(label => recipe.recipe.healthLabels.includes(label))
            const caloriesMatch = recipe.recipe.calories >= minCals && recipe.recipe.calories <= maxCals;

            return healthLabelsMatch && caloriesMatch;
        });
        console.log(results);
        displayRecipes(results);
    }

    function displayRecipes(recipes) {
        if (recipes.length === 0) {
            resultsList.innerHTML = `<div class="not-found">No results found!</div>`;
        } else {
                resultsList.innerHTML = recipes.map(({recipe}) => `
                <div>
                    <img src="${recipe.image}" alt="${recipe.label}">
                    <h3>${recipe.label}</h3>
                    <p>Allergies: ${recipe.cautions.join(', ')}</p>
                    <p>Calories: ${recipe.calories.toFixed(2)}</p>
                    <ul>
                        ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                    <a href="${recipe.url}" target="_blank" class="recipe-link">View Recipe</a>
                </div>
            `).join('');
        }
    }
});


