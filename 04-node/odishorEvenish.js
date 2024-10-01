function oddishOrEvenish(num) {

    const suma = num.toString()
                     .split('')        
                     .map(Number)     
                     .reduce((acc, curr) => acc + curr, 0); 

    return suma % 2 === 0 ? "Evenish" : "Oddish";
}


console.log(oddishOrEvenish(121));  
console.log(oddishOrEvenish(41));   
console.log(oddishOrEvenish(43));   
console.log(oddishOrEvenish(373));  
console.log(oddishOrEvenish(4433)); 
