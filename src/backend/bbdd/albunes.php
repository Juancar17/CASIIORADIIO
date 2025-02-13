<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require("conexion_bbdd.php");

try {
    $sql = "SELECT a.cod_album, a.titulo, a.fecha, a.cod_grupo, a.portada, 
                   g.cod_genero, g.genero AS nombre_genero
            FROM albumes a
            JOIN albumes_generos ag ON a.cod_album = ag.cod_album
            JOIN generos g ON ag.cod_genero = g.cod_genero
            ORDER BY g.genero, a.titulo";

    $result = $conn->query($sql);

    // 🔴 Verificar si la consulta falló
    if (!$result) {
        echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
        exit();
    }

    $albumesPorGenero = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $genero = $row["nombre_genero"]; // 🟢 Ahora se usa el nombre correcto

            if (!isset($albumesPorGenero[$genero])) {
                $albumesPorGenero[$genero] = [];
            }

            $albumesPorGenero[$genero][] = [
                "cod_album" => $row["cod_album"],
                "titulo" => $row["titulo"],
                "fecha" => $row["fecha"],
                "cod_grupo" => $row["cod_grupo"],
                "portada" => $row["portada"] ? "http://localhost/DWES/my-app/src/backend/media/img/albumes/" . $row["portada"] : null
            ];
        }
    } else {
        echo json_encode(["error" => "No se han encontrado álbumes"]);
        exit();
    }

    echo json_encode($albumesPorGenero, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener los álbumes: " . $e->getMessage()]);
}

$conn->close();
?>
