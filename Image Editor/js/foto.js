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
Este javascript foi alterado para uso no site Fast Horse Editor */

class Foto {

	constructor() {

		var root = this;

		this.operationOrgCanvas = document.createElement("canvas");
		this.operationOrgCtx = this.operationOrgCanvas.getContext("2d");

		this.operationEditedCanvas = document.createElement("canvas");
		this.operationEditedCtx = this.operationEditedCanvas.getContext("2d");

		this.fileInput = document.getElementById("foto-file");
		this.fileInput.addEventListener("change", function(event){
			root.loadImage();
		})

		this.image = null;
		this.imageData = null;
		this.imageWidth = 0; 
		this.imageHeight = 0;
		this.convertedToGrayScale = false;

		// atributos criados pelo Matheus
		this.convertedToVintage = false;
		this.convertedToSummer = false;
		this.convertedToWinter = false;
		this.Brightness = 0; 

		this.previewImageElement = null;

		this.redPixelMatrix = [];
		this.greenPixelMatrix = [];
		this.bluePixelMatrix = [];
		this.alphaPixelMatrix = [];

		this.pickedR = ""; 
		this.pickedG = ""; 
		this.pickedB = "";

		this.selectedFileName = "";
		this.selectStart = false; 
		this.startX = ""; 
		this.startY = "";
		this.endX = "";
		this.endY = ""; 
		this.excludeArea = false;

		this.relativeStartX = "";
		this.relativeStartY = "";
		this.relativeEndX = "";
		this.relativeEndY = "";

		this.pickedR = null;
		this.pickedG = null;
		this.pickedB = null;

		this.selectRect = document.createElement("div");
		document.body.appendChild(this.selectRect);

		this.oldSelectedColorForColorize = null;
		this.ctrlPressed = false;

	}

	loadImage() {

		var input = document.getElementById("foto-file");
		this.selectedFileName = input.files.item(0).name;
		var reader = new FileReader();
		var root = this;

		reader.onload = function (e) {

			root.image = new Image();
			root.image.onload = function() {

				root.imageWidth = root.image.width;
				root.imageHeight = root.image.height;

				root.operationOrgCanvas.width = root.imageWidth;
				root.operationOrgCanvas.height = root.imageHeight;

				//edited
				root.operationEditedCanvas.width = root.imageWidth;
				root.operationEditedCanvas.height = root.imageHeight;

				//resetting
				root.imageData = [];
				root.operationOrgCtx.clearRect(0,0,root.operationOrgCanvas.width, root.operationOrgCanvas.height);
				root.operationEditedCtx.clearRect(0,0,root.operationEditedCanvas.width, root.operationEditedCanvas.height);

				root.operationOrgCtx.drawImage(root.image, 0, 0);
				root.operationEditedCtx.drawImage(root.image, 0, 0);

				//for viewing purpose
				root.previewImage(root.operationOrgCanvas, 0);
				//root.previewImage(); //put data on edited canvas also

				root.imageData = root.operationOrgCtx.getImageData(0, 0, root.operationOrgCanvas.width, root.operationOrgCanvas.height);

				//generate pixel matrix
				root.generatePixelMatrix();

				console.log("Pixel Data Loaded");
			}
			root.image.src = e.target.result
		}
		reader.readAsDataURL(input.files[0]);
	}

	generatePixelMatrix() {
		var r = [], g = [], b = [], a = [];
		this.redPixelMatrix = [];
		this.greenPixelMatrix = [];
		this.bluePixelMatrix = [];
		this.alphaPixelMatrix = [];
		for(var i=0; i < this.imageData.data.length; i = i + 4) {

			if((i/4) % this.imageWidth == 0) {
				if(i != 0) {
					this.redPixelMatrix.push(r);
					this.greenPixelMatrix.push(g);
					this.bluePixelMatrix.push(b);
					this.alphaPixelMatrix.push(a);
				}
				r = [];
				g = [];
				b = [];
				a = [];
			}
			r.push(this.imageData.data[i]);
			g.push(this.imageData.data[i + 1]);
			b.push(this.imageData.data[i + 2]);
			a.push(this.imageData.data[i + 3]);
		}
	}

