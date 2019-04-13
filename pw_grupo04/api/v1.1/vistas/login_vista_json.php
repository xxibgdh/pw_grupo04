<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=utf-8");

$output['datos'] = $respuesta;


if(count($output['datos']) != 0 ){
    echo json_encode($output);
}
else{
    $output['datos'] = array();
    echo json_encode($output);
}