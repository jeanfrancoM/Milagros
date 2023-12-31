﻿var AppSession = "../Compras/RegistroGasto.aspx";
var CodigoMenu = 4000; /// EXCLUSIVIDAD DE LA PAGINA
var CodigoInterno = 3; /// EXCLUSIVIDAD DE LA PAGINA

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
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 2 + "'}",
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
                    toastr.warning(response.responseText);
                },
                failure: function (response) {
                    toastr.warning(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodCtaCte').val(i.item.val);
            
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
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
                            Direccion: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    toastr.warning(response.responseText);
                },
                failure: function (response) {
                    toastr.warning(response.responseText);
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
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('#divTabs').tabs();   
    
    $('#MainContent_txtSerie').change(function () {
        try {
            var lg = $('#MainContent_txtSerie').val();
            var Letra = $('#MainContent_txtSerie').val().charAt(0)
            if (lg != "") {
                if (Letra.toString().toUpperCase() == "F" | Letra.toString().toUpperCase() == "E")
                { $('#MainContent_txtSerie').val(Letra + ('00' + $('#MainContent_txtSerie').val().substr(1)).slice(-1 * 3)); }
                else
                { $('#MainContent_txtSerie').val(('0000' + lg).slice(-1 * 4)); }
            }
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
        return false;
    });
    
    $('#MainContent_txtNumero').blur(function () {
        if ($('#MainContent_txtNumero').val() == "")
            return false;

        var id = '00000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 8));
        return false;
    });
    
    $('#MainContent_txtDesde').datepicker({onSelect: function() {
      var date = $(this).datepicker('getDate');
      if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
      }
      }}); 

    $('#MainContent_txtDesde').datepicker({beforeShowDay: function(date) {
      return [date.getDate() == 1, ''];
    }});

    $('#MainContent_imgBuscar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="")
            cadena=cadena + "<p></p>" + "Articulo"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "<p></p>" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "<p></p>" + "Moneda";
              }

              if ( cadena != "Ingresar los sgtes. campos :")
              {
                  toastr.warning(cadena);
                  return false;
              }

              F_Buscar_Productos() 
        }
        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnBuscarFacturaExterno').click(function () {
    if (F_PermisoOpcion(CodigoMenu, 777014, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            F_Obtener_Guia_AlmacenExterno();
            return false;
        }
        catch (e) {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnGrabarEdicion').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            F_EditarTemporal();

            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnAgregarProducto').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
            if (F_PermisoOpcion(CodigoMenu, 777013, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try 
        {
               
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
                
                 var objParams = { };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);


                F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {
//                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

//                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);    
                                
                    $('.ccsestilo').css('background', '#FFFFE0');
                  
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }


        return false;

    });  

    $('#MainContent_btnAgregar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
        if (F_ValidarAgregar()==false)
        return false;

        F_AgregarTemporal();
        F_LimpiarGrillaConsulta();
        $('#MainContent_txtArticulo').focus();
        return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnEliminar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
            if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
            if(F_ValidarEliminar()==false)
              return false;

            if (confirm("Esta seguro de quitar los productos seleccionado"))
            F_EliminarTemporal();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
            if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR EL GASTO"))
            F_GrabarDocumento();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnNuevo').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_Nuevo();
          
          return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnBuscarConsulta').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;

            if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
          F_Buscar();
          return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });
    
    $('#MainContent_txtFechaIngreso').on('change', function (e) {
        $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
    });

    $("#MainContent_txtTotal").blur(function () {

    if ($("#MainContent_txtTotal")=='')
    return false;

        $("#MainContent_txtTotal").val(parseFloat($("#MainContent_txtTotal").val()).toFixed(2));
        $("#MainContent_txtSubTotal").val(parseFloat($("#MainContent_txtTotal").val()/(parseFloat($("#MainContent_ddlIgv option:selected").text())+1)).toFixed(2));
        $("#MainContent_txtIgv").val(parseFloat($("#MainContent_txtTotal").val()-$("#MainContent_txtSubTotal").val()).toFixed(2));
       
        return false;
       
    });

    $("#MainContent_txtTotal").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtDsctoTotal").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
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

    $('.MesAnioPicker').datepicker('setDate', new Date());

    $('#MainContent_txtProveedor').focus();

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtSerie').css('background', '#FFFFE0');

    $('#MainContent_txtDsctoTotal').css('background', '#FFFFE0');

    $('#MainContent_txtCodigosFaltantes').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $('#MainContent_grvConsultaArticulo_txtCantidad').css('background', '#FFFFE0');

    $('#MainContent_grvConsultaArticulo_txtPrecio').css('background', '#FFFFE0');

    F_Controles_Inicializar();

    
    $('#MainContent_btnBuscarArticulo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            MostrarEspera(true);
            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val == "")
                cadena = cadena + "<p></p>" + "Articulo"

            if ($('#MainContent_ddlMoneda option').size() == 0)
            { cadena = cadena + "<p></p>" + "Moneda"; }
            else {
                if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "<p></p>" + "Moneda";
            }

            if (cadena != "Ingresar los sgtes. campos :") {
                MostrarEspera(false);
                toastr.warning(cadena);
                return false;
            }

            F_Buscar_Productos()
        }
        catch (e) {
            MostrarEspera(false);
            toastr.warning("ERROR DETECTADO: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregarProducto').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, 777009, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {

            $('#MainContent_txtArticulo').val('');

            $("#divConsultaArticulo").dialog({
                resizable: false,
                modal: true,
                title: "Consulta de Productos",
                title_html: true,
                height: 500,
                width: 1020,
                autoOpen: false
            });

            $('#divConsultaArticulo').dialog('open');

            $('#MainContent_txtArticulo').focus();

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
                    $('.ccsestilo').css('background', '#FFFFE0');

                }
                else {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

            });


        }
        catch (e) {

            toastr.warning("ERROR DETECTADO: " + e);
        }


        return false;

    });
    
    F_Derecha();
