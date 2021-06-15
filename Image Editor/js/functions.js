var foto;
var color;
document.getElementById("myRange").disabled = true;
var a = parseInt(document.getElementById("myRange").value);

window.onload = function() {
	foto=new Foto(); 
}

function selectImage() {
	document.getElementById("foto-file").click();
	document.getElementById("blur-effect").style.border = "1px solid black";
	document.getElementById("blur-effect").style.backgroundColor = "white";
	document.getElementById("blur-effect").style.color = "black";
	document.getElementById("sharp-effect").style.border = "1px solid black";
	document.getElementById("sharp-effect").style.backgroundColor = "white";
	document.getElementById("sharp-effect").style.color = "black";
	document.getElementById("gray-effect").style.border = "1px solid black";
	document.getElementById("gray-effect").style.backgroundColor = "white";
	document.getElementById("gray-effect").style.color = "black";
	document.getElementById("summer-effect").style.border = "1px solid black";
	document.getElementById("summer-effect").style.backgroundColor = "white";
	document.getElementById("summer-effect").style.color = "black";
	document.getElementById("winter-effect").style.border = "1px solid black";
	document.getElementById("winter-effect").style.backgroundColor = "white";
	document.getElementById("winter-effect").style.color = "black";
	document.getElementById("vintage-effect").style.border = "1px solid black";
	document.getElementById("vintage-effect").style.backgroundColor = "white";
	document.getElementById("vintage-effect").style.color = "black";
	a = 50;
	document.getElementById("myRange").value = 50;
	foto.resetImage();
}

