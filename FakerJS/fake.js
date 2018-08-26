let catBreeds = ['British Shorthair', 'Maine Coon', 'Korat', 'Korean Bobtail', 'Manx', 'Munchkin', 'Ocicat', 'Oriental Longhair', 'Persian', 'Ragdoll', 'Tabby', 'Sphynx', 'Black'];
let dogBreeds = ['Beagle', 'Belgian Malinois', 'Bearded Collie', 'Canaan Dog', 'Cane Corso', 'Caucasian Shepard Dog', 'Cockapoo', 'Dalmation', 'Dachshund', 'German Shepard', 'Saluki', 'Shiba Inu', 'Whippet'];
let exoticSpecies = ['Guinea Pig', 'Donkey', 'Duck', 'Rabbit', 'Ferret', 'Goldfish', 'Koi', 'Hedgehob', 'Parakeet', 'Mouse', 'Rat', 'Gerbil', 'Chinchilla', 'Suar Glider'];
let sexes = ['F', 'M'];
let lorem = "Voluptate excepteur qui ex proident in culpa cillum commodo ex minim Lorem amet ex ut. Eu eiusmod culpa dolor ipsum ea non nostrud exercitation reprehenderit et est commodo deserunt nostrud. Et aliqua cupidatat ut tempor dolore dolor eu labore. Non aute consectetur aliqua sint duis. Cillum tempor veniam nisi dolore commodo fugiat laborum incididunt id adipisicing commodo velit. Consectetur id anim nulla enim cupidatat id.";
let owners = [];

let entries = 1000;

for (let i = 0; i < entries; i++) {
    let add2 = null;
    if (Math.random() * 100 < 25) add2 = faker.address.secondaryAddress();
    owners.push({firstName: faker.name.firstName(), lastName: faker.name.lastName(), add1: faker.address.streetAddress(), add2: add2, city: faker.address.city(), st: faker.address.stateAbbr(), zip: faker.address.zipCode()});
}

function createNames() {
    for (let i = 0; i < entries; i++) {
        let name = faker.name.firstName();
        let breed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
        let sex = sexes[Math.floor(Math.random() * sexes.length)];
        let shots = faker.random.boolean();
        let declawed = faker.random.boolean();
        let neutered = faker.random.boolean();
        let date = formatDate(faker.date.past());

        $.get('http://localhost/PawstoCare/Faker/fakeCats.php', {name: name, breed: breed, sex: sex, shots: shots, declawed: declawed, neutered: neutered, date: date}, function(data) {
            document.getElementById("cats").innerHTML = data;
        });

        //console.log(name + " " + breed + " " + sex + " " + shots + " " + declawed + " " + neutered + " " + date);

    }

    for (let i = 0; i < entries; i++){
        let name = faker.name.firstName();
        let breed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
        let sex = sexes[Math.floor(Math.random() * sexes.length)];
        let shots = faker.random.boolean();
        let licensed = faker.random.boolean();
        let neutered = faker.random.boolean();
        let date = formatDate(faker.date.past());
        let weight = Math.random() * 150;

        $.get('http://localhost/PawstoCare/Faker/fakeDogs.php', {name: name, breed: breed, sex: sex, shots: shots, licensed: licensed, neutered: neutered, date: date, weight: weight}, function(data) {
            document.getElementById("dogs").innerHTML = data;
        });
    }

    for (let i = 0; i < entries; i++) {
        let name = faker.name.firstName();
        let species = exoticSpecies[Math.floor(Math.random() * exoticSpecies.length)];
        let sex = sexes[Math.floor(Math.random() * sexes.length)];
        let neutered = faker.random.boolean();
        let date = formatDate(faker.date.past());

        $.get('http://localhost/PawstoCare/Faker/fakeExotics.php', {name: name, species: species, sex: sex, neutered: neutered, date: date}, function(data) {
            document.getElementById("exotics").innerHTML = data;
        });
    }

    for (let i = 0; i < entries; i++) {
        let catsFk = Math.random() * entries;
        let vetName = faker.name.findName();
        let date = formatDate(faker.date.past());
        let note = lorem.substr(Math.random() * lorem.length / 2, Math.random() * lorem.length);

        $.get('http://localhost/PawstoCare/Faker/fakeCatNotes.php', {catsFk: catsFk, vetName: vetName, date: date, note: note}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }
    for (let i = 0; i < entries; i++) {
        let catsFk = Math.random() * entries;
        let vetName = faker.name.findName();
        let date = formatDate(faker.date.past());
        let note = lorem.substr(Math.random() * lorem.length / 2, Math.random() * lorem.length);

        $.get('http://localhost/PawstoCare/Faker/fakeDogNotes.php', {catsFk: catsFk, vetName: vetName, date: date, note: note}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }
    for (let i = 0; i < entries; i++) {
        let catsFk = Math.random() * entries;
        let vetName = faker.name.findName();
        let date = formatDate(faker.date.past());
        let note = lorem.substr(Math.random() * lorem.length / 2, Math.random() * lorem.length);

        $.get('http://localhost/PawstoCare/Faker/fakeExoticNotes.php', {catsFk: catsFk, vetName: vetName, date: date, note: note}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }
    for (let i = 0; i < entries; i++) {
        let catsFk = Math.random() * entries;
        let vetName = faker.name.findName();
        let date = formatDate(faker.date.past());
        let note = lorem.substr(Math.random() * lorem.length / 2, Math.random() * lorem.length);

        $.get('http://localhost/PawstoCare/Faker/fakeOwnerNotes.php', {catsFk: catsFk, vetName: vetName, date: date, note: note}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }

    for (let i = 0; i < entries; i++) {
        let first = owners[i].firstName;
        let last = owners[i].lastName;
        let add1 = owners[i].add1;
        let add2 = owners[i].add2;
        let city = owners[i].city;
        let state = owners[i].st;
        let zip = owners[i].zip.slice(0, 5);

        $.get('http://localhost/PawstoCare/Faker/fakeOwners.php', {first: first, last: last, add1: add1, add2: add2, city: city, state: state, city: city, state: state, zip: zip}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }

    for (let i = 0; i < entries; i++) {
        let catsFk = i;
        let ownersFk = Math.floor(Math.random() * Math.floor(entries));

        $.get('http://localhost/PawstoCare/Faker/fakeCatOwners.php', {catsFk: catsFk, ownersFk: ownersFk}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }
    for (let i = 0; i < entries; i++) {
        let catsFk = i;
        let ownersFk = Math.floor(Math.random() * Math.floor(entries));

        $.get('http://localhost/PawstoCare/Faker/fakeDogOwners.php', {catsFk: catsFk, ownersFk: ownersFk}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }
    for (let i = 0; i < 600; i++) {
        let catsFk = i;
        let ownersFk = Math.floor(Math.random() * Math.floor(entries));

        $.get('http://localhost/PawstoCare/Faker/fakeExoticOwners.php', {catsFk: catsFk, ownersFk: ownersFk}, function(data) {
            document.getElementById("catNotes").innerHTML = data;
        });
    }

    document.getElementById("done").innerHTML = "Done";
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}