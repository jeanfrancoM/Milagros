﻿$(document).ready(function () {
    if (!F_SesionRedireccionar('')) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtCliente').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 2 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2],
                            DireccionEnvio: item.split(',')[3],
                            Distrito: item.split(',')[4],
                            CodDepartamento: item.split(',')[5],
                            CodProvincia: item.split(',')[6],
                            CodDistrito: item.split(',')[7],
                            NroRuc: item.split(',')[8]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodCtaCte').val(i.item.val);
        },
        minLength: 3
    });

    $('#MainContent_btnBuscar').click(function () {
        try {
            F_Buscar()
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_chkVencidas').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkDeudas').prop("checked", false);
            $('#MainContent_chkTodas').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }

    });

    $('#MainContent_chkDeudas').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkVencidas').prop("checked", false);
            $('#MainContent_chkTodas').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $('#MainContent_chkTodas').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkVencidas').prop("checked", false);
            $('#MainContent_chkDeudas').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    F_Controles_Inicializar();
});

$().ready(function () {

    $(document).everyTime(900000, function () {

        $.ajax({
            type: "POST",
            url: '../Ventas/RegistroFactura.aspx/KeepActiveSession',
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: VerifySessionState,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alertify.log(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });

    });

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

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

$(document).on("change", "select[id $= 'MainContent_ddlRuta']", function () {
    F_Vendedor($("#MainContent_ddlRuta").val());
});

function VerifySessionState(result) { }

function F_Buscar() {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var CodMenu = 10;
    var Desde = $("#MainContent_txtDesde").val();
    var Hasta = $('#MainContent_txtHasta').val();

    if (!$('#MainContent_chkFecha').is(':checked')) {
        Desde = '01/01/1990';
        Hasta = '01/01/1990';
    }

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'CodEmpresa=' + $("#MainContent_ddlEmpresa").val() + '&';
    rptURL = rptURL + 'CodCtaCte=' + $('#hfCodCtaCte').val() + '&';
    rptURL = rptURL + 'Desde=' + Desde + '&';
    rptURL = rptURL + 'Hasta=' + Hasta + '&';
    rptURL = rptURL + 'Empresa=' + $("#MainContent_ddlEmpresa option:selected").text() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_CodRuta: 0
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Empresa', result.split('~')[2]);
                        F_Update_Division_HTML('div_Ruta', result.split('~')[3]);
                        F_Update_Division_HTML('div_Vendedor', result.split('~')[4]);
                        $('#MainContent_ddlEmpresa').val(0);
                        $('#MainContent_ddlRuta').val(0);
                        $('#MainContent_ddlVendedor').val(0);
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlRuta').css('background', '#FFFFE0');
                        $("#MainContent_chkGuia").prop("checked", true);
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                }
            );
    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);
    }
}

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