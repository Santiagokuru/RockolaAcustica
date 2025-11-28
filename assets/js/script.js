// Lista de canciones
const canciones = [
    { nombre: "Tema 1", archivo: "/assets/audio/profe_lucas.webm" },
    { nombre: "Tema 2", archivo: "/assets/audio/crimen.webm" },
    { nombre: "Tema 3", archivo: "/assets/audio/promesas_sobre_el_bidet.webm" },
    { nombre: "Tema 4", archivo: "/assets/audio/tu_amor.webm" },
    { nombre: "Tema 5", archivo: "/assets/audio/tus_ojos.webm" },
    { nombre: "Tema 6", archivo: "/assets/audio/barro_talvez.webm" }
];

// Variables de estado
let indice = 0;
let audio = new Audio();

// Elementos del DOM
const nombreCancion = document.getElementById("nombreCancion");
const progreso = document.getElementById("progreso");
const btnPlay = document.getElementById("play");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

// Cargar canción inicial
cargarCancion(indice);

// Función para cargar una canción
function cargarCancion(i) {
    audio.src = canciones[i].archivo;
    nombreCancion.innerText = canciones[i].nombre;
}

// Play / Pause
btnPlay.onclick = function () {
    if (audio.paused) {
        audio.play();
        btnPlay.innerText = "⏸";
    } else {
        audio.pause();
        btnPlay.innerText = "▶";
    }
};

// Botón siguiente
btnSiguiente.onclick = function () {
    indice++;
    if (indice >= canciones.length) indice = 0;
    cargarCancion(indice);
    audio.play();
    btnPlay.innerText = "⏸";
};

// Botón anterior
btnAnterior.onclick = function () {
    indice--;
    if (indice < 0) indice = canciones.length - 1;
    cargarCancion(indice);
    audio.play();
    btnPlay.innerText = "⏸";
};

// Actualizar barra de progreso
setInterval(() => {
    if (audio.duration) {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        progreso.style.width = porcentaje + "%";
    }
}, 300);

// Pasar a la siguiente canción cuando termina
audio.onended = function () {
    btnSiguiente.onclick();
};
