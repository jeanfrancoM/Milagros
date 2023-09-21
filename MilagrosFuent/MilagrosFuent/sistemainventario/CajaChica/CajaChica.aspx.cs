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

using CapaNegocios;
using CapaEntidad;
//using System.Web.Helpers;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
using System.Web.Services;

namespace SistemaInventario.CajaChica
{
    public partial class CajaChica : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_LiquidarCaja_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_Eliminar_NET);
            CallbackManager.Register(F_Abrir_NET);
            CallbackManager.Register(F_USUARIO_X_OPERACION_DIARIA_NET);
            CallbackManager.Register(F_CAJA_X_EMPRESA_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_Grabar_NET);
            CallbackManager.Register(F_BuscarLiquidacion_NET);
            CallbackManager.Register(F_Auditoria_NET);
            CallbackManager.Register(F_Observacion_NET);
            CallbackManager.Register(F_LlenarGridDetalle_NET);
            CallbackManager.Register(F_EliminarLiquidacion_NET);
            CallbackManager.Register(F_DetalleLiquidacion_NET);
            CallbackManager.Register(F_AgregarTemporalLiquidacion_NET);
            CallbackManager.Register(F_LlenarGridDetalleLiquidacion_NET);


            CallbackManager.Register(F_ListarNroCuenta_NET);
        }

        private string _menu = "7000"; private string _opcion = "3";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            Session["datos"] = true;
            P_Inicializar_GrillaVacia_ConsultaFactura();
            P_Inicializar_GrillaVacia_LiquidacionConsultaFactura();
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
                DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
                HiddenField lblCodigo = null;
                HiddenField hfCodEstado = null;

                lblCodigo = (HiddenField)(e.Row.FindControl("lblCodigo"));
                hfCodEstado = (HiddenField)(e.Row.FindControl("hfCodEstado"));

                var Eliminar = (ImageButton)(e.Row.FindControl("imgEliminar"));
                var Abrir = (ImageButton)(e.Row.FindControl("imgAbrir"));
                var Cerrar = (ImageButton)(e.Row.FindControl("imgCerrar"));

                switch (Convert.ToString(hfCodEstado.Value))
                {
                    case "14":
                        Eliminar.Visible = true;
                        Abrir.Visible = false;
                        Cerrar.Visible = true;
                        break;
                    case "8":
                        Eliminar.Visible = false;
                        Abrir.Visible = true;
                        Cerrar.Visible = false;
                        break;
                    case "16":
                        Eliminar.Visible = false;
                        Abrir.Visible = true;
                        Cerrar.Visible = false;
                        break;
                }
            }
        }

        protected void grvLiquidacionConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
                DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
                HiddenField lblCodigo = null;
                HiddenField hfCodEstado = null;
                GridView grvDetalle = null;
                GridView grvDetalleObservacion = null;
                GridView grvDetalleAuditoria = null;
                GridView grvDetalleliquidacion = null;
                HiddenField hfCodTipoDoc = null;
                Label lblNumero = null;
                Label lblEstado = null;

                //lblCodigo = (HiddenField)(e.Row.FindControl("lblCodigo"));
                //hfCodEstado = (HiddenField)(e.Row.FindControl("hfCodEstado"));

                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                grvDetalleObservacion = (GridView)(e.Row.FindControl("grvDetalleObservacion"));
                grvDetalleAuditoria = (GridView)(e.Row.FindControl("grvDetalleAuditoria"));
                grvDetalleliquidacion = (GridView)(e.Row.FindControl("grvDetalleliquidacion"));
                lblCodigo = (HiddenField)(e.Row.FindControl("lblcodigo"));
                lblNumero = (Label)(e.Row.FindControl("lblnumero"));
                hfCodTipoDoc = (HiddenField)(e.Row.FindControl("hfCodTipoDoc"));
                lblEstado = (Label)(e.Row.FindControl("lblEstado"));

                if (lblCodigo.Value != "")
                {
                    //YA NO SE CONSULTA EN LA BASE DE DATOS Y SE LLENA EN BLANCO

                    DataTable dta_consultaarticulo = null;
                    DataRow dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("CodCajaChica", typeof(string));
                    dta_consultaarticulo.Columns.Add("FECHA", typeof(string));
                    dta_consultaarticulo.Columns.Add("CAJA", typeof(string));
                    dta_consultaarticulo.Columns.Add("TOTALSOLES", typeof(string));
                    dta_consultaarticulo.Columns.Add("TOTALDOLARES", typeof(string));

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

                    dta_consultaarticulo = null;
                    dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("FECHA", typeof(string));
                    dta_consultaarticulo.Columns.Add("RazonSocial", typeof(string));
                    dta_consultaarticulo.Columns.Add("Documento", typeof(string));
                    dta_consultaarticulo.Columns.Add("SolesAplicado", typeof(string));
                    dta_consultaarticulo.Columns.Add("DolaresAplicado", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalleliquidacion.DataSource = dta_consultaarticulo;
                    grvDetalleliquidacion.DataBind();
                }

            }
        }

        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlCajaFisica_html = "";
            String str_ddlCajaFisicaConsulta_html = "";
            String str_ddlCajaFisicaLiquidacion_html = "";
            String str_ddlSucursal_html = "";
            String str_ddlEmpresa_html = "";
            String str_ddlEmpresaConsulta_html = "";
            String str_ddlEmpresaLiquidacion_html = "";
            String str_ddlMonedaSoles_html = "";
            String str_ddlBancoSoles_html = "";
            String str_ddlMonedaDolares_html = "";
            String str_ddlBancoDolares_html = "";
            String str_ddl_nrocuentasoles_html = "";
            String str_ddl_nrocuentadolares_html = "";
            String str_ddl_responsable_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Controles_Inicializar(obj_parametros, ref ddlCajaFisica, ref ddlCajaFisicaConsulta, ref ddlSucursal, ref ddlEmpresa, ref ddlEmpresaConsulta,
                    ref ddlMonedaSoles, ref ddlBancoSoles, ref ddlMonedaDolares, ref ddlBancoDolares, ref dllEmpresaLiquidacion, ref ddlCajaFisicaLiquidacion
                    , ref ddl_responsable);

                P_ListarNroCuenta(obj_parametros, ref ddlCuentaSoles, ref ddlCuentaDolares);

                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisica);
                str_ddlCajaFisicaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisicaConsulta);
                str_ddlCajaFisicaLiquidacion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisicaLiquidacion);
                str_ddlSucursal_html = Mod_Utilitario.F_GetHtmlForControl(ddlSucursal);
                str_ddlEmpresa_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresa);
                str_ddlEmpresaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaConsulta);
                str_ddlEmpresaLiquidacion_html = Mod_Utilitario.F_GetHtmlForControl(dllEmpresaLiquidacion);
                str_ddlMonedaSoles_html = Mod_Utilitario.F_GetHtmlForControl(ddlMonedaSoles);
                str_ddlBancoSoles_html = Mod_Utilitario.F_GetHtmlForControl(ddlBancoSoles);
                str_ddlMonedaDolares_html = Mod_Utilitario.F_GetHtmlForControl(ddlMonedaDolares);
                str_ddlBancoDolares_html = Mod_Utilitario.F_GetHtmlForControl(ddlBancoDolares);

                str_ddl_nrocuentasoles_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaSoles);
                str_ddl_nrocuentadolares_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaDolares);
                str_ddl_responsable_html = Mod_Utilitario.F_GetHtmlForControl(ddl_responsable);
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
                str_ddlCajaFisica_html + "~" + //2
                Session["CodCajaFisica"].ToString()  + "~" + //3
                Session["CodUsuario"].ToString() + "~" + //4
                str_ddlCajaFisicaConsulta_html + "~" + //5
                str_ddlSucursal_html + "~" +  //6
                Session["CodSede"].ToString() + "~" + //7
                str_ddlEmpresa_html + "~" + //8
                str_ddlEmpresaConsulta_html + "~" + //9  
                Session["CodEmpresa"].ToString() + "~" +//10; 
                 str_ddlMonedaSoles_html + "~" +//11; 
                 str_ddlBancoSoles_html + "~" +//12; 
                 str_ddlMonedaDolares_html + "~" +//13; 
                 str_ddlBancoDolares_html + "~" +//14; 
              str_ddl_nrocuentasoles_html + "~" +//15; 
               str_ddl_nrocuentadolares_html + "~" +//16; 
               str_ddlEmpresaLiquidacion_html + "~" +//17;
               str_ddlCajaFisicaLiquidacion_html + "~" +//18;
               str_ddl_responsable_html; //19;
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

        public String F_LiquidarCaja_NET(String arg)
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
                P_LiquidarCaja(obj_parametros, ref MsgError, ref Codigo);

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
                    P_Inicializar_GrillaVacia_ConsultaFactura();
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

        public String F_Eliminar_NET(String arg)
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
                P_Eliminar(obj_parametros, ref MsgError);

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

        public String F_Abrir_NET(String arg)
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
                P_Abrir(obj_parametros, ref MsgError);

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

        public String F_USUARIO_X_OPERACION_DIARIA_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddlUsuario_html = "0";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_USUARIO_X_OPERACION_DIARIA(obj_parametros, ref ddlUsuario);
                str_ddlUsuario_html = Mod_Utilitario.F_GetHtmlForControl(ddlUsuario);
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
                str_ddlUsuario_html;  //2

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

        public void P_Inicializar_GrillaVacia_ConsultaFactura()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("CodCajaChica", typeof(string));
            dta_consulta.Columns.Add("Concepto", typeof(string));
            dta_consulta.Columns.Add("Descripcion", typeof(string));
            dta_consulta.Columns.Add("Sede", typeof(string));
            dta_consulta.Columns.Add("Empresa", typeof(string));
            dta_consulta.Columns.Add("Fecha", typeof(string));
            dta_consulta.Columns.Add("Usuario", typeof(string));
            dta_consulta.Columns.Add("CodUsuario", typeof(string));
            dta_consulta.Columns.Add("CodCajaFisica", typeof(string));
            dta_consulta.Columns.Add("CodEstado", typeof(string));
            dta_consulta.Columns.Add("Estado", typeof(string));
            dta_consulta.Columns.Add("UsuarioLiquidacion", typeof(string));
            dta_consulta.Columns.Add("FechaLiquidacion", typeof(string));
            dta_consulta.Columns.Add("FechaSaldo", typeof(string));
            dta_consulta.Columns.Add("Caja", typeof(string));
            dta_consulta.Columns.Add("CodAlmacen", typeof(string));

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

            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaCaja"]);
            objEntidad.FechaSaldo = Convert.ToDateTime(objTablaFiltro["Filtro_FechaSaldo"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

            if (Convert.ToInt32(objTablaFiltro["Filtro_P_CIERRE_CAJA_X_USUARIO"]) == 1)
                objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            else
                objEntidad.CodUsuario = Convert.ToInt32(objTablaFiltro["Filtro_CodUsuario"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_CajaChica_Regenerar(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_LiquidarCaja(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaChica"]);
            int CodUsuarioCaja = Convert.ToInt32(objTablaFiltro["Filtro_CodUsuario"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new DocumentoVentaCabCN();
            objOperacion.F_CajaChica_Liquidacion(objEntidad);
            MsgError = objEntidad.MsgError;
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;
            DataTable dta_consulta = null;
            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacen"]);
            objEntidad.CodUsuario = 0;
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

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

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_CAJACHICA_LISTAR(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_CajaFisica, ref DropDownList ddl_CajaFisicaConsulta,
                    ref DropDownList combosucursal, ref DropDownList ddl_comboempresa, ref DropDownList ddl_comboempresaconsulta,
            ref DropDownList ddl_combomonedaSoles, ref DropDownList ddl_combobancoSoles, ref DropDownList ddl_combomonedaDolares, ref DropDownList ddl_combobancoDolares
            , ref DropDownList ddl_comboempresaLiquidacion, ref DropDownList ddl_CajaFisicaLiquidacion, ref DropDownList ddl_responsable)
        {
            DataTable dta_consulta = null;
            TCAlmacenCE objEntidadAlmacen = null;
            TCAlmacenCN objOperacionAlmacen = null;

            objOperacionAlmacen = new TCAlmacenCN();

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1, Convert.ToInt32(Session["CodSede"]), Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]));
            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();

            ddl_CajaFisicaConsulta.Items.Clear();
            ddl_CajaFisicaConsulta.DataSource = dta_consulta;
            ddl_CajaFisicaConsulta.DataTextField = "Descripcion";
            ddl_CajaFisicaConsulta.DataValueField = "CodCajaFisica";
            ddl_CajaFisicaConsulta.DataBind();
            ddl_CajaFisicaConsulta.Items.Insert(0, new ListItem("TODOS", "0"));

            ddl_CajaFisicaLiquidacion.Items.Clear();
            ddl_CajaFisicaLiquidacion.DataSource = dta_consulta;
            ddl_CajaFisicaLiquidacion.DataTextField = "Descripcion";
            ddl_CajaFisicaLiquidacion.DataValueField = "CodCajaFisica";
            ddl_CajaFisicaLiquidacion.DataBind();
            ddl_CajaFisicaLiquidacion.Items.Insert(0, new ListItem("TODOS", "0"));

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);
            objEntidad.CodigoPagina = Convert.ToInt32(objTablaFiltro["Filtro_CodigoPagina"]);

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_UsuariosPermisos_ADMINISTRADOR(objEntidad);

            combosucursal.Items.Clear();

            dta_consulta = null;

            objEntidadAlmacen = new TCAlmacenCE();

            objEntidadAlmacen.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidadAlmacen.CodAlmacen = 0;

            dta_consulta = objOperacionAlmacen.F_TCAlmacen_Listar(objEntidadAlmacen);

            combosucursal.DataSource = dta_consulta;
            combosucursal.DataTextField = "DscAlmacen";
            combosucursal.DataValueField = "CodAlmacen";
            combosucursal.DataBind();

            ListItem iTodos = new ListItem("--TODOS--", "0");
            combosucursal.Items.Add(iTodos);

            TCDocumentosCN objOperacionDocumento = new TCDocumentosCN();

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

            ddl_comboempresaLiquidacion.Items.Clear();

            ddl_comboempresaLiquidacion.DataSource = dta_consulta;
            ddl_comboempresaLiquidacion.DataTextField = "T_NombreComercial";
            ddl_comboempresaLiquidacion.DataValueField = "CodEmpresa";
            ddl_comboempresaLiquidacion.DataBind();
            ddl_comboempresaconsulta.Items.Insert(0, new ListItem("TODOS", "0"));
            //MONEDA
            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();

            objEntidadConceptosDet.CodConcepto = 4;

            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();
            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomonedaSoles.Items.Clear();

            ddl_combomonedaSoles.DataSource = dta_consulta;
            ddl_combomonedaSoles.DataTextField = "DscAbvConcepto";
            ddl_combomonedaSoles.DataValueField = "CodConcepto";
            ddl_combomonedaSoles.DataBind();


            ddl_combomonedaDolares.Items.Clear();

            ddl_combomonedaDolares.DataSource = dta_consulta;
            ddl_combomonedaDolares.DataTextField = "DscAbvConcepto";
            ddl_combomonedaDolares.DataValueField = "CodConcepto";
            ddl_combomonedaDolares.DataBind();
            //BANCOS
            BancosCN objOperacionBancos = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacionBancos.F_Listar_Bancos();

            ddl_combobancoSoles.Items.Clear();

            ddl_combobancoSoles.DataSource = dta_consulta;
            ddl_combobancoSoles.DataTextField = "DscBanco";
            ddl_combobancoSoles.DataValueField = "CodBanco";
            ddl_combobancoSoles.DataBind();

            ddl_combobancoDolares.Items.Clear();

            ddl_combobancoDolares.DataSource = dta_consulta;
            ddl_combobancoDolares.DataTextField = "DscBanco";
            ddl_combobancoDolares.DataValueField = "CodBanco";
            ddl_combobancoDolares.DataBind();


            //VENDEDORES
            EmpleadoCE objEmpleado = new EmpleadoCE();

            objEmpleado.CodCargo = Convert.ToInt32(objTablaFiltro["Filtro_CodCargo"]);
            objEmpleado.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            dta_consulta = (new EmpleadoCN()).F_Empleado_Listar_Liquidacion(objEmpleado);
            ddl_responsable.Items.Clear();

            ddl_responsable.DataSource = dta_consulta;
            ddl_responsable.DataTextField = "NombreCompleto";
            ddl_responsable.DataValueField = "CodEmpleado";
            ddl_responsable.DataBind();
        }

        public void P_Eliminar(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCajaChica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaChica"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_CAJACHICA_ELIMINAR(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_Abrir(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCajaChica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaChica"]);
            int CodUsuarioCaja = Convert.ToInt32(objTablaFiltro["Filtro_CodUsuario"]);
            objOperacion = new DocumentoVentaCabCN();

            objOperacion = new DocumentoVentaCabCN();
            objOperacion.F_CAJACHICA_ABRIR(objEntidad);
            MsgError = objEntidad.MsgError;
        }

        public void P_USUARIO_X_OPERACION_DIARIA(Hashtable objTablaFiltro, ref DropDownList ddl_Usuario)
        {
            DataTable dta_consulta = null;

            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_USUARIO_X_OPERACION_DIARIA(objEntidad);

            ddl_Usuario.Items.Clear();
            ddl_Usuario.DataSource = dta_consulta;
            ddl_Usuario.DataTextField = "Usuario";
            ddl_Usuario.DataValueField = "CodUsuario";
            ddl_Usuario.DataBind();
            ddl_Usuario.Items.Insert(0, new ListItem("TODOS", "0"));
        }

        public void P_CAJA_X_EMPRESA(Hashtable objTablaFiltro, ref DropDownList ddl_CajaFisica)
        {
            DataTable dta_consulta = null;

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1, Convert.ToInt32(Session["CodSede"]), Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]));

            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();
        }

        public String F_ListarNroCuenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_ddl_nrocuentaSoles_html = "";
            String str_ddl_nrocuentaDolares_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ListarNroCuenta(obj_parametros, ref ddlCuentaSoles, ref ddlCuentaDolares);
                str_ddl_nrocuentaSoles_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaSoles);
                str_ddl_nrocuentaDolares_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaDolares);
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
                str_ddl_nrocuentaSoles_html
                + "~" +
                str_ddl_nrocuentaDolares_html;

            return str_resultado;

        }

        public void P_ListarNroCuenta(Hashtable objTablaFiltro,
          ref DropDownList ddl_combonrocuentaSoles, ref DropDownList ddl_combonrocuentaDolares)
        {
            BancosCE objEntidad = null;
            BancosCN objOperacion = null;
            DataTable dta_consulta = null;
            objEntidad = new BancosCE();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMonedaSoles"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBancoSoles"]);

            objOperacion = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacion.F_Listar_NroCuenta(objEntidad);

            ddl_combonrocuentaSoles.Items.Clear();

            ddl_combonrocuentaSoles.DataSource = dta_consulta;
            ddl_combonrocuentaSoles.DataTextField = "NumeroCuenta";
            ddl_combonrocuentaSoles.DataValueField = "CodCuenta";
            ddl_combonrocuentaSoles.DataBind();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMonedaDolares"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBancoDolares"]);

            objOperacion = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacion.F_Listar_NroCuenta(objEntidad);

            ddl_combonrocuentaDolares.Items.Clear();

            ddl_combonrocuentaDolares.DataSource = dta_consulta;
            ddl_combonrocuentaDolares.DataTextField = "NumeroCuenta";
            ddl_combonrocuentaDolares.DataValueField = "CodCuenta";
            ddl_combonrocuentaDolares.DataBind();
        }

        public String F_AgregarTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvLiquidacion_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;
            int Codigodetalle = 0;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, Codigo, ref grvLiquidacion, ref MsgError, ref Codigodetalle);

                str_grvLiquidacion_html = Mod_Utilitario.F_GetHtmlForControl(grvLiquidacion);

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
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvLiquidacion_html
                 + "~" +
                Math.Round(Total, 2).ToString()
                + "~" +
                Codigodetalle.ToString();

            return str_resultado;

        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, Int32 Codigo, ref GridView GrillaLiquidacion, ref String MsgError, ref Int32 Codigodetalle)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;
            DataTable dta_consulta = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion = new DocumentoVentaCabCN();


            if (Codigo == 0)
            {
                dta_consulta = objOperacion.F_CAJACHICA_LISTAR_LIQUIDACION(objEntidad);
                Codigodetalle = objEntidad.Codigodetalle;
            }
            else if (Codigo != 0)
            {
                objEntidad.Codigo = Codigo;
                dta_consulta = objOperacion.PA_CAJACHICA_LISTAR_LIQUIDACION_Detallado(objEntidad);
            }
            GrillaLiquidacion.DataSource = dta_consulta;
            GrillaLiquidacion.DataBind();

            MsgError = objEntidad.MsgError;
        }

        public String F_Grabar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";

            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_GrabarLiquidacion(obj_parametros, ref MsgError);

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
                Codigo.ToString();



            return str_resultado;

        }

        public void P_GrabarLiquidacion(Hashtable objTablaFiltro, ref String MsgError)
        {
            CajaFisicaCE objEntidad = null;
            CajaFisicaCN objOperacion = null;

            objEntidad = new CajaFisicaCE();
            String XmlDetalle = "";

            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodAlmacen = Convert.ToInt32((Session["CodSede"]));
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodEmpleado = Convert.ToInt32(objTablaFiltro["Filtro_Responsable"]);
            objEntidad.CodCuentaSoles = Convert.ToInt32(objTablaFiltro["Filtro_CodCuentaSoles"]);
            objEntidad.NroSoles = Convert.ToString(objTablaFiltro["Filtro_NroSoles"]);
            objEntidad.TotalSoles = Convert.ToDecimal(objTablaFiltro["Filtro_TotalSoles"]);
            objEntidad.CodCuentaDolares = Convert.ToInt32(objTablaFiltro["Filtro_CodCuentaDolares"]);
            objEntidad.NroDolares = Convert.ToString(objTablaFiltro["Filtro_NroDolares"]);
            objEntidad.TotalDolares = Convert.ToDecimal(objTablaFiltro["Filtro_TotalDolares"]);
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]);
            objEntidad.FechaLiquidacion = Convert.ToDateTime(objTablaFiltro["Filtro_FechaLiquidacion"]);

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " Codigo = '" + item.Codigo + "'";
                XmlDetalle = XmlDetalle + " Fecha = '" + item.Fecha + "'";
                XmlDetalle = XmlDetalle + " AplicarSoles = '" + item.AplicarSoles + "'";
                XmlDetalle = XmlDetalle + " AplicarDolares = '" + item.AplicarDolares + "'";
                XmlDetalle = XmlDetalle + " CodDetalle = '" + item.CodDetalle + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;
            objOperacion = new CajaFisicaCN();

            objOperacion.F_Liquidacion_Insert(objEntidad);

            MsgError = objEntidad.MsgError;

        }

        public void P_Inicializar_GrillaVacia_LiquidacionConsultaFactura()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("Fecha", typeof(string));
            dta_consulta.Columns.Add("SOLES", typeof(string));
            dta_consulta.Columns.Add("DOLARES", typeof(string));
            dta_consulta.Columns.Add("CUENTASOLES", typeof(string));
            dta_consulta.Columns.Add("CUENTADOLARES", typeof(string));
            dta_consulta.Columns.Add("NROSOLES", typeof(string));
            dta_consulta.Columns.Add("NRODOLARES", typeof(string));
            dta_consulta.Columns.Add("RESPONSABLE", typeof(string));
            dta_consulta.Columns.Add("CAJA", typeof(string));
            dta_consulta.Columns.Add("CodLiquidacionCajaCab", typeof(string));
            dta_consulta.Columns.Add("USUARIO", typeof(string));
            //dta_consulta.Columns.Add("Estado", typeof(string));
            //dta_consulta.Columns.Add("UsuarioLiquidacion", typeof(string));
            //dta_consulta.Columns.Add("FechaLiquidacion", typeof(string));
            //dta_consulta.Columns.Add("Caja", typeof(string));
            //dta_consulta.Columns.Add("CodAlmacen", typeof(string));

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

            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvLiquidacionConsulta.DataSource = dta_consulta;
            grvLiquidacionConsulta.DataBind();
        }

        public String F_BuscarLiquidacion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvLiquidacionConsulta_html = "";

            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_BuscarLiquidacion(obj_parametros, ref grvLiquidacionConsulta);

                if (grvLiquidacionConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_LiquidacionConsultaFactura();
                    str_mensaje_operacion = "No se encontro registros.";
                }
                else
                    str_mensaje_operacion = "";


                str_grvLiquidacionConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvLiquidacionConsulta);
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
                str_grvLiquidacionConsulta_html;



            return str_resultado;

        }

        public void P_BuscarLiquidacion(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;
            DataTable dta_consulta = null;
            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32((Session["CodSede"]));
            objEntidad.CodUsuario = 0;
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

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

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_Liquidacion_LISTAR(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
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
            int CodTipoDoc = 0;

            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                //Necesarios para que busque el sistema
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);
                CodTipoDoc = Convert.ToInt32(obj_parametros["Filtro_CodTipoDoc"]);

                //Obtengo el Grid para llenarlo y dibujarlo
                GridView grvDetallar = (GridView)grvLiquidacionConsulta.Rows[0].FindControl("grvDetalle");

                //Consulta
                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                //consulta a la base de datos y se llena grid
                objEntidad.codigo = Codigo; objEntidad.CodTipoDoc = CodTipoDoc;
                grvDetallar.DataSource = objOperacion.F_CAJACHICADet_Listar(objEntidad);
                grvDetallar.DataBind();

                //se crea el html a partir del grid llenado
                str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvDetallar);

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

        public String F_LlenarGridDetalleLiquidacion_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Detalle_html = "";
            int Col = 0;
            int Codigo = 0;
            int CodTipoDoc = 0;

            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                //Necesarios para que busque el sistema
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);
                CodTipoDoc = Convert.ToInt32(obj_parametros["Filtro_CodTipoDoc"]);

                //Obtengo el Grid para llenarlo y dibujarlo
                GridView grvDetallar = (GridView)grvLiquidacionConsulta.Rows[0].FindControl("grvDetalleliquidacion");

                //Consulta
                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                //consulta a la base de datos y se llena grid
                objEntidad.codigo = Codigo; objEntidad.CodTipoDoc = CodTipoDoc;
                grvDetallar.DataSource = objOperacion.F_CAJACHICADet_Listar_liquidacion(objEntidad);
                grvDetallar.DataBind();

                //se crea el html a partir del grid llenado
                str_grv_Detalle_html = Mod_Utilitario.F_GetHtmlForControl(grvDetallar);

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

        public String F_Auditoria_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_Auditoria_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvAuditoria = (GridView)grvLiquidacionConsulta.Rows[0].FindControl("grvDetalleAuditoria");

                DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
                DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();

                objEntidad.Codigo = Codigo;
                grvAuditoria.DataSource = objOperacion.F_AUDITORIA_lIQUIDACION(objEntidad);
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

                GridView grvDetalle = (GridView)grvLiquidacionConsulta.Rows[0].FindControl("grvDetalleObservacion");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();

                objEntidad.Codigo = Codigo;
                grvDetalle.DataSource = objOperacion.F_LIQUIDACION_OBSERVACION(objEntidad);
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

        public String F_EliminarLiquidacion_NET(String arg)
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
                P_EliminarLiquidacion(obj_parametros, ref MsgError);

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

        public void P_EliminarLiquidacion(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.Codliquidacion = Convert.ToInt32(objTablaFiltro["Filtro_CodLiqui"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_LIQUIDACION_ELIMINAR(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public String F_DetalleLiquidacion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            Int32 int_resultado_operacion = 0;
            int Codigo = 0;
            String str_grvConsulta_Detalleliquidacion_html = "";
            String str_grvConsulta_Precios_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_LGLiquidacion_Detallado(obj_parametros, ref Codigo, ref grvDetalleLiquidacion);
                int_resultado_operacion = 1;
                str_mensaje_operacion = "";

                str_grvConsulta_Detalleliquidacion_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleLiquidacion);
            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grvConsulta_Detalleliquidacion_html + "~" +
                Codigo.ToString();

            return str_resultado;

        }

        public void F_LGLiquidacion_Detallado(Hashtable objTablaFiltro, ref Int32 Codigo, ref GridView gridCosto)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dtTabla = null;
            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCajaChica = Convert.ToInt32(objTablaFiltro["Filtro_CodcajaChica"]);
            objEntidad.CodDetalle = Convert.ToInt32(objTablaFiltro["Filtro_CodDetalle"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            //grid de Liquidacion Detalle
            objOperacion = new DocumentoVentaCabCN();
            dtTabla = objOperacion.F_LGLiquidacion_Detallado(objEntidad);
            Codigo = objEntidad.Codigo;

            gridCosto.DataSource = dtTabla;
            gridCosto.DataBind();


        }

        public String F_AgregarTemporalLiquidacion_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvLiquidacion_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;
            int Codigodetalle = 0;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AplicarDetallado(obj_parametros, ref Codigo);
                P_AgregarTemporal(obj_parametros, Codigo, ref grvLiquidacion, ref MsgError, ref Codigodetalle);

                str_grvLiquidacion_html = Mod_Utilitario.F_GetHtmlForControl(grvLiquidacion);

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
                MsgError
                + "~" +
                Codigo.ToString()
                + "~" +
                str_grvLiquidacion_html
                 + "~" +
                Math.Round(Total, 2).ToString();

            return str_resultado;

        }

        public void P_AplicarDetallado(Hashtable objTablaFiltro, ref Int32 Codigo)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            String XmlDetalle = "";

            objEntidad = new DocumentoVentaCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlLiquidacion"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                XmlDetalle = XmlDetalle + " Soles = '" + item.Soles + "'";
                XmlDetalle = XmlDetalle + " Dolares = '" + item.Dolares + "'";
                XmlDetalle = XmlDetalle + " CodigoDetalleCaja = '" + item.CodigoDetalleCaja + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));


            //grid de Liquidacion Detalle
            objOperacion = new DocumentoVentaCabCN();
            objOperacion.F_AplicarDetallado(objEntidad);
            Codigo = objEntidad.Codigo;




        }


    }
}