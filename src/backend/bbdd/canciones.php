<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require("conexion_bbdd.php");

try {
    // Consulta SQL
    $sql = "SELECT 
                canciones.cod_cancion, 
                canciones.titulo, 
                canciones.duracion, 
                canciones.num_pista, 
                canciones.cod_album,
                albumes.portada
            FROM canciones
            LEFT JOIN albumes ON canciones.cod_album = albumes.cod_album";

    $result = $conn->query($sql);

    if (!$result) {
        echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
        exit();
    }

    $canciones = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $ruta_audio = "http://localhost/dwes/my-app/src/backend/media/audio/" . $row["cod_cancion"] . ".mp3";
            
            // Verificar si la URL del archivo es accesible
            if (!file_exists("/xampp/htdocs/dwes/my-app/src/backend/media/audio/" . $row["cod_cancion"] . ".mp3")) {
                $ruta_audio = null; // Si el archivo no existe, asigna null
            }

            $canciones[] = [
                "cod_cancion" => $row["cod_cancion"],
                "titulo" => $row["titulo"],
                "duracion" => $row["duracion"],
                "num_pista" => $row["num_pista"],
                "cod_album" => $row["cod_album"],
                "portada" => $row["portada"] ? "http://localhost/dwes/my-app/src/backend/media/img/albumes/" . $row["portada"] : null,
                "audio" => $ruta_audio // Solo devuelve la URL si el archivo existe
            ];
        }
    } else {
        echo json_encode(["error" => "No se han encontrado canciones"]);
        exit();
    }

    echo json_encode($canciones, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener las canciones: " . $e->getMessage()]);
}

$conn->close();
?>
