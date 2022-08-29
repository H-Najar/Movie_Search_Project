// Here is your key: be395da6

// Please append it to all of your API requests,

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=be395da6

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=be395da6`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
      <div class = "search-item-thumbnail">
          <img src = "${moviePoster}">
      </div>
      <div class = "search-item-info">
          <h3>${movies[idx].Title}</h3>
          <p>${movies[idx].Year}</p>
      </div>
      `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=be395da6`
      );
      const movieDetails = await result.json();
      displayMovieDetails(movieDetails);
    });
  });
}

function showAlert() {
  alert("You favorited this movie!");
}

let userSection = document.querySelector(".movie-notes");
let isShow = true;

function showHideNotes() {
  if (isShow) {
    userSection.style.display = "none";
    isShow = false;
  } else {
    userSection.style.display = "block";
    isShow = true;
  }
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class="movie-poster">
    <img src="${
      details.Poster != "N/A" ? details.Poster : "image_not_found.png"
    }" alt="movie poster">
  </div>
  <div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
        <li class="year">${details.Year}</li>
        <li class="rated">Ratings: ${details.Rated}</li>
        <li class="released">Released: ${details.Released}</li>
    </ul>
    <p class="genre"><b>Genre:</b> ${details.Genre}</p>
    <p class="writter"><b>Writer:</b> ${details.Writter}</p>
    <p class="actors"><b>Actors:</b> ${details.Actors}</p>
    <p class="plot"><b>Plot:</b> ${details.Plot}
    </p>
    <p class="language"><b>Langauge:</b> ${details.Language}</p>
    <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
    <br>
    <button onclick="showAlert()" id="fav_buttons">Favorite</button>
<br><br>


<button onclick="showHideNotes()" id="notes_buttons">Movie Notes Show/Hide</button>
  
<br><br>

<section class="movie-notes">
<div class="">
    <form class='comment-form'>
    <label for="name">Name: </label>
    <input type="text" id='name'> <br>
    <label for="email">Email: </label>
    <input type="text" id='email'><br>
    <label for="new-comment-field">Comment: </label>
    <input type="text" id='new-comment-field'/><br><br>
    <button class="comment_submit" type='submit'>Post</button><br>
  </form>
  </div>
    </section>

  </div>


  `;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
