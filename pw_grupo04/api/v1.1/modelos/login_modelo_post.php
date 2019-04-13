<?php

$sql = 'SELECT `id_usuario`,`email`,`contrasenya` FROM `usuarios` WHERE "'.$form_params['email'].'"=`email`';

$resultado = mysqli_query($conexion, $sql);

$respuesta = array();

while($fila = mysqli_fetch_assoc($resultado)){
    array_push($respuesta, $fila);
}