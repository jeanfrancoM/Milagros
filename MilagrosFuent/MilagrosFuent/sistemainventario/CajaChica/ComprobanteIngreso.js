﻿var AppSession = "../CajaChica/ComprobanteIngreso.aspx";

var CodigoMenu = 7000;
var CodigoInterno = 1;

var CodCajaFisica = 0;
var P_CodMoneda_Inicial;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtNroRuc').autocomplete(
   
    {
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'0','CodTipoCliente':'" + 0 + "'}",
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
                            NroRuc: item.split(',')[8],
                            ApePaterno: item.split(',')[9],
                            ApeMaterno: item.split(',')[10],
                            Nombres: item.split(',')[11],
                            Cliente: item.split(',')[1],
                            SaldoCreditoFavor: item.split(',')[12],
                            CodDireccion: item.split(',')[14]
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
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);
            $('#hfNroRuc').val(i.item.NroRuc);
            $('#hfCodCtaCte').val(i.item.val);
            $('#hfCliente').val(i.item.label);
            $('#MainContent_txtProveedor').val(i.item.label);
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);
            $('#MainContent_txtDireccion').val(i.item.Direccion);
            $('#hfDireccion').val(i.item.Direccion);
            $('#MainContent_txtDistrito').val(i.item.Distrito.trim());
            $('#hfCodDireccion').val('0');
            $('#hfCodDireccionDefecto').val(i.item.CodDireccion);
            $('#hfCodDepartamento').val(i.item.CodDepartamento);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
            $('#hfDistrito').val(i.item.Distrito.trim());
            F_BuscarDireccionesCliente();
        },
        complete: function () {
            $('#MainContent_txtNroRuc').val($('#hfNroRuc').val());
            $('#MainContent_txtProveedor').focus();
        },
        minLength: 3
    });

        $('#MainContent_txtProveedorEdicion').autocomplete(
   
    {
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'0','CodTipoCliente':'" + 0 + "'}",
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
                            NroRuc: item.split(',')[8],
                            ApePaterno: item.split(',')[9],
                            ApeMaterno: item.split(',')[10],
                            Nombres: item.split(',')[11],
                            Cliente: item.split(',')[1],
                            SaldoCreditoFavor: item.split(',')[12],
                            CodDireccion: item.split(',')[14]
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
           
            $('#hfNroRuc').val(i.item.NroRuc);
            $('#hfCodCtaCte').val(i.item.val);
            $('#hfCliente').val(i.item.label);
            
        },
        complete: function () {
            $('#MainContent_txtNroRuc').val($('#hfNroRuc').val());
            $('#MainContent_txtProveedor').focus();
        },
        minLength: 3
    });

      $('#MainContent_txtDistrito').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
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
            $('#hfCodDepartamento').val(i.item.val);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
            $('#hfDistrito').val(i.item.label);
            //F_BuscarDireccionPorDefecto();
            F_BuscarDireccionesCliente();
        },
        minLength: 3
    });

    $('#MainContent_txtProveedorConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-13",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'2','CodTipoCliente':'0'}",
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
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('#divTabs').tabs();   

    $("#MainContent_txtDistrito").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtDistrito").val() != $("#hfDistrito").val() & $("#hfCodDistrito").val() != '0')
        {
            $("#MainContent_txtDistrito").val('');
            $("#hfDistrito").val('');
            $("#hfCodDistrito").val('0');
            $("#MainContent_txtDireccion").val('');
            $("#hfCodDireccion").val('0');
            $("#hfDireccion").val('');
        }
            var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
            var Cliente = $('#MainContent_txtNroRuc').val();

            if ( Index ==-1 ) {} else {
                if ($("#MainContent_txtCliente").val() === '---NUEVO CLIENTE---')
                return true;
            $('#MainContent_txtNroRuc').val(Cliente.split('-')[0].trim());
            $('#hfCliente').val($('#MainContent_txtNroRuc').val());
            }
    });

    $("#MainContent_txtNroRuc").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtNroRuc").val() != $("#hfNroRuc").val() & $("#hfCodCtaCte").val() != '0')
        {
                var nroruc = $("#MainContent_txtNroRuc").val();
                F_LimpiarCamposCliente();
                $("#MainContent_txtNroRuc").val(nroruc);
                $("#MainContent_txtNroRuc").focus();
        }
    });

    $("#MainContent_txtProveedor").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtProveedor").val() != $("#hfCliente").val() & $("#hfCodCtaCte").val() != '0' & $("#MainContent_txtProveedor").val() === '---NUEVO CLIENTE---')
        {
            if ($("#MainContent_txtNroRuc").val() != '11111111')
            {
                alertify.log('NO SE PUEDE MODIFICAR CLIENTES REGISTRADOS');
                $("#MainContent_txtProveedor").val($("#hfCliente").val());
                return true;
            }
        }
    });

    $('#MainContent_txtProveedor').blur(function () {
        try 
        {
            if ($('#MainContent_txtProveedor').val()=='')
            return false

            var Index= $('#MainContent_txtProveedor').val().indexOf('-');
            var Cliente = $('#MainContent_txtProveedor').val();
            if ( Index ==-1 ) {} else {
                if ($("#MainContent_txtProveedor").val() != '---NUEVO CLIENTE---')
                {
                    Cliente=Cliente.substr(Cliente.length - (Cliente.length -(Index+2)));
                }
            
            }
            $('#MainContent_txtProveedor').val(Cliente);
            $('#hfCliente').val($('#MainContent_txtProveedor').val());
            return false;
              
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;
    });

    $("#MainContent_txtDireccion").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtDireccion").val().trim() != $("#MainContent_ddlDireccion option:selected").text().trim() & $("#hfCodDireccion").val() != '0')
        {
            $("#hfCodDireccion").val('0');
        }

            var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
            var Cliente = $('#MainContent_txtNroRuc').val();

            if ( Index ==-1 ) {} else {
            if ($("#MainContent_txtProveedor").val() === '---NUEVO CLIENTE---')
                return true;
            $('#MainContent_txtNroRuc').val(Cliente.split('-')[0].trim());
            $('#hfCliente').val($('#MainContent_txtNroRuc').val());
            }
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

    $('#MainContent_btnGrabarEdicion').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            F_EditarTemporal();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnAgregarProducto').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
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
                                
                  
                }
                else 
                {
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

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnEliminar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
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

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR EL DOCUMENTO"))
            F_GrabarDocumento();
//                F_Nuevo();
//            }
            return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
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

            alertify.log("Error Detectado: " + e);
        }
     
        });

        $('#MainContent_btnAnular').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if ($.trim($('#MainContent_txtObservacionAnulacion').val()) == '') {
                alertify.log("INGRESAR LA OBSERVACION");
                return false;
            }
            F_AnularRegistro();
            return false;
        }
        catch (e) {
//            toastr.warning("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnBuscarConsulta').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_Buscar();
          return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnBuscarFactura').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarBuscarFactura())
              return false;

            F_BuscarFactura();

            return false;
        }        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabarComision').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarGrabarComprobanteCaja())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR LA CANCELACION POR COMPROBANTE"))
            F_GrabarComprobanteCaja();

            return false;
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_txtNumero').blur(function () {
        var id = '00000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 8));
        return false;
    });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });
    
    $('#MainContent_txtFechaIngreso').on('change', function (e) {
        $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
    });

    $("#MainContent_txtTotal").blur(function () {

    if ($("#MainContent_txtTotal").val=='')
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
       if ($.inArray(e.keyCode, [46, 13, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 413 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
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

    $("#MainContent_txtNumeroConsulta").ForceNumericOnly();

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

       $('#MainContent_txtObservacionAnulacion').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtSerie').css('background', '#FFFFE0');

    $('#MainContent_txtDsctoTotal').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtProveedorConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtSerieFactura').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroFactura').css('background', '#FFFFE0');

    $('#MainContent_txtSaldo').css('background', '#FFFFE0');

    $('#MainContent_txtSaldoVenta').css('background', '#FFFFE0');
        
    $('#MainContent_txtNroRuc').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');

    $('#MainContent_txtOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtSerieFactura').blur(function () {
        var id = '0000' + $('#MainContent_txtSerieFactura').val();
        $('#MainContent_txtSerieFactura').val(id.substr(id.length - 4));
        return false;
    });

    $('#MainContent_txtNumeroFactura').blur(function () {
        var id = '00000000' + $('#MainContent_txtNumeroFactura').val();
        $('#MainContent_txtNumeroFactura').val(id.substr(id.length - 8));
        return false;
    });

    F_Controles_Inicializar();

    F_Derecha();

     $('#MainContent_txtRucEdicion').css('background', '#FFFFE0');

      $('#MainContent_txtProveedorEdicion').css('background', '#FFFFE0');

       $('#MainContent_txtDistritoEdicion').css('background', '#FFFFE0');

        $('#MainContent_txtObservacionEdicion').css('background', '#FFFFE0');

    });

$(document).on("change", "select[id $= 'MainContent_ddlTipoDoc']",function () {
     F_CambioTipo();
});

function F_CambioTipo() {
    if (!F_SesionRedireccionar(AppSession)) return false;
  
     $("#tdftNormal").attr("style", "display:block");
     $("#tdftOC").attr("style", "display:none");

    switch($("#MainContent_ddlTipoDoc").val()) {
        case '1': //FACTURA
            //Bloqueo de campos
//            $('#MainContent_txtProveedor').prop('disabled', false);
           
            //Tipo de CtaCte a filtrar
            $('#hfCodTipoCliente').val('2')
            $('#MainContent_ddlTipoImpresion').val('IMP');
            $('#MainContent_txtNroRuc').select();
            $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
            $('#MainContent_chkImpresionTicket').prop('checked', false);
            $('#MainContent_txtProveedor').prop('readonly', true);

            $('#div_serie').css('display', 'none');
            $('#div_txtSerie').css('display', 'block');
            $('#MainContent_txtNumero').val('');
            $('#MainContent_txtNumero').prop('disabled', false);

            break;
        case '2': //BOLETA
            //bloqueo de campos
            //Tipo de CtaCte a filtrar
            $('#hfCodTipoCliente').val('2')
            $('#MainContent_ddlTipoImpresion').val('IMP');
            $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
            $('#MainContent_txtNroRuc').select();
            $('#MainContent_txtProveedor').prop('readonly', true);

            $('#div_serie').css('display', 'none');
            $('#div_txtSerie').css('display', 'block');
            $('#MainContent_txtNumero').val('');
            $('#MainContent_txtNumero').prop('disabled', false);
            break;

        case '8': //NOTA DE PEDIDO
            //bloqueo de campos
//            $('#MainContent_txtProveedor').prop('disabled', false);
            $('#MainContent_txtApePaterno').prop('disabled', true);
            $('#MainContent_txtApeMaterno').prop('disabled', true);
            $('#MainContent_txtNombres').prop('disabled', true);
            $('#MainContent_txtAtencion').prop('disabled', false);
            $('#MainContent_txtReferencia').prop('disabled', false);

            //Tipo de CtaCte a filtrar
            $('#hfCodTipoCliente').val('0')
            $('#MainContent_ddlTipoImpresion').val('IMP');
            $('#MainContent_txtNroRuc').focus();
            F_BuscarDatosPorRucDni('11111111');
            $('#MainContent_txtProveedor').prop('readonly', false);

            F_Mostrar_Correlativo(8);

            $('#div_serie').css('display', 'block');
            $('#div_txtSerie').css('display', 'none');
            $('#MainContent_txtNumero').prop('disabled', true);

            break;
    }

    //F_CambioSerie_TipoDoc();

    $('#MainContent_lbTipoDocumento').text($("#MainContent_ddlTipoDoc option:selected").text());
   $('#MainContent_txtNroRuc').focus();
    return false;
}

$(document).on("change", "select[id $= 'MainContent_ddlDireccion']",function () {
     $('#MainContent_txtDireccion').val($('#MainContent_ddlDireccion option:selected').text());
     $('#hfCodDireccion').val($('#MainContent_ddlDireccion option:selected').val());
} );

$().ready(function () {

    $(document).everyTime(600000, function () {

        if (!F_ValidaSesionActiva(AppSession)) return false;

    });


});

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 13) {
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

$(document).on("change", "select[id $= 'MainContent_ddlSerieConsulta']",function () {
     F_Buscar();
} );

$(document).on("change", "select[id $= 'MainContent_ddlSerie']",function () {
     F_Mostrar_Correlativo(13);
 });
  
$(document).on("change", "select[id $= 'MainContent_ddlTipoDoc']",function () {
     F_CambioTipo();
} );

$(document).on("change", "select[id $= 'MainContent_ddlBanco']",function () {
     F_ListarNroCuenta();
} );

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']",function () {    
     F_ListarNroCuenta();
} );

