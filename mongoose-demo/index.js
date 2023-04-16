const mongoose = require('mongoose');

const Cat = require('./models/Cat')


async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');

    console.log('Database Connected');

    const cats = await readCats();
    cats.forEach(cat => {
        cat.greet();
        console.log(cat.info);
    })
    // await saveCat('Abasdasdasd', 5, 'Debela');

    const catById = await Cat.find({ age: { $gt: 4 } });
    console.log(catById);

    //catById.name = 'Navcho';
    //await catById.save()
}

async function saveCat(name, age, breed) {
    await Cat.create({
        name: name,
        age: age,
        breed: breed,
    })

    /*const cat = new Cat({
        name: name,
        age: age,
        breed: breed
    });*/

    //await cat.save();

}

async function readCats() {
    const cats = await Cat.find();

    console.log(cats);

    return cats;
}


main();