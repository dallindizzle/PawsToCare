let sortAsc =  function (a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

let filterString = function(str, filter) {
    return str.startsWith(filter);
}

let filterBool = function(val, filter) {
    return val == filter;
}

let createLinks = function(page, numOfPages, element) {
    let p = page / 10;
    let curPage = p;
    if (curPage == 0) element.append('<li class="page-item active"><a class="page-link pageNum" href="#">1</a></li>&nbsp&nbsp');
    else element.append('<li class="page-item"><a class="page-link pageNum" href="#">1</a></li>&nbsp&nbsp');
    if (p < 9) p = 9;

    for (let i = p - 8; i < p + 7; i++){
        if ( i >= numOfPages - 1) break;
        if (i == curPage) element.append(`<li class="page-item active"><a class="page-link pageNum" href="#">${i+1}</a></li>`)
        else element.append(`<li class="page-item"><a class="page-link pageNum" href="#">${i+1}</a></li>`)
    }
    if (curPage == numOfPages - 1) element.append(`&nbsp&nbsp<li class="page-item active"><a class="page-link pageNum" href="#">${numOfPages}</a></li>`);
    else element.append(`&nbsp&nbsp<li class="page-item"><a class="page-link pageNum" href="#">${numOfPages}</a></li>`);
}