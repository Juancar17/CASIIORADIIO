<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require("conexion_bbdd.php");

try {
    $sql = "SELECT cod_grupo, nombre, nacionalidad, biografia, foto FROM grupos";
    $result = $conn->query($sql);

    $artistas = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $artistas[] = [
                "cod_grupo" => $row["cod_grupo"],
                "nombre" => $row["nombre"],
                "nacionalidad" => $row["nacionalidad"],
                "biografia" => $row["biografia"],
                "foto" => $row["foto"] ? "http://localhost/DWES/my-app/src/backend/media/img/grupos/" . $row["foto"] : null

            ];
        }
    }

    echo json_encode($artistas);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener los artistas: " . $e->getMessage()]);
}

$conn->close();
?>
