                                                                          




class SelectFileImageComponent extends HTMLElement {

    _Id = null; //El Id Global
    _originalBase64 = null; //El base64 original en caso de que se de boton restaurar se pone este.
    _currentBase64 = null; //El base64 con el que se está manipulando si se cambia y todo esto.
    _lastBase64 = null; //el último que se cambió.
    _currentFileFilter = ['jpg', 'jpeg', 'png', 'gif']; //filtro de archivos tipo jpg png pdf etc etc

    _div_principal = null; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR
    _div_imgContainer = null; //contendor de la imagen aquí está la lógica para armar o limpiar el contenedor de la img
    _iImage1 = null; //Boton Cargar File
    _iImage2 = null; //Campo con nombre de archivo cambiado
    _btnRemover = null; //Boton Limpiar
    _btnRestaurar = null; //Boton de restaurar
    _btnDescargar = null; //Boton descargar
    _previewHolder = null; //Boton Limpiar

    _heightContainer = null;
    _heightImage = null;


    _getBase64 = null; //function para obtener el base64

  constructor( { divContainer, Id, Base64, heightInPX, getBase64, title, smallButtons = false}) {
    super();
    const _this = this;

    this._getBase64 = getBase64;
    
    //REGULACION/NORMALIZACION DE PARAMETROS
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    Base64 = (Base64 != null && Base64 != undefined) ? Base64 : null; 
    heightInPX = (heightInPX != null && heightInPX != undefined) ? heightInPX : 200; 
    title = (title != null && title != undefined) ? title : ""; 
    
    //ASIGNACION DE PROPIEDADES
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    this._Id = Id;
    this._currentBase64 = Base64;
    this._originalBase64 = Base64;
    this._lastBase64 = Base64;

    this._heightContainer = (heightInPX + 5).toString() + "px";
    this._heightImage = (heightInPX).toString() + "px";

    //NOMBRE DE DIVS DE TRABAJO Y COMPONENTES DE TRABAJO
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    this._div_principal = this._Id + "_DIV_PRINCIPAL"; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR
    this._div_imgContainer = this._Id + "_DIV_imgContainer"; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR
    this._iImage1 = this._Id + "_iImage1"; //Boton Cargar File
    this._iImage2 = this._Id + "_iImage2"; //Campo con nombre de archivo cambiado
    this._btnRemover = this._Id + "_btnRemover"; //Boton Limpiar
    this._btnRestaurar = this._Id + "_btnRestaurar"; //Boton Restaurar
    this._btnDescargar = this._Id + "_btnDescargar"; //Boton Descargar
    this._previewHolder = this._Id + "_previewHolder"; //Boton Limpiar


    var seccionBotones1 = smallButtons == false ? '<span>Subir</span>' : ''
    var seccionBotones2 = smallButtons == false ? '<span>Remover</span>' : ''
    var seccionBotones3 = smallButtons == false ? '<span>Restaurar</span>' : ''
    var seccionBotones4 = smallButtons == false ? '<span>Descargar</span>' : ''

    
    var component = '';
    component = '' +
    ' <div id="' + this._div_principal + '" class="col s12 m12 l12" style="background-color: #f3f3f3; border-radius: 7px;"> ' +
    '     <div class="col s12 m12 l12" style="font-weight: bold; height: 1rem;"><span style="font-size: 1rem;color: rgb(25, 118, 210);">' + title + '</span></div>' +
    '     <div class="file-field input-field col s12 m12 l12" style="margin-top: 0.5rem !important"> ' +
    '         <div id="' + this._div_imgContainer + '" class="SelectFileComponent" style="width: 100%; height: ' + this._heightContainer + ';"> ' +
    '             <img id="' + this._previewHolder + '" style="width: 100%; height: ' + this._heightImage + '; object-fit: scale-down;"> ' +
    '         </div> ' +
    '     </div> ' +
    '     <div class="file-field input-field col s12 m12 l12" style="margin-top: 7px !important;"> ' +
    '         <div class="col s12 m12 l12" style="margin-bottom: 10px;"> ' +
    '             <div class="col s12 m6 l3 SelectFileComponentCtn"> ' +
    '                 <div class="SelectFileComponentBtn col s12 m12 l12 tooltipped" data-position="bottom" data-tooltip="Agregas una imagen desde tu PC"> ' +
    '                     <i class="fa-solid fa-paperclip SelectFileComponentIcn"></i> ' + seccionBotones1 +
    '                     <input id="' + this._iImage1 + '" type="file"> ' +
    '                 </div> ' +
    '             </div> ' +
    '             <div class="col s12 m6 l3 SelectFileComponentCtn"> ' +
    '                 <div id="' + this._btnRemover + '" class="SelectFileComponentBtn col s12 m12 l12 tooltipped" data-position="bottom" data-tooltip="Quita la imagen que está seleccionada"> ' +
    '                     <i class="fa-solid fa-trash-can SelectFileComponentIcn"></i> ' + seccionBotones2 +
    '                 </div> ' +
    '             </div> ' +
    '             <div class="col s12 m6 l3 SelectFileComponentCtn tooltipped" data-position="bottom" data-tooltip="Restaura al estado inicial"> ' +
    '                 <div id="' + this._btnRestaurar + '" class="SelectFileComponentBtn col s12 m12 l12"> ' +
    '                     <i class="fa-solid fa-arrow-rotate-left SelectFileComponentIcn"></i> ' + seccionBotones3 +
    '                 </div> ' +
    '             </div> ' +
    '             <div class="col s12 m6 l3 SelectFileComponentCtn"> ' +
    '                 <div id="' + this._btnDescargar + '" class="SelectFileComponentBtn col s12 m12 l12 tooltipped" data-position="bottom" data-tooltip="Descarga la imagen que existe"> ' +
    '                     <i class="fa-solid fa-download SelectFileComponentIcn"></i> ' + seccionBotones4 +
    '                 </div> ' +
    '             </div> ' +
    '             <div class="file-path-wrapper col s12 m12 l12" style="margin-top: 10px; padding-left: 0px; margin-bottom: 10px; display: none;"> ' +
    '                 <input id="' + this._iImage2 + '" class="file-path validate SelectFileComponentInput" type="text" placeholder="Nombre de Archivo"> ' +
    '             </div> ' +
    '         </div> ' +
    '     </div> ' +
    ' </div> ';

    $("#" + divContainer).empty();
    $("#" + divContainer).append(component);
    $('.tooltipped').tooltip();

    if (Base64 != null) {
        $('#' + this._previewHolder).attr('src', Base64["base64"]);
        $('#' + _this._previewHolder).css('background-color', "white");
        $("#" + this._iImage2).val(Base64["nombre"]);
    }


    $("#" + this._iImage1).change(function() {
        _this.readURL(this);
    });

    $("#" + this._btnRemover).click(function() {
        _this.clearImg();
    });

    $("#" + this._btnRestaurar).click(function() {
        _this.restoreImg();
    });

    $("#" + this._btnDescargar).click(function() {
        _this.downloadImg();
    });
  }


