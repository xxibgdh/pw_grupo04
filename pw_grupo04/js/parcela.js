var polygons = [];

//cada miembro del equipo hace una función

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function carga() {
    var usuario = getUrlVars()["id_usuario"];
    getParcelas(usuario);
}

function getParcelas(usuario) {
    // TODO: obtener un listado en json de las parcelas d eun usuario
    //var json;
    var urlAPI = './api/v1.0/info/';
    var opciones = {};
    opciones.method = 'GET';
    urlAPI += '?id_usuario_getparcelas=' + usuario;
    
    fetch(urlAPI, opciones).then(function(respuesta) {
            console.log(respuesta);
            return respuesta.json();
        }).then(function(datosJson) {
            console.log(datosJson);
            if (datosJson.resultado == 'OK') {
                //si todo va bien
                //console.log(datosJson.data);
                crearListaParcelas(JSON.parse(datosJson.data));
            } else {
                // FIXME: al llegar aqui es por tener un error
            }
    })
}

function crearListaParcelas(json) {
    // TODO: coges el json que llega por parametro y se crea la lista
    console.log(json);
    //console.log($miArray);
    var parcelas = "";
    var i = 1;
    for (const prop in json) {
        console.log(json[prop]['nombre']);
        parcelas += '<input type="checkbox" name="CheckBoxInputName" value="'+json[prop]['id_par']+'" id="CheckBox'+i+'" checked/><label class="list-group-item" name="' + json[prop]['id_par'] + '" for="CheckBox'+i+'" onclick="seleccionarParcela('+json[prop]['id_par'] +')">'+i+'-  Nombre: ' + json[prop]['nombre'] + '</label>';
        i++
        getPosicionesParcelas(json[prop]['id_par']);
        
    }
    //console.log(parcelas);
    document.getElementById("lista_parcelas").innerHTML = parcelas;
}

function seleccionarParcela(parcela) {
    // TODO: marcar el item parcela como seleccionado 
    //console.log(parcela);
    
    var misitems = document.getElementsByName("CheckBoxInputName");
    for(var i = 0; i < misitems.length; i++)
    {

        if(!misitems.item(i).checked && misitems.item(i).value == parcela){
            console.log("mostar " + parcela);
            mostrarParcelaMapa(parcela);
        }
        if(misitems.item(i).checked && misitems.item(i).value == parcela){
            ocultarParcelaMapa(parcela);
            console.log("ocultar " + parcela);
        } 
    }
    
}

function ocultarParcelaMapa(parcela) {
    // TODO: 
    ocultarPosiconesParcela(parcela);
    
    ocultarSensoresMapa(parcela);
}

function mostrarParcelaMapa(parcela) {
    // TODO: 
    getPosicionesParcelas(parcela);
    
}

function getPosicionesParcelas(parcela) {
    // TODO: se encarga de obtener un listado json con las posicones asignadas a una pardcela
    var urlAPI = './api/v1.0/info/';
    var opciones = {};
    opciones.method = 'GET';
    urlAPI += '?id_parcela_get_posiciones=' + parcela;
    
    setTimeout( function() { getSensores(parcela); } ,300)
    setTimeout(function() {AutoCenter()}, 1200 );
    
    fetch(urlAPI, opciones).then(function(respuesta) {
            return respuesta.json();
        }).then(function(datosJson) {
            console.log( datosJson);
            if (datosJson.resultado == 'OK') {
                //si todo va bien
                //console.log(datosJson.data);
                
                mostrarPosicionesMapa(datosJson.data, parcela);
                //mostrarPosicionesMapa(JSON.parse(datosJson.data));
            } else {
                // FIXME: al llegar aqui es por tener un error
            }
    })
}

function mostrarPosicionesMapa(jsonPosiones, id_parcela) {
    var posi = JSON.parse(jsonPosiones);
    console.log(posi);
    var poligono = new google.maps.Polygon({
            paths: posi,
            id: id_parcela,
            map: map,
            editable: false,
            strokeColor: '#29ff4c',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: '#29ff4c',
            fillOpacity: 0.35         
    });
    polygons.push(poligono);
}

function ocultarPosiconesParcela(parcela){
    console.log("ocultarpracela");
    for(i=0; i<polygons.length ; i++){
        //console.log(polygons[i].id);
        if(polygons[i].id == parcela){
            console.log("ocultarpracela dentro");
            polygons[i].setMap(null);
            polygons.splice(i, 1); 
        }
    }
}

function AutoCenter() {
    
    infoMarkers();
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();
    //  Go through each...
    $.each(markers, function (index, marker) {
        bounds.extend(marker.position);
    });
    //  Fit these bounds to the map
    map.fitBounds(bounds);
    
    //encuadrarMapa();
    // FIXME: hacer encuadre correcto
}

function infoMarkers(){
    
    var infowindow = null;
    //var contentString = '<div id="content"><p class="font-weight-bold">Temperatura: 32ª C <br>Humedad: 55 %  </p></div>'
    
    var contentString = '';
    
    /*infowindow = new google.maps.InfoWindow({
        content: contentString
    });*/
    
    console.log(markers.length);

    for (var i = 0; i < markers.length; i++) {
        
        contentString = '<div id="content"><table border="0" class="font-weight-bold"><tr><td>Temperatura:&nbsp;&nbsp;</td><td>32ºC</td></tr><tr><td>Humedad:</td><td>56 %</td></tr><tr><td>Salinidad:</td><td>13 %</td></tr><tr><td>Iluminación:</td><td>81 %</td></tr><tr><td>Presión:</td><td>1000.51 </td></tr></table> <table boarder=0 ><tr><center><a href="chart/chart.html?id_usuario=' + getUrlVars()["id_usuario"] + '&email=' + getParam("email") + '&id='+ markers[i].store_id +'" class="font-weight-bold">Mas información<br>click aquí</a></center></tr></table></div>'
        
        console.log(contentString);
        
        infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = markers[i];
        google.maps.event.addListener(marker, 'click', function () {
            // where I have added .html to the marker object.
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
    }
}
