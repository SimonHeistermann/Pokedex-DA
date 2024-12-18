const typeCounters = {
    grass: 0,fire: 0, water: 0, bug: 0, normal: 0, poison: 0, fairy: 0, ground: 0,
    electric: 0,fighting: 0, psychic: 0, rock: 0, 
    ice: 0, dragon: 0, dark: 0, ghost: 0, steel: 0,
};

const typeClassMap = {
    grass: ["bgcolor__grass1", "bgcolor__grass2", "bgcolor__grass3"],
    fire: ["bgcolor__fire1", "bgcolor__fire2", "bgcolor__fire3"],
    water: ["bgcolor__water1", "bgcolor__water2", "bgcolor__water3"],
    bug: ["bgcolor__bug1", "bgcolor__bug2", "bgcolor__bug3"],
    normal: ["bgcolor__normal1", "bgcolor__normal2", "bgcolor__normal3"],
    poison: ["bgcolor__poison1", "bgcolor__poison2", "bgcolor__poison3"],
    fairy: ["bgcolor__fairy"], ground: ["bgcolor__ground"], electric: ["bgcolor__electric"],
    fighting: ["bgcolor__fighting"], psychic: ["bgcolor__psychic"], rock: ["bgcolor__rock"],
    ice: ["bgcolor__ice"], dragon: ["bgcolor__dragon"], dark: ["bgcolor__dark"],
    ghost: ["bgcolor__ghost"], steel: ["bgcolor__steel"],
};

let backgroundMapping = {};


function getBackgroundClass(type) {
    const typeClasses = typeClassMap[type] || [];
    if (typeClasses.length === 0) return "";
    const counter = typeCounters[type] || 0;
    typeCounters[type] = (counter + 1) % typeClasses.length;
    return typeClasses[counter];
}

function createBackgroundWithID(backgroundClass, pokemonID) {
    if (!backgroundMapping[pokemonID]) {
        backgroundMapping[pokemonID] = backgroundClass;
    }
    return backgroundClass;
}

function getBackgroundWithID(pokemonID) {
    if(pokemonID) {
        let backgroundClass = backgroundMapping[pokemonID];
        return backgroundClass;
    }

}
