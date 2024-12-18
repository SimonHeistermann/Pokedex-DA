function renderPokemonCardHTML(pokemon) {
    const primaryType = pokemon.types[0]?.type.name;
    const backgroundClass = getBackgroundClass(primaryType);
    return `
        <div onclick="openPokemonDetails(${pokemon.id})" class="pokemon__card ${createBackgroundWithID(backgroundClass, pokemon.id)}">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <div class="pokemoncard__textbox">
                <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
                <h3>${formatId(pokemon.id)}</h3>
            </div>
        </div>
    `;
}

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
                        <p>Gewicht</p>
                    </div>
                    <div class="seperator"></div>
                    <div class="weightandheight__box">
                        <div class="weightandheight__container">
                            <img src="./assets/icons/height_icon_white.png" alt="Ruler">
                            <p class="weightandheight__text">${heightM} m (${formatHeightFeet(heightFt)})</p>
                        </div>
                        <p>Größe</p>
                    </div>
                </div>
                <div class="rest__informationbox">
                    <p><strong>Base Experience:</strong> <span>${pokemon.base_experience}</span></p>
                    <p><strong>Abilities:</strong> <span>${abilities}</span></p>
                </div>
            </div>
            `;
}

function renderHTMLMorePokemonButton() {
    return  `
            <button class="morepokemon__button" onclick="displayMorePokemon()">
                <img src="./assets/icons/new_pokemon_icon_white.png" alt="Pokeball">
                MORE
            </button>
            `;  
}