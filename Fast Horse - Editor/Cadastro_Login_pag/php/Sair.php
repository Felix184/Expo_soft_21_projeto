<?php       //aqui, vamos destruir a sessão quando o usuario sair.
    session_start();
    unset($_SESSION['id_usuario']);
    header("location: Login.php");
?>