// Arreglo inicial de tareas
let tareas = [
    { id: 1, descripcion: "Hacer la compra", realizada: false },
    { id: 2, descripcion: "Estudiar para el examen", realizada: false },
    { id: 3, descripcion: "Llamar al médico", realizada: false }
];

const agregarTarea = document.getElementById('agregarTarea');
const inputDescripcion = document.getElementById('descripcion');
const listaTareas = document.getElementById('listaTareas');
const totalTareasElement = document.getElementById('totalTareas');
const tareasRealizadasElement = document.getElementById('tareasRealizadas');

// Función para renderizar la lista de tareas en el UI
function renderizarTareas() {
    let html = ""; // Variable para almacenar el HTML dinámico

    tareas.forEach((tarea) => {
        html += `
            <li>
                <span>${tarea.id} ${tarea.descripcion}</span>
                <button onclick="marcarComoRealizada(${tarea.id})">Realizada</button>
                <button onclick="borrarTarea(${tarea.id})">Eliminar</button>
            </li>
        `;
    });

    listaTareas.innerHTML = html; // Insertamos el HTML en la lista de tareas

    // Actualizar contador de tareas y tareas realizadas
    actualizarResumen();
}

// Función para agregar una nueva tarea desde el formulario
agregarTarea.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    const descripcion = inputDescripcion.value.trim();
    if (descripcion === '') return; // Evitar tareas vacías

    const nuevaTarea = {
        id: Date.now(),
        descripcion: descripcion,
        realizada: false
    };

    tareas.push(nuevaTarea);

    inputDescripcion.value = ''; // Limpiar el campo de entrada

    renderizarTareas(); // Renderizar nuevamente la lista de tareas
});

// Función para borrar una tarea por su ID usando findIndex
function borrarTarea(id) {
    const index = tareas.findIndex(tarea => tarea.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        renderizarTareas(); // Renderizar nuevamente la lista de tareas
    }
}

// Función para marcar una tarea como realizada por su ID
function marcarComoRealizada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.realizada = true;
        renderizarTareas(); // Renderizar nuevamente la lista de tareas
    }
}

// Función para actualizar el resumen de tareas
function actualizarResumen() {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(tarea => tarea.realizada).length;

    totalTareasElement.textContent = totalTareas;
    tareasRealizadasElement.textContent = tareasRealizadas;
}

// Inicializar la lista de tareas al cargar la página
renderizarTareas();