/**
 * Array for storing the favorite Pokémon.
 * @type {Array<Object>}
 */
let favoritePokemons = [];

/**
 * Adds a Pokémon to the favorites or removes it, depending on whether it is already in the list.
 *
 * @param {number} pokemonID - The ID of the Pokémon.
 * @param {Event} [event] - Optional event object to control the click behavior.
 */
async function toggleToFavorites(pokemonID, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const pokemon = favoritePokemons.find(item => item.id === pokemonID);
    if (pokemon) await removeFromFavorites(pokemonID, pokemon);
    else await addToFavorites(pokemonID);
    fixateScrollingOnBody();
}

/**
 * Adds a Pokémon to the favorites using its ID.
 *
 * @param {number} pokemonID - The ID of the Pokémon to be added.
 */
async function addToFavorites(pokemonID) {
    const pokemon = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    if (!favoritePokemons.some(item => item.id === pokemon.id)) {
        favoritePokemons.push(pokemon);
        favoritePokemons.sort((a, b) => a.id - b.id);
        localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons)); 
        await updateFavoriteButton(pokemon);
    }
}

/**
 * Removes a Pokémon from the favorites.
 *
 * @param {number} pokemonID - The ID of the Pokémon to be removed.
 * @param {Object} pokemon - The Pokémon object.
 */
async function removeFromFavorites(pokemonID, pokemon) {
    favoritePokemons = favoritePokemons.filter(p => p.id !== pokemonID);
    favoritePokemons.sort((a, b) => a.id - b.id);
    localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));  
    await updateFavoriteButton(pokemon);
}

/**
 * Updates the favorite button and re-renders the current Pokémon detail view.
 *
 * @param {Object} pokemon - The Pokémon whose display should be updated.
 */
async function updateFavoriteButton(pokemon) {
    displayLoadingSpinner();
    renderDetailedStructure(pokemon);
    const pokemonDescription = await fetchPokemonDescription(pokemon.id);
    renderDetailedAbout(pokemon, pokemonDescription);
    removeLoadingSpinner();
}

/**
 * Opens the favorite Pokémon view and displays all stored favorite Pokémon.
 */
function openFavoritePokemons() {
    renderFavoritesStructure();
    displayLoadingSpinner();
    loadFavoritePokemons();
    displayFavoritePokemons();
    currentPage = 'favorites';
    removeLoadingSpinner();
}

/**
 * Renders the basic HTML structure for the favorites view.
 */
function renderFavoritesStructure() {
    const structureRef = document.getElementById('body');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLFavoritesStructure();
    } 
}

/**
 * Loads saved favorite Pokémon from local storage.
 */
function loadFavoritePokemons() {
    const cachedList = localStorage.getItem('favoritePokemons');
    if (cachedList) {
        favoritePokemons = JSON.parse(cachedList);
        favoritePokemons.sort((a, b) => a.id - b.id);
    } else favoritePokemons = [];
}

/**
 * Displays all loaded favorite Pokémon in the favorites view.
 */
async function displayFavoritePokemons() {
    const contentRef = document.getElementById('favorite_section');
    contentRef.innerHTML = "";
    for (let pokemon of favoritePokemons) {
        renderFavoritePokemons(contentRef, pokemon);
    }
}

/**
 * Renders a single Pokémon into the provided container reference.
 *
 * @param {HTMLElement} container - The HTML container into which the Pokémon should be inserted.
 * @param {Object} pokemon - The Pokémon object.
 */
function renderFavoritePokemons(container, pokemon) {
    container.innerHTML += renderPokemonCardHTML(pokemon);
}



