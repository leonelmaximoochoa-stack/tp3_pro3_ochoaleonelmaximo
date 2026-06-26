const { useState } = React;

/**
 * Componente principal de la aplicación.
 * Aquí se conectarán formulario y tabla en los siguientes commits.
 */
function App() {
  return (
    <div className="personas-page">
      <section className="personas-intro">
        <h2>Cargar persona (React)</h2>
        <p>Misma funcionalidad que el ejercicio 2, implementada con componentes y estado.</p>
      </section>

      <FormularioPersona />
      <TablaPersonas />
    </div>
  );
}

/** Placeholder: formulario de carga (se implementa en el commit 10) */
function FormularioPersona() {
  return <p>Formulario — próximamente</p>;
}

/** Placeholder: tabla de personas (se completa en el commit 11) */
function TablaPersonas() {
  return <p>Tabla — próximamente</p>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
