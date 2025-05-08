/**
 * Tracks how many times each Pokémon type background class has been used.
 * Used for rotating background classes for visual variety.
 * @type {Object<string, number>}
 */
const typeCounters = {
    grass: 0, fire: 0, water: 0, bug: 0, normal: 0, poison: 0, fairy: 0, ground: 0,
    electric: 0, fighting: 0, psychic: 0, rock: 0,
    ice: 0, dragon: 0, dark: 0, ghost: 0, steel: 0,
};

/**
 * Maps each Pokémon type to one or more CSS background class names.
 * @type {Object<string, string[]>}
 */
const typeClassMap = {
    grass: ["bgcolor__grass1", "bgcolor__grass2", "bgcolor__grass3"],
    fire: ["bgcolor__fire1", "bgcolor__fire2", "bgcolor__fire3"],
    water: ["bgcolor__water1", "bgcolor__water2", "bgcolor__water3"],
    bug: ["bgcolor__bug1", "bgcolor__bug2", "bgcolor__bug3"],
    normal: ["bgcolor__normal1", "bgcolor__normal2", "bgcolor__normal3"],
    poison: ["bgcolor__poison1", "bgcolor__poison2", "bgcolor__poison3"],
    fairy: ["bgcolor__fairy"],
    ground: ["bgcolor__ground"],
    electric: ["bgcolor__electric"],
    fighting: ["bgcolor__fighting"],
    psychic: ["bgcolor__psychic"],
    rock: ["bgcolor__rock"],
    ice: ["bgcolor__ice"],
    dragon: ["bgcolor__dragon"],
    dark: ["bgcolor__dark"],
    ghost: ["bgcolor__ghost"],
    steel: ["bgcolor__steel"],
};

/**
 * Stores which background class has been assigned to each Pokémon ID.
 * @type {Object<string, string>}
 */
let backgroundMapping = {};

/**
 * Returns the next background class for a given Pokémon type,
 * rotating through available classes for variety.
 *
 * @param {string} type - The Pokémon type (e.g., "fire", "water").
 * @returns {string} - The next CSS background class for that type.
 */
function getBackgroundClass(type) {
    const typeClasses = typeClassMap[type] || [];
    if (typeClasses.length === 0) return "";
    const counter = typeCounters[type] || 0;
    typeCounters[type] = (counter + 1) % typeClasses.length;
    return typeClasses[counter];
}

/**
 * Assigns a background class to a Pokémon ID if not already set.
 *
 * @param {string} backgroundClass - The CSS class name to assign.
 * @param {number|string} pokemonID - The ID of the Pokémon.
 * @returns {string} - The assigned background class.
 */
function createBackgroundWithID(backgroundClass, pokemonID) {
    if (!backgroundMapping[pokemonID]) {
        backgroundMapping[pokemonID] = backgroundClass;
    }
    return backgroundClass;
}

/**
 * Retrieves the background class assigned to a specific Pokémon ID.
 *
 * @param {number|string} pokemonID - The ID of the Pokémon.
 * @returns {string|undefined} - The background class or undefined if not assigned.
 */
function getBackgroundWithID(pokemonID) {
    if (pokemonID) {
        let backgroundClass = backgroundMapping[pokemonID];
        return backgroundClass;
    }
}

