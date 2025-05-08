/**
 * Stores all fetched Pokémon (name & URL only).
 * @type {Array<Object>}
 */
let allPokemon = [];

/**
 * Stores Pokémon filtered by the search input.
 * @type {Array<Object>}
 */
let filteredPokemonList = [];

/**
 * Maximum number of Pokémon displayed in the search result.
 * @type {number}
 */
const searchLimit = 10;

/**
 * Fetches the complete list of Pokémon from the API or retrieves it from local storage.
 * Saves the result to the `allPokemon` array.
 */
async function fetchAllPokemon() {
    const cachedAllPokemon = localStorage.getItem('allPokemon');
    if (cachedAllPokemon) {
        allPokemon = JSON.parse(cachedAllPokemon);
    } else {
        try {
            const response = await fetch(`${BASE_URL}?offset=0&limit=1025`);
            const data = await response.json();
            allPokemon = data.results;
            localStorage.setItem('allPokemon', JSON.stringify(allPokemon));
        } catch (error) {
            console.error('Failed to fetch all Pokémon:', error);
        }
    }
}

/**
 * Filters Pokémon based on the search input and displays the results.
 *
 * @param {Event} event - The search form submission event.
 */
async function filterPokemon(event) {
    displayLoadingSpinner();
    event.preventDefault();
    const input = document.getElementById('search_input').value.toLowerCase();
    if (input.length >= 3) {
        filteredPokemonList = allPokemon
            .filter(pokemon => pokemon.name.includes(input))
            .slice(0, searchLimit);
        await displayFilteredPokemonList();
        currentPage = 'search';
    }
    await ifEmptySearch(input);
    removeLoadingSpinner();
}

/**
 * Renders the filtered Pokémon list by fetching full details for each.
 */
async function displayFilteredPokemonList() {
    const contentRef = document.getElementById('pokedex_section');
    contentRef.innerHTML = "";
    for (let pokemon of filteredPokemonList) {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);
        renderFilteredPokemonList(contentRef, pokemonDetails);
    }
}

/**
 * Appends a single Pokémon card to the container during search rendering.
 *
 * @param {HTMLElement} container - The DOM element to render Pokémon into.
 * @param {Object} pokemon - The full Pokémon object with detailed data.
 */
function renderFilteredPokemonList(container, pokemon) {
    const morePokemonButtonRef = document.getElementById('morepokemonbutton_section');
    morePokemonButtonRef.innerHTML = "";
    container.innerHTML += renderPokemonCardHTML(pokemon);
}

/**
 * Handles the case where the search input is empty.
 * Resets the view to show the default home Pokémon list.
 *
 * @param {string} input - The current value of the search input field.
 */
async function ifEmptySearch(input) {
    if (input === "") {
        currentPage = 'home';
        const contentRef = document.getElementById('pokedex_section');
        contentRef.innerHTML = "";
        await displayPokemonListAfterSearch();
        renderMorePokemonButton();
        filteredPokemonList.length = 0;
        return;
    }
}

/**
 * Re-displays the Pokémon list after search input is cleared.
 * Uses the global `pokemonList` variable to render all Pokémon again.
 */
async function displayPokemonListAfterSearch() {
    const contentRef = document.getElementById('pokedex_section');
    contentRef.innerHTML = "";
    for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++) {
        const pokemonDetails = await fetchPokemonDetails(pokemonList[indexPokemon].url);
        renderPokemonList(contentRef, pokemonDetails);
    }
}

