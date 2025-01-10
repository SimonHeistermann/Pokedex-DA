function renderHTMLStandardStructure() {
    return  `
            <header>
                <div class="header__container">
                    <div class="pokeball__background"></div>
                    <div class="header__box">
                        <button class="menu__button">
                            <img src="./assets/icons/menu_icon_white.png" alt="Menu">
                        </button>
                        <h1 class="header__headline">Welches Pokémon suchst du?</h1>
                        <div class="header__searchbox">
                            <form onsubmit="filterPokemon(event)" class="searchbar__container">
                                <label for="search_input">
                                    <img class="searchbar__logo" src="./assets/icons/magnifier_icon_white.png" alt="Lupe-Icon">
                                </label>
                                <input class="searchbar" oninput="filterPokemon(event)" id="search_input" type="text" placeholder="Suche Pokémon">
                            </form>
                            <button onclick="openFavoritePokemons()" id="refresh_button" class="favorites__button">
                                <img src="./assets/icons/favorites_icon_white.png" alt="Refresh">
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main id="main_section">
                <div class="pokeball__background2"></div>
                <div id="pokedex_section" class="pokedex__section">
                </div>
                <div class="morepokemonbutton__section" id=morepokemonbutton_section></div>
            </main>
            <div onclick="closeOverlay()" class="overlay d__none" id="overlay"></div>
            <div id="loadingspinner_overlay" class="loadingspinner__overlay d__none">
                <div class="pokeball__background"></div>
                <div class="pokeball__background2"></div>
                <div class="loadingspinner__box">
                    <div class="pokeball__spinner">
                        <div class="pokeball__middlecircle"></div>
                    </div>
                    <div class="loading__text"><span class="dots"></span>loading</div>
                </div>
            </div>
            <footer>
                <div class="footer__container">
                    <div class="footer__containerbottom">
                        <span class="footer__credits">created by Simon Heistermann &copy;</span>
                        <a class="footer__linksextra" href="https://icons8.com/" target="_blank" rel="noopener noreferrer">Icons by icons8.com</a>
                    </div>
                </div>
            </footer>
            `;
}

function renderHTMLOverlayStructure() {
    return  `
            <div class="pokeball__background"></div>
            <div class="pokeball__background2"></div>
            <div id="mpokemon_details" class="mpokemon__details" onclick="event.stopPropagation()">
            </div>
            `;
}

function renderHTMLDetailedStructure(pokemon) {
    const isFavorite = favoritePokemons.some(item => item.id === pokemon.id);
    return  `
            <div class="details__header">
                <button onclick="closeOverlay()" class="leftback__button">
                    <img src="./assets/icons/back_icon_white.png" alt="Back">
                </button>
                <div class="pokemoncard__textbox">
                    <h1>${capitalizeFirstLetter(pokemon.name)}</h1>
                    <h3>${formatId(pokemon.id)}</h3>
                </div>
                <button onclick="toggleToFavorites(${pokemon.id})" class="heart__button">
                    <img class="${isFavorite ? 'is__favorite' : ''}" src="./assets/icons/heart_icon_white.png" alt="Heart">
                </button>
            </div>
            <div class="details__centralbox ${getBackgroundWithID(pokemon.id)}">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                <button onclick="openPrevPokemon(${pokemon.id})" class="prev__pokemonbutton ${pokemon.id === 1 ? 'd__none' : ''}">
                    <img src="./assets/icons/prev_pokemon_icon_white.png" alt="previos pokemon">
                </button>
                <button onclick="openNextPokemon(${pokemon.id})" class="next__pokemonbutton">
                    <img src="./assets/icons/next_pokemon_icon_white.png" alt="next pokemon">
                </button>
                <div class="types__container">
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
            <div class="details__informationbox">
                <nav>
                    <div class="nav__container">
                        <button class="navbutton__open" id="nav_about" onclick="openDetailedAbout(${pokemon.id}, 'about')">About</button>
                        <button class="" id="nav_stats" onclick="openDetailedStats(${pokemon.id}, 'stats')">Stats</button>
                    </div>
                </nav>
                <div id="detailed_information" class="detailed__information">
                </div>
            </div>
            `;
}

function renderHTMLFavoritesStructure() {
    return  `
            <header>
                <div class="header__container">
                    <div class="pokeball__background"></div>
                    <div class="header__box">
                        <button class="menu__button">
                            <img src="./assets/icons/menu_icon_white.png" alt="Menu">
                        </button>
                        <div class="favorites__headline">
                            <h1 class="header__headline">Deine Favoriten</h1>
                            <button onclick="backToPokedex()" id="refresh_button" class="favorites__button">
                                <img src="./assets/icons/home_icon_white.png" alt="Refresh">
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main id="main_section">
                <div class="pokeball__background2"></div>
                <div id="favorite_section" class="pokedex__section">
                </div>
            </main>
            <div onclick="closeOverlay()" class="overlay d__none" id="overlay"></div>
            <div id="loadingspinner_overlay" class="loadingspinner__overlay d__none">
                <div class="pokeball__background"></div>
                <div class="pokeball__background2"></div>
                <div class="loadingspinner__box">
                    <div class="pokeball__spinner">
                        <div class="pokeball__middlecircle"></div>
                    </div>
                    <div class="loading__text"><span class="dots"></span>loading</div>
                </div>
            </div>
            <footer>
                <div class="footer__container">
                    <div class="footer__containerbottom">
                        <span class="footer__credits">created by Simon Heistermann &copy;</span>
                        <a class="footer__linksextra" href="https://icons8.com/" target="_blank" rel="noopener noreferrer">Icons by icons8.com</a>
                    </div>
                </div>
            </footer>
            `
}