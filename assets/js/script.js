let arraypersonas = [];

const usuariosGuardados = localStorage.getItem("ObjetoUsuarios");
if (usuariosGuardados) {
    arraypersonas = JSON.parse(usuariosGuardados);
    console.log("Usuarios cargados desde Storage:", arraypersonas);
}
else {
    console.log("No hay usuarios guardados en localStorage.");
};

// //Usuario de prueba admin
// arraypersonas.push({ 
//     nombreUsuario: "Admin", 
//     clave: "1234",
// });
// console.log(arraypersonas);

const vistaLogin = document.getElementById("vistaLogin");
const vistaOnbording = document.getElementById("vistaOnbording");
const vistaAcceso = document.getElementById("vistaAcceso");

const btnRegistro = document.getElementById("botonRegistro");
const btnOnbording = document.getElementById("botonOnbording");
const btnAcceso = document.getElementById("botonAcceso");


const formularioLogin = document.getElementById("formularioLogin");
const formularioOnbording = document.getElementById("formularioOnbording");

const mensajeOnboarding = document.getElementById("mensajeOnboarding");
const saludoUsuario = document.getElementById("Saludo")




function cambiarPantalla(nombreVista) {
    vistaLogin.classList.add('oculto');
    vistaOnbording.classList.add('oculto');
    vistaAcceso.classList.add('oculto');

    if (nombreVista === 'login') {
        vistaLogin.classList.remove('oculto');
    } else if (nombreVista === 'registro') {
        vistaOnbording.classList.remove('oculto');
    } else if (nombreVista === 'acceso') {
        vistaAcceso.classList.remove('oculto');
    }
};

btnRegistro.addEventListener('click', (evento) => {
    evento.preventDefault();
    cambiarPantalla('registro');
});

btnOnbording.addEventListener('click', (evento) => {
    evento.preventDefault();
    cambiarPantalla('login');
});

//Onboarding
formularioOnbording.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nuevoUsuario = document.getElementById('usuarioOnbording').value;
    const nuevaClave = document.getElementById('passOnboarding').value;

    const usuarioExiste = arraypersonas.find(objeto => objeto.nombreUsuario === nuevoUsuario);

    if (usuarioExiste) {
        mensajeOnboarding.textContent = "El nombre de usuario ya existe, elige otro nombre.";
        mensajeOnboarding.className = "error";
    } else {

        arraypersonas.push({ nombreUsuario: nuevoUsuario, clave: nuevaClave });

        mensajeOnboarding.textContent = "¡Usuario registrado! Ahora inicia sesión.";
        mensajeOnboarding.className = "usuarioCreado";
        localStorage.setItem("ObjetoUsuarios", JSON.stringify(arraypersonas));

        console.log("Lista actual de usuarios:", arraypersonas);
    }
});

// LOGIN 
formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const usuarioIngresado = document.getElementById('usuarioLogin').value;
    const claveIngresada = document.getElementById('passLogin').value;

    const usuarioEncontrado = arraypersonas.find(u => u.nombreUsuario === usuarioIngresado && u.clave === claveIngresada);

    if (usuarioEncontrado) {
        Swal.fire({
            title: "Hola " + usuarioEncontrado.nombreUsuario + "! , deseas ingreasar al reprodcutor?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si quiero",
            denyButtonText: `No quiero`,
        }).then((result) => {
            if (result.isConfirmed) {
                    cambiarPantalla('acceso');
                setTimeout(function () {
                    window.location.href = "/pages/Reproductor.html";
                }, 3000);
            }
        });
    } else {
        Swal.fire({
            title: '¡Credenciales incorrectas!',
            text: 'Ingresa nuevamente el usuario y la contraseña',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Reintentar'
        });
    };
});
