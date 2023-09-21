var AppSession = "../CuentasPorCobrar/RegistroCobranzas.aspx";
var CodigoMenu = 5000; var CodigoInterno = 1;

var Buscando = false;
var P_CodMoneda_Inicial;
var P_CXCCXP_ASIGNAR_ACUENTA_AUTOMATICO;
var P_COBRANZAS_CHECK_MANTIENE_CLIENTE;

$(document).ready(function () {

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }
      $('#MainContent_txtClienteDetallado2').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'0'}",
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
            $('#hfCodCtaCteConsultaEliminado').val(i.item.val);
        },
        minLength: 3
    });

    $('#MainContent_txtProveedor').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'0'}",
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
            Buscando = true;
            $('#hfCodCtaCte').val(i.item.val);          
            $('#hfCliente').val(i.item.label);          

            if (F_ValidarAgregar() === true)
                F_AgregarTemporal();
        },
        minLength: 3
    });

    $('#MainContent_txtProveedorConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'0'}",
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

    $('#MainContent_txtClienteDetallado').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'0'}",
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
            $('#hfCodCtaCteDetallado').val(i.item.val);
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

    $('#MainContent_btnFiltrar').click(function () {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    if (F_ValidarAgregar())
        F_AgregarTemporal();
        
        return false;       
    });  

    $('#btnGrabarEdicion').click(function () {
    if (F_ValidarAgregar())
        F_AgregarTemporal();

        return false;       
    });  

    $('#MainContent_btnLimpiarFiltros').click(function () {
        F_Inicializar_Filtros();
        return false;
       
    });  
    
    $('#MainContent_btnAgregar').click(function () {
    if (F_PermisoOpcion(CodigoMenu, 5000101, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
            if ($('#hfCobranzas').val()==0)
            { 
                if (!F_ValidarAgregar())
                    return false;
                F_AgregarTemporal();
            }
            else
            {
                if (!F_ValidarAgregarFacturaCobranzas())
                    return false;
                F_AgregarTemporalCobranzas();        
            }
            return false;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }     
        });

    $('#MainContent_btnEliminarFactura').click(function () {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
            if(!F_ValidarEliminar_Factura())
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LAS FACTURAS SELECCIONADAS"))
            F_EliminarTemporal_Factura();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR LA COBRANZA"))
            F_GrabarDocumento();

            return false;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
             
        });

    $('#MainContent_btnEdicionMedioPago').click(function () {

        var Cuerpo = '#MainContent_';

        if (($(Cuerpo + 'ddlMedioPagoEdicion').val() != '1'  & $(Cuerpo + 'ddlMedioPagoEdicion').val() != '6') & $('#MainContent_ddlCuentaEdicion option:selected').text() == '' )
         {
            toastr.warning('DEBE ESPECIFICAR UNA CUENTA VALIDA');
            return false;
         };

        if (($(Cuerpo + 'ddlMedioPagoEdicion').val() != '1'  & $(Cuerpo + 'ddlMedioPagoEdicion').val() != '6') & $('#MainContent_txtNroOperacionEdicion').val() == '')
        {
            toastr.warning('DEBE ESPECIFICAR UN NUMERO DE OPERACION');
            return false;
        }

           if (($(Cuerpo + 'ddlMedioPagoEdicion').val()!='1' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='5' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='6') && $(Cuerpo + 'txtNroOperacionEdicion').val()=='') {
                toastr.warning('Nro Operacion');
                return false;
            }

            if (($(Cuerpo + 'ddlMedioPagoEdicion').val()!='1' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='5' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='6') && $(Cuerpo + 'ddlCuentaEdicion').val()==null) {
                toastr.warning('Nro Cuenta');
                return false;
            }

            if (($(Cuerpo + 'ddlMedioPagoEdicion').val()!='1' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='5' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='6') && $(Cuerpo + 'ddlCuentaEdicion').val()==null) {
                toastr.warning('Nro Cuenta');
                return false;
            }


        if (confirm("ESTA SEGURO DE EDITAR LOS MEDIOS DE PAGO"))
        F_EdicionMedioPago();

        return false;
       
    });  

    $('#MainContent_btnNuevo').click(function () {
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

    $('#MainContent_btnBuscarDetallado').click(function () {
     try 
        {
          F_BuscarDetallado();
          return false;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }     
    });

    //elIMINADOS
    $('#MainContent_btnBuscarConsultaEliminados').click(function () {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
          F_BuscarEliminados();
          return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnReporte').click(function () {
    if (F_PermisoOpcion(CodigoMenu, 5000101, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
        if ($('#hfEmpresa').val()=='DISTRIBUIDORA WIESSE E.I.R.L.'){
        F_Reporte_Povis();
        }else{
         F_Reporte();
        }
         
          return false;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }     
    });

    $('#MainContent_btnBuscarDetallado').click(function () {
     try 
        {
          F_BuscarDetallado();
          return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabarLetra').click(function () {
     try 
        {
            if(F_ValidarAgregarLetra()==false)
              return false;

            if (confirm("Esta Seguro de Agregar la Letra"))
            F_AgregarLetra();
//                F_Nuevo();
//            }
            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnEliminarLetra').click(function () {
     try 
        {
            if(F_ValidarEliminar_Letra()==false)
              return false;

            if (confirm("Esta seguro de eliminar la(s) letra(s) seleccionada(s)"))
            F_EliminarTemporal_Letra();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnCobranzas').click(function () {
        try 
        {
          var Cadena = "Ingrese los sgtes. campos: "     
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {toastr.warning(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Factura",
                    title_html: true,
                    height: 450,
                    width: 420,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               
                var Letra=0;
                var Factura=0;

                if ($('#MainContent_chkFactura').is(':checked'))
                Factura=1;

                if ($('#MainContent_chkFactura').is(':checked'))
                Letra=1;

                 var objParams = {
                                    Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                    Filtro_Letra: Letra,
                                    Filtro_Factura: Factura
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                  MostrarEspera(true);

                F_Buscar_FacturaPagos_NET(arg, function (result) {


                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    $('#hfCobranzas').val(1);

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);                            
                $('#hfCobranzas').val(1);     
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
         MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }


        return false;

    });  

    $('#MainContent_btnCobranzasEliminar').click(function () {
     try 
        {
            if(!F_ValidarEliminar_FacturaCobranza())
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LAS FACTURAS SELECCIONADAS"))
            F_EliminarTemporal_FacturaCobranza();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnNotaVenta').click(function () {
        try 
        {
          var Cadena = "Ingrese los sgtes. campos:  <br> <p></p>"     


//           if ($('#hfCodCtaCte').val()=="4479")
//             $('#hfCodCtaCte').val("3873");

//          if ($('#hfCodCtaCte').val()!="3873")
//          Cadena=Cadena + '<p></p>' + "Cliente Varios";

          if (Cadena != "Ingrese los sgtes. campos:  <br> <p></p>")
          {toastr.warning(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Nota de Venta",
                    title_html: true,
                    height: 450,
                    width: 450,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');               

                 var objParams = {
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                    Filtro_Total: '700'
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Buscar_NotaVenta_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);   
                     $('#hfNotaVenta').val(0);                         
                  
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }


        return false;

    }); 

    $('#MainContent_btnGrabarEditar').click(function () {  
        if ($('#hfCodTipoDoc').val()==3  || $('#hfCodTipoDoc').val()==8)
            $('#MainContent_txtAcuentaEdicion').val(Math.abs($('#MainContent_txtAcuentaEdicion').val()) * -1);
        F_EditarDetalle();
        return false;   
    });  

    $('#MainContent_txtEmision').on('change', function (e) {
        F_ListarNroCuenta($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $('#MainContent_txtAmortizacion').blur(function () {
     if ($('#MainContent_txtAmortizacion').val()=='')
     $('#MainContent_txtAmortizacion').val('0.00');

     $('#MainContent_txtTotalPago').val(parseFloat(parseFloat($('#MainContent_txtAmortizacion').val()) + parseFloat($('#MainContent_txtTotalFactura').val())).toFixed(3));
     $('#MainContent_txtAmortizacion').val(parseFloat($('#MainContent_txtAmortizacion').val()).toFixed(3));
     return false;
    });

    $('#MainContent_txtCobroOperacion').blur(function () {
        f_RecontarGrids(1);
     return false;
    });

    $('#MainContent_txtTC').blur(function () {
        f_RecontarGrids(1);
     return false;
    });

    $('#MainContent_chkFactura').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkLetra').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $('#MainContent_chkLetra').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkFactura').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $("#MainContent_chkCComision").change(function () {
        if (this.checked)  {
          $('#MainContent_chkSComision').prop('checked', false);        
          $('#MainContent_txtComision').prop('disabled', false);   
          $('#MainContent_txtComision').val(5); }
    });

    $("#MainContent_chkSComision").change(function () {
        if (this.checked) {
          $('#MainContent_chkCComision').prop('checked', false);      
          $('#MainContent_txtComision').prop('disabled', true);   
          $('#MainContent_txtComision').val(0); }
    });
           
    $("#MainContent_chkFiltroMonto").click(function () {
        if ($(this).is(':checked')) {
            $('#MainContent_txtFiltroMontoDesde').prop('disabled', false);
            $('#MainContent_txtFiltroMontoHasta').prop('disabled', false);
            $('#MainContent_txtFiltroMontoDesde').val('0');
            $('#MainContent_txtFiltroMontoHasta').val('99999');
        }
        else {
            $('#MainContent_txtFiltroMontoDesde').prop('disabled', true);
            $('#MainContent_txtFiltroMontoHasta').prop('disabled', true);
            $('#MainContent_txtFiltroMontoDesde').val('');
            $('#MainContent_txtFiltroMontoHasta').val('');
        }
    });

    $("#MainContent_chkRango").click(function () {
        if ($(this).is(':checked')) 
            $('#MainContent_chkRegistro').prop('checked', false);       
    });

     $("#MainContent_chkRegistro").click(function () {
        if ($(this).is(':checked')) 
            $('#MainContent_chkRango').prop('checked', false);       
    });

    $("#MainContent_txtProveedor").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtProveedor").val() != $("#hfCliente").val() & $("#hfCodCtaCte").val() != '0' & Buscando == false)
        {
            $("#MainContent_txtProveedor").val('');
            $("#hfCliente").val('');
            $("#hfCodCtaCte").val('0');
           // toastr.warning('paso por aca');
            F_Nuevo();
        }
    });
    
    $('#MainContent_txtAcuentaEdicion').blur(function () {
    F_CalcularEdicion(); 
    return true;
});
    
    $('#MainContent_txtTCEdicion').blur(function () {
    F_CalcularEdicion();
    return true;
});

    $('#MainContent_btnAnular').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
            try {
                if ($.trim($('#MainContent_txtObservacionAnulacion').val()).length<10)
                {
                 toastr.warning("INGRESAR LA OBSERVACION (MINIMO 10 CARACTERES)");
                  return false;
                }
                F_AnularRegistro();
                return false;
            }
            catch (e) {
                toastr.warning("Error Detectado: " + e);
            }
        });

    $(document).on("change", "select[id $= 'MainContent_ddlMedioPago']",function () {

    if ($("#MainContent_ddlMedioPago").val() === '3' | $("#MainContent_ddlMedioPago").val() === '4') {
        $("#td_DatosBancarios").css('display', 'block');
    }
    else
    {
        $("#td_DatosBancarios").css('display', 'none');
    }
    return true;
});

    $(document).on("change", "select[id $= 'MainContent_ddlMedioPagoEdicion']",function () {

    if ($("#MainContent_ddlMedioPagoEdicion").val() === '1') {
        $("#MainContent_ddlBancoEdicion").val(null);
        $("#MainContent_ddlCuentaEdicion").val(null);
        $("#MainContent_txtNroOperacionEdicion").val('');
    }
    
    return true;
});

    $(document).on("change", "select[id $= 'MainContent_ddlTipoDevolucion']",function () {

//    if ($("#MainContent_ddlTipoDevolucion").val() === '1') {
//        //$("#MainContent_ddlVuelto").attr('disabled', false);
//    }
//    else
//    {
//        $("#MainContent_ddlVuelto").val($("#MainContent_ddlMoneda").val());
//        $("#MainContent_ddlVuelto").attr('disabled', true);
//    }
    return true;
});

    F_Controles_Inicializar();

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtTC').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalFactura').css('background', '#FFFFE0');

    $('#MainContent_txtResponsable').css('background', '#FFFFE0');

    $('#MainContent_txtPagador').css('background', '#FFFFE0');

    $('#MainContent_txtTotalLetra').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalDeuda').css('background', '#FFFFE0');

    $('#MainContent_txtCobroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalCobranza').css('background', '#FFFFE0');

    $('#MainContent_txtProveedorConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtComision').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroFechaDesde').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroFechaHasta').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroMontoDesde').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroMontoHasta').css('background', '#FFFFE0');

    $('#MainContent_ddlFiltroMoneda').css('background', '#FFFFE0');

    $('#MainContent_ddlFiltroEstado').css('background', '#FFFFE0');

    $('#MainContent_txtFacturaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalFacturaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtSaldoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtAcuentaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtNuevoSaldoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTCEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlTipoDevolucion').css('background', '#FFFFE0');

    $('#MainContent_ddlVuelto').css('background', '#FFFFE0');

    $('#MainContent_ddlFlagAcuenta').css('background', '#FFFFE0');

    $('#MainContent_txtTasa').css('background', '#FFFFE0');

    $('#MainContent_txtEmisionEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlCajaFisicaEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlMedioPagoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $('#MainContent_txtObservacionEdicion').css('background', '#FFFFE0');
        
    $('#MainContent_txtDesdeDetallado').css('background', '#FFFFE0');

    $('#MainContent_txtHastaDetallado').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroDetallado').css('background', '#FFFFE0');

    $('#MainContent_txtClienteDetallado').css('background', '#FFFFE0');

    $('#MainContent_txtObservacionAnulacion').css('background', '#FFFFE0');

    $('#MainContent_txtnroRecibo').css('background', '#FFFFE0');

    $('#MainContent_ddlCobrador').css('background', '#FFFFE0');

    $('#MainContent_txtNroReciboEdicion').css('background', '#FFFFE0');

    F_Derecha();

    Buscando = false;
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

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']",function () {    
       $('#MainContent_btnFiltrar').click();
       
} );

$(document).on("change", "select[id $= 'MainContent_ddlBanco']",function () {
     F_ListarNroCuenta();
} );

$(document).on("change", "select[id $= 'MainContent_ddlBancoEdicion']",function () {
     F_ListarNroCuentaEdicion();
} );

$(document).on("change", "select[id $= 'MainContent_ddlEmpresa']", function () {
    F_CAJA_X_EMPRESA($('#MainContent_ddlEmpresa').val());
});

$(document).on("change", "select[id $= 'MainContent_ddlEmpresaConsulta']", function () {
    $('#MainContent_ddlEmpresa').val($('#MainContent_ddlEmpresaConsulta').val());
    F_CAJA_X_EMPRESA($('#MainContent_ddlEmpresaConsulta').val());
});

function F_Controles_Inicializar() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    F_Inicializar_Parametros();
    if (P_COBRANZAS_CHECK_MANTIENE_CLIENTE === "1")
        $("#MainContent_chkMantenerCliente").prop("checked", true);

    var Permiso = F_PermisoOpcion_SinAviso(CodigoMenu, 777005, '');

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie: 61,
                Filtro_CodBanco: 1,
                Filtro_CodMoneda: 1,
                Filtro_CodCargo: 6,
                Filtro_CodEstado: 1,
                Filtro_CodEmpresa: 1
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
                        F_Update_Division_HTML('div_moneda', result.split('~')[2]);
                        F_Update_Division_HTML('div_MedioPago', result.split('~')[4]);
                        F_Update_Division_HTML('div_Banco', result.split('~')[5]);
                        F_Update_Division_HTML('div_Cuenta', result.split('~')[6]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[7]);
                        F_Update_Division_HTML('div_BancoEdicion', result.split('~')[8]);
                        F_Update_Division_HTML('div_CuentaEdicion', result.split('~')[9]);
                        F_Update_Division_HTML('div_FiltroMoneda', result.split('~')[10]);
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[11]);
                        F_Update_Division_HTML('div_MedioPagoConsulta', result.split('~')[12]);
                        F_Update_Division_HTML('div_CajaFisicaConsulta', result.split('~')[13]);
                        F_Update_Division_HTML('div_Empresa', result.split('~')[15]);
                        F_Update_Division_HTML('div_EmpresaConsulta', result.split('~')[16]);
                        F_Update_Division_HTML('div_EmpresaConsulta2', result.split('~')[17]);
                        F_Update_Division_HTML('div_EmpresaDetallado', result.split('~')[20]);
                        F_Update_Division_HTML('div_TipoDocDetallado', result.split('~')[21]);
                        F_Update_Division_HTML('div_AlmacenDetallado', result.split('~')[22]);
                        F_Update_Division_HTML('div_Tipodoc', result.split('~')[23]);
                        F_Update_Division_HTML('div_Tipodoc2', result.split('~')[24]);
                        F_Update_Division_HTML('div_EmpresaConsulta3', result.split('~')[25]);
                        F_Update_Division_HTML('div_MedioPagoConsulta2', result.split('~')[26]);
                        F_Update_Division_HTML('div_AlmacenDetallado2', result.split('~')[27]);
                        F_Update_Division_HTML('div_Cobrador', result.split('~')[28]);
                        F_Update_Division_HTML('div_Ruta', result.split('~')[30]);
                        F_Update_Division_HTML('div_Vendedor', result.split('~')[29]);
                        $('#hfCodEmpresa').val(result.split('~')[18]);
                        $('#hfEmpresa').val(result.split('~')[31]);
                        $('#MainContent_ddlCajaFisicaConsulta').val(result.split('~')[19]);
                        $('#MainContent_ddlCajaFisica').val(result.split('~')[19]);
                        $('#hfCodCajaFisica').val(result.split('~')[19]);
                        $('#MainContent_txtTC').val(parseFloat(result.split('~')[3]).toFixed(6));
                        $('#MainContent_ddlMoneda').val(P_CodMoneda_Inicial);
                        $('#MainContent_ddlSerieConsulta').val('1');
                        $('#MainContent_ddlVendedor').val('0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPagoConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddltipodoc').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlCobrador').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').val(1);
                        $('#MainContent_ddlFiltroEstado').val(1);
                        $('#MainContent_ddlMedioPagoConsulta').val(0);
                        $('#MainContent_ddlMedioPagoConsulta2').val(0);
                        $('#MainContent_ddlAlmacenDetallado').val(0);
                        $('#MainContent_ddlTipoDocDetallado').val(0);
                        $('#MainContent_ddltipodoc').val(0);
                        $('#MainContent_ddltipodoc2').val(0);
                        $('#MainContent_ddlBancoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuentaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlFiltroMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisicaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaConsulta2').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaDetallado').css('background', '#FFFFE0');
                        $('#MainContent_ddlAlmacenDetallado').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocDetallado').css('background', '#FFFFE0');                        
                        $('#MainContent_ddlRuta').css('background', '#FFFFE0');
                        $('#MainContent_ddlFlagAcuenta').css('background', '#FFFFE0');
                        //Eliminados
                        $('#MainContent_ddlEmpresaConsulta3').css('background', '#FFFFE0');
                        $('#MainContent_txtDesdeDetallado2').css('background', '#FFFFE0');
                        $('#MainContent_txtHastaDetallado2').css('background', '#FFFFE0');
                        $('#MainContent_txtNumeroDetallado2').css('background', '#FFFFE0');
                        $('#MainContent_txtClienteDetallado2').css('background', '#FFFFE0');
                        $('#MainContent_ddlAlmacenDetallado2').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPagoConsulta2').css('background', '#FFFFE0');
                        $('#MainContent_ddltipodoc2').css('background', '#FFFFE0');

                        $('.ccsestilo').css('background', '#FFFFE0');
                        
                        if (Permiso==0)
                        {
                            $('#MainContent_txtTC').prop('disabled',true);
                            $('#MainContent_txtTCEdicion').prop('disabled',true);
                        }                            
                        else
                        {
                            $('#MainContent_txtTC').prop('disabled',false);
                            $('#MainContent_txtTCEdicion').prop('disabled',false);
                        }                            

                        F_Inicializar_Filtros();
                        F_ListarNroCuenta();
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

function F_Inicializar_Parametros() {
        P_CodMoneda_Inicial = "1";
        P_CXCCXP_ASIGNAR_ACUENTA_AUTOMATICO = "0";
        P_COBRANZAS_CHECK_MANTIENE_CLIENTE = "0";
        
var Parametros = F_ParametrosPagina('', CodigoMenu, CodigoInterno);
$.each(Parametros, function (index, item) {

    switch(item.Parametro) {
        case "P_CODMONEDA" :
        P_CodMoneda_Inicial = item.Valor;
        case "P_CXCCXP_ASIGNAR_ACUENTA_AUTOMATICO" :
        P_CXCCXP_ASIGNAR_ACUENTA_AUTOMATICO = item.Valor;
        break;
        case "P_COBRANZAS_CHECK_MANTIENE_CLIENTE" :
        P_COBRANZAS_CHECK_MANTIENE_CLIENTE = item.Valor;
        break;
    };

});


return true;
}

function F_ValidarAgregar() {
if (!F_SesionRedireccionar(AppSession)) return false;


    //valido que los datos esten bien
    //-------------------------------
    if ($('#hfCodCtaCte').val() === 0)
    {
        toastr.warning('AGREGAR CLIENTE');
        return false;
    }

    if ($('#MainContent_chkFiltroMonto').prop('checked') === true)
    {
        if ($('#MainContent_txtFiltroMontoDesde').val().trim() === '' | $('#MainContent_txtFiltroMontoHasta').val().trim() === '')
        {
            toastr.warning('ESPECIFIQUE UN RANGO DE MONTO VALIDO');    
            $('#MainContent_txtFiltroMontoDesde').focus();
            return false;
        }


        if (isNaN($('#MainContent_txtFiltroMontoDesde').val()) | isNaN($('#MainContent_txtFiltroMontoHasta').val())) {
            toastr.warning('ESPECIFIQUE UN RANGO DE MONTO VALIDO');    
            $('#MainContent_txtFiltroMontoDesde').focus();        
            return false;
        }

        if (Number($('#MainContent_txtFiltroMontoDesde').val()) > Number($('#MainContent_txtFiltroMontoHasta').val())) {
            toastr.warning('ESPECIFIQUE UN RANGO DE MONTO VALIDO');    
            $('#MainContent_txtFiltroMontoDesde').focus();        
            return false;
        }
    }
    
    return true;
}

function F_AgregarTemporal() {
if (!F_SesionRedireccionar(AppSession)) return false;

        try 
        {
            var FlagFiltroFecha = 0;
            if ($('#MainContent_chkFiltroFecha').prop('checked') === true)
                FlagFiltroFecha = 1;

            var FlagFiltroMonto = 0;
            var FiltroMontoDesde = 0;
            var FiltroMontoHasta = 0;
            var FlagOC = 0;
            if ($('#MainContent_chkFiltroMonto').prop('checked') === true) {
                FlagFiltroMonto = 1; 
                FiltroMontoDesde = $('#MainContent_txtFiltroMontoDesde').val();
                FiltroMontoHasta = $('#MainContent_txtFiltroMontoHasta').val();
                }

            if ($('#MainContent_chkOC').prop('checked') === true) {
                FlagOC = 1; 
                }

            var FiltroCodMoneda = 0;
            var FiltroEstado = 0;


            //cada que haga una busqueda seran temporales diferentes
            $('#hfCodigoTemporal').val('0');
            $('#hfCodigoTemporalPago').val('0');

            var objParams = {
                    Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                    Filtro_FlagFiltroFecha: FlagFiltroFecha,
                    Filtro_FechaDesde: $('#MainContent_txtFiltroFechaDesde').val(),
                    Filtro_FechaHasta: $('#MainContent_txtFiltroFechaHasta').val(),
                    Filtro_FlagFiltroMonto: FlagFiltroMonto,
                    Filtro_MontoDesde: FiltroMontoDesde,
                    Filtro_MontoHasta: FiltroMontoHasta,
                    Filtro_CodMoneda: $('#MainContent_ddlFiltroMoneda').val(),
                    Filtro_CodEstado: $('#MainContent_ddlFiltroEstado').val(),
                    Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                    Filtro_CodigoTemporalPago: $('#hfCodigoTemporalPago').val(),
                    Filtro_TC: $('#MainContent_txtTC').val(),
                    Filtro_CodEmpresa: $('#MainContent_ddlEmpresaConsulta').val(),
                    Filtro_FlagOC:FlagOC
            };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_AgregarTemporal_NET(arg, function (result) {

                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#hfCodigoTemporalPago').val(result.split('~')[4]);
                    F_Update_Division_HTML('div_grvFacturaCobranzas', result.split('~')[5]);
                    F_Update_Division_HTML('div_grvFacturaPagos', result.split('~')[6]);
                    $('#lblRegistroCobranza').text(F_Numerar_Grilla("grvFacturaCobranzas", 'lblFactura')); 
                    $('#lblRegistroPagados').text(F_Numerar_Grilla("grvFacturaPagos", 'lblFactura')); 
                    $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val() - $('#MainContent_txtTotalDeuda').val()).toFixed(2));
                    $('.ccsestilo').css('background', '#FFFFE0');
                   
                    Buscando = false;
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }
                 F_ListarNroCuenta();
                return false;
                });
        }        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
}

function F_MostrarTotales(){
if (!F_SesionRedireccionar(AppSession)) return false;

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

function F_EliminarTemporal_Factura(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblID='';
        
               
                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblID = chkSi.replace('chkEliminar', 'lblID');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(lblID).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_CodigoTemporal:$('#hfCodigoTemporal').val(),
                                  Filtro_CodMoneda:$('#MainContent_ddlMoneda').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_EliminarTemporal_Factura_NET(arg, function (result) {
    
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                        $('#MainContent_txtTotalCobranza').val('0.00');
                    else
                        $('#MainContent_txtTotalCobranza').val(result.split('~')[5]);                   
                    
                    $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val() - $('#MainContent_txtTotalDeuda').val()).toFixed(2));
                    F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                     F_ValidarTextMoneda(); 
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

function F_ValidarEliminar_Factura(){
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione una factura para eliminar");
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

function F_ValidarGrabarDocumento(){
if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
            var Cuerpo='#MainContent_';
            var Cadena = 'Ingresar los sgtes. Datos:'; 

            if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
                    Cadena=Cadena + '<p></p>' + 'Razon Social';
        
            if ($(Cuerpo + 'txtTC').val()=='0')
                    Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

            if ($(Cuerpo + 'txtTC').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

            if ($(Cuerpo + 'txtEmision').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Emision';
                    
            if ($(Cuerpo + 'ddlMedioPago').val()=='0')
                    Cadena=Cadena + '<p></p>' + 'Medio de Pago';

            if (($(Cuerpo + 'ddlMedioPago').val()!='1' & $(Cuerpo + 'ddlMedioPago').val()!='5' & $(Cuerpo + 'ddlMedioPago').val()!='6') && $(Cuerpo + 'txtNroOperacion').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Nro Operacion';

            if (($(Cuerpo + 'ddlMedioPago').val()!='1' & $(Cuerpo + 'ddlMedioPago').val()!='5' & $(Cuerpo + 'ddlMedioPago').val()!='6') && $(Cuerpo + 'ddlCuenta').val()==null)
                    Cadena=Cadena + '<p></p>' + 'Nro Cuenta';

            if ($(Cuerpo + 'ddlMedioPago').val()=='11' & parseFloat($(Cuerpo + 'txtTasa').val())==0)
                    Cadena=Cadena + '<p></p>' + 'Tasa';

            if ($(Cuerpo + 'ddlMedioPago').val() =='6')
            {
                if ((parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val())-parseFloat($('#MainContent_txtTotalDeuda').val())).toFixed(2)) != 0) 
                        Cadena=Cadena + '<p></p>' + 'CUANDO ES CANJE, EL MONTO DEBE SER CERO (0)';      
                        
                if (parseFloat($('#MainContent_txtCobroOperacion').val()) != 0 )
                        Cadena=Cadena + '<p></p>' + 'CUANDO ES CANJE, LO COBRADO DEBE CERO (0)';            

                if (parseFloat($('#MainContent_ddlVuelto option:selected').text().replace('S./ ', '').replace('USD ', '')) != 0 )
                        Cadena=Cadena + '<p></p>' + 'CUANDO ES CANJE, EL VUELTO DEBE CERO (0)';            
            }
            else
            {

                if (Math.abs(parseFloat($('#MainContent_txtCobroOperacion').val())) < 0 )
                        Cadena=Cadena + '<p></p>' + 'LO COBRADO DEBE SER MAYOR O IGUAL A CERO (0)';            

                if (parseFloat($('#MainContent_ddlVuelto option:selected').text().replace('S./ ', '').replace('USD ', '')) < 0 )
                        Cadena=Cadena + '<p></p>' + 'EL VUELTO DEBE SER MAYOR O IGUAL A CERO (0)';            

                if ((parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val())-parseFloat($('#MainContent_txtTotalDeuda').val()))) <= 0) 
                {
                    if (parseFloat($('#MainContent_txtTotalCobranza').val()) < 0 & parseFloat($('#MainContent_txtTotalDeuda').val()) == 0)
                    {
                        if ($(Cuerpo + 'ddlMedioPago').val() =='6' | $(Cuerpo + 'ddlMedioPago').val() =='7')
                        {
                            Cadena=Cadena + '<p></p>' + 'NO SE PUEDE USAR EL CANJE O LA TARJETA PARA PAGAR UNA NOTA DE CREDITO';
                        }
                    }
                    else
                    {
                        Cadena=Cadena + '<p></p>' + 'EL MONTO DE LA COBRANZA DEBE SER MAYOR A CERO';
                    }

                }
            }


            if (parseFloat($('#MainContent_ddlVuelto option:selected').text().replace('S./ ', '').replace('USD ', '')) != 0 &  parseFloat($(Cuerpo + 'txtCobroOperacion').val())== 0)
                        Cadena=Cadena + '<p></p>' + 'SI EL MONTO INGRESADO ES CERO, NO PUEDE HABER VUELTO';   


             if ($(Cuerpo + 'ddlCajaFisica').val() == null)
                Cadena=Cadena + '<p></p>' + 'Caja Fisica';

                
            if ($(Cuerpo + 'ddlTipoDevolucion').val() == 1 & $(Cuerpo + 'ddlMoneda').val() == $(Cuerpo + 'ddlVuelto').val() & parseFloat($('#MainContent_ddlVuelto option:selected').text().replace("USD ", "").replace("S./ ", ""))>0)
                    Cadena=Cadena + '<p></p>' + 'CUANDO HAY UN VUELTO, LA MONEDA DE LA OPERACION NO DEBE SER IGUAL QUE LA MONEDA DEL VUELTO';

            if (Cadena != 'Ingresar los sgtes. Datos:')
            {
                toastr.warning(Cadena.toUpperCase());
                return false;
            }
            return true;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
}

function F_GrabarDocumento(){
if (!F_SesionRedireccionar(AppSession)) return false;

  try 
        {
        var Contenedor = '#MainContent_';
        var CodBanco=0;
        var CodCtaBancaria=0;
        var NroOperacion='';
        var CodTipoDoc=1;
        var CobranzaSoles = 0;
        var DeudaSoles = 0;
        var CobroOperacionSoles = 0;
        var CobranzaDolares = 0;
        var DeudaDolares = 0;
        var CobroOperacionDolares = 0;
        var chkEliminar = "";      
        var lblDolares = "";
        var Total = 0.00;
        var CodTipoDoc=1;

         if ($('#MainContent_chkLetra').is(":checked")) 
          CodTipoDoc=19;

        if ($(Contenedor + 'ddlMoneda').val()==1)
        {
             CobranzaSoles = $(Contenedor + 'txtTotalCobranza').val();
             DeudaSoles =    $(Contenedor + 'txtTotalDeuda').val();
             CobroOperacionSoles = $(Contenedor + 'txtCobroOperacion').val();

            $('#MainContent_txtTotalFactura').val(parseFloat(Total).toFixed(2));
            $('#MainContent_txtTotalLiquidacion').val(parseFloat(Total).toFixed(2));

             CobranzaDolares = 0;
             DeudaDolares = 0;
             CobroOperacionDolares = 0;
        }
        else
        {
             CobranzaSoles = 0;
             DeudaSoles = 0;
             CobroOperacionSoles = 0;
             CobranzaDolares = $(Contenedor + 'txtTotalCobranza').val();
             DeudaDolares =    $(Contenedor + 'txtTotalDeuda').val();
             CobroOperacionDolares = $(Contenedor + 'txtCobroOperacion').val();        
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
                    NroOperacion = $(Contenedor + 'txtNroOperacion').val();
                    break;
           default:
           break;
        }


        //PRIMERO SE ACTUALIZAN LOS TEMPORALES CON LA DATA CARGADA PARA QUE SE PUEDA GUARDAR
        //-------------------------------------------------------------------------------------
        var lblCodigo_grilla='';
        var lblFactura_grilla='';
        var lblEmision_grilla='';
        var lblTotal_grilla='';
        var lblMoneda_grilla='';
        var hfSoles='';
        var hfDolares='';
        var chkSi='';
        var lblTC = '';
        var hfCodMoneda='';
        var Tasa=0;
        var arrDetalleCobranzas = new Array();
        var arrDetallePagos = new Array();
        var CodMonedaVuelto =  $('#MainContent_ddlVuelto').val(); 

        $('#MainContent_ddlVuelto').val(1);
        var Vuelto1 = $('#MainContent_ddlVuelto option:selected').text().replace('S./ ', '');

        if ($('#MainContent_txtTasa').val()!='')
          Tasa = $('#MainContent_txtTasa').val();


        $('#MainContent_ddlVuelto').val(2);
        var Vuelto2 = $('#MainContent_ddlVuelto option:selected').text().replace('USD ', '');
                   
        $('#MainContent_grvFacturaCobranzas :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodigo_grilla = chkSi.replace('chkEditar', 'hfCodigoFactura');
            lblFactura_grilla = chkSi.replace('chkEditar', 'lblFactura');
            lblEmision_grilla = chkSi.replace('chkEditar', 'lblEmision');
            hfSoles = chkSi.replace('chkEditar', 'hfSoles');
            hfDolares = chkSi.replace('chkEditar', 'hfDolares');
            lblTC = chkSi.replace('chkEditar', 'lblTC');           
            hfCodMoneda = chkSi.replace('chkEditar', 'hfCodMoneda');        

            if ($(chkSi).is(':checked')) 
            {
                var objDetalle = {
                    CodigoFactura: $(lblCodigo_grilla).val(),
                    Factura: $(lblFactura_grilla).text(),
                    Emision: $(lblEmision_grilla).text() ,
                    Soles:   $(hfSoles).val(),
                    Dolares: $(hfDolares).val(),
                    TC: $(lblTC).text(),
                    CodMoneda: $(hfCodMoneda).val()
                };
                arrDetalleCobranzas.push(objDetalle);
                }
            });

        $('#MainContent_grvFacturaPagos :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodigo_grilla = chkSi.replace('chkEditar', 'hfCodigoFactura');
            lblFactura_grilla = chkSi.replace('chkEditar', 'lblFactura');
            lblEmision_grilla = chkSi.replace('chkEditar', 'lblEmision');
            hfSoles = chkSi.replace('chkEditar', 'hfSoles');
            hfDolares = chkSi.replace('chkEditar', 'hfDolares');
            lblTC = chkSi.replace('chkEditar', 'lblTC');           
            hfCodMoneda = chkSi.replace('chkEditar', 'hfCodMoneda');        

            if ($(chkSi).is(':checked')) 
            {
                var objDetalle = {
                    CodigoFactura: $(lblCodigo_grilla).val(),
                    Factura: $(lblFactura_grilla).text(),
                    Emision: $(lblEmision_grilla).text() ,
                    Soles:   $(hfSoles).val(),
                    Dolares: $(hfDolares).val(),
                    TC: $(lblTC).text(),
                    CodMoneda: $(hfCodMoneda).val()
                };
                $('#hfMoneda').val($(lblMoneda_grilla).text());
                arrDetallePagos.push(objDetalle);
                }
            });
              
        var objParams = {   
                             Filtro_Tipo:                  'C', //indica que es cobranza
                             Filtro_CodigoTemporal:        $('#hfCodigoTemporal').val(),
                             Filtro_CodigoTemporalPago:    $('#hfCodigoTemporalPago').val(),
                             Filtro_CodMoneda:             $(Contenedor + 'ddlMoneda').val(),
                             Filtro_CodMedioPago:          $(Contenedor + 'ddlMedioPago').val(),
                             Filtro_NroOperacion:          NroOperacion,
                             Filtro_TipoCambio:            $(Contenedor + 'txtTC').val(),
                             Filtro_FechaOperacion:        $(Contenedor + 'txtOperacion').val(),
                             Filtro_FechaEmision:          $(Contenedor + 'txtEmision').val(),
                             Filtro_Responsable:           $(Contenedor + 'txtResponsable').val(),
                             Filtro_Observacion:           $(Contenedor + 'txtObservacion').val(),
                             Filtro_CodBanco:              CodBanco,
                             Filtro_CodCtaBancaria:        CodCtaBancaria,
                             Filtro_CobranzaSoles:         CobranzaSoles,
                             Filtro_DeudaSoles:            DeudaSoles,
                             Filtro_CobroOperacionSoles:   CobroOperacionSoles,
                             Filtro_CobranzaDolares:       CobranzaDolares,
                             Filtro_DeudaDolares:          DeudaDolares,
                             Filtro_CobroOperacionDolares: CobroOperacionDolares,
                             Filtro_CodTipoDoc:            CodTipoDoc,
                             Filtro_CodCtaCte:             $('#hfCodCtaCte').val(),
                             Filtro_XmlDetalleCobranzas:   Sys.Serialization.JavaScriptSerializer.serialize(arrDetalleCobranzas), 
                             Filtro_XmlDetallePagos:       Sys.Serialization.JavaScriptSerializer.serialize(arrDetallePagos), 
                             Filtro_CodCajaFisica:         $(Contenedor + 'ddlCajaFisica').val(),
                             Filtro_TipoDevolucion:        $('#MainContent_ddlTipoDevolucion').val(),
                             Filtro_CodMonedaVuelto:       CodMonedaVuelto,
                             Filtro_Vuelto1:               Vuelto1,
                             Filtro_Vuelto2:               Vuelto2,
                             Filtro_Tasa:                  Tasa,
                             Filtro_CodEmpresa:            $('#MainContent_ddlEmpresa').val(),
                             Filtro_Recibo:                 $('#MainContent_txtnroRecibo').val(),
                             Filtro_Cobrador:            $('#MainContent_ddlCobrador').val()
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
                    if (str_mensaje_operacion=='SE REGISTRO LA COBRANZA CORRECTAMENTE')
                    { 
                            F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
                            F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[5]);

                            if ($("#MainContent_chkMantenerCliente").is(':checked')) {
                                $('#MainContent_ddlMedioPago').val(1);
                                $('#MainContent_ddlVuelto').empty();
                                $('#MainContent_ddlVuelto').append($("<option></option>").val(1).html("S./ 0.00"));
                                $('#MainContent_ddlVuelto').append($("<option></option>").val(2).html("USD 0.00"));
                                $('#MainContent_txtTotalCobranza').val("0.00");
                                $('#MainContent_txtNroOperacion').val("");
                                $('#MainContent_btnFiltrar').click();
                                }
                            else 
                                $('#MainContent_btnNuevo').click();

                            toastr.warning('SE REGISTRO LA COBRANZA CORRECTAMENTE');
                            $(Contenedor + 'txtProveedor').focus();
                            $('.ccsestilo').css('background', '#FFFFE0');
                    }   
                    else
                    {
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
if (!F_SesionRedireccionar(AppSession)) return false;
        var Contenedor = '#MainContent_';
        $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
        $('.Jq-ui-dtp').datepicker('setDate', new Date());
        $('#MainContent_ddlMoneda').val(P_CodMoneda_Inicial);
        $('#hfCodCtaCte').val('0');
        $('#hfCodigoTemporal').val('0');
        $('#hfMoneda').val('0');  
        $('#MainContent_ddlCajaFisica').val($('#hfCodCajaFisica').val());
        $('#hfCodCobranza').val('0');
        $('#hfCodCtaCte').val('0');
        $('#hfCodCtaCteConsulta').val('0');
         $('#hfCodCtaCteConsultaEliminado').val('0');
        $('#hfCodigoTemporal').val('0');
        $('#hfCobranzas').val('0');
        $('#hfCodigoTemporalPago').val('0');
        $('#hfMoneda').val('0');
        $('#hfNotaVenta').val('0');
        $("#MainContent_chkOC").prop('checked',false);
        $(Contenedor + 'txtTotalCobranza').val('0.00');
        $(Contenedor + 'txtTotalDeuda').val('0.00') ;
        $(Contenedor + 'txtResponsable').val('');
        $(Contenedor + 'txtObservacion').val('');
        $(Contenedor + 'txtCobroOperacion').val('0.00') ;
        $(Contenedor + 'txtNroOperacion').val('');
        $(Contenedor + 'ddlMoneda').val(P_CodMoneda_Inicial),
        $(Contenedor + 'ddlMedioPago').val(1),
        $(Contenedor + 'ddlBanco').val('1');  
        $(Contenedor + 'txtProveedor').val('');
        $('#hfCodCtaCte').val('0');


        $('#MainContent_ddlVuelto').empty();
        $('#MainContent_ddlVuelto').append($("<option></option>").val(1).html("S./ 0.00"));
        $('#MainContent_ddlVuelto').append($("<option></option>").val(2).html("USD 0.00"));


       $(Contenedor + 'txtProveedor').focus();
       try 
        {
              var objParams = {
                                        Filtro_CodSerie: '61'
                                        
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Nuevo_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    F_Update_Division_HTML('div_grvFacturaCobranzas', result.split('~')[2]);                            
                    F_Update_Division_HTML('div_grvFacturaPagos', result.split('~')[3]);         
                    $('.ccsestilo').css('background', '#FFFFE0');
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

function F_Buscar(){
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';
              var chkSerie='0';
              var chkRegistro='0';

              if ($('#MainContent_chkNumero').is(':checked'))
                    chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
                    chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
                    chkCliente='1';

              if ($('#MainContent_chkSerie').is(':checked'))
                    chkSerie='1';

              if ($('#MainContent_chkRegistro').is(':checked'))
                    chkRegistro='1';
              
              var objParams = {
                                 Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
                                 Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                 Filtro_Desde: $('#MainContent_txtDesde').val(),
                                 Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                 Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                 Filtro_ChkNumero: chkNumero,
                                 Filtro_ChkFecha: chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_ChkSerie: chkSerie,
                                 Filtro_ChkRegistro: chkRegistro,
                                 Filtro_CodMedioPago:  $("#MainContent_ddlMedioPagoConsulta").val(),       
                                 Filtro_CodCajaFisica: $("#MainContent_ddlCajaFisicaConsulta").val() ,
                                 Filtro_CodEmpresa:    $('#MainContent_ddlEmpresaConsulta2').val(),
                                 Filtro_CodTipoDoc:    $('#MainContent_ddltipodoc').val()
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
                    $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblProveedor')); 
                    if  (str_mensaje_operacion!="")                       
                        toastr.warning(result.split('~')[1]);                  
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

function F_AnularRegistro() {
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
 try 
        {
                if(!confirm("ESTA SEGURO DE ELIMINAR LA COBRANZA DEL CLIENTE \n" + $('#hfClienteAnulacion').val()))
                return false;

                var chkNumero='0';
                var chkFecha='0';
                var chkCliente='0';
                var chkSerie='0';

                if ($('#MainContent_chkNumero').is(':checked'))
                    chkNumero='1';

                if ($('#MainContent_chkRango').is(':checked'))
                    chkFecha='1';

                if ($('#MainContent_chkCliente').is(':checked'))
                    chkCliente='1';

                if ($('#MainContent_chkSerie').is(':checked'))
                    chkSerie='1';

              var objParams = {
                                      Filtro_CodCobranza: $('#hfCodDocumentoVentaAnulacion').val(),
                                      Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                      Filtro_Desde: $('#MainContent_txtDesde').val(),
                                      Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                      Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                      Filtro_ChkNumero: chkNumero,
                                      Filtro_ChkFecha: chkFecha,
                                      Filtro_ChkCliente: chkCliente,
                                      Filtro_ChkSerie: chkSerie,
                                      Filtro_Observaciones:'ELIMINADO DESDE EL FORMULARIO COBRANZAS', 
                                      Filtro_Observacion: $('#MainContent_txtObservacionAnulacion').val(),
                                      Filtro_CodEmpresa: $('#MainContent_ddlEmpresaConsulta2').val()
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
                $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblNroOperacion'));     
                $('#div_Anulacion').dialog('close');
                toastr.warning(result.split('~')[1]);
        }
        else {
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

var CargaInicial = 0;
function getContentTab(){
    if (CargaInicial === 1)
        return true;
CargaInicial = 1;
    $('#MainContent_ddlEmpresaConsulta2').val($('#hfCodEmpresa').val());
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
}
var CargaInicial2 = 0;
function getContentTab2(){
    if (CargaInicial2 === 1)
        return true;
CargaInicial2 = 1;
    
    $('#MainContent_ddlEmpresaConsulta3 ').val($('#hfCodEmpresa').val());
    $('#MainContent_chkFechaDetallado2').prop('checked', true);
    F_BuscarEliminados();
    return false;
}

function F_ValidarAgregarLetra(){
if (!F_SesionRedireccionar(AppSession)) return false;
    try 
        {

        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>'; 
        var lblcoddetalle_grilla='';
        var x=0;

         $('#MainContent_grvLetra .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblLetra');
                   
                    if ($(lblcoddetalle_grilla).text()==$(Cuerpo + 'txtNroLetra').val())
                    x=1;
                      
                });

        if (x==0)     
        {        
        if ($(Cuerpo + 'txtImporteLetra').val() =='')
                Cadena=Cadena + '<p></p>' + 'Importe de Letra';

        if ($(Cuerpo + 'txtImporteLetra').val() !='' && (parseFloat($(Cuerpo + 'txtImporteLetra').val())> parseFloat($(Cuerpo + 'txtTotalFacturaLetra').val())))
                Cadena=Cadena + '<p></p>' + 'El importe de la letra no puede ser mayor al total de la factura';

        if ($(Cuerpo + 'txtNroLetra').val()=='')
                Cadena=Cadena + '<p></p>' + 'Nro Letra';

        if ($(Cuerpo + 'txtVencimiento').val()=='')
                Cadena=Cadena + '<p></p>' + 'Vencimiento';

        if ($(Cuerpo + 'txtImporteLetra').val()=='')
                Cadena=Cadena + '<p></p>' + 'Importe';

        if (($(Cuerpo + 'txtTotalFactura').val() !='0.00' & $(Cuerpo + 'txtTotalLetra').val() !='0.00') && (parseFloat($(Cuerpo + 'txtTotalFactura').val()) == parseFloat($(Cuerpo + 'txtTotalLetra').val())))
                Cadena=Cadena + '<p></p>' + 'No se puede agregar mas letras; el total de la factura y la letra son iguales.';}
        else
        {
        Cadena="La letra " + $(Cuerpo + 'txtNroLetra').val() + ' se encuentra agregada';
        }

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>')
        {toastr.warning(Cadena);
        $(Cuerpo + 'txtNroLetra').focus();
        return false;}
        return true;
        }
        
    catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
}

function F_AgregarLetra(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
            var lblCodigo_grilla='';
            var chkSi='';
            var arrDetalle = new Array();
            var Contenedor = '#MainContent_';
       
                   
                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkEliminar', 'lblcodigo');
                  
                 
                        var objDetalle = {
                        CodFactura: $(lblCodigo_grilla).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                   
                });

          
               var objParams = {
                                        Filtro_Numero: $(Contenedor + 'txtNroLetra').val(),
                                        Filtro_Emision: $(Contenedor + 'txtFechaGiro').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_Total: $(Contenedor + 'txtImporteLetra').val(),
                                        Filtro_Moneda: $(Contenedor + 'txtMoneda').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_TipoCambio:  $(Contenedor + 'txtTC').val(),
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        Filtro_XmlConsulta: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        
                               };


                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);
                F_AgregarLetraTemporal_NET(arg, function (result) {
  
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                   if (str_mensaje_operacion=='La(s) Letra(s) se ha agregado con exito')
                   {
                     F_Update_Division_HTML('div_grvLetra', result.split('~')[2]);  
                     $('#MainContent_txtTotalLetra').val(result.split('~')[3]);  
                     toastr.warning('La(s) Letra(s) se ha agregado con exito'); 
                     F_LimpiarLetra();
                     
                   }
                   else
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

function F_ValidarEliminar_Letra(){
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvLetra .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione una Letra para eliminar");
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

function F_EliminarTemporal_Letra(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var arrConsulta = new Array();
        var lblcoddetalle_grilla='';
        var lblCodigo_grilla='';
        
               
                $('#MainContent_grvLetra .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblCodigo');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                       
                        CodLetraCab: $(lblcoddetalle_grilla).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkEliminar', 'lblcodigo');
                  
                 
                        var objDetalle = {
                        CodFactura: $(lblCodigo_grilla).text()
                        };
                                               
                        arrConsulta.push(objDetalle);
                   
                });

                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_XmlConsulta: Sys.Serialization.JavaScriptSerializer.serialize(arrConsulta)
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_EliminarTemporal_Letra_NET(arg, function (result) {
         
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                   
                    if (result.split('~')[4]=='0')
                    $('#MainContent_txtTotalLetra').val('0.00');
                    else
                    $('#MainContent_txtTotalLetra').val(result.split('~')[4]);
                    F_Update_Division_HTML('div_grvLetra', result.split('~')[3]);
                    toastr.warning(result.split('~')[2]);
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

function F_LimpiarLetra(){
if (!F_SesionRedireccionar(AppSession)) return false;
                $('#MainContent_txtMoneda').val($("#MainContent_ddlMoneda option:selected").text());
                $('#MainContent_txtProveedorLetra').val($('#MainContent_txtProveedor').val());
                $('#MainContent_txtFechaGiro').val($('#MainContent_txtEmision').val());
                $('#MainContent_txtTotalFacturaLetra').val($('#MainContent_txtTotalFactura').val());
                $('#MainContent_txtImporteLetra').val('');
                $('#MainContent_txtVencimiento').val('');
                $('#MainContent_txtNroLetra').val('');
                $('#MainContent_ddlFormaPago').val('3');
                F_ListarNroCuenta('3');
                $('#div_DatosLetra').dialog('open');
                $('#MainContent_txtNroLetra').focus();
     }

function F_TipoCambio(){
if (!F_SesionRedireccionar(AppSession)) return false;
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
                    $('#MainContent_txtTC').val(result.split('~')[2]);
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

function F_ListarNroCuentaEdicion() {
if (!F_SesionRedireccionar(AppSession)) return false;
    var arg;

    try {

        var objParams = {

            Filtro_CodBanco:  $('#MainContent_ddlBancoEdicion').val(),
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
                     F_Update_Division_HTML('div_CuentaEdicion', result.split('~')[3]);
                            $('#MainContent_ddlCuentaEdicion').css('background', '#FFFFE0');       
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

function F_ValidarAgregarFacturaCobranzas(){
if (!F_SesionRedireccionar(AppSession)) return false;
try 
        {
        var chkSi='';
        var cadena= '';
        var x=0;
        var j=0;
        var lblcodproducto_grilla='';
        var lblDetalle_grilla='';
        var lblFactura_grilla='';
        var chkDel='';

               $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                                 
                    if ($(chkSi).is(':checked')) 
                        x=1;                       
               });

               if(x==0)
               {cadena="No ha seleccionado ningun documento";}
               else
               { 
               cadena="Los sgtes. documentos se encuentran agregados : ";
                    $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblCodigo');
               
                         if ($(chkSi).is(':checked')) 
                            {
                                 $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                                    chkDel = '#' + this.id;
                                    lblDetalle_grilla = chkDel.replace('chkEliminar', 'lblcodigo');
                                    lblFactura_grilla=chkDel.replace('chkEliminar', 'lblFactura');
                                    if ($(lblcodproducto_grilla).text()==$(lblDetalle_grilla).text())
                                    {
                                    cadena= cadena + "<p></p>"  + $(lblFactura_grilla).text();
                                    j+=1;
                                    }
                                  });
                            }
                    });
                }
                
                if (x!=0 && j==0)
                cadena="";

                if (cadena != "")
                   {
                      toastr.warning(cadena);
                      return false;
                   } 
                   return true;                 
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
}

function F_AgregarTemporalCobranzas(){
if (!F_SesionRedireccionar(AppSession)) return false;
try 
        {
        var lblCodigo_grilla='';
        var lblFactura_grilla='';
        var lblEmision_grilla='';
        var lblTotal_grilla='';
        var lblMoneda_grilla='';
        var chkSi='';
        var hfCodMoneda='';
        var arrDetalle = new Array();
                   
                $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkOK', 'lblCodigo');
                    lblFactura_grilla = chkSi.replace('chkOK', 'lblFactura');
                    lblEmision_grilla = chkSi.replace('chkOK', 'lblEmision');
                    lblSoles = chkSi.replace('chkOK', 'lblSoles');
                    lblDolares = chkSi.replace('chkOK', 'lblDolares');
                    lblTC = chkSi.replace('chkOK', 'lblTC');             
                    hfCodMoneda = chkSi.replace('chkOK', 'hfCodMoneda'); 

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                            CodigoFactura: $(lblCodigo_grilla).text(),
                            Factura: $(lblFactura_grilla).text(),
                            Emision: $(lblEmision_grilla).text() ,
                            Soles:   $(lblSoles).text(),
                            Dolares: $(lblDolares).text(),
                            TC:      $(lblTC).text(),
                            CodMoneda: $(hfCodMoneda).val()
                        };
                        $('#hfMoneda').val($(lblMoneda_grilla).text());
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                                Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                Filtro_CodigoTemporal:$('#hfCodigoTemporalPago').val(),
                                Filtro_CodMoneda:$('#MainContent_ddlMoneda').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporalCobranzas_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporalPago').val(result.split('~')[3]);
                    $('#MainContent_txtTotalDeuda').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtCobroOperacion').val(parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val()) - parseFloat($('#MainContent_txtTotalDeuda').val())).toFixed(2));
                    F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    F_ValidarTextMoneda();
                     $('#divConsultaFactura').dialog('close');
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
            toastr.warning("Error Detectado: " + e);
        }
}

function F_EliminarTemporal_FacturaCobranza(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblID='';        
               
                $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblID = chkSi.replace('chkEliminar', 'lblID');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(lblID).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });
                            
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_CodigoTemporal:$('#hfCodigoTemporalPago').val(),
                                  Filtro_CodMoneda:$('#MainContent_ddlMoneda').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                 MostrarEspera(true);
                F_EliminarTemporal_FacturaCobranza_NET(arg, function (result) {
                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                 $('#hfCodigoTemporalPago').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                            $('#MainContent_txtTotalDeuda').val('0.00');
                    else
                            $('#MainContent_txtTotalDeuda').val(result.split('~')[5]);
                     
                    $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val() - $('#MainContent_txtTotalDeuda').val()).toFixed(2));
                    F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                     F_ValidarTextMoneda(); 
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

function F_ValidarEliminar_FacturaCobranza(){
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
        var chkSi='';
        var x=0;
                
                $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione una proforma para eliminar");
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

function F_VentaTC(Fila,Flag,Operacion) {
 try 
        {
            var txtTC =  '';         
            var lblID =  '';
            var lblSoles   = '';
            var lblDolares = '';
            var hfSoles =    ''; 
            var hfDolares =  ''; 
            var hfxSoles =    ''; 
            var hfxDolares =  ''; 
            var lblFactura =  ''; 
            var hfTC =  ''; 
            var CodigoTemporal = 0;      
            var Dolares = 0;
            var Soles = 0;  
            var hfCodMoneda = 0; 
            var Valor = 1;

            switch(Flag) 
            {
                case 1:
                    txtTC       = '#' + Fila;         
                    lblID       = txtTC.replace('txtTC', 'lblID');
                    lblSoles    = txtTC.replace('txtTC', 'lblSoles');
                    lblDolares  = txtTC.replace('txtTC', 'lblDolares');
                    hfSoles     = txtTC.replace('txtTC', 'hfSoles'); 
                    hfDolares   = txtTC.replace('txtTC', 'hfDolares'); 
                    hfxSoles    = txtTC.replace('txtTC', 'hfxSoles'); 
                    hfxDolares  = txtTC.replace('txtTC', 'hfxDolares'); 
                    hfTC        = txtTC.replace('txtTC', 'hfTC');
                    hfCodMoneda = txtTC.replace('txtTC', 'hfCodMoneda');
                    lblFactura  = txtTC.replace('txtTC', 'lblFactura');
                    if(Math.abs(parseFloat($(txtTC).val()))==Math.abs(parseFloat($(hfTC).val())))
                        return false;
                    break;
                case 2:
                    lblSoles    = '#' + Fila;         
                    lblID       = lblSoles.replace('lblSoles', 'lblID');
                    txtTC       = lblSoles.replace('lblSoles', 'txtTC');
                    lblDolares  = lblSoles.replace('lblSoles', 'lblDolares');
                    hfSoles     = lblSoles.replace('lblSoles', 'hfSoles'); 
                    hfDolares   = lblSoles.replace('lblSoles', 'hfDolares');  
                    hfxSoles    = lblSoles.replace('lblSoles', 'hfxSoles'); 
                    hfxDolares  = lblSoles.replace('lblSoles', 'hfxDolares');
                    hfCodMoneda = lblSoles.replace('lblSoles', 'hfCodMoneda');
                    lblFactura  = lblSoles.replace('lblSoles', 'lblFactura');
                    if(parseFloat($(hfSoles).val())==parseFloat($(lblSoles).val()))
                        return false; 
                    if(Math.abs(parseFloat($(hfxSoles).val()))< Math.abs(parseFloat($(lblSoles).val())))
                    {
                        $(lblSoles).val($(hfSoles).val());
                        return false;
                    }      
                    break;
                default:
                    lblDolares  = '#' + Fila;         
                    lblID       = lblDolares.replace('lblDolares', 'lblID');
                    txtTC       = lblDolares.replace('lblDolares', 'txtTC');
                    lblSoles    = lblDolares.replace('lblDolares', 'lblSoles');
                    hfSoles     = lblDolares.replace('lblDolares', 'hfSoles'); 
                    hfDolares   = lblDolares.replace('lblDolares', 'hfDolares'); 
                    hfxSoles    = lblDolares.replace('lblDolares', 'hfxSoles'); 
                    hfxDolares  = lblDolares.replace('lblDolares', 'hfxDolares');  
                    hfCodMoneda = lblDolares.replace('lblDolares', 'hfCodMoneda');
                    lblFactura  = lblDolares.replace('lblDolares', 'lblFactura');
                    if(Math.abs(parseFloat($(hfDolares).val()))==Math.abs(parseFloat($(lblDolares).val())))
                        return false;  
                    if(Math.abs(parseFloat($(hfxDolares).val()))< Math.abs(parseFloat($(lblDolares).val())))
                    {
                        $(lblDolares).val($(hfDolares).val());
                        return false;
                    }                        
            }
    
            if(Operacion==0)
                CodigoTemporal = $('#hfCodigoTemporal').val();
            else
                CodigoTemporal = $('#hfCodigoTemporalPago').val();

            if ($('#MainContent_ddlMoneda').val() == $(hfCodMoneda).val())
            {
                    Soles   = $(lblSoles).val();
                    Dolares = $(lblDolares).val();     
            }
            else
            {
                    if ($('#MainContent_ddlMoneda').val() == 1) 
                    {
                            Soles   = parseFloat($(lblDolares).val())*parseFloat($(txtTC).val()); 
                            Dolares = parseFloat($(lblDolares).val());
                    }
                    else
                    {
                            Soles   = $(lblSoles).val() ; 
                            Dolares = parseFloat($(lblSoles).val())/parseFloat($(txtTC).val());
                    }
            }  

            if ($(lblFactura).text().substring(0, 2)=="NC")
                Valor = -1;
            
            if (Soles>0)   
            {
                Soles*=Valor;
                Dolares*=Valor;
            }      
                     
            var objParams = {
                              Filtro_CodFacturaDet: $(lblID).val(),
                              Filtro_TipoCambio: $(txtTC).val(),
                              Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                              Filtro_Soles: Soles,
                              Filtro_Dolares: Dolares,
                              Filtro_CodigoTemporal: CodigoTemporal,
                              Filtro_Operacion : Operacion
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarTC_Net(arg, function (result) {

                var str_resultado_operacion = result.split('~')[0];
                var str_mensaje_operacion = result.split('~')[1];

                MostrarEspera(false);
                if (str_mensaje_operacion == "")
                {          
                     var chkSi = '';
                     var lblSoles = '';
                     var lblDolares = '';
                     var Total = 0;       
                     
                     if (Operacion==0)  
                     {
                             F_Update_Division_HTML('div_grvFactura', result.split('~')[2]);
                             $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                                     chkSi = '#' + this.id;
                                     lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                                     lblDolares = chkSi.replace('chkEliminar', 'lblDolares');

                                     if ($('#MainContent_ddlMoneda').val()==1)
                                         Total+= parseFloat($(lblSoles).val());
                                     else
                                         Total+= parseFloat($(lblDolares).val());
                             });               
                             $('#MainContent_txtTotalCobranza').val(parseFloat(Total).toFixed(2));    
                     }
                     else
                     {
                            F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[2]);
                            $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                                 chkSi = '#' + this.id;
                                 lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                                 lblDolares = chkSi.replace('chkEliminar', 'lblDolares');

                                 if ($('#MainContent_ddlMoneda').val()==1)
                                     Total+= parseFloat($(lblSoles).val());
                                 else
                                     Total+= parseFloat($(lblDolares).val());
                            });               
                            $('#MainContent_txtTotalDeuda').val(parseFloat(Total).toFixed(2)) ;    
                     }
                     $('#MainContent_txtCobroOperacion').val(parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val())-parseFloat($('#MainContent_txtTotalDeuda').val())).toFixed(2));               
                     $('.ccsestilo').css('background', '#FFFFE0');
                }
                else 
                {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                     $('.ccsestilo').css('background', '#FFFFE0');
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

function F_ValidarTextMoneda() {
if (!F_SesionRedireccionar(AppSession)) return false;
        var lblSoles = '';
        var lblDolares = '';

        $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                    lblDolares = chkSi.replace('chkEliminar', 'lblDolares');
                    if($('#MainContent_ddlMoneda').val()==1)
                    {
                        $(lblSoles).prop("readonly",false);
                        $(lblDolares).prop("readonly",true);
                    }
                    else
                    {
                        $(lblSoles).prop("readonly",true);
                        $(lblDolares).prop("readonly",false);
                    }        
         });
        
         $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                    lblDolares = chkSi.replace('chkEliminar', 'lblDolares');
                    if($('#MainContent_ddlMoneda').val()==1)
                    {
                        $(lblSoles).prop("readonly",false);
                        $(lblDolares).prop("readonly",true);
                    }
                    else
                    {
                        $(lblSoles).prop("readonly",true);
                        $(lblDolares).prop("readonly",false);
                    }        
         });
}

function F_Moneda(Fila,Flag) { 
if (!F_SesionRedireccionar(AppSession)) return false;
     var lblSoles   = '#' + Fila;         
     var lblDolares = lblSoles.replace('lblSoles', 'lblDolares'); 
     var hfSoles = lblSoles.replace('lblSoles', 'hfSoles'); 
     var hfDolares = lblSoles.replace('lblSoles', 'hfDolares'); 
     
     if($(hfSoles).val()<$(lblSoles).val())  
        $(lblSoles).val($(hfSoles).val());

     if($(hfDolares).val()<$(lblDolares).val())  
        $(lblDolares).val($(hfDolares).val());
}

function F_Buscar_Factura () {
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
          var Cadena = "Ingrese los sgtes. campos: "  
          if ($('#hfCodCtaCte').val()=="4479")
             $('#hfCodCtaCte').val("3873");
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {toastr.warning(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Factura",
                    title_html: true,
                    height: 450,
                    width: 440,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               
                 var objParams = {
                                    Filtro_CodCtaCte: $('#hfCodCtaCte').val()
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Buscar_Factura_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                     F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);   
                     $('#hfCobranzas').val(0);                      
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }
                return false;
                });
        }
        catch (e) {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
        return false;
}

function F_Buscar_Letra () {
if (!F_SesionRedireccionar(AppSession)) return false;
   try 
        {
          var Cadena = "Ingrese los sgtes. campos: "     
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {alert(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Letras",
                    title_html: true,
                    height: 450,
                    width: 440,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               

                 var objParams = {
                                    Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                    Filtro_CodTipoOperacion: 1,
                                    Filtro_Total: '700'
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Buscar_Letra_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);   
                     $('#hfCobranzas').val(0);                         
                  
                }
                else 
                {
                    alert(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
            MostrarEspera(false);
            alert("Error Detectado: " + e);
        }

}

function F_EditarMedioPago(Fila) {
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {
            var imgID = Fila.id;
            var lblCodigo = '#' + imgID.replace('imgEditar', 'hfCodigo');
            var lblCuenta = '#' + imgID.replace('imgEditar', 'lblCuenta');
            var lblNroOperacion = '#' + imgID.replace('imgEditar', 'lblNroOperacion');
            var hfCodMedioPago = '#' + imgID.replace('imgEditar', 'hfCodMedioPago');
            var hfCodBanco = '#' + imgID.replace('imgEditar', 'hfCodBanco');
            var hfCodCtaBancaria = '#' + imgID.replace('imgEditar', 'hfCodCtaBancaria');
            var hfObservacion = '#' + imgID.replace('imgEditar', 'hfObservacion');
            var hfComision = '#' + imgID.replace('imgEditar', 'hfComision');
            var hfCodMoneda = '#' + imgID.replace('imgEditar', 'hfCodMoneda');
            var hfCodCajaFisicaEdicion = '#' + imgID.replace('imgEditar', 'hfCodCajaFisica');
            var lblFecha = '#' + imgID.replace('imgEditar', 'lblFecha');
            var hfCodEmpresa = '#' + imgID.replace('imgEditar', 'hfCodEmpresa');
            var hfnrorecibo = '#' + imgID.replace('imgEditar', 'hfnrorecibo');
                       
            $('#hfCodCobranza').val($(lblCodigo).val());
            $('#MainContent_ddlBancoEdicion').val($(hfCodBanco).val());
            $('#MainContent_ddlCuentaEdicion').val($(hfCodCtaBancaria).val());
            
            $('#MainContent_txtEmisionEdicion').val($(lblFecha).text());
            $('#MainContent_txtNroOperacionEdicion').val($(lblNroOperacion).text());
            $('#MainContent_txtObservacionEdicion').val($(hfObservacion).val());
            $('#MainContent_txtComision').val($(hfComision).val());

            $('#hfRecibo').val($(hfnrorecibo).val());
            $('#hfCodCajaFisicaEdicion').val($(hfCodCajaFisicaEdicion).val());
            $('#hfCodMedioPagoEdicion').val($(hfCodMedioPago).val());
            $('#hfCodBancoEdicion').val($(hfCodBanco).val());
            $('#hfCodCuentaEdicion').val($(hfCodCtaBancaria).val());

            if ($(hfComision).val() == '0.00' | $(hfComision).val() == '')
            {
                $('#MainContent_chkSComision').prop('checked', true); 
                $('#MainContent_chkCComision').prop('checked', false); 
                $('#MainContent_txtComision').prop('disabled', true); 
                $('#MainContent_txtComision').val('0'); 
            }
            else
            {
                $('#MainContent_chkSComision').prop('checked', false); 
                $('#MainContent_chkCComision').prop('checked', true);             
                $('#MainContent_txtComision').prop('disabled', false); 
            }

            var objParams = 
            {
                Filtro_CodMoneda: $(hfCodMoneda).val(),
                Filtro_CodEmpresa: $(hfCodEmpresa).val(),
                Filtro_CodBanco: ($(hfCodBanco).val() === '') ? '0' : $(hfCodBanco).val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            MostrarEspera(true);
            F_EdicionMedioPago_Net(arg, function (result) {
                
            MostrarEspera(false);

            var str_resultado_operacion = result.split('~')[0];
            var str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion === "1")
            {
                    F_Update_Division_HTML('div_CajaFisicaEdicion', result.split('~')[2]);
                    $('#MainContent_ddlCajaFisicaEdicion').css('background', '#FFFFE0');

                    F_Update_Division_HTML('div_MedioPagoEdicion', result.split('~')[3]);
                    $('#MainContent_ddlMedioPagoEdicion').css('background', '#FFFFE0');

                    F_Update_Division_HTML('div_BancoEdicion', result.split('~')[4]);
                    $('#MainContent_ddlBancoEdicion').css('background', '#FFFFE0');

                    F_Update_Division_HTML('div_CuentaEdicion', result.split('~')[5]);
                    $('#MainContent_ddlCuentaEdicion').css('background', '#FFFFE0');

                    $('#MainContent_ddlMedioPagoEdicion').val($('#hfCodMedioPagoEdicion').val());
                    $('#MainContent_ddlCajaFisicaEdicion').val($('#hfCodCajaFisicaEdicion').val());
                    $('#MainContent_ddlBancoEdicion').val($('#hfCodBancoEdicion').val());
                    $('#MainContent_ddlCuentaEdicion').val($('#hfCodCuentaEdicion').val());
                    $('#MainContent_txtNroReciboEdicion').val($('#hfRecibo').val());

                    $("#div_EdicionMedioPago").dialog({
                        resizable: false,
                        modal: true,
                        title: "EDICION COBRANZA",
                        title_html: true,
                        height: 330,
                        width: 540,
                        autoOpen: false
                    });

                     if ($(hfCodMedioPago).val() == '6')          
               $('#MainContent_ddlMedioPagoEdicion').prop('disabled', true); 
            else
               $('#MainContent_ddlMedioPagoEdicion').prop('disabled', false); 

                    $('#div_EdicionMedioPago').dialog('open');

            }
            else
            {
                toastr.warning(str_mensaje_operacion);
            }

            return false;

            });


            return false;

        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
            return false;
        }

    }

function F_EdicionMedioPago(){
  try 
        {
        var objParams = {   
            Filtro_FechaEmision:           $('#MainContent_txtEmisionEdicion').val(),
            Filtro_CodMedioPago:           $('#MainContent_ddlMedioPagoEdicion').val(),
            Filtro_CodCajaFisica:          $('#MainContent_ddlCajaFisicaEdicion').val(),
            Filtro_CodCobranza:            $('#hfCodCobranza').val(),
            Filtro_CodBanco:               ($('#MainContent_ddlBancoEdicion option:selected').text() === '')? '0' : $('#MainContent_ddlBancoEdicion').val(),
            Filtro_CodCtaBancaria:         ($('#MainContent_ddlCuentaEdicion option:selected').text() === '')? '0' : $('#MainContent_ddlCuentaEdicion').val(),
            Filtro_NroOperacion:           $('#MainContent_txtNroOperacionEdicion').val(),
            Filtro_Observacion:            $('#MainContent_txtObservacionEdicion').val(),
            Filtro_Comision:               $('#MainContent_txtComision').val(),
            Filtro_Recibo:               $('#MainContent_txtNroReciboEdicion').val()
                         };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_EditarMedioPago_Net(arg, function (result) {
      
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    toastr.warning(result.split('~')[1]);  
                    $('#div_EdicionMedioPago').dialog('close');
                    F_Buscar();              
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

function F_Inicializar_Filtros() {
    $('#MainContent_chkFiltroFecha').prop('checked', false);
    $('#MainContent_chkFiltroMonto').prop('checked', false);
    $('#MainContent_txtFiltroMontoDesde').val('');
    $('#MainContent_txtFiltroMontoHasta').val('');
    $('#MainContent_txtFiltroMontoDesde').prop('disabled', true);
    $('#MainContent_txtFiltroMontoHasta').prop('disabled', true);   
    $('#MainContent_ddlFiltroMoneda').val('0');
    $('#MainContent_ddlFiltroEstado').val('1');
return true;
}

function F_EdicionDetalle(Fila, Tipo) {
    Fila = '#' + Fila;

    var hfSaldo = Fila.replace('chkEditar', 'hfSaldo');
    var hfCodFacturaDet = Fila.replace('chkEditar', 'hfCodFacturaDet');
    var lblFactura = Fila.replace('chkEditar', 'lblFactura');
    var hfTotalFactura = Fila.replace('chkEditar', 'hfTotalFactura');
    var hfSaldo = Fila.replace('chkEditar', 'hfSaldo');
    var hfCodMoneda = Fila.replace('chkEditar', 'hfCodMoneda');
    var hfMoneda = Fila.replace('chkEditar', 'hfMoneda');
    var lblTC = Fila.replace('chkEditar', 'lblTC');
    var hfCodTipoDoc = Fila.replace('chkEditar', 'hfCodTipoDoc');
    var lblAcuenta = Fila.replace('chkEditar', 'lblAcuenta');
    var hfAcuenta = Fila.replace('chkEditar', 'hfAcuenta');
    var lblSaldoNuevo = Fila.replace('chkEditar', 'lblSaldoNuevo');
    
    if ($(Fila).prop('checked') === false)
        $(Fila).prop('checked', true);
        else
        $(Fila).prop('checked', false);

    if (isNaN($(hfSaldo).val())) {
        return false;
        }

    if (Number($(hfSaldo).val()) === 0) {
        toastr.warning('NO SE PUEDE EDITAR UNA FACTURA CANCELADA');
        return false;
        }

    $('#hfCodFacturaDet').val(Fila);
    $('#hfCodTipoDoc').val($(hfCodTipoDoc).val());
    $('#hfSoles').val(0);
    $('#hfDolares').val(0);
    $('#MainContent_txtAcuentaEdicion').val($(hfAcuenta).text());
    $('#MainContent_txtNuevoSaldoEdicion').val($(lblSaldoNuevo).text().replace('S/', '').replace('$', '').trim());
    $('#hfCodMonedaEdicion').val($(hfCodMoneda).val());
    $('#MainContent_txtTCEdicion').val($(lblTC).text())
    $('#MainContent_txtFacturaEdicion').val($(lblFactura).text())
    $('#MainContent_txtTotalFacturaEdicion').val("S/ " + $(hfTotalFactura).val())
    $('#MainContent_txtSaldoEdicion').val("S/ " + $(hfSaldo).val())
    if ($(hfCodMoneda).val() === '2') {
        $('#MainContent_txtTotalFacturaEdicion').val("$ " + $(hfTotalFactura).val())
        $('#MainContent_txtSaldoEdicion').val("$ " + $(hfSaldo).val())
        }
    $('#MainContent_lblMonedaEdicion').text($('#MainContent_ddlMoneda option:selected').text());
    $('#MainContent_lblMonedaEdicion2').text($(hfMoneda).val());

    $("#div_EdicionSaldos").dialog({
        resizable: false,
        modal: true,
        title: "Edicion",
        title_html: false,
        height: 180,
        width: 580,
        autoOpen: false
    });
    $('#div_EdicionSaldos').dialog('open');

    var Saldo = $('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', '').trim();
    if (P_CXCCXP_ASIGNAR_ACUENTA_AUTOMATICO === '1')
    {
        if ($(hfCodMoneda).val()==$('#MainContent_ddlMoneda').val())
        {
        $('#MainContent_txtAcuentaEdicion').val(parseFloat(Saldo).toFixed(2));
        }
        else
        {
              if ($('#MainContent_ddlMoneda').val()==1)
              {
              Saldo*= $('#MainContent_txtTC').val();
              $('#MainContent_txtAcuentaEdicion').val(parseFloat(Saldo).toFixed(2));
              }
              else
              {
              Saldo/= $('#MainContent_txtTC').val();
              $('#MainContent_txtAcuentaEdicion').val(parseFloat(Saldo).toFixed(2));
              }
              
        }            
    }       
        
        
    $('#MainContent_txtAcuentaEdicion').select();

    return true;
}
    
function F_CalcularEdicion (){
    if (isNaN($('#MainContent_txtAcuentaEdicion').val()) | $('#MainContent_txtAcuentaEdicion').val().trim() === '') {
        $('#MainContent_txtAcuentaEdicion').val('0.00');
        $('#MainContent_txtAcuentaEdicion').select();
        return false;
    }
    $('#MainContent_txtAcuentaEdicion').val(parseFloat($('#MainContent_txtAcuentaEdicion').val()).toFixed(6));


    if (isNaN($('#MainContent_txtTCEdicion').val()) | $('#MainContent_txtTCEdicion').val().trim() === '') {
        $('#MainContent_txtTCEdicion').val(parseFloat($('#MainContent_txtTC').val()).toFixed(6));
        $('#MainContent_txtTCEdicion').select();
        //return false;
    }
    $('#MainContent_txtTCEdicion').val(parseFloat($('#MainContent_txtTCEdicion').val()).toFixed(6));

    var SaldoActualReal = Number($('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', ''));
    var SaldoActual = Math.abs(SaldoActualReal);
    var Soles = 0;
    var Dolares = 0;
    var TC = Number($('#MainContent_txtTCEdicion').val());
    var Acuenta = 0;
    

    if ($('#MainContent_ddlMoneda').val() === $('#hfCodMonedaEdicion').val()){
        if ($('#MainContent_ddlMoneda').val() === '1') {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val());
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val()) / TC;
            Acuenta = Soles;
        }
        else
        {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val()) * TC;
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val());        
            Acuenta = Dolares;
        }
        
    }
    else
    {
        if ($('#MainContent_ddlMoneda').val() === '1') {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val());
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val()) / TC;
             if ($('#hfCodMonedaEdicion').val() === '1')
                Acuenta = Soles;
            else
                Acuenta = Dolares;
        }
        else
        {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val()) * TC;
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val());        
             if ($('#hfCodMonedaEdicion').val() === '1')
                Acuenta = Soles;
            else
                Acuenta = Dolares;
        }
    }


    var Ns = (Math.abs(SaldoActual)-Math.abs(Acuenta));
    if (SaldoActualReal < 0) {
        Soles = Soles * -1;
        Dolares = Dolares * -1;
        Acuenta = Acuenta * -1;
        Ns = Ns * -1;
    }

    $('#hfSoles').val(Soles.toFixed(2));
    $('#hfDolares').val(Dolares.toFixed(2));
    $('#MainContent_txtNuevoSaldoEdicion').val(Ns.toFixed(2));
    if ($('#MainContent_txtNuevoSaldoEdicion').val() === '-0.00')
        $('#MainContent_txtNuevoSaldoEdicion').val('0.00')
return true;
}

function F_EditarDetalle (){
    if (F_CalcularEdicion() === false)
    return false;

    var Fila = $('#hfCodFacturaDet').val();
    var hfTotalFactura = Fila.replace('chkEditar', 'hfTotalFactura');
    var hfSoles = Fila.replace('chkEditar', 'hfSoles');
    var hfDolares = Fila.replace('chkEditar', 'hfDolares');
    var lblAcuenta = Fila.replace('chkEditar', 'lblAcuenta');
    var hfAcuenta = Fila.replace('chkEditar', 'hfAcuenta');
    var lblSaldoNuevo = Fila.replace('chkEditar', 'lblSaldoNuevo');
    var lblTC = Fila.replace('chkEditar', 'lblTC');
    var SaldoActualReal = Number($('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', ''));

    if (Number($('#MainContent_txtNuevoSaldoEdicion').val()) < 0 & SaldoActualReal > 0) {
        toastr.warning('EL PAGO NO PUEDE SER MAYOR AL SALDO DEL DOCUMENTO');
        return false;
    }

    var mon1 = 'S/ ';
    if ($('#MainContent_ddlMoneda').val() === '2')
        mon1 = '$ ';
    
    var mon2 = 'S/ ';
    if ($('#hfCodMonedaEdicion').val() === '2')
        mon2 = '$ ';

    var ac = Number($('#MainContent_txtAcuentaEdicion').val()).toFixed(2);
    var acr= Number($('#MainContent_txtAcuentaEdicion').val());
    var sn = Number($('#MainContent_txtNuevoSaldoEdicion').val()).toFixed(2);

    $(lblAcuenta).text(mon1 + ac);
    $(hfAcuenta).text(acr);
    $(lblSaldoNuevo).text(mon2 + sn);
    $(hfSoles).val($('#hfSoles').val());
    $(hfDolares).val($('#hfDolares').val());
    $(lblTC).text($('#MainContent_txtTCEdicion').val());
    
    $(Fila).prop('checked', true);
    if (Number($('#MainContent_txtAcuentaEdicion').val()) === 0) {
        $(Fila).prop('checked', false);
        $(lblSaldoNuevo).text('0.00');
        $(lblTC).text(parseFloat($('#MainContent_txtTC').val()).toFixed(6));
        }

    f_RecontarGrids(0);
return true;
}

function f_RecontarGrids(Flag) {
    var AcuentaCobranza = 0;
    $('#MainContent_grvFacturaCobranzas :checkbox').each(function () {
        chkSi = '#' + this.id;
        var lblAcuenta = chkSi.replace('chkEditar','hfAcuenta')
        if ($(chkSi).prop('checked') === true)
            AcuentaCobranza = AcuentaCobranza + Number($(lblAcuenta).text().replace('S/', '').replace('$', '').trim());
    });
    AcuentaCobranza = Number(AcuentaCobranza).toFixed(2);
    $('#MainContent_txtTotalCobranza').val(AcuentaCobranza);

    var AcuentaPagos = 0;
    $('#MainContent_grvFacturaPagos :checkbox').each(function () {
        chkSi = '#' + this.id;
        var lblAcuenta = chkSi.replace('chkEditar','lblAcuenta')
        if ($(chkSi).prop('checked') === true)
            AcuentaPagos = AcuentaPagos + Number($(lblAcuenta).text().replace('S/', '').replace('$', '').trim());
    });

    $('#MainContent_txtTotalDeuda').val(AcuentaPagos);

    //$('#MainContent_txtCobroOperacion').val((AcuentaCobranza-AcuentaPagos).toFixed(2));

    

    //var MontoVuelto = ((parseFloat($('#MainContent_txtCobroOperacion').val())+ parseFloat(AcuentaCobranza)) - AcuentaPagos).toFixed(2);

    if (Flag==0)
        $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val())  - parseFloat($('#MainContent_txtTotalDeuda').val())) ;

    var MontoVuelto = parseFloat($('#MainContent_txtCobroOperacion').val())  -  (parseFloat($('#MainContent_txtTotalCobranza').val())  - parseFloat($('#MainContent_txtTotalDeuda').val())) ;
    var VueltoSoles = 0;
    var VueltoDolares = 0;

    if ($('#MainContent_ddlMoneda').val() === "1") {
        VueltoSoles = MontoVuelto;
        VueltoDolares = MontoVuelto / Number($('#MainContent_txtTC').val());
    } else {
        VueltoDolares = MontoVuelto;
        VueltoSoles = MontoVuelto * Number($('#MainContent_txtTC').val());
    }

    $('#MainContent_ddlVuelto').empty();
    $('#MainContent_ddlVuelto').append($("<option></option>").val(1).html("S./ " + VueltoSoles.toFixed(2)));
    $('#MainContent_ddlVuelto').append($("<option></option>").val(2).html("USD " + VueltoDolares.toFixed(2)));
        
    $('#div_EdicionSaldos').dialog('close');
return true;
}

var CtlgvDetallado;
var HfgvDetallado;
function imgMas_ClickDetalladoCobranzas(Control) {
    CtlgvDetallado = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_LlenarGridDetalle_Detallado(grid.attr('id'));
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalle_Detallado(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvDetallado_pnlDetallado_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlDetallado', 'hfCodDocumentoVenta')).val();
                var grvNombre = 'MainContent_grvDetallado_grvDetalladoCobranzas_' + Col;
                HfgvDetallado = '#' + Fila.replace('pnlDetallado', 'hfDetalleCargado');

                if ($(HfgvDetallado).val() === "1")
                {
                    $(CtlgvDetallado).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvDetallado).next().html() + '</td></tr>');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,                     
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                        MostrarEspera(true);
                        F_LlenarGridDetalle_Detallado_NET(arg, function (result) {
                
                        MostrarEspera(false);

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(CtlgvDetallado).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvDetallado).next().html() + '</td></tr>');
                            $(HfgvDetallado).val('1');
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
        toastr.warning("ERROR DETECTADO: " + mierror);
    }
}

function F_BuscarDetallado(){
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';
     
              if ($('#MainContent_chkNumeroDetallado').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkFechaDetallado').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkClienteDetallado').is(':checked'))
              chkCliente='1';
                                
              var objParams = {
                                 Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
                                 Filtro_Numero: $('#MainContent_txtNumeroDetallado').val(),
                                 Filtro_Desde: $('#MainContent_txtDesdeDetallado').val(),
                                 Filtro_Hasta: $('#MainContent_txtHastaDetallado').val(),
                                 Filtro_CodCtaCte: $('#hfCodCtaCteDetallado').val(),
                                 Filtro_ChkNumero: chkNumero,
                                 Filtro_ChkFecha: chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_FlagAcuenta: $("#MainContent_ddlFlagAcuenta").val(),
                                 Filtro_CodTipoDoc:  $("#MainContent_ddlTipoDocDetallado").val(),       
                                 Filtro_CodAlmacen: $("#MainContent_ddlAlmacenDetallado").val() ,
                                 Filtro_CodVendedor: $("#MainContent_ddlVendedor").val() ,
                                 Filtro_Ruta: $("#MainContent_ddlRuta").val() ,
                                 Filtro_CodEmpresa:    $('#MainContent_ddlEmpresaDetallado').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_Buscar_Detallado_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    F_Update_Division_HTML('div_Detallado', result.split('~')[2]);   
                    $('#MainContent_lblNumeroConsulta3').text(F_Numerar_Grilla("grvDetallado", 'lblEstado'));

                    var titulos = true;
                    var TOTAL = 0;
                    var ACUENTA = 0;
                    var SALDO = 0;
                    var PTOTAL = '#MainContent_grvDetallado_hfTotal_';
                    var PACUENTA = '#MainContent_grvDetallado_hfAcuenta_';
                    var PSALDO = '#MainContent_grvDetallado_hfSaldo_';
                    //SUMA
                    $('#MainContent_grvDetallado > tbody  > tr').each(function(index, tr) { 

                    if (titulos == true) {
                        titulos = false;
                        TOTAL = Number($(PTOTAL +  index).val());
                        ACUENTA = Number($(PACUENTA +  index).val());
                        SALDO = Number($(PSALDO +  index).val());
                    }
                    else {
//                        PRUEBA
                            if(typeof $(PTOTAL +  (index )).val() !=='undefined'){
                        TOTAL = Number($(PTOTAL +  (index )).val())+TOTAL;
                        ACUENTA = Number($(PACUENTA +  index).val())+ACUENTA;
                        SALDO = Number($(PSALDO +  (index )).val())+SALDO;
                        }
                    }
                }); 
                    
                    $('#lblTotal').text(TOTAL.toFixed(2));
                    $('#lblAcuenta').text(ACUENTA.toFixed(2));
                $('#lblSaldo').text(SALDO.toFixed(2));
                    
                    
                    
                     
                    if  (str_mensaje_operacion!="")                       
                    toastr.warning(result.split('~')[1]);


                  
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

function F_BuscarEliminados(){
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';
              var chkSerie='0';
     
              if ($('#MainContent_chkNumeroDetallado2').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkFechaDetallado2').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkClienteDetallado2').is(':checked'))
              chkCliente='1';

              if ($('#MainContent_chkSerie').is(':checked'))
              chkSerie='1';
                                
              var objParams = {
                                 Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
                                 Filtro_Numero: $('#MainContent_txtNumeroDetallado2').val(),
                                 Filtro_Desde: $('#MainContent_txtDesdeDetallado2').val(),
                                 Filtro_Hasta: $('#MainContent_txtHastaDetallado2').val(),
                                 Filtro_CodCtaCte: $('#hfCodCtaCteConsultaEliminado').val(),
                                 Filtro_ChkNumero: chkNumero,
                                 Filtro_ChkFecha: chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_ChkSerie: chkSerie,
                                 Filtro_CodMedioPago:  $("#MainContent_ddlMedioPagoConsulta2").val(),       
                                 Filtro_CodCajaFisica: $("#MainContent_ddlAlmacenDetallado2").val() ,
                                 Filtro_CodEmpresa:    $('#MainContent_ddlEmpresaConsulta3').val(),
                                 Filtro_Codtipodoc:    $('#MainContent_ddltipodoc2').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_Buscar_Eliminados_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    F_Update_Division_HTML('div_Eliminados', result.split('~')[2]);   
                    $('#lblNumeroConsulta2').text(F_Numerar_Grilla("grvEliminado", 'lblProveedor2')); 
                    if  (str_mensaje_operacion!="")                       
                    toastr.warning(result.split('~')[1]);
                  
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
var CtlgvVentas;
var HfgvVentas;

function imgMas_ClickDetalleFactura(Control) {
    CtlgvVentas = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalleVenta(grid.attr('id'));
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalleVenta(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvDetallado_pnlDetalleFactura_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlDetalleFactura', 'hfCodDocumentoVenta')).val();
                var CodTipoDoc = $('#' + Fila.replace('pnlDetalleFactura', 'hfCodTipoDoc')).val();
                var grvNombre = 'MainContent_grvDetallado_grvDetalleFactura_' + Col;
                HfgvVentas = '#' + Fila.replace('pnlDetalleFactura', 'hfVentasCargado');

                if ($(HfgvVentas).val() === "1")
                {
                    $(CtlgvVentas).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvVentas).next().html() + '</td></tr>');
                    $(CtlgvVentas).attr('src', '../Asset/images/minus.gif');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: CodTipoDoc,
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                        
                        $(CtlgvVentas).attr('src', '../Asset/images/loading.gif');
                        F_LlenarGridDetalleVenta_NET(arg, function (result) {
                
                        $(CtlgvVentas).attr('src', '../Asset/images/minus.gif');

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(CtlgvVentas).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvVentas).next().html() + '</td></tr>');
                            $(HfgvVentas).val('1');
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

function F_Reporte(){
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion

              var Numero = $('#MainContent_txtNumeroDetallado').val();
              var Desde  = $('#MainContent_txtDesdeDetallado').val();
              var Hasta  = $('#MainContent_txtHastaDetallado').val();
              var CodCtaCte = $('#hfCodCtaCteDetallado').val();
              var FlagAcuenta = $("#MainContent_ddlFlagAcuenta").val();
              var CodTipoDoc = $("#MainContent_ddlTipoDocDetallado").val();       
              var CodAlmacen = $("#MainContent_ddlAlmacenDetallado").val();
              var CodEmpresa =    $('#MainContent_ddlEmpresaDetallado').val();
              var rptURL = '';
              var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
              var TipoArchivo = 'application/pdf';
              var CodTipoArchivo = 5;
              var CodMenu = 404;
              var Titulo = "REPORTE DE HISTORIAL DE COBRANZAS DETALLADO";
              var SubTitulo = "DESDE " + $("#MainContent_txtDesdeDetallado").val() + " HASTA " + $('#MainContent_txtHastaDetallado').val();
              var NombreTabla = "Cobranzas";
              var NombreArchivo = "Web_Reporte_Cobranzas_rptHistorialCobranzasDetallado.rpt";

              if (!$('#MainContent_chkNumeroDetallado').is(':checked'))
                    Numero='';

              if (!$('#MainContent_chkFechaDetallado').is(':checked'))
              {
              Desde='01/01/1990';
              Hasta='01/01/1990'
              }
                    

              if ($('#MainContent_chkClienteDetallado').is(':checked'))
                    CodCtaCte=0;
              
              rptURL = '../Reportes/Web_Pagina_Crystal_Nuevo.aspx';
              rptURL = rptURL + '?';
              rptURL = rptURL + 'CodMenu='        + CodMenu + '&';
              rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
              rptURL = rptURL + 'TipoArchivo='    + TipoArchivo + '&';
              rptURL = rptURL + 'Numero='         + Numero + '&';
              rptURL = rptURL + 'Desde='          + Desde + '&';
              rptURL = rptURL + 'Hasta='          + Hasta + '&';
              rptURL = rptURL + 'CodCtaCte='      + CodCtaCte + '&';
              rptURL = rptURL + 'FlagAcuenta=' + FlagAcuenta + '&';
              rptURL = rptURL + 'CodTipoDoc='          + CodTipoDoc + '&';
              rptURL = rptURL + 'CodAlmacen='      + CodAlmacen + '&';
              rptURL = rptURL + 'CodEmpresa=' + CodEmpresa + '&';
              rptURL = rptURL + 'Titulo='         + Titulo + '&';
              rptURL = rptURL + 'SubTitulo='      + SubTitulo + '&';              
              rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
              rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
                    
              window.open(rptURL, "PopUpRpt", Params);

              return false;
}

function F_AnularPopUP(Fila) {
if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        var imgID = Fila.id;   
        var lblProveedor = '#' + imgID.replace('imgAnularDocumento', 'lblProveedor');
        var hfCodigo = '#' + imgID.replace('imgAnularDocumento', 'hfCodigo');    
        var lblnumero = '#' + imgID.replace('imgAnularDocumento', 'hfCodigo');        
        
        $('#hfCodDocumentoVentaAnulacion').val($(hfCodigo).val());
        $('#hfClienteAnulacion').val($(lblProveedor).text());    
        $('#MainContent_txtObservacionAnulacion').val('');
        $('#div_Anulacion').dialog({
               resizable: false,
               modal: true,
               title: "Eliminacion de Cobranza",
               title_html: true,
               height: 190,
               width: 470,
               autoOpen: false
           });          
        $('#div_Anulacion').dialog('open');
}



// INICIO DETALLES DE LA GRILLA CONSULTA 

// DETALLE COBRANZA
var Ctlgv;
var Hfgv;
function imgMas_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));
        //$(Control).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Control).next().html() + '</td></tr>');
        $(Control).attr('src', '../Asset/images/minus.gif');
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
                var nmrow = 'MainContent_grvConsulta_pnlOrders_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlOrders', 'hfCodigo')).val();
                var grvNombre = 'MainContent_grvConsulta_grvDetalle_' + Col;
                Hfgv = '#' + Fila.replace('pnlOrders', 'hfDetalleCargado');

                if ($(Hfgv).val() === "1")
                {
                    $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 0,
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                        MostrarEspera(true);
                        F_LlenarGridDetalle_NET(arg, function (result) {
                
                        MostrarEspera(false);

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
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'hfCodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleObservacion_' + Col;
        HfgvObservacion = '#' + Fila.replace('pnlOrdersObservacion', 'hfDetalleCargadoObservacion');

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
        var Codigo = $('#' + Fila.replace('pnlOrdersAuditoria', 'hfCodigo')).val();
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

// FIN DETALLES DE LA GRILLA CONSULTA 


// INICIO DETALLES DE LA GRILLA CONSULTA ELIMINADOS

var CtlgvEliminados;
var HfgvEliminados;

function imgMas_ClickEliminar(Control) {
    CtlgvEliminados = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_LlenarGridEliminar(grid.attr('id'));
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridEliminar(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvEliminado_pnlOrdersE_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlOrdersE', 'hfCodigo2')).val();
                var grvNombre = 'MainContent_grvEliminado_grvDetalleEliminado_' + Col;
                HfgvEliminados = '#' + Fila.replace('pnlOrdersE', 'hfDetalleCargado2');

                if ($(HfgvEliminados).val() === "1")
                {
                    $(CtlgvEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvEliminados).next().html() + '</td></tr>');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 0,
                            Filtro_grvNombre: grvNombre
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                        MostrarEspera(true);
                        F_LlenarGridEliminar_NET(arg, function (result) {
                
                        MostrarEspera(false);

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(CtlgvEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvEliminados).next().html() + '</td></tr>');
                            $(HfgvEliminados).val('1');
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

var CtlgvObservacionEliminados;
var HfgvObservacionEliminados;

function imgMasObservacionEliminados_Click(Control) {
    CtlgvObservacionEliminados = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_ObservacionEliminadas(grid.attr('id'));        
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_ObservacionEliminadas(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacionEliminadas', 'hfCodigo2')).val();
        var grvNombre = 'MainContent_grvEliminado_grvDetalleObservacionE_' + Col;
        HfgvObservacionEliminados = '#' + Fila.replace('pnlOrdersObservacionEliminadas', 'hfDetalleCargadoObservacion2');

        if ($(HfgvObservacionEliminados).val() === "1") {
            $(CtlgvObservacionEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacionEliminados).next().html() + '</td></tr>');
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
                F_Observacion_Eliminados_NET(arg, function (result) {

                    MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvObservacionEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacionEliminados).next().html() + '</td></tr>');
                        $(HfgvObservacionEliminados).val('1');
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

var CtlgvAuditoriaEliminados;
var HfgvAuditoriaEliminados;
function imgMasAuditoriaEliminados_Click(Control) {
    CtlgvAuditoriaEliminados = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_AuditoriaEliminados(grid.attr('id'));        
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_AuditoriaEliminados(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersAuditoriaEliminados', 'hfCodigo2')).val();
        var grvNombre = 'MainContent_grvEliminado_grvDetalleAuditoria_' + Col;
        HfgvAuditoriaEliminados = '#' + Fila.replace('pnlOrdersAuditoriaEliminados', 'hfDetalleCargadoAuditoria');

        if ($(HfgvAuditoriaEliminados).val() === "1") {
                    $(CtlgvAuditoriaEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoriaEliminados).next().html() + '</td></tr>');
//                    $(CtlgvAuditoriaEliminados).attr('src', '../Asset/images/minus.gif');
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
                //$(CtlgvAuditoriaEliminados).attr('src', '../Asset/images/loading.gif');
                F_Auditoria_Eliminados_NET(arg, function (result) {
                //$(CtlgvAuditoriaEliminados).attr('src', '../Asset/images/minus.gif');
                    //MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvAuditoriaEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoriaEliminados).next().html() + '</td></tr>');
                        $(HfgvAuditoriaEliminados).val('1');
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

var CtlgvObservacionesEliminados;
var HfgvObservacionesEliminados;
function imgMasObservacionesEliminados_Click(Control) {
    CtlgvObservacionesEliminados = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_ObservacionesEliminados(grid.attr('id'));        
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_ObservacionesEliminados(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlObservacionesEliminados', 'hfCodigo2')).val();
        var grvNombre = 'MainContent_grvEliminado_grvObservacionesEliminados_' + Col;
        HfgvObservacionesEliminados = '#' + Fila.replace('pnlObservacionesEliminados', 'hfDetalleObservacionesEliminados');

        if ($(HfgvObservacionesEliminados).val() === "1") {
                    $(CtlgvObservacionesEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacionesEliminados).next().html() + '</td></tr>');
//                    $(CtlgvObservacionesEliminados).attr('src', '../Asset/images/minus.gif');
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
                $(CtlgvObservacionesEliminados).attr('src', '../Asset/images/loading.gif');
                F_ObservacionesEliminados_NET(arg, function (result) {
                $(CtlgvObservacionesEliminados).attr('src', '../Asset/images/minus.gif');
                    //MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvObservacionesEliminados).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacionesEliminados).next().html() + '</td></tr>');
                        $(HfgvObservacionesEliminados).val('1');
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

// INICIO DETALLES DE LA GRILLA CONSULTA ELIMINADOS
function F_Reporte_Povis(){
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion

              var Numero = $('#MainContent_txtNumeroDetallado').val();
              var Desde  = $('#MainContent_txtDesdeDetallado').val();
              var Hasta  = $('#MainContent_txtHastaDetallado').val();
              var CodCtaCte = $('#hfCodCtaCteDetallado').val();
              var FlagAcuenta = $("#MainContent_ddlFlagAcuenta").val();
              var CodTipoDoc = $("#MainContent_ddlTipoDocDetallado").val();       
              var CodAlmacen = $("#MainContent_ddlAlmacenDetallado").val();
              var CodEmpresa =    $('#MainContent_ddlEmpresaDetallado').val();
              var Ruta =    $('#MainContent_ddlRuta').val();
              var CodVendedor =    $('#MainContent_ddlVendedor').val();
              var rptURL = '';
              var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
              var TipoArchivo = 'application/pdf';
              var CodTipoArchivo = 5;
              var CodMenu = 708;
              var Titulo = "CUENTAS POR COBRAR DETALLADO";
              var SubTitulo = "DESDE " + $("#MainContent_txtDesdeDetallado").val() + " HASTA " + $('#MainContent_txtHastaDetallado').val();
              var NombreTabla = "DetalladoCobranzaPovis";
              var NombreArchivo = "Web_Reporte_Cobranzas_rptHistorialCobranzasDetallado_Povis.rpt";

              if (!$('#MainContent_chkNumeroDetallado').is(':checked'))
                    Numero='';

              if (!$('#MainContent_chkFechaDetallado').is(':checked'))
              {
              Desde='01/01/1990';
              Hasta='01/01/1990'
              }
                    

              if (!$('#MainContent_chkClienteDetallado').is(':checked'))
                    CodCtaCte=0;
              
              rptURL = '../Reportes/Web_Pagina_Crystal_Nuevo.aspx';
              rptURL = rptURL + '?';
              rptURL = rptURL + 'CodMenu='        + CodMenu + '&';
              rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
              rptURL = rptURL + 'TipoArchivo='    + TipoArchivo + '&';
              rptURL = rptURL + 'Numero='         + Numero + '&';
              rptURL = rptURL + 'Desde='          + Desde + '&';
              rptURL = rptURL + 'Hasta='          + Hasta + '&';
              rptURL = rptURL + 'CodCtaCte='      + CodCtaCte + '&';
              rptURL = rptURL + 'FlagAcuenta=' + FlagAcuenta + '&';
              rptURL = rptURL + 'CodTipoDoc='          + CodTipoDoc + '&';
              rptURL = rptURL + 'CodAlmacen='      + CodAlmacen + '&';
              rptURL = rptURL + 'CodEmpresa=' + CodEmpresa + '&';
              rptURL = rptURL + 'Ruta=' + Ruta + '&';
              rptURL = rptURL + 'CodVendedor=' + CodVendedor + '&';
              rptURL = rptURL + 'Titulo='         + Titulo + '&';
              rptURL = rptURL + 'SubTitulo='      + SubTitulo + '&';              
              rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
              rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
                    
              window.open(rptURL, "PopUpRpt", Params);

              return false;
}