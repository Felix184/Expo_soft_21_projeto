var foto;
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
		a = 50;
		document.getElementById("myRange").value = 50;
	} else {
		foto.grayscale();
	}
}

function makeBright() {
	if (a > 100) { return; } 
	foto.makeBright();
	a += 10;
	document.getElementById("myRange").value = a;
}

function makeDark() {
	if (a < 1 ) {return;}
	foto.makeDark();
	a -= 10;
	document.getElementById("myRange").value = a;
}

function makeBlur() {
	if (foto.convertedToBlur == true) {
		foto.resetImage();
		a = 50;
		document.getElementById("myRange").value = 50;
	} else {
		foto.applyBlurFilter();
	}
}

function makeEmboss() {
	if (foto.convertedToEmboss == true) {
		foto.resetImage();
		a = 50;
		document.getElementById("myRange").value = 50;
	} else {
		foto.applyEmbossFilter();
	}
}

function makeSharp() {
	if (foto.convertedToSharp == true) {
		foto.resetImage();
		a = 50;
		document.getElementById("myRange").value = 50;
	} else {
		foto.applySharpFilter();
	}
}

function makeVintage() {
	color = "#5C3C34";
	if (foto.convertedToColor == true) {
		foto.resetImage();
		a = 50;
		document.getElementById("myRange").value = 50;
		foto.applyColorFilter(color);
	} else {foto.applyColorFilter(color);}
}

function makeWinter() {
	color = "#054f77";
	if (foto.convertedToColor == true) {
		foto.resetImage();
		a = 50;
		document.getElementById("myRange").value = 50;
		foto.applyColorFilter(color);
	} else {foto.applyColorFilter(color);}
}

function makeSummer() {
	color = "#CF6700";
	if (foto.convertedToColor == true) {
		foto.resetImage();
		a = 50;
		document.getElementById("myRange").value = 50;
		foto.applyColorFilter(color);
	} else {foto.applyColorFilter(color);}
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
	foto.convertedToGrayScale = false;
	a = 50;
	document.getElementById("myRange").value = 50;
}

function flipHorizontally() {
	foto.flipHorizontally();
	foto.convertedToGrayScale = false;
	a = 50;
	document.getElementById("myRange").value = 50;
}

function rotate(elem) {
	foto.rotate(elem.value);
}

function download() {
	foto.export();
}