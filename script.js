let pokemonList;
let pokemonDetails;
let currentDetails = 'about';

let offset = 0;
const limit = 20;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function init() {
    renderStandardStructure();
    fetchPokemonList().then(() => {
        displayPokemonList();
        renderMorePokemonButton();
    });
}

function renderStandardStructure() {
    const structureRef = document.getElementById('body');
    if (structureRef) {
        structureRef.innerHTML = "";
        structureRef.innerHTML += renderHTMLStandardStructure();
    } 
}

async function fetchPokemonList() {
    try {
        const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        if (!pokemonList) pokemonList = [];
        pokemonList.push(...data.results);
    } catch (error) {
        console.error("Pokemonliste konnte nicht gelöaden werden!", error);
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error("Pokemondetails konnten nicht geladen werden!", error)
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

function renderPokemonList(container, pokemon) {
    if(container) {
        container.innerHTML += renderPokemonCardHTML(pokemon);
    }
}

async function openPokemonDetails(pokemonID) {
    renderOverlayStructure();
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);
    openOverlay(selectedPokemonDetails, pokemonDescription);
}

async function getPokemonDetails(pokemonID) {
    const selectedPokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    return selectedPokemonDetails;
}   

async function fetchPokemonDescription(pokemonID) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
        const data = await response.json();
        const description = data.flavor_text_entries.find(entry => entry.language.name === "de").flavor_text.replace(/\n|\f/g, " ");
        return  description;
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokemon Beschreibung!")
    }
}

function openOverlay(selectedPokemonDetails, pokemonDescription) {
    toggleDnoneFromOverlay();
    renderDetailedStructure(selectedPokemonDetails);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
    fixateScrollingOnBody();
}

function closeOverlay() {
    toggleDnoneFromOverlay();
    releaseScrollOnBody();
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

function renderMorePokemonButton() {
    let contentRef = document.getElementById('morepokemonbutton_section');
    if(contentRef) {
        contentRef.innerHTML += renderHTMLMorePokemonButton();
    }
}

function displayMorePokemon() {
    offset += limit;
    fetchPokemonList().then(() => {
        displayPokemonList();
    });
}

async function openDetailedStats(pokemonID, navButtonRef) {
    currentDetails = 'stats';
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const natureName = getRandomNatureName();
    changeNavButtonStyling(navButtonRef);
    renderDetailedStats(selectedPokemonDetails);
    loadDynamicNatureDescription(selectedPokemonDetails, natureName);
}

async function renderDetailedStats(pokemon) {
    const contentRef = document.getElementById('detailed_information');
    if (contentRef) {
        contentRef.innerHTML = "";
        contentRef.innerHTML += renderHTMLDetailedStats(pokemon);
    }
}

async function openDetailedAbout(pokemonID, navButtonRef) {
    currentDetails = 'about';
    const selectedPokemonDetails = await getPokemonDetails(pokemonID);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);
    changeNavButtonStyling(navButtonRef);
    renderDetailedAbout(selectedPokemonDetails, pokemonDescription);
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












