let nameSort = false;
let speciesSort = false;
let sexSort = false;
let ageSort = false;
let ownersSort = false;
var exoticArray = [];
var filteredArray = [];
let neutSort = false;
let limit = 10;

$(document).ready(function() {
    $.get("http://localhost/PawstoCare/jsonExotics.php", function(data){
            var myObj = JSON.parse(data);

            $.each(myObj, function(key, value) {
                let date = new Date(value.date);
                let ageDifm = Date.now() - date.getTime();
                value.date = Math.floor((ageDifm % 31536000000)/2628000000);

                exoticArray.push(value);
            });
            filteredArray = exoticArray;
            displayExotics(exoticArray);
    });
});

$('#exampleModalLong').on('show.bs.modal', function (data) {
    $('#modalBody').empty();

    let name = data.relatedTarget.parentNode.parentNode.cells[0].innerText;
    let exotic = exoticArray.find(function(val) {
        return val.name === name;
    });

    $.get('http://localhost/PawstoCare/getNote.php', {name: name, table: "exotics"}, function(data) {

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
    let exotic = exoticArray.find(function(val) {
        return val.name === name;
    });

    $.get('http://localhost/PawstoCare/getOwner.php', {name: name, table: "exotics"}, function(data) {

        let myObj = JSON.parse(data);

        $.each(myObj, function(key, value) {
            $('#modalOwners').append(`
                    <h5>${value.fname} ${value.lname}</h5>
                `);
        });
    });
  });

$('#Name').click(function() {
    if (!nameSort) {
        resetFilter();
        this.innerHTML = "Name &#9650;"
        filteredArray.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        displayExotics(filteredArray);
        nameSort = true;
        return;
    }
    resetFilter();
    this.innerHTML = "Name &#9660;"
    filteredArray.reverse();
    displayExotics(filteredArray);
});

$('#Species').click(function() {
    if (!speciesSort) {
        resetFilter();
        this.innerHTML = "Species &#9650;"
        filteredArray.sort(function(a, b) {
            if (a.species.toLowerCase() < b.species.toLowerCase()) return -1;
            if (a.species.toLowerCase() > b.species.toLowerCase()) return 1;
            return 0;
            return valueA > valueB;
        });
        displayExotics(filteredArray);
        speciesSort = true;
        return;
    }
    resetFilter();
    this.innerHTML = "Species &#9660;"
    filteredArray.reverse();
    displayExotics(filteredArray);
});

$('#Sex').click(function() {
    if (!sexSort) {
        resetFilter();
        this.innerHTML = "Sex &#9650;"
        filteredArray.sort(function(a, b) {
            if (a.sex.toLowerCase() < b.sex.toLowerCase()) return -1;
            if (a.sex.toLowerCase() > b.sex.toLowerCase()) return 1;
            return 0;
        });
        displayExotics(filteredArray);
        sexSort = true;
        return;
    }
    resetFilter();
    this.innerHTML = "Sex &#9660;"
    filteredArray.reverse();
    displayExotics(filteredArray);
});

$('#Age').click(function() {
    if (!ageSort) {
        resetFilter();
        this.innerHTML = "Age &#9650;"
        filteredArray.sort(function(a, b) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
        displayExotics(filteredArray);
        ageSort = true;
        return;
    }
    resetFilter();
    this.innerHTML = "Age &#9660;"
    filteredArray.reverse();
    displayExotics(filteredArray);
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
        displayExotics(filteredArray);
        neutSort = true;
        return;
    }
    resetFilter();
    this.innerHTML = "Neutered &#9660;"
    filteredArray.reverse();
    displayExotics(filteredArray);
});

function displayExotics(data, page = 0) {
    $('#exoticTable').empty();
    let rows = 0;
    for (let i = page; i < page + limit; i++) {
        if (i >= data.length) break;
        if (page >= data.length) break;
        let value = data[i];

        $('#exoticTable').append("<tr>");
        $.each(value, function(key2, value2){
            if (value2 == true && key2 != 'date') value2 = "&#10004";
            if (value2 == false && key2 != 'date') value2 = "&#10060";
            $('#exoticTable tr:last').append("<td>" + value2 + "</td>");
        });
        $('#exoticTable tr:last').append("<td>" + '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">Owners</button>' + "</td>");
        $('#exoticTable tr:last').append("<td>" + '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalLong"> Notes </button>' + "</td>");
        rows++;
        if (rows == limit) break;
    }

    $('.pagination').empty();
    let numOfPages = Math.ceil(data.length/limit);
    let pag = $('.pagination');

    createLinks(page, numOfPages, pag);

    $('.pageNum').click(function() {
        let page = (parseInt(this.innerHTML) - 1) * 10;
        displayExotics(filteredArray, page);
    });
};

$('#nameFilter').change(function(){
    let filter = this.value.toLowerCase();

    filteredArray = exoticArray.filter(exotic => exotic.name.toLowerCase().startsWith(filter));

    displayExotics(filteredArray);
});

$('#speciesFilter').change(function(){
    let filter = this.value.toLowerCase();

    filteredArray = exoticArray.filter(exotic => exotic.species.toLowerCase().startsWith(filter));

    displayExotics(filteredArray);
});

$('#sexFilter').change(function(){
    let filter = this.value.toLowerCase();

    filteredArray = exoticArray.filter(exotic => exotic.sex.toLowerCase().startsWith(filter));

    displayExotics(filteredArray);
});

$('#ageFilter').change(function(){
    let filter = this.value;
    if (filter == '') {
        displayExotics(exoticArray);
        return;
    }
    filter = parseInt(filter);
    filteredArray = exoticArray.filter(exotic => exotic.date === filter);

    displayExotics(filteredArray);
});

$('#neuteredFilter').change(function(){
    let filter = this.value.toLowerCase();

    filteredArray = exoticArray.filter(function(cat) {
        let sex;
        if (cat.neutered == true) sex = 'yes';
        else if (cat.neutered == false) sex = 'no';
        return sex.startsWith(filter);
    });

    displayExotics(filteredArray);
});

function resetFilter() {
    let row = $('#headers')[0];
    row.children[0].innerHTML = 'Name';
    row.children[1].innerHTML = 'Species';
    row.children[2].innerHTML = 'Sex';
    row.children[3].innerHTML = 'Neutered';
    row.children[4].innerHTML = 'Age';

    nameSort = false;
    speciesSort = false;
    sexSort = false;
    ageSort = false;
    ownersSort = false;
    neutSort = false;
}