$(document).on("change", "select[id $= 'MainContent_ddlEmpresa']",function () {
        F_CAJA_X_EMPRESA($('#MainContent_ddlEmpresa').val());
 });

function F_Controles_Inicializar() {
    F_Inicializar_Parametros();

    var arg;

    try {
        var objParams =
            {
                Filtro_CodDoc: 8,
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodBanco: 1,
                Filtro_CodMoneda: 1,
                Filtro_CodEmpresa: 1,
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
                    if (str_resultado_operacion == "1") 
                    {
                        F_Update_Division_HTML('div_tipoingreso', result.split('~')[2]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[3]);
                        $('#MainContent_lblTC').text(result.split('~')[4]);
                        F_Update_Division_HTML('div_serie', result.split('~')[5]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[6]);
                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[6]);
                        F_Update_Division_HTML('div_MonedaComision', result.split('~')[7]);
                        F_Update_Division_HTML('div_TipoDocumento', result.split('~')[8]);                        
                        F_Update_Division_HTML('div_MedioPago', result.split('~')[9]);
                        F_Update_Division_HTML('div_TipoDoc', result.split('~')[10]);
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[11]);
                        F_Update_Division_HTML('div_TipoDocConsulta', result.split('~')[13]);
                        F_Update_Division_HTML('div_FormaPago', result.split('~')[14]);
                        F_Update_Division_HTML('div_Banco', result.split('~')[15]);
                        F_Update_Division_HTML('div_Cuenta', result.split('~')[16]);
                        F_Update_Division_HTML('div_Empresa', result.split('~')[18]);
                        F_Update_Division_HTML('div_EmpresaConsulta', result.split('~')[19]);
                              F_Update_Division_HTML('div_Entregado', result.split('~')[21]);
                        F_Update_Division_HTML('div_Recibido', result.split('~')[22]);
                           $('#hfCodEmpresa').val(result.split('~')[20]);
                        P_CodMoneda_Inicial = result.split('~')[17];
                        $('#MainContent_ddlMoneda').val(P_CodMoneda_Inicial);
                        $('#MainContent_ddlClasificacion').val(9);
                        $('#MainContent_ddlTipoDocumento').val(1);
                        $('#MainContent_ddlMedioPago').val(1);
                        $('#MainContent_ddlTipoIngreso').val(1);
                        $('#MainContent_ddlTipoDoc').val(8);                 
                        $('#MainContent_ddlFormaPago').val(1);
                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                        $('#MainContent_ddlTipoIngreso').css('background', '#FFFFE0');
                        $('#MainContent_ddlClasificacion').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaComision').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDoc').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');         
                        $('#MainContent_ddlCuenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormatoImpresion2').css('background', '#FFFFE0');
                         $('#MainContent_ddlEntregado').css('background', '#FFFFE0');
                        $('#MainContent_ddlRecibido').css('background', '#FFFFE0');
                        $('#MainContent_txtNroRuc').focus();            
                        F_ListarNroCuenta();
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                }
            );
    } 
    catch (mierror) {
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);
    }
}

function F_Inicializar_Parametros() {
    P_CodMoneda_Inicial = "1";
        
var Parametros = F_ParametrosPagina('', CodigoMenu, CodigoInterno);
$.each(Parametros, function (index, item) {

    switch(item.Parametro) {
        case "P_CODMONEDA" :
            P_CodMoneda_Inicial = item.Valor;
            break;
    };

});


return true;
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
                    }
                    else {
                    MostrarEspera(false);
                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

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
    var chkok_grilla='';

    var cadena='Ingrese los sgtes. campos: '
            
            chkok_grilla = '#' + ControlID;
            txtprecio_grilla = chkok_grilla.replace('chkOK', 'txtPrecioLibre');
            txtcant_grilla = chkok_grilla.replace('chkOK', 'txtCantidad');
            ddlLista_grilla = chkok_grilla.replace('chkOK', 'ddlLista');
          
            
            boolEstado = $(chkok_grilla).is(':checked');
            if (boolEstado)
            {
               
                $(txtcant_grilla).prop('disabled', false);
                var i=0;
                if($(txtprecio_grilla).val()=="")
                {$(txtprecio_grilla).focus();
                i=1}

                if(i==0 && $(txtcant_grilla).val()=="")
                {$(txtcant_grilla).focus();}
            }
            else
            {
                $(txtprecio_Grilla).val('');
                $(txtcant_grilla).val('');
                $(ddlLista_grilla).val('4');
              
                $(txtcant_grilla).prop('disabled', true);
            }
            
        
    return true;
}

function F_FormaPago(CodFormaPago) {
 var arg;
    try 
    {
    $('#MainContent_ddlMedioPago').val(1);
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
            case "6":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),0));
                       $('#MainContent_ddlMedioPago').val(3);
                       break;
            case "13":
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
        alertify.log("Error detectado: " + mierror);
     }

}

function F_MostrarTotales(){

var lblimporte_grilla='';
var chkDel='';
var Total=0;
var Igv=0;
var Subtotal=0;
     $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
             chkDel = '#' + this.id;
             lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
             Total+=parseFloat($(lblimporte_grilla).text());
     });
     var Cuerpo='#MainContent_'
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgv').val((Total*parseFloat($(Cuerpo + 'ddligv').val())).toFixed(2));
    $(Cuerpo + 'txtSubTotal').val((Total/(1+parseFloat($(Cuerpo + 'ddligv').val()))).toFixed(2));

}

