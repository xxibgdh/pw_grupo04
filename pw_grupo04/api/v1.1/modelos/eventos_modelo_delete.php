<?php

$sql = 'DELETE FROM `eventos` WHERE `id_evento`='.$uri_params['id_evento'];

$resultado = mysqli_query($conexion, $sql);

$respuesta = array();

if($resultado === true){
    $respuesta['exito'] = true;
    $respuesta['id_evento'] = $uri_params['id_evento'];
}