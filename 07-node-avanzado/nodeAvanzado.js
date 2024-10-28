let pokemons = [];

const getPokemons = async () => {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error por manco ", error);
    }
};

const showPokemons = async () => {
    characters = await getPokemons();
    if (characters) {
        characters.results.forEach((character, index) => {
            console.log(`${index + 1}. ${character.name}`);
        });
    } else {
        console.log("No hay pokemons");
    }
};

showPokemons();
