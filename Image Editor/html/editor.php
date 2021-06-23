<?php
session_start();
if(!isset($_SESSION['id_usuario'])){
	header("location: Login.php");
	exit;
}
?>
<!DOCTYPE html>
<!------------------------------------------------------------------------------------------------------
Nome do projeto: Fast Horse Editor                                                          
Descrição: Usuário consegue fazer o upload de imagens, editar as imagens modificando seu brilho, 
transparência e alterando filtros. E usuário consegue baixar a imagem com as edições feitas.

Autores: 
Matheus Felix Carlos | número: 16                                                          Versão: 1.0
Alberto Veiga Potas |número: 1                                                             Data:20/06/21 
Hebert Victor | número: 8
Kaike Santos Coppola | número 10
------------------------------------------------------------------------------------------------------->
<html lang="pt-br">

	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<title>Editor</title>
		<link rel="stylesheet" href="../css/styles.css"/>
		<script src="https://kit.fontawesome.com/deeb6da8f1.js" crossorigin="anonymous"></script>
	</head>

	<body class="editor-container">

		<!------------ Menu do Site ------------>
		<header>
			<nav>
				<ul>
					<li><a href="../html/index.html" class="logo"><img src="../img/logoCavalo.jpg" width="45px" height="45px"></a></li> 
					<li><a href="editor.php"><i class="fas fa-edit"></i> Editor</a></li>
					<li><a href="../html/sobre.html"><i class="fas fa-users"></i> Quem somos</a></li>
				</ul>
			</nav>
		</header>

		<!------------ Conteúdo principal da página ------------>
		<main>

			<!-- botão de upload da imagem -->
			<div class="file-upload-section" onclick="selectImage()">
				<input id="foto-file" type="file" accept="image/*">
				Selecionar imagem
			</div>

			<!-- Div que vai aparecer a imagem do usuário -->
			<div class="img-container" id="img-container">
				<img id="foto-image" class="image">
			</div>

			<!-- seção que armazena todos os botões de edição da imagem -->
			<section class="btns-container">
				<h1 class="lbl-editor lbl-1">Editor :</h1>&nbsp;&nbsp;&nbsp;&nbsp;

				<!-- Botões de espelhar, inverter e cortar --> 
				<p class="aviso-lbl">Espelhar / Inverter irá resetar a imagem</p><br/><br/>
				<button class="btn-editor first-btn" id="espelhar-btn" onclick="flipVertically()">Espelhar Imagem</button>
				<button class="btn-editor" id="inverter-btn" onclick="flipHorizontally()">Inverter Imagem</button>
				<button class="btn-editor" onclick="crop()">Cortar</button>

				<!-- slider que controla o brilho da imagem -->
				<h2 class="lbl-editor lbl-sub">Brilho :</h2>
				<div class="slidecontainer">
					<button class="btn-editor" onclick="makeDark()"><i class="fas fa-minus"></i></button>
					<input type="range" min="0" max="100" value="50" class="slider" id="myRange">
					<button class="btn-editor" onclick="makeBright()"><i class="fas fa-plus"></i></button>
				</div>

				<!-- Botões que ficam abaixo do slider do brilho | Botões de cinza, desfocar, nitidez e relevo --> 
				<button class="btn-editor first-btn" onclick="makeGrayScale()" id="gray-effect">Escala cinza</button>
				<button class="btn-editor" onclick="makeBlur()" id="blur-effect">Desfocar </button>
				<button class="btn-editor" onclick="makeSharp()" id="sharp-effect">Nitidez</button>
				<button class="btn-editor" onclick="makeEmboss()" id="emboss-effect">Relevo</button>

				<!-- slider que controla a transparência da imagem -->
				<h2 class="lbl-editor lbl-sub">Transparência :</h2>
				<div class="slidecontainer">
					<button class="btn-editor" onclick="decreaseTransparency()"><i class="fas fa-minus"></i></button>
					<input type="range" min="0" max="100" value="100" class="slider" id="myRange2">
					<button class="btn-editor" onclick="increaseTransparency()"><i class="fas fa-plus"></i></button>
				</div>

				<!-- Botões de filtros: Vintage, Verão e inverno -->
				<h1 class="lbl-editor">Filtros :</h1>
				<button class="btn-editor first-btn" onclick="makeVintage()" id="vintage-effect">Filtro Vintage</button>
				<button class="btn-editor" onclick="makeSummer()" id="summer-effect">Filtro Verão</button>
				<button class="btn-editor" onclick="makeWinter()" id="winter-effect">Filtro Inverno</button>

			</section> 

			<!-- Botões de resetar e baixar a imagem -->
			<section class="btn-download-section">
				<button class="btn-download" onclick="resetImage()"><i class="fas fa-undo"></i> Resetar imagem</button>
				<button class="btn-download save-btn" onclick="download()"><i class="fas fa-download"></i> Baixar imagem</button>
			</section>

		</main>
		
		<div class="btnSair">
			<a href="sair.php">Sair</a>
		</div>

		<!-- Rodapé da página -->
		<footer>
			<p>&copy 2021 Fasthorse.editor - Escola tecnica Alcina Dantas Feijão</p>
		</footer>

		<!-- javascript usado -->
		<script src="../js/functions.js"></script>
		<script src="../js/foto.js"></script>

	</body>
</html>