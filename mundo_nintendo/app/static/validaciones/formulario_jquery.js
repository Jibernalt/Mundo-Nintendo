$("#formulario_contacto").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 15
        },
        apellido: {
            required: true,
            minlength: 3,
            maxlength: 15
        },
        nombre_usuario: {
            required: true,
            minlength: 3,
            maxlength: 15
        },
        ciudad: {
            required: true,
            minlength: 3,
            maxlength: 15
        },
        region: {
            required: true
        },
        comuna: {
            required: true
        },
        fecha_nac: {
            required: true
        },
        num_tel: {
            required: true
            
        },
        genero: {
            required: true
        },
        contrasena: {
            required: true
        },
        rep_contrasena: {
            required: true,
            equalTo: "#contrasena"
        },
        avisos: {
            required: true
        }
    },
    messages: {
        nombre: {
            required: "El nombre es requerido",
            minlength: "El largo mínimo es de 3 caracteres",
            maxlength: "El largo máximo es de 15 caracteres"
        },
        apellido: {
            required: "El apellido es requerido",
            minlength: "El largo mínimo es de 3 caracteres",
            maxlength: "El largo máximo es de 15 caracteres"
        },
        nombre_usuario: {
            required: "El nombre de usuario es requerido",
            minlength: "El largo mínimo es de 3 caracteres",
            maxlength: "El largo máximo es de 15 caracteres"
        },
        ciudad: {
            required: "La ciudad es requerida",
            minlength: "El largo mínimo es de 3 caracteres",
            maxlength: "El largo máximo es de 15 caracteres"
        },
        region: {
            required: "Selecciona una región"
        },
        comuna: {
            required: "La comuna es requerida"
        },
        fecha_nac: {
            required: "La fecha de nacimiento es requerida"
        },
        num_tel: {
            required: "El número de teléfono es requerido"
        },
        genero: {
            required: "Selecciona un género"
        },
        contrasena: {
            required: "La contraseña es requerida"
        },
        rep_contrasena: {
            required: "Repite la contraseña",
            equalTo: "Las contraseñas no coinciden"
        },
        avisos: {
            required: "Debes aceptar los términos y condiciones"
        }
    }
});

$("#guardar").click(function (event) {
    if ($("#formulario_contacto").valid() == false) {
        event.preventDefault(); // Evitar el envío del formulario si no es válido
    }
    
});
