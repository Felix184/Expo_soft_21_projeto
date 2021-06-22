/*-----------------------------------------------------------------------------------------------------
Nome do projeto: Fast Horse Editor                                                          
Descrição: Usuário consegue fazer o upload de imagens, editar as imagens modificando seu brilho, 
transparência e alterando filtros. E usuário consegue baixar a imagem com as edições feitas.

Autores: 
Matheus Felix Carlos | número: 16                                                          Versão: 1.0
Alberto Veiga Potas |número: 1                                                           Data:20/06/21 
Hebert Victor | número: 8
Kaike Santos Coppola | número 10
-----------------------------------------------------------------------------------------------------*/
/* Biblioteca javascript foto.js do usuário do github kousik19 
link da biblioteca https://github.com/kousik19/foto.js
Este javascript fez uso da biblioteca citada acima */

var foto;

// MyRange é o slider que controla o brilho e o Myrange2 é o slider que controla a transparência
// Desabilitando os dois sliders para que o usuário controle a partir dos botões
document.getElementById("myRange").disabled = true; 
document.getElementById("myRange2").disabled = true;

// variáveis indice de Brilho e indice de transparência
var indiceBright = parseInt(document.getElementById("myRange").value);
var indiceTransparency = parseInt(document.getElementById("myRange2").value);

// Quando a página carregar declarar a classe 
window.onload = function() {
	foto=new Foto(); 
}

// Selecionar imagem função
function selectImage() {
	document.getElementById("foto-file").click();
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
	document.getElementById("img-container").style.backgroundImage = "url(../img/default.jpg)";
	foto.resetImage();
}

// escala de cinza função
function makeGrayScale() {
	if (foto.convertedToGrayScale == true) {
		return;
	} else { 
		foto.grayscale();
		foto.GrayButton();
	}
}

// Aumentar a transparência
function increaseTransparency() {
	if (indiceTransparency == 100) { return; } 
	foto.increaseTransparency();
	indiceTransparency += 10;
	document.getElementById("myRange2").value = indiceTransparency;
}

// Diminuir a transparência
function decreaseTransparency() {
	if (indiceTransparency == 0) { return; } 
	foto.decreaseTransparency();
	indiceTransparency -= 10;
	document.getElementById("myRange2").value = indiceTransparency;
}

// Aumentar o Brilho
function makeBright() {
	if (indiceBright == 100) { return; } 
	foto.makeBright();
	indiceBright += 10;
	document.getElementById("myRange").value = indiceBright;
}

// Diminuir o brilho
function makeDark() {
	if (indiceBright == 0 ) {return;}
	foto.makeDark();
	indiceBright -= 10;
	document.getElementById("myRange").value = indiceBright;
}

// Borrar imagem
function makeBlur() {
	if (foto.convertedToVintage == true) {
		foto.BlurButton();
		foto.applyBlurFilter();
		foto.applyVintageFilter();
		foto.pressedEmbossButton();
		foto.pressedSharpButton();
	} else if (foto.convertedToSummer == true) {
		foto.BlurButton();
		foto.applyBlurFilter();
		foto.applySummerFilter();
		foto.pressedEmbossButton();
		foto.pressedSharpButton();
	} else if (foto.convertedToWinter == true) {
		foto.BlurButton();
		foto.applyBlurFilter();
		foto.applyWinterFilter();
		foto.pressedEmbossButton();
		foto.pressedSharpButton();
	} else {
		foto.BlurButton();
		foto.applyBlurFilter();
		foto.pressedEmbossButton();
		foto.pressedSharpButton();
	}
}

// Filtro de relevo
function makeEmboss() {
	if (foto.convertedToVintage == true) {
		foto.EmbossButton();
		foto.applyEmbossFilter();
		foto.applyVintageFilter();
		foto.pressedBlurButton();
		foto.pressedSharpButton();
	} else if (foto.convertedToSummer == true) {
		foto.EmbossButton();
		foto.applyEmbossFilter();
		foto.applySummerFilter();
		foto.pressedBlurButton();
		foto.pressedSharpButton();
	} else if (foto.convertedToWinter == true) {
		foto.EmbossButton();
		foto.applyEmbossFilter();
		foto.applyWinterFilter();
		foto.pressedBlurButton();
		foto.pressedSharpButton();
	} else {
		foto.EmbossButton();
		foto.applyEmbossFilter();
		foto.pressedSharpButton();
		foto.pressedBlurButton();
	}
}

// Filtro de nitidez 
function makeSharp() {
	if (foto.convertedToVintage == true) {
		foto.SharpButton();
		foto.applySharpFilter();
		foto.applyVintageFilter();
		foto.pressedBlurButton();
		foto.pressedEmbossButton();
	} else if (foto.convertedToSummer == true) {
		foto.SharpButton();
		foto.applySharpFilter();
		foto.applySummerFilter();
		foto.pressedBlurButton();
		foto.pressedEmbossButton();
	} else if (foto.convertedToWinter == true) {
		foto.SharpButton();
		foto.applySharpFilter();
		foto.applyWinterFilter();
		foto.pressedBlurButton();
		foto.pressedEmbossButton();
	} else {
		foto.SharpButton();
		foto.applySharpFilter();
		foto.pressedEmbossButton();
		foto.pressedBlurButton();
	}
}

// Efeito vintage
function makeVintage() {
	foto.applyVintageFilter();
	foto.VintageButton();
	foto.pressedWinterButton();
	foto.pressedSummerButton();
}

// efeito de inverno
function makeWinter() {
	foto.applyWinterFilter();
	foto.WinterButton();
	foto.pressedSummerButton();
	foto.pressedVintageButton();
}

// efeito de verão
function makeSummer() {
	foto.applySummerFilter();
	foto.SummerButton();
	foto.pressedVintageButton();
	foto.pressedWinterButton();
}

// Resetar a imagem
function resetImage() {
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	foto.resetImage();
}

// Cortar a imagem
function crop() {
	foto.cropSelected();
}

// Inverter a imagem
function flipVertically() {
	foto.flipVertically();
	foto.convertedToGrayScale = false;
	foto.convertedToVintage = false;
	foto.convertedToSummer = false;
	foto.convertedToWinter = false;
	document.getElementById("sharp-effect").disabled = false;
	document.getElementById("emboss-effect").disabled = false;
	document.getElementById("blur-effect").disabled = false;
	document.getElementById("summer-effect").disabled = false;
	document.getElementById("winter-effect").disabled = false;
	document.getElementById("vintage-effect").disabled = false;
	foto.Brightness = 0;
	foto.resetAllButtons();
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
}

// Espelhar a imagem
function flipHorizontally() {
	foto.flipHorizontally();
	foto.convertedToGrayScale = false;
	foto.convertedToVintage = false;
	foto.convertedToSummer = false;
	foto.convertedToWinter = false;
	document.getElementById("sharp-effect").disabled = false;
	document.getElementById("emboss-effect").disabled = false;
	document.getElementById("blur-effect").disabled = false;
	document.getElementById("summer-effect").disabled = false;
	document.getElementById("winter-effect").disabled = false;
	document.getElementById("vintage-effect").disabled = false;
	foto.Brightness = 0;
	foto.resetAllButtons();
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
}

// Baixar a imagem
function download() {
	foto.export();
}