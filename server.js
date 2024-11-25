const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo logueo.html
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'logueo.html'));  // Servir 'logueo.html' desde la carpeta 'public'
});

// Manejar la solicitud POST para /logueo
app.post('/logueo', (req, res) => {
  const { email, password } = req.body;

  //acá vamos a agregar una llamada a la BD
  if (email === 'usuario@example.com' && password === 'password123') {
      res.json({ message: '¡Bienvenido!' });
  } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

app.get('/bienvenido', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenido.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});