<?php

$sql = 'UPDATE `eventos` SET `title`="'.$body_params['title'].'", `contenido`="'.$body_params['contenido'].'", `start`="'.$body_params['start'].'", `end`="'.$body_params['end'].'" WHERE `id_evento`='.$body_params['id'];

$resultado = mysqli_query($conexion, $sql);

$respuesta = array();

$sql_select = 'SELECT `eventos`.* FROM `eventos` WHERE `id_evento`='.$body_params['id'];

$resultado_select = mysqli_query($conexion, $sql_select);

if($resultado === true){
    while($fila = mysqli_fetch_assoc($resultado_select)){
        array_push($respuesta, $fila);
    }
}