function F_ValidarGrabarDocumento(){
    try 
        {
        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:'; 

        if ($(Cuerpo + 'txtProveedor').val()=='' & $('#hfCodCtaCte').val()==0)
                Cadena=Cadena + '<p></p>' + 'CLIENTE';
        
        if ($(Cuerpo + 'lblTC').text()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtNumero').val()=='')
                Cadena=Cadena + '<p></p>' + 'Numero de Factura';

        if ($(Cuerpo + 'txtEmision').val()=='')
                Cadena=Cadena + '<p></p>' + 'Fecha de Emision';

         if ($(Cuerpo + 'ddlTipoIngreso').val()==0)
                Cadena=Cadena + '<p></p>' + 'Tipo Ingreso';

         if ($(Cuerpo + 'txtTotal').val()=='' | $(Cuerpo + 'txtTotal').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'Total';

        if ($(Cuerpo + 'ddlCajaFisica').val() == null)
                Cadena=Cadena + '<p></p>' + 'Caja Fisica';

//        if ($(Cuerpo + 'txtObservacion').val()=='')
//                Cadena=Cadena + '<p></p>' + 'Observacion';

//        if ($(Cuerpo + 'ddlTipoIngreso').val()==6 & ($(Cuerpo + 'ddlEntregado').val()== $(Cuerpo + 'ddlRecibido').val()))
//             Cadena=Cadena + '<p></p>' + 'ENTREGADO Y RECIBIDO NO PUEDEN SER LA MISMA PERSONA';

//        if (!($('#MainContent_ddlFormaPago').val() == 1 | $('#MainContent_ddlFormaPago').val() == 6))
//                Cadena=Cadena + '<p></p>' + 'LOS COMPROBANTES DE EGRESO DEBEN SER CONTADO O DEPOSITO';

        if ($(Cuerpo + 'ddlTipoIngreso').val()==1 & $(Cuerpo + 'txtNroRuc').val() == '11111111')
                Cadena=Cadena + '<p></p>' + 'CLIENTE VARIOS NO PUEDE TENER ADELANTO DE COBRANZAS';

        if ($(Cuerpo + 'ddlTipoIngreso').val()==2 & $(Cuerpo + 'txtNroRuc').val() != '11111111')
                Cadena=Cadena + '<p></p>' + 'EL DEPOSITO SIN ENLAZAR SOLO PUEDE SER CON CLIENTE VARIOS';

        if ($(Cuerpo + 'ddlTipoIngreso').val()==2 & $(Cuerpo + 'ddlMedioPago').val() != 3)
                Cadena=Cadena + '<p></p>' + 'EL DEPOSITO SIN ENLAZAR SOLO PUEDE SER CON MEDIO PAGO DEPOSITO';

        if ($(Cuerpo + 'ddlTipoIngreso').val()==6 & F_PermisoOpcion_SinAviso(CodigoMenu, 7000101, '') == 0)
                Cadena=Cadena + '<p></p>' + 'NO TIENEN PERMISO PARA GRABAR A RENDIR';

        if (Cadena != 'Ingresar los sgtes. Datos:')
        {alertify.log(Cadena);
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_GrabarDocumento(){
  try 
        {     
        var CodBanco=0;
        var CodCtaBancaria=0;
        var CodEntregado=0;
        var CodRecibido=0;
        var NroOperacion='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var FlagGuia='0';
        var NotaPedido='0';
        var Contenedor = '#MainContent_';
        var Index= $('#MainContent_txtProveedor').val().indexOf('-');
        var RazonSocial = $('#MainContent_txtProveedor').val();

        RazonSocial=RazonSocial.substr(RazonSocial.length - (RazonSocial.length -(Index+1)));

        if ($(Contenedor + 'ddlTipoIngreso').val()==6)
        {
            CodEntregado=$(Contenedor + 'ddlEntregado').val();
            CodRecibido=$(Contenedor + 'ddlRecibido').val();
        }

                switch ($(Contenedor + 'ddlMedioPago').val())
        { 
           case '1':
           case '6':
                    CodBanco = 0;
                    CodCtaBancaria = 0;
                    NroOperacion = "";
                    break;
           case '3':
           case '4':
           case '8':
           case '9':
           case '10':
                    CodBanco = $(Contenedor + 'ddlBanco').val();
                    CodCtaBancaria =$(Contenedor + 'ddlCuenta').val();
                    NroOperacion = $(Contenedor + 'txtOperacion').val();
                    break;
           default:
           break;
        }
          
                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {        
                                Filtro_SerieDoc: $('#MainContent_ddlSerie option:selected').text(),
                                Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                Filtro_CodMotivo: $(Contenedor + 'ddlTipoIngreso').val(),
                                Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),                                                                 
                                Filtro_CodMedioPago: $(Contenedor + 'ddlMedioPago').val(),                                                                 
                                Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                Filtro_CodEstado: 6 ,
                                Filtro_Monto: $(Contenedor + 'txtTotal').val(),
                                Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                Filtro_Cliente: RazonSocial,
                                Filtro_Observacion: $(Contenedor + 'txtObservacion').val(),
                                Filtro_CodTipoDoc: $(Contenedor + 'ddlTipoDoc').val(),
                                Filtro_CodCajaFisica: $(Contenedor + 'ddlCajaFisica').val(),
                                Filtro_NroRuc: $('#MainContent_txtNroRuc').val(),
                                Filtro_CodDepartamento: $('#hfCodDepartamento').val(),
                                Filtro_CodProvincia: $('#hfCodProvincia').val(),
                                Filtro_CodDistrito: $('#hfCodDistrito').val(),
                                Filtro_Direccion: $(Contenedor + 'txtDireccion').val(),
                                Filtro_CodDireccion: $('#hfCodDireccion').val(),
                                Filtro_CodBanco:              CodBanco,
                                Filtro_CodCtaBancaria:        CodCtaBancaria,
                                Filtro_NroOperacion:          NroOperacion,
                                Filtro_CodEntregado:          CodEntregado,
                                Filtro_CodRecibido:          CodRecibido,
                                Filtro_CodEmpresa:            $("#MainContent_ddlEmpresa").val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_GrabarDocumento_NET(arg, function (result) {
                
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    if (str_mensaje_operacion=='SE GRABO CORRECTAMENTE' | str_mensaje_operacion=='Se grabo correctamente')
                    {
                      alertify.log('SE GRABO CORRECTAMENTE');


                    if ($('#MainContent_chkImpresion').is(':checked')) {
                    F_ImprimirGrabar(result.split('~')[2], $('#MainContent_ddlTipoDoc').val());
                    }
                    F_Mostrar_Correlativo(8);      
                    F_Nuevo();
                    $('#MainContent_chkImpresion').prop("checked", true); 
                    }
                    else
                    alertify.log(str_mensaje_operacion);
                }
                else 
                    alertify.log(result.split('~')[1]);
                

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }
}

function F_Nuevo(){
       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());
       $('.MesAnioPicker').datepicker($.datepicker.regional['es']);
       $('.MesAnioPicker').datepicker('setDate', new Date());
       $('#MainContent_ddlMoneda').val(P_CodMoneda_Inicial);
       $('#MainContent_ddlFormaPago').val('1');
       $('#MainContent_ddlTipoDocumento').val('8');
       $('#hfCodigoTemporal').val('0');
       $('#hfCodCtaCte').val('0');
       $('#MainContent_txtProveedor').val('');
       $('#MainContent_txtSubTotal').val('0.00');
       $('#MainContent_txtObservacion').val('');
       $('#MainContent_txtTotal').val('0.00');
       $('#MainContent_txtSerie').val('');
       $('#MainContent_txtNumero').val('');
       $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
       $('#MainContent_txtArticulo').val('');
       $('#MainContent_txtNroRuc').val('');
       $('#MainContent_txtDistrito').val('');
       $('#MainContent_txtDireccion').val('');
       $('#MainContent_txtOperacion').val('');
       $('#MainContent_ddlDireccion').empty();
       $('#MainContent_txtProveedor').focus();
       $('#MainContent_ddlTipoIngreso').val(1);
}

function F_Buscar(){
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
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
                                        Filtro_SerieDoc: '',
                                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                        Filtro_CodTipoDoc: $('#MainContent_ddlTipoDocConsulta').val(),   
                                        Filtro_ChkNumero: chkNumero,
                                        Filtro_ChkFecha: chkFecha,
                                        Filtro_ChkCliente: chkCliente,
                                        Filtro_CodEmpresa: $("#MainContent_ddlEmpresaConsulta").val()                                      
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
                    $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblNumero')); 
                    if (str_mensaje_operacion!='')                        
                    alertify.log(str_mensaje_operacion);
                    $('#MainContent_grvConsulta .detallesart').each(function () {
                    var fila = '#' + this.id;
                    var lblEstado = fila.replace("lblNumero", "lblEstado");

                    switch ($(lblEstado).text()) {
                        case 'ANULADO':
                            $(lblEstado).css("color", "black");
                            break;
                        case 'PENDIENTE':
                            $(lblEstado).css("color", "red");
                            break;
                        default:
                            $(lblEstado).css("color", "green");
                    }

                });       
                  
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }

}

function F_AnularRegistro(Fila) {
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
 try 
        {
   
    
    if(!confirm("ESTA SEGURO DE ANULAR "  + $('#hfNumeroAnulacion').val() + "\nDEL CLIENTE : " + $('#hfClienteAnulacion').val()))
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
                          Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),
                          Filtro_CodComprobanteCaja: $('#hfid').val(),
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDoc: $('#hfCodTipoDoc_grilla').val(),
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,                          
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodEmpresa: $("#MainContent_ddlEmpresaConsulta").val(),
                Filtro_ObservacionAnulacion: $('#MainContent_txtObservacionAnulacion').val()
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
                //F_Update_Division_HTML('div_consulta', result.split('~')[2]);      
                alertify.log(result.split('~')[1]);
                 $('#div_Anulacion').dialog('close');
                F_Buscar();
                
        }
        else {
             alertify.log(result.split('~')[1]);
        }

        return false;
    });
            }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
            return false;
        } 
}

