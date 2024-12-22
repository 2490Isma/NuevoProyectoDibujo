const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta completa a la base de datos SQLite
const dbPath = 'C:\\desarrollo\\NuevoProyectoDibujo\\BD_3\\Usuarios.db';  // Ruta absoluta a la base de datos SQLite

function verificarCredenciales(email, password) {
    return new Promise((resolve, reject) => {
        // Conectar a la base de datos SQLite
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return reject('Error al conectar a la base de datos: ' + err.message);
            }
        });

        db.get('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, row) => {
            if (err) {
                db.close();
                return reject('Error al consultar la base de datos: ' + err.message);
            }

            if (row) {
                resolve(true);
            } else {
                resolve(false);
            }

            // Cerrar la base de datos después de la consulta
            db.close();
        });
    });
}

module.exports = { verificarCredenciales };



function ingresarPresentacion(Nombre, Apellido, Edad, email, password) {
    return new Promise((resolve, reject) => {
        // Conectar a la base de datos SQLite
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return reject('Error al conectar a la base de datos: ' + err.message);
            }
        });

        // Crear la consulta de inserción
        const query = 'INSERT INTO presentacion (Nombre, Apellido, Edad, email, password) VALUES (?, ?, ?, ?, ?)';

        // Ejecutar la consulta
        db.run(query, [Nombre, Apellido, Edad, email, password], function(err) {
            if (err) {
                db.close();
                return reject('Error al insertar en la base de datos: ' + err.message);
            }

            // Si la inserción es exitosa, devolver el ID generado (this.lastID)
            console.log('Registro insertado con ID:', this.lastID);  // Opcional: mostrar el ID insertado
            resolve(true);

            // Cerrar la base de datos después de la operación
            db.close((closeErr) => {
                if (closeErr) {
                    console.error('Error al cerrar la base de datos:', closeErr.message);
                } else {
                    console.log('Base de datos cerrada correctamente.');
                }
            });
        });
    });
}

module.exports = { ingresarPresentacion };
