<%@ Page Title="Reporte Utilidad Bruta" Language="C#" MasterPageFile="~/Site.Master"   AutoEventWireup="true" CodeBehind="Venta_UtilidadBruta.aspx.cs" Inherits="SistemaInventario.Reportes.Venta_UtilidadBruta" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"  charset="UTF-8"></script>      
    <script type="text/javascript" language="javascript" src="Venta_UtilidadBruta.js" charset="UTF-8"></script>       
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"  type="text/css" />      
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/multiselect-slim-autoc/slimselect.min.css" rel="stylesheet"   type="text/css" />     
    <link href="../Asset/multiselect-slim-autoc/slimcustom.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/multiselect-slim-autoc/slimselect.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 550px">
        Reporte Utilidad Bruta</div>
    <div id="tabRegistro" style="width: 550px">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                CRITERIO DE BUSQUEDA
            </div>
            <div id="divConsultaArticulo">
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tr>
                            <td style="font-weight: bold">
                                Desde
                            </td>
                            <td>
                            <table>
                            <tr>
                            <td>
                                <asp:TextBox ID="txtDesde" runat="server" Width="55px" Font-Names="Arial" CssClass="MesAnioPicker"
                                    ReadOnly="true" ForeColor="Blue"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                Hasta
                            </td>
                            <td>
                                <asp:TextBox ID="txtHasta" runat="server" Width="55px" Font-Names="Arial" CssClass="MesAnioPicker"
                                    ReadOnly="true" ForeColor="Blue"></asp:TextBox>
                            </td>
                            </tr>
                            </table>
                            </td>
                            
                        </tr>
                        <tr>
                        <td style="font-weight: bold" >
                        Descripcion
                        </td>
                        <td style="padding-left: 5px;">
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="420px" Font-Names="Arial"  ForeColor="Blue"></asp:TextBox>
                                   
                        </td>
                        </tr>
                        <tr id="trFamilia" style="display: none">
                            <td style="font-weight: bold">
                                Familia
                            </td>
                            <td style="padding-left: 5px" colspan="3">
                                <select id="ddlFamilia" style="width: 420px" multiple>
                                </select>
                            </td>
                        </tr>
                        <tr style="display: none">
                            <td style="font-weight: bold">
                                linea
                            </td>
                            <td style="padding-left: 5px" colspan="3">
                                <select id="ddlLinea" style="width: 420px" multiple>
                                </select>
                            </td>
                        </tr>
                        <tr id="trMarca" style="display: none">
                            <td style="font-weight: bold">
                                Marca
                            </td>
                            <td style="padding-left: 5px" colspan="3">
                                <select id="ddlMarca" style="width: 420px" multiple>
                                </select>
                            </td>
                        </tr>
                        <tr style="display: none">
                            <td style="font-weight: bold">
                                Moneda
                            </td>
                            <td style="padding-left: 5px" colspan="3">
                                <select id="ddlMoneda" style="width: 420px">
                                    <option value="1">Soles</option>
                                    <option value="2">Dolares</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Almacen
                            </td>
                            <td style="padding-left: 5px" colspan="3">
                                <select id="ddlAlmacen" style="width: 420px">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="display: none">
                                TIPO REPORTE
                            </td>
                            <td style="display: none">
                                <select id="ddlTipoReporte" style="width: 420px">
                                    <option value="1">SOLO PRODUCTOS CON VENTAS</option>
                                    <option value="2">INCLUIR TODOS LOS PRODUCTOS C/S VENTAS</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnReporteGeneral" runat="server" Text="Reporte" Font-Names="Arial"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Width="120px" />
                    <asp:Button ID="btnReportePorFamilia" runat="server" Text="Reporte" Font-Names="Arial"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Width="120px" Visible="false" />
                </div>
            </div>
        </div>
    </div>
    <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;">
        <br />
        <br />
        <center>
            <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                Style="text-align: center"></asp:Label></center>
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
        <input id="hfcodproducto" type="hidden" value="0" />
</asp:Content>
