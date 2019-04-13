<!DOCTYPE html>
<html lang="es">

<head>
   <!-- metas -->
    <meta charset='utf-8' />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, maximum-scale=1">
    <meta http-equip="x-ua-compatible" content="ie-edge">
    <!-- carga de archivos externos css-->
    <link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'>
    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet' />
    <!-- carga de archivos internos css-->
    <link href='../packages/core/main.css' rel='stylesheet' />
    <link href='../packages/bootstrap/main.css' rel='stylesheet' />
    <link href='../packages/daygrid/main.css' rel='stylesheet' />
    <link href='../packages/timegrid/main.css' rel='stylesheet' />
    <link href='../packages/list/main.css' rel='stylesheet' />
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- carga de scripts de la api-->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src='../packages/core/main.js'></script>
    <script src='../packages/core/locales-all.js'></script>
    <script src='../packages/bootstrap/main.js'></script>
    <script src='../packages/interaction/main.js'></script>
    <script src='../packages/daygrid/main.js'></script>
    <script src='../packages/timegrid/main.js'></script>
    <script src='../packages/list/main.js'></script>
    <!-- archivo css -->
    <link rel="stylesheet" href="css/style-calendar.css">
    <!-- estilo exclusivamente del calendario-->
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
            font-size: 14px;
            background-color: #eeeeee;
        }

        #calendar {
            max-width: 900px;
            margin: 40px auto;
            padding: 0 10px;
            background-color: white;
        }

    </style>
</head>

<body onload="carga()">
    <!-- carga del calendario-->
    <script>
        var fechaSinFormato = new Date();
        var dia = fechaSinFormato.getDate();
        var mes = fechaSinFormato.getMonth() + 1;
        var año = fechaSinFormato.getFullYear();
        var fecha = año + '-' + mes + '-' + dia;
        console.log(fecha);

        var calendar;

        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('calendar');

            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list'],
                themeSystem: 'bootstrap',
                eventClick: function(info) {
                    var eventObj = info.event;
                    getEvento(eventObj.id);
                    //console.log(eventObj.title);
                },
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                defaultDate: fecha,
                locale: 'es',
                buttonIcons: false, // show the prev/next text
                weekNumbers: false,
                navLinks: true, // can click day/week names to navigate views
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: []
            });

            calendar.render();

        });

    </script>
    
    <header class="encabezado">
        <a href="#"  alt="cerrar sesion">
            <img src="../img/logoGTI.svg" alt="logo corporativo">
        </a>
        <button type="button" class="boton-menu" data-toggle="collapse" data-target="#menu-principal" aria-expanded="false" aria-controls="menu-principal"><i class="fas fa-bars"></i></button>
        <nav id="menu-principal" class="collapse">
            <ul>
                <li><a onclick="volverInicio()">Mapa de parcelas</a></li>
                <li class="active"><a onclick="location.refresh()">Calendario</a></li>
                <li><a href="../login/login.html">Cerrar sesión</a></li>
            </ul>
        </nav>
    </header>

    <section class="contenido">
        <div id='calendar'></div>

        <!-- AÑADIR EVENTO -->
        <footer class="botones">
           <button class="volver" onclick="volverInicio()"><i class="boton-volver fas fa-arrow-circle-left"></i></button>
            <a class="anyadir" href="#openModal"><i class="boton-anyadir fas fa-plus-circle"></i></a>
        </footer>

        <div id="openModal" class="modalDialog">
            <div>
                <a href="#close" title="Close" class="close">X</a>
                <form id="crearEvento" onsubmit="return crearEvento(this)">
                    <h4>Título:</h4>
                    <input type="text" id="nombre" name="titulo">
                    <h4>Descripción:</h4>
                    <input type="text" id="descripcion" name="descripcion">
                    <h4>Fecha de inicio:</h4>
                    <div class="input-fecha-inicio">
                        <input type="text" placeholder="día (número)" id="dia-inicio" name="dia-inicio">
                        <input type="text" placeholder="mes (número)" id="mes-inicio" name="mes-inicio">
                        <input type="text" placeholder="año (número)" id="año-inicio" name="año-inicio">
                    </div>
                    <h4>Hora de inicio:</h4>
                    <div class="input-hora-inicio">
                        <input type="text" placeholder="horas" id="hora-inicio" name="hora-inicio">
                        <input type="text" placeholder="minutos" id="minutos-inicio" name="minutos-inicio">
                        <input type="text" placeholder="segundos" id="segundos-inicio" name="segundos-inicio">
                    </div>
                    <h4>Fecha de final:</h4>
                    <div class="input-fecha-fin">
                        <input type="text" placeholder="día (número)" id="dia-fin" name="dia-fin">
                        <input type="text" placeholder="mes (número)" id="mes-fin" name="mes-fin">
                        <input type="text" placeholder="año (número)" id="año-fin" name="año-fin">
                    </div>
                    <h4>Hora de final:</h4>
                    <div class="input-hora-fin">
                        <input type="text" placeholder="horas" id="hora-fin" name="hora-fin">
                        <input type="text" placeholder="minutos" id="minutos-fin" name="minutos-fin">
                        <input type="text" placeholder="segundos" id="segundos-fin" name="segundos-fin">
                    </div>
                    <input type="hidden" name="id" id="id">
                    <button class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>

        <div id="datos"></div>
    </section>

    <!-- carga del javascript de los datos-->

    <script src="js/getEventos.js"></script>

</body>

</html>
