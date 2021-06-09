var foto;
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
	foto.makeBright();
}

function makeDark() {
	foto.makeDark();
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
function openColorFilterPicker() {
	document.getElementById("colorize-color-picker").click();
}

function applyColorFilter(elem) {
	var color = elem.value;
	foto.applyColorFilter(color);
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