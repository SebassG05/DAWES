import other from "./app.js";

async function start() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()
    data.results.map(pkm =>{
        console.log(pkm.name) 
    })
    
}

start()