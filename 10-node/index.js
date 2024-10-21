import other from "./other.js";

async function start() {
    const response = await fetch('https://pokeapi.co/')
    const data = await response.json()
    data.results.map(pkm =>{
        return pkm.url
    })
    console.log(data)
}