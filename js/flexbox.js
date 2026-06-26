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

/**
 * Crea el elemento HTML de una tarjeta a partir de un objeto tecnología.
 */
function crearTarjeta(tech) {
  const article = document.createElement("article");
  article.className = "card";
  if (tech.destacado) {
    article.classList.add("destacado");
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
 * Renderiza todas las tarjetas del arreglo en el contenedor Flexbox.
 */
function renderizarTarjetas(lista) {
  contenedor.innerHTML = "";

  lista.forEach(function (tech) {
    const tarjeta = crearTarjeta(tech);
    contenedor.appendChild(tarjeta);
  });
}

// Carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", function () {
  renderizarTarjetas(tecnologias);
});