//    $("#divSeleccionarEmpresa").dialog({
//        resizable: false,
//        modal: true,
//        title: "Empresas",
//        title_html: true,
//        height: 300,
//        width: 420,
//        autoOpen: false,
//        closeOnEscape: false,
//        open: function (event, ui) {
//            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
//        }
//    });

//    $('#divSeleccionarEmpresa').dialog('open');
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

function F_Prueba(){

           if ($('#MainContent_chkSinIgv').is(':checked'))
               $('#MainContent_chKConIgv').prop('checked', false);
           else
               $('#MainContent_chKConIgv').prop('checked', true);
return false;
}    
     
function F_ValidarCheckSinIgv(ControlID) {

   var chkok_grilla='';

            chkok_grilla = '#' + ControlID;
           
           if ($(chkok_grilla).is(':checked'))
               $('#MainContent_chkSinIgv').prop('checked', false);
           else
               $('#MainContent_chkSinIgv').prop('checked', true);
         
   return false;
}

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']",function () {
     F_FormaPago($("#MainContent_ddlFormaPago").val());
} );

function F_ElegirEmpresa(Fila) {
       MostrarEspera(true);
       var imgID = Fila.id;
       var hfCodEmpresa_Grilla = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
       var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');

       $('#hfCodEmpresa').val($(hfCodEmpresa_Grilla).val());
       $('#hfCodAlmacen').val($(ddlSede).val());
       $('#divSeleccionarEmpresa').dialog('close');
       MostrarEspera(false);
}

function F_ElegirEmpresa2() {
       $('#hfCodEmpresa').val($('#MainContent_hdnCodEmpresa').val());
       $('#hfCodAlmacen').val($('#hfCodEmpresa').val());
//       $('#divSeleccionarEmpresa').dialog('close');
}

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val()
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
                    if (str_resultado_operacion == "1") 
                    {
                        F_Update_Division_HTML('div_formapago', result.split('~')[2]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[3]);
                        $('#MainContent_lblTC').text(result.split('~')[4]);
                        F_Update_Division_HTML('div_igv', result.split('~')[5]);
                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[6]);
                        F_Update_Division_HTML('div_clasificacion', result.split('~')[7]);
                        F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[8]);
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[9]);
                        $('#MainContent_ddlClasificacion').val(5);
                        $('#MainContent_ddlTipoDocumento').val(1);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlFormaPago').val(1);
                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddlClasificacion').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                         $('.ccsestilo').css('background', '#FFFFE0');
                        if ($('#MainContent_hdnCodEmpresa').val() != '')
                            F_ElegirEmpresa2();                    
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

function F_Buscar_Productos() {

    var arg;
    var CodTipoProducto='2';
    try {
        var objParams =
            {
                Filtro_DscProducto: $('#MainContent_txtArticulo').val(),
                Filtro_CodTipoProducto: CodTipoProducto,
                Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
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
                        $('.ccsestilo').css('background', '#FFFFE0');  
                    }
                    else {
                    MostrarEspera(false);
                        toastr.warning(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        toastr.warning("Error detectado: " + mierror);

    }

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

             switch ($(ddlLista_Grilla).val()) 
             {
              case "1":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio1');
                        $(txtprecio_grilla).val($(lblprecio).text());
                       $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;

              case "2":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio2');
                        $(txtprecio_grilla).val($(lblprecio).text());
                         $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;
              case "3":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio3');
                        $(txtprecio_grilla).val($(lblprecio).text());
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

function F_ValidarCheck(ControlID) {
    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    var cadena = 'Ingrese los sgtes. campos: '

    chkok_grilla = '#' + ControlID;
    txtprecio_grilla = chkok_grilla.replace('chkOK', 'txtPrecioLibre');
    txtcant_grilla = chkok_grilla.replace('chkOK', 'txtCantidad');
    ddlLista_grilla = chkok_grilla.replace('chkOK', 'ddlLista');

    if ($(chkok_grilla).is(':checked')) {
        $(txtcant_grilla).prop('disabled', false);
        var i = 0;
        if ($(txtcant_grilla).val() == "") {
            $(txtcant_grilla).focus();
            i = 1;
        }
        if (i == 0 && $(txtprecio_grilla).val() == "")
            $(txtcant_grilla).focus();
    }
    else {
        $(txtprecio_Grilla).val('');
        $(txtcant_grilla).val('');
    }
    return true;
}

function F_FormaPago(CodFormaPago) {
 var arg;
    try 
    {
     switch (CodFormaPago)
     {
             case "1":
             case "12":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),0));
                       break;

            case "3":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),30));
                       break;

            case "4":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),15));
                       break;

            case "8":
               $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),45));
               break;

            case "9":
               $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),60));
               break;

                case "11":
               $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));
               break;
     }

     
    }
     catch (mierror) 
     {
        toastr.warning("Error detectado: " + mierror);
     }

}

