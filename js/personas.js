// Arreglo que almacena todas las personas cargadas
const personas = [];

const form = document.getElementById("form-persona");
const tablaBody = document.getElementById("tabla-body");
const mensajeError = document.getElementById("mensaje-error");

/**
 * Calcula el Índice de Masa Corporal (IMC).
 * Fórmula: peso (kg) / altura (m)²
 * La altura se ingresa en centímetros, por eso dividimos por 100.
 */
function calcularIMC(peso, alturaCm) {
  const alturaMetros = alturaCm / 100;
  const imc = peso / (alturaMetros * alturaMetros);
  return imc.toFixed(2);
}

/**
 * Valida que los campos del formulario tengan datos correctos.
 * Devuelve true si todo es válido, false si hay errores.
 */
function validarFormulario(datos) {
  if (!datos.nombre || !datos.apellido) {
    mensajeError.textContent = "Nombre y apellido son obligatorios.";
    return false;
  }

  if (isNaN(datos.edad) || datos.edad < 1 || datos.edad > 120) {
    mensajeError.textContent = "La edad debe ser un número entre 1 y 120.";
    return false;
  }

  if (isNaN(datos.altura) || datos.altura < 50 || datos.altura > 250) {
    mensajeError.textContent = "La altura debe ser un número entre 50 y 250 cm.";
    return false;
  }

  if (isNaN(datos.peso) || datos.peso < 20 || datos.peso > 300) {
    mensajeError.textContent = "El peso debe ser un número entre 20 y 300 kg.";
    return false;
  }

  mensajeError.textContent = "";
  return true;
}

/**
 * Lee los valores del formulario y los devuelve como objeto.
 */
function leerFormulario() {
  return {
    id: Date.now(),
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    edad: parseInt(document.getElementById("edad").value, 10),
    altura: parseFloat(document.getElementById("altura").value),
    peso: parseFloat(document.getElementById("peso").value)
  };
}

/**
 * Elimina una persona del arreglo por su id y actualiza la tabla.
 */
function eliminarPersona(id) {
  const indice = personas.findIndex(function (persona) {
    return persona.id === id;
  });

  if (indice !== -1) {
    personas.splice(indice, 1);
    renderizarTabla();
  }
}

/**
 * Renderiza la tabla completa a partir del arreglo personas.
 */
function renderizarTabla() {
  tablaBody.innerHTML = "";

  if (personas.length === 0) {
    const filaVacia = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 7;
    celda.className = "tabla-vacia";
    celda.textContent = "No hay personas cargadas. Agregá una desde el formulario.";
    filaVacia.appendChild(celda);
    tablaBody.appendChild(filaVacia);
    return;
  }

  personas.forEach(function (persona) {
    const fila = document.createElement("tr");

    const celdas = [
      persona.nombre,
      persona.apellido,
      persona.edad,
      persona.altura,
      persona.peso,
      calcularIMC(persona.peso, persona.altura)
    ];

    celdas.forEach(function (valor) {
      const td = document.createElement("td");
      td.textContent = valor;
      fila.appendChild(td);
    });

    const tdAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", function () {
      eliminarPersona(persona.id);
    });
    tdAcciones.appendChild(btnEliminar);
    fila.appendChild(tdAcciones);

    tablaBody.appendChild(fila);
  });
}

// Enviar formulario: agregar persona al arreglo y actualizar tabla
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nuevaPersona = leerFormulario();

  if (!validarFormulario(nuevaPersona)) {
    return;
  }

  personas.push(nuevaPersona);
  renderizarTabla();
  form.reset();
});

// Tabla vacía al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  renderizarTabla();
});