	grayscale() {
		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {
			var red = modifiedImageData.data[i];
			var green = modifiedImageData.data[i + 1];
			var blue = modifiedImageData.data[i + 2];
			var alpha = modifiedImageData.data[i + 3];

			modifiedImageData.data[i] = (red + green + blue) /3;
			modifiedImageData.data[i + 1] = (red + green + blue) /3;
			modifiedImageData.data[i + 2] = (red + green + blue) /3 ;
		}
		//this.editedCtx.putImageData(modifiedImageData, 0, 0);
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.operationOrgCtx.putImageData(modifiedImageData, 0, 0);
		this.previewImage();
		this.convertedToGrayScale = !this.convertedToGrayScale;
	}

	/**
     * Apply filter
     * @param {*} filter 3x3 Matrix
     */
	applyFilter(filter) {
		var count = 0;
		for(var i=0; i < this.imageData.data.length; i = i + 4) {

			var finalR, finalG, finalB;
			var row = parseInt((i/4) / this.imageWidth);
			var col = (i/4) % this.imageWidth;
			if(row == 0 || col == 0 || 
				 row == this.imageHeight - 1 || col == this.imageWidth - 1)
				continue;

			var finalR = 0, finalG = 0, finalB = 0, finalA = 0;

			for(var x=0; x<3; x++) {
				for(var y=0; y<3; y++) {
					if(this.redPixelMatrix[row + (x - 1)] == undefined){continue;}
					if(this.redPixelMatrix[row + (x - 1)][col + (y - 1)] == undefined){continue;}
					finalR += filter[x][y] * this.redPixelMatrix[row + (x - 1)][col + (y - 1)];
					finalG += filter[x][y] * this.greenPixelMatrix[row + (x - 1)][col + (y - 1)];
					finalB += filter[x][y] * this.bluePixelMatrix[row + (x - 1)][col + (y - 1)];
					finalA += filter[x][y] * this.alphaPixelMatrix[row + (x - 1)][col + (y - 1)];
				}
			}

			if(this.convertedToGrayScale) {

				this.imageData.data[i] = (finalR + finalG + finalB) / 3;
				this.imageData.data[i + 1] = (finalR + finalG + finalB) / 3;
				this.imageData.data[i + 2] = (finalR + finalG + finalB) / 3;
				this.imageData.data[i + 3] = finalA;
			} else {
				this.imageData.data[i] = finalR;
				this.imageData.data[i + 1] = finalG;
				this.imageData.data[i + 2] = finalB;
				this.imageData.data[i + 3] = finalA;
			}


		}
		//console.log(this.imageData);
		this.operationEditedCtx.putImageData(this.imageData, 0, 0);
		this.previewImage();
	}

	/**
     * Make Blur
     */
	applyBlurFilter() {
		/*this.applyFilter([
            [.0625, .125, .0625],
            [.125, .25, .125],
            [.0625, .125, .0625]
        ])*/
		this.applyFilter([
			[1/9, 1/9, 1/9],
			[1/9, 1/9, 1/9],
			[1/9, 1/9, 1/9]
		])
	}

	/**
     * Make Emboss
     */
	applyEmbossFilter() {
		this.applyFilter([
			[-2, -1, 0],
			[-1, 1, 1],
			[0, 1, 2]
		])
	}

	/**
     * Make Sharp
     */
	applySharpFilter() {
		this.applyFilter([
			[0, -1, 0],
			[-1, 5, -1],
			[0, -1, 0]
		])
	}

	flipVertically() {

		//this.recreateImageObject();
		this.operationEditedCtx.translate(this.imageWidth, 0);
		this.operationEditedCtx.scale(-1, 1);
		this.operationEditedCtx.drawImage(this.image, 0, 0);

		this.operationOrgCtx.translate(this.imageWidth, 0);
		this.operationOrgCtx.scale(-1, 1);
		this.operationOrgCtx.drawImage(this.image, 0, 0);

		this.imageData = this.operationOrgCtx.getImageData(0, 0, this.operationOrgCanvas.width, this.operationOrgCanvas.height);
		this.generatePixelMatrix();

		this.previewImage();
	}