function makeGrayScale() {
	if (foto.convertedToGrayScale == true) {
		return;
	} else { 
		foto.grayscale();
		document.getElementById("gray-effect").style.border = "1px solid #303675";
		document.getElementById("gray-effect").style.backgroundColor = "black";
		document.getElementById("gray-effect").style.color = "white";
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
	if (foto.convertedToSharp == true) {
		document.getElementById("sharp-effect").style.border = "1px solid black";
		document.getElementById("sharp-effect").style.backgroundColor = "white";
		document.getElementById("sharp-effect").style.color = "black";
		foto.applyBlurFilter();
		document.getElementById("blur-effect").style.border = "1px solid #303675";
		document.getElementById("blur-effect").style.backgroundColor = "black";
		document.getElementById("blur-effect").style.color = "white";
	} else {
		foto.applyBlurFilter();
		document.getElementById("blur-effect").style.border = "1px solid #303675";
		document.getElementById("blur-effect").style.backgroundColor = "black";
		document.getElementById("blur-effect").style.color = "white";
	}
}

function makeEmboss() {
	foto.applyEmbossFilter();
}

function makeSharp() {
	if (foto.convertedToBlur == true) {
		document.getElementById("blur-effect").style.border = "1px solid black";
		document.getElementById("blur-effect").style.backgroundColor = "white";
		document.getElementById("blur-effect").style.color = "black";
		foto.applySharpFilter();
		document.getElementById("sharp-effect").style.border = "1px solid #303675";
		document.getElementById("sharp-effect").style.backgroundColor = "black";
		document.getElementById("sharp-effect").style.color = "white";
	} else {
		foto.applySharpFilter();
		document.getElementById("sharp-effect").style.border = "1px solid #303675";
		document.getElementById("sharp-effect").style.backgroundColor = "black";
		document.getElementById("sharp-effect").style.color = "white";
	}
}

function makeVintage() {
	if (foto.convertedToVintage == true) {
		return;
	} else { 
		foto.applyVintageFilter();
		document.getElementById("vintage-effect").style.border = "1px solid #303675";
		document.getElementById("vintage-effect").style.backgroundColor = "black";
		document.getElementById("vintage-effect").style.color = "white";
	}
}


function makeWinter() {
	if (foto.convertedToWinter == true) {
		return;
	} else { 
		foto.applyWinterFilter();
		document.getElementById("winter-effect").style.border = "1px solid #303675";
		document.getElementById("winter-effect").style.backgroundColor = "black";
		document.getElementById("winter-effect").style.color = "white";
	}
}

function makeSummer() {
	if (foto.convertedToSummer == true) {
		return;
	} else { 
		foto.applySummerFilter();
		document.getElementById("summer-effect").style.border = "1px solid #303675";
		document.getElementById("summer-effect").style.backgroundColor = "black";
		document.getElementById("summer-effect").style.color = "white";
	}
}


function resetImage() {
	foto.resetImage();
	document.getElementById("blur-effect").style.border = "1px solid black";
	document.getElementById("blur-effect").style.backgroundColor = "white";
	document.getElementById("blur-effect").style.color = "black";
	document.getElementById("sharp-effect").style.border = "1px solid black";
	document.getElementById("sharp-effect").style.backgroundColor = "white";
	document.getElementById("sharp-effect").style.color = "black";
	document.getElementById("gray-effect").style.border = "1px solid black";
	document.getElementById("gray-effect").style.backgroundColor = "white";
	document.getElementById("gray-effect").style.color = "black";
	document.getElementById("summer-effect").style.border = "1px solid black";
	document.getElementById("summer-effect").style.backgroundColor = "white";
	document.getElementById("summer-effect").style.color = "black";
	document.getElementById("winter-effect").style.border = "1px solid black";
	document.getElementById("winter-effect").style.backgroundColor = "white";
	document.getElementById("winter-effect").style.color = "black";
	document.getElementById("vintage-effect").style.border = "1px solid black";
	document.getElementById("vintage-effect").style.backgroundColor = "white";
	document.getElementById("vintage-effect").style.color = "black";
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
	foto.convertedToBlur = false;
	foto.convertedToEmboss = false;
	foto.convertedToSharp = false;
	document.getElementById("blur-effect").style.border = "1px solid black";
	document.getElementById("blur-effect").style.backgroundColor = "white";
	document.getElementById("blur-effect").style.color = "black";
	document.getElementById("sharp-effect").style.border = "1px solid black";
	document.getElementById("sharp-effect").style.backgroundColor = "white";
	document.getElementById("sharp-effect").style.color = "black";
	document.getElementById("gray-effect").style.border = "1px solid black";
	document.getElementById("gray-effect").style.backgroundColor = "white";
	document.getElementById("gray-effect").style.color = "black";
	document.getElementById("summer-effect").style.border = "1px solid black";
	document.getElementById("summer-effect").style.backgroundColor = "white";
	document.getElementById("summer-effect").style.color = "black";
	document.getElementById("winter-effect").style.border = "1px solid black";
	document.getElementById("winter-effect").style.backgroundColor = "white";
	document.getElementById("winter-effect").style.color = "black";
	document.getElementById("vintage-effect").style.border = "1px solid black";
	document.getElementById("vintage-effect").style.backgroundColor = "white";
	document.getElementById("vintage-effect").style.color = "black";
	a = 50;
	document.getElementById("myRange").value = 50;
}

function flipHorizontally() {
	foto.flipHorizontally();
	foto.convertedToGrayScale = false;
	foto.convertedToBlur = false;
	foto.convertedToEmboss = false;
	foto.convertedToSharp = false;
	document.getElementById("blur-effect").style.border = "1px solid black";
	document.getElementById("blur-effect").style.backgroundColor = "white";
	document.getElementById("blur-effect").style.color = "black";
	document.getElementById("sharp-effect").style.border = "1px solid black";
	document.getElementById("sharp-effect").style.backgroundColor = "white";
	document.getElementById("sharp-effect").style.color = "black";
	document.getElementById("gray-effect").style.border = "1px solid black";
	document.getElementById("gray-effect").style.backgroundColor = "white";
	document.getElementById("gray-effect").style.color = "black";
	document.getElementById("summer-effect").style.border = "1px solid black";
	document.getElementById("summer-effect").style.backgroundColor = "white";
	document.getElementById("summer-effect").style.color = "black";
	document.getElementById("winter-effect").style.border = "1px solid black";
	document.getElementById("winter-effect").style.backgroundColor = "white";
	document.getElementById("winter-effect").style.color = "black";
	document.getElementById("vintage-effect").style.border = "1px solid black";
	document.getElementById("vintage-effect").style.backgroundColor = "white";
	document.getElementById("vintage-effect").style.color = "black";
	a = 50;
	document.getElementById("myRange").value = 50;
}

function rotate(elem) {
	foto.rotate(elem.value);
}

function download() {
	foto.export();
}