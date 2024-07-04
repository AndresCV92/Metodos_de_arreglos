// Arreglo inicial de tareas
let tareas = [
    { id: 16, descripcion: "Hacer mercado", realizada: false },
    { id: 60, descripcion: "Estudiar para la prueba", realizada: false },
    { id: 24, descripcion: "Sacara a pasear a Tobby", realizada: false }
];

// Elementos del DOM
const formularioAgregar = document.getElementById('agregar');
const inputDescripcion = document.getElementById('nuevaTarea');
const listaTareas = document.getElementById('listaTareas');
const totalTareasElement = document.getElementById('totalTareas');
const tareasRealizadasElement = document.getElementById('tareasRealizadas');

// Renderizar la lista de tareas
function renderizarTareas() {
    listaTareas.innerHTML = ''; 

    tareas.forEach(tarea => {
        const tareaElemento = document.createElement('li');
        tareaElemento.innerHTML = `
            <span>${tarea.id}</span>
            <label>${tarea.descripcion}</label>
            <input type="checkbox" ${tarea.realizada ? 'checked' : ''}>
            <button class="eliminar-btn">X</button>
        `;

        // Marcar como realizado
        const checkbox = tareaElemento.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            marcarComoRealizada(tarea.id, checkbox.checked);
        });

        // Eliminar tarea
        const botonEliminar = tareaElemento.querySelector('.eliminar-btn');
        botonEliminar.addEventListener('click', () => {
            borrarTarea(tarea.id);
        });

        listaTareas.appendChild(tareaElemento);
    });

    actualizarResumen();
}

// Función para agregar una nueva tarea 
formularioAgregar.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const descripcion = inputDescripcion.value.trim();
    if (descripcion === '') return; 
    const nuevaTarea = {
        id: Date.now(),
        descripcion: descripcion,
        realizada: false
    };

    tareas.push(nuevaTarea);
    inputDescripcion.value = ''; 

    renderizarTareas(); 
});

// Marcar una tarea como realizada por su ID
function marcarComoRealizada(id, completada) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.realizada = completada;
        renderizarTareas(); 
    }
}

// Borrar una tarea por su ID
function borrarTarea(id) {
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        renderizarTareas(); 
    }
}

// Resumen de tareas
function actualizarResumen() {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(t => t.realizada).length;

    totalTareasElement.textContent = totalTareas;
    tareasRealizadasElement.textContent = tareasRealizadas;
}


renderizarTareas();