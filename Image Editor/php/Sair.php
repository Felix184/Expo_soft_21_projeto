<!------------------------------------------------------------------------------------------------------
Nome do projeto: Fast Horse Editor
Descrição: .

Autores:

Turma: 2TID
Matheus Felix Carlos | número: 16                                                          Versão: 1.0
Alberto Veiga Potas |número: 1                                                             Data:20/06/21 
Hebert Victor | número: 8
Kaike Santos Coppola | número 10

Altores externos: 
(Processamento do Cadastro e login e parte do CSS) -> Miriam TechCod: 
https://www.youtube.com/watch?v=et-j0z-tbk4&list=PLYGFJHWj9BYq5zosbRaY7XM5vM0ISLkWS
--------------------------------------------------------------------------------------------------------->
<?php       //aqui, vamos destruir a sessão quando o usuario sair.
    session_start();
    unset($_SESSION['id_usuario']);
    header("location: ../html/index.html");
?>