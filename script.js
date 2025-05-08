const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemonList = [];
let currentDetails = 'about';
let currentPage = 'home';

const limit = 20;
let offset = 0;
let pokemonDetails;
let pokemonDetailsCache = {};

const natures = [
    "Hardy", "Lonely", "Brave", "Adamant", "Naughty", 
    "Bold", "Docile", "Relaxed", "Impish", "Lax", 
    "Timid", "Hasty", "Serious", "Jolly", "Naive", 
    "Modest", "Mild", "Quiet", "Bashful", "Rash", 
    "Calm", "Gentle", "Sassy", "Careful", "Quirky", 
    "Mild", "Hasty"
];

let onTouchStart, onTouchEnd;


/**
 * Initializes the app by rendering the basic structure, loading data,
 * and displaying the Pokémon list.
 */
async function init() {
    try { 
        renderStandardStructure();
        displayLoadingSpinner();
        await loadPokemonListWithCache();
        await displayPokemonList(); 
        renderMorePokemonButton();
        removeLoadingSpinner();
        fetchAllPokemon();
        loadFavoritePokemons();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

/**
 * Renders the standard HTML structure of the application.
 */
function renderStandardStructure() {
    const structureRef = document.getElementById('body');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLStandardStructure();
    } 
}

/**
 * Loads the Pokémon list from cache if available,
 * otherwise fetches it from the API and caches it.
 */
async function loadPokemonListWithCache() {
    const cachedList = localStorage.getItem('pokemonList');
    if (cachedList) {
        pokemonList = JSON.parse(cachedList);
    } else {
        await fetchPokemonList();
        localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
    }
}

/**
 * Renders the "Load More Pokémon" button in the designated section.
 */
function renderMorePokemonButton() {
    let contentRef = document.getElementById('morepokemonbutton_section');
    if(contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLMorePokemonButton();
    }
}

/**
 * Displays the Pokémon list starting from the offset by rendering
 * each Pokémon card with fetched details.
 */
async function displayPokemonList(variable) {
    const contentRef = document.getElementById('pokedex_section');
    for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++) {
        if (indexPokemon >= offset | variable) {
            pokemonDetails = await fetchPokemonDetails(pokemonList[indexPokemon].url);
            renderPokemonList(contentRef, pokemonDetails);
        }
    }
}

/**
 * Fetches the Pokémon list from the API using offset and limit,
 * and appends the results to the existing list.
 */
async function fetchPokemonList() {
    try {
        const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        if (!pokemonList) pokemonList = [];
        pokemonList.push(...data.results);
    } catch (error) {
        console.error("Failed to load Pokémon list!", error);
    }
}

/**
 * Fetches details for a specific Pokémon using its API URL.
 * Results are cached to avoid duplicate requests.
 * 
 * @param {string} url - The API URL of the Pokémon.
 * @returns {Promise<Object>} - The Pokémon details.
 */
async function fetchPokemonDetails(url) {
    if (pokemonDetailsCache[url]) return pokemonDetailsCache[url]; 
    try {
        const response = await fetch(url);
        const details = await response.json();
        pokemonDetailsCache[url] = details;
        return details;
    } catch (error) {
        console.error("Failed to load Pokémon details!", error);
    }
}

/**
 * Fetches a localized description for a Pokémon by its ID.
 * Uses localStorage for caching.
 * 
 * @param {number} pokemonID - The ID of the Pokémon.
 * @returns {Promise<string>} - The localized description.
 */
async function fetchPokemonDescription(pokemonID) {
    const cache = JSON.parse(localStorage.getItem('pokemonDescriptions')) || {};
    if (cache[pokemonID]) return cache[pokemonID];
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
        const data = await response.json();
        const entry = data.flavor_text_entries.find(e => e.language.name === "de") || data.flavor_text_entries.find(e => e.language.name === "en");
        const description = entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "No description available.";
        cache[pokemonID] = description; 
        localStorage.setItem('pokemonDescriptions', JSON.stringify(cache));
        return description;
    } catch (error) {
        console.error("Error retrieving description", error);
        return "Error loading description.";
    }
}

