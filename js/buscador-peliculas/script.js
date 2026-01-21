const apiKey = "12667317";

const urlBase = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;

const inputSearch = document.getElementById("inputSearch");

const listaMovies = document.getElementById("listaMovies");

inputSearch.addEventListener("input", buscarPeliculas)

async function buscarPeliculas() {

    const inputTexto = inputSearch.value

    if (inputTexto.length > 2) {
        const url = urlBase + inputTexto;

        try {
            const response = await fetch(url);

            const data = await response.json();

            console.log(data.Search);

            renderizarMovies(data.Search);

        } catch (e) {
            console.log("error al consultar la api ERROR " + e);
        }
    } else {

        listaMovies.innerHTML = '';
    }
}

function renderizarMovies(moviesData) {

    listaMovies.innerHTML = '';


    moviesData.forEach(movie => {

        const liMovie = document.createElement('li')
        liMovie.classList.add('movie')

        liMovie.innerHTML = `
            <img src="${movie.Poster}">
            <h3>${movie.Title}</h3>
            <p>Año: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>`


        listaMovies.appendChild(liMovie)
    });
}
