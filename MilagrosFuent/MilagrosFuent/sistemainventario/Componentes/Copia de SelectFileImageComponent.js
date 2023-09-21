                                                                          




class SelectFileComponent extends HTMLElement {

    _Id = null;
    _currentBase64 = null;
    _currentFileFilter = null;

    _div_principal = null; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR
    _iImage1 = null; //Boton Cargar File
    _iImage2 = null; //Campo con nombre de archivo cambiado
    _btnLimpiar = null; //Boton Limpiar
    _previewHolder = null; //Boton Limpiar


    _getBase64 = null;

    _vacio = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFcSURBVDhPzdCtKwNxEMbxxAQ2Qr9AlrLj7woDp/tiRVC7VzEHspKwNHYfBR5AZ5a5O5vfZGL9fQ/5/5GMYcFusNNt0uLywz8Jq3g+7Q3lwnr9r7V8gL+gDp7VfRv4zEXbW8Dr05azQLgRJjlySvC9USW8Tq3Mqhx2hTHU1In6Y2f6foPf52i+KM6vCPinTZllPdwrhokyt6U/jg6Dy6InQY6tkLfoJduzNh/SlvZ9XN+RV78skJNn1NJNyOy24l4WbWE8yfLGs0sRrsZS9XWMSJjS0NwAAAABJRU5ErkJggg=="

    


  constructor( { divContainer, Id, Base64, FileFilter, getBase64}) {
    super();
    const _this = this;

    this._getBase64 = getBase64;

    //REGULACION/NORMALIZACION DE PARAMETROS
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    Base64 = (Base64 != null && Base64 != undefined) ? Base64 : null; 
    FileFilter = (FileFilter != null && FileFilter != undefined) ? FileFilter : null; 
    
    //ASIGNACION DE PROPIEDADES
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    this._Id = Id;
    this._currentBase64 = Base64;
    this._currentFileFilter = FileFilter; //var allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    //NOMBRE DE DIVS DE TRABAJO Y COMPONENTES DE TRABAJO
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    this._div_principal = this._Id + "_DIV_PRINCIPAL"; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR
    this._iImage1 = this._Id + "_iImage1"; //Boton Cargar File
    this._iImage2 = this._Id + "_iImage2"; //Campo con nombre de archivo cambiado
    this._btnLimpiar = this._Id + "_btnLimpiar"; //Boton Limpiar
    this._previewHolder = this._Id + "_previewHolder"; //Boton Limpiar
    

    var component = '' +
    '<div id="' + this._div_principal + '" class="col s12 m12 l12" style="background-color: #f3f3f3; border-radius: 7px; margin: 10px"> ' +
    '    <div class="file-field input-field col s8 m8 l8"> ' +
    '        <div class="col s12 m12 l12" style="margin-top: 10px;"> ' +
    '            <div class="btn col s6 m6 l6"> ' +
    '                <span>Subir Archivo</span> ' +
    '                <input id="' + this._iImage1 + '" type="file"> ' +
    '            </div> ' +
    '            <div class="col s6 m6 l6"> ' +
    '                <a id="' + this._btnLimpiar + '" class="waves-effect waves-light btn" style="width: 100%">Limpiar</a> ' +
    '            </div> ' +
    '            <div class="file-path-wrapper col s12 m12 l12" style="margin-top: 10px; padding-left: 0px"> ' +
    '                <input id="' + this._iImage2 + '" class="file-path validate" type="text" placeholder="Seleccione Archivo"> ' +
    '            </div> ' +
    '        </div> ' +
    '    </div> ' +
    '    <div class="file-field input-field col s4 m4 l4"> ' +
    '        <img id="' + this._previewHolder + '" class="SelectFileComponent" width="100px" height="100px" /> ' +
    '    </div> ' +
    '</div> ';

    console.log("component", component);

   
    $("#" + divContainer).append(component);

    if (Base64 != null) {
        $('#' + this._previewHolder).attr('src', Base64);
    }


    $("#" + this._iImage1).change(function() {
        _this.readURL(this);
    });

    $("#" + this._btnLimpiar).click(function() {
        _this.clearImg();
    });
  }


    clearImg() {
        $("#" + this._iImage1).val("");
        $("#" + this._iImage2).val("");
        $("#" + this._previewHolder).attr('src', this._vacio);
        return;
    }

    readURL(input) {
        const _this = this;
        console.log("100");
        if (input.files && input.files[0]) {

        console.log("200");

        var fileName = input.files[0].name;
        console.log("300");
        var extension = fileName.substring(fileName.lastIndexOf('.')+1).toLowerCase();
        console.log("400");
        //var allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        var allowedExtensions = this._currentFileFilter;
        console.log("500");
        if (allowedExtensions.indexOf(extension) === -1) {
        console.log("600");
            $("#" + this._iImage1).val("");
            $("#" + this._iImage2).val("");
            $("#" + this._previewHolder).attr('src', "");
            alert('El archivo no es tipo Imagen');
            return;
        }
        console.log("700");
        var reader = new FileReader();
        console.log("800");
        reader.onload = function(e) {
            console.log("900 this._previewHolder", _this._previewHolder);
            $('#' + _this._previewHolder).attr('src', e.target.result);
            console.log("1000");
            _this._currentBase64 = e.target.result;
            console.log("1100");
            console.log("valor en base64", $('#' + _this._previewHolder).attr('src'));
            console.log("1200");
        }
        console.log("1300");
        reader.readAsDataURL(input.files[0]);
        } else {
        console.log("1400");
        alert('select a file to see preview');
        $('#' + this._previewHolder).attr('src', '');
        console.log("1500");
        }
    }

    getBase64() {
        return this._currentBase64;
    }

}

customElements.define("select-file-component", SelectFileComponent);