function F_MostrarTotales() {
    var lblImporte = '';
    var chkDel = '';
    var Total = 0;
    var Igv = 0;
    var Subtotal = 0;
    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        chkDel = '#' + this.id;
        lblImporte = chkDel.replace('chkEliminar', 'lblImporte');
        Total += parseFloat($(lblImporte).text());
    });
    var Cuerpo = '#MainContent_'
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    recalcularmontos();
}

function F_ValidarGrabarDocumento(){
    try 
        {
        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>'; 

        if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
                Cadena=Cadena + '<p></p>' + 'Proveedor';
        
        if ($(Cuerpo + 'lblTC').text()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtSerie').val()=='')
                Cadena=Cadena + '<p></p>' + 'Serie de Factura';

        if ($(Cuerpo + 'txtNumero').val()=='')
                Cadena=Cadena + '<p></p>' + 'Numero de Factura';

        if ($(Cuerpo + 'txtEmision').val()=='')
                Cadena=Cadena + '<p></p>' + 'Fecha de Emision';

        if ($(Cuerpo + 'txtPeriodo').val()=='')
                Cadena=Cadena + '<p></p>' + 'Periodo Contable';

         if ($(Cuerpo + 'txtTotal').val()=='' | $(Cuerpo + 'txtTotal').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'Total';

        if ($(Cuerpo + 'txtSubTotal').val()=='' | $(Cuerpo + 'txtSubTotal').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'SubTotal';

        if ($(Cuerpo + 'txtIgv').val()=='' | $(Cuerpo + 'txtIgv').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'Igv';

        if ($(Cuerpo + 'txtDsctoTotal').val()=='')
                Cadena=Cadena + '<p></p>' + 'Descuento';

        if ($(Cuerpo + 'txtCodigosFaltantes').val()!='')
            if (confirm("HAY CODIGOS FALTANTES EN LCDP PERO QUE ESTÁN EN LA FT/PF DE COMPRA, ¿DESEA GRABAR CON ESOS FALTANTES?")) 
            { }
            else
                Cadena=Cadena + '<p></p>' + 'Codigos Faltantes';
                

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>')
        {toastr.warning(Cadena);
        return false;}
        return true;
        }        
    catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
}

function F_GrabarDocumento(){
  try 
        {    
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var FlagGuia='0';
        var NotaPedido='0';
        var Contenedor = '#MainContent_';          
        var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

                var objParams = {
                                        Filtro_CodEmpresa:    $('#hfCodEmpresa').val(),
                                        Filtro_CodAlmacen:    $('#hfCodAlmacen').val(),
                                        Filtro_CodTipoDoc:    $(Contenedor + 'ddlTipoDocumento').val(),
                                        Filtro_SerieDocSust:  $(Contenedor + 'txtSerie').val(),
                                        Filtro_CodTipoDoc:    $(Contenedor + 'ddlTipoDocumento').val(),
                                        Filtro_SerieDocSust:  $(Contenedor + 'txtSerie').val(),
                                        Filtro_NumeroDocSust: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaIngreso:  $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodMoneda:     $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_ImpSubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_ImpIGV: $(Contenedor + 'txtIgv').val(),
                                        Filtro_ImpTotal: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_Descuento: $(Contenedor + 'txtDsctoTotal').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgv').val() ,
                                        Filtro_Periodo: $(Contenedor + 'txtPeriodo').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_CodCategoria: $(Contenedor + 'ddlClasificacion').val() ,
                                        Filtro_CodClasificacion: 1,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_CodFacturaAnterior: $('#hfCodFacturaAnterior').val(),
                                        Filtro_CodCajaFisica: $(Contenedor + 'ddlCajaFisica').val()
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_GrabarDocumento_NET(arg, function (result) {
                
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                    
                 $('.ccsestilo').css('background', '#FFFFE0');
                if (str_resultado_operacion == "1") 
                {
                  
                    if (str_mensaje_operacion=='SE GRABO CORRECTAMENTE'){
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    F_Nuevo();
                    $('.ccsestilo').css('background', '#FFFFE0');
                    toastr.success('Se grabo correctamente');
                     }else{
                      toastr.warning(result.split('~')[1]);
                    }
                    
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }
}

function F_Nuevo(){
       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());
       $('.MesAnioPicker').datepicker($.datepicker.regional['es']);
       $('.MesAnioPicker').datepicker('setDate', new Date());
       $('#MainContent_ddlMoneda').val(1);
       $('#MainContent_ddlFormaPago').val(1);
       $('#MainContent_ddlTipoDocumento').val(1);
       $('#hfCodigoTemporal').val('0');
       $('#hfCodCtaCte').val('0');
       $('#MainContent_txtProveedor').val('');
       $('#MainContent_txtSubTotal').val('0.00');
       $('#MainContent_txtIgv').val('0.00');
       $('#MainContent_txtTotal').val('0.00');
       $('#MainContent_txtSerie').val('');
       $('#MainContent_txtNumero').val('');
       $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
       $('#MainContent_txtArticulo').val('');
       $('#MainContent_txtCodigosFaltantes').val('');
       $('#hfCodFacturaAnterior').val('0');
       $('#MainContent_txtProveedor').focus();

       $('.ccsestilo').css('background', '#FFFFE0');
        $('#MainContent_grvDetalleArticulo_txtCantidad_0').css('background', '#FFFFE0');
        $('#MainContent_grvDetalleArticulo_txtCantidad_0').css('background', '#FFFFE0');

       return true;
}

function F_Buscar(){

       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';
              
              var objParams = {
                                        Filtro_CodEmpresa:     $('#hfCodEmpresa').val(),
                                        Filtro_CodAlmacen:     $('#hfCodAlmacen').val(),
                                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                        Filtro_ChkNumero: chkNumero,
                                        Filtro_ChkFecha: chkFecha,
                                        Filtro_CodClasificacion: 1,
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

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]); 
                    $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta",'lblcodigo'));   
                    if (str_mensaje_operacion!='')                        
                    toastr.warning(str_mensaje_operacion);
                  
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }

}

function F_AnularRegistro(Fila) {
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
 try 
        {
    var imgID          = Fila.id;
    var lblCodMarcaGv     = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
    var lblestado_grilla  = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
    var lblnumero_grilla  = '#' + imgID.replace('imgAnularDocumento', 'lblnumero');
    var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');

    if ($(lblestado_grilla).text()!="PENDIENTE") 
    {toastr.warning ("ESTE DOCUMENTO TIENE UNA PAGO REGISTRADO,PRIMERO ELIMINE EL PAGO");
    return false;}

    if(!confirm("ESTA SEGURO DE ANULAR EL DOCUMENTO : " + $(lblnumero_grilla).text() + "\nDEL PROVEEDOR : " +  $(lblcliente_grilla).text().toUpperCase()))
    return false;
     var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

    var objParams = {
                          Filtro_CodEmpresa:     $('#hfCodEmpresa').val(),
                          Filtro_CodAlmacen:     $('#hfCodAlmacen').val(),
                          Filtro_Codigo: $(lblCodMarcaGv).text(),
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDoc: 1,
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_CodClasificacion: 1,
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
                toastr.success(result.split('~')[1]);
        }
        else {
             toastr.warning(result.split('~')[1]);
        }

        return false;
    });

            }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
            return false;
        }

 
}

function getContentTab(){

    var date = new Date();
    date.setMonth(date.getMonth(), 1);
 
    $('#MainContent_txtDesde').val(date.format("dd/MM/yyyy"));
    $('#MainContent_ddlSerieConsulta').val('0');
    $('#MainContent_chkRango').prop('checked',true);
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
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

function F_EditarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';

        var Contenedor = '#MainContent_';

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);


                  var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

        var objParams = {
                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                        Filtro_ChkNumero: chkNumero,
                        Filtro_ChkFecha: chkFecha,
                        Filtro_ChkCliente: chkCliente,
                        Filtro_Periodo: $('#MainContent_txtPeriodoConsulta').val(),
                        Filtro_CodMovimiento: $('#hfCodDocumentoVenta').val(),
                        Filtro_CodClasificacion: 9,
                        Filtro_CodTipoDocSust: 1
                                    
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_EditarTemporal_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
          
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);    
                    if (str_mensaje_operacion!='')                        
                    toastr.warning(str_mensaje_operacion);
                $('#div_Mantenimiento').dialog('close');
            }
            else {
                toastr.warning(result.split('~')[2]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
    }
}

function F_TipoCambio(){
    try 
        {
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

                if (str_resultado_operacion == "1") 
                    $('#MainContent_lblTC').text(result.split('~')[2]);
                else 
                    toastr.warning(result.split('~')[1]);
                
                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }

}

function F_EditarRegistro(Fila) {

    try {
        var Contenedor = '#MainContent_';
            
        $("#div_Mantenimiento").dialog({
            resizable: false,
            modal: true,
            title: "Edicion Registro",
            title_html: true,
            height: 120,
            width: 300,
            autoOpen: false
        });

        var imgID = Fila.id;

        var lblPeriodo = '#' + imgID.replace('imgEditarRegistro', 'lblPeriodo');
        var lblCodigo = '#' + imgID.replace('imgEditarRegistro', 'lblcodigo');
        
        $(Contenedor + 'txtPeriodoConsulta').val($(lblPeriodo).text());
        $('#hfCodDocumentoVenta').val($(lblCodigo).text());

        $('#div_Mantenimiento').dialog('open');

        return false;


    }

    catch (e) {

        toastr.warning("Error Detectado: " + e);
        return false;
    }

}

function F_Obtener_Guia_AlmacenExterno() {

    try {    
                

            var objParams = {
                Filtro_CodProveedor: $('#MainContent_ddlMoneda').val(),
                Filtro_CodTipoDoc: $('#MainContent_ddlTipoDocumento').val(),
                Filtro_SerieDoc: $('#MainContent_txtSerie').val(),
                Filtro_NumeroDoc: $('#MainContent_txtNumero').val(),
                Filtro_FechaEmision: $('#MainContent_txtEmision').val(),
                Filtro_Vencimiento: $('#MainContent_txtEmision').val(),
                Filtro_CodCliente: $('#hfCodCtaCte').val(),
                Filtro_CodFormaPago: 1,
                Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                Filtro_TipoCambio: $('#MainContent_lblTC').text(),
                Filtro_SubTotal: 0,
                Filtro_CodProforma: 0,
                Filtro_Igv: 0,
                Filtro_Total: 0,
                Filtro_CodTraslado: 0,
                Filtro_Descuento: 0,
                Filtro_TasaIgv: 1.18,
                Filtro_TasaIgvDscto: 0,
                Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                Filtro_CodAlmacenFisicoDesde: $('#MainContent_ddlPartida').val(),
                Filtro_CodAlmacenFisicoHasta: $('#MainContent_ddlDestino').val(),
                Filtro_FlagFormulario: 1,
            };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporal_GuiaExterna_NET(arg, function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    $('#MainContent_ddlMoneda').val(result.split('~')[13]);
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    $('#MainContent_txtCodigosFaltantes').val(result.split('~')[14]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                        toastr.warning('Los Producto(s) se han agregado con exito');
                      $('#hfCodProductoAgregar').val('0');
                    $('#hfCostoAgregar').val('0');
                    $('#hfCodUmAgregar').val('0');
                    $('#MainContent_txtCodigoProductoAgregar').val('');
                    $('#MainContent_txtStockAgregar').val('');
                    $('#MainContent_txtUMAgregar').val('');
                    $('#MainContent_txtPrecioDisplay').val('0.00');
                    $('#MainContent_ddlPrecio').empty();
                    $('#MainContent_txtArticuloAgregar').val('');
                    $('#MainContent_txtCantidad').val('');
                    $("#hfMenorPrecioAgregar").val(0);


                    if (result.split('~')[11] === "0") {
                        toastr.warning("EL PROVEEDOR NO FUE ENCONTRADO EN ESTA BASE DE DATOS, AGREGUELO MANUALMENTE");

                        $('.ccsestilo').css('background', '#FFFFE0');     
                        //F_LimpiarGrillaConsulta();
                        $('#MainContent_txtArticulo').focus();

                    } else {

                        $('#hfCodCtaCte').val(result.split('~')[11]);
                        $('#hfProveedor').val(result.split('~')[12]);
                        $('#MainContent_txtNroRuc').val(result.split('~')[10]);
                        $('#MainContent_txtProveedor').val(result.split('~')[12]);
                        //F_BuscarDireccionesCliente();

                        $('.ccsestilo').css('background', '#FFFFE0');     
                        //F_LimpiarGrillaConsulta();
                        $('#MainContent_txtArticulo').focus();                    
                    }


                    $('#hfRemoto').val(1);





                }
                else 
                {
                    MostrarEspera(false);
                    toastr.warning(result.split('~')[2]);
                    return false;
                }

                return true;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            
        }




return true;
};

function F_EliminarTemporal(){
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var hfCodDetalle='';        
               
                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    hfCodDetalle = chkSi.replace('chkEliminar', 'hfCodDetalle');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(hfCodDetalle).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
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

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtMonto').val(result.split('~')[6]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');  
                    if (result.split('~')[2]=='Se han eliminado los productos correctamente.')
                    toastr.success('Se han eliminado los productos correctamente.');
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
}

function F_ValidarEliminar(){

 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione un articulo para eliminar");
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
}

function imgMas_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));        
//        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
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
                    cadena = cadena + "<p></p>" + "Precio para el Codigo " + $(lblcodproducto_grilla).text();

                if ($(txtcantidad_grilla).val() == '')
                    cadena = cadena + "<p></p>" + "Cantidad para el Codigo " + $(lblcodproducto_grilla).text();

                x = 1;
            }
        });

        if (x == 0)
            cadena = "No ha seleccionado ningun producto";

        if (cadena != "Ingrese los sgtes. campos: ") {
            toastr.warning(cadena);
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
                            cadena = cadena + "<p></p>" + $(lbldscproducto_grilla).text();
                        }

                    });
                }
            });
        }

        if (cadena != "Los sgtes. productos se encuentran agregados : ") {
            if (cadena == "Los sgtes. productos se encuentran agregados : <p></p>")
                return true;

            toastr.warningyfi.standard(cadena);
            //toastr.warning(cadena);
            return false;
        }
        else {
            return true;
        }
    }
    catch (e) {
        toastr.warning("ERROR DETECTADO: " + e);
    }
}

