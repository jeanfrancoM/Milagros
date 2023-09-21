var AppSession = "../Reportes/Inventario_MovimientoProducto_Alvarado.aspx";

var CodigoMenu = 10000;
var CodigoInterno = 100004;

var ddlFamilia;
var ddlLinea;
var ddlMarca; 
var ddlMoneda;
var ddlAlmacen;
var ddlTipoReporte;


var P_RPT_UNIDADES_FILTRO_FAMILIA;
var P_RPT_UNIDADES_FILTRO_MARCAS;
var P_RPT_UNIDADES_FILTRO_PROCEDENCIA;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);

    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('#MainContent_btnReportePorFamilia').click(function () {
        try {
            F_Reporte(1);

            return false;
        }

        catch (e) {

            alert("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnReporteGeneral').click(function () {
        try {
            F_Reporte(2);

            return false;
        }

        catch (e) {

            alert("Error Detectado: " + e);
        }

    });
    $('.MesAnioPicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.MesAnioPicker').datepicker($.datepicker.regional['es']);

    $('.MesAnioPicker').datepicker('setDate', new Date());
        
    F_Inicializar_Parametros();
    
    if (P_RPT_UNIDADES_FILTRO_FAMILIA != '1')
        $('#trFamilia').css('display', 'none');

    if (P_RPT_UNIDADES_FILTRO_MARCAS != '1')
        $('#trMarca').css('display', 'none');

    if (P_RPT_UNIDADES_FILTRO_PROCEDENCIA != '1')
        $('#trProcedencia').css('display', 'none');
        
    F_Controles_Inicializar();

    $('#MainContent_txtDescripcion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + 1 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Stock: item.split(',')[2],
                            Costo: item.split(',')[3],
                            Moneda: item.split(',')[4],
                            CodProducto: item.split(',')[5],
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfcodproducto').val(i.item.CodProducto);

        },
        minLength: 3
    });

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_ddlMoneda').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

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

function MostrarEspera(pboolMostrar) {
    if (pboolMostrar) {
        $('#dlgWait').dialog({
            autoOpen: false,
            modal: true,
            height: 'auto',
            resizable: false,
            dialogClass: 'alert'
        });

        $('.alert div.ui-dialog-titlebar').hide();
        //        $('.ui-button').remove();
        $('#dlgWait').dialog('open');
    }
    else {
        $('#dlgWait').dialog('close');
    }
}

function F_Inicializar_Parametros() {
    P_CodMoneda = "1";
    P_RPT_UNIDADES_FILTRO_FAMILIA  = '1';
    P_RPT_UNIDADES_FILTRO_MARCAS  = '1';
    P_RPT_UNIDADES_FILTRO_PROCEDENCIA  = '1';

    var Parametros = F_ParametrosPagina('', CodigoMenu, CodigoInterno);
    $.each(Parametros, function (index, item) {

        switch (item.Parametro) {
            case "P_CODMONEDA":
                P_CodMoneda = item.Valor;
                break;
            case "P_RPT_UNIDADES_FILTRO_FAMILIA":
                P_RPT_UNIDADES_FILTRO_FAMILIA = item.Valor;
                break;
            case "P_RPT_UNIDADES_FILTRO_MARCAS":
                P_RPT_UNIDADES_FILTRO_MARCAS = item.Valor;
                break;
            case "P_RPT_UNIDADES_FILTRO_PROCEDENCIA":
                P_RPT_UNIDADES_FILTRO_PROCEDENCIA = item.Valor;
                break;
        };

    });

    return true;
}

function F_Controles_Inicializar() {
        $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Venta_UtilidadBruta.aspx/F_Familias_Listar_NET',
        data: "{'pTodos':'0'}",
        dataType: "json",
        async: false,
        success: function (json) {

                let data = []
                var d = json.d;
                for (let i = 0; i < d.length; i++) {
                data.push({
                text: d[i].DscFamilia,
                value: d[i].IdFamilia
                    
                    })
                };

                ddlFamilia = new SlimSelect({
                  select: '#ddlFamilia',
                  placeholder: 'TODAS LAS FAMILIAS POR DEFECTO',
                  searchingText: 'Buscando...', // Optional - Will show during ajax request
                  searchText: 'NO SE ENCONTRARON FAMILIAS',
                  searchPlaceholder: 'BUSQUEDA DE FAMILIAS',
                  searchFocus: true, // Whether or not to focus on the search input field
                  closeOnSelect: false,
                  data: data
                });

                },
                error: function (response) {
                    alertify.log(response.responseText);
                    callback(false);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                    callback(false);
                }
            });


        $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Venta_UtilidadBruta.aspx/F_Almacenes_Listar_NET',
        data: "{'pTodos':'1'}",
        dataType: "json",
        async: false,
        success: function (json) {

                let data = []
                var d = json.d;
                for (let i = 0; i < d.length; i++) {
                data.push({
                text: d[i].DscAlmacen,
                value: d[i].CodAlmacen
                    
                    })
                };

                ddlAlmacen = new SlimSelect({
                  select: '#ddlAlmacen',
                  //placeholder: 'TODAS LAS FAMILIAS POR DEFECTO',
                  searchingText: 'Buscando...', // Optional - Will show during ajax request
                  searchText: 'NO SE ENCONTRARON ALMACENES',
                  searchPlaceholder: 'BUSQUEDA DE ALMACENES',
                  searchFocus: true, // Whether or not to focus on the search input field
                  closeOnSelect: true,
                  data: data
                });

                },
                error: function (response) {
                    alertify.log(response.responseText);
                    callback(false);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                    callback(false);
                }
            });




}

function F_Reporte(TipoReporte) {

    var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';
    var falt = 0;

    if ($(Cuerpo + 'txtDesde').val() == '') {
        falt++;
        Cadena = Cadena + '<p></p>' + 'Desde';
    }

    if ($(Cuerpo + 'txtHasta').val() == '') {
        falt++;
        Cadena = Cadena + '<p></p>' + 'Hasta';
    }

    if (falt != 0) {
        alert(Cadena);
        return false;
    }


    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '712';
    var NombreTabla = "CajaChicaDetalle";
     var Mensaje = 'TODOS LAS CIFRAS ESTAN EXPRESADAS EN SOLES Y SIN INCLUIR IGV';
    var NombreArchivo = "Web_Reporte_Utilidad_Bruta.rpt";
    var Titulo = 'Reporte Utilidad Bruta';

//    if (TipoReporte == 2)
//        var CodMenu = '12';    

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Desde=' + $('#MainContent_txtDesde').val() + '&';
    rptURL = rptURL + 'Hasta=' + $('#MainContent_txtHasta').val() + '&';
    rptURL = rptURL + 'Titulo=' + Titulo+ '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Mensaje=' + Mensaje + '&';
    rptURL = rptURL + 'CodAlmacen=' + ddlAlmacen.selected()[0]+ '&';
    rptURL = rptURL + 'CodProducto=' + $('#hfcodproducto').val() + '&';
//    rptURL = rptURL + 'CodEmpresa=' + 3 + '&';

    
    alertify.log('Este reporte puede tardar varios minutos, por favor espere');
    window.open(rptURL, "PopUpRpt", Params);
     $('#hfCodCtaCte').val('0');
    return false;
}
