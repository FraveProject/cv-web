const formulario = document.getElementById('form-contact');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue al enviar el formulario.

    // Recopilar datos del formulario
    const formData = new FormData(formulario);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/api/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Mostrar éxito o error según la respuesta del servidor
        if (response.ok) {
            alert('Mensaje enviado con éxito');
            formulario.reset(); // Limpiar el formulario después de enviar
        } else {
            alert('Error al enviar el mensaje');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar al servidor');
    }
});