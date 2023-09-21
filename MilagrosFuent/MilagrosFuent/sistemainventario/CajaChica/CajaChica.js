var AppSession = "../CajaChica/CajaChica.aspx";
var CodigoMenu = 7000; var CodigoInterno = 3;
var AdministradorPagina = false;
var P_CIERRE_CAJA_X_USUARIO = 0;
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

    $('#MainContent_txtHasta').datepicker({ onSelect: function () {
        var date = $(this).datepicker('getDate');
        if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
        }
    }
    });

    $('#MainContent_txtHasta').datepicker({ beforeShowDay: function (date) {
        return [date.getDate() == 1, ''];
    }
    });

    $('#MainContent_txtDesde').on('change', function (e) {
        F_USUARIO_X_OPERACION_DIARIA();
    });

    $('#MainContent_btnGenerarCaja').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, 7000301, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            if (!F_ValidarGrabarDocumento())
                return false;
            var Mensaje = 'VISTA PRELIMINAR DEL REPORTE';
            F_Reporte(700, $('#MainContent_txtDesde').val(), Mensaje);

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnReGenerarCaja').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
       if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GENERAR LA CAJA"))
                F_GrabarDocumento(1);

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnReporteResumido').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Reporte(15, $('#MainContent_txtDesde').val());
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnReporteDetalle').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Reporte(16, $('#MainContent_txtDesde').val());
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


    $('#MainContent_btnBuscarLiquidacion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_BuscarLiquidacion();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnLiquidacion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
       // if (F_PermisoOpcion(CodigoMenu, 7000304, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {

            if (!F_ValidarLiquidacion())
                return false;


            F_Liquidacion();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnAplicar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
       // if (F_PermisoOpcion(CodigoMenu, 7000304, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {

            if (!F_ValidarLiquidacionaplicar())
                return false;

  if (!confirm("ESTA SEGURO DE APLICAR EL CAMBIO"))
            return false;

            F_AplicarDetallado();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
       // if (F_PermisoOpcion(CodigoMenu, 7000304, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {

            if (!F_ValidarAgregar())
                return false;

            if (!confirm("ESTA SEGURO DE LIQUIDAR LA CAJA"))
            return false;

            F_Grabar();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

      $('#MainContent_btnPDF').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            F_ReporteGrupal_excel();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });


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

    F_Controles_Inicializar();

    $('.MesAnioPicker').datepicker('setDate', new Date());

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtFechaDesde').css('background', '#FFFFE0');

    $('#MainContent_txtFechaHasta').css('background', '#FFFFE0');

    $('#MainContent_txtFechaSaldo').css('background', '#FFFFE0');

    
    $('#MainContent_txtFechaSaldo').css('background', '#FFFFE0');

    $("#MainContent_txtMontoSoles").ForceNumericOnly();

    $("#MainContent_ddl_responsable").css('background', '#FFFFE0');

    $('#divTabs').tabs();

    F_Derecha();
});

