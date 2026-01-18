const API_URL = "https://jsonplaceholder.typicode.com/users";

const datosUsuarios = document.getElementById("datosUsuarios");

let usuariosFavoritos =
    JSON.parse(localStorage.getItem("usuariosFavoritos")) || [];

let usuarios = [];

async function obtenerDatosAPI() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        usuarios = data;

        renderizarUsuarios();
        console.log(data);
    } catch (e) {
        console.error("No se pudo acceder a la API ERROR:" + e);
    }
}

obtenerDatosAPI();

function renderizarUsuarios() {
    datosUsuarios.innerHTML = "";

    usuarios.forEach((usuario) => {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = usuario.name;

        const tdUsuario = document.createElement("td");
        tdUsuario.textContent = usuario.username;

        const tdEmail = document.createElement("td");
        tdEmail.textContent = usuario.email;

        const tdTelefono = document.createElement("td");
        tdTelefono.textContent = usuario.phone;

        const btnStar = document.createElement("button");
        btnStar.textContent = "★";
        btnStar.classList.add("btn", "btn-star");
        btnStar.setAttribute("aria-label", "Agregar a favoritos");

        const tdAcciones = document.createElement('td');
        tdAcciones.appendChild(btnStar);

        btnStar.addEventListener("click", function () {
            toggleFavorito(usuario.id);
        });

        tr.append(tdNombre, tdUsuario, tdEmail, tdTelefono, tdAcciones);

        datosUsuarios.appendChild(tr);
    });
}

function toggleFavorito(id) {

    if (usuariosFavoritos.includes(id)) {
        usuariosFavoritos = usuariosFavoritos.filter( favId => favId !== id );
    } else {
        usuariosFavoritos.push(id);
    }

    localStorage.setItem('usuariosFavoritos',JSON.stringify( usuariosFavoritos));

    renderizarUsuarios();


}
