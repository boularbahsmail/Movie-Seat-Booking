/*
    Name : Movie Seat Booking System
    Author : Ismail Boularbah
    Date : 03 / 02 / 2021
    Languages used : HTML CSS JS
    Copyright : BOULARBAH ISMAIL 2021
*/

// Tools
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const body = document.body;
const author_name = document.querySelector('.author-name');

// Seconds before display the body
setTimeout(function() {
    body.style.opacity = "1";
}, 200);

// Get current year
let time = new Date();
let year = time.getFullYear();
// Author name
author_name.innerHTML = `${year} &copy; Made with ❤️ by BOULARBAH ISMAIL`;

// Yields as a string but we can use + to convert it to an int (same thing as parseInt)
let ticketPrice = +movieSelect.value;

//Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
const updateSelectedCount = () => {
    // Query only selected seats in row
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // Copy selected seats into an array
    // Map through array
    // Return new array of indexes

    // convert node list into just a reg array
    // Spread operators, will take the VALUES and put them into the array
    let seatsIndex = [...selectedSeats];

    seatsIndex = seatsIndex.map(function(seat){
        // Search thorugh all the seats that a re not occupied (created an array of that) 
        // and look for the index of the seats that are selected one by one, create an array of those indexes
        return [...seats].indexOf(seat); // IndexOfSelected seats
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Node list length of returned selected seats
    const selectedSeatsCount = selectedSeats.length;

    // Replace counters
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

populateUI();

// Movie select event
movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value; // Reassign ticket price when we change
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        // Update Selected Seats item
        updateSelectedCount();
    }
})

// Initial count and total
updateSelectedCount();