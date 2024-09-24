let n1 = 10

for(let i = 1; i<n1; i++){

    for(let j = n1; j > i; j--){
        process.stdout.write('*')
    }
    console.log()
}