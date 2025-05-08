/**
 * Renders the HTML for a Pokémon card, displaying its name, ID, image, and types.
 *
 * @param {Object} pokemon - The Pokémon object to render the card for.
 * @returns {string} The HTML string for the Pokémon card.
 */
function renderPokemonCardHTML(pokemon) {
    const primaryType = pokemon.types[0]?.type.name;
    const backgroundClass = getBackgroundClass(primaryType);
    return `
        <div onclick="openPokemonDetails(${pokemon.id})" class="pokemon__card ${createBackgroundWithID(backgroundClass, pokemon.id)}">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <div class="pokemoncard__bottombox">
                <div class="pokemoncard__textbox">
                    <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
                    <h3>${formatId(pokemon.id)}</h3>
                </div>
                <div class="types__containerstart">
                    <div class="type__box color__${pokemon.types[0].type.name}">
                        <img src="./assets/icons/icon_${pokemon.types[0].type.name}.png" alt="${pokemon.types[0].type.name}">
                        ${pokemon.types[0].type.name}
                    </div>
                    <div class="type__box color__${checkIf2TypesColor(pokemon)}">
                        <img src="./assets/icons/icon_${checkIf2TypesImg(pokemon)}.png" alt="${checkIf2TypesImg(pokemon)}">
                        ${checkIf2TypesImg(pokemon)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders the detailed "About" section for a Pokémon, including its weight, height, abilities, and description.
 *
 * @param {Object} pokemon - The Pokémon object to display the "About" information for.
 * @param {string} pokemonDescription - The description of the Pokémon.
 * @returns {string} The HTML string for the "About" section.
 */
function renderHTMLDetailedAbout(pokemon, pokemonDescription) {
    const weightKg = (pokemon.weight / 10).toFixed(1);
    const weightLbs = (weightKg * 2.20462).toFixed(1); 
    const heightM = (pokemon.height / 10).toFixed(1); 
    const heightFt = (heightM * 3.28084).toFixed(2);
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    return  `
            <div class="information__section">
                <p class="information__text">${pokemonDescription}</p>
                    <div class="height__weight">
                    <div class="weightandheight__box">
                        <div class="weightandheight__container">
                            <img src="./assets/icons/scale_icon_white.png" alt="Scale">
                            <p class="weightandheight__text">${weightKg} kg (${weightLbs} lbs)</p>
                        </div>
                        <p>Weight</p>
                    </div>
                    <div class="seperator"></div>
                    <div class="weightandheight__box">
                        <div class="weightandheight__container">
                            <img src="./assets/icons/height_icon_white.png" alt="Ruler">
                            <p class="weightandheight__text">${heightM} m (${formatHeightFeet(heightFt)})</p>
                        </div>
                        <p>Height</p>
                    </div>
                </div>
                <div class="rest__informationbox">
                    <p><strong>Base Experience:</strong> <span>${pokemon.base_experience}</span></p>
                    <p><strong>Abilities:</strong> <span>${abilities}</span></p>
                </div>
            </div>
            `;
}

/**
 * Renders a "More Pokémon" button that allows the user to load more Pokémon.
 *
 * @returns {string} The HTML string for the "More Pokémon" button.
 */
function renderHTMLMorePokemonButton() {
    return  `
            <button id="morepokemon_button" class="morepokemon__button" onclick="displayMorePokemon()">
                <img src="./assets/icons/new_pokemon_icon_white.png" alt="Pokeball">
                MORE
            </button>
            `;  
}

/**
 * Renders the detailed "Stats" section for a Pokémon, including its individual stats and progress bars.
 *
 * @param {Object} pokemon - The Pokémon object to display the stats for.
 * @returns {string} The HTML string for the "Stats" section.
 */
function renderHTMLDetailedStats(pokemon) {
    const stats = getPokemonStats(pokemon);
    let topTwoStats = getTopTwoStats(stats);
    return  `
            <div id="stats" class="stats__section">
                <div class="stat">
                    <span class="stat__text">${formatStatName(pokemon.stats[0].stat.name)}</span>
                    <span class="stats">${pokemon.stats[0].base_stat}</span>
                    <div class="stat__bar">
                        <div class="stat__bar__fill ${getBarColor(formatStatName(pokemon.stats[0].stat.name), topTwoStats, pokemon)}" style="width: ${pokemon.stats[0].base_stat}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat__text">${formatStatName(pokemon.stats[1].stat.name)}</span>
                    <span class="stats">${pokemon.stats[1].base_stat}</span>
                    <div class="stat__bar">
                        <div class="stat__bar__fill ${getBarColor(formatStatName(pokemon.stats[1].stat.name), topTwoStats, pokemon)}" style="width: ${pokemon.stats[1].base_stat}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat__text">${formatStatName(pokemon.stats[2].stat.name)}</span>
                    <span class="stats">${pokemon.stats[2].base_stat}</span>
                    <div class="stat__bar">
                        <div class="stat__bar__fill ${getBarColor(formatStatName(pokemon.stats[2].stat.name), topTwoStats, pokemon)}" style="width: ${pokemon.stats[2].base_stat}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat__text">${formatStatName(pokemon.stats[3].stat.name)}</span>
                    <span class="stats">${pokemon.stats[3].base_stat}</span>
                    <div class="stat__bar">
                        <div class="stat__bar__fill ${getBarColor(formatStatName(pokemon.stats[3].stat.name), topTwoStats, pokemon)}" style="width: ${pokemon.stats[3].base_stat}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat__text">${formatStatName(pokemon.stats[4].stat.name)}</span>
                    <span class="stats">${pokemon.stats[4].base_stat}</span>
                    <div class="stat__bar">
                        <div class="stat__bar__fill ${getBarColor(formatStatName(pokemon.stats[4].stat.name), topTwoStats, pokemon)}" style="width: ${pokemon.stats[4].base_stat}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat__text">${formatStatName(pokemon.stats[5].stat.name)}</span>
                    <span class="stats">${pokemon.stats[5].base_stat}</span>
                    <div class="stat__bar">
                        <div class="stat__bar__fill ${getBarColor(formatStatName(pokemon.stats[5].stat.name), topTwoStats, pokemon)}" style="width: ${pokemon.stats[5].base_stat}%;"></div>
                    </div>
                </div>
            </div>
            <p class="nature__description" id="nature_description">
                            
            </p>
            `
}
