const API_URL = "https://jsonplaceholder.typicode.com/users";

const datosUsuarios = document.getElementById("datosUsuarios");

const divModal = document.getElementById('modalVerMas');

const btnOcutalModal = document.getElementById('cerrarModal');

let modalUsername = document.getElementById('modalUsername');
let modalEmail = document.getElementById('modalEmail');
let modalPhone = document.getElementById('modalPhone');
let modalEmpresa = document.getElementById('modalEmpresa');
let modalSlogan = document.getElementById('modalSlogan');
let modalArea = document.getElementById('modalArea');
let modalCiudad = document.getElementById('modalCiudad');
let modalNombre = document.getElementById('modalNombre')

let usuariosFavoritos = JSON.parse(localStorage.getItem("usuariosFavoritos")) || [];

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

        const btnVerMas = document.createElement("button");
        btnVerMas.textContent = "Ver Más";
        btnVerMas.classList.add('btn', 'btn-success')

        const tdAcciones = document.createElement("td");
        tdAcciones.append(btnStar, btnVerMas);

        btnStar.addEventListener("click", function () {
            toggleFavorito(usuario.id);
        });

        if( usuariosFavoritos.includes(usuario.id)){
            btnStar.classList.add('activo')
        }

        btnVerMas.addEventListener("click", function () {
            console.log(`ver mas datos de ${usuario.username}`);
            divModal.classList.add( 'activo');

            //mostrar datos del usuario en el modal

            abrirModal(usuario);

        });

        tr.append(tdNombre, tdUsuario, tdEmail, tdTelefono, tdAcciones);

        datosUsuarios.appendChild(tr);
    });
}

function toggleFavorito(id) {
    if (usuariosFavoritos.includes(id)) {
        usuariosFavoritos = usuariosFavoritos.filter((favId) => favId !== id);
    } else {
        usuariosFavoritos.push(id);
    }

    localStorage.setItem("usuariosFavoritos", JSON.stringify(usuariosFavoritos));

    renderizarUsuarios();
}


btnOcutalModal.addEventListener("click", function () {
    console.log('ocutar modal');
    divModal.classList.remove('activo')

})


function abrirModal(user) {
    modalNombre.textContent = user.name
    modalUsername.textContent = user.username
    modalEmail.textContent = user.email
    modalPhone.textContent = user.phone
    modalEmpresa.textContent = user.company.name
    modalSlogan.textContent = user.company.catchPhrase
    modalArea.textContent = user.company.bs
    modalCiudad.textContent = user.address.city
}




