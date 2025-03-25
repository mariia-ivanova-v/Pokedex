let limitNumber = 15;
let minNumber = 1;
let allPokemons = [];

/**
 * renders a single pokemon card with basic information
 * @param {Object} currentArray - pokemon data object
 * @param {number} i - index of the pokemon for DOM manipulation
 */
function renderSingleCard(currentArray, i) {
    let pokeName = getPokeName(currentArray);
    let pokeId = getPokeId(currentArray);
    let pokeImage = getPokeImage(currentArray);
    let pokeType = getPokeType(currentArray);
    singleCardTemplate(pokeName, pokeId, pokeImage, pokeType, i);
    renderSingleInfo(currentArray, i);
    renderBigContainer(currentArray, i);
}

/**
 * gets the pokemon's name
 * @param {Object} currentArray - pokemon data object
 * @returns {string} - formatted pokemon name
 */
function getPokeName(currentArray) {
    let name = currentArray['name'];
    name = makeCapitalLetter(name);
    return name;
}

/**
 * gets the pokemon's id
 * @param {Object} currentArray - pokemon data object
 * @returns {number} - pokemon id
 */
function getPokeId(currentArray) {
    let myId = currentArray['id'];
    return myId
}

/**
 * gets the pokemon's image URL
 * @param {Object} index - pokemon data object
 * @returns {string} - URL of the pokemon's image
 */
function getPokeImage(index) {
    let pokeImage = index['sprites']['other']['dream_world']['front_default'];
    return pokeImage;
}

/**
 * gets the pokemon's type
 * @param {Object} index - pokemon data object
 * @returns {string} - pokemon type
 */
function getPokeType(index) {
    let type = index['types'][0]['type']['name'];
    return type;
}

/**
 * fetches an array of pokemon data and renders their cards
 * @returns {void}
 */
async function getArray() {
    let newPokemons = [];
    changeLoadingScreen();

    for (let i = minNumber; i <= limitNumber; i++) {
        let firstInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let firstInfoAsJson = await firstInfo.json();
        newPokemons.push(firstInfoAsJson);
    }
    allPokemons.push(...newPokemons);
    newPokemons.forEach((pokemon, index) => {
        renderSingleCard(pokemon, minNumber + index);
    })
    changeLoadingScreen();
    document.getElementById('load-button').classList.remove('d-none')
}

/**
 * toggles the visibility of the loading screen
 * @returns {void}
 */
function changeLoadingScreen(){
    document.getElementById('loading').classList.toggle('d-none');
}

/**
 * renders pokemon's type information
 * @param {Object} index - pokemon data object
 * @param {number} i - index for DOM manipulation
 * @returns {void}
 */
function renderSingleInfo(index, i) {
    let myArray = index['types'];
    let myLength = myArray.length;

    for (let t = 0; t < myLength; t++) {
        let currentType = myArray[t]['type']['name']
        currentType = makeCapitalLetter(currentType);
        singleInfoTemplete(currentType, i)
    }
}

/**
 * renders the big container with pokemon details
 * @param {Object} index - pokemon data object
 * @param {number} i - index for DOM manipulation
 * @returns {void}
 */
function renderBigContainer(index, i) {
    let pokeName = getPokeName(index);
    let pokeId = getPokeId(index);
    let pokeImage = getPokeImage(index);

    renderHeader(pokeImage, pokeName, pokeId, i);
    renderArrows(i);
    renderStats(index, i);
    renderAbout(index, i);
}

/**
 * renders pokemon's stats (HP, height, weight)
 * @param {Object} index - pokemon data object
 * @param {number} i - index for DOM manipulation
 * @returns {void}
 */
function renderStats(index, i) {
    let pokeHp = index['stats'][0]['base_stat']
    let pokeHeight = index['height'];
    let pokeWeight = index['weight']
    statsTemplate(pokeHp, pokeHeight, pokeWeight, i);
}

/**
 * renders additional information about the pokemon (experience, abilities, types)
 * @param {Object} index - pokemon data object
 * @param {number} i - index for DOM manipulation
 * @returns {void}
 */
function renderAbout(index, i) {
    let pokeExpirience = index['base_experience']
    aboutTemplate(pokeExpirience, i)
    renderAbilities(index, i);
    renderTypes(index, i);
}

/**
 * renders pokemon's abilities
 * @param {Object} index - pokemon data object
 * @param {number} i - index for DOM manipulation
 * @returns {void}
 */
function renderAbilities(index, i) {
    let pokeAbilities = index['abilities'];
    let abilitiesLength = pokeAbilities.length;
    for (let t = 0; t < abilitiesLength; t++) {
        let myAbility = makeCapitalLetter(pokeAbilities[t]['ability']['name'])
        document.getElementById(`abilities${i}`).innerHTML += `<h3>${myAbility}</h3>`;
    }
}

/**
 * renders pokemon's types
 * @param {Object} index - pokemon data object
 * @param {number} i - index for DOM manipulation
 * @returns {void}
 */
function renderTypes(index, i) {
    let pokeType = index['types'];
    let pokeTypeLength = pokeType.length;
    for (let t = 0; t < pokeTypeLength; t++) {
        let myType = makeCapitalLetter(pokeType[t]['type']['name']);
        document.getElementById(`types${i}`).innerHTML += `<h3>${myType}</h3>`;
    }
}

/**
 * opens detailed pokemon information
 * @param {number} i - index of the pokemon
 * @returns {void}
 */
