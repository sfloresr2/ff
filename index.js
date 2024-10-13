const express = require('express')// Importa el módulo 'express', un framework de Node.js que facilita la creación de aplicaciones web y API's.
const cors = require('cors')// Importa el middleware 'cors', que permite habilitar el acceso a la API desde diferentes orígenes, útil para evitar problemas de "Cross-Origin Resource Sharing".
const mysql = require('mysql') // Importa el módulo 'mysql', que proporciona herramientas para conectarse y trabajar con bases de datos MySQL desde Node.js.
const bodyParser = require('body-parser')// Importa 'body-parser', un middleware que se usa para analizar (parsear) las solicitudes entrantes con datos en formato JSON, URL-encoded, etc., y hacerlos accesibles en 'req.body'
const figlet = require('figlet') // Importa 'figlet', un módulo que convierte texto a arte ASCII, utilizado para generar títulos en formato artístico en la consola.
const asciify = require('asciify-image')// Importa 'asciify-image', un módulo que convierte imágenes a arte ASCII, que permite representar imágenes en texto ASCII en la consola.
const bcrypt = require('bcrypt') // Importa 'bcrypt', un módulo para encriptar y comparar contraseñas de manera segura, ampliamente utilizado para almacenar contraseñas de usuarios en bases de datos.
const app = express()// Inicializa una aplicación de Express, que se usará para definir rutas, manejar solicitudes HTTP y configurar middlewares



app.use(cors()) // Activa el middleware 'cors' para permitir solicitudes desde otros dominios. Esto es importante cuando la API es accedida desde un frontend que se ejecuta en un dominio diferente.
app.use(bodyParser.urlencoded({ extended: false }))// Configura 'body-parser' para analizar datos URL-encoded de solicitudes entrantes (como formularios).'extended: false' indica que se usa la biblioteca nativa de Node.js para parsear las consultas simples, limitando las opciones a objetos y strings.
app.use(bodyParser.json({ limit: '10mb' })) // Configura 'body-parser' para analizar cuerpos de solicitudes en formato JSON. Se establece un límite de tamaño de 10 MB para los cuerpos de las solicitudes, lo cual es útil para evitar que se envíen datos demasiado grandes al servidor.



//Credenciales de la Base de Datos
const credentials = {//Inicio del const
    host: 'localhost', // El host donde se encuentra la base de datos MySQL, en este caso es 'localhost', lo que significa que la base de datos está en la misma máquina donde se ejecuta el servidor.
    user: 'root', // Nombre de usuario para conectarse a la base de datos MySQL. Aquí se usa 'root', que es el usuario predeterminado en muchos entornos de desarrollo MySQL.
    password: '', // Contraseña asociada al usuario. En este caso, está vacía, lo cual es común en entornos locales de desarrollo donde la seguridad no es crítica.
    database: 'ff' // Nombre de la base de datos a la que se conectará la aplicación. En este caso, es 'ff', probablemente correspondiente a la base de datos de la empresa.
}//Fin del const



//GET
app.get('/', (req, res) => {// Define una ruta GET en el servidor en el path raíz ('/'). Cuando se hace una solicitud HTTP GET a esta ruta, se ejecuta la función de callback que sigue.
    res.send('Hola Steven, soy el servidor!')// Envía la respuesta 'Hola Steven, soy el servidor!' al cliente. Esto se mostrará cuando el cliente (navegador o cliente HTTP) acceda a la URL raíz del servidor.
})//Fin del GET



