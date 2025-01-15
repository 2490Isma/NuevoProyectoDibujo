
// funcion para escuchar un evento
function iniciarFormulario() {
    const form = document.getElementById('logueo'); // toma el formulario por id
    if (form) {
        form.addEventListener('submit', enviarDatos); // asocia el evento 'submit' al formulario
    }
}


function enviarDatos(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos
    const data = { email, password };

    // Enviar los datos al servidor
    fetch('/logueo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Asegúrate de que es JSON
        },
        body: JSON.stringify(data), // Convertir el objeto en una cadena JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/bienvenido';
    })
    .catch(error => {
        mostrarErrorModal(error.message);
    });
}

// Función para mostrar el modal con el error
function mostrarErrorModal(mensaje) {
    const modal = document.getElementById('miModal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = mensaje;
    modal.style.display = 'block'; // Mostrar el modal
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('miModal');
    modal.style.display = 'none'; // Ocultar el modal
}


function volver() {
    window.history.back();
}










