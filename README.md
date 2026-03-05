# Pokedex

> A Pokédex web application that displays Pokémon data from the PokéAPI — training project from Developer Akademie.

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Disclaimer

This is a **training project** built as part of my education at [Developer Akademie](https://developerakademie.com/). It is not a commercial product and is not intended for real-world use. Pokémon and all related trademarks are the property of Nintendo, Game Freak, and The Pokémon Company. This project is not affiliated with or endorsed by any of these companies.

## About

This application fetches and displays Pokémon data from the [PokéAPI](https://pokeapi.co/), including sprites, types, stats, descriptions, and abilities. Built as a frontend exercise to practice working with REST APIs, asynchronous JavaScript, DOM manipulation, and responsive CSS — all without any framework or build tools.

## Tech Stack

- HTML5
- CSS3 (responsive, custom properties, gradients)
- Vanilla JavaScript (ES6+, async/await, Fetch API)
- [PokéAPI](https://pokeapi.co/) (REST API for Pokémon data)
- Self-hosted Nunito font

## Features

- Paginated Pokémon list (20 at a time, load more on demand)
- Search/filter across all 1025 Pokémon
- Detail overlay with About tab (description, weight, height, abilities) and Stats tab (base stats with colored bars, nature recommendation)
- Navigate between Pokémon via prev/next buttons or touch swipe
- Favorites system with localStorage persistence
- Type-based color-coded cards with rotating gradient backgrounds
- Pokéball loading spinner
- Caching via localStorage and in-memory for fast repeated access
- Mobile-responsive design

## Getting Started

### Prerequisites

A modern web browser. No Node.js, npm, or build tools required.

### Running

Open `index.html` directly in a browser, or serve via any local HTTP server:

```bash
# Python
python3 -m http.server 8765

# Then open http://localhost:8765
```

Or use VS Code's [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

## Legal

- [Impressum](./impressum.html)
- [Privacy Policy](./privacy-policy.html)
- [Disclaimer](./disclaimer.html)

## Author

**Simon Maximilian Heistermann**
- Website: [simon-heistermann.de](https://simon-heistermann.de)
- Email: simon@heistermann-solutions.de
- LinkedIn: [Simon Heistermann](https://www.linkedin.com/in/simon-heistermann/)

## License

This project is part of a training curriculum and is not licensed for commercial use.
