var tooltipTriggerList = Array.from(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  new bootstrap.Tooltip(tooltipTriggerEl);
});

//------------------------------------------------------------------
const searchIcon = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#input");
const searchBtn = document.querySelector("#button");
const searchForm = document.querySelector("#searchPart");
const loadingEl = document.querySelector("#loading");
const card = document.querySelector("#cards");

async function getMovies(movie) {
  let apiKey = "53f871c3";
  loadingEl.style.display = "block";
  try {
    let response = await fetch(
      `https://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`
    );

    let data = await response.json();
    // console.log(data);
    if(data.Response  === "True"){
      displayMovies(data);
    }
  
    else{
      card.innerHTML = "";
      document.querySelector(".container").innerHTML = `<h1 class="text-center">No Movies Found</h1>`;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingEl.style.display = "none"; 
  }
}

function displayMovies(movies) {

  card.innerHTML = movies.Search.map((el) => {
    return `

    <div class="col-4 gap-5">
          <div class="card">
            <img
          src="${el.Poster === 'N/A' ? 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg' : el.Poster}"

              class="card-img-top"
              // height="450px"
          
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${el.Title}</h5>
              <h6 class="card-subtitle mb-2 ">${el.Year}</h6>
            </div>
          </div>
        </div>
    `;
  }).join("");
}

getMovies("Harry Potter");

searchIcon.addEventListener("click", () => {
  searchIcon.style.display = "none";
  searchForm.style.display = "flex";
  searchForm.style.gap = "5px";
  searchInput.style.display = "block";
  searchBtn.style.display = "block";
});

searchBtn.addEventListener("click", () => {


  getMovies(searchInput.value);
  searchInput.value = "";
});


searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
   
    getMovies(searchInput.value);
    searchInput.value = "";
  }
});

