﻿var AppSession = "../Ventas/Cotizacion.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtProveedor').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 1 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2],
                            De1: Number(item.split(',')[9]),
                            De2: Number(item.split(',')[10]),
                            De3: Number(item.split(',')[11]),
                            De4: Number(item.split(',')[16])
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
            $('#MainContent_txtDesc1').val(i.item.De1);
            if (i.item.De1 == 0) $('#MainContent_txtDesc1').attr('readonly', false);
            $('#MainContent_txtDesc2').val(i.item.De2);
            if (i.item.De2 == 0) $('#MainContent_txtDesc2').attr('readonly', false);
            $('#MainContent_txtDesc3').val(i.item.De3);
            if (i.item.De3 == 0) $('#MainContent_txtDesc3').attr('readonly', false);
            $('#MainContent_txtDesc4').val(i.item.De4);
            if (i.item.De4 == 0) $('#MainContent_txtDesc4').attr('readonly', false);
            F_ActualizarClienteDesc();
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 1 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2]
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
            $('#hfCodCtaCteConsulta').val(i.item.val);
        },
        minLength: 3
    });

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('.MesAnioPicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yymm',

        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('yymm', new Date(year, month, 1)));
        }
    });

    $('.MesAnioPicker').datepicker($.datepicker.regional['es']);

    $('.MesAnioPicker').focus(function () {
        $('.ui-datepicker-calendar').hide();
        $('#ui-datepicker-div').position({
            my: 'center top',
            at: 'center bottom',
            of: $(this)
        });
    });

    $('.MesAnioPicker').datepicker('setDate', new Date());

    $('#divTabs').tabs();

    $('#MainContent_txtDesde').datepicker({ onSelect: function () {
        var date = $(this).datepicker('getDate');
        if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
        }
    }
    });

    $('#MainContent_txtDesde').datepicker({ beforeShowDay: function (date) {
        return [date.getDate() == 1, ''];
    }
    });

    F_Controles_Inicializar();

    $('#MainContent_btnBuscarArticulo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            MostrarEspera(true);
            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val == "")
                cadena = cadena + "\n" + "Articulo"

            if ($('#MainContent_ddlMoneda option').size() == 0)
            { cadena = cadena + "\n" + "Moneda"; }
            else {
                if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
            }

            if (cadena != "Ingresar los sgtes. campos :") {
                MostrarEspera(false);
                alertify.log(cadena);
                return false;
            }

            F_Buscar_Productos();
        }
        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregarProducto').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            $('#MainContent_txtArticulo').val('');

            $("#divConsultaArticulo").dialog({
                resizable: false,
                modal: true,
                title: "Consulta de Productos",
                title_html: true,
                height: 500,
                width: 1000,
                autoOpen: false
            });

            $('#divConsultaArticulo').dialog('open');

            $('#MainContent_txtArticulo').focus();


            $('#MainContent_chKConIgv').prop('checked', true);
            $('#MainContent_chkSinIgv').prop('checked', false);

            var objParams = {};
            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);


            F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {
                //                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

                //                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {

                    F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);


                }
                else {
                    alertify.log(result.split('~')[1]);
                }

                return false;

            });


        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            if (F_ValidarAgregar() == false)
                return false;

            F_AgregarTemporal();
            F_LimpiarGrillaConsulta();

            $('#MainContent_txtArticulo').focus();
            return false;
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnEliminar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarEliminar() == false)
                return false;

            if (confirm("Esta seguro de quitar los productos seleccionado"))
                F_EliminarTemporal();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR LA COTIZACION"))
                F_GrabarDocumento();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnNuevo').click(function () {
        try {
            F_Nuevo();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Buscar();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $("#MainContent_txtMonto").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $('#MainContent_txtNumero').blur(function () {
        var id = '0000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 7));
        return false;
    });

    $('#MainContent_txtNumeroConsulta').blur(function () {
        if ($('#MainContent_txtNumeroConsulta').val() == '')
            return false;
        var id = '0000000' + $('#MainContent_txtNumeroConsulta').val();
        $('#MainContent_txtNumeroConsulta').val(id.substr(id.length - 7));
        return false;
    });

    $('#MainContent_txtArticulo').blur(function () {
        try {
            if ($('#MainContent_txtArticulo').val() == '')
                return false

            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val == "" | $('#MainContent_txtArticulo').val().length < 3)
                cadena = cadena + "\n" + "Articulo (Minimo 2 Caracteres)"

            if ($('#MainContent_ddlMoneda option').size() == 0)
            { cadena = cadena + "\n" + "Moneda"; }
            else {
                if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
            }

            if (cadena != "Ingresar los sgtes. campos :") {
                alertify.log(cadena);
                return false;
            }

            F_Buscar_Productos()
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;
    });

    $(document).on("change", "select[id $= 'MainContent_ddlSerie']", function () {
        F_Mostrar_Correlativo($("#MainContent_ddlSerie").val(), 5);
    });

    $('#MainContent_txtCodCotizacion').css('background', '#FFFFE0');

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtAtencion').css('background', '#FFFFE0');

    $('#MainContent_txtReferencia').css('background', '#FFFFE0');

    $('#MainContent_txtVigencia').css('background', '#FFFFE0');

    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtPlaca').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroGuia').css('background', '#FFFFE0');

    $('#MainContent_txtFechaTraslado').css('background', '#FFFFE0');

    $('#MainContent_txtDestino').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $("#MainContent_txtDesc1").css('background', '#FFFFE0');

    $("#MainContent_txtDesc2").css('background', '#FFFFE0');

    $("#MainContent_txtDesc3").css('background', '#FFFFE0');

    $("#MainContent_txtDesc4").css('background', '#FFFFE0');

    $("#MainContent_txtEmpresa").css('background', '#FFFFE0');

    $("#divSeleccionarEmpresa").dialog({
        resizable: false,
        modal: true,
        title: "Empresas",
        title_html: true,
        height: 300,
        width: 420,
        autoOpen: false,
        closeOnEscape: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
    });

    if ($('#MainContent_hdnCodEmpresa').val() == '') {
        $('#divSeleccionarEmpresa').dialog('open');
    }

    F_Derecha();

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

