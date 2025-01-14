const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { verificarCredenciales } = require('./action');
const { ingresarPresentacion } = require('./action');

app.use(express.json());



// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo logueo.html
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'logueo.html'));  // Servir 'logueo.html' desde la carpeta 'public'
});

// Manejar la solicitud POST para /logueo
app.post('/logueo', async (req, res) => {
  const { Nombre, Apellido, Edad,  email, password } = req.body;

  try {
    // Llamar a la función de action.js para verificar las credenciales
    const credencialesValidas = await verificarCredenciales(Nombre, Apellido, Edad,  email, password );

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

app.post('/registro', async (req, res) => {
  const { Nombre, Apellido, Edad,  email, password  } = req.body;

  try {
    const solicitudGuardada = await ingresarPresentacion(Nombre, Apellido, Edad,  email, password );

    if (solicitudGuardada) {
      // Only send the response once
      return res.json({ message: 'Ok' });
    } else {
      // Only send the response once
      return res.status(401).json({ message: 'Nok' });
    }

  } catch (error) {
    console.error(error);
   
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }
});


// ruta para el archivo 'nuevo.html'
app.post('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});


app.get('/bienvenido', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bienvenido.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});