/**
 * Renders a single Pokémon card inside the given container element.
 * 
 * @param {HTMLElement} container - The HTML container element.
 * @param {Object} pokemon - The Pokémon data to render.
 */
function renderPokemonList(container, pokemon) {
    if(container) {
        container.innerHTML += renderPokemonCardHTML(pokemon);
    }
}

/**
 * Opens the details view of a specific Pokémon,
 * displaying its data and description in an overlay.
 * 
 * @param {number} pokemonID - The ID of the Pokémon.
 */
async function openPokemonDetails(pokemonID) {
    displayLoadingSpinner();
    renderOverlayStructure();
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);
    openOverlay(selectedPokemonDetails, pokemonDescription);
    removeLoadingSpinner();
    fixateScrollingOnBody();
}

/**
 * Retrieves detailed information for a Pokémon using its ID.
 * 
 * @param {number} pokemonID - The ID of the Pokémon.
 * @returns {Promise<Object>} - The Pokémon details.
 */
async function getPokemonDetails(pokemonID) {
    const selectedPokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    return selectedPokemonDetails;
}

/**
 * Opens the overlay to show detailed Pokémon information.
 * 
 * @param {Object} selectedPokemonDetails - The details of the selected Pokémon.
 * @param {string} pokemonDescription - The localized description of the Pokémon.
 */
function openOverlay(selectedPokemonDetails, pokemonDescription) {
    toggleDnoneFromOverlay();
    currentDetails = "about";
    renderDetailedStructure(selectedPokemonDetails);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
    swipeFunction(selectedPokemonDetails);
    fixateScrollingOnBody();
}

/**
 * Closes the Pokémon detail overlay and resets scrolling.
 */
function closeOverlay() {
    toggleDnoneFromOverlay();
    releaseScrollOnBody();
    removeSwipeFunction();
    if(currentPage === 'favorites') openFavoritePokemons();
}

/**
 * Renders the structure of the overlay used for Pokémon details.
 */
function renderOverlayStructure() {
    const structureRef = document.getElementById('overlay');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLOverlayStructure();
    } 
}

/**
 * Renders the structure for detailed Pokémon information.
 * 
 * @param {Object} pokemon - The Pokémon data.
 */
function renderDetailedStructure(pokemon) {
    const structureRef = document.getElementById('mpokemon_details');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLDetailedStructure(pokemon);
    } 
}

/**
 * Renders the "About" section with Pokémon data and description.
 * 
 * @param {Object} pokemon - The Pokémon data.
 * @param {string} pokemonDescription - The localized description of the Pokémon.
 */
function renderDetailedAbout(pokemon, pokemonDescription) {
    const contentRef = document.getElementById('detailed_information');
    if (contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLDetailedAbout(pokemon, pokemonDescription);
    } 
}

/**
 * Loads and displays more Pokémon by increasing the offset.
 */
async function displayMorePokemon() {
    toggleMorePokemonButton(null);
    displayLoadingSpinner();
    offset += limit;
    await fetchPokemonList();
    await displayPokemonList();
    removeLoadingSpinner();
    toggleMorePokemonButton(displayMorePokemon);
}

/**
 * Opens the stats view of a Pokémon and renders it.
 * 
 * @param {number} pokemonID - The ID of the Pokémon.
 * @param {HTMLElement} navButtonRef - Reference to the navigation button element.
 */
async function openDetailedStats(pokemonID, navButtonRef) {
    displayLoadingSpinner();
    currentDetails = 'stats';
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const natureName = getRandomNatureName();
    changeNavButtonStyling(navButtonRef);
    renderDetailedStats(selectedPokemonDetails);
    await loadDynamicNatureDescription(selectedPokemonDetails, natureName);
    removeLoadingSpinner();
    fixateScrollingOnBody();
}

/**
 * Renders the detailed stats section for a Pokémon.
 * 
 * @param {Object} pokemon - The Pokémon data.
 */
