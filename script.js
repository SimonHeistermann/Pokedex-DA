const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemonList = [];
let currentDetails = 'about';

const limit = 20;
let offset = 0;
let pokemonDetails;
let pokemonDetailsCache = {};

let onTouchStart, onTouchEnd;


async function init() {
    try { 
        renderStandardStructure();
        displayLoadingSpinner();
        await loadPokemonListWithCache();
        await displayPokemonList(); 
        renderMorePokemonButton();
        removeLoadingSpinner();
        fetchAllPokemon();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

function renderStandardStructure() {
    const structureRef = document.getElementById('body');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLStandardStructure();
    } 
}

async function loadPokemonListWithCache() {
    const cachedList = localStorage.getItem('pokemonList');
    if (cachedList) {
        console.log('Loaded Pokémon list from cache.');
        pokemonList = JSON.parse(cachedList);
    } else {
        await fetchPokemonList();
        localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
    }
}

function renderMorePokemonButton() {
    let contentRef = document.getElementById('morepokemonbutton_section');
    if(contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLMorePokemonButton();
    }
}

async function displayPokemonList() {
    const contentRef = document.getElementById('pokedex_section');
    for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++) {
        if (indexPokemon >= offset) {
            pokemonDetails = await fetchPokemonDetails(pokemonList[indexPokemon].url);
            renderPokemonList(contentRef, pokemonDetails);
        }
    }
}

async function fetchPokemonList() {
    try {
        const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        if (!pokemonList) pokemonList = [];
        pokemonList.push(...data.results);
    } catch (error) {
        console.error("Pokemonliste konnte nicht geladen werden!", error);
    }
}

async function fetchPokemonDetails(url) {
    if (pokemonDetailsCache[url]) return pokemonDetailsCache[url]; 
    try {
        const response = await fetch(url);
        const details = await response.json();
        pokemonDetailsCache[url] = details;
        return details;
    } catch (error) {
        console.error("Pokemondetails konnten nicht geladen werden!", error);
    }
}

async function fetchPokemonDescription(pokemonID) {
    const cache = JSON.parse(localStorage.getItem('pokemonDescriptions')) || {};
    if (cache[pokemonID]) return cache[pokemonID];
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
        const data = await response.json();
        const entry = data.flavor_text_entries.find(e => e.language.name === "de") || data.flavor_text_entries.find(e => e.language.name === "en");
        const description = entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "Keine Beschreibung verfügbar.";
        cache[pokemonID] = description; 
        localStorage.setItem('pokemonDescriptions', JSON.stringify(cache));
        return description;
    } catch (error) {
        console.error("Fehler beim Abrufen der Beschreibung", error);
        return "Fehler beim Laden der Beschreibung.";
    }
}

function renderPokemonList(container, pokemon) {
    if(container) {
        container.innerHTML += renderPokemonCardHTML(pokemon);
    }
}

async function openPokemonDetails(pokemonID) {
    displayLoadingSpinner();
    renderOverlayStructure();
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);
    openOverlay(selectedPokemonDetails, pokemonDescription);
    removeLoadingSpinner();
}

async function getPokemonDetails(pokemonID) {
    const selectedPokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    return selectedPokemonDetails;
}   

function openOverlay(selectedPokemonDetails, pokemonDescription) {
    toggleDnoneFromOverlay();
    currentDetails = "about";
    renderDetailedStructure(selectedPokemonDetails);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
    fixateScrollingOnBody();
    swipeFunction(selectedPokemonDetails);
}

function closeOverlay() {
    toggleDnoneFromOverlay();
    releaseScrollOnBody();
    removeSwipeFunction();
}

function renderOverlayStructure() {
    const structureRef = document.getElementById('overlay');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLOverlayStructure();
    } 
}

function renderDetailedStructure(pokemon) {
    const structureRef = document.getElementById('mpokemon_details');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLDetailedStructure(pokemon);
    } 
}

function renderDetailedAbout(pokemon, pokemonDescription) {
    const contentRef = document.getElementById('detailed_information');
    if (contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLDetailedAbout(pokemon, pokemonDescription);
    } 
}

async function displayMorePokemon() {
    displayLoadingSpinner();
    offset += limit;
    await fetchPokemonList();
    await displayPokemonList();
    removeLoadingSpinner();

}

async function openDetailedStats(pokemonID, navButtonRef) {
    displayLoadingSpinner();
    currentDetails = 'stats';
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const natureName = getRandomNatureName();
    changeNavButtonStyling(navButtonRef);
    renderDetailedStats(selectedPokemonDetails);
    await loadDynamicNatureDescription(selectedPokemonDetails, natureName);
    removeLoadingSpinner();
}

async function renderDetailedStats(pokemon) {
    const contentRef = document.getElementById('detailed_information');
    if (contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLDetailedStats(pokemon);
    }
}

async function openDetailedAbout(pokemonID, navButtonRef) {
    displayLoadingSpinner();
    currentDetails = 'about';
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);
    changeNavButtonStyling(navButtonRef);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
    removeLoadingSpinner();
}

function getRandomNatureName() {
    const natures = [
        "Hardy", "Lonely", "Brave", "Adamant", "Naughty", 
        "Bold", "Docile", "Relaxed", "Impish", "Lax", 
        "Timid", "Hasty", "Serious", "Jolly", "Naive", 
        "Modest", "Mild", "Quiet", "Bashful", "Rash", 
        "Calm", "Gentle", "Sassy", "Careful", "Quirky", 
        "Mild", "Hasty"
    ];
    return natures[Math.floor(Math.random() * natures.length)];
}

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

async function loadDynamicNatureDescription(pokemon, natureName) {
    const contentRef = document.getElementById('nature_description');
    if (natureName) {
        const natureDetails = await fetchNature(natureName);
        if (natureDetails) {
            const increasedStat = natureDetails.increased_stat?.name || "none";
            const decreasedStat = natureDetails.decreased_stat?.name || "none";
            const description = `Based on this Pokémon's stats, we consider the best nature for ${capitalizeFirstLetter(pokemon.name)} to have is <b class="naturetext__bold">${natureName}</b>. This will increase its <b class="naturetext__bold">${increasedStat}</b> and decrease its <b class="naturetext__bold">${decreasedStat}</b> stats.`;
            contentRef.innerHTML = description;
        } else contentRef.innerHTML = "Nature details could not be loaded.";
    } else contentRef.innerHTML = "Nature could not be determined.";
}

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

async function openPrevPokemon(pokemonID) {
    let newPokemonID;
    if(pokemonID === 1) newPokemonID = 1;
    else newPokemonID = pokemonID - 1;
    await getAndRenderPrevOrNextPokemon(newPokemonID);
}

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
}


















