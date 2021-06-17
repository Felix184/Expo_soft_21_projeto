<?php
    require_once '../classes/Usuarios.php'; //instanciando a classe
    $u = new Usuario;
?>
<html>
    <head>
        <meta charset="uft-8"/>
        <title>FastHorse - Cadastro</title>
        <link rel="stylesheet" href="../css/style_Log_Cad.css">
    </head>
    <body>
        <!--<div class="logo">         Aqui esta a imagem de logo que eu estava testando
            <img src="../img/LogoFastHorse-removebg-preview.png">
        </div>-->
        <div class="corpo-form">
            <h1>Cadastrar</h1>
            <form method="POST" action="">
                <input type="text" required min="3" name="nome"pattern="([A-Z À-Ú]{1})([a-z à-ú]{3,})" 
                placeholder= "Nome Completo"  title="Digite seu primeiro nome. Exemplo: Ana" maxlength="30">
                <input type="email" name="email" placeholder="E-mail" title="Digite um e-mail" maxlength="40">
                <input type="password" id="pwd" name="senha" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Senha" maxlength="32">
                <fieldset>
                    <input type="password" id="pwd2" name="confsenha" placeholder="Confirmação de Senha" maxlength="15">
                    <input type="checkbox" onclick="mostrarOcultarSenha()">
                </fieldset>
                <input type="submit" value="Cadastrar">
                <a href="Login.php">Já Possue cadastro?<strong> Entre por aqui!</strong></a>
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
