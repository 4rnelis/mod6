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
        const response = await fetch(`https://api.edamam.com/search?q=${input}&app_id=4bd3f107&app_key=dacb92dab378b016829d59eeeaf827d3&from=0&to=10`);
        const data = await response.json();
        displayRecipes(data.hits);
    }

    function displayRecipes(recipes) {
        resultsList.innerHTML = recipes.map(({ recipe }) => `
            <div>
                <img src="${recipe.image}" alt="${recipe.label}">
                <h3>${recipe.label}</h3>
                <p>Allergies: ${recipe.cautions.join(', ')}</p>
                <ul>
                    ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.url}" target="_blank">View Recipe</a>
            </div>
        `).join('');
    }
});
