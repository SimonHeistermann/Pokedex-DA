let pokemonList;
let pokemonDetails;

let offset = 0;
const limit = 20;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function init() {
    // renderStandardStructure();
    // fetchPokemonList().then(() => {
    //     displayPokemonList();
    //     renderMorePokemonButton();
    // });
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
    const selectedPokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const pokemonDescription = await fetchPokemonDescription(pokemonID);

    renderOverlayStructure();
    openOverlay(selectedPokemonDetails, pokemonDescription);
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

function renderMorePokemonButton(container) {
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

async function displayFullPokemonList() {
    const contentRef = document.getElementById('pokedex_section');
    for (const pokemon of pokemonList) {
        pokemonDetails = await fetchPokemonDetails(pokemon.url);
        renderPokemonList(contentRef, pokemonDetails);
    }
}





