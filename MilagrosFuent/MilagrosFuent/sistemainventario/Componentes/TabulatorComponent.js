




class TabulatorComponent extends HTMLElement {

    _tabulator = null;
    _columns = null;
    _data = null;
    _lColumns = null;
    _searchAmount = false;


  constructor( { divContainer, data, columns, tabulatorTitle, showRowCount, rowsCountTitle, selectable, rowMenu, maxHeight, search, searchInAllSources, downloadMethods, pdfDownloadProps, onInitLoadData, onFinishLoadData, onFinishRender, pagination, groupBy, showDataTree, showTopBar = true }) {
    super();

    //REGULACION/NORMALIZACION DE PARAMETROS
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    showRowCount = (showRowCount != null && showRowCount != undefined) ? showRowCount : false; 
    selectable = (selectable != null && selectable != undefined) ? selectable : false; 
    //si busca por todos los campos de la tabla, tanto visibles como ocultos
    searchInAllSources = (searchInAllSources != null && searchInAllSources != undefined) ? searchInAllSources : false; 
    downloadMethods = (downloadMethods != null && downloadMethods != undefined) ? downloadMethods : false; 
    pdfDownloadProps = (pdfDownloadProps != null && pdfDownloadProps != undefined) ? pdfDownloadProps : { name: "data.pdf", orientation: "l", title: "Data", unit: "pt", format: [1600, 1210], compress: true, margin: [40, 40, 40, 40] }; 
    pagination = (pagination != null && pagination != undefined) ? pagination : false; 
    showDataTree = (showDataTree != null && showDataTree != undefined) ? showDataTree : false; 
    
    

    //ASIGNACION DE PROPIEDADES
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    const _this = this
    this._columns = columns;
    this._data = data;


    //CONSTRUCCION DE COLUMNS PARA BUSQUEDA
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    this._lColumns = [];
    this._columns.forEach(col => {
        if (col["field"] != undefined) {
            this._lColumns.push(col["field"])
        } else if (col["columns"] != undefined) {
            col["columns"].forEach(subcol => {
                this._lColumns.push( subcol["field"])
            });   
        }
    });

    if (searchInAllSources == true) {
        if (Object.values(data).length > 0) { 
            const firstData = Object.keys(Object.values(data)[0]).forEach(col => { 
                const existe = this._lColumns.find(x => x == col);
                if (existe == undefined) this._lColumns.push(col);
            });
        }
    }


    //LIMPIEZA CONTAINER PRINCIPAL
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    $("#" + divContainer).empty();


    //NOMBRE DE DIVS DE TRABAJO
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    const div_TopBar_Name = divContainer + "_TopBar"; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR

    //ROW1 CONTENEDOR DEL TITULO Y BARRA DE DESCARGA Y SEARCH
    const div_row_1_Name = divContainer + "_TopBar_row1"; //CONTENEDOR ROW1 -- AQUI VA EL TITULO Y LA BARRA SEARCH
    const div_row_1_div1_Name = divContainer + "_TopBar_row1_div1"; //AQUI VA EL TITULO
    const div_row_1_div2_Name = divContainer + "_TopBar_row1_div2"; //AQUI VA EL CONTENEDOR DEL SEARCH
    const div_row_1_div2_Search_Name = divContainer + "_TopBar_row1_div2_search"; //AQUI VA EL CONTENEDOR DEL SEARCH
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //::     ROW1-DIV1: TITULO                        ::::    ROW1-DIV2: SEARCH  => ROW1-DIV2-SEARCH    ::
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //::                                          CANTIDAD DE ROWS                                      ::
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //ROW2 CANTIDAD DE REGISTROS
    const div_row_2_Name = divContainer + "_TopBar_row2"; //CONTENEDOR ROW2 -- CANTIDAD DE REGISTROS
    

    //CONSTRUCCION DE LA BARRA SUPERIOR (TOPBAR)
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    var div_TopBar_HTML = '' +
    '            <div id="' + div_TopBar_Name + '> ' +
    '                <div id="' + div_row_1_Name + '" class="row" > ' +
    '                    <div id="' + div_row_1_div1_Name + '" class="col s12 m6 l8 no-spaces tabulatorTitleContainer" style="padding-top:0rem;"> ' +
    '                    </div> ' +
    '                    <div id="' + div_row_1_div2_Name +'" class="col s12 m6 l4 content-right no-spaces" style="height: 30px; padding-top: 0px"> ' +
    '                        <div  id="' + div_row_1_div2_Search_Name + '" class="content-right" style="width: 340px; padding-top:0px"> ' +
    '                        </div> ' +
    '                    </div> ' +
    '                </div> ' +
    '                <div id="' + div_row_2_Name + '" class="col s12 m12 l12 content-center no-spaces" style="height: 20px; margin-top: 0px; padding-top: 0px; "> ' +
    '                   <div><span class="tabulator-cantidadregistros" ><img src="../Asset/images/loading.gif" alt="Cargando..." width="18" height="18"> Cargando...</span></div> ' +
    '                </div> ' +
    '            </div> ';

    //../Asset/images/loading.gif
    if (showTopBar == true)
    $("#" + divContainer).append(div_TopBar_HTML);
/// <reference path="../Asset/images/ajax-loader2.gif" />


    //ROW1 DIV1 - TITULO DEL TABULATOR
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    let _tabulatorTitle = "";
    if (tabulatorTitle != null && tabulatorTitle != undefined) {
        if (tabulatorTitle.trim() != "") {
            _tabulatorTitle = tabulatorTitle.trim();
        } else {
            _tabulatorTitle = "&nbsp;";
        }
    } else {
        _tabulatorTitle = "&nbsp;";
    }

    $("#" + div_row_1_div1_Name).append('<span class="tabulatorTitle" style="font-weight: bold; color: #0860a3" >' + _tabulatorTitle + '</span>');


    //ROW1 DIV2 - BARRA DE EXPORTACION
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    if (downloadMethods == true) {

        //BOTON EXPORTA A EXCEL
        const btnExportXLSName =  divContainer + "_BtnExportExcel";
        const btnExportXLSElement = '<button id="' + btnExportXLSName + '" style="height: 30px; border: 1px solid #d9d7d7; border-radius: 5px; margin-left: 0.5rem; cursor: pointer;" title="Descargar Excel"><img src="../Asset/images/excelIconX16.jpg" width="16px"/></button>'
        $("#" + div_row_1_div2_Search_Name).append(btnExportXLSElement);
        $("#"+btnExportXLSName).click(function(event){
            event.preventDefault();
            _this._tabulator.download("xlsx", "data.xlsx", {sheetName:"Data"});
            return true;
        });

        //BOTON EXPORTAR A PDF
        const btnExportPDFName =  divContainer + "_BtnExportPDF";
        const btnExportPDFElement = '<button id="' + btnExportPDFName + '" style="height: 30px; border: 1px solid #d9d7d7; border-radius: 5px; margin-left: 0.5rem; cursor: pointer;" title="Descargar PDF"><img src="../Asset/images/pdf.png" width="16px"/></button>';
        $("#" + div_row_1_div2_Search_Name).append(btnExportPDFElement);
        $("#"+btnExportPDFName).click(function(event){
            event.preventDefault();

            var dtx = new Date();
            var date = ", Fecha Impresion: " + dtx.getDate() + "/" + dtx.getMonth() + "/" + dtx.getFullYear() + " " + dtx.getHours() + ":" + dtx.getMinutes() + ":" + dtx.getSeconds();
            var titleParams = pdfDownloadProps["title"] == undefined ? "Data" : pdfDownloadProps["title"]
            var titlePDF = titleParams + date

            _this._tabulator.download("pdf", pdfDownloadProps["name"], {
                orientation: pdfDownloadProps["orientation"], //set page orientation to portrait
                title: titlePDF, //add title to report
                 jsPDF:{
                    unit: pdfDownloadProps["unit"],
                    format: pdfDownloadProps["format"],
                    compress: pdfDownloadProps["compress"],
                    margin: pdfDownloadProps["margin"]
                },

            });
            return true;
        });
    }


    //ROW1 DIV2 - BARRA DE SEARCH
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    if (search != null && search != undefined && search == true) {
        //crea el componente input de busqueda
        this._searchAmount = true;
        const inputSearchName = divContainer + "_Input";
        const elementSearch = '<input id="' + inputSearchName + '" type="text" placeholder="Filtrar datos" style="border: solid 1px #A6C9E2; padding: 3px 1px; border: none; border-bottom: 1px solid #478ec1; margin-bottom: 0.5rem; margin-left: 1rem; width: 15rem; background: unset; font-size: 0.85rem; ">'
        $("#" + div_row_1_div2_Search_Name).append(elementSearch);

        //agrega la funcion
        $("#" + inputSearchName).keydown(function (e) {
        
            const value = e.target.value;
            const c = e.which ? e.which : e.keyCode;


            //buscar
            if (c == 13) {

                //limpiar
                if (value.trim() == "") {
                    _this._tabulator.clearFilter();            
                    //CANTIDAD REGISTROS NORMAL
                    $("#" + div_row_2_Name).empty();
                    if (showRowCount == true) {
                        let cantidadRows = 0        
                        let _RowsCountTitle = "Cant. de Registros: "
                        try { cantidadRows = data.length; formatNumber(cantidadRows); } catch (e) { }
                        try { if (rowsCountTitle != null && rowsCountTitle != undefined) _RowsCountTitle = rowsCountTitle; } catch (e) { }
                        $("#" + div_row_2_Name).append('<span class="tabulator-cantidadregistros" style="color: #6694b7">' + _RowsCountTitle + formatNumber(cantidadRows).toString() + '</span>');
                    } else {
                        $("#" + div_row_2_Name).attr("style", "display:none");
                    }
                    return;
                }

                if (value.trim() != "") {
                    let lFilter = [];
                    _this._lColumns.forEach(col => {
                        lFilter.push( { field: col, type: "like", value: value } )
                    });   
                    _this._tabulator.clearFilter();
                    let finalFilter = []
                    finalFilter.push(lFilter)
                    _this._tabulator.setFilter(finalFilter);

                    //CANTIDAD REGISTROS NORMAL
                    $("#" + div_row_2_Name).empty();
                    if (showRowCount == true) {
                        let cantidadRows = 0;
                        let _RowsCountTitle = "Cant. de Registros: ";
                        let displayRowsFinal = "";
                        try { cantidadRows = data.length; formatNumber(cantidadRows); } catch (e) { }
                        try { if (rowsCountTitle != null && rowsCountTitle != undefined) _RowsCountTitle = rowsCountTitle; 
                        

                        displayRowsFinal = _RowsCountTitle + formatNumber(cantidadRows).toString();
                        var datosFiltrados = _this._tabulator.getData('active').length
                        var filtrados = formatNumber(datosFiltrados).toString();

                        if (datosFiltrados < data.length) {
                           displayRowsFinal = displayRowsFinal  + "     -     (filtrados: " + filtrados + ")";
                        }

                        } catch (e) { }
                        $("#" + div_row_2_Name).append('<span class="tabulator-cantidadregistros" style="color: #6694b7">' + displayRowsFinal + '</span>');
                    } else {
                        $("#" + div_row_2_Name).attr("style", "display:none");
                    }
                    return false;    //<---- Add this line
                }
            }

            return;
        });
    }
    

    //APPEND LOADING CARGANDO...
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    $("#" + div_row_2_Name).empty();
    if (showRowCount == true) {
        $("#" + div_row_2_Name).append('<div><span class="tabulator-cantidadregistros"><img src="../Asset/images/loading.gif" alt="Cargando..." width="8" height="8"> Cargando...</span></div>');
    }

    //BUID TABULATOR
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    const divTabulatorName = divContainer + "_Tabulator"
    $("#" + divContainer).append('<div id="' + divTabulatorName + '" class="tabulator-custom" ></div>');
    if (maxHeight != null && maxHeight != undefined) $("#" + divTabulatorName).css('max-height', maxHeight.toString() + "px" );


    var tabulatorProps = {
        layout:"fitColumns",
        columns: columns,
        data: [],
        renderVerticalBuffer:maxHeight, //set virtual DOM buffer to 300px
        renderHorizontal:"virtual",
        columnDefaults: {
            tooltip: true,         //show tool tips on cells
        },
        tooltipsHeader: true,
        selectable: selectable,
        rowContextMenu: rowMenu,
        groupBy: groupBy,
        groupHeader:function(value, count, data, group){
            //value - the value all members of this group share
            //count - the number of rows in this group
            //data - an array of all the row data objects in this group
            //group - the group component for the group
            return "<span style='font-size:0.75rem; color:#0030db;'>" + value + "</span><span style='font-size:0.75rem; color:#0030db; margin-left:20px;'>(" + count + " item)</span>";
        },
        groupToggleElement:"header",
    };

    if (pagination == true) {
        tabulatorProps["pagination"] = "local";       //paginate the data
        var rowsPerPage = Math.floor(((maxHeight - 115) / 20) + 0.13) ;
        tabulatorProps["paginationSize"] = rowsPerPage;    //allow 7 rows per page of data
        tabulatorProps["paginationCounter"] = "rows"; //display count of paginated rows in footer   
    }

    if (showDataTree == true) {
        tabulatorProps["dataTree"] = true;
        tabulatorProps["dataTreeStartExpanded"] = true;
    } 

    this._tabulator = new Tabulator("#" + divTabulatorName, tabulatorProps);

    this._tabulator.on("dataProcessed", function(){
        onFinishLoadData();
    });

    this._tabulator.on("dataLoading", function(data){
        onInitLoadData();
    });

    this._tabulator.on("dataLoaded", function(data){
    });

    this._tabulator.on("renderStarted", function(){
        onInitLoadData();
    });

    this._tabulator.on("renderComplete", function(){
        
    });


    //subscribe to event
    setTimeout(() => {  
        this._tabulator.setData(data).then(function(){

            //ROW2 - MOSTRAR CANTIDAD DE ROWS DE LA DATA
            //-----------------------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------------------
            $("#" + div_row_2_Name).empty();
            if (showRowCount == true) {
                let cantidadRows = 0        
                let _RowsCountTitle = "Cant. de Registros: "
                try { cantidadRows = data.length; formatNumber(cantidadRows); } catch (e) { }
                try { if (rowsCountTitle != null && rowsCountTitle != undefined) _RowsCountTitle = rowsCountTitle; } catch (e) { }
                $("#" + div_row_2_Name).append('<span class="tabulator-cantidadregistros" style="color: #6694b7">' + _RowsCountTitle + formatNumber(cantidadRows).toString() + '</span>');
            } else {
                $("#" + div_row_2_Name).attr("style", "display:none");
            }

            onFinishRender();
            return;
        });
    }, 100);
  }


  updateData(newData) {
    _tabulator.updateData(newData)
    return true;
  }

}

customElements.define("mi-app-element", TabulatorComponent);