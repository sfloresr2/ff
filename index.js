const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const figlet = require('figlet')
const asciify = require('asciify-image')
const bcrypt = require('bcrypt') // Importa bcrypt para encriptar contraseñas
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ff'
}

app.get('/', (req, res) => {
    res.send('Hola Steven, soy el servidor!')
})


app.get('/api/roles', (req, res) => {
    var connection = mysql.createConnection(credentials);
    connection.query('SELECT id, descripcion FROM rol', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    });
    connection.end();
});




app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body
    const values = [usuario]
    var connection = mysql.createConnection(credentials)
    
    connection.query("SELECT * FROM usuarios_nuevos WHERE usuario = ?", values, async (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                // Compara la contraseña ingresada con la almacenada
                const isMatch = await bcrypt.compare(contrasena, result[0].contrasena)
                if (isMatch) {
                    res.status(200).send({
                        "id": result[0].id,
                        "correo": result[0].correo,
                        "nombre": result[0].nombre,
                        "usuario": result[0].usuario,
                        "contrasena": result[0].contrasena,
                        "isAuth": true
                    })
                } else {
                    res.status(400).send('La Contraseña Es Incorrecta')
                }
            } else {
                res.status(400).send('El Usuario No Existe')
            }
        }
    })
    connection.end()
})

app.get('/api/usuarios', (req, res) => {
    var connection = mysql.createConnection(credentials);
    const query = `
        SELECT 
    u.id, 
    u.correo, 
    u.nombre,
    u.usuario,  
    u.contrasena, 
    u.rol,
    u.estado,
    r.descripcion AS descripcion
    
            FROM 
                usuarios_nuevos u 
            JOIN 
                rol r ON u.rol = r.id;

    `;
    connection.query(query, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
        connection.end();
    });
}); 

app.post('/api/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM usuarios_nuevos WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "El Usuario Ha Sido Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/guardar', async (req, res) => {
    const { correo, nombre, usuario, contrasena, rol, estado } = req.body

    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds) // Encripta la contraseña

        const params = [[correo, nombre, usuario, hashedPassword, rol, estado]]
        var connection = mysql.createConnection(credentials)
        connection.query('INSERT INTO usuarios_nuevos (correo, nombre, usuario, contrasena, rol, estado) VALUES ?', [params], (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send({ "status": "success", "message": "El Usuario Ha Sido Creado" })
            }
        })
        connection.end()
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/editar', async (req, res) => {
    const { id, correo, nombre, usuario, contrasena, rol, estado } = req.body

    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds) // Encripta la nueva contraseña

        const params = [correo, nombre, usuario, hashedPassword, rol, estado, id]
        var connection = mysql.createConnection(credentials)
        connection.query('UPDATE usuarios_nuevos set correo = ?, nombre = ?, usuario = ?, contrasena = ?, rol = ?, estado = ? WHERE id = ?', params, (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send({ "status": "success", "message": "El Usuario Ha Sido Editado" })
            }
        })
        connection.end()
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(4000, async () => {
    const ascified = await asciify('helmet.png', { fit: 'box', width: 10, height: 10 })
    console.log(ascified)
    console.log(figlet.textSync('Backend Corriendo'))
})
