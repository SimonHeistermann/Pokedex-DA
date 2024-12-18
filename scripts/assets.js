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
