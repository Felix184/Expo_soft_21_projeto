<?php
    require_once '../classes/Usuarios.php';
    $u = new Usuario;
?>
<html>
    <head>
        <meta charset="uft-8"/>
       
        <title>FastHorse - Login</title>
        <link rel="stylesheet" href="../css/style_Log_Cad.css">
    </head>
    
    <body>
         <!--<div class="logo">         Aqui esta a imagem de logo que eu estava testando 
            <img src="../img/LogoFastHorse-removebg-preview.png">
        </div>-->
        <div class="corpo-form">
            <h1>Entrar</h1>
            <form method="POST" action="">
                <input type="email" name="email" placeholder="E-mail">
                <input type="password" name="senha" placeholder="Senha">
                <input type="submit" value="Acessar">
                <a href="Cadastro.php">Ainda não se cadastrou?<strong> Cadastre-se aqui!</strong></a>
            </form>
        </div>

        <?php
            //verificar se clicou no botao
            if (isset($_POST['email'])){
                $email = addslashes($_POST['email']);// "addslashes" privine possiveis aplicações de códigos maliciosos 
                $senha = addslashes($_POST['senha']);

                //cerificar se esta preenchido
                if(!empty($email) && !empty($senha)){
                    $u->conectar("fasthorse_editor", "localhost", "root", "");
                    
                    if($u->msgErro == ""){
                        if($u->logar($email, $senha)){
                            header("location: Editor(privado).php");
                        }else{
                            ?>
                            <div class="msg-erro">
                                Email e/ou senha estão incorretos!
                            </div>
                            <?php

                        }
                    }else{
                        ?>
                        <div class="msg-erro">
                            <?php echo "Erro]: ".$u->msgErro; ?>
                        </div>
                        <?php

                    }
                }else{
                    ?>
                    <div class="msg-erro">
                        <?php echo "Preencha todos os campos!"; ?>
                    </div>
                    <?php
                    
                }
            }
        ?>
    </body>
</html>