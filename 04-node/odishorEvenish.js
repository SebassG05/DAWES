function oddishOrEvenish(num) {
   
    let suma = 0;
    for (let digit of num.toString()) {
        suma += parseInt(digit); 
    }
    if (suma % 2 === 0) {
        return "Evenish";
    } else {
        return "Oddish";
    }
}

console.log(oddishOrEvenish(121));  
console.log(oddishOrEvenish(41));   
console.log(oddishOrEvenish(43));   
console.log(oddishOrEvenish(373));  
console.log(oddishOrEvenish(4433));

