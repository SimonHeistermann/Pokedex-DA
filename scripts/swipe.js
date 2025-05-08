/**
 * Sets up swipe functionality for navigating through Pokémon details.
 * It listens for touch start and end events to detect swipe gestures.
 *
 * @param {Object} pokemon - The Pokémon object for which the swipe function is enabled.
 */
function swipeFunction(pokemon) {
    const overlaySectionRef = document.getElementById('mpokemon_details');
    let touchStart = { x: 0, y: 0 };

    onTouchStart = (e) => {
        touchStart = getTouchPosition(e);
    };
    onTouchEnd = (e) => {
        const touchEnd = getTouchPosition(e);
        handleSwipe(touchStart, touchEnd, pokemon);
    };
    overlaySectionRef.addEventListener('touchstart', onTouchStart);
    overlaySectionRef.addEventListener('touchend', onTouchEnd);
}

/**
 * Gets the touch position from the event.
 *
 * @param {Event} e - The touch event.
 * @returns {Object} - The position of the touch event (x and y coordinates).
 */
function getTouchPosition(e) {
    return { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
}

/**
 * Handles the swipe gesture by comparing the start and end touch positions.
 * It decides whether the swipe was horizontal or vertical and reacts accordingly.
 *
 * @param {Object} start - The starting touch position.
 * @param {Object} end - The ending touch position.
 * @param {Object} pokemon - The Pokémon object being swiped.
 */
function handleSwipe(start, end, pokemon) {
    const delta = { x: end.x - start.x, y: end.y - start.y };
    const threshold = { x: 50, y: 192 };

    if (isHorizontalSwipe(delta, threshold)) {
        handleSwipeGesture(delta.x, pokemon, threshold.x);
    } else if (Math.abs(delta.y) > threshold.y) {
        closeOverlay();
    }
}

/**
 * Checks if the swipe gesture was horizontal by comparing the x and y distance.
 *
 * @param {Object} delta - The difference in touch position (x and y).
 * @param {Object} threshold - The threshold values for detecting a valid swipe.
 * @returns {boolean} - True if the swipe was horizontal, false otherwise.
 */
function isHorizontalSwipe(delta, threshold) {
    return Math.abs(delta.x) > Math.abs(delta.y) && Math.abs(delta.x) > threshold.x;
}

/**
 * Handles the swipe gesture, opening the previous or next Pokémon details based on the swipe direction.
 *
 * @param {number} deltaX - The difference in x position, determining the direction of the swipe.
 * @param {Object} pokemon - The Pokémon object being navigated.
 * @param {number} thresholdX - The threshold for detecting valid horizontal swipe gestures.
 */
function handleSwipeGesture(deltaX, pokemon, thresholdX) {
    if (Math.abs(deltaX) > thresholdX) {
        deltaX > 0 ? openPrevPokemon(pokemon.id) : openNextPokemon(pokemon.id);
    }
}

/**
 * Removes the swipe event listeners from the Pokémon details overlay.
 */
function removeSwipeFunction() {
    const overlaySectionRef = document.getElementById('mpokemon_details');
    if (onTouchStart && onTouchEnd) {
        overlaySectionRef.removeEventListener('touchstart', onTouchStart);
        overlaySectionRef.removeEventListener('touchend', onTouchEnd);
    }
    onTouchStart = null;
    onTouchEnd = null;
}