function VerifySessionState(result) { }

function F_Prueba() {

    if ($('#MainContent_chkSinIgv').is(':checked'))
        $('#MainContent_chKConIgv').prop('checked', false);
    else
        $('#MainContent_chKConIgv').prop('checked', true);
    return false;
}

function F_ValidarCheckSinIgv(ControlID) {

    var chkok_grilla = '';

    chkok_grilla = '#' + ControlID;

    if ($(chkok_grilla).is(':checked'))
        $('#MainContent_chkSinIgv').prop('checked', false);
    else
        $('#MainContent_chkSinIgv').prop('checked', true);

    return false;
}

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']", function () {
    F_FormaPago($("#MainContent_ddlFormaPago").val());
});

$(document).on("change", "select[id $= 'MainContent_ddlFormaPagoOC']", function () {
    F_FormaPago($("#MainContent_ddlFormaPagoOC").val());
});

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie: 57
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
                        F_Update_Division_HTML('div_moneda', result.split('~')[3]);
                        F_Update_Division_HTML('div_igv', result.split('~')[6]);
                        $('#MainContent_lblTC').text(result.split('~')[4]);
                        $('#MainContent_txtNumero').val(result.split('~')[5]);
                        F_Update_Division_HTML('div_formapago', result.split('~')[10]);
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');     
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').val(2);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        if ($('#MainContent_txtEmpresa').val() != '')
                            F_ElegirEmpresa2();
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

function F_Buscar_Productos() {
    var arg;
    var CodTipoProducto = '2';
    try {
        var objParams =
        {
            Filtro_DscProducto: $('#MainContent_txtArticulo').val(),
            Filtro_CodTipoProducto: CodTipoProducto,
            Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
            Filtro_Empresa: $('#MainContent_hdnCodEmpresa').val(),
            Filtro_Almacen: $('#MainContent_hdnCodSede').val()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_Buscar_Productos_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                        if (str_mensaje_operacion == 'No se encontraron registros')
                            alertify.log(str_mensaje_operacion);
                        $('#MainContent_chkDescripcion').focus()
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

function F_ValidarCheck(ControlID) {


    var cadena = 'Ingrese los sgtes. campos: '

    var chkOK = '#' + ControlID;
    var txtPrecio = chkOK.replace('chkOK', 'txtPrecio');
    var hdnPrecio = chkOK.replace('chkOK', 'hfPrecioOrig');
    var txtCantidad = chkOK.replace('chkOK', 'txtCantidad');
    var txtDescuento = chkOK.replace('chkOK', 'txtDescuento');
    var lblPrecioSoles = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var lblPrecioDolares = txtDescuento.replace('txtDescuento', 'lblPrecioDolares');

    if ($(chkOK).is(':checked')) {
        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
        $(txtPrecio).prop('disabled', false);
        var i = 0;
        if ($(txtPrecio).val() == "") {
            $(txtPrecio).focus();
            i = 1
        }

        if (i == 0 && $(txtCantidad).val() == "")
        { $(txtPrecio).focus(); }

        var pre = 0;
        var po = 0;
        if ($('#MainContent_ddlMoneda').val() == 1) {
            pre = Number($(lblPrecioSoles).text());
            po = Number($(lblPrecioSoles).text());
        } else {
            pre = Number($(lblPrecioDolares).text());
            po = Number($(lblPrecioDolares).text());
        }

        $(hdnPrecio).val(po);

        if ($("#MainContent_txtDesc1").val() != "") pre = pre * (100 - Number($("#MainContent_txtDesc1").val())) / 100;
        if ($("#MainContent_txtDesc2").val() != "") pre = pre * (100 - Number($("#MainContent_txtDesc2").val())) / 100;
        if ($("#MainContent_txtDesc3").val() != "") pre = pre * (100 - Number($("#MainContent_txtDesc3").val())) / 100;
        if ($("#MainContent_txtDesc4").val() != "") pre = pre * (100 - Number($("#MainContent_txtDesc4").val())) / 100;

        $(txtPrecio).val(pre);

        $(txtDescuento).val(po - pre);
        $(txtDescuento).focus();
    }
    else {
        $(txtCantidad).val('');
        $(txtDescuento).val('');
        $(txtPrecio).val('');
        $(txtCantidad).prop('disabled', true);
        $(txtDescuento).prop('disabled', true);
        $(txtPrecio).prop('disabled', true);
    }


    return true;
}

function F_FormaPago(CodFormaPago) {
    var arg;
    try {
        switch (CodFormaPago) {
            case "1":
            case "12":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 0));

                break;

            case "3":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 30));

                break;

            case "4":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 15));

                break;

            case "8":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 45));

                break;

            case "9":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 60));

                break;

            case "11":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 7));

                break;

            case "13":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 75));

                break;

            case "14":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 90));

                break;
        }


    }
    catch (mierror) {
        alertify.log("Error detectado: " + mierror);
    }

}

