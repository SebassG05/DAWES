function sonAnagramas(palabra1, palabra2) {
   
    if (palabra1 === palabra2) {
        return false;
    }

 
    if (palabra1.length !== palabra2.length) {
        return false;
    }

    
    let palabra1Ordenada = palabra1.split('').sort().join('');
    let palabra2Ordenada = palabra2.split('').sort().join('');

    
    return palabra1Ordenada === palabra2Ordenada;
}


console.log(sonAnagramas('amor', 'roma')); 
console.log(sonAnagramas('hola', 'halo')); 
console.log(sonAnagramas('test', 'test')); 