async function renderDetailedStats(pokemon) {
    const contentRef = document.getElementById('detailed_information');
    if (contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLDetailedStats(pokemon);
    }
}

/**
 * Opens the "About" section of a Pokémon and renders it.
 * 
 * @param {number} pokemonID - The ID of the Pokémon.
 * @param {HTMLElement} navButtonRef - Reference to the navigation button element.
 */
async function openDetailedAbout(pokemonID, navButtonRef) {
    displayLoadingSpinner();
    currentDetails = 'about';
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);
    changeNavButtonStyling(navButtonRef);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
    removeLoadingSpinner();
    fixateScrollingOnBody();
}

/**
 * Fetches nature details by name from the PokeAPI.
 * 
 * @param {string} natureName - The name of the nature.
 * @returns {Promise<Object|null>} - The nature details or null if failed.
 */
async function fetchNature(natureName) {
    const lowerCaseNatureName = toLowerCaseHelper(natureName);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/nature/${lowerCaseNatureName}`);
        if (!response.ok) {
            throw new Error("Nature not found");
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching details for nature: ${natureName}`, error);
        return null;
    }
}

/**
 * Loads and renders a dynamic description based on the Pokémon's nature.
 * 
 * @param {Object} pokemon - The Pokémon data.
 * @param {string} natureName - The name of the selected nature.
 */
async function loadDynamicNatureDescription(pokemon, natureName) {
    const contentRef = document.getElementById('nature_description');
    if (natureName) {
        const natureDetails = await fetchNature(natureName);
        if (natureDetails) {
            const increasedStat = natureDetails.increased_stat?.name || "keinen";
            const decreasedStat = natureDetails.decreased_stat?.name || "keinen";
            const description = `Basierend auf den Werten dieses Pokémon, halten wir die beste Natur für ${capitalizeFirstLetter(pokemon.name)} für <b class="naturetext__bold">${natureName}</b>. Diese wird seinen <b class="naturetext__bold">${increasedStat}</b> Wert erhöhen und seinen <b class="naturetext__bold">${decreasedStat}</b> Wert verringern.`;
            contentRef.innerHTML = description;
        } else contentRef.innerHTML = "Naturdetails konnten nicht geladen werden.";
    } else contentRef.innerHTML = "Natur konnte nicht bestimmt werden.";
}

/**
 * Opens the next Pokémon in the list, loading more if needed.
 * 
 * @param {number} pokemonID - The current Pokémon ID.
 */
async function openNextPokemon(pokemonID) {
    let newPokemonID;
    if(pokemonID === 1025) newPokemonID = 1;
    else newPokemonID = pokemonID + 1;
    if(newPokemonID <= (offset + limit)) await getAndRenderPrevOrNextPokemon(newPokemonID);
    else {
        await displayMorePokemon();
        await getAndRenderPrevOrNextPokemon(newPokemonID);
    }
}

/**
 * Opens the previous Pokémon in the list.
 * 
 * @param {number} pokemonID - The current Pokémon ID.
 */
async function openPrevPokemon(pokemonID) {
    let newPokemonID;
    if(pokemonID === 1) newPokemonID = 1;
    else newPokemonID = pokemonID - 1;
    await getAndRenderPrevOrNextPokemon(newPokemonID);
}

/**
 * Fetches and renders the next or previous Pokémon in detail view.
 * 
 * @param {number} newPokemonID - The Pokémon ID to load.
 */
async function getAndRenderPrevOrNextPokemon(newPokemonID) {
    displayLoadingSpinner();
    const selectedPokemonDetails = await getPokemonDetails(newPokemonID);
    const pokemonDescription = await fetchPokemonDescription(newPokemonID);
    currentDetails = 'about';
    renderDetailedStructure(selectedPokemonDetails);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
    removeSwipeFunction();
    swipeFunction(selectedPokemonDetails);
    removeLoadingSpinner();
    fixateScrollingOnBody();
}