function F_ValidarAgregar() {
    try {
        var chkSi = '';
        var chkDel = '';
        var txtcantidad_grilla = '';
        var txtprecio_grilla = '';
        var cadena = "Ingrese los sgtes. campos: ";
        var lblcodproducto_grilla = '';
        var hfcodarticulodetalle_grilla = '';
        var lbldscproducto_grilla = '';
        var x = 0;

        $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
            chkSi = '#' + this.id;
            txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
            txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
            lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');

            if ($(chkSi).is(':checked')) {
                if ($(txtprecio_grilla).val() == '')
                    cadena = cadena + "\n" + "Precio para el Codigo " + $(lblcodproducto_grilla).text();

                if ($(txtcantidad_grilla).val() == '')
                    cadena = cadena + "\n" + "Cantidad para el Codigo " + $(lblcodproducto_grilla).text();

                x = 1;
            }
        });

        if (x == 0)
            cadena = "No ha seleccionado ningun producto";

        if (cadena != "Ingrese los sgtes. campos: ") {

            alertify.log(cadena);
            return false;
        }
        else {
            cadena = "Los sgtes. productos se encuentran agregados : ";
            $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                chkSi = '#' + this.id;
                lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');

                if ($(chkSi).is(':checked')) {
                    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                        chkDel = '#' + this.id;
                        hfcodarticulodetalle_grilla = chkDel.replace('chkEliminar', 'hfcodarticulo');
                        lbldscproducto_grilla = chkDel.replace('chkEliminar', 'lblproducto');

                        if ($(lblcodproducto_grilla).text() == $(hfcodarticulodetalle_grilla).val()) {
                            cadena = cadena + "\n" + $(lbldscproducto_grilla).text();
                        }

                    });
                }
            });
        }

        if (cadena != "Los sgtes. productos se encuentran agregados : ") {

            alertify.log(cadena);
            return false;
        }
        else {
            return true;
        }
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);

    }
}

function F_ActualizarClienteDesc() {
    try {

        var Contenedor = '#MainContent_';

        var xx = $(Contenedor + 'txtDesc1').val();
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var objParams = {
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodVenta: $('#hfCodigoTemporal').val(),
            Filtro_Desc1: parseFloat($(Contenedor + 'txtDesc1').val() == '' ? 0 : $(Contenedor + 'txtDesc1').val()),
            Filtro_Desc2: parseFloat($(Contenedor + 'txtDesc2').val() == '' ? 0 : $(Contenedor + 'txtDesc2').val()),
            Filtro_Desc3: parseFloat($(Contenedor + 'txtDesc3').val() == '' ? 0 : $(Contenedor + 'txtDesc3').val()),
            Filtro_Desc4: parseFloat($(Contenedor + 'txtDesc4').val() == '' ? 0 : $(Contenedor + 'txtDesc4').val()),
            Filtro_TasaIgv: tasaigv
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        F_ActualizarClienteDescTemporal_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;

        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

function F_AgregarTemporal() {

    try {


        var lblcodproducto_grilla = '';
        var lblcodunidadventa_grilla = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtCantidad = '';
        var txtPrecio = '';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla = '';
        var hfcosto_grilla = '';
        var chkNotaPedido = 0;
        var chkServicio = 0;
        var lblProducto = '';
        var hdPrecioOrig = 0;

        if ($('#MainContent_chkServicios').is(':checked'))
            chkServicio = 1;

        if ($('#MainContent_chkNotaPedido').is(':checked'))
            chkNotaPedido = 1;

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
            lblcodunidadventa_grilla = chkSi.replace('chkOK', 'lblcodunidadventa');
            lblcosto_grilla = chkSi.replace('chkOK', 'lblcosto');
            txtPrecio = chkSi.replace('chkOK', 'txtPrecio');
            txtCantidad = chkSi.replace('chkOK', 'txtCantidad');
            hfcodunidadventa_grilla = chkSi.replace('chkOK', 'hfcodunidadventa');
            hfcosto_grilla = chkSi.replace('chkOK', 'hfcosto');
            lblProducto = chkSi.replace('chkOK', 'lblProducto');
            hdPrecioOrig = chkSi.replace('chkOK', 'hfPrecioOrig');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodArticulo: $(lblcodproducto_grilla).text(),
                    Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                    Cantidad: $(txtCantidad).val(),
                    Precio: $(txtPrecio).val() / tasaigv,
                    PrecioDscto: $(txtPrecio).val() / tasaigv,
                    Costo: $(hfcosto_grilla).val(),
                    CodUm: $(hfcodunidadventa_grilla).val(),
                    CodDetalle: 0,
                    Acuenta: 0,
                    CodTipoDoc: 0,
                    PrecioOrig: $(hdPrecioOrig).val() / tasaigv
                };
                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodTipoDoc: "15",
            Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $(Contenedor + 'hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: "0",
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodTraslado: "0",
            Filtro_Descuento: "0",
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_Servicio: chkServicio,
            Filtro_NotaPedido: chkNotaPedido,
            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
            Filtro_Descuento1: parseFloat($(Contenedor + 'txtDesc1').val() == '' ? 0 : $(Contenedor + 'txtDesc1').val()),
            Filtro_Descuento2: parseFloat($(Contenedor + 'txtDesc2').val() == '' ? 0 : $(Contenedor + 'txtDesc2').val()),
            Filtro_Descuento3: parseFloat($(Contenedor + 'txtDesc3').val() == '' ? 0 : $(Contenedor + 'txtDesc3').val()),
            Filtro_Descuento4: parseFloat($(Contenedor + 'txtDesc4').val() == '' ? 0 : $(Contenedor + 'txtDesc4').val()),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_AgregarTemporal_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                alertify.log(result.split('~')[2]);
            }
            numerar();
            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

function F_LimpiarGrillaConsulta() {
    var chkSi = '';
    var txtprecio_grilla = '';
    var txtcantidad_grilla = '';
    var ddlLista_grilla = '';

    $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
        chkSi = '#' + this.id;
        txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
        txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
        ddlLista_grilla = chkSi.replace('chkOK', 'ddlLista');

        $(txtcantidad_grilla).prop('disabled', true);
        $(txtprecio_grilla).val('');
        $(txtcantidad_grilla).val('');
        $(ddlLista_grilla).val('4');

        $(chkSi).prop('checked', false);

    });
}

function F_MostrarTotales() {

    var lblimporte_grilla = '';
    var chkDel = '';
    var Total = 0;
    var Igv = 0;
    var Subtotal = 0;
    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        chkDel = '#' + this.id;
        lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
        Total += parseFloat($(lblimporte_grilla).text());
    });
    var Cuerpo = '#MainContent_'
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtMonto').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgv').val((Total * parseFloat($(Cuerpo + 'ddligv').val())).toFixed(2));
    $(Cuerpo + 'txtSubTotal').val((Total / (1 + parseFloat($(Cuerpo + 'ddligv').val()))).toFixed(2));

}

