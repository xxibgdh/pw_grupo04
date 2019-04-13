// -- CONSEGUIR TODOS LOS EVENTOS AL CARGAR LA PÁGINA --

function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function carga(){
    var usuario = getUrlVars()["id_usuario"];
    //console.log(usuario);
    getEventos(usuario);
    document.getElementById('id').value = usuario;
}

function getEventos(usuario){
    if (usuario == 0) return;
        fetch('../api/v1.1/eventos/?usuario=' + usuario).then(function(r) {
            return r.json();
        }).then(function(j) {
            console.log(j);
            var eventos = j.datos;
            for(var i=0; i<eventos.length; i++){
                var t = eventos[i].start.split(" ");
                //console.log(t);
                eventos[i].start = t[0] + " " + t[1];
            }
            for(var i=0; i<eventos.length; i++){
                var t = eventos[i].end.split(" ");
                //console.log(t);
                eventos[i].end = t[0] + " " + t[1];
            }
            console.log(eventos);
            mostrarEventos(eventos);
        })
}

function mostrarEventos(eventos){
    //console.log(JSON.stringify(eventos));
    //document.getElementById('datos').innerHTML = JSON.stringify(eventos);
    for(var i=0; i<eventos.length;i++){
        calendar.addEvent({
            id: eventos[i].id_evento,
            title: eventos[i].title,
            start: eventos[i].start,
            end: eventos[i].end
        })
    }
}


// -- CONSEGUIR EL EVENTO SELECCIONADO --

function getEvento(idEvento){
    var usuario = getUrlVars()["id_usuario"];
    console.log(idEvento);
    fetch('../api/v1.1/eventos/?usuario=' + usuario).then(function(r) {
            return r.json();
        }).then(function(j) {
            console.log(j);
            var eventos = j.datos;
            for(var i=0; i<eventos.length;i++){
                let div = document.getElementById("datos");
                if(eventos[i].id_evento == idEvento){
                    var arrayInicio = eventos[i].start.split(" ");
                    var fechaInicio = arrayInicio[0].split("-");
                    var horasInicio = arrayInicio[1].split(":");
                    var arrayFin = eventos[i].end.split(" ");
                    var fechaFin = arrayFin[0].split("-");
                    var horasFin = arrayFin[1].split(":");
                    div.innerHTML = "<div id='openModalDatos' class='modalDialog'><div><a href='#close' title='Close' class='close'>X</a><h4>Título:</h4>" + eventos[i].title + "<h4>Descripción:</h4>" + eventos[i].contenido + "<h4>Fecha de inicio:</h4>" + eventos[i].start + "<h4>Fecha de fin:</h4>" + eventos[i].end + "<input type='hidden' id='idevento' value='" + eventos[i].id_evento + "'><button class='eliminar' onclick='borrarEvento()'><i class='fas fa-trash'></i></button>" + "<a class='editar' href='#openModalEdit'><i class='fas fa-pencil-alt'></i></a></div></div>" + "<div id='openModalEdit' class='modalDialog'><div><a href='#close' title='Close' class='close'>X</a><form id='editarEvento' onsubmit='return editarEvento(this)'><h4>Título:</h4><input type='text' placeholder='" + eventos[i].title + "' id='nombre' name='titulo'><h4>Descripción:</h4><input type='text' placeholder='" + eventos[i].contenido + "' id='descripcion' name='descripcion'><h4>Fecha de inicio:</h4><div class='input-fecha-inicio'><input type='text' placeholder='" + fechaInicio[2] + "' id='dia-inicio' name='dia-inicio'><input type='text' placeholder='" + fechaInicio[1] + "' id='mes-inicio' name='mes-inicio'><input type='text' placeholder='" + fechaInicio[0] + "' id='año-inicio' name='año-inicio'></div><h4>Hora de inicio:</h4><div class='input-hora-inicio'><input type='text' placeholder='" + horasInicio[0] + "' id='hora-inicio' name='hora-inicio'><input type='text' placeholder='" + horasInicio[1] + "' id='minutos-inicio' name='minutos-inicio'><input type='text' placeholder='" + horasInicio[2] + "' id='segundos-inicio' name='segundos-inicio'></div><h4>Fecha de final:</h4><div class='input-fecha-fin'><input type='text' placeholder='" + fechaFin[2] + "' id='dia-fin' name='dia-fin'><input type='text' placeholder='" + fechaFin[1] + "' id='mes-fin' name='mes-fin'><input type='text' placeholder='" + fechaFin[0] + "' id='año-fin' name='año-fin'></div><h4>Hora de final:</h4><div class='input-hora-fin'><input type='text' placeholder='" + horasFin[0] + "' id='hora-fin' name='hora-fin'><input type='text' placeholder='" + horasFin[1] + "' id='minutos-fin' name='minutos-fin'><input type='text' placeholder='" + horasFin[2] + "' id='segundos-fin' name='segundos-fin'></div><input type='hidden' name='id' id='id' value='" + eventos[i].id_evento + "'><button class='btn btn-primary'>Enviar</button></form></div></div>";
                    document.location.href = '#openModalDatos';
                }
            }
        })
}


