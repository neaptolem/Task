function iFrameOn(){
	richTextField.document.designMode = 'On';
}
function iUndo(){
	richTextField.document.execCommand('undo',false,null);
}
function iRedo(){
	richTextField.document.execCommand('redo',false,null);
}
function iBold(e){
	richTextField.document.execCommand('bold',false,null);
	changecolor(e);
}
function iUnderline(e){
	richTextField.document.execCommand('underline',false,null);
	changecolor(e);
}
function iItalic(e){
	richTextField.document.execCommand('italic',false,null);
	changecolor(e);
}
function iFontSize(){
	var size= document.getElementById("font_size").value;
	richTextField.document.execCommand('FontSize',false,size);
}
function iForeColor(){
	var color =document.getElementById("font_color").value;
	richTextField.document.execCommand('ForeColor',false,color);
}
function iFontName(){
	var name= document.getElementById("font_name").value;
	richTextField.document.execCommand('FontName',false,name);
}
function iHorizontalRule(){
	richTextField.document.execCommand('inserthorizontalrule',false,null);
}
function iUnorderedList(e){
	richTextField.document.execCommand("InsertOrderedList", false,"newOL");
}
function iOrderedList(e){
	richTextField.document.execCommand("InsertUnorderedList", false,"newUL");
}
function iJustifyLeft(e){
	richTextField.document.execCommand("justifyLeft",false,null);
}
function iJustifyCenter(e){
	richTextField.document.execCommand("justifyCenter",false,null);
}
function iJustifyFull(e){
	richTextField.document.execCommand("justifyFull",false,null);
}
function iJustifyRight(e){
	richTextField.document.execCommand("justifyRight",false,null);
}
function iLink(){
	var linkURL = prompt("Enter the URL for this link:", "http://");
	richTextField.document.execCommand("CreateLink", false, linkURL);
}
function iUnLink(){
	richTextField.document.execCommand("Unlink", false, null);
}
function iImage(){
	var imgSrc = prompt('Enter image location', '');
    if(imgSrc != null){
        richTextField.document.execCommand('insertimage', false, imgSrc);
    }
}
function iSupScript(e){
	richTextField.document.execCommand("superscript", false, null);
}
function iSubScript(e){
	richTextField.document.execCommand("subscript", false, null);
}
function iOutDent(e){
	richTextField.document.execCommand("outdent", false, null);
}
function iInDent(e){
	richTextField.document.execCommand("indent", false, null);
}

//end add to html
window.onload = function(){
	document.getElementById('richTextField').contentDocument.body.onpaste = function (e) {
				iPasteInRichEdit;
	}
};
//todo redad about this functions/ change name of functions
function iPasteInRichEdit(e) {
    var text;
        if (window.clipboardData && window.clipboardData.getData) { // IE
            text = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) {
            text = e.clipboardData.getData('text/plain');
        }
        if (text != "") {
            e.stopPropagation();
            e.preventDefault();
          document.getElementById('richTextField').contentDocument.execCommand('insertTEXT', false, text);
        }

}
//read images
var TCNDDU = TCNDDU || {};// for inserting from desktop
// inserting from desktop
(function () {
    var dropContainer,// what to output
        imageOut = document.createDocumentFragment(),// image for output
        domElement;// how to output(whith what elements)
    TCNDDU.setup = function () {
        dropContainer = document.getElementById("richTextField").contentDocument.body;
        dropContainer.addEventListener("dragenter", function (event) {
        }, false);
        dropContainer.addEventListener("drop", TCNDDU.handleDrop, false);
    };
    TCNDDU.uploadError = function (error) {
        console.log("error upload: " + error.code);
    };
    TCNDDU.handleDrop = function (event) {
        var dt = event.dataTransfer,
            files = dt.files,
            count = files.length;
        for (var i = 0; i < count; i++) {
            if (files[i].size < 104857600) {
                var file = files[i],
                    droppedFileName = file.name,
                    reader = new FileReader();
                reader.index = i;
                reader.file = file;
                reader.addEventListener("loadend", TCNDDU.buildImageListItem, false);
                reader.readAsDataURL(file);
            } else {
                alert("file is too big, needs to be below 100mb");
            }
        }
    };
    TCNDDU.buildImageListItem = function (event) {
        domElement = document.createElement('img');
        var data = event.target.result,
            getBinaryDataReader = new FileReader();
        domElement.src = data; // base64 encoded string of local file(s)
        imageOut.appendChild(domElement);
        dropContainer.appendChild(imageOut);//inserting
    };

    window.addEventListener("load", TCNDDU.setup, false);
})();

//open and save file from computer
function iSaveTextAsFile()
{
	var textToWrite = window.frames['richTextField'].document.body.innerHTML;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("title").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}
// change color of button by click
function changecolor(e) {
	if (e.style.backgroundColor == 'silver'){
		e.style.backgroundColor = 'gray';
	} else 	e.style.backgroundColor = 'silver';
	}
