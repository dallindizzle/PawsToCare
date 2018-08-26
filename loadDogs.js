let nameSort = false;
let breedSort = false;
let sexSort = false;
let shotsSort = false;
let ageSort = false;
let sizeSort = false;
let ownersSort = false;
let neutSort = false;
var dogArray = [];
var filteredArray = [];
let limit = 10;

$(document).ready(function() {
    $.get("http://localhost/PawstoCare/jsonDogs.php", function(data){
        var myObj = JSON.parse(data);

        $.each(myObj, function(key, value) {

            let size;
            if (value.weight < 20) size = 'S';
            else if (value.weight < 50) size = 'M';
            else if (value.weight < 100) size = 'L';
            else if (value.weight >= 100) size = 'G';
            value.weight = size;

            let date = new Date(value.date);
            let ageDifm = Date.now() - date.getTime();
            value.date = Math.floor((ageDifm % 31536000000)/2628000000);

            dogArray.push(value);
        });
        filteredArray = dogArray;
        displayDogs(dogArray);
    });


    $('#exampleModalLong').on('show.bs.modal', function (data) {
        $('#modalBody').empty();

        let name = data.relatedTarget.parentNode.parentNode.cells[0].innerText;
        let dog = dogArray.find(function(val) {
            return val.name === name;
        });

        $.get('http://localhost/PawstoCare/getNote.php', {name: name, table: "dogs"}, function(data) {

            let myObj = JSON.parse(data);

            $.each(myObj, function(key, value) {
                $('#modalBody').append(`
                        <h5>${value.vetName}</h5>
                        <h5>${value.date}</h5>
                        <p>${value.note}</p>
                    `);
            });
        });
    })

    $('#exampleModal').on('show.bs.modal', function (data) {
        $('#modalOwners').empty();

        let name = data.relatedTarget.parentNode.parentNode.cells[0].innerText;
        let dog = dogArray.find(function(val) {
            return val.name === name;
        });

        $.get('http://localhost/PawstoCare/getOwner.php', {name: name, table: "dogs"}, function(data) {

            let myObj = JSON.parse(data);

            $.each(myObj, function(key, value) {
                $('#modalOwners').append(`
                        <h5>${value.fname} ${value.lname}</h5>
                    `);
            });
        });
    })

    $('#Name').click(function() {
        if (!nameSort) {
            resetFilter();
            this.innerHTML = "Name &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.name.toLowerCase(), b.name.toLowerCase());
            });
            displayDogs(filteredArray);
            nameSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Name &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Breed').click(function() {
        if (!breedSort) {
            resetFilter();
            this.innerHTML = "Breed &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.breed.toLowerCase(), b.breed.toLowerCase());
            });
            displayDogs(filteredArray);
            breedSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Breed &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Sex').click(function() {
        if (!sexSort) {
            resetFilter();
            this.innerHTML = "Sex &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.sex.toLowerCase(), b.sex.toLowerCase());
            });
            displayDogs(filteredArray);
            sexSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Sex &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Shots').click(function() {
        if (!shotsSort) {
            resetFilter();
            this.innerHTML = "Shots &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.shots.toLowerCase(), b.shots.toLowerCase());
            });
            displayDogs(filteredArray);
            shotsSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Shots &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Age').click(function() {
        if (!ageSort) {
            resetFilter();
            this.innerHTML = "Age &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.date, b.date);
            });
            displayDogs(filteredArray);
            ageSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Age &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Weight').click(function() {
        if (!sizeSort) {
            resetFilter();
            this.innerHTML = "Size &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.weight.toLowerCase(), b.weight.toLowerCase());
            });
            displayDogs(filteredArray);
            sizeSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Size &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Licensed').click(function() {
        if (!ownersSort) {
            resetFilter();
            this.innerHTML = "Licensed &#9650;"
            filteredArray.sort(function(a, b) {
                // if (a.licensed < b.licensed) return -1;
                // if (a.licensed > b.licensed) return 1;
                // return 0;
                return sortAsc(a.licensed.toLowerCase(), b.licensed.toLowerCase());
            });
            displayDogs(filteredArray);
            ownersSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Licensed &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    $('#Neutered').click(function() {
        if (!neutSort) {
            resetFilter();
            this.innerHTML = "Neutered &#9650;"
            filteredArray.sort(function(a, b) {
                if (a.neutered < b.neutered) return -1;
                if (a.neutered > b.neutered) return 1;
                return 0;
            });
            displayDogs(filteredArray);
            neutSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Neutered &#9660;"
        filteredArray.reverse();
        displayDogs(filteredArray);
    });

    function displayDogs(data, page = 0) {
        $('#dogTable').empty();
        let rows = 0;
        for (let i = page; i < page + limit; i++) {
            if (i >= data.length) break;
            if (page >= data.length) break;
            let value = data[i];

            $('#dogTable').append("<tr>");
            $.each(value, function(key2, value2){
                if (value2 == true && key2 != 'date' && key2 != 'weight') value2 = "&#10004";
                if (value2 == false && key2 != 'date' && key2 != 'weight') value2 = "&#10060";
                $('#dogTable tr:last').append("<td>" + value2 + "</td>");
            });
            $('#dogTable tr:last').append("<td>" + '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">Owners</button>' + "</td>");
            $('#dogTable tr:last').append("<td>" + '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalLong"> Notes </button>' + "</td>");
            rows++;
            if (rows == limit) break;
        }

        $('.pagination').empty();
        let numOfPages = Math.ceil(data.length/limit);
        let pag = $('.pagination');
        
        createLinks(page, numOfPages, pag);

        $('.pageNum').click(function() {
            let page = (parseInt(this.innerHTML) - 1) * 10;
            displayDogs(filteredArray, page);
        });
    };

    $('#nameFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(dog => dog.name.toLowerCase().startsWith(filter));

        displayDogs(filteredArray);
    });

    $('#breedFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(dog => dog.breed.toLowerCase().startsWith(filter));

        displayDogs(filteredArray);
    });

    $('#sexFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(dog => dog.sex.toLowerCase().startsWith(filter));

        displayDogs(filteredArray);
    });

    $('#shotsFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(function(dog) {
            let sex;
            if (dog.shots === true) sex = 'yes';
            if (dog.shots === false) sex = 'no';
            return sex.startsWith(filter);
        });

        displayDogs(filteredArray);
    });

    $('#ageFilter').change(function(){
        let filter = this.value;
        if (filter == '') {
            displayDogs(dogArray);
            filteredArray = dogArray;
            return;
        }
        filter = parseInt(filter);
        filteredArray = dogArray.filter(dog => dog.date === filter);

        displayDogs(filteredArray);
    });

    $('#licensedFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(function(dog) {
            let sex;
            if (dog.Licensed === 'True') sex = 'yes';
            if (dog.Licensed === 'False') sex = 'no';
            return sex.startsWith(filter);
        });

        displayDogs(filteredArray);
    });

    $('#neutFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(function(dog) {
            let sex;
            if (dog.neutered == true) sex = 'yes';
            else if (dog.neutered == false) sex = 'no';
            return sex.startsWith(filter);
        });

        displayDogs(filteredArray);
    });

    $('#ownerFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = dogArray.filter(dog => dog.Owners.toLowerCase().startsWith(filter));

        displayDogs(filteredArray);
    });

    function resetFilter() {
        let row = $('#headers')[0];
        row.children[0].innerHTML = 'Name';
        row.children[1].innerHTML = 'Breed';
        row.children[2].innerHTML = 'Sex';
        row.children[3].innerHTML = 'Shots';
        row.children[4].innerHTML = 'Licensed';
        row.children[5].innerHTML = 'Neutered';
        row.children[6].innerHTML = 'Age'
        row.children[7].innerHTML = 'Weight';

        nameSort = false;
        breedSort = false;
        sexSort = false;
        shotsSort = false;
        ageSort = false;
        sizeSort = false;
        ownersSort = false;
        neutSort = false;
    }
});