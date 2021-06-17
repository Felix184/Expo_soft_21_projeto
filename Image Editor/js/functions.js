var foto;
document.getElementById("myRange").disabled = true;
document.getElementById("myRange2").disabled = true;
var indiceBright = parseInt(document.getElementById("myRange").value);
var indiceTransparency = parseInt(document.getElementById("myRange2").value);

window.onload = function() {
	foto=new Foto(); 
}

function selectImage() {
	document.getElementById("foto-file").click();
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
	foto.resetImage();
}

function makeGrayScale() {
	if (foto.convertedToGrayScale == true) {
		return;
	} else { 
		foto.grayscale();
		foto.GrayButton();
	}
}

function increaseTransparency() {
	if (indiceTransparency == 100) { return; } 
	foto.increaseTransparency();
	indiceTransparency += 10;
	document.getElementById("myRange2").value = indiceTransparency;
}

function decreaseTransparency() {
	if (indiceTransparency == 0) { return; } 
	foto.decreaseTransparency();
	indiceTransparency -= 10;
	document.getElementById("myRange2").value = indiceTransparency;
}

function makeBright() {
	if (indiceBright == 100) { return; } 
	foto.makeBright();
	indiceBright += 10;
	document.getElementById("myRange").value = indiceBright;
}

function makeDark() {
	if (indiceBright == 0 ) {return;}
	foto.makeDark();
	indiceBright -= 10;
	document.getElementById("myRange").value = indiceBright;
}

function makeBlur() {
	foto.BlurButton();
	foto.applyBlurFilter();
	document.getElementById("sharp-effect").disabled = true;
	document.getElementById("emboss-effect").disabled = true;
	foto.resetEmbossButton();
	foto.resetSharpButton();
}

function makeEmboss() {
	foto.EmbossButton();
	foto.applyEmbossFilter();
	document.getElementById("sharp-effect").disabled = true;
	document.getElementById("blur-effect").disabled = true;
	foto.resetSharpButton();
	foto.resetBlurButton();
}

function makeSharp() {
	foto.SharpButton();
	foto.applySharpFilter();
	document.getElementById("emboss-effect").disabled = true;
	document.getElementById("blur-effect").disabled = true;
	foto.resetEmbossButton();
	foto.resetBlurButton();
}

function makeVintage() {
	foto.applyVintageFilter();
	foto.VintageButton();
}


function makeWinter() {
	foto.applyWinterFilter();
	foto.WinterButton();
}

function makeSummer() {
	foto.applySummerFilter();
	foto.SummerButton();
}


function resetImage() {
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	document.getElementById("sharp-effect").disabled = false;
	document.getElementById("emboss-effect").disabled = false;
	document.getElementById("blur-effect").disabled = false;
	foto.resetImage();
}

function crop() {
	foto.cropSelected();
}

function flipVertically() {
	foto.flipVertically();
	foto.convertedToGrayScale = false;
	foto.convertedToVintage = false;
	foto.convertedToSummer = false;
	foto.convertedToWinter = false;
	document.getElementById("sharp-effect").disabled = false;
	document.getElementById("emboss-effect").disabled = false;
	document.getElementById("blur-effect").disabled = false;
	foto.Brightness = 0;
	foto.resetAllButtons();
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
}

function flipHorizontally() {
	foto.flipHorizontally();
	foto.convertedToGrayScale = false;
	foto.convertedToVintage = false;
	foto.convertedToSummer = false;
	foto.convertedToWinter = false;
	document.getElementById("sharp-effect").disabled = false;
	document.getElementById("emboss-effect").disabled = false;
	document.getElementById("blur-effect").disabled = false;
	foto.Brightness = 0;
	foto.resetAllButtons();
	indiceBright = 50;
	document.getElementById("myRange").value = 50;
	indiceTransparency = 100;
	document.getElementById("myRange2").value = 100;
}

function download() {
	foto.export();
}