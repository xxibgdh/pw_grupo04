<?php

require_once 'conexion.php';
$url = explode('/', $_SERVER['REQUEST_URI']);

$respuesta = array();
$parametros = array();

switch($_SERVER['REQUEST_METHOD']){
    case 'GET':
        $parametros = $_GET;
        //procesar los parámetros y generar SELECT
        if(isset($parametros['email_usuario'])){
            loginUsuario();
        } elseif(isset($parametros['id_usuario_getparcelas'])){
            getParcelas();
        }elseif(isset($parametros['id_parcela_get_posiciones'])){
            getPosiciones();
        }elseif(isset($parametros['id_parcela_getsensores'])){
            getSensores();
        }
        break;
    case 'POST':
        $parametros = $_POST;
        //procesar los parámetros y generar INSERT
        break;
    case 'PUT':
        $body = json_decode(file_get_contents('php://input'));
        $parametros = (array) $body;
        //procesar los parámetros y generar UPDATE
        break;
    case 'DELETE':
        for($i = 5; $i < count($url); $i++){
            $parametros[$url[$i]] = $url[++$i];
        }
        //procesar los parámetros y generar DELETE
        break;
}

class sensores { 
      
    /* Member variables */
    var $id_sensor;
    var $lat; 
    var $lng; 
      
    function __construct( $par1, $par2, $par3 )  
    { 
        $this->id_sensor = $par1;
        $this->lat = $par2; 
        $this->lng = $par3; 
    } 
} 

function getSensores(){
    global $parametros, $conexion,$respuesta;
    
    $sql = 'SELECT * FROM `sensores` WHERE `id_parcela`='.$parametros['id_parcela_getsensores'];
    //echo $sql;
    $resultado = mysqli_query($conexion, $sql);

    if (mysqli_num_rows($resultado) > 0 ){
        $miarray = array();
        while($fila = mysqli_fetch_assoc($resultado)){
            array_push($miarray, new sensores($fila['id_sensor'],floatval($fila['lat']),floatval($fila['lng'])));
        }
        $respuesta['resultado'] = 'OK';
        $respuesta['data'] = json_encode($miarray);
    } else {
        // FIXME: puede que el usuario no tenga parcelas
        $respuesta['resultado'] = 'NO';
    }
}

class vertices { 
      
    /* Member variables */
    var $lat; 
    var $lng; 
      
    function __construct( $par1, $par2 )  
    { 
        $this->lat = $par1; 
        $this->lng = $par2; 
    } 
} 

function getPosiciones(){
    global $parametros, $conexion,$respuesta;
    
    $sql = 'SELECT * FROM `vertices` WHERE `id_parcela`='.$parametros['id_parcela_get_posiciones'];
    //echo $sql;
    $resultado = mysqli_query($conexion, $sql);

    if (mysqli_num_rows($resultado) > 0 ){
        $miarray = array();
        while($fila = mysqli_fetch_assoc($resultado)){
            array_push($miarray, new vertices(floatval($fila['lat']),floatval($fila['lng'])));
        }
        $respuesta['resultado'] = 'OK';
        $respuesta['data'] = json_encode($miarray);
    } else {
        // FIXME: puede que el usuario no tenga parcelas
        $respuesta['resultado'] = 'NO';
    }
}

class parcelas { 
      
    /* Member variables */
    var $id_par; 
    var $nombre; 
      
    function __construct( $par1, $par2 )  
    { 
        $this->id_par = $par1; 
        $this->nombre = $par2; 
    } 
} 
  

function getParcelas(){
    global $parametros, $conexion,$respuesta;
    $sql = 'SELECT * FROM `parcelas`,`usuarios`,`perteneceparcela` WHERE `parcelas`.`id_parcela` = `perteneceparcela`.`id_parcela` and `usuarios`.`id_usuario` = `perteneceparcela`.`id_usuario` and `usuarios`.`id_usuario`='.$parametros['id_usuario_getparcelas'];
    
    $resultado = mysqli_query($conexion, $sql);
        $resultado = mysqli_query($conexion, $sql);
    if (mysqli_num_rows($resultado) > 0 ){
        $miarray = array();
        while($fila = mysqli_fetch_assoc($resultado)){
            array_push($miarray, new parcelas($fila['id_parcela'],$fila['nombre_par']));
        }
        $respuesta['resultado'] = 'OK';
        $respuesta['data'] = json_encode($miarray);
    } else {
        // FIXME: puede que el usuario no tenga parcelas
        $respuesta['resultado'] = 'NO';
    }
}

$respuesta['metodo'] = $_SERVER['REQUEST_METHOD'];
$respuesta['uri']= $url[4];

echo json_encode($respuesta);

?>
