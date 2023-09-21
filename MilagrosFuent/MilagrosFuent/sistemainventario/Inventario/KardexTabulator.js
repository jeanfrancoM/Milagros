var AppSession = "../Inventario/KardexTabulator.aspx";
var CodigoMenu =2000; /// EXCLUSIVIDAD DE LA PAGINA
var CodigoInterno = 2; /// EXCLUSIVIDAD DE LA PAGINA
$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
   

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }
    F_Buscar();
    
   
        
});

$().ready(function () {

    $(document).everyTime(900000, function () {
        if (!F_ValidaSesionActiva(AppSession)) return false;
    });

});

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL'))
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});




 function F_Buscar()
 {


 var columns=[ //Define Table Columns
	 	{title:"Nombre", field:"name", width:150},
	 	{title:"Edad", field:"age", hozAlign:"left", formatter:"progress"},
	 	{title:"Color Favorito", field:"color"},
	 	{title:"Cumpleaños", field:"dob", sorter:"date", hozAlign:"center"},
        {title:"Salario", field:"salario", hozAlign:"right",formatter:"money", formatterParams:{
    decimal:",",
    thousand:".",
    symbol:"S./",
    symbolAfter:"p",
    negativeSign:true,
    precision:false,
}},

 	        ]

 //datade ejemplo
 var tabledata = [
 	{ id: 1, name: "Oli Bob", age: "12", color: "red", dob: "", salario: 15469456165.45 },
 	{ id: 2, name: "Mary May", age: "1", color: "blue", dob: "14/05/1982" , salario: 15469456165.45},
 	{ id: 3, name: "Christine Lobowski", age: "42", color: "green", dob: "22/05/1982", salario: 15469456165.45 },
 	{ id: 4, name: "Brendon Philips", age: "125", color: "orange", dob: "01/08/1980" , salario: 15469456165.45},
 	{ id: 5, name: "Margret Marmajuke", age: "16", color: "yellow", dob: "31/01/1999" , salario: 15469456165.45},
 ]



 //create Tabulator on DOM element with id "example-table"
var table = new Tabulator("#div_tabulatorContainer1", {
 	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	data:tabledata, //assign data to table
 	layout:"fitColumns", //fit columns to width of table (optional)
 	columns:columns,
 	
});

        
        return ;
       
    }

 function F_Buscar2() {
   
 try {
        var objParams = {
            Desde: $('#MainContent_txtDesde').val(),
            Hasta: $('#MainContent_txtHasta').val(),
            CodProducto: $('#hfCodCtaCte').val(),
            CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            CodAlmacenFisico: $('#MainContent_ddlAlmacenFisico').val(),
            Ordenamiento: $('#MainContent_ddlOrdenamiento').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        $("#div_tabulatorContainer1").empty();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '../Servicios/F_Movimientos_Kardex_List_Tabulador',
            data: arg,
            dataType: "json",
            async: true,
            success: function (dbObject) {
                var data = dbObject.d;

                var tabledata = [
                    { id: 1, name: "Oli Bob", age: "12", color: "red", dob: "", salario: 15469456165.45 },
                     { id: 2, name: "Oli Bob", age: "12", color: "red", dob: "", salario: 15469456165.45 },
                      { id: 3, name: "Oli Bob", age: "12", color: "red", dob: "", salario: 15469456165.45 },
                       { id: 4, name: "Oli Bob", age: "12", color: "red", dob: "", salario: 15469456165.45 },
                   
                ];

                var table = new Tabulator("#div_tabulatorContainer1", {
                    height: "400px",
                    data: tabledata,
                    layout: "fitColumns",
                    columns: [
                        { title: "Nombre", field: "name" },
                        { title: "Edad", field: "age" },
                        { title: "Color", field: "color" },
                        { title: "Fecha de Nacimiento", field: "dob" },
                        { title: "Salario", field: "salario" }
                    ],
                    tabulatorTitle: "Situacion del Banco"
                });
            },
            complete: function () {
                MostrarEspera(false);
            },
            error: function (response) {
                console.log("error response", response.responseText);
                alertify.log(response.responseText);
                MostrarEspera(false);
            },
            failure: function (response) {
                console.log("failure response", response.responseText);
                alertify.log(response.responseText);
                MostrarEspera(false);
            }
        });
    } catch (e) {
        MostrarEspera(false);
        toastr.error("Error Detectado: " + e);
        return false;
    }
}