function F_AgregarTemporal2() {
    try {
        var hfCodProducto = '';
        var lblcodunidadventa_grilla = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtcantidad_grilla = '';
        var txtPrecioLibre = '';
        var lblProducto = '';
        var arrDetalle = new Array();
        var hfCodUnidadVenta = '';
        var hfCosto = '';
        var Contenedor = '#MainContent_';
        var tasaigv = 1;
        var FlagIgv = 0;

        //if ($('#MainContent_chkConIgvMaestro').is(':checked')) {
            tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
            FlagIgv = 1;
        //}

        $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
            chkSi = '#' + this.id;
            hfCodArticulo = chkSi.replace('chkOK', 'hfCodArticulo');
            hfCodUnidadVenta = chkSi.replace('chkOK', 'hfCodUnidadVenta');
            txtPrecioLibre = chkSi.replace('chkOK', 'txtPrecioLibre');
            txtCantidad = chkSi.replace('chkOK', 'txtCantidad');
            hfCodUnidadVenta = chkSi.replace('chkOK', 'hfCodUnidadVenta');
            hfCosto = chkSi.replace('chkOK', 'hfCosto');
            hfCodProducto = chkSi.replace('chkOK', 'hfCodProducto');
            lblProducto = chkSi.replace('chkOK', 'lblProducto');

            if ($(chkSi).is(':checked')) {
                ctrlPosActual = chkSi; //asigno el control actual donde se volvera a posicionar
                var objDetalle = {
                    CodArticulo: $(hfCodProducto).val(),
                    Cantidad: $(txtCantidad).val(),
                    Precio: parseFloat($(txtPrecioLibre).val()) / parseFloat(tasaigv),
                    PrecioDscto: parseFloat($(txtPrecioLibre).val()) / parseFloat(tasaigv),
                    Costo: $(hfCosto).val(),
                    CodUm: $(hfCodUnidadVenta).val(),
                    Dscto: 0,
                    Descripcion: $(lblProducto).text(),
                    CodDetalle: 0,
                    Fecha: null
                };
                arrDetalle.push(objDetalle);
            }
        });

        var objParams = {
            Filtro_CodTipoDoc: "2",
            Filtro_SerieDoc: $(Contenedor + 'txtSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: "0",
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodGuia: "0",
            Filtro_Descuento: "0",
            Filtro_TasaIgv: tasaigv,
            Filtro_FlagIgv: FlagIgv,
            Filtro_TasaIgvDscto: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_AgregarTemporal_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtMonto').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#hfImporte').val(result.split('~')[7]);
                $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);

                //F_RecalcularDescuento(result.split('~')[7], $('#MainContent_txtDescuento').val());

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                
                $('.ccsestilo').css('background', '#FFFFE0');

                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    toastr.success('Los Producto(s) se han agregado con exito');


                $('#MainContent_chkDescripcion').focus();

                 numerar();
            }
            else {
                MostrarEspera(false);
                toastr.warning(result.split('~')[2]);
            }
            //F_ContarRegistros();
            return false;
        });
    }

    catch (e) {
        MostrarEspera(false);
        toastr.warning("ERROR DETECTADO: " + e);

    }
}

