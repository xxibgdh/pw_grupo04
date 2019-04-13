function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getParam(t) {
    var param = getUrlVars()[t];
    return param;
}

function redireccionCalendario() {
    var id = getParam("id_usuario");
    var email = getParam("email");
    //console.log(id);
    //console.log(email);
    document.location.href = '../calendario/locales.php?id_usuario=' + id + '&email=' + email;
}

function redireccionParcelas() {
    var id = getParam("id_usuario");
    var email = getParam("email");
    //console.log(id);
    //console.log(email);
    document.location.href = '../dashboard.html?id_usuario=' + id + '&email=' + email;
}

function volverInicio() {
    var usuario = getUrlVars()["id_usuario"];
    var email = getUrlVars()["email"];
    document.location.href = '../dashboard.html?id_usuario=' + usuario + '&email=' + email;
}

function carga() {
    var id = getParam("id");
    console.log(id);
    getMediciones(id);
}

function getMediciones(id) {

    if (id == 0) return;
    fetch('../api/v1.1/mediciones/?id=' + id).then(function (r) {
        return r.json();
    }).then(function (j) {
        /*
        console.log(j.length)
        for (var i = 0; i < j.length; i++) {
            console.log(j[i]);
        }*/
        extractData(j.datos);
    })
}

var hum = [];
var temp = [];
var datetime = [];
var dias = [];
var sal = [];
var presure = [];
var iluminacion = [];

function extractData(json) {
    console.log(json)
    for (var i = 0; i < json.length; i++) {
        console.log(json[i]);
        datetime.push(json[i].date);
        temp.push(json[i].temp);
        hum.push(json[i].hum);
        sal.push(json[i].sal)
        presure.push(json[i].pre)
        iluminacion.push(json[i].light)
        dias[i] = "Día" + (i + 1);
    }
    llenado();
}

function llenado() {

    var opciones = {
        type: 'line', // tipo de gráfica
        data: { //datos
            labels: datetime, //escala datos en x
            datasets: [{ // lineas que se dibujan
                    label: 'Temperatura',
                    data: temp,
                    fill: false,
                    borderColor: "#fa0043"
                    },
                    { // lineas que se dibujan
                    label: 'Humedad',
                    data: hum,
                    borderColor: "#1ecbff",
                    fill: false,
                    },
                    { // lineas que se dibujan
                    label: 'Salinidad',
                    data: sal,
                    borderColor: "silver",
                    fill: false,
                    },
                    { // lineas que se dibujan
                    label: 'Iluminación',
                    data: iluminacion,
                    borderColor: "yellow",
                    fill: false,
                    },
                    { // lineas que se dibujan
                    label: 'Presión',
                    data: presure,
                    borderColor: "green",
                    fill: false,
                        }
                    ]
        },

        options: {
            maintainAspectRatio:false,
            responsive: true,
            scales: {
                xAxes: [{
                    display: false,
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation: 0
                    }
                        }]
            }
        }


    };

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, opciones);
}
