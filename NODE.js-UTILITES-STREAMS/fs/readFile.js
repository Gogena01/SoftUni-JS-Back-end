const fs = require('fs');
const fsp = require('fs/promises')

//Synchronous reading from file
const text = fs.readFileSync('./data.txt', { encoding: 'utf-8' });
console.log('Reading from file');
console.log(text);


//Asynchronous reading from file
fs.readFile('./data.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        return;
    }

    console.log(data);
});
console.log('Reading from file');


//Asynchronous reading with promise
fsp.readFile('./data.txt', { encoding: 'utf-8' })
    .then(result => {
        console.log(result);
    })
console.log('Reading from file')