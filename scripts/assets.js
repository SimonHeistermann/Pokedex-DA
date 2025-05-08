/**
 * Reloads the current website.
 */
function reloadWebsite() {
    location.href = location.href;
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param {string} str - The input string.
 * @returns {string} - The string with the first letter capitalized.
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a number as a 3-digit Pokémon ID.
 * 
 * @param {number} id - The Pokémon ID.
 * @returns {string} - The formatted ID (e.g., "001").
 */
function formatId(id) {
    return id.toString().padStart(3, '0');
}

/**
 * Converts height from string with decimal feet to feet and inches format.
 * 
 * @param {string} heightInFeet - Height as a string with decimal (e.g., "5.7").
 * @returns {string} - Height formatted as feet and inches (e.g., 5'8").
 */
function formatHeightFeet(heightInFeet) {
    const [feet, inches] = heightInFeet.split('.');
    const roundedInches = Math.round((`0.${inches}`) * 12);
    return `${feet}'${roundedInches}"`;
}

/**
 * Returns the second Pokémon type if available, otherwise returns "dnone".
 * 
 * @param {Object} pokemon - The Pokémon object.
 * @returns {string} - The name of the second type or "dnone".
 */
function checkIf2TypesColor(pokemon) {
    if (pokemon.types[1]) return pokemon.types[1].type.name;
    else return "dnone";
}

/**
 * Returns the second Pokémon type if available, otherwise the first.
 * 
 * @param {Object} pokemon - The Pokémon object.
 * @returns {string} - The name of the second or first type.
 */
function checkIf2TypesImg(pokemon) {
    if (pokemon.types[1]) return pokemon.types[1].type.name;
    else return pokemon.types[0].type.name;
}

/**
 * Smoothly scrolls the page to the top.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}

/**
 * Toggles the visibility of the overlay by toggling the 'd__none' class.
 */
function toggleDnoneFromOverlay() {
    let contentRef = document.getElementById('overlay');
    if (contentRef) contentRef.classList.toggle('d__none');
}

/**
 * Prevents scrolling on the body by fixing its position.
 */
function fixateScrollingOnBody() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    let scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    if (scrollY > 0) {
        document.documentElement.style.scrollBehavior = 'unset';
        document.body.style.top = `-${scrollY}px`;
    }
    document.body.style.width = '100%';
}

/**
 * Releases body scroll and restores previous scroll position.
 */
function releaseScrollOnBody() {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

/**
 * Converts strings, arrays, or object values to lowercase.
 * 
 * @param {string|Array|Object} input - The input to convert.
 * @returns {string|Array|Object} - Lowercased result.
 */
function toLowerCaseHelper(input) {
    if (typeof input === "string") return input.toLowerCase();
    else if (Array.isArray(input)) return input.map(item => (typeof item === "string" ? item.toLowerCase() : item));
    else if (typeof input === "object" && input !== null) {
        const loweredObject = {};
        for (const key in input) {
            if (Object.hasOwn(input, key)) {
                loweredObject[key] = typeof input[key] === "string" ? input[key].toLowerCase() : input[key];
            }
        }
        return loweredObject;
    }
    return input;
}

/**
 * Applies active styling to a navigation button.
 * 
 * @param {string} buttonRef - The ID suffix of the nav button.
 */
function changeNavButtonStyling(buttonRef) {
    removeStylingfromAllNavButtons();
    const navButtonRef = document.getElementById('nav_' + buttonRef);
    navButtonRef.classList.add('navbutton__open');
}

/**
 * Removes active styling from all navigation buttons.
 */
function removeStylingfromAllNavButtons() {
    navButtonIDs = ["about", "stats"];
    navButtonIDs.forEach(navButton => {
        const navButtonRef = document.getElementById('nav_' + navButton);
        navButtonRef.classList.remove('navbutton__open');
    });
}

/**
 * Formats Pokémon stat names for better readability.
 * 
 * @param {string} statName - The original stat name from the API.
 * @returns {string} - Formatted stat name.
 */
function formatStatName(statName) {
    if (statName === 'special-attack') return 'Sp. Atk';
    else if (statName === 'special-defense') return 'Sp. Def';
    else if (statName === 'hp') return 'HP';
    return statName.charAt(0).toUpperCase() + statName.slice(1);
}

/**
 * Extracts and formats stats from a Pokémon object.
 * 
 * @param {Object} pokemon - The Pokémon object.
 * @returns {Array<Object>} - Array of formatted stats with name and value.
 */
function getPokemonStats(pokemon) {
    const stats = pokemon.stats.map(stat => ({
        name: formatStatName(stat.stat.name),
        value: stat.base_stat
    }));
    return stats;
}

/**
 * Returns the names of the top two highest stats.
 * 
 * @param {Array<Object>} stats - Array of stat objects.
 * @returns {Array<string>} - Names of the top two stats.
 */
function getTopTwoStats(stats) {
    const sortedStats = stats.sort((a, b) => b.value - a.value);
    const topTwoStats = sortedStats.slice(0, 2).map(stat => stat.name);
    return topTwoStats;
}

/**
 * Returns a background color class based on stat and Pokémon ID.
 * 
 * @param {string} stat - The name of the stat.
 * @param {Array<string>} topTwoStats - The top two stat names.
 * @param {Object} pokemon - The Pokémon object.
 * @returns {string|undefined} - Background class name if matched.
 */
function getBarColor(stat, topTwoStats, pokemon) {
    for (let i = 0; i < topTwoStats.length; i++) {
        if (topTwoStats[i] === stat) {
            let backgroundClass = getBackgroundWithID(pokemon.id);
            return backgroundClass;
        }
    }
}

/**
 * Toggles the display of the loading spinner overlay.
 */
function toggleDisplayLoadingSpinner() {
    const spinnerRef = document.getElementById('loadingspinner_overlay');
    if (spinnerRef) spinnerRef.classList.toggle('d__none');
}

/**
 * Displays the loading spinner and prevents background scrolling.
 */
function displayLoadingSpinner() {
    toggleDisplayLoadingSpinner();
    fixateScrollingOnBody();
}

/**
 * Hides the loading spinner and restores scrolling.
 */
function removeLoadingSpinner() {
    toggleDisplayLoadingSpinner();
    releaseScrollOnBody();
}

/**
 * Sets the click handler of the "More Pokémon" button.
 * 
 * @param {Function|null} variable - The function to call on click, or null to disable.
 */
function toggleMorePokemonButton(variable) {
    let buttonRef = document.getElementById('morepokemon_button');
    buttonRef.onclick = variable;
}

/**
 * Returns a random nature name from the list of available natures.
 * 
 * @returns {string} - A random nature name.
 */
function getRandomNatureName() {
    return natures[Math.floor(Math.random() * natures.length)];
}

/**
 * Returns to the main Pokédex view from a detail view.
 */
async function backToPokedex() {
    try {
        currentPage = 'home';
        renderStandardStructure();
        displayLoadingSpinner();
        await loadPokemonListWithCache();
        await displayPokemonList(true); 
        renderMorePokemonButton();
        removeLoadingSpinner();
    } catch (error) {
        console.error('Error going back to Pokedex:', error);
    }
}
