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
        <div class="corpo-form">
            <h1>Cadastro</h1>
            <form method="POST" action="">
                <input type="text" name="nome" placeholder="Nome Completo" maxlength="30">
                <input type="email" name="email" placeholder="Usuário" maxlength="40">
                <input type="password" name="senha" placeholder="Senha" maxlength="32">
                <input type="password" name="confsenha" placeholder="Confirmação de Senha" maxlength="15">
                <input type="submit" value="Cadastrar">
                <a href="Login.php">Já Possue cadastro?<strong> Faça seu login aqui!</strong></a>
            </form>
        </div>

        <?php
        //verificar se clicou no botao
        if (isset($_POST['nome'])){
            $nome = addslashes($_POST['nome']); // "addslashes" privine possiveis aplicações de códigos maliciosos 
            $email = addslashes($_POST['email']);
            $senha = addslashes($_POST['senha']);
            $confsenha = addslashes($_POST['confsenha']);

            //cerificar se esta preenchido
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
</html>