function F_AgregarTemporal(){
try 
        {    
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var chkgra='#MainContent_chkGratuito';
        var txtcantidad_grilla='';
        var txtPrecio = '';
        var txtdscto_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var lblProducto='';
        var Contenedor = '#MainContent_';
        var tasaigv;
                                   
          if ($('#MainContent_chKConIgv').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
          else
                 tasaigv=1;
                        
                $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'hfCodProducto');
                    txtPrecio = chkSi.replace('chkOK', 'txtPrecio');
                    txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                    lblProducto = chkSi.replace('chkOK', 'hfDescripcion');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(lblcodproducto_grilla).val(),
                        Descripcion: $(lblProducto).val().replace("&", "&amp;"),
                        Cantidad: $(txtcantidad_grilla).val(),

                        Precio: $(txtPrecio).val() / tasaigv,
                        PrecioDscto: $(txtPrecio).val() / tasaigv,
                        Costo: 0,
                        CodUm: 0,
                        CodDetalle: 0,
                        Acuenta: 0,
                        CodTipoDoc:0

                        };                                               
                        arrDetalle.push(objDetalle);
                        //limpio los controles de cantidad y tipo y los vuelvo a bloquear
                        $(chkSi.replace('chkOK','txtCantidad')).val('');
                        $(chkSi.replace('chkOK','txtCantidad')).prop('disabled', true);
                        $(chkSi.replace('chkOK','txtPrecio')).val('');
                        $(chkSi.replace('chkOK','txtPrecio')).prop('disabled', true);
                    }
                });

                var objParams = {
                                        Filtro_CodTipoDoc: "2",
                                        Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodCliente: 119,
                                        Filtro_CodFormaPago: 1,
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_SubTotal: 0,
                                        Filtro_CodProforma: 0,
                                        Filtro_Igv: 0,
                                        Filtro_Total: 0,
                                        Filtro_CodTraslado: 0,
                                        Filtro_Descuento: 0,
                                        Filtro_TasaIgv: 1.18,
                                        Filtro_TasaIgvDscto: 0,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_CodAlmacenFisicoDesde: $('#MainContent_ddlPartida').val(),
                                        Filtro_CodAlmacenFisicoHasta: $('#MainContent_ddlDestino').val(),
                                        Filtro_FlagFormulario: 1,
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporal_NET(arg, function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('#hfIgv').val(result.split('~')[6]);
                    $('#hfSubtotal').val(result.split('~')[7]);

                    if ($(chkgra).is(':checked')){
                     $('#MainContent_txtIgv').val('0');
                    $('#MainContent_txtSubTotal').val('0');
                    }else {
                     $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    }
                   


                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                        toastr.success('Los Producto(s) se han agregado con exito');
                        numerar();

                    $('#MainContent_txtArticulo').val('');
                    $('#MainContent_chkDescripcion').focus();
                    $('.ccsestilo').css('background', '#FFFFE0');     
                    F_LimpiarGrillaConsulta();
                    $('#MainContent_txtArticulo').focus();
                   // F_ContarRegistros();
                }
                else 
                {
                    MostrarEspera(false);
                    toastr.warning(result.split('~')[2]);
                    return false;
                }

                return true;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            
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

function F_ActualizarCantidad(Fila) {
    try {
        var txt = '#' + Fila;
        var txtPrecio = '';
        var lblImporte = '';
        var lblimporte2 = '';
        var txtCantidad = '';
        var txtDescripcion = '';
        var codDetalle = '';
        var PrecioOriginal = 0;
        var Precio = 0;

        if (txt.indexOf('txtCantidad') > -1) {
            txtPrecio = txt.replace('txtCantidad', 'txtPrecio');
            lblImporte = txt.replace('txtCantidad', 'lblImporte');
            txtCantidad = txt;
            txtDescripcion = Fila.replace('txtCantidad', 'txtDescripcion');
            CodDetalle = Fila.replace('txtCantidad', 'hfCodDetalle');
            PrecioOriginal = Number($(txt.replace('txtCantidad', 'hfPrecioOriginal')).val());
            Precio = Number($(txt.replace('txtCantidad', 'hfPrecio')).val());
        } else {
            txtCantidad = txt.replace('txtPrecio', 'txtCantidad');
            lblImporte = txt.replace('txtPrecio', 'lblImporte');
            txtPrecio = txt;
            txtDescripcion = Fila.replace('txtPrecio', 'txtDescripcion');
            CodDetalle = Fila.replace('txtPrecio', 'hfCodDetalle');
            PrecioOriginal = Number($(txt.replace('txtPrecio', 'hfPrecioOriginal')).val());
            Precio = Number($(txt.replace('txtPrecio', 'hfPrecio')).val());
        }

        $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
        $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));


        var PrecioNuevo = Number($(txtPrecio).val());

//        if (FlagAdministrador != 1)
//        {        
//            if (PrecioNuevo < PrecioOriginal)
//            {
//                $(txtPrecio).val(PrecioOriginal);
//                toastr.warning('LOS PRECIOS NO PUEDEN SER DISMINUIDOS');
//            }
//        }
        var chkSi ='';
        var pre = Number($(txtPrecio).val());
        var can = Number($(txtCantidad).val()); 
        var imp = (pre * can).toFixed(2);;

        $(lblImporte).text(imp);
        var impt = 0;
        

//   $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
//            chkSi = '#' + this.id;
//            lblimporte2 = chkSi.replace('chkEliminar', 'lblImporte');
//            impt+=parseFloat($(lblimporte2).text());  
//        });


        $("#MainContent_txtTotal").val(impt.toFixed(2));
        recalcularmontos();
        cambiaracuenta();


        //Actualizacion de datos en la tabla temporal

         var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        MostrarEspera(true);
        var objParams = {
            Filtro_CodDocumentoVenta: $("#hfCodigoTemporal").val(),
            Filtro_CodDetalle: $('#' + CodDetalle).val(),
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_Precio: $(txtPrecio).val(),
            Filtro_Descripcion: $('#' + txtDescripcion).val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0
        };
        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        //eliminacion del temporal en base de datos
        F_ActualizarPrecioNP_Net(arg, function (result) {
            MostrarEspera(false);       
               F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                $('.ccsestilo').css('background', '#FFFFE0');   
                   $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                     chkSi = '#' + this.id;
                     lblimporte2 = chkSi.replace('chkEliminar', 'lblImporte');
                     impt+=parseFloat($(lblimporte2).text());  
                 });
                $('#MainContent_txtTotal').val(parseFloat(impt).toFixed(2));
                $('#MainContent_txtIgv').val(parseFloat((impt/parseFloat(parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1)))*parseFloat($("#MainContent_ddlIgv option:selected").text())).toFixed(2));
                $('#MainContent_txtSubTotal').val(parseFloat(impt/parseFloat(parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1))).toFixed(2));
                    
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
        return false;
    }
}

