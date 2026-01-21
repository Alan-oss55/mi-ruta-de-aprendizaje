const apiKey = "12667317";

const urlBase = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;

const inputSearch = document.getElementById("inputSearch");

inputSearch.addEventListener("input", () => {
    buscarPeliculas(inputSearch.value);
});

async function buscarPeliculas(texto) {

    if (texto.length > 2) {
        const url = urlBase + texto;

        try {
            const response = await fetch(url);

            const data = await response.json();

            console.log(data.Search);

            renderizarMovies(data.Search);

        } catch (e) {
            console.log("error al consultar la api ERROR " + e);
        }
    }
}

function renderizarMovies(moviesData) {
    const listaMovies = document.getElementById("listaMovies");

    listaMovies.innerHTML = '';


    moviesData.forEach(movie => {

        const liMovie = document.createElement('li')
        liMovie.classList.add('movie')

        liMovie.innerHTML = `
            <img src="${movie.Poster}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}<p>
            <p>${movie.Type}</p>`


        listaMovies.appendChild(liMovie)
    });
}
