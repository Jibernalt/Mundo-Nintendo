function consumirApi() {
    $.ajax({
        url: "http://worldtimeapi.org/api/timezone/America/Santiago",
        method: "GET",
        dataType: "json",
        success: function(data) {
            const horaApi = data.datetime.slice(11, 19);
            console.log("Hora de Santiago de Chile:", horaApi);
        },
        error: function(error) {
            console.error("Error al consumir la API", error);
        }
    });
}

consumirApi();