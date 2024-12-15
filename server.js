const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { verificarCredenciales } = require('./action');

app.use(express.json());

//......................................................


const express = require('express');
const sqlite3 = require('sqlite3').verbose();

app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./Usuarios.db');

app.post('/Registro', (req, res) => {
  const Nombres = req.body.Nombre;
  const Apellidos = req.body.Apellido;

  db.run(`INSERT INTO registros (Nombre, Apellido) VALUES (?, ?)`, [Nombre, Apellido], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error al guardar registro');
    } else {
      res.send('Registro guardado con éxito');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});



//......................................................

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo logueo.html
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'logueo.html'));  // Servir 'logueo.html' desde la carpeta 'public'
});

// Manejar la solicitud POST para /logueo
app.post('/logueo', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Llamar a la función de action.js para verificar las credenciales
    const credencialesValidas = await verificarCredenciales(email, password);

    if (credencialesValidas) {
        res.json({ message: '¡Bienvenido!' });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
   } catch (error) {
    // Si hubo algún error al leer la base de datos
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.get('/bienvenido', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenido.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});