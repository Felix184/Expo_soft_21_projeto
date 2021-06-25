<!------------------------------------------------------------------------------------------------------
Nome do projeto: Fast Horse Editor
Descrição: Página para o usuário efetuar o login

Autores:

Turma: 2TID
Matheus Felix Carlos | número: 16                                                          Versão: 1.0
Alberto Veiga Potas |número: 1                                                             Data:20/06/21 
Hebert Victor | número: 8
Kaike Santos Coppola | número 10                                                                                

Altores externos:                                                                                                           
(Processamento do Cadastro e login e parte do CSS) -> Miriam TechCod:                                                       
https://www.youtube.com/watch?v=et-j0z-tbk4&list=PLYGFJHWj9BYq5zosbRaY7XM5vM0ISLkWS                                         

(Ocultar/Exibir) -> Bruno P. Campos:                                                                                        
https://www.youtube.com/watch?v=DR-jyJTIB2E                                                                                 

------------------------------------------------------------------------------------------------------->
<?php
require_once '../classes/Usuarios.php';
$u = new Usuario;
?>
<html>
	<head>
		<meta charset="uft-8"/>
		<title>FastHorse - Login</title>
		<link rel="stylesheet" href="../css/style_Log_Cad2.css">
	</head>
	<body>

		<!--<div class="logo">         Aqui esta a imagem de logo que eu estava testando 
<img src="../img/LogoFastHorse-removebg-preview.png">
</div>-->
		<div class="corpo-form">
			<h1>Entrar</h1>
			<form method="POST" action="">
				<fieldset>
					<input type="email" name="email" placeholder="E-mail">
				</fieldset>
				<fieldset>
					<div>
						<input type="password" id="pwd" name="senha" placeholder="Senha">
					</div>
				</fieldset>
				<div class="check">
					<label> Mostrar/Ocultar senha</label>
					<input type="checkbox" onclick="mostrarOcultarSenha()">
				</div>
				<input type="submit" value="Acessar">

				<a href="Cadastro.php">Ainda não se cadastrou?<strong> Cadastre-se aqui!</strong></a>
			</form>
		</div>

		<script type="text/javascript" src="../js/script-Log_Cad.js"></script>

		<?php
		//verificar se clicou no botao
		if (isset($_POST['email'])){
			$email = addslashes($_POST['email']);// "addslashes" privine possiveis aplicações de códigos maliciosos 
			$senha = addslashes($_POST['senha']);

			//cerificar se esta preenchido
			if(!empty($email) && !empty($senha)){
				$u->conectar("fasthorse_editor", "localhost", "root", "");

				if($u->msgErro == ""){ //ta tudo bem!
					if($u->logar($email, $senha)){
						header("location: editor.php");
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