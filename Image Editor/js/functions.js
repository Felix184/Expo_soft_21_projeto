var foto;
var indiceBright = 0;
var color;
document.getElementById("myRange").disabled = true;
var a = parseInt(document.getElementById("myRange").value);

window.onload = function() {
	foto=new Foto(); 
}

function selectImage() {
	document.getElementById("foto-file").click();
	a = 50;
	document.getElementById("myRange").value = 50;
}

function makeGrayScale() {
	if (foto.convertedToGrayScale == true) {
		foto.resetImage();
	} else {
		foto.grayscale();
	}
}

function makeBright() {
	indiceBright += 1;
	if (a > 100) { return; } 
	foto.makeBright();
	a += 10;
	document.getElementById("myRange").value = a;
}

function makeDark() {
	indiceBright -= 1;
	if (a < 1 ) {return;}
	foto.makeDark();
	a -= 10;
	document.getElementById("myRange").value = a;
}

function makeBlur() {
	if (foto.convertedToBlur == true) {
		foto.resetImage();
	} else {
		foto.applyBlurFilter();
	}
}

function makeEmboss() {
	if (foto.convertedToEmboss == true) {
		foto.resetImage();
	} else {
		foto.applyEmbossFilter();
	}
}

function makeSharp() {
	if (foto.convertedToSharp == true) {
		foto.resetImage();
	} else {
		foto.applySharpFilter();
	}
}

function makeVintage() {
	color = "#734F46";
	//foto.applyCustom();
	foto.colorize(color);
	foto.makeDark();
}

function makeWinter() {
	color = "#054f77";
	foto.applyColorFilter(color);
}
function makeSummer() {
	color = "#CC6300";
	foto.applyColorFilter(color);
}

function resetImage() {
	foto.resetImage();
	a = 50;
	document.getElementById("myRange").value = 50;
}

function makeTransparent() {
	foto.makeTransparent();
}

function crop() {
	foto.cropSelected();
}

function flipVertically() {
	foto.flipVertically();
	a = 50;
	document.getElementById("myRange").value = 50;
}

function flipHorizontally() {
	foto.flipHorizontally();
	a = 50;
	document.getElementById("myRange").value = 50;
}

function rotate(elem) {
	foto.rotate(elem.value);
}

function download() {
	foto.export();
}