$().ready(function () {
    $(document).everyTime(600000, function () {
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

$(document).on("change", "select[id $= 'MainContent_ddlCajaFisica']", function () {
    F_USUARIO_X_OPERACION_DIARIA();
});

$(document).on("change", "select[id $= 'MainContent_ddlEmpresa']", function () {
    F_CAJA_X_EMPRESA($('#MainContent_ddlEmpresa').val());
});

$(document).on("change", "select[id $= 'MainContent_ddlBancoSoles']",function () {
     F_ListarNroCuenta();
} );

$(document).on("change", "select[id $= 'MainContent_ddlBancoDolares']",function () {
     F_ListarNroCuenta();
} );

function F_Inicializar_Parametros() {
    P_CIERRE_CAJA_X_USUARIO = "0";

    var Parametros = F_ParametrosPagina('', CodigoMenu, CodigoInterno);
    $.each(Parametros, function (index, item) {
        switch (item.Parametro) {
            case "P_CIERRE_CAJA_X_USUARIO":
                P_CIERRE_CAJA_X_USUARIO = item.Valor;
        };
    });

    return true;
}

function F_Controles_Inicializar() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    F_Inicializar_Parametros();
    var arg;
    F_CAJA_X_EMPRESA(1);
    try {
        var objParams =
            {
                Filtro_CodigoPagina: 35,
                Filtro_CodEmpresa: 1,
                Filtro_CodBancoSoles: 1,
                Filtro_CodMonedaSoles: 1,
                Filtro_CodBancoDolares: 1,
                Filtro_CodMonedaDolares: 2,
                Filtro_CodEstado:1,
                Filtro_CodCargo:6
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
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[2]);
                        $('#hfCodUsuario').val(result.split('~')[4]);
                        F_Update_Division_HTML('div_CajaFisicaConsulta', result.split('~')[5]);
                        F_Update_Division_HTML('div_Sucursal', result.split('~')[6]);
                        F_Update_Division_HTML('div_Empresa', result.split('~')[8]);
                        F_Update_Division_HTML('div_EmpresaConsulta', result.split('~')[9]);
                        F_Update_Division_HTML('div_EmpresaLiquidacion', result.split('~')[17]);
                        F_Update_Division_HTML('div_CajaFisicaLiquidacion', result.split('~')[18]);
                        
                        F_Update_Division_HTML('div_Responsable', result.split('~')[19]);
                  
                        F_Update_Division_HTML('div_monedasoles', result.split('~')[11]);
                        F_Update_Division_HTML('div_BancoSoles', result.split('~')[12]);
                        F_Update_Division_HTML('div_CuentaSoles', result.split('~')[15]);
                        F_Update_Division_HTML('div_monedadolares', result.split('~')[13]);
                        F_Update_Division_HTML('div_bancoDolares', result.split('~')[14]);
                        F_Update_Division_HTML('div_cuentadolares', result.split('~')[16]);

                        $('#hfCodEmpresa').val(result.split('~')[10]);
                        $('#hfCodAlmacen').val(result.split('~')[7]);
                        
                        $('#MainContent_ddlMonedaDolares').val('2');
                        $('#MainContent_ddl_responsable').val('1');
                        $('#MainContent_ddlSucursal').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisicaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_dllEmpresaLiquidacion').css('background', '#FFFFE0');
                        $('#MainContent_txtFechaDesdeLiquidacion').css('background', '#FFFFE0');
                        $('#MainContent_txtFechaHastaLiquidacion').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisicaLiquidacion').css('background', '#FFFFE0');
                        $('#MainContent_ddlDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddl_responsable').css('background', '#FFFFE0');

                        $('#MainContent_TxtLiquidacionSoles').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaSoles').css('background', '#FFFFE0');
                        $('#MainContent_ddlBancoSoles').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuentaSoles').css('background', '#FFFFE0');
                        $('#MainContent_txtNroSoles').css('background', '#FFFFE0');
                        $('#MainContent_txtMontoSoles').css('background', '#FFFFE0');
                        $('#MainContent_TxtLiquidacionDolares').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaDolares').css('background', '#FFFFE0');
                        $('#MainContent_ddlBancoDolares').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuentaDolares').css('background', '#FFFFE0');
                        $('#MainContent_txtnopDolares').css('background', '#FFFFE0');
                        $('#MainContent_txtMontoDolares').css('background', '#FFFFE0');

                        $('#MainContent_txtObservacionLiquidacion').css('background', '#FFFFE0');
                        $('#MainContent_txtObservacionDolares').css('background', '#FFFFE0');
                        $('#MainContent_txtObservacion').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');
                        F_USUARIO_X_OPERACION_DIARIA();
                      
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);
    }
}

function F_Reporte(CodMenu,Fecha,Mensaje) {
    var Cuerpo = '#MainContent_';
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var Titulo = "CIERRE CAJA DETALLADO";
    var NombreTabla = "CajaChicaDetalle";
    var NombreArchivo = "Web_Reporte_CajaBanco_rptCajaChicaDetalle.rpt";

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'FechaEmision=' + Fecha + '&';
    rptURL = rptURL + 'FechaSaldo=' + $('#MainContent_txtFechaSaldo').val() + '&';
    rptURL = rptURL + 'CodCajaFisica=' + $('#MainContent_ddlCajaFisica').val() + '&';
    rptURL = rptURL + 'CodUsuario=' + $('#MainContent_ddlUsuario').val() + '&';
    rptURL = rptURL + 'CodEmpresa=' + $('#hfCodEmpresa').val() + '&';   
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'Mensaje=' + Mensaje + '&';
    rptURL = rptURL + 'CodMedioPago=' + 0 + '&';
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ReporteIndividual(CodMenu, Fila,CodMedioPago) {
    var imgID = Fila.id;
    var MedioPago = '';

    switch ($('#MainContent_ddlReporte').val()) {
        case 0:
            MedioPago = '';
            break;
             case 1:
            MedioPago = 'Efectivo';
            CodMenu=710;
            break;
        case 2:
            MedioPago = 'Credito';
            break;
        case 3:
            MedioPago = 'Deposito';
             break;
         case 4:
            MedioPago = 'Tarjeta';
             break;
         case 5:
            MedioPago = 'Factura';
             break;
          case 6:
            MedioPago = 'NotaVenta';
             break;
    }

    var hfCodUsuario = '#' + imgID.replace('imgImprimirIndividual' + MedioPago, 'hfCodUsuario');
    var hfCodCajaFisica = '#' + imgID.replace('imgImprimirIndividual' + MedioPago, 'hfCodCajaFisica');
    var lblFecha = '#' + imgID.replace('imgImprimirIndividual' + MedioPago, 'lblFecha');
    var lblFechaSaldo = '#' + imgID.replace('imgImprimirIndividual' + MedioPago, 'lblFechaSaldo');
    var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';
    var Titulo = "CIERRE CAJA DETALLADO";
    var NombreTabla = "CajaChicaDetalle";
    var NombreArchivo = "Web_Reporte_CajaBanco_rptCajaChicaDetalle.rpt";
    var Mensaje = '';
    if ($(Cuerpo + 'txtDesde').val() == '')
        Cadena = Cadena + '<p></p>' + 'Desde';

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;S
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'FechaEmision=' + $(lblFecha).text() + '&';
    rptURL = rptURL + 'FechaSaldo=' + $(lblFechaSaldo).text() + '&';
    rptURL = rptURL + 'CodCajaFisica=' + $(hfCodCajaFisica).val() + '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'Mensaje=' + Mensaje + '&';
    rptURL = rptURL + 'CodMedioPago=' + $('#MainContent_ddlReporte').val() + '&';
    rptURL = rptURL + 'CodDoc=' + $('#MainContent_ddlDocumento').val() + '&';
    rptURL = rptURL + 'MedioPago=' + MedioPago + '&';

    window.open(rptURL, "PopUpRpt", Params);

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

function F_ValidarGrabarDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';
         var Usuario =  $(Cuerpo + 'ddlUsuario').val()

         if (Usuario == 0)
            Cadena = Cadena + '<p></p>' + 'Usuario';

        if ($(Cuerpo + 'ddlCajaFisica').val() == null)
            Cadena = Cadena + '<p></p>' + 'Caja';

        if ($(Cuerpo + 'ddlUsuario').val() == '')
         Cadena = Cadena + '<p></p>' + 'Usuario';

        if ($(Cuerpo + 'txtDesde').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha';

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

function F_GrabarDocumento(Flag) {
    try {
        var Contenedor = '#MainContent_';
        var objParams = {
            Filtro_FechaCaja: $(Contenedor + 'txtDesde').val(),
            Filtro_FechaSaldo: $(Contenedor + 'txtFechaSaldo').val(),
            Filtro_CodCajaFisica: $(Contenedor + 'ddlCajaFisica').val(),
            Filtro_CodUsuario: $(Contenedor + 'ddlUsuario').val(),
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresa').val(),
            Filtro_Flag: Flag,
            Filtro_P_CIERRE_CAJA_X_USUARIO: P_CIERRE_CAJA_X_USUARIO    
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
                    alertify.log('Se grabo correctamente');
                    F_Reporte(701, $(Contenedor + 'txtDesde').val(),'');
                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }
            }
            else {
                alertify.log(result.split('~')[0]);
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

function F_Buscar() {
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    var CodAdministrador = F_PermisoOpcion_SinAviso(CodigoMenu, 777010, '');

//    if (CodAdministrador == 0 & $('#MainContent_ddlSucursal').val() == 0) {
//        $('#MainContent_ddlSucursal').val($('#hfCodAlmacen').val());
//        alertify.log("OPCION NO VALIDA PARA TODOS LAS SUCURSALES");
//        return false;
//    }
    var chkFecha = '0';
    if ($('#MainContent_chkRango').is(':checked'))
        chkFecha = '1';

    try {
        var objParams = {
            Filtro_Desde: $('#MainContent_txtFechaDesde').val(),
            Filtro_Hasta: $('#MainContent_txtFechaHasta').val(),
            Filtro_CodCajaFisica: $('#MainContent_ddlCajaFisicaConsulta').val(),
            Filtro_CodAlmacen: $('#MainContent_ddlSucursal').val(),
            Filtro_ChkFecha: chkFecha,
            Filtro_CodAdministrador: CodAdministrador
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
                $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblFecha')); 
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

function getContentTab() {
    $('#MainContent_ddlEmpresaConsulta').val($('#hfCodEmpresa').val());
    $('#MainContent_txtFechaDesde').val(Date_AddDays($('#MainContent_txtFechaHasta').val(), -7));
    var CodAdministrador = F_PermisoOpcion_SinAviso(CodigoMenu, 777010, '');
    if (CodAdministrador == 0) {
        $('#MainContent_ddlSucursal').val($('#hfCodAlmacen').val());
        $('#MainContent_ddlSucursal').prop('disabled', true);
    }        
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
}

function getContentTab2() {
    $('#MainContent_dllEmpresaLiquidacion').val($('#hfCodEmpresa').val());
//    $('#MainContent_txtFechaDesde').val(Date_AddDays($('#MainContent_txtFechaHasta').val(), -7));
    var CodAdministrador = F_PermisoOpcion(CodigoMenu, 777010, '');
    if (CodAdministrador == 0) {
        $('#MainContent_ddlSucursal').val($('#hfCodAlmacen').val());
        $('#MainContent_ddlSucursal').prop('disabled', true);
    }        
    $('#MainContent_chkRangoLiquidacion').prop('checked', true);
    F_BuscarLiquidacion();
    return false;
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

function F_Abrir(Fila) {
    if (F_PermisoOpcion(CodigoMenu, 777009, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgAbrir', 'lblCodigo');
        var lblFecha =  '#' + imgID.replace('imgAbrir', 'lblFecha');
        var hfCodUsuario = '#' + imgID.replace('imgAbrir', 'hfCodUsuario');
        var hfCodEstado =  '#' + imgID.replace('imgAbrir', 'hfCodEstado');
        var hfCodCajaFisica = '#' + imgID.replace('imgAbrir', 'hfCodCajaFisica');
      var Permiso = F_PermisoOpcion(CodigoMenu, 777009, '');

        if (Permiso == 0)
            return false;

              if ($(hfCodEstado).val() == "16") {
            alertify.log('PRIMERO DEBE DE ELIMINAR LA LIQUIDACION');
            return false;
        }

        if (!confirm("ESTA SEGURO DE REABRIR LA CAJA"))
            return false;

        try {
            var Contenedor = '#MainContent_';
            var objParams = {
                Filtro_CodCajaChica: $(lblCodigo).val()             
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_Abrir_NET(arg, function (result) {

                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                        alertify.log('Se grabo correctamente');
                        F_Buscar();               
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
    catch (e) {
        MostrarEspera(false);
        alert("Error Detectado: " + e);
        return false;
    }
}

function F_Cerrar(Fila) {
    if (F_PermisoOpcion(CodigoMenu, 777008, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgCerrar', 'lblCodigo');
        var hfCodUsuario = '#' + imgID.replace('imgCerrar', 'hfCodUsuario');
        var hfCodEstado = '#' + imgID.replace('imgCerrar', 'hfCodEstado');

        var Permiso = F_PermisoOpcion(CodigoMenu, 777008, '');

      if (Permiso == 0)
       return false;
    
        if ($(hfCodEstado).val() != "14") {
            alertify.log('NO SE PUEDE VOLVER A LIQUIDAR LA CAJA');
            return false;
        }

        if (!confirm("ESTA SEGURO DE CERRAR LA CAJA"))
            return false;

        try {
            var Contenedor = '#MainContent_';
            var objParams = {
                Filtro_CodCajaChica: $(lblCodigo).val(),
                Filtro_CodUsuario:   $(hfCodUsuario).val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_LiquidarCaja_NET(arg, function (result) {

                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                        alertify.log('Se grabo correctamente');
                        F_Buscar();
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
    catch (e) {
        MostrarEspera(false);
        alert("Error Detectado: " + e);
        return false;
    }
}

function F_Eliminar(Fila) {
  if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac

    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgEliminar', 'lblCodigo');
        var lblFecha = '#' + imgID.replace('imgEliminar', 'lblFecha');
        var hfCodUsuario = '#' + imgID.replace('imgEliminar', 'hfCodUsuario');
        var hfCodEstado = '#' + imgID.replace('imgEliminar', 'hfCodEstado');
        var hfCodCajaFisica = '#' + imgID.replace('imgEliminar', 'hfCodCajaFisica');

        if ($('#hfCodUsuario').val() != $(hfCodUsuario).val()) {
            var Permiso = F_PermisoOpcion(CodigoMenu, 777011, '');
            if (Permiso != 1) {
                alertify.log('OPCION NO VALIDA');
                return false;
            }                
        }

        if ($(hfCodEstado).val() != 14) {
            alertify.log('NO SE PUEDE ELIMINAR LA CAJA, SE ENCUENTRA CERRADA');
            return false;
        }

        if (!confirm("ESTA SEGURO DE ELIMINAR LA CAJA"))
            return false;

        try {
            var Contenedor = '#MainContent_';
            var objParams = {
                Filtro_CodCajaChica: $(lblCodigo).val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_Eliminar_NET(arg, function (result) {

                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    if (str_mensaje_operacion == 'Se Elimino Correctamente') {
                        alertify.log('Se Elimino correctamente');
                        F_Buscar();              
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
    catch (e) {
        MostrarEspera(false);
        alert("Error Detectado: " + e);
        return false;
    }
}

function F_USUARIO_X_OPERACION_DIARIA() {

    var arg;

    try {
        var objParams =
            {
                Filtro_FechaEmision: $('#MainContent_txtDesde').val(),
                Filtro_CodCajaFisica: $('#MainContent_ddlCajaFisica').val()
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_USUARIO_X_OPERACION_DIARIA_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Usuario', result.split('~')[2]);
                        $('#MainContent_ddlUsuario').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                    $('#MainContent_ddlUsuario').prop('disabled', true);
                    if (P_CIERRE_CAJA_X_USUARIO == 1)
                        $('#MainContent_ddlUsuario').val(0);
                    else                  
                        $('#MainContent_ddlUsuario').val($('#hfCodUsuario').val());                                     
                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);
    }
}

function F_Imprimir(Fila) {
    var imgID = Fila.id;
    var hfCodAlmacen = '#' + imgID.replace('imgPdf', 'hfCodAlmacen');
    var hfCodCajaFisica = '#' + imgID.replace('imgPdf', 'hfCodCajaFisica');
    var lblFecha = '#' + imgID.replace('imgPdf', 'lblFecha');
    var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';
    var Titulo = "CIERRE CAJA RESUMIDO";
    var NombreTabla = "CajaResumido_Ticket";
    var NombreArchivo = "Web_Reporte_CajaBanco_rptCajaChicaResumido_Ticket.rpt";
    var CodMenu = 705;
    if ($(Cuerpo + 'txtDesde').val() == '')
        Cadena = Cadena + '<p></p>' + 'Desde';

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';

    rptURL = '../Reportes/Web_Pagina_Crystal_Nuevo.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'FechaEmision=' +  $(lblFecha).text() + '&';
    rptURL = rptURL + 'CodCajaFisica=' + $(hfCodCajaFisica).val() + '&';
    rptURL = rptURL + 'CodAlmacen=' + $(hfCodAlmacen).val() + '&';
    rptURL = rptURL + 'CodEmpresa=' + $('#hfCodEmpresa').val() + '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_CAJA_X_EMPRESA(CodEmpresa) {

    var arg;

    try {
        var objParams =
            {
                Filtro_CodEmpresa: CodEmpresa
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_CAJA_X_EMPRESA_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[2]);
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }               
                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);
    }
}

function checkAll(objRef) {
    var checkallid = '#' + objRef.id;

    if ($(checkallid).is(':checked'))
        $('#MainContent_grvConsulta input:checkbox').prop('checked', true);
    else
        $('#MainContent_grvConsulta input:checkbox').prop('checked', false);
}

function F_ValidarLiquidacion() {

    try {
        var chkSi = '';
        var x = 0;
        var hfCodEstado = '';
        var Cadena = '';

        $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            hfCodEstado = chkSi.replace('chkLiquidacion', 'hfCodEstado');

            if ($(chkSi).is(':checked')) {
                x = 1;

                if ($(hfCodEstado).val() != 8) {
                    Cadena = 'Solo se puede liquidar cajas Cerradas';
                    return false;
                }
            }

        });

        if (x == 0) {
            alertify.log("Seleccione un caja para la Liquidacion");
            return false;
        }
        if (Cadena == 'Solo se puede liquidar cajas Cerradas') {
            alertify.log("Solo se puede liquidar cajas Cerradas");
            return false;
        }

        return true;

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_Liquidacion(Fila) {
    
    try {

    
        var lblCodigo_grilla='';
        var C = 0;
        var D = 0;
        var F = '0';
        var arrDetalle = new Array();

        $('#divLiquidacion').dialog({
                    resizable: false,
                    modal: true,
                    title: "Liquidacion de Caja",
                    title_html: true,
                    height: 550,
                    width: 700,
                    autoOpen: false
                });

//                $('#div_Liquidacion').dialog('open');

                $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkLiquidacion', 'lblCodigo');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodigoFactura: $(lblCodigo_grilla).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                    Filtro_XmlDetalle:    Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
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
                     
                     if (str_mensaje_operacion == "") {
                        F_Update_Division_HTML('div_Liquidacion', result.split('~')[4]);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#MainContent_txtNroSoles').val('');
                        $('#MainContent_txtnopDolares').val('');
                        $('#MainContent_txtObservacionLiquidacion').val('');
                        $('#hfDetalleLiquidacion').val(result.split('~')[6]);
                        $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                            C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalSoles_' + F).val());
                            D = parseFloat(D) + parseFloat($('#MainContent_grvLiquidacion_txtTotalDolares_' + F).val());   
                            F++
                        });
                        $('#hfcantidadcajasliquidar').val(parseFloat(F));
                        $('#MainContent_txtMontoSoles').val(parseFloat(C));
                        $('#MainContent_txtMontoDolares').val(parseFloat(D)); 
                        $('#divLiquidacion').dialog('open');
                       
//                        $('#MainContent_lblRegistroCobranza').text(F_Numerar_Grilla("grvFactura", "lblFactura"));
//                        if (result.split('~')[2] == 'La(s) factura(s) se han agregado con exito') {
//                            $('#divConsultaFactura').dialog('close');
//                            toastr.warning('La(s) factura(s) se han agregado con exito');
//                        }
                        }    
                        else{
                          alertify.log(result.split('~')[1]);
                        }
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

function F_ListarNroCuenta() {
if (!F_SesionRedireccionar(AppSession)) return false;
    var arg;

    try {

        var objParams = {

            Filtro_CodBancoSoles: $('#MainContent_ddlBancoSoles').val(),
            Filtro_CodMonedaSoles:  $('#MainContent_ddlMonedaSoles').val(),
            Filtro_CodBancoDolares:  $('#MainContent_ddlBancoDolares').val(),
            Filtro_CodMonedaDolares:  $('#MainContent_ddlMonedaDolares').val()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ListarNroCuenta_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") 
                    {
                        F_Update_Division_HTML('div_CuentaSoles', result.split('~')[2]);

                        F_Update_Division_HTML('div_cuentadolares', result.split('~')[3]);

                     $('#MainContent_ddlCuentaSoles').css('background', '#FFFFE0');   
                     $('#MainContent_ddlCuentaDolares').css('background', '#FFFFE0');       
                    }
                    else {

                        toastr.warning(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        toastr.warning("Error detectado: " + mierror);

    }

}

function F_ActualizarTotalSoles(Fila) {
    try {
        var txtTotalSoles = '#' + Fila;
        var hfTotalSoles = txtTotalSoles.replace('txtTotalSoles', 'hfEFECTIVOSOLES');
        var C = 0;
        var F = 0;

        $("#hfTotalSoles").val(parseFloat($(txtTotalSoles).val()).toFixed(2));


        if (parseInt($(txtTotalSoles).val()) <= 0 ) {
            $(txtTotalSoles).val(parseFloat($(hfTotalSoles).val()).toFixed(2));
            $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalSoles_' + F).val());

                F++
            });
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("TIENE QUE INGRESAR UN MONTO MAYOR A 0");
            return false;
        }

        if ($(txtTotalSoles).val() =='' ) {
            $(txtTotalSoles).val(parseFloat($(hfTotalSoles).val()).toFixed(2));
            $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalSoles_' + F).val());

                F++
            });
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("TIENE QUE INGRESAR UN MONTO MAYOR A 0");
            return false;
        }


        if (parseInt($(txtTotalSoles).val()) > parseInt($(hfTotalSoles).val())) {
            $(txtTotalSoles).val(parseFloat($(hfTotalSoles).val()).toFixed(2));
            $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalSoles_' + F).val());

                F++
            });
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("EL MONTO NO PUEDE SER MAYOR AL EFECTIVO EN SOLES");
            return false;
        }

        

        $('#MainContent_grvLiquidacion  .detallesart').each(function () {
            C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalSoles_' + F).val());
            
            F++
        });

        $('#MainContent_txtMontoSoles').val(parseFloat(C));

    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ActualizarTotalDolares(Fila) {
    try {
        var txtTotalDolares = '#' + Fila;
        var hfTotalDolares = txtTotalDolares.replace('txtTotalDolares', 'hfEFECTIVODolares');
        var C = 0;
        var F = 0;

        $("#hfTotalDolares").val(parseFloat($(txtTotalDolares).val()).toFixed(2));


        if (parseInt($(txtTotalDolares).val()) <= 0) {
            $(txtTotalDolares).val(parseFloat($(hfTotalDolares).val()).toFixed(2));
            $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalDolares_' + F).val());

                F++
            });
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("TIENE QUE INGRESAR UN MONTO MAYOR A 0");
            return false;
        }

        if ($(txtTotalDolares).val() =='') {
            $(txtTotalDolares).val(parseFloat($(hfTotalDolares).val()).toFixed(2));
            $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalDolares_' + F).val());

                F++
            });
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("TIENE QUE INGRESAR UN MONTO MAYOR A 0");
            return false;
        }

        if (parseInt($(txtTotalDolares).val()) > parseInt($(hfTotalDolares).val())) {
            $(txtTotalDolares).val(parseFloat($(hfTotalDolares).val()).toFixed(2));
            $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalDolares_' + F).val());

                F++
            });
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("EL MONTO NO PUEDE SER MAYOR AL EFECTIVO EN SOLES");
            return false;
        }



        $('#MainContent_grvLiquidacion  .detallesart').each(function () {
            C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalDolares_' + F).val());

            F++
        });

        $('#MainContent_txtMontoDolares').val(parseFloat(C));

    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ValidarAgregar() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';
        var lblcoddetalle_grilla = '';
        var x = 0;
        var F = '0';
            if ($(Cuerpo + 'txtNroSoles').val() == '')
                Cadena = Cadena + '<p></p>' + 'Nro De Operacion Soles';

            if ($(Cuerpo + 'ddlCuentaSoles').val() == '')
                Cadena = Cadena + '<p></p>' + 'Nro de Cuenta Soles';

            if ($(Cuerpo + 'ddlCuentaDolares').val() == '' & $(Cuerpo + 'txtMontoDolares').val() != 0)
                Cadena = Cadena + '<p></p>' + 'Nro de Cuenta Dolares';

            if ($(Cuerpo + 'txtnopDolares').val() == '' & $(Cuerpo + 'txtMontoDolares').val() != 0)
                Cadena = Cadena + '<p></p>' + 'Nro De Operacion Dolares';

           

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}


function F_Grabar() {
    try {
        var lblCodigo_grilla = '';
        var lblFecha_grilla = '';
        var lblAplicarSoles_grilla = '';
        var lblAplicarDolares_grilla = '';
        var arrDetalle = new Array();

        $('#MainContent_grvLiquidacion .detallesart').each(function () {
            chkSi = '#' + this.id;
            lblCodigo_grilla = chkSi.replace('lblFecha', 'hfCodCajaChica');
            lblFecha_grilla = chkSi.replace('lblFecha', 'lblFecha');
            lblAplicarSoles_grilla = chkSi.replace('lblFecha', 'txtTotalSoles');
            lblAplicarDolares_grilla = chkSi.replace('lblFecha', 'txtTotalDolares');
            lblCodDetalle_grilla = chkSi.replace('lblFecha', 'lblCodDetalle');
            
                var objDetalle = {
                    Codigo: $(lblCodigo_grilla).val(),
                    Fecha: $(lblFecha_grilla).text(),
                    AplicarSoles: $(lblAplicarSoles_grilla).val(),
                    AplicarDolares: $(lblAplicarDolares_grilla).val(),
                    CodDetalle: $(lblCodDetalle_grilla).val()
                };
                arrDetalle.push(objDetalle);
            
        });

        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_CodCuentaSoles: $('#MainContent_ddlCuentaSoles').val(),
            Filtro_NroSoles: $('#MainContent_txtNroSoles').val(),
            Filtro_TotalSoles: $('#MainContent_txtMontoSoles').val(),
            Filtro_CodCuentaDolares: $('#MainContent_ddlCuentaDolares').val(),
            Filtro_NroDolares: $('#MainContent_txtnopDolares').val(),
            Filtro_TotalDolares: $('#MainContent_txtMontoDolares').val(),
            Filtro_Observacion: $('#MainContent_txtObservacionLiquidacion').val(),
            Filtro_FechaLiquidacion: $('#MainContent_TxtLiquidacionSoles').val(),
            Filtro_Responsable: $('#MainContent_ddl_responsable').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Grabar_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                if (result.split('~')[1] == 'Las Liquidacion(es) se han agregado con exito') {
//                    $('#divLiquidacion').dialog('close');
                    F_Buscar();
                    alertify.log('Las Liquidacion(es) se han agregado con exito');
                    $('#divLiquidacion').dialog('close');
                }
                 else {
                alertify.log(result.split('~')[1]);
                }
           
            }
       
            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

function F_BuscarLiquidacion() {
// if (F_PermisoOpcion(CodigoMenu, 7000302, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    
    var chkFecha = '0';
    if ($('#MainContent_chkRangoLiquidacion').is(':checked'))
        chkFecha = '1';

    try {
        var objParams = {
            Filtro_Desde: $('#MainContent_txtFechaDesdeLiquidacion').val(),
            Filtro_Hasta: $('#MainContent_txtFechaHastaLiquidacion').val(),
            Filtro_CodCajaFisica: $('#MainContent_ddlCajaFisicaLiquidacion').val(),
//            Filtro_CodAlmacen: $('#MainContent_ddlSucursal').val(),
            Filtro_ChkFecha: chkFecha,
//            Filtro_CodAdministrador: CodAdministrador
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_BuscarLiquidacion_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                F_Update_Division_HTML('div_LiquidacionConsulta', result.split('~')[2]);
                $('#CantidadRegistroLiquidacion').text(F_Numerar_Grilla("grvLiquidacionConsulta", 'lblFecha'));
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

var Ctlgv;
var Hfgv;

function imgMas_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalle(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvLiquidacionConsulta_pnlOrders_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlOrders', 'lblCodigo')).val();
//                var CodTipoDoc = $('#' + Fila.replace('pnlOrders', 'hfCodTipoDoc')).val();
                var grvNombre = 'MainContent_grvLiquidacionConsulta_grvDetalle_' + Col;
                Hfgv = '#' + Fila.replace('pnlOrders', 'hfDetalleCargado');

                if ($(Hfgv).val() === "1")
                {
                    $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 1,
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);


                        $(Ctlgv).attr('src', '../Asset/images/loading.gif');
                        F_LlenarGridDetalle_NET(arg, function (result) {
                
                        $(Ctlgv).attr('src', '../Asset/images/minus.gif');

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
//                            $(Hfgv).val('1');
                        }
                        else
                        {
                            alertify.log(str_mensaje_operacion);
                        }

                        return false;

                        });
        
                }

                }

        }
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

        return true;
}

function imgMas_ClickLiquidacion(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalleLiquidacion(grid.attr('id'));
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalleLiquidacion(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvLiquidacionConsulta_pnlOrdersliquidacion_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlOrdersliquidacion', 'lblCodigo')).val();
//                var CodTipoDoc = $('#' + Fila.replace('pnlOrders', 'hfCodTipoDoc')).val();
                var grvNombre = 'MainContent_grvLiquidacionConsulta_grvDetalleliquidacion_' + Col;
                Hfgv = '#' + Fila.replace('pnlOrdersliquidacion', 'hfDetalleCargado');

                if ($(Hfgv).val() === "1")
                {
                    $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 1,
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);


                        $(Ctlgv).attr('src', '../Asset/images/loading.gif');
                        F_LlenarGridDetalleLiquidacion_NET(arg, function (result) {
                
                        $(Ctlgv).attr('src', '../Asset/images/minus.gif');

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
//                            $(Hfgv).val('1');
                        }
                        else
                        {
                            alertify.log(str_mensaje_operacion);
                        }

                        return false;

                        });
        
                }

                }

        }
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

        return true;
}
// DETALLE OBSERVACION
var CtlgvAuditoria;
var HfgvAuditoria;
function imgMasAuditoria_Click(Control) {
    CtlgvAuditoria = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Auditoria(grid.attr('id'));        
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_Auditoria(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersAuditoria', 'lblCodigo')).val();
        var grvNombre = 'MainContent_grvLiquidacionConsulta_grvDetalleAuditoria_' + Col;
        HfgvAuditoria = '#' + Fila.replace('pnlOrdersAuditoria', 'hfDetalleCargadoAuditoria');

        if ($(HfgvAuditoria).val() === "1") {
                    $(CtlgvAuditoria).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoria).next().html() + '</td></tr>');
                    $(CtlgvAuditoria).attr('src', '../Asset/images/minus.gif');
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

                //MostrarEspera(true);
                $(CtlgvAuditoria).attr('src', '../Asset/images/loading.gif');
                F_Auditoria_NET(arg, function (result) {
                $(CtlgvAuditoria).attr('src', '../Asset/images/minus.gif');
                    //MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvAuditoria).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoria).next().html() + '</td></tr>');
                        $(HfgvAuditoria).val('1');
                    }
                    else {
                        toastr.warning(str_mensaje_operacion);
                    }
                    return false;
                });
            }
        }
    }
    catch (e) {
        MostrarEspera(false);
        toastr.warning("ERROR DETECTADO: " + e);
        return false;
    }
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
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'lblCodigo')).val();
        var grvNombre = 'MainContent_grvLiquidacionConsulta_grvDetalleObservacion_' + Col;
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

function F_EliminarLiquidacion(Fila) {
   // if (F_PermisoOpcion(CodigoMenu, 7000303, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac

    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgEliminar', 'lblCodigo');
        var lblFecha = '#' + imgID.replace('imgEliminar', 'lblFecha');

       
        if (!confirm("ESTA SEGURO DE ELIMINAR LA LIQUIDACION"))
            return false;

        try {
            var Contenedor = '#MainContent_';
            var objParams = {
                Filtro_CodLiqui: $(lblCodigo).val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_EliminarLiquidacion_NET(arg, function (result) {

                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    if (str_mensaje_operacion == 'Se Elimino Correctamente') {
                        alertify.log('Se Elimino correctamente');
                        F_BuscarLiquidacion();              
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
    catch (e) {
        MostrarEspera(false);
        alert("Error Detectado: " + e);
        return false;
    }
}

function F_ReporteIndividual_excel(CodMenu, Fila,CodMedioPago) {
    var imgID = Fila.id;
    var MedioPago = '';

    switch ($('#MainContent_ddlReporte').val()) {
        case 0:
            MedioPago = '';
            break;
             case 1:
            MedioPago = 'Efectivo';
            CodMenu=712;
            break;
        case 2:
            MedioPago = 'Credito';
            break;
        case 3:
            MedioPago = 'Deposito';
             break;
         case 4:
            MedioPago = 'Tarjeta';
             break;
         case 5:
            MedioPago = 'Factura';
             break;
          case 6:
            MedioPago = 'NotaVenta';
             break;
    }

    var hfCodUsuario = '#' + imgID.replace('imgImprimirExcel' + MedioPago, 'hfCodUsuario');
    var hfCodCajaFisica = '#' + imgID.replace('imgImprimirExcel' + MedioPago, 'hfCodCajaFisica');
    var lblFecha = '#' + imgID.replace('imgImprimirExcel' + MedioPago, 'lblFecha');
    var lblFechaSaldo = '#' + imgID.replace('imgImprimirExcel' + MedioPago, 'lblFechaSaldo');
    var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';
    var Titulo = "CIERRE CAJA DETALLADO";
    var NombreTabla = "CajaChicaDetalle";
    var NombreHoja = "CajaChicaDetalle";
    var NombreArchivo = "Xls_Caja_Chica.xlsx";
    var Mensaje = '';
    if ($(Cuerpo + 'txtDesde').val() == '')
        Cadena = Cadena + '<p></p>' + 'Desde';

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';

    rptURL = '../Reportes/ConstruirExcel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'FechaEmision=' + $(lblFecha).text() + '&';
    rptURL = rptURL + 'FechaSaldo=' + $(lblFechaSaldo).text() + '&';
    rptURL = rptURL + 'CodCajaFisica=' + $(hfCodCajaFisica).val() + '&';
    rptURL = rptURL + 'NombreHoja=' + NombreHoja + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'Mensaje=' + Mensaje + '&';
    rptURL = rptURL + 'CodMedioPago=' + $('#MainContent_ddlReporte').val() + '&';
    rptURL = rptURL + 'CodDoc=' + $('#MainContent_ddlDocumento').val() + '&';
    rptURL = rptURL + 'MedioPago=' + MedioPago + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}


function F_ReporteGrupal() {
    var Codigos_Caja='';var CodCaja='0'; var nrodoc = ''; TipoDoc = '1';

                        $('#MainContent_grvLiquidacionConsulta_grvDetalle_0_lblCodCajaChica  .detallesart').each(function () {
                       chkSi = '#' + this.id;
                    hfcodtipodoc = chkSi.replace('lblEmision', 'hfcodtipodoc');
                    txtTotalSoles = chkSi.replace('lblEmision', 'txtTotalSoles');
                                {
                        var Codigos = chkSi.replace('chkLiquidacion', 'lblCodigo');
                        
                            Codigos_Caja = Codigos_Caja +','+ $(Codigos).val();
                           
                                };
                        });
     
    var CodMedioPago = $('#MainContent_ddlCajaFisicaConsulta').val();
    var Codoc = $('#MainContent_ddlDocumento').val();
//    var lblCodigo = '#' + imgID.replace(rplc, 'hfID');
//    var lblNumero = '#' + imgID.replace(rplc, 'hfNumeroDocumento');
//    var CodTipoDoc = '#' + imgID.replace(rplc, 'hfCodTipoDoc');
    
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/PDF.asmx/F_Caja_Pedido_Lote2_PDF',
        data: "{'Codigos':'" + Codigos_Caja + "','CodMedioPago':'" + CodMedioPago + "','Codoc':'"+Codoc +"'}",
        dataType: "json",
        async: true,
        success: function (data) {

            if (data.d === "")
                toastr.error("no se pudo descargar los documentos");

            var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';

            window.open(data.d, 'PopUpRpt', Params);
            //window.open(data.d, '_blank');
            MostrarEspera(false);

        },
        error: function (response) {
            alertify.log(response.responseText);
            MostrarEspera(false);
        },
        failure: function (response) {
            alertify.log(response.responseText);
            MostrarEspera(false);
        }
    });

    MostrarEspera(true);
    return false;
}

function F_ReporteGrupal_excel() {
  
    var chkSi = '';
    var MedioPago = '';
    var Codigos = '';
    var CajaPrincipal = '';
    var Cajas = '';
    var CodCaja = '';
    var CodMenu = '713';
    var arrDetalle = new Array();

     Verificar_Caja();

    
                        $('#MainContent_grvConsulta  .chkDelete :checkbox').each(function () {
                         chkSE = '#' + this.id;
                          Codigos = chkSE.replace('chkLiquidacion', 'lblCodigo');
                          Cajas = chkSE.replace('chkLiquidacion', 'hfCodCajaFisica');
                          if ($(chkSE).is(':checked')) {

                             var objDetalle = {
                                Codigos_Caja: $(Codigos).val()
                               }
                            arrDetalle.push(objDetalle);
                            }
                        });

    switch ($('#MainContent_ddlReporte').val()) {
        case 0:
            MedioPago = '';
            break;
             case 1:
            MedioPago = 'Efectivo';
            CodMenu=713;
            break;
        case 2:
            MedioPago = 'Credito';
            break;
        case 3:
            MedioPago = 'Deposito';
             break;
         case 4:
            MedioPago = 'Tarjeta';
             break;
         case 5:
            MedioPago = 'Factura';
             break;
          case 6:
            MedioPago = 'NotaVenta';
             break;
    }

  var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';
    var Titulo = "CIERRE CAJA DETALLADO";
    var NombreTabla = "CajaChicaDetalle";
    var NombreHoja = "CajaChicaDetalle";
    var NombreArchivo = "Xls_Caja_Chica.xlsx";
    var Mensaje = '';
    if ($(Cuerpo + 'txtDesde').val() == '')
        Cadena = Cadena + '<p></p>' + 'Desde';

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';

    rptURL = '../Reportes/ConstruirExcel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigos_Caja=' + Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle) + '&';
    rptURL = rptURL + 'NombreHoja=' + NombreHoja + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'Mensaje=' + Mensaje + '&';
    rptURL = rptURL + 'CodMedioPago=' + $('#MainContent_ddlReporte').val() + '&';
    rptURL = rptURL + 'MedioPago=' + MedioPago + '&';
    rptURL = rptURL + 'coddoc=' + $('#MainContent_ddlDocumento').val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}



function Verificar_Caja() {
     var chkSi = '';
    var CajaPrincipal = '';
    var Cajas = '';
    var CodCaja = '';

    $('#MainContent_grvConsulta  .chkDelete :checkbox').each(function () {
                         chkSi = '#' + this.id;
                          CajaPrincipal = chkSi.replace('chkLiquidacion', 'hfCodCajaFisica');
                          if ($(chkSi).is(':checked')) {
                               CodCaja =$(CajaPrincipal).val();
                           return false
                            }

                        });

                          $('#MainContent_grvConsulta  .chkDelete :checkbox').each(function () {
                         chkSi = '#' + this.id;
                          
                          Cajas = chkSi.replace('chkLiquidacion', 'hfCodCajaFisica');
                          if ($(chkSi).is(':checked')) {

                            if($(Cajas).val()!= CodCaja){
                             $(chkSi).prop('checked', false);
                            }
                               
                            }
                        });
}

function F_AplicarSoles(Fila) {
//    if (F_PermisoOpcion(CodigoMenu, '333004', '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    try {
        var imgID = Fila;
        var C=0;
        var F=0;
        var hfCodCajaChica = '#' + imgID.replace('imgAgregar', 'hfCodCajaChica');
//       var lblCodDetalle = $('#hfDetalleLiquidacion').val();
//        $('#MainContent_txtCostoActual').val(Mon + $(lblcostomercado_grilla).val());

        var objParams = {
            Filtro_CodcajaChica: $(hfCodCajaChica).val(),
            Filtro_CodDetalle: $('#hfDetalleLiquidacion').val(),
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_DetalleLiquidacion_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            if (result.split('~')[1] == "") {

                F_Update_Division_HTML('div_grvDetalleLiquidacion', result.split('~')[2]);
                $('#hfDetalleLiquidacion').val(result.split('~')[3]);
                        $('.ccsestilo').css('background', '#FFFFE0');

                $("#div_DetalleLiquidacion").dialog({
                    resizable: false,
                    modal: true,
                    title: "Historial Detalle Liquidacion",
                    title_html: true,
                    height: 550,
                    width: 1100,
                    autoOpen: false
                });


                       var titulos = true;
                    var SOLES = 0;
                    var DOLARES = 0;
                    var PSOLES = '#MainContent_grvDetalleLiquidacion_txtTotalSoles_';
                    var PDOLARES = '#MainContent_grvDetalleLiquidacion_txtTotalDolares_';
                    //SUMA
                    $('#MainContent_grvDetalleLiquidacion > tbody  > tr').each(function(index, tr) { 

                    if (titulos == true) {
                        titulos = false;
                        SOLES = Number($(PSOLES +  index).val());
                        DOLARES = Number($(PDOLARES +  index).val());
                    }
                    else {
//                        PRUEBA
                            if(typeof $(PSOLES +  (index )).val() !=='undefined'){
                                SOLES = Number($(PSOLES +  (index )).val())+SOLES;
                                DOLARES = Number($(PDOLARES +  index).val())+DOLARES;
                        }
                    }
                }); 
                    
                    $('#MainContent_lblSoles').text(SOLES.toFixed(2));
                    $('#MainContent_lblDolares').text(DOLARES.toFixed(2));

                    $('#MainContent_grvDetalleLiquidacion .detallesart').each(function () {
                    chkSi = '#' + this.id;
                    hfcodtipodoc = chkSi.replace('lblEmision', 'hfcodtipodoc');
                    lblSoles_grilla = chkSi.replace('lblEmision', 'txtTotalSoles');
                    lblDolares_grilla = chkSi.replace('lblEmision', 'txtTotalDolares');
                    lblCodDetalle_grilla = chkSi.replace('lblEmision', 'hfCodCajaChicaDocumento');

                       if($(hfcodtipodoc).val()==16 && $(lblSoles_grilla).val()==0){
                       C++
                       }

                       if ($(hfcodtipodoc).val()==16 ){
                       F++
                       }
                    
                });
                   
                   if(F=C)
                   {
                   $('#MainContent_chkNotaVenta').prop('checked', true);
                   }
                    else {
                    $('#MainContent_chkNotaVenta').prop('checked', false);
                    }

                $('#div_DetalleLiquidacion').dialog('open');
            }
            else {
                toastr.warning(result.split('~')[1]);
            }
            MostrarEspera(false);
            return false;
        });
    }
    catch (e) {
       MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }
}

function F_AplicarDetallado(Fila) {
    
    try {

    
        var lblCodigo_grilla='';
        var C = 0;
        var D = 0;
        var F = '0';
        var arrDetalle = new Array();
        var arrLiquidacion = new Array();

                $('#MainContent_grvDetalleLiquidacion .detallesart').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('lblEmision', 'hfcoddetalle');
                    lblSoles_grilla = chkSi.replace('lblEmision', 'txtTotalSoles');
                    lblDolares_grilla = chkSi.replace('lblEmision', 'txtTotalDolares');
                    lblCodDetalle_grilla = chkSi.replace('lblEmision', 'hfCodCajaChicaDocumento');

                        var objLiquidacion = {
                        CodigoFactura: $(lblCodigo_grilla).val(),
                        Soles: $(lblSoles_grilla).val(),
                        Dolares: $(lblDolares_grilla).val(),
                        CodigoDetalleCaja: $(lblCodDetalle_grilla).val()
                        };                                               
                        arrLiquidacion .push(objLiquidacion);
                    
                });

                $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkLiquidacion', 'lblCodigo');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodigoFactura: $(lblCodigo_grilla).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                    Filtro_Detalle:       $('#hfDetalleLiquidacion').val(),
                    Filtro_XmlLiquidacion:    Sys.Serialization.JavaScriptSerializer.serialize(arrLiquidacion),
                    Filtro_XmlDetalle :    Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);

                F_AgregarTemporalLiquidacion_NET(arg, function (result) {

                    MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion == "1") {
                     
                     if (str_mensaje_operacion == "") {
                        F_Update_Division_HTML('div_Liquidacion', result.split('~')[4]);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#MainContent_txtNroSoles').val('');
                        $('#MainContent_txtnopDolares').val('');
                        $('#MainContent_txtObservacionLiquidacion').val('');

                        $('#MainContent_grvLiquidacion  .detallesart').each(function () {
                            C = parseFloat(C) + parseFloat($('#MainContent_grvLiquidacion_txtTotalSoles_' + F).val());
                            D = parseFloat(D) + parseFloat($('#MainContent_grvLiquidacion_txtTotalDolares_' + F).val());   
                            F++
                        });
                        $('#MainContent_txtMontoSoles').val(parseFloat(C));
                        $('#MainContent_txtMontoDolares').val(parseFloat(D)); 
                        $('#div_DetalleLiquidacion').dialog('close');
                       
//                       
                        }    
                        else{
                          alertify.log(result.split('~')[1]);
                        }
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

function F_ActualizarDetalladoSoles(Fila) {
    try {
        var txtTotalSoles = '#' + Fila;
        var lblSaldoSolesDetallado = txtTotalSoles.replace('txtTotalSoles', 'lblSaldoSolesDetallado');
        var hfSolesAplicado = txtTotalSoles.replace('txtTotalSoles', 'hfSolesAplicado');
        var hfSaldoSoles = txtTotalSoles.replace('txtTotalSoles', 'hfSaldoSoles');
        var C = 0;
        var F = 0;

       
       if(parseFloat($(lblSaldoSolesDetallado).text())<0)
       {
        if ((parseFloat($(txtTotalSoles).val()) < parseFloat($(lblSaldoSolesDetallado).text())) ) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MENOR AL SALDO PENDIENTE");
            return false;
        }
        if ( parseFloat($(txtTotalSoles).val())>0) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MAYOR A CERO");
            return false;
        }
       }else if(parseFloat($(lblSaldoSolesDetallado).text())>=0){
       if ((parseFloat($(txtTotalSoles).val()) > parseFloat($(lblSaldoSolesDetallado).text())) ) {
            $(txtTotalSoles).val(parseFloat($(hfSaldoSoles).val()).toFixed(2));
          
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MAYOR AL SALDO PENDIENTE");
            return false;
        }
        if ( parseFloat($(txtTotalSoles).val())<0) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoSoles').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MENOR A CERO");
            return false;
        }
       }

       
        if ($(txtTotalSoles).val() =='' ) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
            
            
            alertify.log("TIENE QUE INGRESAR UN MONTO ");
            return false;
        }

               var titulos = true;
                    var SOLES = 0;
                    var DOLARES = 0;
                    var PSOLES = '#MainContent_grvDetalleLiquidacion_txtTotalSoles_';
                    var PDOLARES = '#MainContent_grvDetalleLiquidacion_txtTotalDolares_';
                    //SUMA
                    $('#MainContent_grvDetalleLiquidacion > tbody  > tr').each(function(index, tr) { 

                    if (titulos == true) {
                        titulos = false;
                        SOLES = Number($(PSOLES +  index).val());
                        DOLARES = Number($(PDOLARES +  index).val());
                    }
                    else {
//                        PRUEBA
                            if(typeof $(PSOLES +  (index )).val() !=='undefined'){
                                SOLES = Number($(PSOLES +  (index )).val())+SOLES;
                                DOLARES = Number($(PDOLARES +  index).val())+DOLARES;
                        }
                    }
                }); 
                    
                    $('#MainContent_lblSoles').text(SOLES.toFixed(2));
                    $('#MainContent_lblDolares').text(DOLARES.toFixed(2));


      
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ActualizarDetalladoDolares(Fila) {
    try {
        var txtTotalSoles = '#' + Fila;
        var lblSaldoSolesDetallado = txtTotalSoles.replace('txtTotalDolares', 'lblSaldoDolaresDetallado');
        var hfSolesAplicado = txtTotalSoles.replace('txtTotalDolares', 'hfDolaresAplicado');
        var C = 0;
        var F = 0;

       
       if(parseInt($(lblSaldoSolesDetallado).text())<0)
       {
        if ((parseInt($(txtTotalSoles).val()) < parseInt($(lblSaldoSolesDetallado).text())) ) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MENOR AL SALDO PENDIENTE");
            return false;
        }
        if ( parseInt($(txtTotalSoles).val())>0) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MAYOR A CERO");
            return false;
        }
       }else if(parseInt($(lblSaldoSolesDetallado).text())>=0){
       if ((parseInt($(txtTotalSoles).val()) > parseInt($(lblSaldoSolesDetallado).text())) ) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MAYOR AL SALDO PENDIENTE");
            return false;
        }
        if ( parseInt($(txtTotalSoles).val())<0) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
          
            $('#MainContent_txtMontoDolares').val(parseFloat(C));
            alertify.log("EL MONTO INGRESADO NO PUEDE SER MENOR A CERO");
            return false;
        }
       }

       
        if ($(txtTotalSoles).val() =='' ) {
            $(txtTotalSoles).val(parseFloat($(hfSolesAplicado).val()).toFixed(2));
            
            
            alertify.log("TIENE QUE INGRESAR UN MONTO ");
            return false;
        }

               var titulos = true;
                    var SOLES = 0;
                    var DOLARES = 0;
                    var PSOLES = '#MainContent_grvDetalleLiquidacion_txtTotalSoles_';
                    var PDOLARES = '#MainContent_grvDetalleLiquidacion_txtTotalDolares_';
                    //SUMA
                    $('#MainContent_grvDetalleLiquidacion > tbody  > tr').each(function(index, tr) { 

                    if (titulos == true) {
                        titulos = false;
                        SOLES = Number($(PSOLES +  index).val());
                        DOLARES = Number($(PDOLARES +  index).val());
                    }
                    else {
//                        PRUEBA
                            if(typeof $(PSOLES +  (index )).val() !=='undefined'){
                                SOLES = Number($(PSOLES +  (index )).val())+SOLES;
                                DOLARES = Number($(PDOLARES +  index).val())+DOLARES;
                        }
                    }
                }); 
                    
                    $('#MainContent_lblSoles').text(SOLES.toFixed(2));
                    $('#MainContent_lblDolares').text(DOLARES.toFixed(2));


      
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ValidarDocumentoFomarles(ControlID) {
    var chkok_grilla = '#' + ControlID;
    var chkSi = '';
    var hfCodTipoDoc = '';
    var FlagNV = 0;

    if ($(chkok_grilla).is(':checked')) {
       $('#MainContent_grvDetalleLiquidacion .detallesart').each(function () {
                    chkSi = '#' + this.id;
                    hfcodtipodoc = chkSi.replace('lblEmision', 'hfcodtipodoc');
                    txtTotalSoles = chkSi.replace('lblEmision', 'txtTotalSoles');
                    txtTotalDolares = chkSi.replace('lblEmision', 'txtTotalDolares');
                    hfSolesAplicado = chkSi.replace('lblEmision', 'hfSaldoSoles');
                    hfDolaresAplicado = chkSi.replace('lblEmision', 'hfSaldoDolares');

                       if ($(hfcodtipodoc).val()==16)
                       {
                       $(txtTotalSoles).val('0');
                       $(txtTotalDolares).val('0');
                       
        $(txtTotalSoles).prop('disabled', true);
        
        $(txtTotalDolares).prop('disabled', true);
                       }
                    
                });
    }
    else {
              
            $('#MainContent_grvDetalleLiquidacion .detallesart').each(function () {
                    chkSi = '#' + this.id;
                    hfcodtipodoc = chkSi.replace('lblEmision', 'hfcodtipodoc');
                    txtTotalSoles = chkSi.replace('lblEmision', 'txtTotalSoles');
                    txtTotalDolares = chkSi.replace('lblEmision', 'txtTotalDolares');
                    hfSolesAplicado = chkSi.replace('lblEmision', 'hfSaldoSoles');
                    hfDolaresAplicado = chkSi.replace('lblEmision', 'hfSaldoDolares');

                       if ($(hfcodtipodoc).val()==16)
                       {
                       $(txtTotalSoles).val($(hfSolesAplicado).val());
                       $(txtTotalDolares).val($(hfDolaresAplicado).val());
                        $(txtTotalSoles).prop('disabled', false);
        
        $(txtTotalDolares).prop('disabled', false);
                       }
                    
                });        
           


        };
        F_ActualizarDetalladoSoles();
        F_ActualizarDetalladoDolares();
}


function F_ReporteIndividualLiquidacion(CodMenu, Fila,CodMedioPago) {
    var imgID = Fila.id;
    var MedioPago = '';

    switch ($('#MainContent_ddlReporte').val()) {
        case 0:
            MedioPago = '';
            break;
             case 1:
            MedioPago = 'Efectivo';
            CodMenu=710;
            break;
        case 2:
            MedioPago = 'Credito';
            break;
        case 3:
            MedioPago = 'Deposito';
             break;
         case 4:
            MedioPago = 'Tarjeta';
             break;
         case 5:
            MedioPago = 'Factura';
             break;
          case 6:
            MedioPago = 'NotaVenta';
             break;
    }

    var hfCodUsuario = '#' + imgID.replace('imgImprimirIndividualLiquidacion' + MedioPago, 'hfCodUsuario');
    var lblCodigo = '#' + imgID.replace('imgImprimirIndividualLiquidacion' + MedioPago, 'lblCodigo');
    var lblFecha = '#' + imgID.replace('imgImprimirIndividualLiquidacion' + MedioPago, 'lblFecha');
    var lblFechaSaldo = '#' + imgID.replace('imgImprimirIndividualLiquidacion' + MedioPago, 'lblFechaSaldo');
    var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';
    var Titulo = "LIQUIDACION DETALLADO";
    var NombreTabla = "CajaChicaDetalle";
    var NombreArchivo = "Web_Reporte_CajaBanco_rptCajaChicaDetalle_Liquidacion.rpt";
    var Mensaje = '';
    if ($(Cuerpo + 'txtDesde').val() == '')
        Cadena = Cadena + '<p></p>' + 'Desde';

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'lblCodigo=' + $(lblCodigo).val() + '&';
//    rptURL = rptURL + 'FechaEmision=' + $(lblFecha).text() + '&';
//    rptURL = rptURL + 'FechaSaldo=' + $(lblFechaSaldo).text() + '&';
//    rptURL = rptURL + 'CodCajaFisica=' + $(hfCodCajaFisica).val() + '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'Mensaje=' + Mensaje + '&';
//    rptURL = rptURL + 'CodMedioPago=' + $('#MainContent_ddlReporte').val() + '&';
//    rptURL = rptURL + 'CodDoc=' + $('#MainContent_ddlDocumento').val() + '&';
//    rptURL = rptURL + 'MedioPago=' + MedioPago + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ValidarLiquidacionaplicar() {

    try {
        var chkSi = '';
        var x = 0;
        var hfCodEstado = '';
        var Cadena = '';
        var y=0;
        var c=0;

        $('#MainContent_grvDetalleLiquidacion .detallesart').each(function () {
            chkSi = '#' + this.id;
            hfcodtipodoc = chkSi.replace('lblEmision', 'hfcodtipodoc');
            txtTotalSoles = chkSi.replace('lblEmision', 'txtTotalSoles');
            txtTotalDolares = chkSi.replace('lblEmision', 'txtTotalDolares');


            if ($(hfcodtipodoc).val()!=16 &&( parseFloat($(txtTotalSoles).val())>0|| parseFloat( $(txtTotalDolares).val())>0)) {
                x = x+1;

            }
            else if ($(hfcodtipodoc).val()==16 &&( parseFloat($(txtTotalSoles).val())>0|| parseFloat( $(txtTotalDolares).val())>0)){
            y=y+1
            }
            c=c+1;
        });

        if (x ==0 && y==0) {
            alertify.log("Debe de colocar cantidad para liquidar");
            return false;
        }
         if (x >0 && y>0) {
            alertify.log("No se pueden juntar pagos formales con Notas de Venta");
            return false;
        }
        

        return true;

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}