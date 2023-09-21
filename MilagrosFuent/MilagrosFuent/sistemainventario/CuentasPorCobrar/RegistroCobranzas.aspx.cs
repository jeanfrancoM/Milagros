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
using System.Web.Services;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
using System.Drawing;

namespace SistemaInventario.CuentasPorCobrar
{
    public partial class RegistroCobranzas : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_Factura_NET);
            CallbackManager.Register(F_Buscar_Letra_NET);
            CallbackManager.Register(F_AgregarTemporal_NET);
            CallbackManager.Register(F_EliminarTemporal_Factura_NET);
            CallbackManager.Register(F_GrabarDocumento_NET);
            CallbackManager.Register(F_Nuevo_NET);
            CallbackManager.Register(F_Buscar_NET);
            CallbackManager.Register(F_AnularRegistro_Net);
            CallbackManager.Register(F_CargarGrillaVaciaConsultaArticulo_NET);
            CallbackManager.Register(F_AgregarLetraTemporal_NET);
            CallbackManager.Register(F_ListarNroCuenta_NET);
            CallbackManager.Register(F_TipoCambio_NET);
            CallbackManager.Register(F_Buscar_FacturaPagos_NET);
            CallbackManager.Register(F_AgregarTemporalCobranzas_NET);
            CallbackManager.Register(F_EliminarTemporal_FacturaCobranza_NET);
            CallbackManager.Register(F_Buscar_NotaVenta_NET);
            CallbackManager.Register(F_ActualizarTC_Net);
            CallbackManager.Register(F_EdicionMedioPago_Net);
            CallbackManager.Register(F_EditarMedioPago_Net);
            CallbackManager.Register(F_LlenarGridDetalle_NET);            
            CallbackManager.Register(F_CAJA_X_EMPRESA_NET);
            CallbackManager.Register(F_LlenarGridDetalle_Detallado_NET);
            CallbackManager.Register(F_Buscar_Detallado_NET);
            CallbackManager.Register(F_LlenarGridDetalleVenta_NET);
            CallbackManager.Register(F_Buscar_Eliminados_NET);
            CallbackManager.Register(F_LlenarGridEliminar_NET);
            CallbackManager.Register(F_Auditoria_NET);
            CallbackManager.Register(F_Observacion_NET);
            CallbackManager.Register(F_Observacion_Eliminados_NET);
            CallbackManager.Register(F_Auditoria_Eliminados_NET);
            CallbackManager.Register(F_ObservacionesEliminados_NET);
        }

        private string _menu = "5000"; private string _opcion = "1";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];            
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            P_Inicializar_GrillaVacia_FacturaCobranzas();
            P_Inicializar_GrillaVacia_FacturaPagos();
            P_Inicializar_GrillaVacia_Consulta();
            P_LlenarGrillaVacia_ConsultaFactura();
            P_LlenarGrillaVacia_Detallado();
            P_LlenarGrillaVacia_Eliminado();
            Session["datos"] = true;
        }

        protected void grvFacturaCobranzas_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                HiddenField hfSaldo = (HiddenField)(e.Row.FindControl("hfSaldo"));
                HiddenField hfTotal = (HiddenField)(e.Row.FindControl("hfTotalFactura"));
                HiddenField hfAcuenta = (HiddenField)(e.Row.FindControl("hfAcuenta"));
                HiddenField hfCodMoneda = (HiddenField)(e.Row.FindControl("hfCodMoneda"));
                HiddenField hfVencimiento = (HiddenField)(e.Row.FindControl("hfVencimiento"));
                Label lblFactura = (Label)(e.Row.FindControl("lblFactura"));
                Label lblTC = (Label)(e.Row.FindControl("lblTC"));
                Label lblEmision = (Label)(e.Row.FindControl("lblEmision"));
                Label lblVencimiento = (Label)(e.Row.FindControl("lblVencimiento"));
                Label lblTotal = (Label)(e.Row.FindControl("lblTotal"));
                Label lblSaldo = (Label)(e.Row.FindControl("lblSaldo"));
                Label lblAcuenta = (Label)(e.Row.FindControl("lblAcuenta"));
                Label lblSaldoNuevo = (Label)(e.Row.FindControl("lblSaldoNuevo"));

                if (hfSaldo.Value != "")
                {
                    lblTotal.Text = "S/ " + Convert.ToDecimal(hfTotal.Value).ToString();
                    lblSaldo.Text = "S/ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                    lblAcuenta.Text = "S/ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    if (Convert.ToInt32(hfCodMoneda.Value) == 2)
                    {
                        lblTotal.Text = "$ " + Convert.ToDecimal(hfTotal.Value).ToString();
                        lblSaldo.Text = "$ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                        lblAcuenta.Text = "$ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    }

                    Color ColorDeuda = Color.Black;

                    if (Convert.ToInt32( Convert.ToDateTime(hfVencimiento.Value).ToString("yyyyMMdd")) < Convert.ToInt32( DateTime.Now.ToString("yyyyMMdd")))
                        ColorDeuda = Color.Red;

                    if (Convert.ToDecimal(hfSaldo.Value) == 0)
                        ColorDeuda = Color.Blue;

                    lblFactura.ForeColor = ColorDeuda;
                    lblTotal.ForeColor = ColorDeuda;
                    lblTC.ForeColor = ColorDeuda;
                    lblEmision.ForeColor = ColorDeuda;
                    lblVencimiento.ForeColor = ColorDeuda;
                    lblSaldo.ForeColor = ColorDeuda;
                    lblAcuenta.ForeColor = ColorDeuda;
                    lblSaldoNuevo.ForeColor = ColorDeuda;
                }
            }
        }

        protected void grvFacturaPagos_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                HiddenField hfSaldo = (HiddenField)(e.Row.FindControl("hfSaldo"));
                HiddenField hfTotal = (HiddenField)(e.Row.FindControl("hfTotalFactura"));
                HiddenField hfAcuenta = (HiddenField)(e.Row.FindControl("hfAcuenta"));
                HiddenField hfCodMoneda = (HiddenField)(e.Row.FindControl("hfCodMoneda"));
                HiddenField hfVencimiento = (HiddenField)(e.Row.FindControl("hfVencimiento"));
                Label lblFactura = (Label)(e.Row.FindControl("lblFactura"));
                Label lblTC = (Label)(e.Row.FindControl("lblTC"));
                Label lblEmision = (Label)(e.Row.FindControl("lblEmision"));
                Label lblVencimiento = (Label)(e.Row.FindControl("lblVencimiento"));
                Label lblTotal = (Label)(e.Row.FindControl("lblTotal"));
                Label lblSaldo = (Label)(e.Row.FindControl("lblSaldo"));
                Label lblAcuenta = (Label)(e.Row.FindControl("lblAcuenta"));
                Label lblSaldoNuevo = (Label)(e.Row.FindControl("lblSaldoNuevo"));

                if (hfSaldo.Value != "")
                {
                    lblTotal.Text = "S/ " + Convert.ToDecimal(hfTotal.Value).ToString();
                    lblSaldo.Text = "S/ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                    lblAcuenta.Text = "S/ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    if (Convert.ToInt32(hfCodMoneda.Value) == 2)
                    {
                        lblTotal.Text = "$ " + Convert.ToDecimal(hfTotal.Value).ToString();
                        lblSaldo.Text = "$ " + Convert.ToDecimal(hfSaldo.Value).ToString();
                        lblAcuenta.Text = "$ " + Convert.ToDecimal(hfAcuenta.Value).ToString();
                    }

                    Color ColorDeuda = Color.Black;

                    if (Convert.ToDateTime(hfVencimiento.Value) > DateTime.Now)
                        ColorDeuda = Color.Red;

                    if (Convert.ToDecimal(hfSaldo.Value) == 0)
                        ColorDeuda = Color.Blue;

                    lblFactura.ForeColor = ColorDeuda;
                    lblTotal.ForeColor = ColorDeuda;
                    lblTC.ForeColor = ColorDeuda;
                    lblEmision.ForeColor = ColorDeuda;
                    lblVencimiento.ForeColor = ColorDeuda;
                    lblSaldo.ForeColor = ColorDeuda;
                    lblAcuenta.ForeColor = ColorDeuda;
                    lblSaldoNuevo.ForeColor = ColorDeuda;
                }
            }
        }

        protected void grvConsulta_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GridView grvDetalle = null;               
                GridView grvDetalladoCobranzas = null;
                GridView grvDetalleAuditoria = null;
                GridView grvDetalleObservacion = null;
                HiddenField lblCodigo = null;
                grvDetalle = (GridView)(e.Row.FindControl("grvDetalle"));
                grvDetalladoCobranzas = (GridView)(e.Row.FindControl("grvDetalladoCobranzas"));
                grvDetalleObservacion = (GridView)(e.Row.FindControl("grvDetalleObservacion"));                
                grvDetalleAuditoria = (GridView)(e.Row.FindControl("grvDetalleAuditoria"));
                lblCodigo = (HiddenField)(e.Row.FindControl("hfCodigo"));
                if (lblCodigo.Value.ToString() != "")
                {
                    DataTable dta_consultaarticulo = null;
                    DataRow dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("ID", typeof(string));
                    dta_consultaarticulo.Columns.Add("DOCUMENTO", typeof(string));
                    dta_consultaarticulo.Columns.Add("NUMERO", typeof(string));
                    dta_consultaarticulo.Columns.Add("MONTO", typeof(string));
                    dta_consultaarticulo.Columns.Add("OPERACION", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalle.DataSource = dta_consultaarticulo;
                    grvDetalle.DataBind();

                    dta_consultaarticulo = null;
                    dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    dta_consultaarticulo.Columns.Add("Observaciones", typeof(string));

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

        protected void grvDetallado_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GridView grvDetalladoCobranzas = null;
                GridView grvDetalle = null;
                HiddenField lblCodigo = null;
                Label lblEstado = null;
                grvDetalladoCobranzas = (GridView)(e.Row.FindControl("grvDetalladoCobranzas"));
                grvDetalle = (GridView)(e.Row.FindControl("grvDetalleFactura"));
                lblCodigo = (HiddenField)(e.Row.FindControl("hfCodDocumentoVenta"));
                lblEstado = (Label)(e.Row.FindControl("lblEstado"));

                switch (lblEstado.Text)
                {
                    case "PENDIENTE":
                        lblEstado.ForeColor = System.Drawing.Color.Red;
                        break;
                    case "CANCELADO":
                        lblEstado.ForeColor = System.Drawing.Color.Green;
                        break;
                }

                if (lblCodigo.Value.ToString() != "")
                {
                    DataTable dta_consultaarticulo = null;
                    DataRow dtr_consultafila = null;
                    dta_consultaarticulo = new DataTable();

                    DataTable dta_consultaventas = null;
                    DataRow dtr_consultafilaventas = null;
                    dta_consultaventas = new DataTable();

                    dta_consultaarticulo.Columns.Add("NroOperacion", typeof(string));
                    dta_consultaarticulo.Columns.Add("MedioPago", typeof(string));
                    dta_consultaarticulo.Columns.Add("FechaCobranza", typeof(string));
                    dta_consultaarticulo.Columns.Add("Acuenta", typeof(string));
                    dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
                    dta_consultaarticulo.Columns.Add("Usuario", typeof(string));
                    dta_consultaarticulo.Columns.Add("FechaRegistro", typeof(string));
                    dta_consultaarticulo.Columns.Add("Caja", typeof(string));
                    dta_consultaarticulo.Columns.Add("BANCO", typeof(string));
                    dta_consultaarticulo.Columns.Add("CUENTA", typeof(string));
                    dta_consultaarticulo.Columns.Add("TipoOperacion", typeof(string));

                    dtr_consultafila = dta_consultaarticulo.NewRow();

                    dtr_consultafila[0] = "";
                    dta_consultaarticulo.Rows.Add(dtr_consultafila);

                    grvDetalladoCobranzas.DataSource = dta_consultaarticulo;
                    grvDetalladoCobranzas.DataBind();

                    dta_consultaventas.Columns.Add("ID", typeof(string));
                    dta_consultaventas.Columns.Add("Codigo", typeof(string));
                    dta_consultaventas.Columns.Add("Descripcion", typeof(string));
                    dta_consultaventas.Columns.Add("Cantidad", typeof(string));
                    dta_consultaventas.Columns.Add("UM", typeof(string));
                    dta_consultaventas.Columns.Add("Precio", typeof(string));
                    dta_consultaventas.Columns.Add("Descuento", typeof(string));
                    dta_consultaventas.Columns.Add("Marca", typeof(string));
                    dta_consultaventas.Columns.Add("Importe", typeof(string));
                    dta_consultaventas.Columns.Add("OV", typeof(string));
                    dta_consultaventas.Columns.Add("Costo", typeof(string));
                    dta_consultaventas.Columns.Add("Anexo2", typeof(string));

                    dtr_consultafilaventas = dta_consultaventas.NewRow();

                    dtr_consultafilaventas[0] = "";
                    dta_consultaventas.Rows.Add(dtr_consultafilaventas);

                    grvDetalle.DataSource = dta_consultaventas;
                    grvDetalle.DataBind();
                }
            }
        }

        protected void grvEliminado_RowDataBound(Object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GridView grvDetalleEliminado = null;
                GridView grvDetalleObservacionEliminado = null;
                GridView grvDetalleAuditoria = null;
                GridView grvObservacionesEliminados = null;
                
                HiddenField lblCodigo = null;
                grvDetalleEliminado = (GridView)(e.Row.FindControl("grvDetalleEliminado"));
                grvDetalleObservacionEliminado = (GridView)(e.Row.FindControl("grvDetalleObservacionE"));
                grvDetalleAuditoria = (GridView)(e.Row.FindControl("grvDetalleAuditoria"));
                grvObservacionesEliminados = (GridView)(e.Row.FindControl("grvObservacionesEliminados"));
                lblCodigo = (HiddenField)(e.Row.FindControl("hfCodigo2"));
                if (lblCodigo.Value.ToString() != "")
                {
                    DataTable dta_consultaarticuloEliminado = null;
                    DataRow dtr_consultafilaEliminada = null;
                    dta_consultaarticuloEliminado = new DataTable();

                    dta_consultaarticuloEliminado.Columns.Add("ID", typeof(string));
                    dta_consultaarticuloEliminado.Columns.Add("DOCUMENTO", typeof(string));
                    dta_consultaarticuloEliminado.Columns.Add("NUMERODOC", typeof(string));
                    dta_consultaarticuloEliminado.Columns.Add("MONTO", typeof(string));
                    dta_consultaarticuloEliminado.Columns.Add("OPERACION", typeof(string));

                    dtr_consultafilaEliminada = dta_consultaarticuloEliminado.NewRow();

                    dtr_consultafilaEliminada[0] = "";
                    dta_consultaarticuloEliminado.Rows.Add(dtr_consultafilaEliminada);

                    grvDetalleEliminado.DataSource = dta_consultaarticuloEliminado;
                    grvDetalleEliminado.DataBind();

                    dta_consultaarticuloEliminado = null;
                    dtr_consultafilaEliminada = null;
                    dta_consultaarticuloEliminado = new DataTable();

                    dta_consultaarticuloEliminado.Columns.Add("Observaciones", typeof(string));

                    dtr_consultafilaEliminada = dta_consultaarticuloEliminado.NewRow();

                    dtr_consultafilaEliminada[0] = "";
                    dta_consultaarticuloEliminado.Rows.Add(dtr_consultafilaEliminada);

                    grvDetalleObservacionEliminado.DataSource = dta_consultaarticuloEliminado;
                    grvDetalleObservacionEliminado.DataBind();

                    dta_consultaarticuloEliminado = null;
                    dtr_consultafilaEliminada = null;
                    dta_consultaarticuloEliminado = new DataTable();

                    dta_consultaarticuloEliminado.Columns.Add("Auditoria", typeof(string));

                    dtr_consultafilaEliminada = dta_consultaarticuloEliminado.NewRow();

                    dtr_consultafilaEliminada[0] = "";
                    dta_consultaarticuloEliminado.Rows.Add(dtr_consultafilaEliminada);

                    grvDetalleAuditoria.DataSource = dta_consultaarticuloEliminado;
                    grvDetalleAuditoria.DataBind();
                    
                    dta_consultaarticuloEliminado = null;
                    dtr_consultafilaEliminada = null;
                    dta_consultaarticuloEliminado = new DataTable();

                    dta_consultaarticuloEliminado.Columns.Add("Observaciones", typeof(string));

                    dtr_consultafilaEliminada = dta_consultaarticuloEliminado.NewRow();

                    dtr_consultafilaEliminada[0] = "";
                    dta_consultaarticuloEliminado.Rows.Add(dtr_consultafilaEliminada);

                    grvObservacionesEliminados.DataSource = dta_consultaarticuloEliminado;
                    grvObservacionesEliminados.DataBind();
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
                //Necesarios para que busque el sistema
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();
                //Obtengo el Grid para llenarlo y dibujarlo
                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalle");

                objEntidad.CodCobranzaCab = Convert.ToInt32(Codigo);
                grvDetalle.DataSource = objOperacion.F_CobranzasDet_Listar(objEntidad);
                grvDetalle.DataBind();

                //se crea el html a partir del grid llenado
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

        public String F_LlenarGridDetalle_Detallado_NET(String arg)
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
                //Necesarios para que busque el sistema
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();
                //Obtengo el Grid para llenarlo y dibujarlo
                GridView grvDetalle = (GridView)grvDetallado.Rows[0].FindControl("grvDetalladoCobranzas");

                objEntidad.CodDocumentoVenta = Convert.ToInt32(Codigo);
                grvDetalle.DataSource = objOperacion.F_DOCUMENTOVENTACAB_LISTAR_COBRANZAS_DETALLADO(objEntidad);
                grvDetalle.DataBind();

                //se crea el html a partir del grid llenado
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

        public String F_LlenarGridDetalleVenta_NET(String arg)
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
                GridView grvDetalle = (GridView)grvDetallado.Rows[0].FindControl("grvDetalleFactura");

                //Consulta
                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                //consulta a la base de datos y se llena grid
                objEntidad.CodDocumentoVenta = Codigo; objEntidad.CodTipoDoc = CodTipoDoc;
                grvDetalle.DataSource = objOperacion.F_DocumentoVentaDet_Listar(objEntidad);
                grvDetalle.DataBind();

                //se crea el html a partir del grid llenado
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
            String str_ddl_monedaFiltro_html = "";
            String str_ddl_mediopago_html = "";
            String str_ddl_mediopago2_html = "";
            String str_ddl_banco_html = "";
            String str_ddl_bancoEdicion_html = "";
            String str_ddl_nrocuenta_html = "";
            String str_ddl_nrocuentaEdicion_html = "";
            String str_ddl_serieconsulta_html = "";
            String str_ddlCajaFisica_html = "";
            String str_ddlCajaFisicaConsulta_html = "";
            String str_ddlAlmacenDetallado2_html = "";
            String str_ddlCobrador_html = "";
            String str_ddl_Vendedor_html = "";
            decimal TC = 0;
            int int_resultado_operacion = 0;
            String str_ddlMedioPagoConsulta_html = "";
            String str_ddlMedioPagoConsulta2_html = "";
            Hashtable obj_parametros = null;
            String str_ddlEmpresa_html = "";
            String str_ddlEmpresaConsulta_html = "";
            String str_ddlEmpresaConsulta2_html = "";
            String str_ddlEmpresaConsulta3_html = "";
            String str_ddlEmpresaDetallado_html = "";
            String str_ddlTipoDocDetallado_html = "";
            String str_ddlAlmacenDetallado_html = "";
            String str_ddlRuta_html = "";
            String str_ddltipodoc_html = "";
            String str_ddltipodoc2_html = "";
            String P_CodMoneda_Inicial = "1";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlMoneda, ref ddlMedioPago, ref ddlBanco, ref ddlBancoEdicion, ref ddlFiltroMoneda,
                    ref ddlCajaFisica, ref ddlMedioPagoConsulta, ref ddlCajaFisicaConsulta, ref ddlEmpresa, ref ddlEmpresaConsulta,
                    ref ddlEmpresaConsulta2, ref ddlEmpresaDetallado, ref ddlTipoDocDetallado, ref ddlAlmacenDetallado, ref ddltipodoc, ref ddltipodoc2,
                    ref ddlEmpresaConsulta3, ref ddlMedioPagoConsulta2, ref ddlAlmacenDetallado2, ref ddlCobrador, ref ddlVendedor, ref ddlRuta);
                P_Obtener_TipoCambio(obj_parametros, ref TC);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta, ref ddlCuentaEdicion);

                str_ddl_mediopago_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPago);
                str_ddl_moneda_html = Mod_Utilitario.F_GetHtmlForControl(ddlMoneda);
                str_ddl_monedaFiltro_html = Mod_Utilitario.F_GetHtmlForControl(ddlFiltroMoneda);
                str_ddl_banco_html = Mod_Utilitario.F_GetHtmlForControl(ddlBanco);
                str_ddl_bancoEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlBancoEdicion);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
                str_ddl_nrocuentaEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaEdicion);
                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisica);
                str_ddlMedioPagoConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPagoConsulta);
                str_ddlCajaFisicaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisicaConsulta);
                str_ddlEmpresa_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresa);
                str_ddlEmpresaConsulta_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaConsulta);
                str_ddlEmpresaConsulta2_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaConsulta2);
                str_ddlEmpresaDetallado_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaDetallado);
                str_ddlTipoDocDetallado_html = Mod_Utilitario.F_GetHtmlForControl(ddlTipoDocDetallado);
                str_ddlAlmacenDetallado_html = Mod_Utilitario.F_GetHtmlForControl(ddlAlmacenDetallado);
                str_ddltipodoc_html = Mod_Utilitario.F_GetHtmlForControl(ddltipodoc);
                str_ddltipodoc2_html = Mod_Utilitario.F_GetHtmlForControl(ddltipodoc2);
                str_ddlEmpresaConsulta3_html = Mod_Utilitario.F_GetHtmlForControl(ddlEmpresaConsulta3);
                str_ddlMedioPagoConsulta2_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPagoConsulta2);
                str_ddlAlmacenDetallado2_html = Mod_Utilitario.F_GetHtmlForControl(ddlAlmacenDetallado2);
                str_ddlCobrador_html = Mod_Utilitario.F_GetHtmlForControl(ddlCobrador);
                str_ddl_Vendedor_html = Mod_Utilitario.F_GetHtmlForControl(ddlVendedor);
                str_ddlRuta_html = Mod_Utilitario.F_GetHtmlForControl(ddlRuta);
                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" + //0
                str_mensaje_operacion + "~" + //1
                str_ddl_moneda_html + "~" + //2
                TC.ToString() + "~" + //3
                str_ddl_mediopago_html + "~" + //4
                str_ddl_banco_html + "~" + //5
                str_ddl_nrocuenta_html + "~" + //6
                str_ddl_serieconsulta_html + "~" + //7
                str_ddl_bancoEdicion_html + "~" + //8
                str_ddl_nrocuentaEdicion_html + "~" + //9
                str_ddl_monedaFiltro_html + "~" + //10
                str_ddlCajaFisica_html + "~" + //11
                str_ddlMedioPagoConsulta_html + "~" + //12
                str_ddlCajaFisicaConsulta_html + "~" + //13
                P_CodMoneda_Inicial + "~" + //14
                str_ddlEmpresa_html + "~" + //15
                str_ddlEmpresaConsulta_html + "~" + //16
                str_ddlEmpresaConsulta2_html + "~" +//17
                Session["CodEmpresa"].ToString() + "~" +//18
                Session["CodCajaFisica"].ToString() + "~" + //19
                str_ddlEmpresaDetallado_html + "~" + //20
                str_ddlTipoDocDetallado_html + "~" + //21
                str_ddlAlmacenDetallado_html + "~" +  //22
            str_ddltipodoc_html + "~" +//23
            str_ddltipodoc2_html + "~" +//24
            str_ddlEmpresaConsulta3_html + "~" + //25
            str_ddlMedioPagoConsulta2_html + "~" +//26
            str_ddlAlmacenDetallado2_html + "~" + //27
            str_ddlCobrador_html + "~" + //28
            str_ddl_Vendedor_html + "~" + //29
            str_ddlRuta_html+ "~" + //30
            Session["Empresa"].ToString(); //31
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
            String str_grvDetalleFacturaCobranzas_html = "";
            String str_grvDetalleFacturaPagos_html = "";
            int int_resultado_operacion = 0;
            int CodigoTemporalCobranzas = 0;
            int CodigoTemporalPagos = 0;
            Decimal TotalCobranzas = 0;
            Decimal TotalPagos = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref CodigoTemporalCobranzas, ref CodigoTemporalPagos, ref MsgError);
                P_CargarGrillaTemporal_Factura(obj_parametros, CodigoTemporalCobranzas, "C", ref grvFacturaCobranzas, ref TotalCobranzas);
                P_CargarGrillaTemporal_Factura(obj_parametros, CodigoTemporalPagos, "P", ref grvFacturaPagos, ref TotalPagos);

                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();

                if (grvFacturaPagos.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaPagos();

                str_grvDetalleFacturaCobranzas_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                str_grvDetalleFacturaPagos_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaPagos);

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
                CodigoTemporalCobranzas.ToString()
                + "~" +
                CodigoTemporalPagos.ToString()
                + "~" +
                str_grvDetalleFacturaCobranzas_html
                + "~" +
                str_grvDetalleFacturaPagos_html
                + "~" +
                Math.Round(TotalCobranzas, 2).ToString()
                + "~" +
                Math.Round(TotalPagos, 2).ToString();

            return str_resultado;
        }

        public String F_EliminarTemporal_Factura_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int CodigoTemporalCobranzas = 0;
            int CodigoTemporalPagos = 0;
            Decimal TotalCobranzas = 0;
            Decimal TotalPagos = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal_Factura(obj_parametros, ref MsgError);
                CodigoTemporalCobranzas = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);

                P_CargarGrillaTemporal_Factura(obj_parametros, CodigoTemporalCobranzas, "C", ref grvFacturaCobranzas, ref TotalCobranzas);
                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);

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
                CodigoTemporalCobranzas.ToString()
                + "~" +
                str_grvFactura_html
                 + "~" +
               Math.Round(TotalCobranzas, 2).ToString();

            return str_resultado;
        }

        public String F_GrabarDocumento_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_numerofactura = "";
            String str_grvFactura_html = "";
            String str_grvFacturaCobranzas_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            int CodigoTemporalCobranzas = 0;
            int CodigoTemporalPagos = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarTemporal(obj_parametros, ref CodigoTemporalCobranzas, ref CodigoTemporalPagos, ref MsgError);
                P_GrabarDocumento(obj_parametros, ref MsgError);
                P_Inicializar_GrillaVacia_FacturaCobranzas();
                P_Inicializar_GrillaVacia_FacturaCobranzas();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                str_grvFacturaCobranzas_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
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
                str_grvFactura_html
                 + "~" +
                str_grvFacturaCobranzas_html;

            return str_resultado;
        }

        public String F_Buscar_NotaVenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla_NotaVenta(obj_parametros, ref grvConsultaFactura);
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

        public String F_Nuevo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFacturaCobranzas_html = "";
            String str_grvFacturaPagos_html = "";
            String str_grvLetra_html = "";
            int int_resultado_operacion = 0;


            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Inicializar_GrillaVacia_FacturaCobranzas();
                P_Inicializar_GrillaVacia_FacturaPagos();

                str_grvFacturaCobranzas_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                str_grvFacturaPagos_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaPagos);
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
                str_grvFacturaCobranzas_html
                + "~" +
                str_grvFacturaPagos_html;


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
                    P_Inicializar_GrillaVacia_Consulta();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

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
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_Consulta();

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

        public String F_CargarGrillaVaciaConsultaArticulo_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsuArticulo_html = "";
            int int_resultado_operacion = 0;

            try
            {

                P_LlenarGrillaVacia_ConsultaFactura();
                str_grvConsuArticulo_html = Mod_Utilitario.F_GetHtmlForControl(grvConsultaFactura);
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
                str_grvConsuArticulo_html;


            return str_resultado;

        }

        public String F_AgregarLetraTemporal_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvLetra_html = "";
            Decimal Total = 0;
            int int_resultado_operacion = 0;
            int Codigo = 0;

            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_AgregarLetraTemporal(obj_parametros, ref MsgError, ref Codigo);



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
                str_grvLetra_html
                + "~" +
                Total.ToString();


            return str_resultado;

        }

        public String F_ListarNroCuenta_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String str_ddl_nrocuenta_html = "";
            String str_ddl_nrocuentaEdicion_html = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta, ref ddlCuentaEdicion);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuenta);
                str_ddl_nrocuentaEdicion_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaEdicion);
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
                str_ddl_nrocuenta_html
                + "~" +
                str_ddl_nrocuentaEdicion_html;

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

        public String F_Buscar_FacturaPagos_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_CargarFacturaPagos_Grilla(obj_parametros, ref grvConsultaFactura);
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

        public String F_AgregarTemporalCobranzas_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvDetalleFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                //P_AgregarTemporal(obj_parametros, ref Codigo, ref MsgError);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFacturaCobranzas, ref Total);
                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();

                str_grvDetalleFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);

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
                Math.Round(Total, 2).ToString();

            return str_resultado;
        }

        public String F_EliminarTemporal_FacturaCobranza_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_EliminarTemporal_Factura(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);
                //P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFacturaCobranzas, ref Total);
                if (grvFacturaCobranzas.Rows.Count == 0)
                    P_Inicializar_GrillaVacia_FacturaCobranzas();
                str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);

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
               Math.Round(Total, 2).ToString();

            return str_resultado;

        }

        public String F_ActualizarTC_Net(String arg)
        {
            String str_resultado = "";
            String str_grvFactura_html = "";
            int int_resultado_operacion = 0;
            int Codigo = 0;
            Decimal Total = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_ActualizarTC(obj_parametros, ref MsgError);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_CodigoTemporal"]);

                //if (Convert.ToInt32(obj_parametros["Filtro_Operacion"]) == 0)
                //{
                //    P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFactura, ref Total);
                //    str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFactura);
                //}
                //else
                //{
                //    P_CargarGrillaTemporal_Factura(obj_parametros, Codigo, ref grvFacturaCobranzas, ref Total);
                //    str_grvFactura_html = Mod_Utilitario.F_GetHtmlForControl(grvFacturaCobranzas);
                //}

                int_resultado_operacion = 1;
            }
            catch (Exception ex)
            {
                MsgError = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                MsgError
                + "~" +
                str_grvFactura_html
                + "~" +
                Math.Round(Total, 2).ToString();

            return str_resultado;
        }

        public String F_Buscar_Letra_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsultaFactura_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Cargar_Grilla_Letra(obj_parametros, ref grvConsultaFactura);
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

        public String F_EdicionMedioPago_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            String str_ddlCajaFisica_html = "";
            String str_ddl_mediopago_html = "";
            String str_ddl_banco_html = "";
            String str_ddl_nrocuenta_html = "";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_EdicionMedioPago(obj_parametros, ref MsgError, ref ddlMedioPagoEdicion, ref ddlBancoEdicion, ref ddlCajaFisicaEdicion);
                P_ListarNroCuenta(obj_parametros, ref ddlCuenta, ref ddlCuentaEdicion);

                str_ddl_mediopago_html = Mod_Utilitario.F_GetHtmlForControl(ddlMedioPagoEdicion);
                str_ddl_banco_html = Mod_Utilitario.F_GetHtmlForControl(ddlBancoEdicion);
                str_ddl_nrocuenta_html = Mod_Utilitario.F_GetHtmlForControl(ddlCuentaEdicion);
                str_ddlCajaFisica_html = Mod_Utilitario.F_GetHtmlForControl(ddlCajaFisicaEdicion);

                int_resultado_operacion = 1;
                str_mensaje_operacion = MsgError;
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_ddlCajaFisica_html + "~" + //2
                str_ddl_mediopago_html + "~" + //3
                str_ddl_banco_html + "~" + //4
                str_ddl_nrocuenta_html; //5

            return str_resultado;
        }
        
        public String F_EditarMedioPago_Net(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            int int_resultado_operacion = 0;
            String MsgError = "";
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                F_EditarMedioPago(obj_parametros, ref MsgError);
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
                str_mensaje_operacion;

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

                GridView grvDetalle = (GridView)grvConsulta.Rows[0].FindControl("grvDetalleObservacion");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                objEntidad.CodCobranzaCab = Codigo;
                grvDetalle.DataSource = objOperacion.F_COBRANZASCAB_OBSERVACION(objEntidad);
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

        //observacion eliminacion

        public String F_Observacion_Eliminados_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_DetalleObservacionE_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvDetalleObservacionE = (GridView)grvEliminado.Rows[0].FindControl("grvDetalleObservacionE");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                objEntidad.CodCobranzaCab = Codigo;
                grvDetalleObservacionE.DataSource = objOperacion.F_COBRANZASCAB_ELIMINADOS_OBSERVACION(objEntidad);
                grvDetalleObservacionE.DataBind();

                str_grv_DetalleObservacionE_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleObservacionE);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_DetalleObservacionE_html + "~" +
                grvNombre;

            return str_resultado;
        }

        public String F_ObservacionesEliminados_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grv_DetalleObservacionE_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvDetalleObservacionE = (GridView)grvEliminado.Rows[0].FindControl("grvObservacionesEliminados");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                objEntidad.CodCobranzaCab = Codigo;
                grvDetalleObservacionE.DataSource = objOperacion.F_COBRANZASCAB_Eliminadas_OBSERVACIONes(objEntidad);
                grvDetalleObservacionE.DataBind();

                str_grv_DetalleObservacionE_html = Mod_Utilitario.F_GetHtmlForControl(grvDetalleObservacionE);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grv_DetalleObservacionE_html + "~" +
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
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                GridView grvAuditoria = (GridView)grvConsulta.Rows[0].FindControl("grvDetalleAuditoria");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                objEntidad.CodCobranzaCab = Codigo;
                grvAuditoria.DataSource = objOperacion.F_COBRANZASCAB_AUDITORIA(objEntidad);
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

        //auditoria ELIMINADOS

        public String F_Auditoria_Eliminados_NET(String arg)
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

                GridView grvAuditoria = (GridView)grvEliminado.Rows[0].FindControl("grvDetalleAuditoria");

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();

                objEntidad.CodCobranzaCab = Codigo;
                grvAuditoria.DataSource = objOperacion.F_CobranzasCab_ELIMINADOS_AUDITORIA(objEntidad);
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

        public String F_Buscar_Detallado_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar_Detallado(obj_parametros, ref grvDetallado);
                if (grvDetallado.Rows.Count == 0)
                {
                    P_LlenarGrillaVacia_Detallado();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvDetallado);
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

        public String F_Buscar_Eliminados_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvEliminado_html = "";
            int int_resultado_operacion = 0;

            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar_Eliminados(obj_parametros, ref grvEliminado);
                if (grvEliminado.Rows.Count == 0)
                {
                    P_LlenarGrillaVacia_Eliminado();
                    str_mensaje_operacion = "No se encontraron registros.";
                }
                else
                {
                    str_mensaje_operacion = "";
                }

                str_grvEliminado_html = Mod_Utilitario.F_GetHtmlForControl(grvEliminado);
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
                str_grvEliminado_html;


            return str_resultado;

        }
        
        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList ddl_combomoneda, ref DropDownList ddl_combomediopago,
                ref DropDownList ddl_combobanco, ref DropDownList ddl_combobanco_Edicion,ref DropDownList ddl_combomonedaFiltro,
                ref DropDownList ddl_CajaFisica, ref DropDownList ddl_combomediopagoconsulta, ref DropDownList ddl_CajaFisicaConsulta,
                ref DropDownList ddl_comboempresa, ref DropDownList ddl_comboempresaconsulta, ref DropDownList ddl_comboempresaconsulta2,
            ref DropDownList ddl_comboempresadetallado, ref DropDownList ddl_TipoDocDetallado, ref DropDownList ddl_comboAlmacenDetallado, ref DropDownList ddl_tipodoc,
            ref DropDownList ddl_tipodoc2, ref DropDownList ddl_comboempresaconsulta3, ref DropDownList ddl_combomediopago2, ref DropDownList ddl_CajaFisicaConsulta2, ref DropDownList ddl_cobrador, ref DropDownList ddl_Vendedor, ref DropDownList ddl_Ruta)
        {
            DataTable dta_consulta = null;
            TCCorrelativoCE objEntidad = null;
            TCCorrelativoCN objOperacion = null;

            int iCodEmpresa = 3;

            objEntidad = new TCCorrelativoCE();

            objEntidad.CodTipoDoc = 1;
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodEmpresa = iCodEmpresa;

            objOperacion = new TCCorrelativoCN();

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
            
            ddl_combomonedaFiltro.Items.Clear();

            ddl_combomonedaFiltro.DataSource = dta_consulta;
            ddl_combomonedaFiltro.DataTextField = "DscAbvConcepto";
            ddl_combomonedaFiltro.DataValueField = "CodConcepto";
            ddl_combomonedaFiltro.DataBind();
            ddl_combomonedaFiltro.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            dta_consulta = null;

            objEntidadConceptosDet.CodConcepto = 23;

            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomediopago.Items.Clear();

            ddl_combomediopago.DataSource = dta_consulta;
            ddl_combomediopago.DataTextField = "DscAbvConcepto";
            ddl_combomediopago.DataValueField = "CodConcepto";
            ddl_combomediopago.DataBind();

            ddl_combomediopagoconsulta.Items.Clear();

            ddl_combomediopagoconsulta.DataSource = dta_consulta;
            ddl_combomediopagoconsulta.DataTextField = "DscAbvConcepto";
            ddl_combomediopagoconsulta.DataValueField = "CodConcepto";
            ddl_combomediopagoconsulta.DataBind();
            ddl_combomediopagoconsulta.Items.Insert(0, new ListItem("TODOS", "0"));

            ddl_combomediopago2.Items.Clear();

            ddl_combomediopago2.DataSource = dta_consulta;
            ddl_combomediopago2.DataTextField = "DscAbvConcepto";
            ddl_combomediopago2.DataValueField = "CodConcepto";
            ddl_combomediopago2.DataBind();
            ddl_combomediopago2.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            BancosCN objOperacionBancos = new BancosCN();

            dta_consulta = null;

            dta_consulta = objOperacionBancos.F_Listar_Bancos();

            ddl_combobanco.Items.Clear();

            ddl_combobanco.DataSource = dta_consulta;
            ddl_combobanco.DataTextField = "DscBanco";
            ddl_combobanco.DataValueField = "CodBanco";
            ddl_combobanco.DataBind();

            ddl_combobanco_Edicion.Items.Clear();

            ddl_combobanco_Edicion.DataSource = dta_consulta;
            ddl_combobanco_Edicion.DataTextField = "DscBanco";
            ddl_combobanco_Edicion.DataValueField = "CodBanco";
            ddl_combobanco_Edicion.DataBind();

            dta_consulta = null;

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1, 0, Convert.ToInt32(Session["CodEmpresa"]));
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

            ddl_CajaFisicaConsulta2.Items.Clear();
            ddl_CajaFisicaConsulta2.DataSource = dta_consulta;
            ddl_CajaFisicaConsulta2.DataTextField = "Descripcion";
            ddl_CajaFisicaConsulta2.DataValueField = "CodCajaFisica";
            ddl_CajaFisicaConsulta2.DataBind();
            ddl_CajaFisicaConsulta2.Items.Insert(0, new ListItem("TODOS", "0"));

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

            ddl_comboempresaconsulta2.Items.Clear();
                                    
            ddl_comboempresaconsulta2.DataSource = dta_consulta;
            ddl_comboempresaconsulta2.DataTextField = "T_NombreComercial";
            ddl_comboempresaconsulta2.DataValueField = "CodEmpresa";
            ddl_comboempresaconsulta2.DataBind();
            ddl_comboempresaconsulta2.Items.Insert(0, new ListItem("TODOS", "0"));

            ddl_comboempresadetallado.Items.Clear();
            
            ddl_comboempresadetallado.DataSource = dta_consulta;
            ddl_comboempresadetallado.DataTextField = "T_NombreComercial";
            ddl_comboempresadetallado.DataValueField = "CodEmpresa";
            ddl_comboempresadetallado.DataBind();
            ddl_comboempresadetallado.Items.Insert(0, new ListItem("TODOS", "0"));

            ddl_comboempresaconsulta3.Items.Clear();

            ddl_comboempresaconsulta3.DataSource = dta_consulta;
            ddl_comboempresaconsulta3.DataTextField = "T_NombreComercial";
            ddl_comboempresaconsulta3.DataValueField = "CodEmpresa";
            ddl_comboempresaconsulta3.DataBind();
            ddl_comboempresaconsulta3.Items.Insert(0, new ListItem("TODOS", "0"));

            dta_consulta = null;
           

            dta_consulta = objOperacionDocumento.F_TCDocumentos_ListarVentas_FacturaBoleta();

            ddl_TipoDocDetallado.Items.Clear();
            
            ddl_TipoDocDetallado.DataSource = dta_consulta;
            ddl_TipoDocDetallado.DataTextField = "Descripcion";
            ddl_TipoDocDetallado.DataValueField = "CodTipoDoc";
            ddl_TipoDocDetallado.DataBind();
            ddl_TipoDocDetallado.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            dta_consulta = null;

            TCAlmacenCN objOperacionAlmacen = new TCAlmacenCN();
            TCAlmacenCE objEntidadAlmacen = new TCAlmacenCE();
              
            objEntidadAlmacen.CodEstado = 1;

            //almacen local
            dta_consulta = null;
            dta_consulta = (new TCAlmacenCN()).F_TCALMACEN_LISTAR_TODOS(objEntidadAlmacen);
            ddl_comboAlmacenDetallado.Items.Clear();
            ddl_comboAlmacenDetallado.DataSource = dta_consulta;
            ddl_comboAlmacenDetallado.DataTextField = "DscAlmacen";
            ddl_comboAlmacenDetallado.DataValueField = "CodAlmacen";
            ddl_comboAlmacenDetallado.DataBind();
            ddl_comboAlmacenDetallado.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            //documentocobranzapago
            dta_consulta = null;
            dta_consulta = objOperacionDocumento.F_TCDOCUMENTOS_COBRANZAS_PAGOS();

            ddl_tipodoc.Items.Clear();

            ddl_tipodoc.DataSource = dta_consulta;
            ddl_tipodoc.DataTextField = "Descripcion";
            ddl_tipodoc.DataValueField = "CodTipoDoc";
            ddl_tipodoc.DataBind();
            ddl_tipodoc.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            ddl_tipodoc2.Items.Clear();

            ddl_tipodoc2.DataSource = dta_consulta;
            ddl_tipodoc2.DataTextField = "Descripcion";
            ddl_tipodoc2.DataValueField = "CodTipoDoc";
            ddl_tipodoc2.DataBind();
            ddl_tipodoc2.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            //cobrador
            EmpleadoCE objEmpleado = new EmpleadoCE();

            objEmpleado.CodCargo = Convert.ToInt32(objTablaFiltro["Filtro_CodCargo"]);
            objEmpleado.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
            dta_consulta = (new EmpleadoCN()).F_Empleado_Listar(objEmpleado);
            ddl_cobrador.Items.Clear();

            ddl_cobrador.DataSource = dta_consulta;
            ddl_cobrador.DataTextField = "NombreCompleto";
            ddl_cobrador.DataValueField = "CodEmpleado";
            ddl_cobrador.DataBind();

            ddl_Vendedor.Items.Clear();

            ddl_Vendedor.DataSource = dta_consulta;
            ddl_Vendedor.DataTextField = "NombreCompleto";
            ddl_Vendedor.DataValueField = "CodEmpleado";
            ddl_Vendedor.DataBind();
            ddl_Vendedor.Items.Add(new ListItem() { Value = "0", Text = "TODOS" });

            dta_consulta = null;
            dta_consulta = objOperacionConceptosDet.F_RUTA_LISTAR_COMBO();

            ddl_Ruta.Items.Clear();

            ddl_Ruta.DataSource = dta_consulta;
            ddl_Ruta.DataTextField = "Ruta";
            ddl_Ruta.DataValueField = "CodTerritorio";
            ddl_Ruta.DataBind();


            ddl_Ruta.Items.Insert(0, new ListItem() { Text = "--TODOS--", Value = "0" });
        }

        public void P_Obtener_TipoCambio(Hashtable objTablaFiltro, ref Decimal TipoCambio)
        {
            TCTipoCambioCE objEntidad = null;
            TCTipoCambioCN objOperacion = null;

            DataTable dta_consulta = null;
            
            objEntidad = new TCTipoCambioCE();

            objEntidad.Fecha = Convert.ToDateTime(objTablaFiltro["Filtro_Fecha"]);

            objOperacion = new TCTipoCambioCN();

            dta_consulta = objOperacion.F_TCTipoCambio_Select(objEntidad);

            if (dta_consulta.Rows.Count > 0)
                TipoCambio = Convert.ToDecimal(dta_consulta.Rows[0]["TC_Paralelo"]);
        }

        public void P_Inicializar_GrillaVacia_FacturaCobranzas()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodFacturaDet", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Vencimiento", typeof(string));
            dta_consultaarticulo.Columns.Add("TotalFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Saldo", typeof(string));
            dta_consultaarticulo.Columns.Add("SaldoNuevo", typeof(string));
            dta_consultaarticulo.Columns.Add("Acuenta", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("CodTipoDoc", typeof(string));
            dta_consultaarticulo.Columns.Add("Empresa", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvFacturaCobranzas.DataSource = dta_consultaarticulo;
            grvFacturaCobranzas.DataBind();
        }

        public void P_Inicializar_GrillaVacia_Consulta()
        {
            DataTable dta_consulta = null;
            DataRow dtr_consultafila = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("ID", typeof(string));
            dta_consulta.Columns.Add("NroOperacion", typeof(string));
            dta_consulta.Columns.Add("Medio", typeof(string));
            dta_consulta.Columns.Add("Proveedor", typeof(string));
            dta_consulta.Columns.Add("Emision", typeof(string));
            dta_consulta.Columns.Add("TC", typeof(string));
            dta_consulta.Columns.Add("Moneda", typeof(string));
            dta_consulta.Columns.Add("Banco", typeof(string));
            dta_consulta.Columns.Add("Cuenta", typeof(string));
            dta_consulta.Columns.Add("Cobranza", typeof(string));
            dta_consulta.Columns.Add("Operacion", typeof(string));
            dta_consulta.Columns.Add("Deuda", typeof(string));
            dta_consulta.Columns.Add("CodMedioPago", typeof(string));
            dta_consulta.Columns.Add("CodBanco", typeof(string));
            dta_consulta.Columns.Add("CodCtaBancaria", typeof(string));
            dta_consulta.Columns.Add("ObservacionMedioPago", typeof(string));
            dta_consulta.Columns.Add("Comision", typeof(string));
            dta_consulta.Columns.Add("NombreUsuario", typeof(string));
            dta_consulta.Columns.Add("Caja", typeof(string));
            dta_consulta.Columns.Add("Vuelto", typeof(string));
            dta_consulta.Columns.Add("CodMoneda", typeof(string));
            dta_consulta.Columns.Add("CodCajaFisica", typeof(string));
            dta_consulta.Columns.Add("Empresa", typeof(string));
            dta_consulta.Columns.Add("CodEmpresa", typeof(string));
            dta_consulta.Columns.Add("NroRecibo", typeof(string));

            dtr_consultafila = dta_consulta.NewRow();

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
            dtr_consultafila[11] = "";
            dtr_consultafila[12] = "";
            dtr_consultafila[13] = "";
            dtr_consultafila[14] = "";

            dta_consulta.Rows.Add(dtr_consultafila);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }

        public void P_Inicializar_GrillaVacia_FacturaPagos()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("CodFacturaDet", typeof(string));
            dta_consultaarticulo.Columns.Add("CodigoFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Vencimiento", typeof(string));
            dta_consultaarticulo.Columns.Add("TotalFactura", typeof(string));
            dta_consultaarticulo.Columns.Add("Saldo", typeof(string));
            dta_consultaarticulo.Columns.Add("SaldoNuevo", typeof(string));
            dta_consultaarticulo.Columns.Add("Acuenta", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("CodTipoDoc", typeof(string));
            dta_consultaarticulo.Columns.Add("Empresa", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvFacturaPagos.DataSource = dta_consultaarticulo;
            grvFacturaPagos.DataBind();
        }

        public void P_Cargar_Grilla(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

            objOperacion = new DocumentoVentaCabCN();

            grvConsulta.DataSource = objOperacion.F_DocumentoVentaCab_ConsultaCobranzas(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_AgregarTemporal(Hashtable objTablaFiltro, ref Int32 Codigo, ref Int32 CodigoPagos, ref String MsgError)
        {
            FiltroCobranzas objEntidad = new FiltroCobranzas();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

            if (Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]) == 0)
            {
                objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
                objEntidad.FlagFiltroFecha = Convert.ToInt32(objTablaFiltro["Filtro_FlagFiltroFecha"]);
                objEntidad.FechaDesde = Convert.ToDateTime(objTablaFiltro["Filtro_FechaDesde"]);
                objEntidad.FechaHasta = Convert.ToDateTime(objTablaFiltro["Filtro_FechaHasta"]);
                objEntidad.FlagFiltroMonto = Convert.ToInt32(objTablaFiltro["Filtro_FlagFiltroMonto"]);
                objEntidad.MontoDesde = Convert.ToDecimal(objTablaFiltro["Filtro_MontoDesde"]);
                objEntidad.MontoHasta = Convert.ToDecimal(objTablaFiltro["Filtro_MontoHasta"]);
                objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
                objEntidad.CodEstado = Convert.ToInt32(objTablaFiltro["Filtro_CodEstado"]);
                objEntidad.CodigoTemporal = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objEntidad.CodigoTemporalPago = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]);
                objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);
                objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
                objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
                objEntidad.FlagOC = Convert.ToInt32(objTablaFiltro["Filtro_FlagOC"]);

                objOperacion.F_TemporalCodigoCobranzasCab_Insert(objEntidad);
                Codigo = objEntidad.CodigoTemporal;
                CodigoPagos = objEntidad.CodigoTemporalPago;
            }
            else
            {

                //Primero proceso COBRANZAS
                String XmlDetalle = "";
                objEntidad = new FiltroCobranzas();

                dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalleCobranzas"].ToString());

                foreach (dynamic item in jArr2)
                {
                    XmlDetalle = XmlDetalle + "<D ";
                    XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                    XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                    XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                    XmlDetalle = XmlDetalle + " Soles = '" + item.Soles + "'";
                    XmlDetalle = XmlDetalle + " Dolares = '" + item.Dolares + "'";
                    XmlDetalle = XmlDetalle + " TC = '" + item.TC + "'";
                    XmlDetalle = XmlDetalle + " CodMoneda = '" + item.CodMoneda + "'";
                    XmlDetalle = XmlDetalle + " />";
                }

                XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

                objEntidad.XmlDetalle = XmlDetalle;
                objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);
                
                XmlDetalle = "";
                objEntidad = new FiltroCobranzas();

                jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetallePagos"].ToString());

                foreach (dynamic item in jArr2)
                {
                    XmlDetalle = XmlDetalle + "<D ";
                    XmlDetalle = XmlDetalle + " CodigoFactura = '" + item.CodigoFactura + "'";
                    XmlDetalle = XmlDetalle + " Factura = '" + item.Factura + "'";
                    XmlDetalle = XmlDetalle + " Emision = '" + item.Emision + "'";
                    XmlDetalle = XmlDetalle + " Soles = '" + item.Soles + "'";
                    XmlDetalle = XmlDetalle + " Dolares = '" + item.Dolares + "'";
                    XmlDetalle = XmlDetalle + " TC = '" + item.TC + "'";
                    XmlDetalle = XmlDetalle + " CodMoneda = '" + item.CodMoneda + "'";
                    XmlDetalle = XmlDetalle + " />";
                }

                XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";
                objEntidad.XmlDetalle = XmlDetalle;

                objEntidad.CodDocumentoVenta = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]);
                objOperacion.F_TemporalCodigoFacturaDet_Insert(objEntidad);
                CodigoPagos = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
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

        public void P_CargarGrillaTemporal_Factura(Hashtable objTablaFiltro, Int32 Codigo, String Tipo, ref GridView grvDetalle, ref Decimal TotalFactura)
        {
            FiltroCobranzas objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new FiltroCobranzas();
            objOperacion = new DocumentoVentaCabCN();

            DataTable dta_consulta = null;
            if (Codigo != 0)
            {
                objEntidad.CodigoTemporal = Codigo;
                objEntidad.Tipo = Tipo;
                dta_consulta = objOperacion.F_TemporalCodigoCobranzaPagoDet_Listar(objEntidad);
            }

            if (dta_consulta != null && dta_consulta.Rows.Count > 0)
            {
                object MontoSoles;
                MontoSoles = dta_consulta.Compute("Sum(Saldo)", "");
                string m = MontoSoles.ToString(); if (m.Trim() == "") m = "0";
                TotalFactura = Math.Round(decimal.Parse(m), 2);
            }

            grvDetalle.DataSource = dta_consulta;
            grvDetalle.DataBind();
        }

        public void P_GrabarDocumento(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.Tipo = Convert.ToString(objTablaFiltro["Filtro_Tipo"]);
            objEntidad.CodigoTemporal = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporal"]);
            objEntidad.CodigoTemporalPago = Convert.ToInt32(objTablaFiltro["Filtro_CodigoTemporalPago"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.NroOperacion = Convert.ToString(objTablaFiltro["Filtro_NroOperacion"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.FechaOperacion = Convert.ToDateTime(objTablaFiltro["Filtro_FechaOperacion"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.CodEstado = 1;
            objEntidad.Responsable = Convert.ToString(objTablaFiltro["Filtro_Responsable"]).ToUpper();
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]).ToUpper();
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);
            objEntidad.CodCtaBancaria = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaBancaria"]);
            objEntidad.CobranzaSoles = Convert.ToDecimal(objTablaFiltro["Filtro_CobranzaSoles"]);
            objEntidad.DeudaSoles = Convert.ToDecimal(objTablaFiltro["Filtro_DeudaSoles"]);
            objEntidad.CobroOperacionSoles = Convert.ToDecimal(objTablaFiltro["Filtro_CobroOperacionSoles"]);
            objEntidad.CobranzaDolares = Convert.ToDecimal(objTablaFiltro["Filtro_CobranzaDolares"]);
            objEntidad.DeudaDolares = Convert.ToDecimal(objTablaFiltro["Filtro_DeudaDolares"]);
            objEntidad.CobroOperacionDolares = Convert.ToDecimal(objTablaFiltro["Filtro_CobroOperacionDolares"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.TipoDevolucion = Convert.ToInt32(objTablaFiltro["Filtro_TipoDevolucion"]);
            objEntidad.CodMonedaVuelto = Convert.ToInt32(objTablaFiltro["Filtro_CodMonedaVuelto"]);
            objEntidad.Vuelto = Convert.ToDecimal(objTablaFiltro["Filtro_Vuelto1"]);
            objEntidad.Vuelto2 = Convert.ToDecimal(objTablaFiltro["Filtro_Vuelto2"]);
            objEntidad.Tasa = Convert.ToDecimal(objTablaFiltro["Filtro_Tasa"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.NroRecibo = Convert.ToString(objTablaFiltro["Filtro_Recibo"]);
            objEntidad.Cobrador = Convert.ToInt32(objTablaFiltro["Filtro_Cobrador"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_Cobranzas_RegistroCobranzas(objEntidad);
          
            MsgError = objEntidad.MsgError;

            TCCuentaCorrienteCE EntidadClienteAzure = new TCCuentaCorrienteCE();
            EntidadClienteAzure.CodCtaCte = objEntidad.CodCliente;
            TCCuentaCorrienteLineaCreditoCN ActualizacionSaldosClientesAzure = new TCCuentaCorrienteLineaCreditoCN();
            ActualizacionSaldosClientesAzure.Async_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(EntidadClienteAzure);
        }

        public void P_LlenarGrillaVacia_Detalle()
        {
            DataTable dta_consultadetalle = null;
            DataRow dtr_filadetalle = null;

            dta_consultadetalle = new DataTable();

            dta_consultadetalle.Columns.Add("CodDetalle", typeof(string));
            dta_consultadetalle.Columns.Add("CodArticulo", typeof(string));
            dta_consultadetalle.Columns.Add("CodigoProducto", typeof(string));
            dta_consultadetalle.Columns.Add("Producto", typeof(string));
            dta_consultadetalle.Columns.Add("Cantidad", typeof(string));
            dta_consultadetalle.Columns.Add("UM", typeof(string));
            dta_consultadetalle.Columns.Add("Precio", typeof(string));
            dta_consultadetalle.Columns.Add("Importe", typeof(string));

            dtr_filadetalle = dta_consultadetalle.NewRow();

            dtr_filadetalle[0] = "";
            dtr_filadetalle[1] = "";
            dtr_filadetalle[2] = "";
            dtr_filadetalle[3] = "";
            dtr_filadetalle[4] = "";
            dtr_filadetalle[5] = "";
            dtr_filadetalle[6] = "";
            dtr_filadetalle[7] = "";

            dta_consultadetalle.Rows.Add(dtr_filadetalle);

            //grvDetalleArticulo.DataSource = dta_consultadetalle;
            //grvDetalleArticulo.DataBind();

        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.chkRegistro = Convert.ToInt32(objTablaFiltro["Filtro_ChkRegistro"]);
            
            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkNumero"]) == 1)
                objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            else
                objEntidad.NumeroDoc = "";

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
                objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCliente = 0;

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_Cobranzas_Listar(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_AnularRegistro(Hashtable objTablaFiltro, ref String Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodCobranza = Convert.ToInt32(objTablaFiltro["Filtro_CodCobranza"]);
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]);
            objEntidad.ObservacionAnulacion = Convert.ToString(objTablaFiltro["Filtro_Observaciones"]);
            objEntidad.CodUsuario = Convert.ToInt32(Session["CodUsuario"]);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_Cobranzas_Anulacion(objEntidad);

            Mensaje = objEntidad.MsgError;

            TCCuentaCorrienteCE EntidadClienteAzure = new TCCuentaCorrienteCE();
            EntidadClienteAzure.CodCtaCte = objEntidad.CodCliente;
            TCCuentaCorrienteLineaCreditoCN ActualizacionSaldosClientesAzure = new TCCuentaCorrienteLineaCreditoCN();
            ActualizacionSaldosClientesAzure.Async_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(EntidadClienteAzure);
        }

        public void P_LlenarGrillaVacia_ConsultaFactura()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Codigo", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Soles", typeof(string));
            dta_consultaarticulo.Columns.Add("Dolares", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));

            dtr_consultafila = dta_consultaarticulo.NewRow();

            dtr_consultafila[0] = "";
            dtr_consultafila[1] = "";
            dtr_consultafila[2] = "";
            dtr_consultafila[3] = "";
            dtr_consultafila[4] = "";
            dtr_consultafila[5] = "";
            dtr_consultafila[6] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvConsultaFactura.DataSource = dta_consultaarticulo;
            grvConsultaFactura.DataBind();
        }

        public void P_LlenarGrillaVacia_Detallado()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("Sucursal", typeof(string));
            dta_consultaarticulo.Columns.Add("TipoDocumento", typeof(string));
            dta_consultaarticulo.Columns.Add("Numero", typeof(string));
            dta_consultaarticulo.Columns.Add("Cliente", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("Vencimiento", typeof(string));
            dta_consultaarticulo.Columns.Add("TOTAL", typeof(string));
            dta_consultaarticulo.Columns.Add("Acuenta", typeof(string));
            dta_consultaarticulo.Columns.Add("Saldo", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Estado", typeof(string));
            dta_consultaarticulo.Columns.Add("Usuario", typeof(string));
            dta_consultaarticulo.Columns.Add("Empresa", typeof(string));
            dta_consultaarticulo.Columns.Add("CodDocumentoVenta", typeof(string));
            dta_consultaarticulo.Columns.Add("Factura", typeof(string));
            dta_consultaarticulo.Columns.Add("RUTA", typeof(string));

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
            dtr_consultafila[11] = "";
            dtr_consultafila[12] = "";
            dtr_consultafila[13] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvDetallado.DataSource = dta_consultaarticulo;
            grvDetallado.DataBind();
        }

        public void P_LlenarGrillaVacia_Eliminado()
        {
            DataTable dta_consultaarticulo = null;
            DataRow dtr_consultafila = null;

            dta_consultaarticulo = new DataTable();

            dta_consultaarticulo.Columns.Add("ID", typeof(string));
            dta_consultaarticulo.Columns.Add("NroOperacion", typeof(string));
            dta_consultaarticulo.Columns.Add("Medio", typeof(string));
            dta_consultaarticulo.Columns.Add("Proveedor", typeof(string));
            dta_consultaarticulo.Columns.Add("Emision", typeof(string));
            dta_consultaarticulo.Columns.Add("TC", typeof(string));
            dta_consultaarticulo.Columns.Add("Moneda", typeof(string));
            dta_consultaarticulo.Columns.Add("Banco", typeof(string));
            dta_consultaarticulo.Columns.Add("Cuenta", typeof(string));
            dta_consultaarticulo.Columns.Add("Cobranza", typeof(string));
            dta_consultaarticulo.Columns.Add("Operacion", typeof(string));
            dta_consultaarticulo.Columns.Add("Deuda", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMedioPago", typeof(string));
            dta_consultaarticulo.Columns.Add("CodBanco", typeof(string));
            dta_consultaarticulo.Columns.Add("CodCtaBancaria", typeof(string));
            dta_consultaarticulo.Columns.Add("ObservacionMedioPago", typeof(string));
            dta_consultaarticulo.Columns.Add("Comision", typeof(string));
            dta_consultaarticulo.Columns.Add("Responsable", typeof(string));
            dta_consultaarticulo.Columns.Add("Caja", typeof(string));
            dta_consultaarticulo.Columns.Add("Vuelto", typeof(string));
            dta_consultaarticulo.Columns.Add("CodMoneda", typeof(string));
            dta_consultaarticulo.Columns.Add("CodCajaFisica", typeof(string));
            dta_consultaarticulo.Columns.Add("Empresa", typeof(string));
            dta_consultaarticulo.Columns.Add("CodEmpresa", typeof(string));

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
            dtr_consultafila[11] = "";
            dtr_consultafila[12] = "";
            dtr_consultafila[13] = "";
            dtr_consultafila[14] = "";

            dta_consultaarticulo.Rows.Add(dtr_consultafila);

            grvEliminado.DataSource = dta_consultaarticulo;
            grvEliminado.DataBind();
            
        }

        public void P_AgregarLetraTemporal(Hashtable objTablaFiltro, ref String MsgError, ref Int32 Codigo)
        {
            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            objEntidad = new LetrasCabCE();


            String XmlDetalle = "";

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.Numero = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_Emision"]);

            objEntidad.FechaVencimiento = Convert.ToDateTime(objTablaFiltro["Filtro_Vencimiento"]);
            objEntidad.Total = Convert.ToDecimal(objTablaFiltro["Filtro_Total"]);
            objEntidad.Moneda = Convert.ToString(objTablaFiltro["Filtro_Moneda"]);


            objEntidad.CodFormaPago = Convert.ToInt32(objTablaFiltro["Filtro_CodFormaPago"]);
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodFactura = '" + item.CodFactura + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new LetrasCabCN();

            objOperacion.F_TemporalLetraCab_Insert(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_Cargar_Grilla_Letras(Hashtable objTablaFiltro, ref GridView grvConsulta, ref Decimal Totalletra)
        {

            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            String XmlDetalle = "";
            objEntidad = new LetrasCabCE();

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(objTablaFiltro["Filtro_XmlConsulta"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodFactura = '" + item.CodFactura + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            objOperacion = new LetrasCabCN();

            grvConsulta.DataSource = objOperacion.F_TemporalLetraCab_Listar(objEntidad);
            grvConsulta.DataBind();

            if (grvConsulta.Rows.Count > 0)
            {
                for (int j = 0; j < grvConsulta.Rows.Count; j++)
                    Totalletra += Convert.ToDecimal(grvConsulta.Rows[j].Cells[5].Text);
            }
        }

        public void P_ListarNroCuenta(Hashtable objTablaFiltro, 
            ref DropDownList ddl_combonrocuenta, ref DropDownList ddl_combonrocuenta_Edicion)
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

            ddl_combonrocuenta_Edicion.Items.Clear();

            ddl_combonrocuenta_Edicion.DataSource = dta_consulta;
            ddl_combonrocuenta_Edicion.DataTextField = "NumeroCuenta";
            ddl_combonrocuenta_Edicion.DataValueField = "CodCuenta";
            ddl_combonrocuenta_Edicion.DataBind();
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
                TC = Convert.ToDecimal(dta_consulta.Rows[0]["TC_PARALELO"]);
        }

        public void P_CargarFacturaPagos_Grilla(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

            objOperacion = new NotaIngresoSalidaCabCN();

            grvConsulta.DataSource = objOperacion.F_NotaIngresoSalidaCab_ConsultaPago(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_Cargar_Grilla_NotaVenta(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodMoneda = Convert.ToInt32(objTablaFiltro["Filtro_CodMoneda"]);
            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);

            objOperacion = new DocumentoVentaCabCN();

            grvConsulta.DataSource = objOperacion.F_DocumentoVentaCab_ConsultaCobranzas_NotaVenta(objEntidad);
            grvConsulta.DataBind();
        }

        public void P_ActualizarTC(Hashtable objTablaFiltro, ref String MsgError)
        {
            DocumentoVentaDetCE objEntidad = null;
            DocumentoVentaDetCN objOperacion = null;

            objEntidad = new DocumentoVentaDetCE();

            objEntidad.CodFacturaDet = Convert.ToInt32(objTablaFiltro["Filtro_CodFacturaDet"]);
            objEntidad.TipoCambio = Convert.ToDecimal(objTablaFiltro["Filtro_TipoCambio"]);
            objEntidad.Soles = Convert.ToDecimal(objTablaFiltro["Filtro_Soles"]);
            objEntidad.Dolares = Convert.ToDecimal(objTablaFiltro["Filtro_Dolares"]);

            objOperacion = new DocumentoVentaDetCN();

            objOperacion.F_TemporalCodigoFacturaDet_Update(objEntidad);

            MsgError = objEntidad.MsgError;
        }

        public void P_Cargar_Grilla_Letra(Hashtable objTablaFiltro, ref GridView grvConsulta)
        {
            LetrasCabCE objEntidad = null;
            LetrasCabCN objOperacion = null;

            objEntidad = new LetrasCabCE();

            objEntidad.CodCtaCte = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            objEntidad.CodTipoOperacion = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoOperacion"]);

            objOperacion = new LetrasCabCN();

            grvConsulta.DataSource = objOperacion.F_LetrasCab_ConsultaPagos(objEntidad);
            grvConsulta.DataBind();
        }

        public void F_EdicionMedioPago(Hashtable objTablaFiltro, ref String MsgError, 
            ref DropDownList ddl_combomediopago, ref DropDownList ddl_combobanco, ref DropDownList ddl_CajaFisica)
        {
            DataTable dta_consulta = null;

            TCConceptosDetCE objEntidadConceptosDet = new TCConceptosDetCE();
            TCConceptosDetCN objOperacionConceptosDet = new TCConceptosDetCN();

            objEntidadConceptosDet.CodConcepto = 23;
            dta_consulta = objOperacionConceptosDet.F_TCConceptos_Select(objEntidadConceptosDet);

            ddl_combomediopago.Items.Clear();

            ddl_combomediopago.DataSource = dta_consulta;
            ddl_combomediopago.DataTextField = "DscAbvConcepto";
            ddl_combomediopago.DataValueField = "CodConcepto";
            ddl_combomediopago.DataBind();

            dta_consulta = null;

            BancosCN objOperacionBancos = new BancosCN();
            dta_consulta = objOperacionBancos.F_Listar_Bancos();
            ddl_combobanco.Items.Clear();
            ddl_combobanco.DataSource = dta_consulta;
            ddl_combobanco.DataTextField = "DscBanco";
            ddl_combobanco.DataValueField = "CodBanco";
            ddl_combobanco.DataBind();

            dta_consulta = null;

            dta_consulta = (new CajaFisicaCN()).F_dtCajaFisica_Listar(1, 0, Convert.ToInt32(objTablaFiltro["Filtro_CodEmpresa"]));
            ddl_CajaFisica.Items.Clear();
            ddl_CajaFisica.DataSource = dta_consulta;
            ddl_CajaFisica.DataTextField = "Descripcion";
            ddl_CajaFisica.DataValueField = "CodCajaFisica";
            ddl_CajaFisica.DataBind();
        }

        public void F_EditarMedioPago(Hashtable objTablaFiltro, ref String MsgError)
        {
            Cobranzas objEntidad = new Cobranzas();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();

            objEntidad.FechaEmision = Convert.ToDateTime(objTablaFiltro["Filtro_FechaEmision"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);

            objEntidad.CodCobranza = Convert.ToInt32(objTablaFiltro["Filtro_CodCobranza"]);
            objEntidad.CodBanco = Convert.ToInt32(objTablaFiltro["Filtro_CodBanco"]);
            objEntidad.CodCtaBancaria = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaBancaria"]);
            objEntidad.NroOperacion = Convert.ToString(objTablaFiltro["Filtro_NroOperacion"]).ToUpper();
            objEntidad.Observacion = Convert.ToString(objTablaFiltro["Filtro_Observacion"]).ToUpper();
            objEntidad.Comision = Convert.ToDecimal(objTablaFiltro["Filtro_Comision"]);
            objEntidad.Recibo = Convert.ToString(objTablaFiltro["Filtro_Recibo"]).ToUpper();
            objEntidad.CodUsuario = Convert.ToInt32((Session["CodUsuario"]));

            objOperacion.F_Cobranzas_Edicion_MedioPago(objEntidad);
            MsgError = objEntidad.MsgError;
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

        public void P_Buscar_Detallado(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(objTablaFiltro["Filtro_CodAlmacen"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodVendedor = Convert.ToInt32(objTablaFiltro["Filtro_CodVendedor"]);
            objEntidad.FlagAcuenta = Convert.ToInt32(objTablaFiltro["Filtro_FlagAcuenta"]);
            objEntidad.Ruta = Convert.ToInt32(objTablaFiltro["Filtro_Ruta"]);

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkNumero"]) == 1)
                objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            else
                objEntidad.NumeroDoc = "";

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
                objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCliente = 0;




            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_DOCUMENTOVENTACAB_LISTAR_COBRANZAS(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public void P_Buscar_Eliminados(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.CodAlmacen = Convert.ToInt32(Session["CodSede"]);
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_CodTipoDoc"]);
            objEntidad.CodMedioPago = Convert.ToInt32(objTablaFiltro["Filtro_CodMedioPago"]);
            objEntidad.CodCajaFisica = Convert.ToInt32(objTablaFiltro["Filtro_CodCajaFisica"]);
            objEntidad.CodTipoDoc = Convert.ToInt32(objTablaFiltro["Filtro_Codtipodoc"]);

            if (Convert.ToInt32(objTablaFiltro["Filtro_ChkNumero"]) == 1)
                objEntidad.NumeroDoc = Convert.ToString(objTablaFiltro["Filtro_Numero"]);
            else
                objEntidad.NumeroDoc = "";

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
                objEntidad.CodCliente = Convert.ToInt32(objTablaFiltro["Filtro_CodCtaCte"]);
            else
                objEntidad.CodCliente = 0;

            objOperacion = new DocumentoVentaCabCN();

            dta_consulta = objOperacion.F_DOCUMENTOVENTACAB_ELIMINADOS_LISTAR_COBRANZAS(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        public String F_LlenarGridEliminar_NET(String arg)
        {
            int int_resultado_operacion = 0;
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String grvNombre = "";
            String str_grvDetalleEliminado_html = "";
            int Col = 0;
            int Codigo = 0;
            Hashtable obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

            try
            {
                //Necesarios para que busque el sistema
                grvNombre = Convert.ToString(obj_parametros["Filtro_grvNombre"]);
                Col = Convert.ToInt32(obj_parametros["Filtro_Col"]);
                Codigo = Convert.ToInt32(obj_parametros["Filtro_Codigo"]);

                DocumentoVentaDetCN objOperacion = new DocumentoVentaDetCN();
                DocumentoVentaDetCE objEntidad = new DocumentoVentaDetCE();
                //Obtengo el Grid para llenarlo y dibujarlo
                GridView grvEliminar = (GridView)grvEliminado.Rows[0].FindControl("grvDetalleEliminado");

                objEntidad.CodCobranzaCab = Convert.ToInt32(Codigo);
                grvEliminar.DataSource = objOperacion.F_CobranzasDet_Eliminar_Listar(objEntidad);
                grvEliminar.DataBind();

                //se crea el html a partir del grid llenado
                str_grvDetalleEliminado_html = Mod_Utilitario.F_GetHtmlForControl(grvEliminar);
            }
            catch (Exception exxx)
            {
                str_resultado = "ERROR AL BUSCAR DETALLE: " + exxx;
                int_resultado_operacion = 1;
            }
            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_grvDetalleEliminado_html + "~" +
                grvNombre;

            return str_resultado;
        }
    }
}