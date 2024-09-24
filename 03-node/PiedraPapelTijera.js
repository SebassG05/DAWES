let piedra = 0
let papel = 1
let tijera = 2

let player = 2
let machine= Math.floor(Math.random()*3)

if(player === 1 && machine === 1 || player === 2 && machine === 2 || player === 0 && machine === 0){
    console.log('HAS EMPATAO MAQUINA')
}else if(player === 0 && machine === 2 || player === 1 && machine === 0 || player === 2 && machine === 1){
    console.log('HAS GANAO ')
}else if(machine === 0 && player === 2 || machine === 1 && player === 0 || player === 2 && machine === 1){
    console.log('HA GANAO LA MAQUINA QUE PRINGAO')
}