function getContentTab(){
    $('#MainContent_ddlEmpresaConsulta').val($('#hfCodEmpresa').val());
    $('#MainContent_chkRango').prop('checked',true);
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
        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:'; 

        if ($(Cuerpo + 'txtProveedorEdicion').val()=='CLIENTE VARIOS' & $('#hfCodCtaCte').val()==0)
                Cadena=Cadena + '<p></p>' + 'Proveedor';

                if ($(Cuerpo + 'txtProveedorEdicion').val()=='  CLIENTE VARIOS' & $('#hfCodCtaCte').val()==0)
                Cadena=Cadena + '<p></p>' + 'Proveedor';
        
        if ($(Cuerpo + 'lblTC').text()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtObservacionEdicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Ingresar Observacion';

    if (Cadena != 'Ingresar los sgtes. Datos:')
        {alertify.log(Cadena);
        return false;}

        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';

        var Contenedor = '#MainContent_';
        var objParams = {
                        Filtro_Codigo: $('#hfid').val(),
                        Filtro_CodTipoDoc:8,
                        Filtro_CodMotivo:2,
                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                        Filtro_Observacion: $('#MainContent_txtObservacionEdicion').val()                                
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
                    alertify.log(str_mensaje_operacion);
                $('#div_Mantenimiento').dialog('close');
                F_Buscar();
                
            $('#MainContent_txtDireccion').val('');
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
                    alertify.log(result.split('~')[1]);
                
                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }

}

function F_EditarRegistro(Fila) {
    try {
             var imgID = Fila.id;
             var codigo ='#' + imgID.replace('imgEditarRegistro', 'lblID'); 
             var lblEstado = '#' + imgID.replace('imgEditarRegistro', 'hfCodEstado');
             var lblMotivo = '#' + imgID.replace('imgEditarRegistro', 'hfCodMotivo');
             var Observacion = '#' + imgID.replace('imgEditarRegistro', 'hfobservacion');   
             var lblRazonSocial = '#' + imgID.replace('imgEditarRegistro', 'lblRazonSocial');  
             var Observacion = '#' + imgID.replace('imgEditarRegistro', 'hfobservacion');  
             var Cadena = 'Ingresar los sgtes. Datos:'; 

             if ($.trim($(lblRazonSocial).text().toUpperCase()) !="CLIENTE VARIOS")
                   Cadena=Cadena + '<p></p>' + 'SOLAMENTE SE PUEDE MODIFICAR CLIENTE VARIOS';
        
             if ($(lblMotivo).val()!="2" & $(lblEstado).val()!="12") 
                   Cadena=Cadena + '<p></p>' + 'SOLAMENTE SE PUEDE MODIFICAR DEPOSITOS SIN ENLAZAR';

             if (Cadena != 'Ingresar los sgtes. Datos:')
            {alertify.log(Cadena);
            return false;}

            $('#hfid').val($(codigo).val());    
            $('#MainContent_txtProveedorEdicion').val($(lblRazonSocial).text());           
            $('#MainContent_txtObservacionEdicion').val($(Observacion).val());   
                     
                     $("#div_Mantenimiento").dialog({
                           resizable: false,
                           modal: true,
                           title: "Edicion Registro",
                           title_html: true,
                           height: 300,
                           width: 500,
                           autoOpen: false
                       });     
       $('#div_Mantenimiento').dialog('open');
           

        return false;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_Mostrar_Correlativo(CodDoc) {

    var arg;

    try {
        var objParams = {
            Filtro_CodEmpresa: $("#MainContent_ddlEmpresa").val(),
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
                   
                    return false ;
                
                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_Canje(Fila) {
        
        var imgID = Fila.id;
        var lblSaldo = '#' + imgID.replace('imgDocumento', 'lblSaldo');
        var lblMonto = '#' + imgID.replace('imgDocumento', 'lblMonto');
        var lblID = '#' + imgID.replace('imgDocumento', 'lblID');
        var hfCodCtaCte = '#' + imgID.replace('imgDocumento', 'hfCodCtaCte');
        var hfCodMotivo = '#' + imgID.replace('imgDocumento', 'hfCodMotivo');
        var Cuerpo = '#MainContent_';

        if($(hfCodMotivo).val() == 5)
        {
        alertify.log("PARA HACER LAS CANCELACIONES IR A COBRANZAS");
        return false;
        }

        if($(lblSaldo).text() == "0.00")
        {
        alertify.log("NO SE PUEDE HACER MAS CANCELACIONES CUANDO EL SALDO ES CERO");
        return false;
        }

        $('#div_ComprobanteCaja').dialog({
            resizable: false,
            modal: true,
            title: "CANCELACION POR COMPROBANTE CAJA",
            title_html: true,
            height: 200,
            width: 450,
            autoOpen: false
        });

        $(Cuerpo + 'txtSaldo').val($(lblSaldo).text());
        $('#hfCodComprobanteCaja').val($(lblID).val());
        $('#hfCodCtaCte').val($(hfCodCtaCte).val());
        $('#hfCodMotivo').val($(hfCodMotivo).val());
        $('#div_ComprobanteCaja').dialog('open');
}

function F_ValidarBuscarFactura(){

    try 
        {

        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>'; 

        if ($(Cuerpo + 'txtSerieFactura').val()=='')
                Cadena=Cadena + '<p></p>' + 'SERIE';       
 
        if ($(Cuerpo + 'txtNumeroFactura').val()=='')
                Cadena=Cadena + '<p></p>' + 'NUMERO';

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>')
        {alertify.log(Cadena);
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_BuscarFactura(){
       try 
        {
              
              var objParams = {
                               Filtro_CodTipoDoc: $("#MainContent_ddlTipoDocumento").val(),
                               Filtro_SerieDoc: $('#MainContent_txtSerieFactura').val(),
                               Filtro_NumeroDoc: $('#MainContent_txtNumeroFactura').val(),
                               Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                               Filtro_CodMotivo: $('#hfCodMotivo').val()
                              };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_BuscarFactura_NET(arg, function (result) {
        
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                     $('#MainContent_txtSaldoVenta').val(result.split('~')[2]) ;
                     $('#MainContent_ddlMonedaComision').val(result.split('~')[3]) ;
                     $('#hfCodDocumentoVenta').val(result.split('~')[4]);
                    if (str_mensaje_operacion!='')                        
                    alertify.log(str_mensaje_operacion);
                  
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }

}

function F_GrabarComprobanteCaja(){
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
        var Index= $('#MainContent_txtProveedor').val().indexOf('-');
        var RazonSocial = $('#MainContent_txtProveedor').val();
        var chkNumero='0';
        var chkFecha='0';
        var chkCliente='0';

        RazonSocial=RazonSocial.substr(RazonSocial.length - (RazonSocial.length -(Index+1)));

        if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

        if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

        if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';
          
                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {        
                                        Filtro_CodComprobanteCaja: $("#hfCodComprobanteCaja").val(),         
                                        Filtro_CodDocumentoVenta: $("#hfCodDocumentoVenta").val(),
                                        Filtro_SaldoComprobante: $(Contenedor + 'txtSaldo').val(),
                                        Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),
                                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                        Filtro_CodMedioPago: $('#hfCodMedioPago').val(),
                                        Filtro_CodMotivo: $('#hfCodMotivo').val(),
                                        Filtro_CodTipoDoc: 8,   
                                        Filtro_ChkNumero: chkNumero,
                                        Filtro_ChkFecha: chkFecha,
                                        Filtro_ChkCliente: chkCliente                                                                        
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_GrabarComprobanteCaja_NET(arg, function (result) {
                
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                  if (str_resultado_operacion == "1") 
                {                  
                    if (str_mensaje_operacion=='SE GRABO CORRECTAMENTE')
                    {                     
                      F_Update_Division_HTML('div_consulta', result.split('~')[4]); 
                      alertify.log('SE GRABO CORRECTAMENTE');
                      $('#div_ComprobanteCaja').dialog('close');
                      $("#hfCodComprobanteCaja").val('0');
                      $("#hfCodDocumentoVenta").val('0');
                      $("#hfCodCtaCte").val('0');
                      $("#MainContent_txtSerieFactura").val('');
                      $("#MainContent_txtNumeroFactura").val('');
                      $("#MainContent_txtSaldo").val('');
                      $("#MainContent_txtSaldoVenta").val('');
                    }
                    else
                    alertify.log(str_mensaje_operacion);
                }
                else 
                    alertify.log(result.split('~')[1]);

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }
}

function F_ValidarGrabarComprobanteCaja(){
    try 
        {
            var Cuerpo='#MainContent_';
            var Cadena = 'Ingresar los sgtes. Datos:'; 

            if ($(Cuerpo + 'txtSerieFactura').val()=='')
                    Cadena=Cadena + '<p></p>' + 'SERIE';
        
            if ($(Cuerpo + 'txtNumeroFactura').text()=='0')
                    Cadena=Cadena + '<p></p>' + 'NUMERO';

            if ($(Cuerpo + 'txtSaldo').val()=='')
                    Cadena=Cadena + '<p></p>' + 'SALDO COMPROBANTE';

            if ($(Cuerpo + 'txtSaldoVenta').val()=='')
                    Cadena=Cadena + '<p></p>' + 'SALDO COMPRA';

            if ($(Cuerpo + 'txtSaldo').val()!='' && ($(Cuerpo + 'txtSaldo').val()=='0.00' | $(Cuerpo + 'txtSaldo').val()=='0'))
                    Cadena=Cadena + '<p></p>' + 'SALDO COMPROBANTE';

            if ($(Cuerpo + 'txtSaldoVenta').val()!='' && ($(Cuerpo + 'txtSaldoVenta').val()=='0.00' | $(Cuerpo + 'txtSaldoVenta').val()=='0'))
                    Cadena=Cadena + '<p></p>' + 'SALDO COMPRA';
 
            if ($(Cuerpo + 'txtSaldoVenta').val()!='' & $(Cuerpo + 'txtSaldo').val()!='0.00')
            {
                if(parseFloat($(Cuerpo + 'txtSaldoVenta').val())!=parseFloat($(Cuerpo + 'txtSaldo').val()))
                  Cadena=Cadena + '<p></p>' + 'SALDO COMPROBANTE NO PUEDE SER DIFERENTE AL SALDO VENTA';
            }               

            if (Cadena != 'Ingresar los sgtes. Datos:')
            {alertify.log(Cadena);
            return false;}
            return true;
        }        
    catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
}

//ENZO
function F_DireccionDisplayUp()
{
  var p;

  if ($('#MainContent_ddlDireccion option:selected').prev().length > 0) {
    p = $('#MainContent_ddlDireccion option:selected').prev().val();
    }
  else { 
    p = $('#MainContent_ddlDireccion option:selected').last().val();
  }

  $('#MainContent_ddlDireccion').val(p);
  $("#MainContent_txtDireccion").val($("#MainContent_ddlDireccion option:selected").text());   
  $('#hfCodDireccion').val(p);

}
//ENZO
function F_DireccionDisplayDown()
{
  var p;

  if ($('#MainContent_ddlDireccion option:selected').next().length > 0) {
    p = $('#MainContent_ddlDireccion option:selected').next().val();
    }
  else { 
    p = $('#MainContent_ddlDireccion option:selected').first().val();
  }
  $('#MainContent_ddlDireccion').val(p);
  $("#MainContent_txtDireccion").val($("#MainContent_ddlDireccion option:selected").text());  
  $('#hfCodDireccion').val(p);

}

function F_BuscarDireccionPorDefecto() {
if (!F_SesionRedireccionar(AppSession)) return false;
//    $('#hfCodDireccion').val('0');
//    $('#MainContent_txtDireccion').val('');
//    $('#hfDireccion').val('');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodDistrito_AutoComplete',
        data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
                if (data.d.length >= 1)
                {
                    $('#hfCodDireccion').val(data.d[0].split(',')[0]);
                    $('#MainContent_txtDireccion').val(data.d[0].split(',')[1]);
                    $('#hfDireccion').val(data.d[0].split(',')[1]);
                    $('#MainContent_txtCorreo').val(data.d[0].split(',')[5]);
                    if ($('#hfCodCtaCte').val() == 29)
                    {
                        $('#hfCodDistrito').val(data.d[0].split(',')[2]);
                        $('#hfCodProvincia').val(data.d[0].split(',')[3]);
                        $('#hfCodDepartamento').val(data.d[0].split(',')[4]);
                    }
                    return true;
                }
        },
        complete: function () {
            if (($('#hfCodDireccion').val() == '' | $('#hfCodDireccion').val() == '0') && $('#hfCodCtaCte').val() != 0)
            {
                alertify.log('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}

//ENZO
function F_BuscarDireccionesCliente() {
if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodDistritoCliente_AutoComplete',
        data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlDireccion').empty();
                $.each(data.rows, function (index, item) {
                    $('#MainContent_ddlDireccion').append($("<option></option>").val(item.CodDireccion).html(item.Direccion));
                });
                if (data.rows.length > 0) {
                    if ($('#hfCodDireccionDefecto').val() != '0') {
                        $('#MainContent_ddlDireccion').val($('#hfCodDireccionDefecto').val());
                    }
                    $('#MainContent_txtDireccion').val($("#MainContent_ddlDireccion option:selected").text());
                    if ($('#MainContent_txtDireccion').val() == "")
                    {
                        $('#MainContent_ddlDireccion').val($("#MainContent_ddlDireccion option:first").val());
                        $('#hfCodDireccion').val($("#MainContent_ddlDireccion option:first").val());          
                        $('#MainContent_txtDireccion').val($("#MainContent_ddlDireccion option:selected").text());
                    }
                    $('#hfCodDireccion').val($("#MainContent_ddlDireccion").val());
                }
            }
            catch (x) { alertify.log('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        complete: function () {
            if (($('#hfCodDireccion').val() == '' | $('#hfCodDireccion').val() == '0') && $('#hfCodCtaCte').val() != 0)
            {
                alertify.log('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}

function F_BuscarDistrito() {
if (!F_SesionRedireccionar(AppSession)) return false;
//    $('#hfCodDireccion').val('0');
//    $('#MainContent_txtDireccion').val('');
//    $('#hfDireccion').val('');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDistrito_ListarXCodDistrito',
        //data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        data: "{'CodDistrito':'" + $('#hfCodDistrito').val() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
                if (data.d.length >= 1)
                {
                    $('#MainContent_txtDistrito').val(data.d[0].split(',')[3]);
                }
        },
        complete: function () {
        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}
//cambio joel 210821
function F_ValidaRucDni() {
if (!F_SesionRedireccionar(AppSession)) return false;
    if ($('#MainContent_txtNroRuc').val().length > 0)
    {
        if ($('#MainContent_txtNroRuc').val().trim() === $('#hfNroRuc').val().trim() & 
            $('#MainContent_txtProveedor').val().trim() === $('#hfCliente').val().trim() & 
            $('#MainContent_txtNroRuc').val().trim() != "")
        return false;

    var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
    var Cliente = $('#MainContent_txtNroRuc').val();

    if ( Index ==-1 ) {} else {
    $('#MainContent_txtNroRuc').val(Cliente.split('-')[0].trim());
    }

        //DNI
        if ($('#MainContent_txtNroRuc').val().length == 8)
        {
            var NroRuc = $('#MainContent_txtNroRuc').val();
            F_BuscarDatosPorRucDni($('#MainContent_txtNroRuc').val());
            return false;
        }
        else
        {
            //RUC
            if ($('#MainContent_txtNroRuc').val().length == 11 & $('#MainContent_txtNroRuc').val() != '55555555555')
            {
                $('#MainContent_txtProveedor').focus();
                F_BuscarPadronSunat();
                return false;
            }
            else
            {
                //CLIENTE VARIOS
                if ($('#MainContent_txtNroRuc').val() == '1')
                {
                    $('#MainContent_txtNroRuc').val('11111111');
                    $('#hfNroRuc').val($('#MainContent_txtNroRuc').val());
                    F_BuscarDatosPorRucDni('11111111');
                    return true;
                }
                else if ($('#MainContent_txtNroRuc').val() === '55555555555') {
                    return true;
                }
                else
                {
//                    if ( Index ==-1 ) {} else {
                    alertify.log('NRO. RUC/DNI INVALIDO'); 
                    $('#MainContent_txtNroRuc').val('');
                    F_LimpiarCampos();
                    $('#MainContent_txtNroRuc').focus();
//                    }
                    return true;
                }
            }
        }
    }
    else
    {
        if ($('#MainContent_txtNroRuc').val() != $('#hfNroRuc').val())
        {
            F_LimpiarCampos();
            return true;
        }
    }
   return false;
}
//cambio joel 210821
function F_ValidaRucDniEdicion() {
//if (!F_SesionRedireccionar(AppSession)) return false;
    if ($('#MainContent_txtRucEdicion').val().length > 0)
    {
        if ($('#MainContent_txtRucEdicion').val().trim() === $('#hfNroRuc').val().trim() & 
            $('#MainContent_txtProveedorEdicion').val().trim() === $('#hfCliente').val().trim() & 
            $('#MainContent_txtRucEdicion').val().trim() != "")
        return false;

    var Index= $('#MainContent_txtRucEdicion').val().indexOf('-');
    var Cliente = $('#MainContent_txtRucEdicion').val();

    if ($('#MainContent_txtRucEdicion').val() != "1" & Index ==-1 ) {
       if (isNaN($('#MainContent_txtRucEdicion').val()) | !ValidarRuc($('#MainContent_txtRucEdicion').val()))
        {
            $('#MainContent_txtRucEdicion').val('');
            $('#MainContent_txtRucEdicion').focus();
            alertify.log('ERROR EN RUC');
            return false;
        }
    } else {
    $('#MainContent_txtRucEdicion').val(Cliente.split('-')[0].trim());
    }

        $('#MainContent_txtProveedorEdicion').val('');
        $('#hfCliente').val('');

        //DNI
        if ($('#MainContent_txtRucEdicion').val().length == 8)
        {
            if ($('#MainContent_ddlTipoDoc').val() === '1') {
                $('#MainContent_txtRucEdicion').val('');
                $('#MainContent_txtRucEdicion').focus();
                return true;
            }

            var NroRuc = $('#MainContent_txtRucEdicion').val();
            F_BuscarDatosPorRucDniEdicion($('#MainContent_txtRucEdicion').val());
            return true;
        }
        else
        {
            //RUC
            if ($('#MainContent_txtRucEdicion').val().length == 11 & $('#MainContent_txtRucEdicion').val() != '55555555555')
            {
                $('#MainContent_txtProveedorEdicion').focus();
                 ConsultandoPadron = false;
                F_BuscarPadronSunatEdicion();
               
                return true;
            }
            else
            {
                //CLIENTE VARIOS
                if ($('#MainContent_txtRucEdicion').val() == '1' & $('#MainContent_ddlTipoDoc').val() != '1')
                {
                    $('#MainContent_txtRucEdicion').val('11111111');
                    $('#hfNroRuc').val($('#MainContent_txtRucEdicion').val());
                    F_BuscarDatosPorRucDni('11111111');
                    return true;
                }
                else
                {
//                    if ( Index ==-1 ) {} else {
                    alertify.log('NRO. RUC/DNI INVALIDO'); 
                    $('#MainContent_txtRucEdicion').val('');
                    F_LimpiarCamposEdicion();
                    $('#MainContent_txtRucEdicion').focus();
//                    }
                    return true;
                }
            }
        }
    }
    else
    {
        if ($('#MainContent_txtRucEdicion').val() != $('#hfNroRuc').val())
        {
            F_LimpiarCamposEdicion();
            return true;
        }
    }
   return false;
}

function ValidarRuc(valor) {
    valor = trim(valor)
    if (esnumero(valor)) {
        if (valor.length < 11) {
            if (valor.length == 8)
                return true;
//            suma = 0
//            for (i = 0; i < valor.length - 1; i++) {

//                if (i == 0) suma += (digito * 2)
//                else suma += (digito * (valor.length - i))
//            }
//            resto = suma % 11;
//            if (resto == 1) resto = 11;
//            if (resto + (valor.charAt(valor.length - 1) - '0') == 11) {
//                return true
//            }
        } else if (valor.length == 11) {
            suma = 0
            x = 6
            for (i = 0; i < valor.length - 1; i++) {
                if (i == 4) x = 8
                digito = valor.charAt(i) - '0';
                x--
                if (i == 0) suma += (digito * x)
                else suma += (digito * x)
            }
            resto = suma % 11;
            resto = 11 - resto

            if (resto >= 10) resto = resto - 10;
            if (resto == valor.charAt(valor.length - 1) - '0') {
                return true
            }
        }
    }
    return false
}

function esnumero(campo) { return (!(isNaN(campo))); }

function F_LimpiarCampos() {
if (!F_SesionRedireccionar(AppSession)) return false;

  //  $('#MainContent_txtNroOperacion').val('');
    $('#MainContent_txtProveedor').prop('readonly', true);
    switch($("#MainContent_ddlTipoDoc").val()) {
        case '1': //FACTURA
            //Bloqueo de campos
//            $('#MainContent_txtProveedor').prop('disabled', false);
            
            //Valores por Defecto
            $('#hfCodCtaCte').val(0);
            $('#MainContent_txtNroRuc').val('');
            $('#hfNroRuc').val('');
            $('#MainContent_txtProveedor').val('');
            $('#hfCliente').val('');
           
            $('#MainContent_txtDireccion').val('');
            $('#MainContent_txtDestino').val('');
            $('#MainContent_txtDistrito').val('');
            $('#hfCodDireccion').val(0);
            $('#hfCodDepartamento').val(0);
            $('#hfCodProvincia').val(0);
            $('#hfCodDistrito').val(0);

            $('#MainContent_txtProveedor').focus();

             $('#hfDistrito').val('');
             $('#hfDireccion').val('');
             
            break;
        case '2': //BOLETA
            //bloqueo de campos
//            $('#MainContent_txtProveedor').prop('disabled', true);

            //Tipo de CtaCte a filtrar
            $('#hfCodTipoCliente').val('1')

            //Valores por Defecto
            $('#hfCodCtaCte').val(0);
            $('#hfCodDireccion').val(0);
            $('#MainContent_txtNroRuc').val('');
            $('#hfNroRuc').val('');
            $('#MainContent_txtProveedor').val('');
            $('#hfCliente').val('');

            $('#MainContent_txtDireccion').val('');
            $('#MainContent_txtDestino').val('');
            $('#MainContent_txtDistrito').val('');
            $('#hfCodDepartamento').val();
            $('#hfCodProvincia').val();
            $('#hfCodDistrito').val();

            F_BuscarDireccionPorDefecto();

            $('#MainContent_txtProveedor').focus();

             $('#hfDistrito').val('');
             $('#hfDireccion').val('');

            break;
            
       case '13': //NOTA DE PEDIDO
            //bloqueo de campos
//            $('#MainContent_txtProveedor').prop('disabled', false);
            //Tipo de CtaCte a filtrar
            $('#hfCodTipoCliente').val('0')

            //Valores por Defecto
            $('#hfCodCtaCte').val(0);
            $('#hfCodDireccion').val(0);
            $('#MainContent_txtNroRuc').val('');
            $('#hfNroRuc').val('');
            $('#MainContent_txtProveedor').val('');
            $('#hfCliente').val('');
            $('#MainContent_txtDireccion').val('');           
            $('#MainContent_txtDistrito').val('');
            $('#hfCodDepartamento').val();
            $('#hfCodProvincia').val();
            $('#hfCodDistrito').val();

             $('#hfDistrito').val('');
             $('#hfDireccion').val('');
            break;
    }
    $('#MainContent_lbTipoDocumento').text($("#MainContent_ddlTipoDoc option:selected").text());
}
//cambio joel 210821
//aca busca si es un nuevo numero de dni o ruc
var API = ""
var ubigeo="";
var ConsultandoPadron = false;
function F_BuscarPadronSunat() {

    if (ConsultandoPadron == true)
        return true;

    ConsultandoPadron = true;

        $('#td_loading').css('display', 'block');
        var NroRuc = $('#MainContent_txtNroRuc').val();
        F_LimpiarCampos();
        $('#MainContent_txtNroRuc').val(NroRuc);
         if (API == "") {
         $('#hfCodDepartamento').val("");
         $('#hfCodProvincia').val("");
         $('#hfCodDistrito').val("");
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCCuentaCorriente_PadronSunat',
                data: "{'NroRuc':'" + $('#MainContent_txtNroRuc').val() +"','CodTipoCtaCte':'1'}",
                dataType: "json",
                async: true,
                success: function (dbObject) {
                ConsultandoPadron = false;
                var data = dbObject.d;
                try {
                // condiciona joel:si en la base de datos no se encuentra ninguna condicion de ruc se manda para la apisunat
                    if (data.length > 0) {
                    $('#td_loading').css('display', 'none');
                    $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                    $('#hfCliente').val(data[0].split(',')[1]); //razon social
                    $('#MainContent_txtNroRuc').val(data[0].split(',')[8]);
                    $('#hfNroRuc').val(data[0].split(',')[8]);
                    $('#MainContent_txtProveedor').val(data[0].split(',')[1]);
                    $('#hfCliente').val(data[0].split(',')[1]);
                    $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                    $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                    $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                    $('#hfCodDireccion').val('0');
                    $('#hfCodDepartamento').val(data[0].split(',')[5]);
                    $('#hfCodProvincia').val(data[0].split(',')[6]);
                    $('#hfCodDistrito').val(data[0].split(',')[7]);
                    $('#hfDistrito').val(data[0].split(',')[4]);
                    $('#txtSaldoCreditoFavor').text(data[0].split(',')[12]);
                    $('#hfSaldoCreditoFavor').val(data[0].split(',')[12].replace("S/", "").replace(" ", ""));
                    $('#hfCodDireccionDefecto').val(data[0].split(',')[14]);

                    if ($('#MainContent_txtProveedor').val().trim().length > 0 & $('#hfCodDepartamento').val() === "0")
                    { alertify.error('ESPECIFIQUE LA DIRECCION Y DISTRITO, PORQUE SUNAT NO ESTA PROVEYENDO ESTA INFORMACION'); }

                    F_BuscarDireccionesCliente();
                    //F_BuscarDireccionPorDefecto();
                    }else{
                     API = "Usuario No Encontrado";
                        console.log(API);
                        F_API_RUC_Buscar();
                        F_BuscarPadronSunat();
                       
                    }
                }
                catch (x) { 
                    //alertify.log(x);
                    alertify.log('Por alguna razon el cliente no fue encontrado');
                    $('#td_loading').css('display', 'none');
                }
            },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
 }; 
  if (API == "Usuario No Encontrado") {
        //api sunat 
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url:  $('#hfurlapisunat').val() + $('#MainContent_txtNroRuc').val() + $('#hftokenapisunat').val(),
            dataType: "json",
            async: true,
            success: function (dbObject) {
                MostrarEspera(true);
                var data = dbObject.d;                                
                try {
                API = "";
                $('#td_loading').css('display', 'none');
                    $('#MainContent_txtProveedor').val(dbObject.razonSocial); //razon social
                    $('#MainContent_txtNombreComercial').val(dbObject.razonSocial); //razon social
                    ubigeo=dbObject.ubigeo;
                    if (ubigeo==null){
                     toastr.warning("La sunat no ofrece direccion ni distrito para los ruc 10,debe colocarlo usted mismo.");
                     }
                    var direccion = dbObject.direccion;
                    var distrito = dbObject.departamento + ' ' + dbObject.provincia + ' ' + dbObject.distrito;
                    $('#MainContent_txtDireccion').val(direccion.replace(distrito, ""));
                     $('#MainContent_txtDestino').val(direccion.replace(distrito, ""));
                    $('#MainContent_txtDireccionEnvio').val(direccion.replace(distrito, ""));
                    $('#MainContent_txtDistrito').val(distrito);
                    $('#hfDistrito').val(distrito);
//                    $('#hfUbigeo').val(dbObject.ubigeo);
                    
                    F_BuscarDireccionNuevo();
                }
                catch (x) { }
                MostrarEspera(false);
            },
              error: function (response) {
                
                if(response.responseText!=''){
                alertify.log(response.responseText);
                }else{
                alertify.log('Verificar conexión');
                $('#td_loading').css('display', 'none');
                }

            },
            failure: function (response) {
                toastr.warning(response.responseText);
            }
        });
    }


return true;
}
//cambio joel 210821
//aca busca si es un nuevo numero de dni o ruc
var API = ""
var ubigeo="";
var ConsultandoPadron = false;
function F_BuscarPadronSunatEdicion() {

    if (ConsultandoPadron == true)
        return true;

    ConsultandoPadron = true;

        $('#td_loading').css('display', 'block');
        var NroRuc = $('#MainContent_txtRucEdicion').val();
        F_LimpiarCampos();
        $('#MainContent_txtRucEdicion').val(NroRuc);
         if (API == "") {
         $('#hfCodDepartamento').val("");
         $('#hfCodProvincia').val("");
         $('#hfCodDistrito').val("");
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCCuentaCorriente_PadronSunat',
                data: "{'NroRuc':'" + $('#MainContent_txtRucEdicion').val() +"','CodTipoCtaCte':'1'}",
                dataType: "json",
                async: true,
                success: function (dbObject) {
                ConsultandoPadron = false;
                var data = dbObject.d;
                try {
                // condiciona joel:si en la base de datos no se encuentra ninguna condicion de ruc se manda para la apisunat
                    if (data.length > 0) {
                    $('#td_loading').css('display', 'none');
                    $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                    $('#hfCliente').val(data[0].split(',')[1]); //razon social
                    $('#MainContent_txtRucEdicion').val(data[0].split(',')[8]);
                    $('#hfNroRuc').val(data[0].split(',')[8]);
                    $('#MainContent_txtProveedorEdicion').val(data[0].split(',')[1]);
                    $('#hfCliente').val(data[0].split(',')[1]);
                    $('#MainContent_txtDireccionEdicion').val(data[0].split(',')[2]);
//                    $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                    $('#MainContent_txtDistritoEdicion').val(data[0].split(',')[4]);
                    $('#hfCodDireccion').val('0');
                    $('#hfCodDepartamento').val(data[0].split(',')[5]);
                    $('#hfCodProvincia').val(data[0].split(',')[6]);
                    $('#hfCodDistrito').val(data[0].split(',')[7]);
                    $('#hfDistrito').val(data[0].split(',')[4]);
                    $('#txtSaldoCreditoFavor').text(data[0].split(',')[12]);
                    $('#hfSaldoCreditoFavor').val(data[0].split(',')[12].replace("S/", "").replace(" ", ""));
                    $('#hfCodDireccionDefecto').val(data[0].split(',')[14]);

                    if ($('#MainContent_txtProveedorEdicion').val().trim().length > 0 & $('#hfCodDepartamento').val() === "0")
                    { alertify.error('ESPECIFIQUE LA DIRECCION Y DISTRITO, PORQUE SUNAT NO ESTA PROVEYENDO ESTA INFORMACION'); }

                    F_BuscarDireccionesCliente();
                    //F_BuscarDireccionPorDefecto();
                    }else{
                     API = "Usuario No Encontrado";
                        console.log(API);
                        F_API_RUC_Buscar();
                        F_BuscarPadronSunatEdicion();
                       
                    }
                }
                catch (x) { 
                    //alertify.log(x);
                    alertify.log('Por alguna razon el cliente no fue encontrado');
                    $('#td_loading').css('display', 'none');
                }
            },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
 }; 
  if (API == "Usuario No Encontrado") {
        //api sunat 
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url:  $('#hfurlapisunat').val() + $('#MainContent_txtRucEdicion').val() + $('#hftokenapisunat').val(),
            dataType: "json",
            async: true,
            success: function (dbObject) {
                MostrarEspera(true);
                var data = dbObject.d;                                
                try {
                API = "";
                $('#td_loading').css('display', 'none');
                    $('#MainContent_txtProveedorEdicion').val(dbObject.razonSocial); //razon social
                    $('#MainContent_txtNombreComercial').val(dbObject.razonSocial); //razon social
                    ubigeo=dbObject.ubigeo;
                    if (ubigeo==null){
                     toastr.warning("La sunat no ofrece direccion ni distrito para los ruc 10,debe colocarlo usted mismo.");
                     }
                    var direccion = dbObject.direccion;
                    var distrito = dbObject.departamento + ' ' + dbObject.provincia + ' ' + dbObject.distrito;
                    $('#MainContent_txtDireccionEdicion').val(direccion.replace(distrito, ""));
//                     $('#MainContent_txtDestino').val(direccion.replace(distrito, ""));
//                    $('#MainContent_txtDireccionEnvio').val(direccion.replace(distrito, ""));
                    $('#MainContent_txtDistritoEdicion').val(distrito);
                    $('#hfDistrito').val(distrito);
//                    $('#hfUbigeo').val(dbObject.ubigeo);
                    
                    F_BuscarDireccionNuevo();
                }
                catch (x) { }
                MostrarEspera(false);
            },
            error: function (response) {
                toastr.warning(response.responseText);
            },
            failure: function (response) {
                toastr.warning(response.responseText);
            }
        });
    }


return true;
}

function F_BuscarDatosPorRucDni(RucDni) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_BuscarClientesPorRucDniSinSaldo',
                data: "{'NroRuc':'" + RucDni +"'}",
                dataType: "json",
                async: false,
                success: function (dbObject) {
                var data = dbObject.d;
                if (data.length > 0)
                {
                    try {
                            $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                            $('#MainContent_txtProveedor').val(data[0].split(',')[1]);
                            $('#hfCliente').val($('#MainContent_txtProveedor').val()); //razon social
                            $('#MainContent_txtNroRuc').val(data[0].split(',')[8]);
                            $('#hfNroRuc').val(data[0].split(',')[8]);
                            $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                            $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                            $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                            $('#hfCodDireccion').val('0');
                            $('#hfCodDepartamento').val(data[0].split(',')[5]);
                            $('#hfCodProvincia').val(data[0].split(',')[6]);
                            $('#hfCodDistrito').val(data[0].split(',')[7]);
                            $('#hfDistrito').val(data[0].split(',')[4]);
                            try { 
                            $('#txtSaldoCreditoFavor').text(data[0].split(',')[9]);
                            $('#hfSaldoCreditoFavor').val(data[0].split(',')[9].replace("S/", "").replace(" ", ""));} 
                            catch (e) { 
                            $('#txtSaldoCreditoFavor').text("0.00");
                            $('#hfSaldoCreditoFavor').val("0.00"); }
                            
                            
                            if ($('#MainContent_txtNroRuc').val() === '11111111')
                            {
                                $('#MainContent_txtProveedor').prop('readonly', false);
                            }
                            F_BuscarDireccionesCliente(); 
                            return true;
                    }
                    catch (x) { alertify.log(x); }
                }
                else
                {
                    var NroRuc = $('#MainContent_txtNroRuc').val();
                    F_LimpiarCampos();
                    $('#MainContent_txtNroRuc').val(NroRuc);
                    if ($('#MainContent_txtNroRuc').val().length == 8)
                    {
                            $("#hfCodCtaCte").val('0');
                            if ($('#MainContent_txtNroRuc').val() != '11111111')
                            {
                                $('#MainContent_txtProveedor').prop('readonly', false);
                                $('#MainContent_txtProveedor').val('---NUEVO CLIENTE---');
                                }
                            $('#MainContent_txtProveedor').select();
                    }
                    return true;
                }



            },


                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });



return true;
}

function F_CambioSerie_TipoDoc() {
if (!F_SesionRedireccionar(AppSession)) return false;

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodDoc: $("#MainContent_ddlTipoDoc").val()
            };

            
        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Series_Documentos_NET
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
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[4]);

                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');

                        $('.ccsestilo').css('background', '#FFFFE0');
                        

                            if ($('#MainContent_ddlFormaPago').val() == "1" | $('#MainContent_ddlFormaPago').val() == "6" | $('#MainContent_ddlFormaPago').val() == "15")
                                   $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
                            else
                                   $('#MainContent_txtAcuenta').val('0.00');
                        F_Mostrar_CorrelativoVarios($("#MainContent_ddlTipoDoc").val());
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

function F_Mostrar_CorrelativoVarios(CodDoc) {
    var arg;

    try {
        var SerieDoc = $("#MainContent_ddlSerie option:selected").text();

        var objParams = {
            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: SerieDoc,
            Filtro_CodEmpresa: $("#MainContent_ddlEmpresa").val()
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

                    if (str_resultado_operacion == "1") {
                            $('#MainContent_txtNumero').val(result.split('~')[2]);
                        }
                    else {
                        alertify.log(str_mensaje_operacion);
                        }
                    return false ;                
                }
            );
    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);
    }
}

function F_ImprimirFacturaPDF(Fila) {
        var rptURL = '';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var TipoArchivo = 'application/pdf';
        var CodTipoArchivo = '5';
        var CodMenu = '681';
        var CodNotaIngreso = $("#" + Fila.id.replace("imgPdf", "lblID")).val();
        var CodTipoDoc = $("#" + Fila.id.replace("imgPdf", "hfCodTipoDoc")).val();
        var CodEstado = $("#" + Fila.id.replace("imgPdf", "hfCodEstado")).val();
        var NombreTabla = "Electronica";
        var NombreArchivo = '';
        var CodTipoFormato =  $('#MainContent_ddlFormatoImpresion2').val(); // POR DEFECTO A4

          if (CodEstado==3)
        {
        alertify.log("OPCION NO VALIDA PARA DOCUMENTOS ANULADOS");
        return false ;
        }

        ArchivoRPT = "";
        rptURL = '../Reportes/Crystal.aspx';
        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'Codigo=' + CodNotaIngreso + '&';
        rptURL = rptURL + 'CodTipoDoc=' + CodTipoDoc + '&';
        rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
        rptURL = rptURL + 'NombreArchivo=' + '' + '&';
        rptURL = rptURL + 'CodTipoFormato=' + CodTipoFormato + '&';

        window.open(rptURL, "PopUpRpt", Params);
        
    return false;
}

function F_ImprimirGrabar(CodNotaIngreso, CodTipoDoc) {
        var rptURL = '';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var CodMenu = '704';
        var NombreTabla = "Electronica";
        var NombreArchivo = "Web_Reporte_CajaBanco_rptEgresos_Ticket.rpt";

        ArchivoRPT = "";
        rptURL = '../Reportes/Crystal.aspx';
        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'Codigo=' + CodNotaIngreso + '&';
        rptURL = rptURL + 'CodTipoDoc=' + CodTipoDoc + '&';
        rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
        rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';

        window.open(rptURL, "PopUpRpt", Params);
        
    return false;
}

function F_Imprimir(Fila) {
        var rptURL = '';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var CodMenu = '704';
        var CodNotaIngreso = $("#" + Fila.id.replace("imgImpresion", "lblID")).val();
        var CodTipoDoc = $("#" + Fila.id.replace("imgImpresion", "hfCodTipoDoc")).val();
        var CodEstado = $("#" + Fila.id.replace("imgImpresion", "hfCodEstado")).val();
        var NombreTabla = "Electronica";
        var NombreArchivo = "Web_Reporte_CajaBanco_rptEgresos_Ticket.rpt";

        if (CodEstado==3)
        {
            alertify.log("OPCION NO VALIDA PARA DOCUMENTOS ANULADOS");
            return false ;
        }

        ArchivoRPT = "";
        rptURL = '../Reportes/Web_Pagina_Crystal_Nuevo.aspx';
        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'Codigo=' + CodNotaIngreso + '&';
        rptURL = rptURL + 'CodTipoDoc=' + CodTipoDoc + '&';
        rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
        rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';

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
                        F_CambioSerie_TipoDoc() ;
                    }               
                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);
    }
}

function F_CambioSerie_TipoDoc() {
if (!F_SesionRedireccionar(AppSession)) return false;
    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha:      $('#MainContent_txtEmision').val(),
                Filtro_CodDoc:     $("#MainContent_ddlTipoDoc").val(),
                Filtro_CodEmpresa: $("#MainContent_ddlEmpresa").val()
            };
            
        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Series_Documentos_NET
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
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[4]);

                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#div_serie').css('display', 'block');
                        $('#div_txtSerie').css('display', 'none');
                        F_Mostrar_CorrelativoVarios($("#MainContent_ddlTipoDoc").val());
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

function F_ListarNroCuenta() {
if (!F_SesionRedireccionar(AppSession)) return false;
    var arg;

    try {

        var objParams = {
            Filtro_CodBanco:  $('#MainContent_ddlBanco').val(),
            Filtro_CodMoneda:  $('#MainContent_ddlMoneda').val()
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
                     F_Update_Division_HTML('div_Cuenta', result.split('~')[2]);
                            $('#MainContent_ddlCuenta').css('background', '#FFFFE0');    
                            F_Mostrar_Correlativo(8);   
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


// DETALLE OBSERVACION
var CtlgvObservacion;
var HfgvObservacion;
function imgMasObservacion_Click(Control) {
    CtlgvObservacion = Control;
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
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'lblID')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleObservacion_' + Col;
        HfgvObservacion = '#' + Fila.replace('pnlOrdersObservacion', 'grvDetalleObservacion');

        if ($(HfgvObservacion).val() === "1") {
            $(CtlgvObservacion).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacion).next().html() + '</td></tr>');
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

                        $(CtlgvObservacion).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacion).next().html() + '</td></tr>');
                        $(HfgvObservacion).val('1');
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

function F_AnularPopUP(Fila) {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblCodigo');
    var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
    var lblnumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
    var lblcliente = '#' + imgID.replace('imgAnularDocumento', 'lblRazonSocial');
    var lblID = '#' + imgID.replace('imgAnularDocumento', 'lblID');
    var hfCodTipoDoc_grilla = '#' + imgID.replace('imgAnularDocumento', 'hfCodTipoDoc');
    var hfCodMotivo = '#' + imgID.replace('imgAnularDocumento', 'hfCodMotivo');
    var hfCodEstado = '#' + imgID.replace('imgAnularDocumento', 'hfCodEstado');

    if ($(hfCodMotivo).val()==5)
    {
    alertify.log('EXCEDENTE DE COBRANZAS NO SE PUEDE ANULAR, ELIMINE LA COBRANZA');
    return false;
    }

    if ($(hfCodEstado).val()==3)
    {
    alertify.log('SE ENCUENTRA ANULADO');
    return false;
    }

    $('#hfCodDocumentoVentaAnulacion').val($(lblCodigo).val());
    $('#hfClienteAnulacion').val($(lblcliente).text());
    $('#hfNumeroAnulacion').val($(lblnumero).text());
    $('#MainContent_txtObservacionAnulacion').val('');
    $('#hfCodTipoDoc_grilla').val($(hfCodTipoDoc_grilla).val());
    $('#hfid').val($(lblID).val());
    $('#div_Anulacion').dialog({
        resizable: false,
        modal: true,
        title: "Anulacion de Comprobande de Ingreso",
        title_html: true,
        height: 190,
        width: 470,
        autoOpen: false
    });
    $('#div_Anulacion').dialog('open');
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
        var Codigo = $('#' + Fila.replace('pnlOrdersAuditoria', 'lblID')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleAuditoria_' + Col;
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

//Joel
//api sunat
//esta funcion buscar la direccion con el ubigeo que se consigue con el api,esta funcion se encuentra en servicios
function F_BuscarDireccionNuevo() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_Direccion_Buscar', 
        data: "{'Ubigeo':'" + ubigeo + "'}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            $('#hfCodDepartamento').val(data[0].split(',')[0]);
            $('#hfCodProvincia').val(data[0].split(',')[1]);
            $('#hfCodDistrito').val(data[0].split(',')[2]);
            return true;

        },
        complete: function () {
            if (($('#hfRegion').val() == '' | $('#hfProvincia').val() == '') && $('#hfDistrito').val() == '') {
                toastr.warning('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });

    return false;
}
// esta funcion se encarga de busca la url y el token del api para la busque en la parte de padronsunat
function F_API_RUC_Buscar() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_API_RUC_Buscar',
        data: "{}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            $('#hfurlapisunat').val(data[0].split(',')[0]);
            $('#hftokenapisunat').val(data[0].split(',')[1]);
            
            return true;

        },
        complete: function () {
         
        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });

    return false;
}
//limpia los campos
function F_LimpiarCampos() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtNombreComercial').val('');

    $('#hfRegion').val('0');
    $('#hfProvincia').val('0');
    $('#hfDistrito').val('0');

//    $('#hftokenapisunat').val('');
//    $('#hfurlapisunat').val('');
    

    return true;
}

//FINAL

function F_BuscarDatosPorRucDniEdicion(RucDni) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_BuscarClientesPorRucDniSinSaldo',
                data: "{'NroRuc':'" + RucDni +"'}",
                dataType: "json",
                async: false,
                success: function (dbObject) {
                var data = dbObject.d;
                if (data.length > 0)
                {
                    try {
                            $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                            $('#MainContent_txtProveedorEdicion').val(data[0].split(',')[1]);
                            $('#hfCliente').val($('#MainContent_txtProveedor').val()); //razon social
                            $('#MainContent_txtRucEdicion').val(data[0].split(',')[8]);
                            $('#hfNroRuc').val(data[0].split(',')[8]);
                            $('#MainContent_txtDireccionEdicion').val(data[0].split(',')[2]);
                            $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                            $('#MainContent_txtDistritoEdicion').val(data[0].split(',')[4]);
                            $('#hfCodDireccion').val('0');
                            $('#hfCodDepartamento').val(data[0].split(',')[5]);
                            $('#hfCodProvincia').val(data[0].split(',')[6]);
                            $('#hfCodDistrito').val(data[0].split(',')[7]);
                            $('#hfDistrito').val(data[0].split(',')[4]);
                            try { 
                            $('#txtSaldoCreditoFavor').text(data[0].split(',')[9]);
                            $('#hfSaldoCreditoFavor').val(data[0].split(',')[9].replace("S/", "").replace(" ", ""));} 
                            catch (e) { 
                            $('#txtSaldoCreditoFavor').text("0.00");
                            $('#hfSaldoCreditoFavor').val("0.00"); }
                            
                            
                            if ($('#MainContent_txtRucEdicion').val() === '11111111')
                            {
                                $('#MainContent_txtProveedorEdicion').prop('readonly', false);
                            }
                            F_BuscarDireccionesCliente(); 
                            return true;
                    }
                    catch (x) { alertify.log(x); }
                }
                else
                {
                    var NroRuc = $('#MainContent_txtNroRuc').val();
                    F_LimpiarCampos();
                    $('#MainContent_txtNroRuc').val(NroRuc);
                    if ($('#MainContent_txtNroRuc').val().length == 8)
                    {
                            $("#hfCodCtaCte").val('0');
                            if ($('#MainContent_txtNroRuc').val() != '11111111')
                            {
                                $('#MainContent_txtProveedor').prop('readonly', false);
                                $('#MainContent_txtProveedor').val('---NUEVO CLIENTE---');
                                }
                            $('#MainContent_txtProveedor').select();
                    }
                    return true;
                }



            },


                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });



return true;
}