	flipHorizontally() {

		//this.recreateImageObject();
		this.operationEditedCtx.translate(0, this.imageHeight);
		this.operationEditedCtx.scale(1, -1);
		this.operationEditedCtx.drawImage(this.image, 0, 0);

		this.operationOrgCtx.translate(0, this.imageHeight);
		this.operationOrgCtx.scale(1, -1);
		this.operationOrgCtx.drawImage(this.image, 0, 0);

		this.imageData = this.operationOrgCtx.getImageData(0, 0, this.operationOrgCanvas.width, this.operationOrgCanvas.height);
		this.generatePixelMatrix();

		this.previewImage();
	}

	/**
     * Download ImagepreviewImage
     */
	export() {

		var link = document.createElement('a');
		link.download = this.selectedFileName + '-edited.png';
		link.href = this.operationEditedCanvas.toDataURL()
		link.click();
	}

	previewImage(canvas, firstLoad, recreateImageFlag) {

		var root = this;
		this.previewImageElement = document.getElementById("foto-image");
		this.previewImageElement.setAttribute('draggable', false);

		var root = this;
		if(firstLoad != undefined && firstLoad == 0) {
			this.previewImageElement.addEventListener("mouseover", function(event){
				this.style.cursor = "crosshair"
			})

			this.previewImageElement.addEventListener("click", function(event){
				root.relativeStartX = event.offsetX;
				root.relativeStartY = event.offsetY;

				if(root.ctrlPressed) {
					root.pickColorPixel(root.relativeStartX, root.relativeStartY);
				}
				root.selectStart = false;
			})

			this.previewImageElement.addEventListener("mousedown", function(event){
				root.selectStart = true;
				root.startX = event.clientX;
				root.startY = event.clientY;

				root.relativeStartX = event.offsetX;
				root.relativeStartY = event.offsetY;
			})

			this.previewImageElement.addEventListener("mousemove", function(event){
				root.endX = event.clientX;
				root.endY = event.clientY;

				if(root.selectStart) {

					root.selectRect.style.position = "fixed";
					root.selectRect.style.display = "initial";
					root.selectRect.style.border = "2px dashed black";
					root.selectRect.style.top = root.startY + "px";
					root.selectRect.style.left = root.startX + "px";

					root.selectRect.style.height = (root.endY - root.startY) + "px";
					root.selectRect.style.width = (root.endX - root.startX) + "px";
				}
			})

			this.previewImageElement.addEventListener("mouseup", function(event){

				root.relativeEndX = event.layerX;
				root.relativeEndY = event.layerY;

				root.selectStart = false;
				root.selectRect.style.height = "0px";
				root.selectRect.style.width = "0px";
				root.selectRect.style.display = "none";
			})

			this.selectRect.addEventListener("mouseup", function(event){
				root.selectStart = false;
			})
		}

		if(canvas == undefined)
			this.previewImageElement.src = root.operationEditedCanvas.toDataURL();
		else {
			this.previewImageElement.src = canvas.toDataURL();
		}

		//this.recreateImageObject();
	}

