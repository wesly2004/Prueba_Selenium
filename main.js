const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');
const mensajeLogin = document.getElementById('mensaje-login');  // Elemento para el mensaje

button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Obtenemos los valores de usuario y contraseña
    const data = {
        username: username.value,
        password: password.value
    };

    // Muestra el mensaje de éxito siempre (puedes agregar más lógica si quieres hacerlo condicional)
    if (data.username && data.password) {
        mensajeLogin.textContent = "✅ Login exitoso"; // Aquí siempre muestra el mensaje de éxito
        mensajeLogin.style.color = 'green'; // Poner el mensaje en verde
    } else {
        mensajeLogin.textContent = "❌ Usuario o contraseña incorrectos";
        mensajeLogin.style.color = 'red';
    }

    console.log(data); // Ver los datos en la consola
});
