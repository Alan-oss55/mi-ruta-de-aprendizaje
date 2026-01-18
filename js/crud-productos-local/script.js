const btnAgregar = document.getElementById("agregarProducto");
const tablaProductos = document.getElementById("datosProductos");
const containerFormProduct = document.getElementById("container-form-product");
const visualizarProductos = document.getElementById("visualizarProductos");
const btnGuardarProducto = document.getElementById("guardarProducto");
const h1Form = document.getElementById('h1Form');

let nombreProducto = document.getElementById("nombreProducto");
let categoriaProducto = document.getElementById("categoriaProducto");
let precioProducto = document.getElementById("precioProducto");

let indiceEncontrado = null;
let productos = [];

const productosGuardados = localStorage.getItem("productos");

if (productosGuardados) productos = JSON.parse(productosGuardados);

renderizarProductos();

btnAgregar.addEventListener("click", function () {
  h1Form.textContent = 'Registrar un nuevo producto'
  nombreProducto.value = "";
  categoriaProducto.value = 0;
  precioProducto.value = "";
  visualizarProductos.setAttribute("hidden", true);
  containerFormProduct.removeAttribute("hidden");
});

btnGuardarProducto.addEventListener("click", function (e) {
  e.preventDefault();
  let precioTexto = precioProducto.value.replace(",", ".");
  let precio = Number(precioTexto);

  if (nombreProducto.value.trim() === "") return alert("Nombre inválido");

  if (categoriaProducto.value === "0") return alert("Categoría inválida");

  if (isNaN(precio) || precio <= 0)
    return alert("Precio del producto invalido");

  let nuevoProducto = {
    nombre: nombreProducto.value,
    precio: precio,
    categoria: categoriaProducto.options[categoriaProducto.selectedIndex].text,
  };

  if (indiceEncontrado === null) {
    productos.push(nuevoProducto);
  } else {
    productos[indiceEncontrado] = nuevoProducto;
    indiceEncontrado = null;
  }

  let productoToJson = JSON.stringify(productos);

  localStorage.setItem("productos", productoToJson);

  visualizarProductos.hidden = false;
  containerFormProduct.hidden = true;

  renderizarProductos();
});

function renderizarProductos() {
  tablaProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.textContent = index + 1;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;

    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = producto.precio.toFixed(2);

    const tdCategoria = document.createElement("td");
    tdCategoria.textContent = producto.categoria;

    const acciones = document.createElement("td");

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn", "btn-danger");

    btnEliminar.addEventListener("click", function () {
      const confirmacion = confirm(
        `Estás seguro que quieres eliminar el producto "${producto.nombre}"?`,
      );
      if (!confirmacion) return;

      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      renderizarProductos();
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn", "btn-warning");

    btnEditar.addEventListener("click", () => {
      h1Form.textContent = 'Editar Producto'
      editarTarea(index);
    });

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    tr.append(tdIndex, tdNombre, tdPrecio, tdCategoria, acciones);

    tablaProductos.appendChild(tr);
  });
}

function editarTarea(ind) {
  let productoEncontrado = productos[ind];

  nombreProducto.value = productoEncontrado.nombre;
  precioProducto.value = Number(productoEncontrado.precio);
  categoriaProducto.value = obtenerCategoria(productoEncontrado.categoria);

  indiceEncontrado = ind;

  visualizarProductos.hidden = true;
  containerFormProduct.hidden = false;
}

function obtenerCategoria(textoCategoria) {
  const opciones = categoriaProducto.options;

  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].text === textoCategoria) {
      return opciones[i].value;
    }
  }

  return "0";
}
