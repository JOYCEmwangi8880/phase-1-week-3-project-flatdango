

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((films) =>
        films.forEach((film) => {
          movieTitles(film);
        })
      );
  });
  // rendering the movie titles from the payload
  function movieTitles(film) {
    let ul = document.querySelector(".movie-titles");
    let li = document.createElement("li");
    li.innerHTML = film.title;
    li.className = `movie-title`;
    let liStyles = `
      list-style-type:none;
      color:white; 
      margin-top: 20px;
      font-weight:bolder;
      margin-top:20px;
        `;
    li.style.cssText = liStyles;
    ul.appendChild(li);
    li.addEventListener("click", () => {
      renderMovieDetails(film);
    });
  }
  // rendering movie details from the payload
  function renderMovieDetails(film) {
    let img = document.querySelector(".card-img-top");
    img.src = film.poster;
    img.alt = film.title;
    let title = document.getElementById("title");
    title.innerText = `MOVIE TITLE: ${film.title.toUpperCase()}`;
    let runtime = document.getElementById("runtime");
    runtime.innerText = `RUNTIME MINUTES: ${film.runtime}`;
    let description = document.getElementById("description");
    description.innerText = `MOVIE DESCRIPTION: ${film.description}`;
    let showtime = document.getElementById("showtime");
    showtime.innerText = ` ${film.showtime}`;
    showtime.innerText = `SHOWTIME: ${film.showtime}`;
    let remainingTicket = document.getElementById("remaining-ticket");
    let capacity = film.capacity;
    let totalSold = film.tickets_sold;
    remainingTicket.innerText = `${capacity - totalSold}`;
    // new buy-ticket button
    // if the button already exist it will be removed
    if (document.getElementById("buy-ticket")) {
      document.getElementById("buy-ticket").remove();
    }
    // creating a new button
    let buyTicketWrapper = document.getElementById("ticket-content");
    let buyTicket = document.createElement("button");
    buyTicket.id = "buy-ticket";
    buyTicket.innerText = `Buy Ticket`;
    buyTicketWrapper.appendChild(buyTicket);
    console.log(buyTicket);
    //  adding a click event to the button
    buyTicket.addEventListener("click", () => {
      remainingTicket = document.getElementById("remaining-ticket");
      // converting remainingTickect from a sring to a number
      let numOfRemainingTicket = Number(remainingTicket.innerText);
      if (numOfRemainingTicket < 1) {
        buyTicket.innerText = `SOLD OUT`;
        remainingTicket.innerText = " NO ";
        buyTicket.disabled = true;
      } else {
        // remainingTicket
        let ans = numOfRemainingTicket - 1;
        remainingTicket.innerText = ans;
      }
    });
  }


