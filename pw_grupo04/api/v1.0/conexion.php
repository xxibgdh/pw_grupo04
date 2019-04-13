<?php

$conexion = mysqli_connect("localhost", "almib_admin", "amb27032000", "almibar1_pw_grupo04");

mysqli_query($conexion, 'SET NAMES utf8');

if($conexion){
    //echo "funciona";
} else {
    //echo "no funciona";
}

?>