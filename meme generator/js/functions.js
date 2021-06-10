var foto;
var indiceBright = 0;
document.getElementById("myRange").disabled = true;
var a = parseInt(document.getElementById("myRange").value);
window.onload = function() {
	foto=new Foto(); 
}
function selectImage() {
	document.getElementById("foto-file").click();
}

function makeGrayScale() {
	foto.grayscale();
}

function makeBright() {
	indiceBright += 1;
	if (indiceBright > 5) { return; } 
	foto.makeBright();
	a += 10;
	document.getElementById("myRange").value = a;
}

function makeDark() {
	indiceBright -= 1;
	if (indiceBright < -5) {return;}
	foto.makeDark();
	a -= 10;
	document.getElementById("myRange").value = a;
}

function makeBlur() {
	foto.applyBlurFilter();
}

function makeEmboss() {
	foto.applyEmbossFilter();
}

function makeSharp() {
	foto.applySharpFilter();
}
function makeVintage() {
	var color = "#734F46";
	foto.colorize(color);
	foto.makeDark();
}
function resetImage() {
	foto.resetImage();
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
}

function rotate(elem) {
	foto.rotate(elem.value);
}

function download() {
	foto.export();
}