function recalcularmontos() {
    var tasaigv = parseFloat($("#MainContent_txtValIgv").val());
    tasaigv = tasaigv == 0 || tasaigv == undefined || isNaN(tasaigv) ? parseFloat($("#MainContent_ddlIgv option:selected").text()) : tasaigv;
    var importe = Number($("#MainContent_txtTotal").val());
    var subtotal = importe / (1 + tasaigv);
    var igv = importe - subtotal;
    $("#MainContent_txtIgv").val(igv.toFixed(2));
    $("#MainContent_txtSubTotal").val(subtotal.toFixed(2));
}

function cambiaracuenta() {

    var acuenta = Number($("#MainContent_txtAcuenta").val());

    var tot = Number($("#MainContent_txtTotal").val()) - Number($("#MainContent_lblAcuentaNv").text());

    if (!(tot > acuenta) && $('#MainContent_ddlFormaPago').val() != '1') {
        toastr.warning("El acuenta debe ser menor que el importe total.");
        return false;
    }

    if (acuenta > 0) {
        $(".csimp").each(function () {
            var imp = Number($(this).text());
            var id = "#" + this.id;
            id = id.replace("lblImporte", "hfAcuenta");
            var idnv = id.replace("lblAcuenta", "hdnAcuentaNv");
            imp = imp - Number($(idnv).val());

            var ac = 0;
            if (acuenta > imp) {
                ac = imp;
                acuenta -= imp;
            } else {
                ac = acuenta;
                acuenta = 0;
            }
            $(id).text(ac.toFixed(2));
        });
    } else {
        $(".csimp").each(function () {
            var id = "#" + this.id;
            id = id.replace("lblImporte", "hfAcuenta");
            $(id).text("0.00");
        });
    }
    return false;
}

