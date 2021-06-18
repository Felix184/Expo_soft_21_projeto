var foto;
window.onload = function() {
	foto=new Foto(); 
}
function selectImage() {
	document.getElementById("foto-file").click();
}
function download() {
	foto.export();
}