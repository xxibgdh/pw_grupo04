var markers = [];
function getSensores(parcela) {

    // TODO: obtener un listado en json de las parcelas d eun usuario
    //var json;
    var urlAPI = './api/v1.0/info/';
    var opciones = {};
    opciones.method = 'GET';
    urlAPI += '?id_parcela_getsensores=' + parcela;

    console.log("llega a sensores");

    fetch(urlAPI, opciones).then(function (respuesta) {
        //console.log(respuesta);
        return respuesta.json();
    }).then(function (datosJson) {
        console.log(datosJson);
        if (datosJson.resultado == 'OK') {
            //si todo va bien
            mostrarSensoresMapa(JSON.parse(datosJson.data));
        } else {
            // FIXME: al llegar aqui es por tener un error
        }
    })
}


function mostrarSensoresMapa(json) {
    console.log(json);
    //color verde #00db22
    var cir = {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6, //tamaño
              strokeColor: '#ffd800', //color del borde
              strokeWeight: 2, //grosor del borde
              fillColor: '#f7ff33', //color de relleno
              fillOpacity:1// opacidad del relleno
            };
    var square = {
            path: 'M -2,-2 2,-2 2,2 -2,2 z', // 'M -2,0 0,-2 2,0 0,2 z',
            strokeColor: 'rgba(137, 255, 0, 0.68)',
            fillColor: 'rgba(255, 226, 0, 0.68)',
            fillOpacity: 1,
            scale: 5
    };
    
    for (var i = 0; i < json.length; i++) {
        console.log(json[i]);
        //var limitesMapa = map.getBounds();
        //limitesMapa.extend(json[i]);
        //map.fitBounds(limitesMapa);
        
        var marca = new google.maps.Marker({
            position: json[i],
            map: map,
            animation: google.maps.Animation.DROP,
            store_id: json[i].id_sensor,
            icon: square,
            
        });
        markers.push(marca);
    }
    
}

function removeMarkers(sensores){
    for (var x = 0; x < sensores.length; x++) {
        for(i=0; i<markers.length ; i++){
            if(markers[i].store_id == sensores[x].id_sensor){
                markers[i].setMap(null);
                markers.splice(i, 1); 
            }
        }
    }
}

function ocultarSensoresMapa(parcela) {
    var urlAPI = './api/v1.0/info/';
    var opciones = {};
    opciones.method = 'GET';
    urlAPI += '?id_parcela_getsensores=' + parcela;

    console.log("llega a sensores");

    fetch(urlAPI, opciones).then(function (respuesta) {
        return respuesta.json();
    }).then(function (datosJson) {
        console.log(datosJson);
        if (datosJson.resultado == 'OK') {
            var res = JSON.parse(datosJson.data);
            removeMarkers(res);
        } else {
            // FIXME: al llegar aqui es por tener un error
        }
    })
}