	applyColorFilter(color) {
		var r = parseInt(color.substr(1,2), 16) * .5;
		var g = parseInt(color.substr(3,2), 16) * .5;
		var b = parseInt(color.substr(5,2), 16) * .5;

		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {

			if(modifiedImageData.data[i] <= r)modifiedImageData.data[i] = r;
			if(modifiedImageData.data[i + 1] <= g)modifiedImageData.data[i+1] = g;
			if(modifiedImageData.data[i + 2] <= b)modifiedImageData.data[i+2] = b;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.operationOrgCtx.putImageData(modifiedImageData, 0, 0);
		this.previewImage();
	}

	cropSelected() {
		var imgW = this.previewImageElement.width;
		var imgH = this.previewImageElement.height;

		var imgWFactor = this.imageWidth / imgW;
		var imageHFactor = this.imageHeight / imgH;

		var actualStartX = this.relativeStartX * imgWFactor;
		var actualStartY = this.relativeStartY * imageHFactor;

		var croppedWidth = parseInt(parseInt(this.selectRect.style.width.replace(/\D/g,'')) * imgWFactor);
		var croppedHeight = parseInt(parseInt(this.selectRect.style.height.replace(/\D/g,'')) * imageHFactor);

		var editedCroppedImageData = this.operationEditedCtx.getImageData(actualStartX, actualStartY, croppedWidth, croppedHeight);
		var orgCroppedImageData = this.operationOrgCtx.getImageData(actualStartX, actualStartY, croppedWidth, croppedHeight);

		this.operationEditedCtx.clearRect(0, 0, this.operationEditedCanvas.width, this.operationEditedCanvas.height);
		this.operationOrgCtx.clearRect(0, 0, this.operationOrgCtx.width, this.operationOrgCtx.height);

		this.operationEditedCanvas.width = croppedWidth;
		this.operationEditedCanvas.height = croppedHeight;

		this.operationOrgCanvas.width = croppedWidth;
		this.operationOrgCanvas.height = croppedHeight;

		this.operationEditedCtx.putImageData(editedCroppedImageData, 0, 0);
		this.operationOrgCtx.putImageData(orgCroppedImageData, 0, 0);

		this.imageWidth = croppedWidth;
		this.imageHeight = croppedHeight;

		this.imageData = this.operationOrgCtx.getImageData(0, 0, this.operationOrgCanvas.width, this.operationOrgCanvas.height);
		this.generatePixelMatrix();

		this.selectRect.style.display = "none";

		this.previewImage()
	}

	/* ----------------- métodos criados pelo Matheus ------------------------- */

	// reseta os filtros aplicados -- sem uso no momento
	resetFilter() {
		this.applyFilter([
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0]
		])
	}


