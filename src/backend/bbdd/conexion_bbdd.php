<?php
    $servername = "localhost";
    $username = "root";
    $password = ""; 
    $dbname = "discoteca";
    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
   
?>
