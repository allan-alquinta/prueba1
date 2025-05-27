//validar nombre, debe contener solo letras y no ser vacio
//validar correo: Debe tener solo un @ y terminar en .cl

let datos = []; // variable global para almacenar la información

function validar() {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let errorNombre = document.getElementById("errorNombre");
    let errorEmail = document.getElementById("errorEmail");
    let valido = true;

    // Validación del nombre
    if (nombre === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        errorNombre.textContent = "Nombre inválido. Solo letras.";
        valido = false;
    } else {
        errorNombre.textContent = "";
    }

    // Validación del correo
    if (!/^[^@]+@[^@]+\.cl$/.test(email)) {
        errorEmail.textContent = "Correo inválido. Debe terminar en .cl";
        valido = false;
    } else {
        errorEmail.textContent = "";
    }

    if (valido) {
        datos.push({ nombre, email }); // guardar en variable global
        mostrarTabla();
        limpiarFormulario();
    }
}

function mostrarTabla() {
    let cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";

    datos.forEach((dato, index) => {
        let fila = `<tr>
            <td>${dato.nombre}</td>
            <td>${dato.email}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>
        </tr>`;
        cuerpo.innerHTML += fila;
    });
}

function eliminar(index) {
    if (confirm("¿Estás seguro que quieres eliminar este dato?")) {
        datos.splice(index, 1);
        mostrarTabla();
    }
}

function editar(index) {
    let dato = datos[index];
    document.getElementById("nombre").value = dato.nombre;
    document.getElementById("email").value = dato.email;

    // Reemplazamos el botón por uno de "Actualizar"
    let btn = document.getElementById("btn");
    btn.textContent = "Actualizar";
    btn.onclick = function () {
        actualizar(index);
    };
}

function actualizar(index) {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();

    datos[index] = { nombre, email };
    mostrarTabla();
    limpiarFormulario();

    let btn = document.getElementById("btn");
    btn.textContent = "Enviar";
    btn.onclick = validar;
}

function limpiarFormulario() {
    document.getElementById("miFormulario").reset();
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorEmail").textContent = "";
}
