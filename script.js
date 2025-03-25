var limitNumber = 15;
var minNumber = 1;
let allPokemons = [];

function renderSingleCard(currentArray, i) {
    let pokeName = getPokeName(currentArray);
    let pokeId = getPokeId(currentArray);
    let pokeImage = getPokeImage(currentArray);
    let pokeType = getPokeType(currentArray);

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

    renderSingleInfo(currentArray, i);
    renderBigContainer(currentArray, i);
}

function getPokeName(currentArray) {
    let name = currentArray['name'];
    name = makeCapitalLetter(name);
    return name;
}

function getPokeId(currentArray) {
    let myId = currentArray['id'];
    return myId
}

function getPokeImage(index) {
    let pokeImage = index['sprites']['other']['dream_world']['front_default'];
    return pokeImage;
}

function getPokeType(index) {
    let type = index['types'][0]['type']['name'];
    return type;
}

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
}

function changeLoadingScreen(){
    document.getElementById('loading').classList.toggle('d-none');
}

function renderSingleInfo(index, i) {
    let myArray = index['types'];
    let myLength = myArray.length;

    for (let t = 0; t < myLength; t++) {
        let currentType = myArray[t]['type']['name']
        currentType = makeCapitalLetter(currentType)
        document.getElementById(`info-container${i}`).innerHTML +=
            `<div class="single-info">
            <h3>${currentType}</h3>
        </div>`;
    }
}

function renderBigContainer(index, i) {
    let pokeName = getPokeName(index);
    let pokeId = getPokeId(index);
    let pokeImage = getPokeImage(index);

    renderHeader(pokeImage, pokeName, pokeId, i);
    renderArrows(i);
    renderStats(index, i);
    renderAbout(index, i);
}

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

function renderArrows(i) {
    document.getElementById('arrow-container').innerHTML +=
        `<img class="d-none" id="arrow${i}" onclick="previosInfo(${i})" src="./img/arrow.png">
     <img id="arrow-right${i}" onclick="nextInfo(${i})" class="right-arrow d-none" src="./img/arrow.png">`;
}

function renderStats(index, i) {
    let pokeHp = index['stats'][0]['base_stat']
    let pokeHeight = index['height'];
    let pokeWeight = index['weight']

    document.getElementById('current-info').innerHTML +=
        `<div class="d-none" id="stats-info${i}">
        <h3>HP: ${pokeHp}</h3>
        <h3>Height: ${pokeHeight}</h3>
        <h3>Weight: ${pokeWeight}</h3>
    </div>`;
}

function renderAbout(index, i) {
    let pokeExpirience = index['base_experience']

    document.getElementById('current-info').innerHTML +=
        `<div class="d-none" id="about-info${i}">
        	<h3>Base expirirence: ${pokeExpirience}</h3>
            <div class="info-div"><h3>Abilities: </h3>
                <h3 id="abilities${i}"></div>
            </h3>
            <div class="info-div"><h3>Types: </h3>
                <h3 id="types${i}"></h3>
            </div>
    </div>`;

    renderAbilities(index, i);
    renderTypes(index, i);
}

function renderAbilities(index, i) {
    let pokeAbilities = index['abilities'];
    let abilitiesLength = pokeAbilities.length;
    for (let t = 0; t < abilitiesLength; t++) {
        let myAbility = makeCapitalLetter(pokeAbilities[t]['ability']['name'])
        document.getElementById(`abilities${i}`).innerHTML +=
            `<h3>${myAbility}</h3>`;
    }
}

function renderTypes(index, i) {
    let pokeType = index['types'];
    let pokeTypeLength = pokeType.length;
    for (let t = 0; t < pokeTypeLength; t++) {
        let myType = makeCapitalLetter(pokeType[t]['type']['name']);
        document.getElementById(`types${i}`).innerHTML +=
            `<h3>${myType}</h3>`;
    }
}

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

function previosInfo(i) {
    let t = i - 1;
    if (t < 1) {
        t = limitNumber;
    }
    closePokemonInfo(i);
    openPokemonInfo(t);
}

function nextInfo(i) {
    let t = i + 1;
    if (t > limitNumber) {
        t = 1;
    }
    closePokemonInfo(i);
    openPokemonInfo(t);
}

function loadMore() {
    limitNumber = limitNumber + 15;
    minNumber = minNumber + 15
    getArray();
}

function openStats(i) {
    document.getElementById('stats-button').classList.add('chosen-button');
    document.getElementById('about-button').classList.remove('chosen-button');
    document.getElementById(`stats-info${i}`).classList.remove('d-none');
    document.getElementById(`about-info${i}`).classList.add('d-none');

}

function openAbout(i) {
    document.getElementById('stats-button').classList.remove('chosen-button');
    document.getElementById('about-button').classList.add('chosen-button');
    document.getElementById(`stats-info${i}`).classList.add('d-none');
    document.getElementById(`about-info${i}`).classList.remove('d-none');

}

function makeCapitalLetter(word) {
    let newWord = word;
    newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1).toLowerCase();
    return newWord;
}

function findPokemon() {
    document.getElementById('pokemon-container').innerHTML = '';
    hideAllCards();
    document.getElementById('reset-button').classList.remove('d-none')
    document.getElementById('my-main').classList.add('my-main')
    let filterValue = document.getElementById('poke-input').value;
    let filteredPokemons = allPokemons.filter(pokemon => {
        let name = pokemon.name.toLowerCase();
        let id = pokemon.id.toString();

        return name.startsWith(filterValue) || id === filterValue;
    })
    document.getElementById('pokemon-container').innerHTML = '';
    filteredPokemons.forEach((pokemon, index) => {
        renderSingleCard(pokemon, index + 1);
    });

    document.getElementById('poke-input').value = "";
}

function hideAllCards() {
    for (let i = 1; i <= limitNumber; i++) {
        let card = document.getElementById(`single-small-container${i}`);
        if (card && !card.classList.contains('d-none')) {
            card.classList.add('d-none');
        }
    }
    document.getElementById('load-button').classList.add('d-none')
}

function resetFilter() {
    document.getElementById('pokemon-container').innerHTML = "";
    allPokemons.forEach((pokemon, index) => {
        renderSingleCard(pokemon, index + 1);
    });
    document.getElementById('load-button').classList.remove('d-none');
    document.getElementById('my-main').classList.remove('my-main')
    document.getElementById('reset-button').classList.add('d-none')
}