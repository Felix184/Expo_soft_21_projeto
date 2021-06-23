<?php
    session_start();
    if(!isset($_SESSION['id_usuario'])){
        header("location: Login.php");
        exit;
    }
?>

<!DOCTYPE html>
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
					<li><a href="index.html">Home</a></li>
					<li><a href="editor.html"><i class="fas fa-edit"></i> Editor</a></li>
					<li><a href="sobre.html"><i class="fas fa-users"></i> Quem somos</a></li>
				</ul>
			</nav>
		</header>

		<!------------ Conteúdo principal da página ------------>
		<main>

			<div class="file-upload-section" onclick="selectImage()">
				<input id="foto-file" type="file" accept="image/*">
				Selecionar imagem
			</div>
			<div class="img-container" id="img-container">
				<img id="foto-image" class="image">
			</div>

			<section class="btns-container">
				<h1 class="lbl-editor lbl-1">Editor :</h1>
				<button class="btn-editor first-btn" onclick="flipVertically()">Espelhar Imagem</button>
				<button class="btn-editor" onclick="flipHorizontally()">Inverter Imagem</button>
				<button class="btn-editor" onclick="crop()">Cortar</button>
				

				<h2 class="lbl-editor lbl-sub">Brilho :</h2>
				<div class="slidecontainer">
					<button class="btn-editor" onclick="makeDark()"><i class="fas fa-minus"></i></button>
					<input type="range" min="0" max="100" value="50" class="slider" id="myRange">
					<button class="btn-editor" onclick="makeBright()"><i class="fas fa-plus"></i></button>
				</div>

				<button class="btn-editor first-btn" onclick="makeGrayScale()" id="gray-effect">Escala cinza</button>
				<button class="btn-editor" onclick="makeBlur()" id="blur-effect">Desfocar Imagem</button>
				<button class="btn-editor" onclick="makeSharp()" id="sharp-effect">Nitidez</button><br/>

				<h1 class="lbl-editor">Filtros :</h1>
				<button class="btn-editor first-btn" onclick="makeVintage()" id="vintage-effect">Filtro Vintage</button>
				<button class="btn-editor" onclick="makeSummer()" id="summer-effect">Filtro Verão</button>
				<button class="btn-editor" onclick="makeWinter()" id="winter-effect">Filtro Inverno</button>
				<button class="btn-editor filter-btn" onclick="makeEmboss()" id="emboss-effect">Filtro Cartoon</button>
				<button class="btn-editor" onclick="">Filtro ????</button>
			</section> 

			<div class="btn-download-section">
				<button class="btn-download" onclick="resetImage()"><i class="fas fa-undo"></i> Resetar imagem</button>
				<button class="btn-download save-btn" onclick="saveImage()"><i class="fas fa-share-square"></i> Salvar imagem</button>
				<button class="btn-download save-btn" onclick="download()"><i class="fas fa-download"></i> Baixar imagem</button>
			</div>

		</main>
		<footer>
			<p>&copy 2021 Fasthorse.editor - Escola tecnica Alcina Dantas Feijão</p>
		</footer>
		<script src="../js/functions.js"></script>
		<script src="../js/foto.js"></script>
        <br><br><br><br><br>
        <div class="btnSair">
            <a href="sair.php">Sair</a>
        </div>
	</body>
</html>