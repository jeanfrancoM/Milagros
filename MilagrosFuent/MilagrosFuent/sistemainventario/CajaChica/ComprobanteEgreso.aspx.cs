using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Web.Services;
using CapaNegocios;
using CapaEntidad;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;

namespace SistemaInventario.CajaChica
{
    public partial class ComprobanteEgreso : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_EliminarTemporal_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_EditarTemporal_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_Mostrar_Correlativo_NET);
            CallbackManager.Register(F_BuscarFactura_NET);
            CallbackManager.Register(F_GrabarComprobanteCaja_NET);
            CallbackManager.Register(F_Series_Documentos_NET);
            CallbackManager.Register(F_Buscar_Factura_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_EliminarTemporal_Factura_NET);
            CallbackManager.Register(F_ActualizarObligaciones_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_LlenarGridDetalle_NET);
            //CallbackManager.Register(F_Series_Documentos_NET);
            CallbackManager.Register(F_Series_Documentos_Consulta_NET);
            CallbackManager.Register(F_CAJA_X_EMPRESA_NET);
            CallbackManager.Register(F_Observacion_NET);
            CallbackManager.Register(F_Auditoria_NET);
        }

        private string _menu = "7000"; private string _opcion = "2";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            P_Inicializar_GrillaVacia_ConsultaComprobante();
            P_Inicializar_GrillaVacia_Factura();
            Session["datos"] = true;
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();
                GridView grvDetalle = null;
                GridView grvDetalleObservacion = null;
                GridView grvDetalleAuditoria = null;
                HiddenField lblID = null;

                lblID = (HiddenField)(e.Row.FindControl("lblID"));
                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                grvDetalleObservacion = (GridView)(e.Row.FindControl("grvDetalleObservacion"));
                grvDetalleAuditoria = (GridView)(e.Row.FindControl("grvDetalleAuditoria"));
                if (lblID.Value != "")
                {
                    DataTable dta_consultaarticulo = null;
                    DataRow dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("Numero", typeof(string));
                    dta_consultaarticulo.Columns.Add("CLIENTE", typeof(string));
                    dta_consultaarticulo.Columns.Add("Emision", typeof(string));
                    dta_consultaarticulo.Columns.Add("Total", typeof(string));
                    dta_consultaarticulo.Columns.Add("Comision", typeof(string));
                    dta_consultaarticulo.Columns.Add("Vendedor", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalle.DataSource = dta_consultaarticulo;
                    grvDetalle.DataBind();

                    dta_consultaarticulo = null;
                    dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();


                    dta_consultaarticulo.Columns.Add("Observacion", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalleObservacion.DataSource = dta_consultaarticulo;
                    grvDetalleObservacion.DataBind();

                    dta_consultaarticulo = null;
                    dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("Auditoria", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalleAuditoria.DataSource = dta_consultaarticulo;
                    grvDetalleAuditoria.DataBind();
                }
            }
        }

        public String F_LlenarGridDetalle_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Detalle_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalle");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                objEntidad.CodComprobanteCaja = Codigo;
                grvDetalle.DataSource = objOperacion.F_ComprobanteCajaDet_LISTAR(objEntidad);
                grvDetalle.DataBind();

                str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalle);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }


            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_Detalle_html + "~" +
                grvNombre;

            return str_resultado;
        }

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_moneda_html = "";
            String str_ddl_tipoingreso_html = "";
            String str_ddl_serie_html = "";
            String str_ddl_serieconsulta_html = "";
            String str_ddlMonedaComision_html = "";
            String str_ddlTipoDocumento_html = "";
            String str_ddlMedioPago_html = "";
            String str_ddlFormaPago_html = "";
            String str_ddlTipoDoc_html = "";
            String str_ddlTipoDocConsulta_html = "";
            String str_ddlCajaFisica_html = "";
            int CodCajaFisica = 0;
            String str_ddl_banco_html = "";
            String str_ddl_nrocuenta_html = "";
            String str_ddlEmpresa_html = "";
            String str_ddlEmpresaConsulta_html = "";
            decimal TC = 0;
            int int_resultado_operacion = 0;
            String P_CodMoneda_Inicial = "1";

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlTipoIngreso, ref ddlMoneda, ref ddlSerie, ref ddlSerieConsulta,
                    ref ddlMonedaComision, ref ddlTipoDocumento, ref ddlMedioPago, ref ddlTipoDoc, ref ddlCajaFisica, ref ddlTipoDocConsulta,
                    ref ddlFormaPago, ref ddlBanco, ref ddlEmpresa, ref ddlEmpresaConsulta);
                P_Obtener_TipoCambio(obj_parametros, ref TC);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta);

                str_ddl_tipoingreso_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoIngreso);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_serie_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerie);
                str_ddl_serieconsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerieConsulta);
                str_ddlMonedaComision_html = Mod_Utilitario.F_GetHtmlForControl(ddlMonedaComision);
                str_ddlTipoDocumento_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDocumento);
                str_ddlMedioPago_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPago);
                str_ddlTipoDoc_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDoc);
                str_ddlTipoDocConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDocConsulta);
                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisica);
                str_ddlFormaPago_html = Mod_Utilitario.F_GetHtmlForControl(ddlFormaPago);
                str_ddl_banco_html = Mod_Utilitario.F_GetHtmlForControl(ddlBanco);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
                str_ddlEmpresa_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresa);
                str_ddlEmpresaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaConsulta);

                try { CodCajaFisica = Convert.ToInt32(Session["CodCajaFisica"]); }
                catch (Exception) { }

                int_resultado_operacion = 1;

            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" + //0
                str_mensaje_operacion + "~" + //1
                str_ddl_tipoingreso_html + "~" + //2
                str_ddl_moneda_html + "~" + //3
                TC.ToString() + "~" + //4
                str_ddl_serie_html + "~" + //5
                str_ddl_serieconsulta_html + "~" + //6
                str_ddlMonedaComision_html + "~" + //7
                str_ddlTipoDocumento_html + "~" + //8
                str_ddlMedioPago_html + "~" + //9
                str_ddlTipoDoc_html + "~" + //10
                str_ddlCajaFisica_html + "~" + //11
                CodCajaFisica + "~" + //12
                str_ddlTipoDocConsulta_html + "~" + //13
                str_ddlFormaPago_html + "~" +   //14            
                str_ddl_banco_html + "~" +   //15            
                str_ddl_nrocuenta_html + "~" +  //16
                P_CodMoneda_Inicial + "~" + //17
                str_ddlEmpresa_html + "~" +//18
                str_ddlEmpresaConsulta_html + "~" + //19
                Session["CodEmpresa"].ToString(); //20; 
            return str_resultado;
        }

        public String F_Series_Documentos_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_serie_html = "";
            String str_ddl_serieconsulta_html = "";

            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Series_Documentos(obj_parametros, ref ddlSerie, ref ddlSerieConsulta);

                str_ddl_serie_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerie);
                str_ddl_serieconsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerieConsulta);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_ddl_serie_html
                 + "~" +
                str_ddl_serieconsulta_html;

            return str_resultado;
        }

        public String F_EliminarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleArticulo_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal SubTotal = 0;
            Decimal Igv = 0;
            Decimal Dscto = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_EliminarTemporal(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                //P_CargarGrillaTemporal(obj_parametros, Codigo, ref grvDetalleArticulo, ref SubTotal, ref Igv, ref Total, ref Dscto);
                //str_grvDetalleArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleArticulo);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvDetalleArticulo_html
                 + "~" +
               Math.Round(Total, 2).ToString()
                + "~" +
                Math.Round(Igv, 2).ToString()
                 + "~" +
                Math.Round(SubTotal, 2).ToString()
                 + "~" +
                Math.Round(Dscto, 2).ToString();

            return str_resultado;

        }

        public String F_GrabarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numerofactura = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarDocumento(obj_parametros, ref MsgError, ref Codigo);

                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                Codigo.ToString()
                + "~" +
                str_numerofactura;


            return str_resultado;

        }

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            String str_grvLetra_html = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Inicializar_GrillaVacia_Factura();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvFactura_html;


            return str_resultado;

        }

        public String F_Buscar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_ConsultaComprobante();
                    str_mensaje_operacion = "No se encontro registros.";
                }
                else
                    str_mensaje_operacion = "";


                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
                int_resultado_operacion = 1;


            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsulta_html;


            return str_resultado;

        }

        public String F_AnularRegistro_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AnularRegistro(obj_parametros, ref str_mensaje_operacion);

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
                int_resultado_operacion = 1;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsulta_html;


            return str_resultado;

        }

        public String F_EditarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_EditarTemporal(obj_parametros, ref MsgError);
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_ConsultaComprobante();
                    str_mensaje_operacion = "No se encontro registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
                int_resultado_operacion = 1;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsulta_html;

            return str_resultado;

        }

        public String F_TipoCambio_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Decimal TipoCambio = 0;
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_TipoCambio(obj_parametros, ref TipoCambio);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                TipoCambio.ToString();


            return str_resultado;

        }

        public String F_Mostrar_Correlativo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numero = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Obtener_NumeroCorrelativo(obj_parametros, ref str_numero);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_numero;

            return str_resultado;

        }

        public String F_BuscarFactura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            decimal Saldo = 0;
            Int32 CodMoneda = 0;
            Int32 CodDocumentoVenta = 0;
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_BuscarFactura(obj_parametros, ref Saldo, ref CodMoneda, ref CodDocumentoVenta);
                if (CodMoneda == 0)
                    str_mensaje_operacion = "NO SE ENCONTRARON REGISTROS";
                int_resultado_operacion = 1;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                Saldo.ToString()
                 + "~" +
                CodMoneda.ToString()
                + "~" +
                CodDocumentoVenta.ToString();

            return str_resultado;
        }

        public String F_GrabarComprobanteCaja_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numerofactura = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarComprobanteCaja(obj_parametros, ref MsgError);
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_ConsultaComprobante();
                    str_mensaje_operacion = "No se encontro registros.";
                }
                else
                    str_mensaje_operacion = "";

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);

                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                Codigo.ToString()
                + "~" +
                str_numerofactura
                + "~" +
                str_grvConsulta_html;


            return str_resultado;

        }

        public String F_Buscar_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla(obj_parametros, ref grvConsultaFactura);
                if (grvConsultaFactura.Rows.Count == 0)
                    P_LlenarGrillaVacia_ConsultaFactura();

                str_grvConsultaFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsultaFactura_html;

            return str_resultado;
        }

        public String F_AgregarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal Obligaciones = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref Codigo, ref MsgError);
                P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total, ref Obligaciones);
                if (grvFactura.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Factura();

                str_grvDetalleFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvDetalleFactura_html
                 + "~" +
                Math.Round(Total, 2).ToString()
                 + "~" +
                Math.Round(Obligaciones, 2).ToString();


            return str_resultado;

        }

        public String F_EliminarTemporal_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            Decimal Obligaciones = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal_Factura(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total, ref Obligaciones);
                if (grvFactura.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Factura();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvFactura_html
                 + "~" +
               Math.Round(Total, 2).ToString()
               + "~" +
               Math.Round(Obligaciones, 2).ToString();

            return str_resultado;

        }

        public String F_ActualizarObligaciones_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Decimal Total = 0;
            Decimal Obligaciones = 0;
            Hashtable obj_parametros = null;
            String str_grvFactura_html = "";
            int Codigo = 0;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ActualizarObligacion(obj_parametros, ref Codigo, ref MsgError);
                P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total, ref Obligaciones);
                if (grvFactura.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Factura();

                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);
                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvFactura_html
                  + "~" +
                Total.ToString()
                + "~" +
                Obligaciones.ToString();

            return str_resultado;
        }

        public String F_Series_Documentos_Consulta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_serieconsulta_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Series_Documentos_Consulta(obj_parametros, ref ddlSerieConsulta);

                str_ddl_serieconsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlSerieConsulta);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_ddl_serieconsulta_html;

            return str_resultado;
        }

        public String F_CAJA_X_EMPRESA_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlCajaFisica_html = "0";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_CAJA_X_EMPRESA(obj_parametros, ref ddlCajaFisica);
                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisica);
                int_resultado_operacion = 1;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" + //0
                str_mensaje_operacion + "~" + //1              
                str_ddlCajaFisica_html;  //2

            return str_resultado;
        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_tipoingreso,
             ref DropDownList ddl_combomoneda, ref DropDownList ddl_combofactura,
            ref DropDownList ddl_combofacturaconsulta, ref DropDownList ddl_combomonedacomprobante,
            ref DropDownList ddl_TipoDocumento, ref DropDownList ddl_MedioPago,
            ref DropDownList ddl_TipoDoc, ref DropDownList ddl_CajaFisica, ref DropDownList ddl_TipoDocConsulta,
            ref DropDownList ddl_comboformapago, ref DropDownList ddl_combobanco, ref DropDownList ddl_comboempresa, ref DropDownList ddl_comboempresaconsulta)
        {
            DataTable dta_consulta = null;

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();

            objEntidadConceptosDet.CodConcepto = 4;

            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomoneda.Items.Clear();

            ddl_combomoneda.DataSource = dta_consulta;
            ddl_combomoneda.DataTextField = "DscAbvConcepto";
            ddl_combomoneda.DataValueField = "CodConcepto";
            ddl_combomoneda.DataBind();

            ddl_combomonedacomprobante.Items.Clear();

            ddl_combomonedacomprobante.DataSource = dta_consulta;
            ddl_combomonedacomprobante.DataTextField = "DscAbvConcepto";
            ddl_combomonedacomprobante.DataValueField = "CodConcepto";
            ddl_combomonedacomprobante.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 8;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_tipoingreso.Items.Clear();

            ddl_tipoingreso.DataSource = dta_consulta;
            ddl_tipoingreso.DataTextField = "DscAbvConcepto";
            ddl_tipoingreso.DataValueField = "CodConcepto";
            ddl_tipoingreso.DataBind();

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 23;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_MedioPago.Items.Clear();

            ddl_MedioPago.DataSource = dta_consulta;
            ddl_MedioPago.DataTextField = "DscAbvConcepto";
            ddl_MedioPago.DataValueField = "CodConcepto";
            ddl_MedioPago.DataBind();

            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodDoc"]); ;
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodEmpresa = 3;
            objEntidad.CodEstado = 1;

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_combofactura.Items.Clear();

            ddl_combofactura.DataSource = dta_consulta;
            ddl_combofactura.DataTextField = "SerieDoc";
            ddl_combofactura.DataValueField = "CodSerie";
            ddl_combofactura.DataBind();

            ddl_combofacturaconsulta.Items.Clear();

            ddl_combofacturaconsulta.DataSource = dta_consulta;
            ddl_combofacturaconsulta.DataTextField = "SerieDoc";
            ddl_combofacturaconsulta.DataValueField = "CodSerie";
            ddl_combofacturaconsulta.DataBind();

            dta_consulta = null;
            TCDocumentosCN objOperacionDocumento = new TCDocumentosCN();
            dta_consulta = objOperacionDocumento.F_TCDocumentos_ListarVentas();

            ddl_TipoDocumento.Items.Clear();

            ddl_TipoDocumento.DataSource = dta_consulta;
            ddl_TipoDocumento.DataTextField = "Descripcion";
            ddl_TipoDocumento.DataValueField = "CodTipoDoc";
            ddl_TipoDocumento.DataBind();

            TCDocumentosCN objOperacionTCDocumentos = new TCDocumentosCN();
            TCDocumentosCE objEntidadTCDocumentos = new TCDocumentosCE();
            dta_consulta = objOperacionTCDocumentos.F_TCDocumentos_ComprobanteEgreso();
            ddl_TipoDoc.Items.Clear();
            ddl_TipoDoc.DataSource = dta_consulta;
            ddl_TipoDoc.DataTextField = "Descripcion";
            ddl_TipoDoc.DataValueField = "CodTipoDoc";
            ddl_TipoDoc.DataBind();

            ddl_TipoDocConsulta.Items.Clear();
            ddl_TipoDocConsulta.DataSource = dta_consulta;
            ddl_TipoDocConsulta.DataTextField = "Descripcion";
            ddl_TipoDocConsulta.DataValueField = "CodTipoDoc";
            ddl_TipoDocConsulta.DataBind();
            ddl_TipoDocConsulta.Items.Insert(0, new ListItem("TODOS", "0"));

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1, Convert.ToInt32(Session["CodSede"]), Convert.ToInt32(Session["CodEmpresa"]));
            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();

            dta_consulta = null;
            objEntidadConceptosDet.CodPrincipal = 5;
            objEntidadConceptosDet.CodTipoDoc = 8;
            dta_consulta = objOperacionConceptosDet.F_TCConceptosDet_LISTARFORMAPAGO(objEntidadConceptosDet);

            ddl_comboformapago.Items.Clear();

            ddl_comboformapago.DataSource = dta_consulta;
            ddl_comboformapago.DataTextField = "DscAbvConcepto";
            ddl_comboformapago.DataValueField = "CodConcepto";
            ddl_comboformapago.DataBind();

            BancosCN objOperacionBancos = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacionBancos.F_Listar_Bancos();

            ddl_combobanco.Items.Clear();

            ddl_combobanco.DataSource = dta_consulta;
            ddl_combobanco.DataTextField = "DscBanco";
            ddl_combobanco.DataValueField = "CodBanco";
            ddl_combobanco.DataBind();

            dta_consulta = null;

            dta_consulta = objOperacionDocumento.F_TCEMPRESA_LISTAR_COMBO();

            ddl_comboempresa.Items.Clear();

            ddl_comboempresa.DataSource = dta_consulta;
            ddl_comboempresa.DataTextField = "T_NombreComercial";
            ddl_comboempresa.DataValueField = "CodEmpresa";
            ddl_comboempresa.DataBind();

            ddl_comboempresaconsulta.Items.Clear();

            ddl_comboempresaconsulta.DataSource = dta_consulta;
            ddl_comboempresaconsulta.DataTextField = "T_NombreComercial";
            ddl_comboempresaconsulta.DataValueField = "CodEmpresa";
            ddl_comboempresaconsulta.DataBind();
            ddl_comboempresaconsulta.Items.Insert(0, new ListItem("TODOS", "0"));
        }

        public void P_Series_Documentos(Hashtable objTablaFiltro, ref DropDownList ddl_serie, ref DropDownList ddl_serieconsulta)
        {

            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodDoc"]);
            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_serie.Items.Clear();

            ddl_serie.DataSource = dta_consulta;
            ddl_serie.DataTextField = "SerieDoc";
            ddl_serie.DataValueField = "CodSerie";
            ddl_serie.DataBind();

            ddl_serieconsulta.Items.Clear();

            ddl_serieconsulta.DataSource = dta_consulta;
            ddl_serieconsulta.DataTextField = "SerieDoc";
            ddl_serieconsulta.DataValueField = "CodSerie";
            ddl_serieconsulta.DataBind();
        }

        public void P_Obtener_TipoCambio(Hashtable objTablaFiltro, ref Decimal TipoCambio)
        {

            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            DataTable dta_consulta = null;

            //
            //int iCodEmpresa = 3;

            objEntidad = new TCTipoCambioCE();

            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Fecha"]);

            objOperacion = new TCTipoCambioCN();

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                TipoCambio = Convert.ToDecimal(dta_consulta.Rows[0]["TC_Venta"]);



        }

        public void P_Inicializar_GrillaVacia_ConsultaComprobante()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("ID", typeof(string));
            dta_consulta.Columns.Add("Numero", typeof(string));
            dta_consulta.Columns.Add("RazonSocial", typeof(string));
            dta_consulta.Columns.Add("Fecha", typeof(string));
            dta_consulta.Columns.Add("Estado", typeof(string));
            dta_consulta.Columns.Add("Moneda", typeof(string));
            dta_consulta.Columns.Add("Motivo", typeof(string));
            dta_consulta.Columns.Add("Monto", typeof(string));
            dta_consulta.Columns.Add("Saldo", typeof(string));
            dta_consulta.Columns.Add("TipoCambio", typeof(string));
            dta_consulta.Columns.Add("Observacion", typeof(string));
            dta_consulta.Columns.Add("CodEstado", typeof(string));
            dta_consulta.Columns.Add("CodCtaCte", typeof(string));
            dta_consulta.Columns.Add("CodMotivo", typeof(string));
            dta_consulta.Columns.Add("MedioPago", typeof(string));
            dta_consulta.Columns.Add("CodTipoDoc", typeof(string));
            dta_consulta.Columns.Add("TipoDoc", typeof(string));
            dta_consulta.Columns.Add("TipoDocumento", typeof(string));
            dta_consulta.Columns.Add("Empresa", typeof(string));
            dta_consulta.Columns.Add("Auditoria", typeof(string));

            dtr_filaconsulta = dta_consulta.NewRow();

            dtr_filaconsulta[0] = "";
            dtr_filaconsulta[1] = "";
            dtr_filaconsulta[2] = "";
            dtr_filaconsulta[3] = "";
            dtr_filaconsulta[4] = "";
            dtr_filaconsulta[5] = "";
            dtr_filaconsulta[6] = "";
            dtr_filaconsulta[7] = "";
            dtr_filaconsulta[8] = "";
            dtr_filaconsulta[9] = "";
            dtr_filaconsulta[10] = "";
            dtr_filaconsulta[11] = "";
            dtr_filaconsulta[12] = "";
            dtr_filaconsulta[13] = "";
            dtr_filaconsulta[14] = "";
            dtr_filaconsulta[15] = "";

            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Factura()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Detalle", typeof(string));
            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Soles", typeof(string));
            dta_consultaarticulo.Columns.Add("Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("xSoles", typeof(string));
            dta_consultaarticulo.Columns.Add("xDolares", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("CodTipoDoc", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("MontoObligacion", typeof(string));
            dta_consultaarticulo.Columns.Add("TipoDoc", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";
            dtr_consultafila[5] = "";
            dtr_consultafila[6] = "";
            dtr_consultafila[7] = "";
            dtr_consultafila[8] = "";
            dtr_consultafila[9] = "";
            dtr_consultafila[10] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvFactura.DataSource = dta_consultaarticulo;
            grvFactura.DataBind();
        }

        public void P_LlenarGrillaVacia_ConsultaFactura()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Detalle", typeof(string));
            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Soles", typeof(string));
            dta_consultaarticulo.Columns.Add("Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("xSoles", typeof(string));
            dta_consultaarticulo.Columns.Add("xDolares", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("CodTipoDoc", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("CodEmpresa", typeof(string));
            dta_consultaarticulo.Columns.Add("Total", typeof(string));
            dta_consultaarticulo.Columns.Add("MontoObligacion", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsultaFactura.DataSource = dta_consultaarticulo;
            grvConsultaFactura.DataBind();

        }

        public void P_Cargar_Grilla(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodMotivo = Convert.ToInt32(objTablaFiltro["Filtro_CodMotivo"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

            objOperacion = new DocumentoVentaCabCN();

            grvConsulta.DataSource = objOperacion.F_DocumentoVentaCab_Comprobantes(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {
            NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();
            NotaIngresoSalidaCabCN objOperacion = new NotaIngresoSalidaCabCN();

            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.CodMotivo = Convert.ToInt32(objTablaFiltro["Filtro_CodMotivo"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.Monto = Convert.ToDecimal(objTablaFiltro["Filtro_Monto"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.Proveedor = Convert.ToString(objTablaFiltro["Filtro_Cliente"]);
            objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.NroRuc = Convert.ToString(objTablaFiltro["Filtro_NroRuc"]);
            objEntidad.CodDepartamento = Convert.ToInt32(objTablaFiltro["Filtro_CodDepartamento"]);
            objEntidad.CodProvincia = Convert.ToInt32(objTablaFiltro["Filtro_CodProvincia"]);
            objEntidad.CodDistrito = Convert.ToInt32(objTablaFiltro["Filtro_CodDistrito"]);
            objEntidad.Direccion = Convert.ToString(objTablaFiltro["Filtro_Direccion"]);
            objEntidad.CodDireccion = Convert.ToInt32(objTablaFiltro["Filtro_CodDireccion"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodigoTemporal = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            objEntidad.NroOperacion = Convert.ToString(objTablaFiltro["Filtro_NroOperacion"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);
            objEntidad.CodCtaBancaria = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaBancaria"]);
            objEntidad.ImpSubTotal = Convert.ToDecimal(objTablaFiltro["Filtro_Subtotal"]);
            objEntidad.ImpIGV = Convert.ToDecimal(objTablaFiltro["Filtro_Igv"]);

            switch (objEntidad.CodTipoDoc)
            {
                case 13:
                    objOperacion.F_ComprobanteCaja_Insert(objEntidad);
                    break;
                default:
                    objEntidad.ImpTotal = objEntidad.Monto;
                    objEntidad.FechaIngreso = objEntidad.FechaEmision; objEntidad.Vencimiento = objEntidad.FechaEmision;
                    objEntidad.CodTipoOperacion = 2;
                    objEntidad.CodClasificacion = 1; objEntidad.CodCategoria = 1;
                    objEntidad.CodTasa = Convert.ToInt32(objTablaFiltro["Filtro_CodTasas"]);
                    objEntidad.CodTipoDocSust = objEntidad.CodTipoDoc; objEntidad.CodTipoDoc = 0;
                    objEntidad.SerieDocSust = objEntidad.SerieDoc; objEntidad.SerieDoc = "";
                    objEntidad.NumeroDocSust = objEntidad.NumeroDoc; objEntidad.NumeroDoc = "";
                    objOperacion.F_NotaIngresoSalidaCab_InsertGastos(objEntidad);
                    break;
            }

            MsgError = objEntidad.MsgError;
            Codigo = objEntidad.CodMovimiento;
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkNumero"]) == 1)
                objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            else
                objEntidad.NumeroDoc = "";

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkFactura"]) == 1)
                objEntidad.Factura = Convert.ToString(objTablaFiltro["Filtro_Factura"]);
            else
                objEntidad.Factura = "";

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkFecha"]) == 1)
            {
                objEntidad.Desde = Convert.ToDateTime(objTablaFiltro["Filtro_Desde"]);
                objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);
            }
            else
            {
                objEntidad.Desde = Convert.ToDateTime("01/01/1990");
                objEntidad.Hasta = Convert.ToDateTime("01/01/1990");
            }

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkCliente"]) == 1)
                objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCtaCte = 0;

            objOperacion = new NotaIngresoSalidaCabCN();

            dta_consulta = objOperacion.F_ComprobanteCaja_Listar_Egresos(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodComprobanteCaja = Convert.ToInt32(objTablaFiltro["Filtro_CodComprobanteCaja"]);
            objEntidad.CodMovimiento = Convert.ToInt32(objTablaFiltro["Filtro_CodComprobanteCaja"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]);
            objEntidad.ObservacionAnulacion = Convert.ToString(objTablaFiltro["Filtro_ObservacionAnulacion"]);

            objOperacion = new NotaIngresoSalidaCabCN();

            if (objEntidad.CodTipoDoc == 13)
                objOperacion.F_ComprobanteCaja_Anulacion(objEntidad);
            else
                objOperacion.F_Eliminacion_NotaIngreso_Gastos(objEntidad);

            Mensaje = objEntidad.MsgError;
        }

        public void P_TipoCambio(Hashtable objTablaFiltro, ref Decimal TC)
        {

            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            objEntidad = new TCTipoCambioCE();
            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Emision"]);

            objOperacion = new TCTipoCambioCN();

            DataTable dta_consulta = null;

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count == 0)
                TC = 0;
            else
                TC = Convert.ToDecimal(dta_consulta.Rows[0][0]);


        }

        public void P_Obtener_NumeroCorrelativo(Hashtable objTablaFiltro, ref String Numero)
        {
            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodSede = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodDoc"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Numero_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                Numero = Convert.ToString(dta_consulta.Rows[0]["NumeroDoc"]);
        }

        public void P_BuscarFactura(Hashtable objTablaFiltro, ref Decimal Saldo, ref Int32 CodMoneda, ref Int32 CodDocumentoVenta)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.SerieDoc = Convert.ToString(objTablaFiltro["Filtro_SerieDoc"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_NumeroDoc"]);
            objEntidad.CodMotivo = Convert.ToInt32(objTablaFiltro["Filtro_CodMotivo"]);

            objOperacion = new NotaIngresoSalidaCabCN();

            dta_consulta = objOperacion.F_ComprobanteCaja_BuscarFactura_Compras(objEntidad);

            if (dta_consulta.Rows.Count > 0)
            {
                Saldo = Convert.ToDecimal(dta_consulta.Rows[0]["Saldo"]);
                CodMoneda = Convert.ToInt32(dta_consulta.Rows[0]["CodMoneda"]);
                CodDocumentoVenta = Convert.ToInt32(dta_consulta.Rows[0]["CodDocumentoVenta"]);
            }
        }

        public void P_GrabarComprobanteCaja(Hashtable objTablaFiltro, ref String Mensaje)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodComprobanteCaja = Convert.ToInt32(objTablaFiltro["Filtro_CodComprobanteCaja"]);
            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodDocumentoVenta"]);
            objEntidad.SaldoComprobante = Convert.ToDecimal(objTablaFiltro["Filtro_SaldoComprobante"]);
            objEntidad.CodMotivo = Convert.ToInt32(objTablaFiltro["Filtro_CodMotivo"]);

            objOperacion = new NotaIngresoSalidaCabCN();

            objOperacion.F_ComprobanteCaja_ActualizarSaldo_Compras(objEntidad);

            Mensaje = objEntidad.MsgError;

        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                XmlDetalle = XmlDetalle + " Soles = '" + item.Soles + "'";
                XmlDetalle = XmlDetalle + " Dolares = '" + item.Dolares + "'";
                XmlDetalle = XmlDetalle + " xSoles = '" + item.xSoles + "'";
                XmlDetalle = XmlDetalle + " xDolares = '" + item.xDolares + "'";
                XmlDetalle = XmlDetalle + " TC = '" + item.TC + "'";
                XmlDetalle = XmlDetalle + " CodMoneda = '" + item.CodMoneda + "'";
                XmlDetalle = XmlDetalle + " CodEmpresa = '" + item.CodEmpresa + "'";
                XmlDetalle = XmlDetalle + " CodTipoDoc = '" + item.CodTipoDoc + "'";
                XmlDetalle = XmlDetalle + " CodCtaCte = '" + item.CodCtaCte + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new DocumentoVentaCabCN();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]) == 0)
            {
                objOperacion.F_TemporalCodigoFacturaCab_Insert(objEntidad);
                Codigo = objEntidad.CodDocumentoVenta;
            }
            else
            {
                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);
                Codigo = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            }

            MsgError = objEntidad.MsgError;
        }

        public void P_EliminarTemporal_Factura(Hashtable objTablaFiltro, ref String MsgError)
        {

            DocumentoVentaDetCE objEntidad = null;
            DocumentoVentaDetCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaDetCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new DocumentoVentaDetCN();

            objOperacion.F_TemporalCodigoFacturaDet_Eliminar(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_CargarGrillaTemporal_Factura(Hashtable objTablaFiltro, Int32 Codigo, ref GridView grvDetalle,
           ref Decimal TotalFactura, ref Decimal TotalObligaciones)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();
            objOperacion = new DocumentoVentaCabCN();

            DataTable dta_consulta = null;
            if (Codigo != 0)
            {
                objEntidad.CodDocumentoVenta = Codigo;
                dta_consulta = objOperacion.F_TemporalCodigoFacturaDet_Listar(objEntidad);
            }
            if (dta_consulta.Rows.Count > 0)
            {
                for (int j = 0; j < dta_consulta.Rows.Count; j++)
                {
                    TotalFactura += Convert.ToDecimal(dta_consulta.Rows[j]["Soles"]);
                    TotalObligaciones += Convert.ToDecimal(dta_consulta.Rows[j]["xSoles"]);
                }
            }

            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();
        }

        public void P_ActualizarObligacion(Hashtable objTablaFiltro, ref int Codigo, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_ID"]);
            Codigo = Convert.ToInt32(objTablaFiltro["Filtro_Codigo"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TC"]);
            objEntidad.CobranzaSoles = Convert.ToDecimal(objTablaFiltro["Filtro_Soles"]);
            objEntidad.CobranzaDolares = Convert.ToDecimal(objTablaFiltro["Filtro_Dolares"]);
            objEntidad.CobroOperacionSoles = Convert.ToDecimal(objTablaFiltro["Filtro_Monto"]);

            objOperacion.F_TemporalCodigoFacturaDet_Update(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_ListarNroCuenta(Hashtable objTablaFiltro, ref DropDownList ddl_combonrocuenta)
        {
            BancosCE objEntidad = null;
            BancosCN objOperacion = null;
            DataTable dta_consulta = null;
            objEntidad = new BancosCE();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);

            objOperacion = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacion.F_Listar_NroCuenta(objEntidad);

            ddl_combonrocuenta.Items.Clear();

            ddl_combonrocuenta.DataSource = dta_consulta;
            ddl_combonrocuenta.DataTextField = "NumeroCuenta";
            ddl_combonrocuenta.DataValueField = "CodCuenta";
            ddl_combonrocuenta.DataBind();
        }

        public void P_Series_Documentos_Consulta(Hashtable objTablaFiltro, ref DropDownList ddl_serieconsulta)
        {
            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodDoc"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

            objOperacion = new TCCorrelativoCN();

            dta_consulta = objOperacion.F_TCCorrelativo_Serie_Select(objEntidad);

            ddl_serieconsulta.Items.Clear();

            ddl_serieconsulta.DataSource = dta_consulta;
            ddl_serieconsulta.DataTextField = "SerieDoc";
            ddl_serieconsulta.DataValueField = "CodSerie";
            ddl_serieconsulta.DataBind();

            ddl_serieconsulta.Items.Insert(0, new ListItem("TODOS", "0"));
        }

        public void P_CAJA_X_EMPRESA(Hashtable objTablaFiltro, ref DropDownList ddl_CajaFisica)
        {
            DataTable dta_consulta = null;

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1, Convert.ToInt32(Session["CodSede"]), Convert.ToInt32(Session["CodEmpresa"]));

            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();
        }

        public String F_Observacion_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Detalle_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalleObservacion");

                NotaIngresoSalidaCabCN objOperacion = new NotaIngresoSalidaCabCN();
                NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();

                objEntidad.Codigo = Codigo;
                grvDetalle.DataSource = objOperacion.F_COMPROBANTEDEEGRESO_OBSERVACION(objEntidad);
                grvDetalle.DataBind();

                str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalle);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_Detalle_html + "~" +
                grvNombre;

            return str_resultado;
        }

        //auditoria

        public String F_Auditoria_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Auditoria_html = "";
            int Col = 0;
            int Codigo = 0;
            int CodTipoDoc = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);
                CodTipoDoc = Convert.ToInt32(obj_parametros["Filtro_CodTipoDoc"]);

                GridView grvAuditoria = (GridView)grvConsulta.Rows[0].FindControl("grvDetalleAuditoria");

                NotaIngresoSalidaCabCN objOperacion = new NotaIngresoSalidaCabCN();
                NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();

                objEntidad.Codigo = Codigo;
                objEntidad.CodTipoDoc = CodTipoDoc;
                grvAuditoria.DataSource = objOperacion.F_AUDITORIA_EGRESO(objEntidad);
                grvAuditoria.DataBind();

                str_grv_Auditoria_html = Mod_Utilitario.F_GetHtmlForControl(grvAuditoria);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_Auditoria_html + "~" +
                grvNombre;

            return str_resultado;
        }


        [WebMethod]
        public static csInicializar F_Inicializar_NET(int codtipotasa)
        {
            csInicializar Inicializar = new csInicializar();
            //lleno la lista de Territorios
            Inicializar.lIGV = F_IGV_Listar(codtipotasa);



            int CodIGV = 0;
            if (Inicializar.lIGV.Count > 0)
                CodIGV = Inicializar.lIGV[0].CodIGV;



            return Inicializar;
        }

        public class csInicializar
        {
            public List<TCTasasCE> lIGV;
        }





        [WebMethod]
        public static List<TCTasasCE> F_IGV_Listar(int codtipotasa) //aqui debe recibir el parametro
        {
            TCTasasCN objOperacion = new TCTasasCN();
            TCTasasCE objEntidadTasa = new TCTasasCE();
            {
                objEntidadTasa.CodTipoTasa = codtipotasa;
            }
            return objOperacion.F_IGV_Listar2(objEntidadTasa);
        }





    }
}