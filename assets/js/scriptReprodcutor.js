async function fetchCanciones() {
    try {
        const response = await fetch('../assets/json/canciones.json');
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error al cargar el fetch de canciones:", error);
    }
}

async function inicioReproductor() {
    const canciones = await fetchCanciones();
    
    if (!canciones) {
        console.error("No se pudieron cargar las canciones.");
        return;
    }

    let indice = 0;
    let audio = new Audio();

    const nombreCancion = document.getElementById("nombreCancion");
    const imgCancion = document.getElementById("imgCancion");
    const progreso = document.getElementById("progreso");
    const btnPlay = document.getElementById("play");
    const btnAnterior = document.getElementById("anterior");
    const btnSiguiente = document.getElementById("siguiente");
    const btnLogout = document.getElementById("botonLogout");

    function cargarCancion(i) {
        audio.src = canciones[i].archivo;
        nombreCancion.innerText = canciones[i].nombre;
        imgCancion.src = canciones[i].img;
    }

    cargarCancion(indice);

    btnPlay.onclick = function () {
        if (audio.paused) {
            audio.play();
            btnPlay.innerText = "⏸";
        } else {
            audio.pause();
            btnPlay.innerText = "▶";
        }
    };

    btnSiguiente.onclick = function () {
        indice++;
        if (indice >= canciones.length) indice = 0;
        cargarCancion(indice);
        audio.play();
        btnPlay.innerText = "⏸";
    };

    btnAnterior.onclick = function () {
        indice--;
        if (indice < 0) indice = canciones.length - 1;
        cargarCancion(indice);
        audio.play();
        btnPlay.innerText = "⏸";
    };

    setInterval(() => {
        if (audio.duration) {
            const porcentaje = (audio.currentTime / audio.duration) * 100;
            progreso.style.width = porcentaje + "%";
        }
    }, 300);

    audio.onended = function () {
        btnSiguiente.onclick();
    };

    btnLogout.addEventListener('click', () => {
        window.location.href = "../index.html";
    });
}

inicioReproductor();