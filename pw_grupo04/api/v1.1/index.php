<?php

require_once '../v1.0/conexion.php';

$uri = explode('v1.1/',parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[1];
$uri_array = explode('/',$uri);
$recurso = array_shift($uri_array);

// -- RECUPERAR PARÁMETROS DEL FORM DATA --
$form_params = $_POST;

// -- RECUPERAR PARÁMETROS DE LA URI --
$uri_params = array();
for($i = 0; $i < count($uri_array) ; $i++){
    if($uri_array[$i] != ""){
        $uri_params[$uri_array[$i]] = $uri_array[++$i];
    }
}

// RECUPERAR PARÁMETROS DEL BODY
$body_params = (array) json_decode(file_get_contents('php://input'));

// -- RECUPERAR PARÁMETROS DE LA QUERY --
$query_params = $_GET;

// -- OUTPUT --
$output = array();
$output['metodo'] = strtolower($_SERVER['REQUEST_METHOD']);
$output['recurso']= $recurso;
$output['uri_params'] = $uri_params;

require('controladores/'.$output['recurso'].'_controlador.php');