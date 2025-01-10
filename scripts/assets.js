function reloadWebsite() {
    location.href = location.href;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatId(id) {
    return id.toString().padStart(3, '0');
}

function formatHeightFeet(heightInFeet) {
    const [feet, inches] = heightInFeet.split('.');
    const roundedInches = Math.round((`0.${inches}`) * 12);
    return `${feet}'${roundedInches}"`;
}

function checkIf2TypesColor(pokemon) {
    if(pokemon.types[1]) return pokemon.types[1].type.name;
    else return "dnone";
}

function checkIf2TypesImg(pokemon) {
    if(pokemon.types[1]) return pokemon.types[1].type.name;
    else return pokemon.types[0].type.name;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}

function toggleDnoneFromOverlay() {
    let contentRef = document.getElementById('overlay');
    if(contentRef) contentRef.classList.toggle('d__none');
}

function fixateScrollingOnBody() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    let scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    if(scrollY > 0){
        document.documentElement.style.scrollBehavior = 'unset';
        document.body.style.top = `-${scrollY}px`;
    }
    document.body.style.width = '100%';
}

function releaseScrollOnBody() {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

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

function changeNavButtonStyling(buttonRef) {
    removeStylingfromAllNavButtons();
    const navButtonRef = document.getElementById('nav_' + buttonRef);
    navButtonRef.classList.add('navbutton__open');
}

function removeStylingfromAllNavButtons() {
    navButtonIDs = ["about", "stats"];
    navButtonIDs.forEach(navButton => {
        const navButtonRef = document.getElementById('nav_' + navButton);
        navButtonRef.classList.remove('navbutton__open');
    });
}

function formatStatName(statName) {
    if (statName === 'special-attack') return 'Sp. Atk';
    else if (statName === 'special-defense') return 'Sp. Def';
    else if (statName === 'hp') return 'HP';
    return statName.charAt(0).toUpperCase() + statName.slice(1);
}

function getPokemonStats(pokemon) {
    const stats = pokemon.stats.map(stat => ({
        name: formatStatName(stat.stat.name),
        value: stat.base_stat
    }));
    return stats;
}

function getTopTwoStats(stats) {
    const sortedStats = stats.sort((a, b) => b.value - a.value);
    const topTwoStats = sortedStats.slice(0, 2).map(stat => stat.name);
    return topTwoStats;
}

function getBarColor(stat, topTwoStats, pokemon) {
    for (let i = 0; i < topTwoStats.length; i++) {
        if (topTwoStats[i] === stat) {
            let backgroundClass = getBackgroundWithID(pokemon.id);
            return backgroundClass;
        }
    }
}

function toggleDisplayLoadingSpinner() {
    const spinnerRef = document.getElementById('loadingspinner_overlay');
    if(spinnerRef) spinnerRef.classList.toggle('d__none');
}

function displayLoadingSpinner() {
    toggleDisplayLoadingSpinner();
    fixateScrollingOnBody();
}

function removeLoadingSpinner() {
    toggleDisplayLoadingSpinner();
    releaseScrollOnBody();
}


