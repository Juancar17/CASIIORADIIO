<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require("conexion_bbdd.php");

// Obtener el nombre del grupo desde la URL
$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';

if (empty($nombre)) {
    echo json_encode(["error" => "Nombre del grupo no proporcionado"]);
    exit();
}

try {
    // Consultar los datos del grupo
    $sqlGrupo = "SELECT cod_grupo, nombre, nacionalidad, biografia, foto FROM grupos WHERE LOWER(nombre) = LOWER(?)";
    $stmtGrupo = $conn->prepare($sqlGrupo);
    
    if (!$stmtGrupo) {
        echo json_encode(["error" => "Error en la consulta SQL del grupo: " . $conn->error]);
        exit();
    }

    $stmtGrupo->bind_param("s", $nombre);
    $stmtGrupo->execute();
    $resultGrupo = $stmtGrupo->get_result();

    if ($resultGrupo->num_rows === 0) {
        echo json_encode(["error" => "Grupo no encontrado"]);
        exit();
    }

    $grupo = $resultGrupo->fetch_assoc();
    $grupo["foto"] = $grupo["foto"] ? "http://localhost/DWES/my-app/src/backend/media/img/grupos/" . $grupo["foto"] : null;

    // Obtener los álbumes del grupo
    $sqlAlbumes = "SELECT cod_album, titulo, fecha, portada FROM albumes WHERE cod_grupo = ?";
    $stmtAlbumes = $conn->prepare($sqlAlbumes);
    
    if (!$stmtAlbumes) {
        echo json_encode(["error" => "Error en la consulta SQL de álbumes: " . $conn->error]);
        exit();
    }

    $stmtAlbumes->bind_param("i", $grupo["cod_grupo"]);
    $stmtAlbumes->execute();
    $resultAlbumes = $stmtAlbumes->get_result();

    $albumes = [];
    $albumIds = []; // Para almacenar los IDs de los álbumes del grupo

    while ($row = $resultAlbumes->fetch_assoc()) {
        $albumes[] = [
            "cod_album" => $row["cod_album"],
            "titulo" => $row["titulo"],
            "fecha" => $row["fecha"],
            "portada" => $row["portada"] ? "http://localhost/DWES/my-app/src/backend/media/img/albumes/" . $row["portada"] : null
        ];
        $albumIds[] = $row["cod_album"];
    }

    $grupo["albumes"] = $albumes;

    // Obtener las canciones de los álbumes del grupo
    $canciones = [];
    if (!empty($albumIds)) {
        $placeholders = implode(',', array_fill(0, count($albumIds), '?'));
        $sqlCanciones = "SELECT cod_cancion, titulo, duracion, cod_album FROM canciones WHERE cod_album IN ($placeholders)";
        
        $stmtCanciones = $conn->prepare($sqlCanciones);
        if (!$stmtCanciones) {
            echo json_encode(["error" => "Error en la consulta SQL de canciones: " . $conn->error]);
            exit();
        }

        // Crear los parámetros dinámicos para el IN
        $types = str_repeat('i', count($albumIds));
        $stmtCanciones->bind_param($types, ...$albumIds);
        $stmtCanciones->execute();
        $resultCanciones = $stmtCanciones->get_result();

        while ($row = $resultCanciones->fetch_assoc()) {
            $canciones[] = [
                "cod_cancion" => $row["cod_cancion"],
                "titulo" => $row["titulo"],
                "duracion" => $row["duracion"],
                "cod_album" => $row["cod_album"]
            ];
        }
    }

    // Agregar las canciones al grupo
    $grupo["canciones"] = $canciones;

    // Enviar la respuesta en formato JSON
    echo json_encode($grupo, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener los datos del grupo: " . $e->getMessage()]);
}

$conn->close();
?>
