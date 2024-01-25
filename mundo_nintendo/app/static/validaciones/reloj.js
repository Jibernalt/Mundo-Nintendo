function actualizarReloj(hora) {
    $('#reloj').text(hora);
}

function obtenerHoraDeApi() {
    $.ajax({
        url: "http://worldtimeapi.org/api/timezone/America/Santiago",
        method: "GET",
        dataType: "json",
        success: function(data) {
            const hora = data.datetime.slice(11, 19);
            actualizarReloj(hora);
        },
        error: function(error) {
            console.error("Error al obtener la hora de la API", error);
        }
    });
}

setInterval(obtenerHoraDeApi, 1000);
obtenerHoraDeApi();