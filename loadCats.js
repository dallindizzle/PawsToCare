let nameSort = false;
let breedSort = false;
let sexSort = false;
let shotsSort = false;
let ageSort = false;
let declawedSort = false;
let neutSort = false;
var catArray = [];
var filteredArray = [];
let limit = 10;

$(document).ready(function() {
    $.get("http://localhost/PawstoCare/jsonCats.php", function(data){
            var myObj = JSON.parse(data);

            $.each(myObj, function(key, value) {
                let date = new Date(value.birthdate);
                let ageDifm = Date.now() - date.getTime();
                value.birthdate = Math.floor((ageDifm % 31536000000)/2628000000);
                // Can you see this?
                catArray.push(value);
            });
            filteredArray = catArray;
            displayCats(catArray);
    });


    $('#exampleModalLong').on('show.bs.modal', function (data) {
        $('#modalBody').empty();

        let name = data.relatedTarget.parentNode.parentNode.cells[0].innerText;
        let cat = catArray.find(function(val) {
            return val.name === name;
        });

        $.get('http://localhost/PawstoCare/getNote.php', {name: name, table: "cats"}, function(data) {

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
        let cat = catArray.find(function(val) {
            return val.name === name;
        });

        $.get('http://localhost/PawstoCare/getOwner.php', {name: name, table: "cats"}, function(data) {
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
            displayCats(filteredArray);
            nameSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Name &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    $('#Breed').click(function() {
        if (!breedSort) {
            resetFilter();
            this.innerHTML = "Breed &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.breed.toLowerCase(), b.breed.toLowerCase());
            });
            displayCats(filteredArray);
            breedSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Breed &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    $('#Sex').click(function() {
        if (!sexSort) {
            resetFilter();
            this.innerHTML = "Sex &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.sex.toLowerCase(), b.sex.toLowerCase());
            });
            displayCats(filteredArray);
            sexSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Sex &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    $('#Shots').click(function() {
        if (!shotsSort) {
            resetFilter();
            this.innerHTML = "Shots &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.shots.toLowerCase(), b.shots.toLowerCase());
            });
            displayCats(filteredArray);
            shotsSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Shots &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    $('#Declawed').click(function() {
        if (!declawedSort) {
            resetFilter();
            this.innerHTML = "Declawed &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.declawed.toLowerCase(), b.declawed.toLowerCase());
            });
            displayCats(filteredArray);
            declawedSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Declawed &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    $('#Neutered').click(function() {
        if (!neutSort) {
            resetFilter();
            this.innerHTML = "Neutered &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.neutered.toLowerCase(), b.neutered.toLowerCase());
            });
            displayCats(filteredArray);
            neutSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Neutered &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    $('#Age').click(function() {
        if (!ageSort) {
            resetFilter();
            this.innerHTML = "Age &#9650;"
            filteredArray.sort(function(a, b) {
                return sortAsc(a.birthdate.toLowerCase(), b.birthdate.toLowerCase());
            });
            displayCats(filteredArray);
            ageSort = true;
            return;
        }
        resetFilter();
        this.innerHTML = "Age &#9660;"
        filteredArray.reverse();
        displayCats(filteredArray);
    });

    function displayCats(data, page = 0) {
        $('#catTable').empty();
        let rows = 0;
        for (let i = page; i < page + limit; i++) {
            if (i >= data.length) break;
            if (page >= data.length) break;
            let value = data[i];

            $('#catTable').append("<tr>");
            $.each(value, function(key2, value2){
                if (value2 == true && key2 != 'birthdate') value2 = "&#10004";
                if (value2 == false && key2 != 'birthdate') value2 = "&#10060";
                $('#catTable tr:last').append("<td>" + value2 + "</td>");
            });
            $('#catTable tr:last').append("<td>" + '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">Owners</button>' + "</td>");
            $('#catTable tr:last').append("<td>" + '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalLong"> Notes </button>' + "</td>");
            rows++;
            if (rows == limit) break;
        }

        $('.pagination').empty();
        let numOfPages = Math.ceil(data.length/limit);
        let pag = $('.pagination');

        createLinks(page, numOfPages, pag);
          
        $('.pageNum').click(function() {
            let page = (parseInt(this.innerHTML) - 1) * 10;
            displayCats(filteredArray, page);
        });
    };

    $('#nameFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = catArray.filter(cat => filterString(cat.name.toLowerCase(), filter));

        displayCats(filteredArray);
    });

    $('#BreedFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = catArray.filter(cat => filterString(cat.breed.toLowerCase(), filter));


        displayCats(filteredArray);
    });

    $('#sexFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = catArray.filter(cat => filterString(cat.sex.toLowerCase(), filter));

        displayCats(filteredArray);
    });

    $('#shotsFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = catArray.filter(function(cat) {
            let sex;
            if (cat.shots == true) sex = 'yes';
            else if (cat.shots == false) sex = 'no';
            return sex.startsWith(filter);
        });

        displayCats(filteredArray);
    });

    $('#decFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = catArray.filter(function(cat) {
            let sex;
            if (cat.declawed == true) sex = 'yes';
            else if (cat.declawed == false) sex = 'no';
            return sex.startsWith(filter);
        });

        displayCats(filteredArray);
    });

    $('#neutFilter').change(function(){
        let filter = this.value.toLowerCase();

        filteredArray = catArray.filter(function(cat) {
            let sex;
            if (cat.neutered == true) sex = 'yes';
            else if (cat.neutered == false) sex = 'no';
            return sex.startsWith(filter);
        });

        displayCats(filteredArray);
    });

    $('#ageFilter').change(function(){
        let filter = this.value;

        if (filter == '') {
            displayCats(catArray);
            filteredArray = catArray;
            return;
        }
        filter = parseInt(filter);
        filteredArray = catArray.filter(cat => cat.birthdate === filter);

        displayCats(filteredArray);
    });

    function resetFilter() {
        let row = $('#headers')[0];
        row.children[0].innerHTML = 'Name';
        row.children[1].innerHTML = 'Breed';
        row.children[2].innerHTML = 'Sex';
        row.children[3].innerHTML = 'Shots';
        row.children[4].innerHTML = 'Declawed';
        row.children[5].innerHTML = 'Neutered';
        row.children[6].innerHTML = 'Age';
        nameSort = false;
        breedSort = false;
        sexSort = false;
        shotsSort = false;
        ageSort = false;
        declawedSort = false;
        neutSort = false;

    }
});