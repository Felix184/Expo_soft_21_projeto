/* Selecionar Imagem */
var foto;
window.onload = function() {
	foto=new Foto(); 
}
function selectImage() {
	document.getElementById("foto-file").click();
}
/* Baixar Imagem editada */
function download() {
	foto.export();
}

