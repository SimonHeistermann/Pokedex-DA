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

function getTouchPosition(e) {
    return { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
}

function handleSwipe(start, end, pokemon) {
    const delta = { x: end.x - start.x, y: end.y - start.y };
    const threshold = { x: 50, y: 192 };

    if (isHorizontalSwipe(delta, threshold)) {
        handleSwipeGesture(delta.x, pokemon, threshold.x);
    } else if (Math.abs(delta.y) > threshold.y) {
        closeOverlay();
    }
}

function isHorizontalSwipe(delta, threshold) {
    return Math.abs(delta.x) > Math.abs(delta.y) && Math.abs(delta.x) > threshold.x;
}

function handleSwipeGesture(deltaX, pokemon, thresholdX) {
    if (Math.abs(deltaX) > thresholdX) {
        deltaX > 0 ? openPrevPokemon(pokemon.id) : openNextPokemon(pokemon.id);
    }
}

function removeSwipeFunction() {
    const overlaySectionRef = document.getElementById('mpokemon_details');
    if (onTouchStart && onTouchEnd) {
        overlaySectionRef.removeEventListener('touchstart', onTouchStart);
        overlaySectionRef.removeEventListener('touchend', onTouchEnd);
    }
    onTouchStart = null;
    onTouchEnd = null;
}