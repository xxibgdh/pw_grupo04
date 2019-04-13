<?php

$fechaInicio = $form_params['año-inicio'] . "-" . $form_params['mes-inicio'] . "-" . $form_params['dia-inicio'] . " " . $form_params['hora-inicio'] . ":" . $form_params['minutos-inicio'] . ":" . $form_params['segundos-inicio'];
$fechaFin = $form_params['año-fin'] . "-" . $form_params['mes-fin'] . "-" . $form_params['dia-fin'] . " " . $form_params['hora-fin'] . ":" . $form_params['minutos-fin'] . ":" . $form_params['segundos-fin'];

$sql = 'INSERT INTO `eventos`(`id_usuario`,`title`,`contenido`,`start`,`end`) VALUES ('.$form_params['id'].',"'.$form_params['titulo'].'","'.$form_params['descripcion'].'","'.$fechaInicio.'","'.$fechaFin.'")';

$resultado = mysqli_query($conexion, $sql);

$respuesta = array();

$id_evento = mysqli_insert_id($conexion);

$sql_select = 'SELECT `eventos`.* FROM `eventos` WHERE `id_evento`='.$id_evento;

$resultado_select = mysqli_query($conexion, $sql_select);

if($resultado === true){
    while($fila = mysqli_fetch_assoc($resultado_select)){
        array_push($respuesta, $fila);
    }
}
