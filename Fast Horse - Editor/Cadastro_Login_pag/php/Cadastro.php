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

----------------------------------------------------------------------------------------------------------->
<?php
    require_once '../classes/Usuarios.php'; //instanciando a classe
    $u = new Usuario;
?>
<html>
    <head>
        <meta charset="uft-8"/>
        <title>FastHorse - Cadastro</title>
        <link rel="stylesheet" href="../css/style_Log_Cad2.css">
    </head>
    <body>
        <!--<div class="logo">         Aqui esta a imagem de logo que eu estava testando
            <img src="../img/LogoFastHorse-removebg-preview.png">
        </div>-->
        <div class="corpo-form">
            <h1>Cadastrar</h1>
            <form method="POST" action="">
                <fieldset>
                    <input type="text" required min="3" name="nome"pattern="([A-Z À-Ú]{1})([a-z à-ú]{3,})" 
                    placeholder= "Nome Completo"  title="Digite seu primeiro nome. Exemplo: Ana" maxlength="30">
                </fieldset>
                <fieldset>
                    <input type="email" name="email" placeholder="E-mail" title="Digite um e-mail" maxlength="40">
                </fieldset>
                <fieldset>
                    <input type="password" id="pwd" name="senha" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Senha"
                    title="Insira no minimo 8 caracteres. Use letras maiúscular, minúsculas e números!" maxlength="32">
                </fieldset>
                <fieldset>
                    <div>
                        <input type="password" id="pwd2" name="confsenha" placeholder="Confirmação de Senha" maxlength="15">
                        
                    </div>
                </fieldset>
                    <div class="check">
                        <label> <strong>Mostrar/Ocultar senha</strong></label>  
                        <input type="checkbox" onclick="mostrarOcultarSenha()">

                    </div>
                <input type="submit" value="Cadastrar">
                <a href="Login.php">Já possue cadastro?<strong> Entre por aqui!</strong></a>
            </form>
        </div>

        <script type="text/javascript" src="../js/script-Log_Cad.js"></script>

        <?php
        //verificar se clicou no botao
        if (isset($_POST['nome'])){
            $nome = addslashes($_POST['nome']); // "addslashes" privine possiveis aplicações de códigos maliciosos 
            $email = addslashes($_POST['email']);
            $senha = addslashes($_POST['senha']);
            $confsenha = addslashes($_POST['confsenha']);

            //verificar se esta preenchido
            if(!empty($nome) && !empty($email) && !empty($senha) && !empty($confsenha)){
                $u->conectar("fasthorse_editor", "localhost", "root", "");

                if($u->msgErro == ""){//se esta tudo certo
                    if($senha == $confsenha){
                        if($u->cadastrar($nome, $email, $senha)){
                            ?>
                            <div class="msg-sucesso">
                                Cadastrado com sucesso! Faça o login para entrar :)
                            </div>
                            <?php

                        }else{
                            ?>
                            <div class="msg-erro">
                                Email já cadastrado!
                            </div>
                            <?php

                        }
                    }else{
                            ?>
                            <div class="msg-erro">
                                Senha e confirmação de senha não correspondem!
                            </div>
                            <?php

                    }
                   
                }else{
                    ?>
                    <div class="msg-erro">
                        <?php echo "Erro: ".$u->msErro; ?>
                    </div>
                    <?php
                     

                }

            }else{
                ?>
                <div class="msg-erro">
                    Preencha todos os campos!
                </div>
                <?php

            }
        }
        ?>
    </body>
    <br><br><br><br><br>
</html>