function F_EliminarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';


        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblcoddetalle');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {

                    CodDetalle: $(lblcoddetalle_grilla).text()
                };

                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_EliminarTemporal_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtMonto').val(result.split('~')[6]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                if (result.split('~')[2] == 'Se han eliminado los productos correctamente.')
                    alertify.log('Se han eliminado los productos correctamente.');
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            numerar();
            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

function F_ValidarEliminar() {

    try {
        var chkSi = '';
        var x = 0;

        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).is(':checked'))
                x = 1;

        });

        if (x == 0) {
            alertify.log("Seleccione un articulo para eliminar");
            return false;
        }
        else
        { return true; }

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_ValidarGrabarDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtCliente').val() == '' && $('#hfCodCtaCte').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Cliente';
            
        if ($(Cuerpo + 'lblTC').text() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtNumero').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero de Proforma';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha de Emision';

        if ($(Cuerpo + 'ddlFormaPago').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Condicion de Pago';

        if ($('#MainContent_ddlVendedorComision').val() == null)
            Cadena = Cadena + '<p></p>' + 'Vendedor';
            
        if ($('#hfCodCtaCte').val() == 0 && $('#hfCodDistrito').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($('#hfCodCtaCte').val() == 0 && $(Cuerpo + 'txtDireccion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';

        if ($(Cuerpo + 'txtTotal').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'No ha ingresado ningun producto';

        if (($('#MainContent_chkMayorista').prop("checked") == false &
                $('#MainContent_chkMinorista').prop("checked") == false &
                $('#MainContent_chkSi').prop("checked") == false
                & $('#MainContent_chkNo').prop("checked") == false
                ) |
                ($('#MainContent_chkMayorista').prop("checked") == true &
                $('#MainContent_chkSi').prop("checked") == false
                & $('#MainContent_chkNo').prop("checked") == false
                )) {
            Cadena = Cadena + '<p></p>' + 'DEBE SELECCIONAR EL TIPO DE PRECIOS, MAYORISTA O MINORISTA, APLICA IGV O NO';
        }

        var chkSi = '';
        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            if (Number($(chkSi.replace("chkEliminar", "txtCantidad")).val()) == 0)
                Cadena = Cadena + '<p></p>' + 'EL CODIGO ' + $(chkSi.replace("chkEliminar", "lblCodigoProducto")).text() + ' TIENE CANTIDAD CERO';

            if (Number($(chkSi.replace("chkEliminar", "txtPrecio")).val()) == 0)
                Cadena = Cadena + '<p></p>' + 'EL CODIGO ' + $(chkSi.replace("chkEliminar", "lblCodigoProducto")).text() + ' TIENE PRECIO CERO';
        });

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }
    catch (e) {
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_GrabarDocumento() {

    try {

        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_Serie: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_Numero: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVigencia').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodEstado: 6,
            Filtro_Vencimiento: $(Contenedor + 'txtEmision').val(),
            Filtro_Observacion: $(Contenedor + 'txtObservacion').val(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_CodTraslado: 0,
            Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
            Filtro_CodDoc: 15,
            Filtro_Referencia: $(Contenedor + 'txtReferencia').val(),
            Filtro_Atencion: $(Contenedor + 'txtAtencion').val(),
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_Descuento1: $(Contenedor + 'txtDesc1').val(),
            Filtro_Descuento2: $(Contenedor + 'txtDesc2').val(),
            Filtro_Descuento3: $(Contenedor + 'txtDesc3').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_GrabarDocumento_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    alertify.log('Se grabo Correctamente');
                    $('#MainContent_txtNumero').val(result.split('~')[3]);

                    if ($('#MainContent_chkImpresion').is(':checked'))
                        F_Imprimir(result.split('~')[2]);
                    else
                        F_VerCotizacion(result.split('~')[2]);

                    F_Nuevo();

                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }

            }
            else {
                alertify.log(result.split('~')[1]);
                return false;
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ModificarDescuentoDocumento(obj) {

    var de = Number($(obj).val());

//    if (de == 0) {
//        alertify.log("Ingresar valor Mayor que 0.");
//        return false;
//    }

    var validar = false;

    $(".precioArt").each(function () {
        if ($(this).val() != "") {
            validar = true;
            return false;
        }
    });

    if (!validar) {
        alertify.log("No existe articulos.");
        return false;
    }

    try {

        var Contenedor = '#MainContent_';

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Desc1: $(Contenedor + 'txtDesc1').val(),
            Filtro_Desc2: $(Contenedor + 'txtDesc2').val(),
            Filtro_Desc3: $(Contenedor + 'txtDesc3').val(),
            Filtro_Desc4: $(Contenedor + 'txtDesc4').val(),
            Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
            Filtro_TasaIgv: tasaigv
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_ActualizarDescTemporal_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    alertify.log(str_mensaje_operacion);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }
            }
            else {
                alertify.log(result.split('~')[1]);
                return false;
            }

            return false;

        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_Nuevo() {

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());
    $('#MainContent_ddlMoneda').val(2);
    $('#hfCodigoTemporal').val('0');
    $('#hfCodCtaCte').val('0');
    $('#MainContent_txtProveedor').val('');
    $('#MainContent_txtSubTotal').val('0.00');
    $('#MainContent_txtIgv').val('0.00');
    $('#MainContent_txtTotal').val('0.00');
    $('#MainContent_txtNumero').val('');
    $('#MainContent_txtArticulo').val('');
    $('#MainContent_txtReferencia').val('');
    $('#MainContent_txtObservacion').val('');
    $('#MainContent_txtAtencion').val('');
    $('#MainContent_txtProveedor').focus();

    $('#MainContent_txtDesc1').val('');
    $('#MainContent_txtDesc2').val('');
    $('#MainContent_txtDesc3').val('');
    $("#MainContent_lblNumRegistros").text("0");

    try {
        var objParams = {
            Filtro_CodSerie: $('#MainContent_ddlSerie').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_Nuevo_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                $('#MainContent_txtNumero').val(result.split('~')[3]);
                //                F_Mostrar_Correlativo(15);
                $('.ccsestilo').css('background', '#FFFFE0');
                if (UnaEmpresa == 0)
                    $('#divSeleccionarEmpresa').dialog('open');
            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });
    }
    catch (e) {

        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_Buscar() {

    try {
        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Sede: $('#MainContent_hdnCodSede').val(),
            Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente

        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Buscar_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                if (str_mensaje_operacion != '')
                    alertify.log(str_mensaje_operacion);

            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function imgMas_Click(Control) {
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        $(Control).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Control).next().html() + '</td></tr>');
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function getContentTab() {
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
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

function F_TipoCambio() {
    try {
        var objParams = {
            Filtro_Emision: $("#MainContent_txtEmision").val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_TipoCambio_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#MainContent_lblTC').text(result.split('~')[2]);
                $('#MainContent_lblTCOC').text(result.split('~')[2]);
            }

            else
                alertify.log(result.split('~')[1]);

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function numerar(){
    var c = 0;
    $('.numero').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblNumRegistros").text(c);
}

function F_Mostrar_Correlativo(CodDoc) {

    var arg;

    try {

        var objParams = {
            Filtro_Sede: $("#MainContent_hdnCodSede").val(),
            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Mostrar_Correlativo_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);

                    if (str_resultado_operacion == "1")
                        $('#MainContent_txtNumero').val(result.split('~')[2]);

                    else
                        alertify.log(str_mensaje_operacion);

                    return false;

                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_Imprimir(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '203';
    var CodEstado = '0';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&';
    rptURL = rptURL + 'CodEstado=' + CodEstado + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ImprimirCotizacion(Fila) {

    var imgID = Fila.id;
    var lblID = '#' + imgID.replace('imgImprimir', 'lblID');

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '203';
    var CodEstado = '0';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblID).text() + '&';
    rptURL = rptURL + 'CodEstado=' + CodEstado + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_VisualizarCotizacion(Fila, CodMenu) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodEstado = '0';
    var imgID = Fila.id;

    if (CodMenu == 3)
        var lblID = '#' + imgID.replace('imgPdf', 'lblID')
    else
        var lblID = '#' + imgID.replace('imgTexto', 'lblID')

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblID).text() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_VerCotizacion(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '15';
    var CodEstado = '0';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ValidarPrecioLista(ControlID) {

    var ddlLista_Grilla = '';
    var lblprecio = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;

    ddlLista_Grilla = '#' + ControlID;
    txtprecio_grilla = ddlLista_Grilla.replace('ddlLista', 'txtPrecioLibre');
    txtcant_grilla = ddlLista_Grilla.replace('ddlLista', 'txtCantidad');

    switch ($(ddlLista_Grilla).val()) {
        case "1":
            lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio1');
            $(txtprecio_grilla).val($(lblprecio).val());
            $(txtprecio_grilla).prop('disabled', true);
            $(txtcant_grilla).focus();
            break;

        case "2":
            lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio2');
            $(txtprecio_grilla).val($(lblprecio).val());
            $(txtprecio_grilla).prop('disabled', true);
            $(txtcant_grilla).focus();
            break;
        case "3":
            lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio3');
            $(txtprecio_grilla).val($(lblprecio).val());
            $(txtprecio_grilla).prop('disabled', true);
            $(txtcant_grilla).focus();
            break;

        case "4":
            $(txtprecio_grilla).val('');
            $(txtprecio_grilla).prop('disabled', false);
            $(txtprecio_grilla).focus();
            break;
    }

    return true;
}

function F_ValidarPrecioGrilla(ControlID) {

    //            var txtprecio_Grilla = '';
    //            var lblprecio_grilla = '';
    //            var txtcant_grilla = '';
    //            var txtprecio_grilla = '';
    //            var boolEstado = false;
    //             chkok_grilla='';

    var txtPrecio = '#' + ControlID;
    //            chkok_grilla = txtPrecio.replace('txtPrecio', 'chkOK');
    //            lblprecio_grilla = txtPrecio.replace('txtPrecio', 'lblPrecio1');
    //            boolEstado = $(chkok_grilla).is(':checked');

    if ($(txtPrecio).val() == '')
        return false;

    //            if ($('#hfCodUsuario').val()!='5' && boolEstado && parseFloat($(txtprecio_Grilla).val())< parseFloat($(lblprecio_grilla).val()))
    //            {alertify.log("Precio por debajo del minimo");
    //            $(txtprecio_Grilla).val('');
    //              return false;
    //             }

    return false;
}

function F_ValidarDescuento(ControlID) {

    var txtDescuento = '#' + ControlID;
    var chkOK = txtDescuento.replace('txtDescuento', 'chkOK');
    var txtPrecio = txtDescuento.replace('txtDescuento', 'txtPrecio');

    if (!$(chkOK).is(':checked'))
        return false;

    if ($(txtDescuento).val() == "") {
        $(txtDescuento).val("");
        return false;
    }

    var hfDescuento = txtDescuento.replace('txtDescuento', 'hfDescuento');
    if (parseFloat($(txtDescuento).val()) > parseFloat($(hfDescuento).val())) {
        alertify.log("Descuento no permitido");
        $(txtDescuento).val("");
        return false;
    }
    var lblPrecioSoles = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var lblPrecioDolares = txtDescuento.replace('txtDescuento', 'lblPrecioDolares');
    var hfCodFamilia = txtDescuento.replace('txtDescuento', 'hfCodFamilia');
    var hfCostoProductoSoles = txtDescuento.replace('txtDescuento', 'hfCostoProductoSoles');
    var hfCostoProductoDolares = txtDescuento.replace('txtDescuento', 'hfCostoProductoDolares');
    var hfMargen = txtDescuento.replace('txtDescuento', 'hfMargen');

    var Descuento = 0;
    var Costo = 0;

    if ($('#MainContent_ddlMoneda').val() == 1)
        Costo = $(hfCostoProductoSoles).val();
    else
        Costo = $(hfCostoProductoDolares).val();

    Descuento = ($(hfMargen).val() - (parseFloat($(txtDescuento).val()) / 100)) + 1;
    Costo = (((Costo * Descuento) * 2).toFixed(0)) / 2;
    $(txtPrecio).val(Costo.toFixed(2));

    return true;
}

function F_ValidarStockGrilla(ControlID) {

    var txtCantidad = '#' + ControlID;
    var chkOK = txtCantidad.replace('txtCantidad', 'chkOK');
    var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
    var txtDescuento = txtCantidad.replace('txtCantidad', 'txtDescuento');

    if ($(txtCantidad).val() == '')
        return false;

    if (F_ValidarAgregar() == false) {
        $(txtCantidad).val('');
        $(txtPrecio).val('');
        $(txtDescuento).val('');
        $(chkOK).prop('checked', false);
        return false;
    }

    F_AgregarTemporal();
    F_LimpiarGrillaConsulta();
    $('#MainContent_txtArticulo').focus();
    return false;

}

function F_ActualizarPrecio(Fila) {
    try {
        var txtPrecio = '#' + Fila;

        var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
        var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
        var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
        var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');

        if (parseFloat($(txtPrecio).val()) == parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarPrecio_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                }

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                alertify.log(result.split('~')[1]);
            }

            return false;
        });

    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }


}

function F_AnularRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblID = '#' + imgID.replace('imgAnularDocumento', 'lblID');
        var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
        var lblNumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
        var lblCliente = '#' + imgID.replace('imgAnularDocumento', 'lblCliente');

        if ($(lblEstado).text() == "ANULADO") {
            alertify.log("Este documento se encuentra anulado");
            return false;
        }

        //            if ($(lblEstado).text() == "CANCELADO") {
        //                alertify.log("Este documento se encuentra cancelado; primero elimine la cobranza y luego anule la factura");
        //                return false;
        //            }

        if (!confirm("Esta seguro de anular la PROFORMA : " + $(lblNumero).text() + "\n" + "Del Cliente : " + $(lblCliente).text()))
            return false;


        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Codigo: $(lblID).text(),
            Filtro_Serie: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: '1',
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_AnularRegistro_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                alertify.log(result.split('~')[1]);
            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;
        });

    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }


}

function F_ActualizarPrecio(Fila) {
    try {
        var txtPrecio = '#' + Fila;
        var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
        var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
        var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
        var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
        var txtDescripcion = txtPrecio.replace('txtPrecio', 'txtDescripcion');
        var lblAcuenta = txtPrecio.replace('txtPrecio', 'lblAcuenta');

        if (parseFloat($(txtPrecio).val()) == parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarPrecio_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                }
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                alertify.log(result.split('~')[1]);
            }
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ActualizarCantidad(Fila) {
    try {
        var txtCantidad = '#' + Fila;
        var lblcoddetalle = txtCantidad.replace('txtCantidad', 'lblcoddetalle');
        var hfPrecio = txtCantidad.replace('txtCantidad', 'hfPrecio');
        var hfCantidad = txtCantidad.replace('txtCantidad', 'hfCantidad');
        var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
        var txtDescripcion = txtCantidad.replace('txtCantidad', 'txtDescripcion');
        var hfCodDetalleOC = txtCantidad.replace('txtCantidad', 'hfCodDetalleOC');
        var lblAcuenta = txtCantidad.replace('txtCantidad', 'lblAcuenta');
        var Flag = 0;

        if ($(hfCodDetalleOC).val() == 0)
            Flag = 1

        if (parseFloat($(txtPrecio).val()) == parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: Flag
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarPrecio_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                }

                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                alertify.log(result.split('~')[1]);
            }
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ActualizarDescripcion(Fila) {
    try {
        var txtDescripcion = '#' + Fila;
        var Clave = "";
        var lblcoddetalle = txtDescripcion.replace('txtDescripcion', 'lblcoddetalle');
        var hfPrecio = txtDescripcion.replace('txtDescripcion', 'hfPrecio');
        var hfCantidad = txtDescripcion.replace('txtDescripcion', 'hfCantidad');
        var txtPrecio = txtDescripcion.replace('txtDescripcion', 'txtPrecio');
        var hfDescripcion = txtDescripcion.replace('txtDescripcion', 'hfDescripcion');
        var txtCantidad = txtDescripcion.replace('txtDescripcion', 'txtCantidad');

        if ($(txtDescripcion).val().trim() == "" || $(txtDescripcion).val() == $(hfDescripcion).val()) {
            $(txtDescripcion).val($(hfDescripcion).val());
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarPrecio_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                }
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                alertify.log(result.split('~')[1]);
            }

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }


}

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);

    var imgID = Fila.id;
    var lblCodDetalle = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');

    var Cuerpo = '#MainContent_';

    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());

    var codEmp = $(lblCodDetalle).val();
    $(Cuerpo + 'hdnCodEmpresa').val(codEmp);

    var codSed = $(ddlSede).val();
    $(Cuerpo + 'hdnCodSede').val(codSed);

    var arg;

    try {
        var objParams =
            {
                Filtro_Empresa: codEmp,
                Filtro_Sede: codSed
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Consulta_Series_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        F_Mostrar_Correlativo(15);
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

    $('#divSeleccionarEmpresa').dialog('close');
}

var UnaEmpresa = 0;
function F_ElegirEmpresa2() {
    UnaEmpresa = 1;
    MostrarEspera(true);
    var Cuerpo = '#MainContent_';
    var arg;
    $(Cuerpo + 'hdnCodSede').val($(Cuerpo + 'hdnCodEmpresa').val());
    try {
        var objParams =
            {
                Filtro_Empresa: $(Cuerpo + 'hdnCodEmpresa').val(),
                Filtro_Sede: $(Cuerpo + 'hdnCodSede').val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Consulta_Series_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        F_Mostrar_Correlativo(15);
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

    $('#divSeleccionarEmpresa').dialog('close');
}

function F_Actualizar_Mayorista_Minorista() {
    try {
        var lblProducto = "";
        var TasaIgvMayorista = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var FlagMayoristaMinorista = 1;

        if ($('#MainContent_chkSi').is(':checked'))
            TasaIgvMayorista = 1;

        if ($('#MainContent_chkMayorista').is(':checked'))
            FlagMayoristaMinorista = 2;

        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TasaIgvMayorista: TasaIgvMayorista,
            Filtro_FlagMayoristaMinorista: FlagMayoristaMinorista,
            Filtro_NotaPedido: 0,
            Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Actualizar_Mayorista_Minorista_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = result.split('~')[0];
            var str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                $('#hfNotaPedido').val(result.split('~')[9]);
                if ($('#hfNotaPedido').val() == '5')
                    $('#hfCodCtaCteNP').val($('#hfCodCtaCte').val());
                else $('#hfCodCtaCteNP').val(0);

                if ($('#MainContent_ddlFormaPago').val() == 1 | $('#MainContent_ddlFormaPago').val() == 6 | $('#MainContent_ddlFormaPago').val() == 15)
                    $('#MainContent_txtAcuenta').val(parseFloat(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val())).toFixed(2));
                else
                    $('#MainContent_txtAcuenta').val('0.00');

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                F_LimpiarGrillaConsulta();
                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
                $('#MainContent_chkDescripcion').focus();

                if ($("#MainContent_chkTransferenciaGratuita").is(':checked')) {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                }
                else
                    F_MostrarTotales();
                return false;
            }
            else {
                alertify.log(result.split('~')[2]);
            }
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

var ValorSINOdefecto = true;
function F_ValidarCheckMayoristaMinorista(ControlID) {

    if (ControlID == 'MainContent_chkMayorista') {
        if ($('#MainContent_chkMayorista').prop('checked') == true) {

            $('#MainContent_chkMinorista').prop('checked', false);

            $('#MainContent_chkSi').prop("disabled", false);
            $('#MainContent_chkNo').prop("disabled", false);
            if (ValorSINOdefecto == true) {
                $('#MainContent_chkSi').prop("checked", false);
                $('#MainContent_chkNo').prop("checked", false);
            } else {
                $('#MainContent_chkSi').prop("checked", false);
                $('#MainContent_chkNo').prop("checked", false);
            }
        }
        else {
            if ($('#MainContent_chkNo').is(':checked'))
                F_AplicarIgv(true);

            $('#MainContent_chkMayorista').prop('checked', false);

            $('#MainContent_chkSi').prop("checked", false);
            $('#MainContent_chkNo').prop("checked", false);
            $('#MainContent_chkSi').prop("disabled", true);
            $('#MainContent_chkNo').prop("disabled", true);
            ValorSINOdefecto = true;

        } 
    }
    else {
        if ($('#MainContent_chkMinorista').prop('checked') == true) {
            if ($('#MainContent_chkNo').is(':checked'))
                F_AplicarIgv(true);

            $('#MainContent_chkMinorista').prop('checked', true);
            $('#MainContent_chkMayorista').prop('checked', false);

            $('#MainContent_chkSi').prop("checked", false);
            $('#MainContent_chkNo').prop("checked", false);
            $('#MainContent_chkSi').prop("disabled", true);
            $('#MainContent_chkNo').prop("disabled", true);
            ValorSINOdefecto = true;
        }
        else {

            // $('#MainContent_chkMayorista').prop('checked', true);    

            $('#MainContent_chkSi').prop("disabled", false);
            $('#MainContent_chkNo').prop("disabled", false);
            if (ValorSINOdefecto == true) {
                $('#MainContent_chkSi').prop("checked", false);
                $('#MainContent_chkNo').prop("checked", false);
            } else {
                $('#MainContent_chkSi').prop("checked", false);
                $('#MainContent_chkNo').prop("checked", false);
            }
        } 
    }
    if ($('#hfCodigoTemporal').val() != '0' & $('#MainContent_chkMinorista').prop('checked'))
        F_Actualizar_Mayorista_Minorista();
    return true;
}

function F_ValidarCheckMayoristaSINO(ControlID) {
    if (ControlID == 'MainContent_chkSi') {
        if ($('#MainContent_chkSi').prop('checked') == true) {
            $('#MainContent_chkSi').prop('checked', true);
            $('#MainContent_chkNo').prop('checked', false);
            //ValorSINOdefecto = true;
        }
        else {
            $('#MainContent_chkSi').prop('checked', false);
            $('#MainContent_chkNo').prop('checked', true);
            //ValorSINOdefecto = false;
        } 
    }
    else {
        if ($('#MainContent_chkNo').prop('checked') == true) {
            $('#MainContent_chkNo').prop('checked', true);
            $('#MainContent_chkSi').prop('checked', false);
            //ValorSINOdefecto = false;
        }
        else {
            $('#MainContent_chkNo').prop('checked', false);
            $('#MainContent_chkSi').prop('checked', true);
            //ValorSINOdefecto = true;   
        } 
    }

    var Aplicar = true;
    if ($('#MainContent_chkNo').is(':checked'))
        Aplicar = false;

    F_AplicarIgv(Aplicar);
    if ($('#hfCodigoTemporal').val() != '0')
        F_Actualizar_Mayorista_Minorista();
    return true;
}

function F_AplicarIgv(Aplicar) {
    var chkDel = 'MainContent_grvDetalleArticulo_chkEliminar_0';
    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        chkDel = '#' + this.id;
        var hfcodtipoproducto_grilla = chkDel.replace('chkEliminar', 'hfFlagIncluyeIgv');
        var Precio = chkDel.replace('chkEliminar', 'txtPrecio');
        var pre = 0;
        if ($(hfcodtipoproducto_grilla).val() == '1') {
            if (Aplicar == true) {
                pre = $(Precio).val();
                pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
                pre = (((pre) * 1).toFixed(1)) / 1;
                $(Precio).val(pre);
                F_ActualizarCantidad(Precio.replace('#', ''));
            }
            else {
                pre = $(Precio).val();
                pre = pre / (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
                pre = (((pre) * 1).toFixed(1)) / 1;
                $(Precio).val(pre);
                F_ActualizarCantidad(Precio.replace('#', ''));
            }
        }
    });
    return true;
}

function imgMasObservacion_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Observacion(grid.attr('id'));
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_Observacion(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'hfCodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleObservacion_' + Col;
        Hfgv = '#' + Fila.replace('pnlOrdersObservacion', 'hfDetalleCargadoObservacion');

        if ($(Hfgv).val() === "1") {
            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
        }
        else {
            {
                var objParams =
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_grvNombre: grvNombre
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Observacion_NET(arg, function (result) {

                    MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                        $(Hfgv).val('1');
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                    return false;
                });
            }
        }
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }
    return true;
}