// Lista de canciones
const canciones = [
    { 
        nombre: "Profe Lucas Theme", 
        img: "/assets/img/img1.webp", 
        archivo: "/assets/audio/profe_lucas.webm" 
    },
    {
        nombre: "Crimen", 
        img: "/assets/img/img2.webp", 
        archivo: "/assets/audio/crimen.webm" 
    },
    { 
        nombre: "Promesas sobre le bidet", 
        img: "/assets/img/img3.webp", 
        archivo: "/assets/audio/promesas_sobre_el_bidet.webm" 
    },
    { 
        nombre: "Tu amor", 
        img: "/assets/img/img4.webp", 
        archivo: "/assets/audio/tu_amor.webm" 
    },
    { 
        nombre: "Tus ojos",
        img: "/assets/img/img5.webp", 
        archivo: "/assets/audio/tus_ojos.webm" 
    },
    { 
        nombre: "Barro Talvez",
        img: "/assets/img/img6.webp", 
        archivo: "/assets/audio/barro_talvez.webm" 
    }
];

// Variables de estado
let indice = 0;
let audio = new Audio();

// Elementos del DOM
const nombreCancion = document.getElementById("nombreCancion");
const imgCancion = document.getElementById("imgCancion");
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
    imgCancion.src = canciones[i].img;
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

// Actualizar barra de progreso (para esto necesite ayuda de la IA 😶 )
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