function F_ReemplazarDocumento(Fila) {
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            var imgID = Fila.id;
            var hfID = '#' + imgID.replace('imgReemplazar', 'hfID');
            var lblEstado = '#' + imgID.replace('imgReemplazar', 'lblEstado');
            var lblTipoDoc = '#' + imgID.replace('imgReemplazar', 'hfCodTipoDoc');

            if ($(lblEstado).text() == 'ANULADO')
            {
                toastr.warning('EL DOCUMENTO DEBE ESTAR PEDIENTE');
                return false;
            }


            var objParams = {
                Filtro_CodMovimiento: $(hfID).val(),
                Filtro_CodTipoDoc: $(lblTipoDoc).val(),
                Filtro_TasaIgv: 1
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_ReemplazarFactura_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = result.split('~')[0];
                var str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {

//                                Convert.ToString(int_resultado_operacion) + "~" + //0
//                str_mensaje_operacion + "~" + //1
//                Codigo.ToString() + "~" + //2
//                str_grvDetalleArticulo_html + "~" + //3
//                CodFacturaAnterior.ToString() + "~" + //4
//                SerieDoc + "~" + //5
//                NumeroDoc + "~" + //6
//                CodTipoDoc + "~" + //7
//                FechaEmision + "~" + //8
//                FechaVencimiento + "~" + //9
//                Periodo + "~" + //10
//                CodCtaCte + "~" + //11
//                Proveedor; //12

                    $('#hfCodigoTemporal').val(result.split('~')[2]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[3]);
                    $('#hfCodFacturaAnterior').val(result.split('~')[4]);                    
                    $('#MainContent_txtSerie').val(result.split('~')[5]);
                    $('#MainContent_txtNumero').val(result.split('~')[6]);
                    $('#MainContent_ddlTipoDocumento').val(result.split('~')[7]);
                    $('#MainContent_txtEmision').val(result.split('~')[8]);  
                    $('#MainContent_txtVencimiento').val(result.split('~')[9]);  
                    $('#MainContent_txtPeriodo').val(result.split('~')[10]);                
                    $('#hfCodCtaCte').val(result.split('~')[11]);  
                    $('#MainContent_txtProveedor').val(result.split('~')[12]);  
                    $('#MainContent_ddlMoneda').val(result.split('~')[13]);  
                    $('#MainContent_txtSubTotal').val(result.split('~')[14]); 
                    $('#MainContent_txtIgv').val(result.split('~')[15]); 
                    $('#MainContent_txtTotal').val(result.split('~')[16]); 
                     $('#MainContent_txtDsctoTotal').val(result.split('~')[17]);
//                    F_MostrarTotales();
                    $('.ccsestilo').css('background', '#FFFFE0');
                    $("#divTabs").tabs("option", "active", $("#liRegistro").index());
                }
                else {
                    alert(result.split('~')[1]);
                    return false;
                }
                return false;
            });
        }
        catch (e) {
            MostrarEspera(false);
            alert("Error Detectado: " + e);
            return false;
        }
    }

    function numerar() {
    var c = 0;
    $('.detallesart2').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblNumRegistros").text(c);
}

