<?php

$sql = 'SELECT `eventos`.* FROM `eventos`,`usuarios` WHERE `eventos`.`id_usuario`=`usuarios`.`id_usuario` AND `eventos`.`id_usuario`='.$query_params['usuario'];

$resultado = mysqli_query($conexion, $sql);

$respuesta = array();

while($fila = mysqli_fetch_assoc($resultado)){
    array_push($respuesta, $fila);
}