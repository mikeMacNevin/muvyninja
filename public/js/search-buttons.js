

console.log('hlllo');

var titleButton = document.getElementById('titleButton');
var yearButton = document.getElementById('yearButton');
var genreButton = document.getElementById('genreButton');


var searchTitle = document.querySelector('.search-title');
var searchYear = document.querySelector('.search-year');
var searchGenre = document.querySelector('.search-genre');

document.querySelectorAll('.searchButton').forEach(item => {
    item.addEventListener('click', event => {
        console.log(item.id);
        if(item.id == "titleButton") {
            if (window.getComputedStyle(searchTitle).display === "none") {
                searchTitle.classList.remove("d-none");
                 console.log("hidden");    
            }
            else {
                console.log('not hidden');
                searchTitle.classList.add("d-none");
                }
        }
        else if(item.id == "yearButton") {
            if (window.getComputedStyle(searchYear).display === "none") {
                searchYear.classList.remove("d-none");
                 console.log("hidden");    
            }
            else {
                console.log('not hidden');
                searchYear.classList.add("d-none");
            }
        }
        else if(item.id == "genreButton") {
            if (window.getComputedStyle(searchGenre).display === "none") {
                searchGenre.classList.remove("d-none");
                 console.log("hidden");    
            }
            else {
                console.log('not hidden');
                searchGenre.classList.add("d-none");
            }
        }
    }) 
});     




// titleButton.addEventListener('click', function(e) {
//     console.log(e);
//     console.log('clicked it');

//     if (window.getComputedStyle(searchTitle).display === "none") {
//         console.log("hidden");
//         searchTitle.classList.remove("d-none");
//     }
//     else {
//         console.log('not hidden');
//         searchTitle.classList.add("d-none");
//     }
// });
// yearButton.addEventListener('click', function(e) {
//     console.log(e);
//     console.log('clicked it');

//     if (window.getComputedStyle(searchYear).display === "none") {
//         console.log("hidden");
//         searchYear.classList.remove("d-none");
//     }
//     else {
//         console.log('not hidden');
//         searchYear.classList.add("d-none");
//     }
   
// })
// genreButton.addEventListener('click', function(e) {
 
// })
