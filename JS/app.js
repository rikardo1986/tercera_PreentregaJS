// Array de productos (inventario) inicializado desde localStorage o vacío
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Función para validar si el usuario es "admin"
function validarUsuario() {
    let user = prompt("Por favor, ingrese el usuario:");
    if (user === "admin") {
        alert("Bienvenido Administrador");
        cargarContenido(); // Si es admin, carga el contenido
    } else {
        alert("Usuario de Administrador incorrecto. No tiene acceso.");
        document.body.innerHTML = ''; // Borra el contenido de la página si no es admin
    }
}

// Función para cargar el contenido solo si es admin
function cargarContenido() {
    document.getElementById('contenido').style.display = 'block';
}

// Función para guardar el inventario en localStorage
function guardarInventarioEnLocalStorage() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para agregar productos
function agregarProducto() {
    let productoTipo = prompt(`Elija el tipo de producto que desea agregar:
    1. Notebook
    2. Cámara web
    3. Disco duro
    4. Parlantes
    5. Otro insumo`);

    let marca = prompt("Ingrese la marca del producto:");
    let modelo = prompt("Ingrese el modelo del producto:");
    let serie = prompt("Ingrese el número de serie del producto:");

    // Validación de número de serie duplicado
    let productoExistente = inventario.find(producto => producto.serie === serie);
    if (productoExistente) {
        alert("Ya existe un producto con ese número de serie.");
        return; // Sale de la función si ya existe un producto con el mismo número de serie
    }

    let mac = prompt("Ingrese la dirección MAC (si aplica):");
    let almacenamiento = prompt("Ingrese la capacidad en GB o TB (si aplica):");
    let estado = prompt("Ingrese el estado del producto (Nuevo/Usado):");
    let usuario = prompt("Ingrese el usuario asignado:");
    let uso = prompt("Ingrese el uso del producto:");

    // Se almacenan los productos como objetos
    let nuevoProducto = {
        tipo: obtenerNombreProducto(productoTipo),
        marca: marca,
        modelo: modelo,
        serie: serie,
        mac: mac,
        almacenamiento: almacenamiento,
        estado: estado,
        usuario: usuario,
        uso: uso
    };

    inventario.push(nuevoProducto);
    guardarInventarioEnLocalStorage(); // Guardar en el localStorage
    alert("Producto agregado correctamente:\n" + mostrarProducto(nuevoProducto));
}

// Función para modificar productos
function modificarProducto() {
    let buscarSerie = prompt("Ingrese el número de serie del producto que desea modificar:");
    let productoEncontrado = inventario.find(producto => producto.serie === buscarSerie);

    if (productoEncontrado) {
        alert("Producto encontrado: " + mostrarProducto(productoEncontrado));

        productoEncontrado.marca = prompt("Ingrese la nueva marca:", productoEncontrado.marca);
        productoEncontrado.modelo = prompt("Ingrese el nuevo modelo:", productoEncontrado.modelo);
        productoEncontrado.mac = prompt("Ingrese la nueva dirección MAC (si aplica):", productoEncontrado.mac);
        productoEncontrado.almacenamiento = prompt("Ingrese la capacidad en GB o TB (si aplica):", productoEncontrado.almacenamiento);
        productoEncontrado.estado = prompt("Ingrese el nuevo estado (Nuevo/Usado):", productoEncontrado.estado);
        productoEncontrado.usuario = prompt("Ingrese el nuevo usuario asignado:", productoEncontrado.usuario);
        productoEncontrado.uso = prompt("Ingrese el nuevo uso:", productoEncontrado.uso);

        alert("Producto modificado correctamente: " + mostrarProducto(productoEncontrado));
        guardarInventarioEnLocalStorage(); // Actualizar el localStorage
    } else {
        alert("Producto no encontrado.");
    }
}

// Función para buscar productos por usuario
function buscarProductoPorUsuario() {
    let usuarioBuscado = prompt("Ingrese el usuario para buscar productos:");
    let productosUsuario = inventario.filter(producto => producto.usuario === usuarioBuscado);

    if (productosUsuario.length > 0) {
        let resultado = "Productos encontrados para el usuario " + usuarioBuscado + ":\n";
        productosUsuario.forEach((producto, index) => {
            resultado += `Producto ${index + 1}:\n${mostrarProducto(producto)}\n`;
        });
        alert(resultado);
    } else {
        alert("No se encontraron productos para el usuario: " + usuarioBuscado);
    }
}

// Función auxiliar para obtener el nombre del producto basado en el número de caso
function obtenerNombreProducto(numeroProducto) {
    switch (numeroProducto) {
        case "1":
            return "Notebook";
        case "2":
            return "Cámara web";
        case "3":
            return "Disco duro";
        case "4":
            return "Parlantes";
        case "5":
            return "Otro insumo";
        default:
            return "Desconocido";
    }
}

// Función auxiliar para mostrar los detalles de un producto
function mostrarProducto(producto) {
    return `Tipo: ${producto.tipo}\nMarca: ${producto.marca}\nModelo: ${producto.modelo}\nSerie: ${producto.serie}\nMAC: ${producto.mac || 'N/A'}\nAlmacenamiento: ${producto.almacenamiento || 'N/A'}\nEstado: ${producto.estado}\nUsuario: ${producto.usuario}\nUso: ${producto.uso}`;
}

// Función para eliminar productos por número de serie
function eliminarProducto() {
    let buscarSerie = prompt("Ingrese el número de serie del producto que desea eliminar:");
    let productoEncontrado = inventario.find(producto => producto.serie === buscarSerie);

    if (productoEncontrado) {
        alert("Producto eliminado correctamente: " + mostrarProducto(productoEncontrado));
        // Filtra el inventario para eliminar el producto con el número de serie ingresado
        inventario = inventario.filter(producto => producto.serie !== buscarSerie);
        guardarInventarioEnLocalStorage(); // Actualizar localStorage
    } else {
        alert("Producto no encontrado.");
    }
}

// Función para exportar datos (simulación)
function exportarDatos() {
    let fecha = prompt("Elija la fecha desde cuando desea descargar un reporte (Formato: DD-MM-AAAA):");
    alert("Datos exportados desde la fecha: " + fecha);
}

// Función para cerrar la página al presionar "Salir"
function salirDelSistema() {
    alert("Saliendo del sistema...");
    window.close(); // Intenta cerrar la pestaña
}

// Oculta el contenido inicialmente
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contenido').style.display = 'none';
    validarUsuario(); // Ejecuta la validación del usuario al inicio
});

// Eventos para los botones
document.getElementById('agregarProducto').addEventListener('click', agregarProducto);
document.getElementById('modificarProducto').addEventListener('click', modificarProducto);
document.getElementById('buscarProducto').addEventListener('click', buscarProductoPorUsuario);
document.getElementById('eliminarProducto').addEventListener('click', eliminarProducto);
document.getElementById('exportarDatos').addEventListener('click', exportarDatos);
document.getElementById('salirSistema').addEventListener('click', salirDelSistema);
