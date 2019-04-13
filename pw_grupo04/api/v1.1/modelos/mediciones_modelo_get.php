<?php

$sql = 'SELECT * FROM `mediciones` WHERE `idSensorMed`='.$query_params['id'];

$resultado = mysqli_query($conexion, $sql);

$respuesta = array();

while($fila = mysqli_fetch_assoc($resultado)){
    array_push($respuesta, $fila);
}