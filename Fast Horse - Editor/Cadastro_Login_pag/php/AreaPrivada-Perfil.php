<?php
    session_start();
    if(!isset($_SESSION['id_usuario'])){
        header("location: Login.php");
        exit;
    }
?>

SEJA BEM VINDO!!

(essa página será a página Perfil)
<br><br>

<a href="sair.php">Sair</a>