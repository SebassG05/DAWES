const fizzBuzz = require('../fizzbuzz');

test('returns correct FizzBuzz sequence for range 1 to 5', () => {
    expect(fizzBuzz(1, 5)).toEqual(['1', '2', 'Fizz', '4', 'Buzz']);
});

test('returns correct FizzBuzz sequence for range 10 to 15', () => {
    expect(fizzBuzz(10, 15)).toEqual(['Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']);
});

test('returns correct FizzBuzz sequence for range 1 to 15', () => {
    expect(fizzBuzz(1, 15)).toEqual(['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']);
});