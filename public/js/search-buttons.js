

console.log('hlllo');

var titleButton = document.getElementById('titleButton');
var yearButton = document.getElementById('yearButton');
var genreButton = document.getElementById('genreButton');

var firstButton = document.querySelector('.first-button')
var secondButton = document.querySelector('.second-button')

var searchTitle = document.querySelector('.search-title');
var searchYear = document.querySelector('.search-year');
var searchGenre = document.querySelector('.search-genre');

var searchForm = document.getElementById('searchForm');


document.querySelectorAll('.searchButton').forEach(item => {
    item.addEventListener('click', event => {
        console.log("item.id: " + item.id);
        // Click Title button
        if(item.id == "titleButton") {
            minYear.value = "";
            maxYear.value="";
            // If Hidden
            if (window.getComputedStyle(searchTitle).display === "none") {
                searchTitle.classList.remove("d-none");
                searchYear.classList.add("d-none");
                searchGenre.classList.add("d-none");
                yearButton.classList.remove("active");
                genreButton.classList.remove("active");
            }
            // If Visible
            else {
                console.log('title now hidden');
                searchTitle.classList.add("d-none");
            }
        }
        // Click First buttons
        else {  
            movieTitle.value = "";
            console.log("search val: " + searchTitle);
            //set titleSearch value to null
            if (item.id == "yearButton") {
                if (window.getComputedStyle(searchYear).display === "none") {
                    searchYear.classList.remove("d-none");
                }
                else {
                    searchYear.classList.add("d-none");
                }
            }
            else if (item.id == "genreButton") {
                if (window.getComputedStyle(searchGenre).display === "none") {
                    searchGenre.classList.remove("d-none");
                }
                else {
                    searchGenre.classList.add("d-none");
                }
            }
            if (window.getComputedStyle(searchTitle).display === "block") {
                searchTitle.classList.add("d-none");
                titleButton.classList.remove("active");
            }
        }
    }); 
}); 

// document.getElementById("submitButton").addEventListener("click",function() {
//     console.log("hello");
//     searchForm.classList.add("d-none");
// });