	// Diminuir a transparência da imagem
	decreaseTransparency() {
		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {
			var pixel = [];
			var alpha = modifiedImageData.data[i + 3];
			modifiedImageData.data[i + 3] = alpha - 10;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.previewImage();
	}

	// Aumentar a transparência da imagem
	increaseTransparency() {
		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {
			var pixel = [];
			var alpha = modifiedImageData.data[i + 3];
			modifiedImageData.data[i + 3] = alpha + 10;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.previewImage();
	}

	//Aumentar o brilho das imagens -- o método original da biblioteca estava com bugs
	makeBright() {
		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {
			var pixel = [];
			var red = modifiedImageData.data[i];
			var green = modifiedImageData.data[i + 1];
			var blue = modifiedImageData.data[i + 2];
			var alpha = modifiedImageData.data[i + 3];

			this.Brightness += 1;

			if (this.Brightness % 2 == 0) {this.qtdBrilho = 4} else {this.qtdBrilho = 6}

			modifiedImageData.data[i] = red + this.qtdBrilho;
			modifiedImageData.data[i + 1] = green + this.qtdBrilho;
			modifiedImageData.data[i + 2] = blue + this.qtdBrilho;
			modifiedImageData.data[i + 3] = alpha;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.previewImage();
	}

	// Tirar o brilho das imagens -- o método original da biblioteca estava com bugs
	makeDark() {
		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {
			var pixel = [];
			var red = modifiedImageData.data[i];
			var green = modifiedImageData.data[i + 1];
			var blue = modifiedImageData.data[i + 2];
			var alpha = modifiedImageData.data[i + 3];

			this.Brightness -= 1;

			if (this.Brightness % 2 == 0) {this.qtdBrilho = 4} else {this.qtdBrilho = 6}

			modifiedImageData.data[i] = red - this.qtdBrilho;
			modifiedImageData.data[i + 1] = green - this.qtdBrilho;
			modifiedImageData.data[i + 2] = blue - this.qtdBrilho;
			modifiedImageData.data[i + 3] = alpha;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.previewImage();
	}

	// Filtro vintage
	applyVintageFilter(color) {
		color = "#734F46";
		var r = parseInt(color.substr(1,2), 16) * .5;
		var g = parseInt(color.substr(3,2), 16) * .5;
		var b = parseInt(color.substr(5,2), 16) * .5;

		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {

			if(modifiedImageData.data[i] <= r)modifiedImageData.data[i] = r;
			if(modifiedImageData.data[i + 1] <= g)modifiedImageData.data[i+1] = g;
			if(modifiedImageData.data[i + 2] <= b)modifiedImageData.data[i+2] = b;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.operationOrgCtx.putImageData(modifiedImageData, 0, 0);
		this.convertedToVintage = true;
		this.previewImage();
	}

	// Filtro de inverno
	applyWinterFilter(color) {
		color = "#054f77";
		var r = parseInt(color.substr(1,2), 16) * .5;
		var g = parseInt(color.substr(3,2), 16) * .5;
		var b = parseInt(color.substr(5,2), 16) * .5;

		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {

			if(modifiedImageData.data[i] <= r)modifiedImageData.data[i] = r;
			if(modifiedImageData.data[i + 1] <= g)modifiedImageData.data[i+1] = g;
			if(modifiedImageData.data[i + 2] <= b)modifiedImageData.data[i+2] = b;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.operationOrgCtx.putImageData(modifiedImageData, 0, 0);
		this.convertedToWinter = true;
		this.previewImage();
	}

	// Filtro de verão
	applySummerFilter(color) {
		color = "#fd821";
		var r = parseInt(color.substr(1,2), 16) * .5;
		var g = parseInt(color.substr(3,2), 16) * .5;
		var b = parseInt(color.substr(5,2), 16) * .5;

		var modifiedImageData = this.imageData;
		for(var i=0; i < modifiedImageData.data.length; i = i + 4) {

			if(modifiedImageData.data[i] <= r)modifiedImageData.data[i] = r;
			if(modifiedImageData.data[i + 1] <= g)modifiedImageData.data[i+1] = g;
			if(modifiedImageData.data[i + 2] <= b)modifiedImageData.data[i+2] = b;
		}
		this.operationEditedCtx.putImageData(modifiedImageData, 0, 0);
		this.operationOrgCtx.putImageData(modifiedImageData, 0, 0);
		this.convertedToSummer = true;
		this.previewImage();
	}

	// método para resetar a imagem do canvas
	resetImage() {
		this.modifiedImageData = null;
		this.image = null;
		this.imageData = null;
		this.imageWidth = 0; 
		this.imageHeight = 0;
		this.convertedToGrayScale = false;
		this.convertedToVintage = false;
		this.convertedToSummer = false;
		this.convertedToWinter = false;
		this.Brightness = 0;

		this.previewImageElement = null;

		this.redPixelMatrix = [];
		this.greenPixelMatrix = [];
		this.bluePixelMatrix = [];
		this.alphaPixelMatrix = [];

		this.pickedR = ""; 
		this.pickedG = ""; 
		this.pickedB = "";

		this.selectStart = false; 
		this.startX = ""; 
		this.startY = "";
		this.endX = "";
		this.endY = ""; 
		this.excludeArea = false;

		this.relativeStartX = "";
		this.relativeStartY = "";
		this.relativeEndX = "";
		this.relativeEndY = "";

		this.pickedR = null;
		this.pickedG = null;
		this.pickedB = null;

		this.previewImage();
		this.loadImage();
		this.resetAllButtons();

		document.getElementById("sharp-effect").disabled = false;
		document.getElementById("emboss-effect").disabled = false;
		document.getElementById("blur-effect").disabled = false;
		document.getElementById("summer-effect").disabled = false;
		document.getElementById("winter-effect").disabled = false;
		document.getElementById("vintage-effect").disabled = false;
	}

	//aplica o estilo no botão de borrar a imagem -- quando ele é pressionado
	BlurButton() {
		document.getElementById("blur-effect").style.border = "1px solid #303675";
		document.getElementById("blur-effect").style.backgroundColor = "black";
		document.getElementById("blur-effect").style.color = "white";
	}

	// aplica o estilo no botão de nitidez -- quando ele é pressionado
	SharpButton() {
		document.getElementById("sharp-effect").style.border = "1px solid #303675";
		document.getElementById("sharp-effect").style.backgroundColor = "black";
		document.getElementById("sharp-effect").style.color = "white";
	}

	// aplica o estilo no botão de relevo -- quando ele é pressionado
	EmbossButton() {
		document.getElementById("emboss-effect").style.border = "1px solid #303675";
		document.getElementById("emboss-effect").style.backgroundColor = "black";
		document.getElementById("emboss-effect").style.color = "white";
	}

	// aplica o estilo no botão de escala de cinza -- quando ele é pressionado
	GrayButton() {
		document.getElementById("gray-effect").style.border = "1px solid #303675";
		document.getElementById("gray-effect").style.backgroundColor = "black";
		document.getElementById("gray-effect").style.color = "white";
	}

	// aplica o estilo no botão do filtro de verão -- quando ele é pressionado
	SummerButton() {
		document.getElementById("summer-effect").style.border = "1px solid #303675";
		document.getElementById("summer-effect").style.backgroundColor = "black";
		document.getElementById("summer-effect").style.color = "white";
	}

	// aplica o estilo no botão do filtro de inverno -- quando ele é presionado
	WinterButton() {
		document.getElementById("winter-effect").style.border = "1px solid #303675";
		document.getElementById("winter-effect").style.backgroundColor = "black";
		document.getElementById("winter-effect").style.color = "white";
	}

	// aplica o estilo no botão do filtro vintage -- quando ele é presionado
	VintageButton() {
		document.getElementById("vintage-effect").style.border = "1px solid #303675";
		document.getElementById("vintage-effect").style.backgroundColor = "black";
		document.getElementById("vintage-effect").style.color = "white";
	}


	// aplica o estilo de pressionado no botão de borrar a imagem
	pressedBlurButton() {
		document.getElementById("blur-effect").style.backgroundColor = "gray";
		document.getElementById("blur-effect").style.color = "black";
		document.getElementById("blur-effect").disabled = true;
	}

	// aplica o estilo de pressionado no botão de nitidez
	pressedSharpButton() {
		document.getElementById("sharp-effect").style.backgroundColor = "gray";
		document.getElementById("sharp-effect").style.color = "black";
		document.getElementById("sharp-effect").disabled = true;
	}

	// aplica o estilo de pressionado no botão de relevo
	pressedEmbossButton() {
		document.getElementById("emboss-effect").style.backgroundColor = "gray";
		document.getElementById("emboss-effect").style.color = "black";
		document.getElementById("emboss-effect").disabled = true;
	}

	// aplica o estilo de pressionado no botão de filtro de verão
	pressedSummerButton() {
		document.getElementById("summer-effect").style.backgroundColor = "gray";
		document.getElementById("summer-effect").style.color = "black";
		document.getElementById("summer-effect").disabled = true;
	}

	// aplica o estilo de pressionado no botão de filtro de inverno
	pressedWinterButton() {
		document.getElementById("winter-effect").style.backgroundColor = "gray";
		document.getElementById("winter-effect").style.color = "black";
		document.getElementById("winter-effect").disabled = true;
	}

	// aplica o estilo de pressionado no botão de filtro vintage
	pressedVintageButton() {
		document.getElementById("vintage-effect").style.backgroundColor = "gray";
		document.getElementById("vintage-effect").style.color = "black";
		document.getElementById("vintage-effect").disabled = true;
	}

	// Resetar todos os botões ao estilo original
	resetAllButtons() {
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
		document.getElementById("emboss-effect").style.border = "1px solid black";
		document.getElementById("emboss-effect").style.backgroundColor = "white";
		document.getElementById("emboss-effect").style.color = "black";
	}
}