// -- AÑADIR EVENTO --

function crearEvento(form){
    var usuario = getUrlVars()["id_usuario"];
    console.log(new FormData(form));
    fetch('../api/v1.1/eventos?debug', {
        method: 'post',
        body: new FormData(form)
    }).then(function(r) {
        return r.json();
    }).then(function(j) {
        console.log(j);
        console.log(j.datos);
        window.location.href = "#close";
        calendar.addEvent({
            id: j.datos[0].id_evento,
            title: j.datos[0].title,
            start: j.datos[0].start,
            end: j.datos[0].end
        })
    });
    return false;
}

// -- ELIMINAR EVENTO SELECCIONADO --

function borrarEvento(){
    if (confirm('Si elimina el evento no volverá a tener acceso a dicho evento. ¿Deseas eliminar el evento?')) {
        fetch('../api/v1.1/eventos/id_evento/' + document.getElementById('idevento').value, {
            method: 'delete'
        }).then(function(r) {
            return r.json();
        }).then(function(j) {
            console.log(j);
            var eventoaEliminar = calendar.getEventById( j.datos.id_evento );
            eventoaEliminar.remove();
            let div = document.getElementById("datos");
            div.innerHTML = "";
        });
    }
}

// -- EDITAR EVENTO SELECCIONADO --

function editarEvento(form){
    console.log(form['id'].value);
    fetch('../api/v1.1/eventos?debug', {
        method: 'put',
        body: JSON.stringify({
            id: form['id'].value,
            title: form['titulo'].value,
            contenido: form['descripcion'].value,
            start: form['año-inicio'].value + "-" + form['mes-inicio'].value + "-" + form['dia-inicio'].value + " " + form['hora-inicio'].value + ":" + form['minutos-inicio'].value + ":" + form['segundos-inicio'].value,
            end: form['año-fin'].value + "-" + form['mes-fin'].value + "-" + form['dia-fin'].value + " " + form['hora-fin'].value + ":" + form['minutos-fin'].value + ":" + form['segundos-fin'].value
        })
    }).then(function(r) {
        return r.json();
    }).then(function(j) {
        console.log(j);
        var eventoaEliminar = calendar.getEventById( j.datos[0].id_evento );
        eventoaEliminar.remove();
        let div = document.getElementById("datos");
        div.innerHTML = "";
        calendar.addEvent({
            id: j.datos[0].id_evento,
            title: j.datos[0].title,
            start: j.datos[0].start,
            end: j.datos[0].end
        })
    });
    return false;
}
            
// -- VOLVER AL DASHBOARD -- 

function volverInicio(){
    var usuario = getUrlVars()["id_usuario"];
    var email = getUrlVars()["email"];
    document.location.href = '../dashboard.html?id_usuario=' + usuario + '&email=' + email; 
}