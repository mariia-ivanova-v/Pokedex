/**
 * function to create a single pokemon card
 * @param {string} pokeName - name of the pokemon
 * @param {number} pokeId - id of the pokemon
 * @param {string} pokeImage - url of the pokemon image
 * @param {string} pokeType - type of the pokemon
 * @param {number} i - index for uniqueness
 */
function singleCardTemplate(pokeName, pokeId, pokeImage, pokeType, i){
    document.getElementById('pokemon-container').innerHTML +=
        `<div id="single-small-container${i}" class="single-small-container ${pokeType}-container" onclick="openPokemonInfo(${i})">
            <div class="name-container">
                <h2>${pokeName}</h2>
                <h2>№ ${pokeId}</h2>
            </div>
            <div class="small-info-container">
                <div class = "all-info-container" id="info-container${i}"></div>
                <img src="${pokeImage}">
            </div>
        </div>`
}

/**
 * function to display pokemon's type information
 * @param {string} currentType - current type of the pokemon
 * @param {number} i - index for uniqueness
 */
function singleInfoTemplete(currentType, i){
    document.getElementById(`info-container${i}`).innerHTML +=
        `<div class="single-info">
            <h3>${currentType}</h3>
        </div>`;
}

/**
 * function to render pokemon's header information
 * @param {string} pokeImage - url of the pokemon image
 * @param {string} pokeName - name of the pokemon
 * @param {number} pokeId - id of the pokemon
 * @param {number} i - index for uniqueness
 */
function renderHeader(pokeImage, pokeName, pokeId, i) {
    document.getElementById('container-head').innerHTML +=
        `<div class="d-none single-header" id="header-info${i}">
            <div class="container-header">
                <h1 id="big-name${i}">${pokeName}</h1>
                <h1 id="big-id${i}">№ ${pokeId}</h1>
            </div>
            <div class="header-image">
                <img class=" poke-image" id="image${i}" src="${pokeImage}">
            </div>
        </div>`;
}

/**
 * function to render navigation arrows
 * @param {number} i - index for uniqueness
 */
function renderArrows(i) {
    document.getElementById('arrow-container').innerHTML +=
        `<img class="d-none" id="arrow${i}" onclick="previosInfo(${i})" src="./img/arrow.png">
        <img id="arrow-right${i}" onclick="nextInfo(${i})" class="right-arrow d-none" src="./img/arrow.png">`;
}

/**
 * function to render pokemon's stats
 * @param {number} pokeHp - pokemon's health points
 * @param {number} pokeHeight - pokemon's height
 * @param {number} pokeWeight - pokemon's weight
 * @param {number} i - index for uniqueness
 */
function statsTemplate(pokeHp, pokeHeight, pokeWeight, i){
    document.getElementById('current-info').innerHTML +=
        `<div class="d-none" id="stats-info${i}">
            <h3>HP: ${pokeHp}</h3>
            <h3>Height: ${pokeHeight}</h3>
            <h3>Weight: ${pokeWeight}</h3>
        </div>`;
}

/**
 * function to render pokemon's additional information like experience, abilities, and types
 * @param {number} pokeExpirience - pokemon's base experience
 * @param {number} i - index for uniqueness
 */
function aboutTemplate(pokeExpirience, i){
    document.getElementById('current-info').innerHTML +=
        `<div class="d-none" id="about-info${i}">
        	<h3>Base expirirence: ${pokeExpirience}</h3>
            <div class="info-div"><h3>Abilities: </h3>
                <h3 id="abilities${i}">
            </div>
            </h3>
            <div class="info-div"><h3>Types: </h3>
                <h3 id="types${i}"></h3>
            </div>
        </div>`;
}