    clearImg() {
        $("#" + this._iImage1).val("");
        $("#" + this._iImage2).val("");
        this._currentBase64 = null;
        this._lastBase64 = null;
        $('#' + this._div_imgContainer).empty();
        $('#' + this._div_imgContainer).append('<img id="' + this._previewHolder + '" style="width: 100%; height: ' + this._heightImage + '; object-fit: scale-down;">');
        return;
    }

    restoreImg() {
        if ((this._originalBase64 == null || this._originalBase64 == undefined) || this._originalBase64 == "" ) {
            $('#' + this._div_imgContainer).empty();
            $('#' + this._div_imgContainer).append('<img id="' + this._previewHolder + '" style="width: 100%; height: ' + this._heightImage + '; object-fit: scale-down;">');
            $("#" + this._iImage1).val(null);
            $("#" + this._iImage2).val("");
        } else {
            $('#' + this._previewHolder).attr('src', this._originalBase64.base64);
            $("#" + this._iImage1).val(null);
            $("#" + this._iImage2).val(this._originalBase64.nombre);
        }

        this._currentBase64 = this._originalBase64;       
        this._lastBase64 = this._originalBase64;
        return;
    }
              
    restoreToPrevious() {
        if ((this._lastBase64 == null || this._lastBase64 == undefined) || this._lastBase64 == "" ) {
            $('#' + this._div_imgContainer).empty();
            $('#' + this._div_imgContainer).append('<img id="' + this._previewHolder + '" style="width: 100%; height: ' + this._heightImage + '; object-fit: scale-down;">');
            $("#" + this._iImage1).val(null);
            $("#" + this._iImage2).val("");
        } else {
            $('#' + this._previewHolder).attr('src', this._lastBase64.base64);
            $("#" + this._iImage1).val(null);
            $("#" + this._iImage2).val(this._lastBase64.nombre);
        }

        this._currentBase64 = this._lastBase64;       
        return;
    }

    downloadImg() {
        if (!((this._currentBase64 == null || this._currentBase64 == undefined) || this._currentBase64 == "")) {
            // Crear un enlace temporal
            var link = document.createElement('a');

            // Establecer el atributo href del enlace a la representación de datos base64 del archivo
            link.href = this._currentBase64.base64;

            // Establecer el atributo download del enlace al nombre del archivo
            link.download = this._currentBase64.nombre;

            // Simular un clic en el enlace para descargar el archivo
            link.click();
        }
        return;
    }

    readURL(input) {
        const _this = this;

        if (input.files && input.files[0]) {

        var fileName = input.files[0].name;

        var extension = fileName.substring(fileName.lastIndexOf('.')+1).toLowerCase();

        //var allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        var allowedExtensions = this._currentFileFilter;
        if (allowedExtensions.indexOf(extension) === -1) {
        _this.restoreToPrevious()
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#' + _this._previewHolder).attr('src', e.target.result);
            $('#' + _this._previewHolder).css('background-color', "white");
            _this._currentBase64 = {}
            _this._currentBase64["base64"] = e.target.result;
            _this._currentBase64["nombre"] = fileName;
            _this._lastBase64 = _this._currentBase64
        }
        reader.readAsDataURL(input.files[0]);
        } else {
        alert('select a file to see preview');
        //$('#' + this._previewHolder).attr('src', '');
        _this.restoreToPrevious()
        }
    }

    getBase64() {
        return this._currentBase64;
    }

}

customElements.define("select-file-image-component", SelectFileImageComponent);