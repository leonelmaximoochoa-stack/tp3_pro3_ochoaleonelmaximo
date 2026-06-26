// Arreglo con al menos 6 tecnologías (objetos)
const tecnologias = [
  { id: 1, nombre: "HTML", categoria: "Frontend", nivel: "Básico", destacado: true },
  { id: 2, nombre: "CSS", categoria: "Frontend", nivel: "Básico", destacado: true },
  { id: 3, nombre: "JavaScript", categoria: "Frontend", nivel: "Intermedio", destacado: true },
  { id: 4, nombre: "React", categoria: "Frontend", nivel: "Intermedio", destacado: false },
  { id: 5, nombre: "Node.js", categoria: "Backend", nivel: "Intermedio", destacado: false },
  { id: 6, nombre: "Python", categoria: "Backend", nivel: "Básico", destacado: false },
  { id: 7, nombre: "Git", categoria: "Herramientas", nivel: "Básico", destacado: true },
  { id: 8, nombre: "SQL", categoria: "Base de datos", nivel: "Intermedio", destacado: false }
];

const contenedor = document.getElementById("cards-container");
const btnOrdenar = document.getElementById("btn-ordenar");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnResaltar = document.getElementById("btn-resaltar");

// Estado de la vista
let ordenAscendente = true;
let soloDestacados = false;
let resaltarFrontend = false;

/**
 * Crea el elemento HTML de una tarjeta a partir de un objeto tecnología.
 */
function crearTarjeta(tech) {
  const article = document.createElement("article");
  article.className = "card";
  if (tech.destacado) {
    article.classList.add("destacado");
  }
  if (resaltarFrontend && tech.categoria === "Frontend") {
    article.classList.add("resaltada");
  }
  article.dataset.id = tech.id;

  const titulo = document.createElement("h3");
  titulo.textContent = tech.nombre;

  const categoria = document.createElement("span");
  categoria.className = "categoria";
  categoria.textContent = tech.categoria;

  const nivel = document.createElement("p");
  nivel.className = "nivel";
  nivel.textContent = "Nivel: " + tech.nivel;

  article.appendChild(titulo);
  article.appendChild(categoria);
  article.appendChild(nivel);

  return article;
}

/**
 * Obtiene la lista a mostrar según filtros y orden actuales.
 */
function obtenerListaVisible() {
  let lista = tecnologias.slice();

  if (soloDestacados) {
    lista = lista.filter(function (tech) {
      return tech.destacado;
    });
  }

  lista.sort(function (a, b) {
    if (ordenAscendente) {
      return a.nombre.localeCompare(b.nombre);
    }
    return b.nombre.localeCompare(a.nombre);
  });

  return lista;
}

/**
 * Renderiza todas las tarjetas del arreglo en el contenedor Flexbox.
 */
function renderizarTarjetas(lista) {
  contenedor.innerHTML = "";

  lista.forEach(function (tech) {
    const tarjeta = crearTarjeta(tech);
    contenedor.appendChild(tarjeta);
  });
}

function actualizarVista() {
  renderizarTarjetas(obtenerListaVisible());
}

// --- Eventos de interacción ---

btnOrdenar.addEventListener("click", function () {
  ordenAscendente = !ordenAscendente;
  if (ordenAscendente) {
    btnOrdenar.textContent = "Ordenar A → Z";
  } else {
    btnOrdenar.textContent = "Ordenar Z → A";
  }
  actualizarVista();
});

btnFiltrar.addEventListener("click", function () {
  soloDestacados = !soloDestacados;
  btnFiltrar.classList.toggle("activo", soloDestacados);
  if (soloDestacados) {
    btnFiltrar.textContent = "Mostrar todas";
  } else {
    btnFiltrar.textContent = "Solo destacados";
  }
  actualizarVista();
});

btnResaltar.addEventListener("click", function () {
  resaltarFrontend = !resaltarFrontend;
  btnResaltar.classList.toggle("activo", resaltarFrontend);
  actualizarVista();
});

// Carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", function () {
  actualizarVista();
});
