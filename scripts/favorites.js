let favoritePokemons = [];


async function toggleToFavorites(pokemonID) {
    const pokemon = favoritePokemons.find(item => item.id === pokemonID);
    if (pokemon) await removeFromFavorites(pokemonID, pokemon);
    else await addToFavorites(pokemonID);
}

async function addToFavorites(pokemonID) {
    const pokemon = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    if (!favoritePokemons.some(item => item.id === pokemon.id)) {
        favoritePokemons.push(pokemon);
        favoritePokemons.sort((a, b) => a.id - b.id);
        localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons)); 
        await updateFavoriteButton(pokemon);
    }
}

async function removeFromFavorites(pokemonID, pokemon) {
    favoritePokemons = favoritePokemons.filter(pokemon => pokemon.id !== pokemonID);
    favoritePokemons.sort((a, b) => a.id - b.id);
    localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));  
    await updateFavoriteButton(pokemon);
}

async function updateFavoriteButton(pokemon) {
    displayLoadingSpinner();
    renderDetailedStructure(pokemon);
    const pokemonDescription = await fetchPokemonDescription(pokemon.id);
    renderDetailedAbout(pokemon, pokemonDescription);
    removeLoadingSpinner();
}

function openFavoritePokemons() {
    renderFavoritesStructure();
    displayLoadingSpinner();
    loadFavoritePokemons();
    displayFavoritePokemons();
    currentPage = 'favorites';
    removeLoadingSpinner();
}

function renderFavoritesStructure() {
    const structureRef = document.getElementById('body');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLFavoritesStructure();
    } 
}

function loadFavoritePokemons() {
    const cachedList = localStorage.getItem('favoritePokemons');
    if (cachedList) {
        favoritePokemons = JSON.parse(cachedList);
        favoritePokemons.sort((a, b) => a.id - b.id);
    } else favoritePokemons = [];
}

async function displayFavoritePokemons() {
    const contentRef = document.getElementById('favorite_section');
    contentRef.innerHTML = "";
    for (let pokemon of favoritePokemons) {
        renderFavoritePokemons(contentRef, pokemon);
    }
}

function renderFavoritePokemons(container, pokemon) {
    container.innerHTML += renderPokemonCardHTML(pokemon);
}