function imgMasObservacion_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Observacion(grid.attr('id'));        
//        $(Control).attr('src', '../Asset/images/minus.gif');
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
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'hfID')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleObservacion_' + Col;
        Hfgv = '#' + Fila.replace('pnlOrdersObservacion', 'hfDetalleCargadoObservacion');

        if ($(Hfgv).val() === "1") {
            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');
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

//                MostrarEspera(true);
$(Ctlgv).attr('src', '../Asset/images/loading.gif');
                F_Observacion_NET(arg, function (result) {
                $(Ctlgv).attr('src', '../Asset/images/minus.gif');
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

function F_LlenarGridDetalle(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvConsulta_pnlOrders_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlOrders', 'hfID')).val();
                var grvNombre = 'MainContent_grvConsulta_grvDetalle_' + Col;
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
                            Filtro_CodTipoDoc: 15,
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

//                        MostrarEspera(true);
$(Ctlgv).attr('src', '../Asset/images/loading.gif');
                        F_LlenarGridDetalle_NET(arg, function (result) {
                $(Ctlgv).attr('src', '../Asset/images/minus.gif');
//                        MostrarEspera(false);

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                            $(Hfgv).val('1');
                        }
                        else
                        {
                            toastr.warning(str_mensaje_operacion);
                        }

                        return false;

                        });
        
                }

                }

        }
        catch (e) 
        {
              MostrarEspera(false);
            toastr.warning("ERROR DETECTADO: " + e);
            return false;
        }

        return true;
}


function F_ValidarGratuito(ControlID) {
    
                    if ($('#MainContent_chkGratuito').is(':checked')){
                     $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                    }else {
                     $('#MainContent_txtIgv').val($('#hfIgv').val());
                    $('#MainContent_txtSubTotal').val($('#hfSubtotal').val());
                    }
return true;
}