function openPokemonInfo(i) {
    let currentClassName = document.getElementById(`single-small-container${i}`).classList[1];
    document.getElementById('big-container').classList.add(currentClassName);
    document.getElementById('stats-button').setAttribute('onclick', `openStats(${i})`)
    document.getElementById('about-button').setAttribute('onclick', `openAbout(${i})`)
    document.getElementById('background-big-container').setAttribute('onclick', `closePokemonInfo(${i})`)
    document.getElementById('cross').setAttribute('onclick', `closePokemonInfo(${i})`)
    document.getElementById('big-container').classList.remove('d-none');
    document.getElementById(`header-info${i}`).classList.remove('d-none');
    document.getElementById(`stats-info${i}`).classList.remove('d-none');
    document.getElementById(`background-big-container`).classList.remove('d-none');
    document.getElementById('my-body').classList.add('overflow-hid')
    document.getElementById(`arrow${i}`).classList.remove('d-none');
    document.getElementById(`arrow-right${i}`).classList.remove('d-none');
    openStats(i)
}

/**
 * closes detailed pokemon information
 * @param {number} i - index of the pokemon
 * @returns {void}
 */
function closePokemonInfo(i) {
    let currentClassName = document.getElementById(`single-small-container${i}`).classList[1];

    document.getElementById('big-container').classList.remove(currentClassName);
    document.getElementById('big-container').classList.add('d-none');
    document.getElementById(`background-big-container`).classList.add('d-none');
    document.getElementById('my-body').classList.remove('overflow-hid')
    for (let t = 1; t <= limitNumber; t++) {
        document.getElementById(`header-info${t}`).classList.add('d-none');
        document.getElementById(`stats-info${t}`).classList.add('d-none');
        document.getElementById(`arrow${t}`).classList.add('d-none');
        document.getElementById(`arrow-right${t}`).classList.add('d-none');
        document.getElementById(`about-info${t}`).classList.add('d-none')
    }
}

/**
 * navigates to the previous pokemon info
 * @param {number} i - current pokemon index
 * @returns {void}
 */
function previosInfo(i) {
    let t = i - 1;
    if (t < 1) {
        t = limitNumber;
    }
    closePokemonInfo(i);
    openPokemonInfo(t);
}

/**
 * navigates to the next pokemon info
 * @param {number} i - current pokemon index
 * @returns {void}
 */
function nextInfo(i) {
    let t = i + 1;
    if (t > limitNumber) {
        t = 1;
    }
    closePokemonInfo(i);
    openPokemonInfo(t);
}

/**
 * loads more pokemon data and renders their cards
 * @returns {void}
 */
function loadMore() {
    limitNumber = limitNumber + 15;
    minNumber = minNumber + 15
    getArray();
}

/**
 * opens the stats tab for a pokemon
 * @param {number} i - pokemon index
 * @returns {void}
 */
function openStats(i) {
    document.getElementById('stats-button').classList.add('chosen-button');
    document.getElementById('about-button').classList.remove('chosen-button');
    document.getElementById(`stats-info${i}`).classList.remove('d-none');
    document.getElementById(`about-info${i}`).classList.add('d-none');
}

/**
 * opens the about tab for a pokemon
 * @param {number} i - pokemon index
 * @returns {void}
 */
function openAbout(i) {
    document.getElementById('stats-button').classList.remove('chosen-button');
    document.getElementById('about-button').classList.add('chosen-button');
    document.getElementById(`stats-info${i}`).classList.add('d-none');
    document.getElementById(`about-info${i}`).classList.remove('d-none');
}

/**
 * capitalizes the first letter of a word
 * @param {string} word - the word to capitalize
 * @returns {string} - the capitalized word
 */
function makeCapitalLetter(word) {
    let newWord = word;
    newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1).toLowerCase();
    return newWord;
}

/**
 * filters and displays pokemon based on user input
 * @returns {void}
 */
function findPokemon() {
    let searchContainer = document.getElementById('pokemon-container');
    let pokeInput = document.getElementById('poke-input');
    if(pokeInput.value != ""){
        searchContainer.innerHTML = '';
        hideAllCards();
        document.getElementById('reset-button').classList.remove('d-none')
        document.getElementById('my-main').classList.add('my-main')
        let filterValue = document.getElementById('poke-input').value;
        let filteredPokemons = allPokemons.filter(pokemon => {
            let name = pokemon.name.toLowerCase();
            let id = pokemon.id.toString();

            return name.startsWith(filterValue) || id === filterValue;
        })
        searchContainer.innerHTML = '';
        filteredPokemons.forEach((pokemon, index) => {
        renderSingleCard(pokemon, index + 1);
        });
    }
    document.getElementById('poke-input').value = "";
}

/**
 * hides all pokemon cards
 * @returns {void}
 */
function hideAllCards() {
    for (let i = 1; i <= limitNumber; i++) {
        let card = document.getElementById(`single-small-container${i}`);
        if (card && !card.classList.contains('d-none')) {
            card.classList.add('d-none');
        }
    }
    document.getElementById('load-button').classList.add('d-none')
}

/**
 * resets the pokemon filter
 * @returns {void}
 */
function resetFilter() {
    document.getElementById('pokemon-container').innerHTML = "";
    allPokemons.forEach((pokemon, index) => {
        renderSingleCard(pokemon, index + 1);
    });
    document.getElementById('load-button').classList.remove('d-none');
    document.getElementById('my-main').classList.remove('my-main')
    document.getElementById('reset-button').classList.add('d-none')
}