//API roles GET
app.get('/api/roles', (req, res) => {// Define una ruta GET en el servidor en el endpoint '/api/roles'. Cuando un cliente hace una solicitud GET a esta URL, se ejecuta la función de callback.
    var connection = mysql.createConnection(credentials);   // Crea una nueva conexión a la base de datos MySQL usando las credenciales definidas anteriormente. 'credentials' contiene la información necesaria para conectarse al servidor MySQL (host, usuario, contraseña, base de datos).
    connection.query('SELECT id, descripcion FROM rol', (err, rows) => { // Realiza una consulta SQL que selecciona las columnas 'id' y 'descripcion' de la tabla 'rol'. La función de callback maneja el resultado de la consulta. Si hay un error, 'err' lo contendrá; de lo contrario, 'rows' contendrá las filas devueltas por la consulta.
        if (err) { // Si hay un error durante la ejecución de la consulta (por ejemplo, error de conexión o de sintaxis en la consulta SQL), entra aquí.
            res.status(500).send(err); // Envía una respuesta al cliente con un código de estado HTTP 500 (Error Interno del Servidor) y el mensaje de error.
        } else {// Si la consulta se ejecuta correctamente y devuelve datos, entra aquí.
            res.status(200).send(rows);// Envía una respuesta al cliente con un código de estado HTTP 200 (OK) y las filas obtenidas de la base de datos.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión con la base de datos una vez que se ha completado la consulta, liberando los recursos.
});//Fin del GET



//API Proveedores Productos GET
app.get('/api/proveedores', (req, res) => {// Define una ruta GET en el servidor en el endpoint '/api/proveedores'.  Cuando un cliente hace una solicitud GET a esta URL, se ejecuta la función de callback.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos MySQL utilizando las credenciales configuradas previamente (host, usuario, contraseña, base de datos).
    connection.query('SELECT id, nombre FROM proveedor', (err, rows) => {// Ejecuta una consulta SQL que selecciona las columnas 'id' y 'nombre' de la tabla 'proveedor'. Si la consulta se ejecuta correctamente, el resultado estará en 'rows'; si ocurre un error, este estará en 'err'.
        if (err) { // Si ocurre un error durante la ejecución de la consulta SQL, entra aquí.
            res.status(500).send(err);// Envía una respuesta HTTP con el estado 500 (Error interno del servidor) y el detalle del error.
        } else { // Si la consulta se ejecuta correctamente y devuelve resultados, entra aquí.
            res.status(200).send(rows);// Envía una respuesta HTTP con el estado 200 (OK) junto con las filas ('rows') obtenidas de la consulta SQL.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar recursos. Siempre es importante cerrar la conexión después de completar las operaciones.
});//Fin del GET



// API Proveedores Vehiculos GET
app.get('/api/proveedoresvvv', (req, res) => {// Define una ruta GET en el servidor en el endpoint '/api/proveedoresvvv'. Cuando un cliente hace una solicitud GET a esta URL, se ejecuta la función de callback.
    var connection = mysql.createConnection(credentials); // Crea una nueva conexión a la base de datos MySQL usando las credenciales configuradas previamente (host, usuario, contraseña, base de datos).
    connection.query('SELECT id, nombre, correo, telefono, direccion  FROM proveedor_vehiculo', (err, rows) => {// Ejecuta una consulta SQL que selecciona las columnas 'id', 'nombre', 'correo', 'telefono' y 'direccion' de la tabla 'proveedor_vehiculo'. Si hay un error, será capturado en 'err', y si la consulta es exitosa, las filas resultantes estarán en 'rows'.
        if (err) {// Si ocurre un error durante la ejecución de la consulta, entra aquí.
            res.status(500).send(err); // Envía una respuesta HTTP con el estado 500 (Error interno del servidor) y el mensaje de error.
        } else { // Si la consulta se ejecuta correctamente y devuelve resultados, entra aquí.
            res.status(200).send(rows); // Envía una respuesta HTTP con el estado 200 (OK) y las filas ('rows') obtenidas de la consulta.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar los recursos utilizados.
});//Fin del GET

// API Clientes Vehiculos GET
app.get('/api/clientesvvv', (req, res) => {// Define una ruta GET en el servidor en el endpoint '/api/proveedoresvvv'. Cuando un cliente hace una solicitud GET a esta URL, se ejecuta la función de callback.
    var connection = mysql.createConnection(credentials); // Crea una nueva conexión a la base de datos MySQL usando las credenciales configuradas previamente (host, usuario, contraseña, base de datos).
    connection.query('SELECT id, nombre, correo, telefono, direccion, dpi, comentarios  FROM clientes', (err, rows) => {// Ejecuta una consulta SQL que selecciona las columnas 'id', 'nombre', 'correo', 'telefono' y 'direccion' de la tabla 'proveedor_vehiculo'. Si hay un error, será capturado en 'err', y si la consulta es exitosa, las filas resultantes estarán en 'rows'.
        if (err) {// Si ocurre un error durante la ejecución de la consulta, entra aquí.
            res.status(500).send(err); // Envía una respuesta HTTP con el estado 500 (Error interno del servidor) y el mensaje de error.
        } else { // Si la consulta se ejecuta correctamente y devuelve resultados, entra aquí.
            res.status(200).send(rows); // Envía una respuesta HTTP con el estado 200 (OK) y las filas ('rows') obtenidas de la consulta.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar los recursos utilizados.
});//Fin del GET


//API login POST
app.post('/api/login', (req, res) => { // Define una ruta POST en el servidor en el endpoint '/api/login'. Cuando un cliente envía una solicitud POST a esta URL, se ejecuta la función de callback.
    const { usuario, contrasena } = req.body; // Extrae 'usuario' y 'contrasena' del cuerpo de la solicitud (req.body), que contiene los datos enviados desde el cliente.
    const values = [usuario]; // Almacena el 'usuario' en un array 'values', que será utilizado en la consulta SQL para evitar inyecciones SQL.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos MySQL utilizando las credenciales configuradas previamente.
    connection.query("SELECT * FROM usuarios_nuevos WHERE usuario = ?", values, async (err, result) => { // Ejecuta una consulta SQL que selecciona todas las columnas de la tabla 'usuarios_nuevos' donde 'usuario' coincide con el valor dado.'?' es un marcador de posición que se sustituye por el valor en 'values' para evitar inyecciones SQL. La función de callback maneja el resultado de la consulta.
        if (err) {// Si ocurre un error durante la ejecución de la consulta, entra aquí.
            res.status(500).send(err);// Envía una respuesta HTTP con el estado 500 (Error interno del servidor) y el mensaje de error.
        } else {// Si la consulta se ejecuta correctamente y devuelve resultados, entra aquí.
            if (result.length > 0) { // Verifica si se encontró al menos un registro que coincida con el 'usuario'.
                if (result[0].estado === 'Activo') {// Si el usuario está activo, procede a comparar la contraseña.
                    const isMatch = await bcrypt.compare(contrasena, result[0].contrasena);// Utiliza bcrypt para comparar la 'contrasena' proporcionada por el cliente con la contraseña encriptada almacenada en la base de datos.
                    if (isMatch) {  // Si las contraseñas coinciden, se envía una respuesta con los datos del usuario autenticado.
                        res.status(200).send({
                            "id": result[0].id,// Envía el ID del usuario.
                            "correo": result[0].correo, // Envía el correo electrónico del usuario.
                            "nombre": result[0].nombre, // Envía el nombre del usuario.
                            "usuario": result[0].usuario, // Envía el nombre de usuario.
                            "contrasena": result[0].contrasena, // No es recomendable enviar la contraseña en la respuesta.
                            "isAuth": true // Indica que el usuario está autenticado correctamente.
                        });//Fin del rest status
                    } else { // Si las contraseñas no coinciden, envía un error con estado 400.
                        res.status(400).send('La Contraseña Es Incorrecta'); // Si la contraseña no coincide, envía una respuesta HTTP con el estado 400 (Solicitud incorrecta) y un mensaje indicando que la contraseña es incorrecta.
                    }//Fin del else
                } else {// Si el usuario no está activo, envía un error con estado 403 (Prohibido).
                    res.status(403).send('Usuario Inactivo. No puede acceder al sistema.');// Si el usuario está marcado como inactivo en la base de datos, envía una respuesta HTTP con el estado 403 (Prohibido) y un mensaje indicando que el usuario no puede acceder porque está inactivo.
                }//Fin del else
            } else {// Si no se encuentra ningún usuario con el nombre proporcionado, envía un error con estado 400.
                res.status(400).send('El Usuario No Existe');// Si el usuario no se encuentra en la base de datos, envía una respuesta HTTP con el estado 400 (Solicitud incorrecta) y un mensaje indicando que el usuario no existe.
            }//Fin del else
        }//Fin del else
    });//Fin del connection query
    connection.end(); // Cierra la conexión a la base de datos para liberar recursos.
});//Fin del POST



//API Usuarios GET
app.get('/api/usuarios', (req, res) => { // Define una ruta GET en el servidor en el endpoint '/api/usuarios'. Esta ruta se utiliza para obtener la lista de usuarios.
    var connection = mysql.createConnection(credentials); // Crea una nueva conexión a la base de datos MySQL utilizando las credenciales configuradas previamente.
    // Se inicia la declaración de la consulta SQL como un template literal.
    // Indica que se van a seleccionar columnas de una o más tablas.
    // Selecciona el ID del usuario.
    // Selecciona el correo electrónico del usuario.
    // Selecciona el nombre del usuario.
    // Selecciona la contraseña del usuario (no recomendado incluir en la respuesta).
    // Selecciona el rol del usuario.
    // Selecciona el estado del usuario (activo/inactivo).
    // Obtiene la descripción del rol desde la tabla 'rol' y la renombra como 'descripcion'.
    // Indica de dónde se están seleccionando las columnas
    // Especifica la tabla 'usuarios_nuevos' como la fuente de datos, usando 'u' como alias para referirse a ella.
    // Indica que se va a realizar una unión con otra tabla.
    // Realiza un JOIN con la tabla 'rol' usando el alias 'r', donde el campo 'rol' de 'usuarios_nuevos' coincide con el 'id' de 'rol'.
    // Fin de la consulta
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
    connection.query(query, (err, rows) => { // Ejecuta la consulta SQL definida anteriormente y maneja el resultado en la función de callback.
        if (err) {// Si ocurre un error durante la ejecución de la consulta, entra aquí.
            res.status(500).send(err); // Envía una respuesta HTTP con el estado 500 (Error interno del servidor) y el mensaje de error.
        } else {// Si la consulta se ejecuta correctamente y devuelve resultados, entra aquí.
            res.status(200).send(rows);// Envía una respuesta HTTP con el estado 200 (OK) y los datos obtenidos (las filas) en formato JSON.
        }//Fin del else
        connection.end();// Cierra la conexión a la base de datos para liberar recursos.
    });//Fin del connection query
}); //Fin del GET



//API eliminar Usuarios POST
app.post('/api/eliminar', (req, res) => {// Define una ruta POST en '/api/eliminar' que maneja solicitudes para eliminar un usuario.
    const { id } = req.body// Extrae el ID del usuario del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM usuarios_nuevos WHERE id = ?', id, (err, result) => {// Ejecuta una consulta DELETE para eliminar un usuario de la tabla 'usuarios_nuevos' donde el ID coincide con el proporcionado.
        if (err) {// Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Usuario Ha Sido Eliminado" })// Envía una respuesta de éxito.
        }//Fin del else
    })//Fin del connection query
    connection.end() // Cierra la conexión a la base de datos.
})//Fin del POST



//API eliminar productos POST
app.post('/api/eliminar_product', (req, res) => { // Define una ruta POST en '/api/eliminar_product' para manejar solicitudes de eliminación de productos.
    const { id } = req.body // Extrae el ID del producto del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials) // Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM productos_car_wash WHERE id = ?', id, (err, result) => {  // Ejecuta una consulta DELETE para eliminar un producto de la tabla 'productos_car_wash' donde el ID coincide con el proporcionado.
        if (err) { // Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Producto Ha Sido Eliminado" })// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    })//Fin del connection query
    connection.end()// Cierra la conexión a la base de datos para liberar recursos.
})//Fin del POST



//API eliminar vehiculos POST
app.post('/api/eliminar_vehic', (req, res) => { // Define una ruta POST en '/api/eliminar_vehic' para manejar solicitudes de eliminación de vehículos.
    const { id } = req.body// Extrae el ID del vehículo del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM vehiculos_predio WHERE id = ?', id, (err, result) => { // Ejecuta una consulta DELETE para eliminar un vehículo de la tabla 'vehiculos_predio' donde el ID coincide con el proporcionado.
        if (err) { // Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else { // Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Vehiculo Ha Sido Eliminado" })// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    })//Fin del connection query
    connection.end()// Cierra la conexión a la base de datos para liberar recursos.
})//Fin del POST



//API eliminar vehiculos ventas POST
app.post('/api/eliminar_vehicv', (req, res) => { // Define una ruta POST en '/api/eliminar_vehic' para manejar solicitudes de eliminación de vehículos.
    const { id } = req.body// Extrae el ID del vehículo del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM vehiculos_vendidos WHERE id = ?', id, (err, result) => { // Ejecuta una consulta DELETE para eliminar un vehículo de la tabla 'vehiculos_predio' donde el ID coincide con el proporcionado.
        if (err) { // Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else { // Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Vehiculo Ha Sido Eliminado" })// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    })//Fin del connection query
    connection.end()// Cierra la conexión a la base de datos para liberar recursos.
})//Fin del POST




//API eliminar proveedor Car Wash
app.post('/api/eliminar_proveedorp', (req, res) => { // Define una ruta POST en '/api/eliminar_proveedorp' para manejar solicitudes de eliminación de proveedores.
    const { id } = req.body// Extrae el ID del proveedor del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM proveedor WHERE id = ?', id, (err, result) => {// Ejecuta una consulta DELETE para eliminar un proveedor de la tabla 'proveedor' donde el ID coincide con el proporcionado.
        if (err) {// Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Proveedor Ha Sido Eliminado" })// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    })//Fin connection query
    connection.end()// Cierra la conexión a la base de datos para liberar recursos.
})//Fin del POST



//API eliminar proveedor Vehiculos POST
app.post('/api/eliminar_proveedorimpo', (req, res) => { // Define una ruta POST en '/api/eliminar_proveedorimpo' para manejar solicitudes de eliminación de proveedores de importación.
    const { id } = req.body// Extrae el ID del proveedor del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM proveedor_vehiculo WHERE id = ?', id, (err, result) => {// Ejecuta una consulta DELETE para eliminar un proveedor de la tabla 'proveedor_vehiculo' donde el ID coincide con el proporcionado.
        if (err) {// Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Proveedor Ha Sido Eliminado" })// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    })//Fin del connection query
    connection.end()// Cierra la conexión a la base de datos para liberar recursos.
})//Fin del POST

//API eliminar clientes Vehiculos POST
app.post('/api/eliminar_clientesimpo', (req, res) => { // Define una ruta POST en '/api/eliminar_proveedorimpo' para manejar solicitudes de eliminación de proveedores de importación.
    const { id } = req.body// Extrae el ID del proveedor del cuerpo de la solicitud.
    var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
    connection.query('DELETE FROM clientes WHERE id = ?', id, (err, result) => {// Ejecuta una consulta DELETE para eliminar un proveedor de la tabla 'proveedor_vehiculo' donde el ID coincide con el proporcionado.
        if (err) {// Si hay un error durante la consulta...
            res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "El Cliente Ha Sido Eliminado" })// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    })//Fin del connection query
    connection.end()// Cierra la conexión a la base de datos para liberar recursos.
})//Fin del POST



//API guardar usuarios POST
app.post('/api/guardar', async (req, res) => { // Define una ruta POST en '/api/guardar' para manejar solicitudes de creación de nuevos usuarios.
    const { correo, nombre, usuario, contrasena, rol, estado } = req.body // Extrae los datos del nuevo usuario del cuerpo de la solicitud.
    try { // Intenta ejecutar el siguiente bloque de código; si hay un error, será capturado en el bloque catch.
        const saltRounds = 10 // Define el número de rondas para generar el "salt" utilizado en el hash.
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds) // Encripta la contraseña utilizando bcrypt.
        const params = [[correo, nombre, usuario, hashedPassword, rol, estado]]// Prepara los parámetros para la consulta SQL.
        var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales.
        connection.query('INSERT INTO usuarios_nuevos (correo, nombre, usuario, contrasena, rol, estado) VALUES ?', [params], (err, result) => {// Ejecuta una consulta INSERT para agregar un nuevo usuario a la tabla 'usuarios_nuevos'.
            if (err) {// Si hay un error durante la consulta...
                res.status(500).send(err)// Envía una respuesta con estado 500 y el error.
            } else {// Si la consulta se ejecuta correctamente...
                res.status(200).send({ "status": "success", "message": "El Usuario Ha Sido Creado" })// Envía una respuesta de éxito con un mensaje.
            }//Fin del else
        })//Fin del connection query
        connection.end()// Cierra la conexión a la base de datos para liberar recursos.
    } catch (error) { // Captura cualquier error que ocurra en el bloque try.
        res.status(500).send(error.message) // Envía una respuesta con estado 500 y el mensaje de error.
    }//Fin del Catch
})//Fin del POST



//API guardar producto POST
app.post('/api/guardar_product', (req, res) => {// Define una ruta POST en '/api/guardar_product' para manejar solicitudes de creación o actualización de productos.
    const { id, nombre, descripcion, id_proveedor, fecha_compra, cantidad, precio } = req.body;// Extrae los datos del producto del cuerpo de la solicitud.
    const params = [nombre, descripcion, id_proveedor, fecha_compra,  Number(cantidad), precio];// Prepara los parámetros para la consulta SQL.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Verificar si el producto ya existe por su ID
    connection.query('SELECT * FROM productos_car_wash WHERE id = ? LIMIT 1', [id], (err, results) => {// Realiza una consulta para buscar el producto por su ID.
        if (err) {// Si hay un error durante la consulta...
            res.status(500).send(err);// Envía una respuesta con estado 500 y el error
            connection.end();// Cierra la conexión a la base de datos para liberar recursos.
        } else {// Si la consulta se ejecuta correctamente...
            if (results.length > 0) { // Si se encuentra un producto existente...
                 // Producto encontrado, actualizar cantidad
                const nuevo_stock = results[0].cantidad + Number(cantidad);// Calcula el nuevo stock sumando la cantidad.
                connection.query('UPDATE productos_car_wash SET cantidad = ? WHERE id = ?', [nuevo_stock, id], (updateErr) => {// Realiza la actualización del producto.
                    if (updateErr) {// Si hay un error durante la actualización...
                        res.status(500).send(updateErr);// Envía una respuesta con estado 500 y el error.
                    } else {// Si la actualización se ejecuta correctamente...
                        res.status(200).send({ "status": "success", "message": "Cantidad actualizada" });// Envía una respuesta de éxito con un mensaje.
                    }//Fin del else
                    connection.end();// Cierra la conexión a la base de datos para liberar recursos.
                });//Fin del connection query
            } else { // Si no se encuentra un producto existente...
                // Producto no encontrado, crear nuevo
                connection.query('INSERT INTO productos_car_wash (nombre, descripcion, id_proveedor, fecha_compra,  cantidad, precio) VALUES ?', [[params]], (insertErr) => { // Realiza la inserción de un nuevo producto.
                    if (insertErr) { // Si hay un error durante la inserción...
                        res.status(500).send(insertErr);// Envía una respuesta con estado 500 y el error.
                    } else {// Si la inserción se ejecuta correctamente...
                        res.status(200).send({ "status": "success", "message": "Producto creado" });// Envía una respuesta de éxito con un mensaje.
                    }//Fin del else
                    connection.end();// Cierra la conexión a la base de datos para liberar recursos.
                });//Fin del connectionquery
            }//Fin del else
        }//Fin del else
    });//Fin del connection query
});//Fin del POST



//Api guardar vehiculo POST
app.post('/api/guardar_vehic', (req, res) => { // Define una ruta POST en '/api/guardar_vehic' para manejar solicitudes de creación de vehículos.
    const { id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_compra, precio_compra, precio_vehiculo  } = req.body;// Extrae los datos del vehículo del cuerpo de la solicitud
    const params = [[id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_compra, precio_compra, precio_vehiculo  ]];// Prepara los parámetros para la consulta SQL.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Inserta un nuevo vehículo en la tabla 'vehiculos_predio'
    connection.query('INSERT INTO vehiculos_predio (id, codigo,  placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_compra, precio_compra, precio_vehiculo ) VALUES ?', [params], (err, result) => { // Realiza la inserción de un nuevo vehículo.
        if (err) {// Si hay un error durante la inserción...
            res.status(500).send(err);// Envía una respuesta con estado 500 y el error.
        } else {// Si la inserción se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Vehiculo creado" });// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar recursos.
});//Fin del POST


//API CREAR VENTA vehiculos
app.post('/api/guardar_vehicv', (req, res) => { 
    const { id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_clientes, fecha_venta, precio_compra, precio_venta  } = req.body;
    
    var connection = mysql.createConnection(credentials);

    // Primero verificar si el vehículo con el mismo 'codigo' existe en 'vehiculos_predio'
    connection.query('SELECT * FROM vehiculos_predio WHERE codigo = ?', [codigo], (err, results) => {
        if (err) {
            res.status(500).send(err);  // En caso de error, se detiene la operación
            connection.end();
        } else {
            // Si se encuentra un vehículo con el mismo código en 'vehiculos_predio', eliminarlo
            if (results.length > 0) {
                connection.query('DELETE FROM vehiculos_predio WHERE codigo = ?', [codigo], (deleteErr) => {
                    if (deleteErr) {
                        res.status(500).send(deleteErr);  // En caso de error al eliminar
                        connection.end();
                    } else {
                        console.log('Vehículo eliminado de vehiculos_predio');
                        // Insertar el vehículo en 'vehiculos_vendidos' después de eliminarlo de 'vehiculos_predio'
                        const params = [[id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_clientes, fecha_venta, precio_compra, precio_venta]];
                        connection.query('INSERT INTO vehiculos_vendidos (id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_clientes, fecha_venta, precio_compra, precio_venta) VALUES ?', [params], (insertErr, result) => {
                            if (insertErr) {
                                res.status(500).send(insertErr);  // En caso de error al insertar
                            } else {
                                res.status(200).send({ "status": "success", "message": "Vehículo movido a vehiculos_vendidos y eliminado de vehiculos_predio" });
                            }
                            connection.end();  // Cerrar la conexión después de la operación
                        });
                    }
                });
            } else {
                // Si no se encuentra el vehículo, enviar un mensaje diciendo que no existe
                res.status(404).send({ "status": "error", "message": "El vehículo con el código proporcionado no existe en vehiculos_predio" });
                connection.end();  // Cerrar la conexión
            }
        }
    });
});





//Api guardar proveedor producto POST
app.post('/api/guardar_proveedorp', (req, res) => {// Define una ruta POST en '/api/guardar_proveedorp' para manejar solicitudes de creación de proveedores.
    const { id, nombre, correo, telefono, direccion  } = req.body;// Extrae los datos del proveedor del cuerpo de la solicitud.
    const params = [[id, nombre, correo, telefono, direccion  ]];// Prepara los parámetros para la consulta SQL.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Inserta un nuevo proveedor en la tabla 'proveedor'
    connection.query('INSERT INTO proveedor (id, nombre, correo, telefono, direccion  ) VALUES ?', [params], (err, result) => {// Realiza la inserción de un nuevo proveedor.
        if (err) {// Si hay un error durante la inserción...
            res.status(500).send(err);// Envía una respuesta con estado 500 y el error.
        } else {// Si la inserción se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Proveedor creado" });// Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar recursos.
});//Fin del POST



//Api guardar proveedor vehiculo POST
app.post('/api/guardar_proveedorimpo', (req, res) => { // Define una ruta POST en '/api/guardar_proveedorimpo' para manejar solicitudes de creación de proveedores de vehículos.
    const { id, nombre, correo, telefono, direccion  } = req.body; // Extrae los datos del proveedor del cuerpo de la solicitud.
    const params = [[id, nombre, correo, telefono, direccion  ]]; // Prepara los parámetros para la consulta SQL.
    var connection = mysql.createConnection(credentials); // Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Inserta un nuevo proveedor en la tabla 'proveedor_vehiculo'
    connection.query('INSERT INTO proveedor_vehiculo (id, nombre, correo, telefono, direccion  ) VALUES ?', [params], (err, result) => { // Realiza la inserción de un nuevo proveedor de vehículo.
        if (err) {// Si hay un error durante la inserción...
            res.status(500).send(err); // Envía una respuesta con estado 500 y el error.
        } else { // Si la inserción se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Proveedor creado" }); // Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar recursos.
});//Fin del POST

//Api guardar cliente vehiculo POST
app.post('/api/guardar_clientesimpo', (req, res) => { // Define una ruta POST en '/api/guardar_proveedorimpo' para manejar solicitudes de creación de proveedores de vehículos.
    const { id, nombre, correo, telefono, direccion, dpi, comentarios  } = req.body; // Extrae los datos del proveedor del cuerpo de la solicitud.
    const params = [[id, nombre, correo, telefono, direccion, dpi, comentarios  ]]; // Prepara los parámetros para la consulta SQL.
    var connection = mysql.createConnection(credentials); // Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Inserta un nuevo proveedor en la tabla 'proveedor_vehiculo'
    connection.query('INSERT INTO clientes (id, nombre, correo, telefono, direccion, dpi, comentarios  ) VALUES ?', [params], (err, result) => { // Realiza la inserción de un nuevo proveedor de vehículo.
        if (err) {// Si hay un error durante la inserción...
            res.status(500).send(err); // Envía una respuesta con estado 500 y el error.
        } else { // Si la inserción se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Cliente creado" }); // Envía una respuesta de éxito con un mensaje.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos para liberar recursos.
});//Fin del POST



//Api editar Usuario POST
app.post('/api/editar', async (req, res) => {// Define una ruta POST en '/api/editar' para editar un usuario existente.
    const { id, correo, nombre, usuario, contrasena, rol, estado } = req.body // Extrae los datos enviados en la solicitud.
    try {// Inicia un bloque try-catch para manejar errores potenciales.
        const saltRounds = 10 // Define el número de rondas de sal para la encriptación de la contraseña.
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds) // Encripta la nueva contraseña utilizando bcrypt.
        const params = [correo, nombre, usuario, hashedPassword, rol, estado, id]// Prepara los parámetros para la consulta SQL, incluyendo la ID del usuario.
        var connection = mysql.createConnection(credentials)// Crea una nueva conexión a la base de datos utilizando las credenciales
        // Realiza la actualización del usuario en la base de datos.
        connection.query('UPDATE usuarios_nuevos set correo = ?, nombre = ?, usuario = ?, contrasena = ?, rol = ?, estado = ? WHERE id = ?', params, (err, result) => {  // Ejecuta una consulta SQL para actualizar el usuario con los nuevos datos.  
            if (err) {// Si ocurre un error durante la actualización...
                res.status(500).send(err) // Envía una respuesta de error con estado 500.
            } else {// Si la actualización se ejecuta correctamente...
                res.status(200).send({ "status": "success", "message": "El Usuario Ha Sido Editado" })// Envía una respuesta de éxito.
            }//Fin del else
        })//Fin del connection query
        connection.end()// Cierra la conexión a la base de datos.
    } catch (error) {// Si ocurre un error en la encriptación o el proceso general...
        res.status(500).send(error.message) // Envía un mensaje de error con estado 500.
    }//Fin del Catch
})//Fin del Post



//Api editar producto POST
app.post('/api/editar_product', (req, res) => { // Define una ruta POST en '/api/editar_product' para editar un producto existente.
    const { id, nombre, descripcion, id_proveedor, fecha_compra, cantidad, precio, } = req.body;  // Extrae los datos enviados en la solicitud.
    const params = [ nombre, descripcion, id_proveedor, fecha_compra, cantidad, precio, id]; // Prepara los parámetros para la consulta SQL, incluyendo la ID del producto.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Realiza la actualización del producto en la base de datos.
    connection.query('UPDATE productos_car_wash SET nombre = ?, descripcion = ?, id_proveedor = ?,  fecha_compra = ?,  cantidad = ?, precio = ?    WHERE id = ?', params, (err, result) => {// Ejecuta una consulta SQL para actualizar el producto con los nuevos datos.
        if (err) {// Si ocurre un error durante la actualización...
            res.status(500).send(err);// Envía una respuesta de error con estado 500
        } else {// Si la actualización se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Producto editado" });// Envía una respuesta de éxito.
        }//Fin del else
    });//Fin del connection query
    connection.end();// Cierra la conexión a la base de datos.
});//Fin del POST



//Api editar vehiculo POST
app.post('/api/editar_vehic', (req, res) => { // Define una ruta POST en '/api/editar_vehic' para editar un vehículo existente.
    const { id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_compra, precio_compra, precio_vehiculo,  } = req.body;  // Extrae los datos enviados en la solicitud.  
    const params = [ codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_compra, precio_compra, precio_vehiculo, id]; // Prepara los parámetros para la consulta SQL, incluyendo todos los datos del vehículo y la ID.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Ejecuta una consulta SQL para actualizar los datos del vehículo en la base de datos.
    connection.query('UPDATE vehiculos_predio SET codigo = ?, placa = ?, tipo_vehiculo = ?, marca = ?, modelo = ?,  color = ?, uso = ?, linea = ?, chasis = ?, serie = ?, numero_asientos = ?, ejes = ?, numero_vin = ?, motor = ?, cilindros = ?, c_c = ?,  id_proveedor_vehiculo = ?, fecha_compra = ?, precio_compra = ?, precio_vehiculo = ?	   WHERE id = ?', params, (err, result) => {
        if (err) {// Si ocurre un error durante la actualización...
            res.status(500).send(err);// Envía una respuesta de error con estado 500.
        } else {// Si la actualización se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Vehiculo editado" });// Envía una respuesta de éxito.
        }//Fin del else
    });//Fin del connection query
    connection.end();
});//Fin del POST




//Api editar vehiculo venta POST
app.post('/api/editar_vehicv', (req, res) => { // Define una ruta POST en '/api/editar_vehic' para editar un vehículo existente.
    const { id, codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_venta, precio_compra, precio_venta,  } = req.body;  // Extrae los datos enviados en la solicitud.  
    const params = [ codigo, placa, tipo_vehiculo, marca, modelo, color, uso, linea, chasis, serie, numero_asientos, ejes, numero_vin, motor, cilindros, c_c, id_proveedor_vehiculo, fecha_venta, precio_compra, precio_venta, id]; // Prepara los parámetros para la consulta SQL, incluyendo todos los datos del vehículo y la ID.
    var connection = mysql.createConnection(credentials);// Crea una nueva conexión a la base de datos utilizando las credenciales.
    // Ejecuta una consulta SQL para actualizar los datos del vehículo en la base de datos.
    connection.query('UPDATE vehiculos_vendidos SET codigo = ?, placa = ?, tipo_vehiculo = ?, marca = ?, modelo = ?,  color = ?, uso = ?, linea = ?, chasis = ?, serie = ?, numero_asientos = ?, ejes = ?, numero_vin = ?, motor = ?, cilindros = ?, c_c = ?,  id_proveedor_vehiculo = ?, fecha_venta = ?, precio_compra = ?, precio_venta = ?	   WHERE id = ?', params, (err, result) => {
        if (err) {// Si ocurre un error durante la actualización...
            res.status(500).send(err);// Envía una respuesta de error con estado 500.
        } else {// Si la actualización se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Vehiculo editado" });// Envía una respuesta de éxito.
        }//Fin del else
    });//Fin del connection query
    connection.end();
});//Fin del POST



//Api editar proveedor productos POST
app.post('/api/editar_proveedorp', (req, res) => { // Define una ruta POST en '/api/editar_proveedorp' para editar los datos de un proveedor existente.
    const { id, nombre, correo, telefono, direccion, } = req.body; // Extrae los datos enviados en la solicitud POST.
    const params = [ nombre, correo, telefono, direccion, id];// Prepara los parámetros para la consulta SQL, donde los valores extraídos de la solicitud reemplazarán los marcadores en la consulta.
    var connection = mysql.createConnection(credentials);// Crea una conexión a la base de datos utilizando las credenciales configuradas.
    // Ejecuta una consulta SQL para actualizar los datos del proveedor en la tabla 'proveedor' de la base de datos.
    connection.query('UPDATE proveedor SET nombre = ?, correo = ?, telefono = ?, direccion = ?     WHERE id = ?', params, (err, result) => {
        if (err) { // Si ocurre un error durante la ejecución de la consulta SQL...
            res.status(500).send(err);// Envía una respuesta de error con código de estado 500.
        } else { // Si la actualización se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Proveedor editado" }); // Envía una respuesta de éxito con un mensaje indicando que el proveedor ha sido editado.
        }//Fin del else
    });//Fin del connection query
    connection.end(); // Cierra la conexión a la base de datos una vez que se ha completado la consulta.
});//Fin del POST



//Api editar proveedor vehiculos POST
app.post('/api/editar_proveedorimpo', (req, res) => {  // Define una ruta POST en '/api/editar_proveedorimpo' para editar los datos de un proveedor de vehículos.
    const { id, nombre, correo, telefono, direccion, } = req.body; // Extrae los datos del cuerpo de la solicitud (id, nombre, correo, teléfono, dirección).
    const params = [ nombre, correo, telefono, direccion, id]; // Prepara los parámetros que se usarán para la consulta SQL. Los valores extraídos de la solicitud reemplazarán los marcadores en la consulta.
    var connection = mysql.createConnection(credentials); // Crea una conexión a la base de datos usando las credenciales configuradas.
    // Ejecuta una consulta SQL para actualizar los datos del proveedor de vehículos en la tabla 'proveedor_vehiculo'.
    connection.query('UPDATE proveedor_vehiculo SET nombre = ?, correo = ?, telefono = ?, direccion = ?     WHERE id = ?', params, (err, result) => {
        if (err) {// Si ocurre un error durante la ejecución de la consulta SQL...
            res.status(500).send(err);// Envía una respuesta de error con código de estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Proveedor editado" });// Envía una respuesta de éxito indicando que el proveedor ha sido editado.
        }//Fin del else
    });// Fin de la consulta SQL para actualizar los datos del proveedor.
    connection.end();// Cierra la conexión a la base de datos después de que se ha ejecutado la consulta.
});// Fin de la ruta POST.


//Api editar cliente vehiculos POST
app.post('/api/editar_clientesimpo', (req, res) => {  // Define una ruta POST en '/api/editar_proveedorimpo' para editar los datos de un proveedor de vehículos.
    const { id, nombre, correo, telefono, direccion, dpi, comentarios } = req.body; // Extrae los datos del cuerpo de la solicitud (id, nombre, correo, teléfono, dirección).
    const params = [ nombre, correo, telefono, direccion, dpi, comentarios, id]; // Prepara los parámetros que se usarán para la consulta SQL. Los valores extraídos de la solicitud reemplazarán los marcadores en la consulta.
    var connection = mysql.createConnection(credentials); // Crea una conexión a la base de datos usando las credenciales configuradas.
    // Ejecuta una consulta SQL para actualizar los datos del proveedor de vehículos en la tabla 'proveedor_vehiculo'.
    connection.query('UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ?, dpi = ?, comentarios = ?     WHERE id = ?', params, (err, result) => {
        if (err) {// Si ocurre un error durante la ejecución de la consulta SQL...
            res.status(500).send(err);// Envía una respuesta de error con código de estado 500 y el error.
        } else {// Si la consulta se ejecuta correctamente...
            res.status(200).send({ "status": "success", "message": "Cliente editado" });// Envía una respuesta de éxito indicando que el proveedor ha sido editado.
        }//Fin del else
    });// Fin de la consulta SQL para actualizar los datos del proveedor.
    connection.end();// Cierra la conexión a la base de datos después de que se ha ejecutado la consulta.
});// Fin de la ruta POST.



//Api Productos GET
app.get('/api/productos', (req, res) => { // Define una ruta GET en '/api/productos' para obtener la lista de productos.
    var connection = mysql.createConnection(credentials); // Crea una conexión a la base de datos utilizando las credenciales definidas.
    // Definimos una consulta SQL multi-tabla que selecciona información sobre productos y proveedores.
    // Selecciona el ID del producto.
    // Selecciona el nombre del producto.
    // Selecciona la descripción del producto.
    // Selecciona la cantidad del producto en stock.
    // Selecciona el precio unitario del producto.
    // Selecciona el ID del proveedor del producto.
    // Selecciona la fecha de compra del producto.
    // Selecciona el número de factura asociado a la compra del producto.
    // Selecciona el subtotal del producto (cantidad * precio).
    // Selecciona el nombre del proveedor desde la tabla 'proveedor'.
    // Tabla principal, 'productos_car_wash'.
    // Realiza un JOIN con la tabla 'proveedor' usando el ID del proveedor.
    const query = `
        SELECT 
    u.id, 
    u.nombre, 
    u.descripcion,
    u.cantidad,  
    u.precio, 
    u.id_proveedor,
    u.fecha_compra,
    
    u.subtotal,
    r.nombre AS nombre_proveedor
            FROM 
                productos_car_wash u 
            JOIN 
                proveedor r ON u.id_proveedor = r.id;
    `;
    connection.query(query, (err, rows) => {  // Ejecuta la consulta SQL definida previamente.
        if (err) { // Si ocurre un error al ejecutar la consulta...
            res.status(500).send(err); // Envía una respuesta de error con código 500 y el error.
        } else { // Si la consulta se ejecuta correctamente...
            res.status(200).send(rows); // Envía la lista de productos obtenidos como respuesta con código 200 (éxito).
        }//Fin del else
        connection.end();// Cierra la conexión a la base de datos después de que se completa la consulta.
    });// Fin del connection.query.
});//Fin de la ruta GET 



//Api vehiculos GET
app.get('/api/vehiculos', (req, res) => { // Define una ruta GET en la API para obtener información sobre vehículos
    var connection = mysql.createConnection(credentials);// Crea una conexión a la base de datos MySQL utilizando las credenciales proporcionadas 
    // Define la consulta SQL que seleccionará los detalles de los vehículos
    // Selecciona el ID del vehículo
    // Selecciona la placa del vehículo
    // Selecciona el tipo de vehículo
    // Selecciona la marca del vehículo
    // Selecciona el modelo del vehículo
    // Selecciona el color del vehículo
    // Selecciona el uso del vehículo
    // Selecciona la línea del vehículo
    // Selecciona el número de chasis del vehículo
    // Selecciona el número de serie del vehículo
    // Selecciona el número de asientos del vehículo
    // Selecciona el número de ejes del vehículo
    // Selecciona el número VIN del vehículo
    // Selecciona el número de motor del vehículo
    // Selecciona el número de cilindros del vehículo
    // Selecciona la cilindrada del vehículo
    // Selecciona el ID del proveedor del vehículo
    // Selecciona la fecha de compra del vehículo
    // Selecciona el precio de compra del vehículo
    // Selecciona el precio del vehículo
    // Selecciona el nombre del proveedor del vehículo y le da un alias
    // Desde la tabla 'vehiculos_predio' con alias 'u'
   // Realiza un JOIN con 'proveedor_vehiculo' basado en el ID del proveedor
    const query = `
        SELECT 
    u.id,
    u.codigo,
    u.placa,
    u.tipo_vehiculo, 
    u.marca, 
    u.modelo,
    u.color,
    u.uso,
    u.linea,
    u.chasis,
    u.serie,
    u.numero_asientos,
    u.ejes,
    u.numero_vin, 
    u.motor,
    u.cilindros,
    u.c_c,
    u.id_proveedor_vehiculo,
    u.fecha_compra,
    u.precio_compra,
    u.precio_vehiculo,
    r.nombre AS nombre_proveedor_vehiculo
            FROM 
                vehiculos_predio u 
            JOIN 
                proveedor_vehiculo r ON u.id_proveedor_vehiculo = r.id;
    `;
    connection.query(query, (err, rows) => { // Ejecuta la consulta SQL en la base de datos
        if (err) {// Verifica si hay un error al ejecutar la consulta
            res.status(500).send(err);// Si hay un error, envía un código de estado 500 y el error
        } else {// Si la consulta fue exitosa
            res.status(200).send(rows);//envía un código de estado 200 y los resultados
        }//Fin del else
        connection.end(); // Cierra la conexión a la base de datos
    });//Fin del connection query
});//Fin de la ruta GET













//Api vehiculos ventas GET
app.get('/api/vehiculosventas', (req, res) => { // Define una ruta GET en la API para obtener información sobre vehículos
    var connection = mysql.createConnection(credentials);// Crea una conexión a la base de datos MySQL utilizando las credenciales proporcionadas 
    // Define la consulta SQL que seleccionará los detalles de los vehículos
    // Selecciona el ID del vehículo
    // Selecciona la placa del vehículo
    // Selecciona el tipo de vehículo
    // Selecciona la marca del vehículo
    // Selecciona el modelo del vehículo
    // Selecciona el color del vehículo
    // Selecciona el uso del vehículo
    // Selecciona la línea del vehículo
    // Selecciona el número de chasis del vehículo
    // Selecciona el número de serie del vehículo
    // Selecciona el número de asientos del vehículo
    // Selecciona el número de ejes del vehículo
    // Selecciona el número VIN del vehículo
    // Selecciona el número de motor del vehículo
    // Selecciona el número de cilindros del vehículo
    // Selecciona la cilindrada del vehículo
    // Selecciona el ID del proveedor del vehículo
    // Selecciona la fecha de compra del vehículo
    // Selecciona el precio de compra del vehículo
    // Selecciona el precio del vehículo
    // Selecciona el nombre del proveedor del vehículo y le da un alias
    // Desde la tabla 'vehiculos_predio' con alias 'u'
   // Realiza un JOIN con 'proveedor_vehiculo' basado en el ID del proveedor
    const query = `
        SELECT 
    u.id,
    u.codigo,
    u.placa,
    u.tipo_vehiculo, 
    u.marca, 
    u.modelo,
    u.color,
    u.uso,
    u.linea,
    u.chasis,
    u.serie,
    u.numero_asientos,
    u.ejes,
    u.numero_vin, 
    u.motor,
    u.cilindros,
    u.c_c,
    u.id_clientes,
    u.fecha_venta,
    u.precio_compra,
    u.precio_venta,
    r.nombre AS nombre_clientes
            FROM 
                vehiculos_vendidos u 
            JOIN 
                clientes r ON u.id_clientes = r.id;
    `;
    connection.query(query, (err, rows) => { // Ejecuta la consulta SQL en la base de datos
        if (err) {// Verifica si hay un error al ejecutar la consulta
            res.status(500).send(err);// Si hay un error, envía un código de estado 500 y el error
        } else {// Si la consulta fue exitosa
            res.status(200).send(rows);//envía un código de estado 200 y los resultados
        }//Fin del else
        connection.end(); // Cierra la conexión a la base de datos
    });//Fin del connection query
});//Fin de la ruta GET
















//Api proveedores productos GET
app.get('/api/proveedoresp', (req, res) => {// Define una ruta GET en la API para obtener información sobre proveedores de productos
    var connection = mysql.createConnection(credentials);// Crea una conexión a la base de datos MySQL utilizando las credenciales proporcionadas
   // Define la consulta SQL que seleccionará los detalles de los proveedores
   // Selecciona el ID del proveedor
   // Selecciona el nombre del proveedor
   // Selecciona el correo electrónico del proveedor
   // Selecciona el número de teléfono del proveedor
   // Selecciona la dirección del proveedor
   // Desde la tabla 'proveedor' con alias 'u'
    const query = `
        SELECT 
    u.id, 
    u.nombre, 
    u.correo,
    u.telefono,  
    u.direccion
            FROM 
                proveedor u 
    `;
    connection.query(query, (err, rows) => { // Ejecuta la consulta SQL en la base de datos
        if (err) {// Verifica si hay un error al ejecutar la consulta
            res.status(500).send(err);// Si hay un error, envía un código de estado 500 y el error
        } else {// Si la consulta fue exitosa
            res.status(200).send(rows);// Si la consulta fue exitosa, envía un código de estado 200 y los resultados
        }//Fin del else
        connection.end();// Cierra la conexión a la base de datos
    });//Fin del connection query
});//Fin de la ruta GET



//Api proveedores vehiculos GET
app.get('/api/proveedoresimpo', (req, res) => {// Define una ruta GET en la API para obtener información sobre proveedores de vehiculos
    var connection = mysql.createConnection(credentials);// Crea una conexión a la base de datos MySQL utilizando las credenciales proporcionadas
   // Define la consulta SQL que seleccionará los detalles de los proveedores
   // Selecciona el ID del proveedor
   // Selecciona el nombre del proveedor
   // Selecciona el correo electrónico del proveedor
   // Selecciona el número de teléfono del proveedor
   // Selecciona la dirección del proveedor
   // Desde la tabla 'proveedor_vehiculo' con alias 'u'  
    const query = `
        SELECT 
    u.id, 
    u.nombre, 
    u.correo,
    u.telefono,  
    u.direccion
            FROM 
                proveedor_vehiculo u 
    `;
    connection.query(query, (err, rows) => {// Ejecuta la consulta SQL en la base de datos
        if (err) {// Verifica si hay un error al ejecutar la consulta
            res.status(500).send(err);// Si hay un error, envía un código de estado 500 y el error
        } else {// Si la consulta fue exitosa
            res.status(200).send(rows);// Si la consulta fue exitosa, envía un código de estado 200 y los resultados
        }//Fin del else
        connection.end();// Cierra la conexión a la base de datos
    });//Fin del connection query
});//Fin de la ruta GET


//Api Clientes vehiculos GET
app.get('/api/clientesv', (req, res) => {// Define una ruta GET en la API para obtener información sobre proveedores de vehiculos
    var connection = mysql.createConnection(credentials);// Crea una conexión a la base de datos MySQL utilizando las credenciales proporcionadas
   // Define la consulta SQL que seleccionará los detalles de los proveedores
   // Selecciona el ID del proveedor
   // Selecciona el nombre del proveedor
   // Selecciona el correo electrónico del proveedor
   // Selecciona el número de teléfono del proveedor
   // Selecciona la dirección del proveedor
   // Desde la tabla 'proveedor_vehiculo' con alias 'u'  
    const query = `
        SELECT 
    u.id, 
    u.nombre, 
    u.correo,
    u.telefono,  
    u.direccion,
    u.dpi,
    u.comentarios
            FROM 
                clientes u 
    `;
    connection.query(query, (err, rows) => {// Ejecuta la consulta SQL en la base de datos
        if (err) {// Verifica si hay un error al ejecutar la consulta
            res.status(500).send(err);// Si hay un error, envía un código de estado 500 y el error
        } else {// Si la consulta fue exitosa
            res.status(200).send(rows);// Si la consulta fue exitosa, envía un código de estado 200 y los resultados
        }//Fin del else
        connection.end();// Cierra la conexión a la base de datos
    });//Fin del connection query
});//Fin de la ruta GET





//Arranque de backend
app.listen(4000, async () => {// Inicia el servidor en el puerto 4000
    const ascified = await asciify('helmet.png', { fit: 'box', width: 10, height: 10 })// Carga la imagen 'helmet.png' y la convierte a arte ASCII
    console.log(ascified)// Muestra la representación ASCII de la imagen en la consola
    console.log(figlet.textSync('Backend Corriendo'))// Imprime un mensaje en formato de texto grande usando figlet
})