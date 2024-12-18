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
                            <form onsubmit="" class="searchbar__container">
                                <label for="search_input">
                                    <img class="searchbar__logo" src="./assets/icons/magnifier_icon_white.png" alt="Lupe-Icon">
                                </label>
                                <input class="searchbar" oninput="" id="search_input" type="text" placeholder="Suche Pokémon">
                            </form>
                            <button id="filter_button" class="filter__button">
                                <img src="./assets/icons/filter_icon_white.png" alt="Filter">
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
            <div class="overlay d__none" id="overlay"></div>
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
            <div id="mpokemon_details" class="mpokemon__details">
            </div>
            `;
}

function renderHTMLDetailedStructure(pokemon) {
    return  `
            <div class="details__header">
                <button onclick="closeOverlay()" class="leftback__button">
                    <img src="./assets/icons/back_icon_white.png" alt="Back">
                </button>
                <div class="pokemoncard__textbox">
                    <h1>${capitalizeFirstLetter(pokemon.name)}</h1>
                    <h3>${formatId(pokemon.id)}</h3>
                </div>
                <button class="heart__button">
                    <img src="./assets/icons/heart_icon_white.png" alt="Heart">
                </button>
            </div>
            <div class="details__centralbox ${getBackgroundWithID(pokemon.id)}">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
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
                        <button class="navbutton__open" id="nav_about" onclick="">About</button>
                        <button class="" id="nav_stats" onclick="">Stats</button>
                        <button class="" id="nav_moves" onclick="">Moves</button>
                        <button class="" id="nav_evolutions" onclick="">Evolutions</button>
                    </div>
                </nav>
                <div id="detailed_information" class="detailed__information">
                </div>
            </div>
            `;
}