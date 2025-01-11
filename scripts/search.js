let allPokemon = [];
let filteredPokemonList = [];
const searchLimit = 10;   


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
        } catch (error) {console.error('Failed to fetch all Pokémon:', error);}
    }
}

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

async function displayFilteredPokemonList() {
    const contentRef = document.getElementById('pokedex_section');
    contentRef.innerHTML = "";
    for (let pokemon of filteredPokemonList) {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);
        renderFilteredPokemonList(contentRef, pokemonDetails);
    }
}

function renderFilteredPokemonList(container, pokemon) {
    const morePokemonButtonRef = document.getElementById('morepokemonbutton_section');
    morePokemonButtonRef.innerHTML = "";
    container.innerHTML += renderPokemonCardHTML(pokemon);
}

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
};

async function displayPokemonListAfterSearch() {
    const contentRef = document.getElementById('pokedex_section');
    contentRef.innerHTML = "";
    for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++) {
        pokemonDetails = await fetchPokemonDetails(pokemonList[indexPokemon].url);
        renderPokemonList(contentRef, pokemonDetails);
    }
}
