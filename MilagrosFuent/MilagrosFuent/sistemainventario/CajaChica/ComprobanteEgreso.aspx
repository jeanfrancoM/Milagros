<%@ Page Title="Comprobante Egreso" Language="C#" MasterPageFile="~/Site.Master"  AutoEventWireup="true" CodeBehind="ComprobanteEgreso.aspx.cs" Inherits="SistemaInventario.CajaChica.ComprobanteEgreso" EnableEventValidation="false"    %>
  
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"  charset="UTF-8"></script>      
    <script src="../Scripts/inputatajos/kibo.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="ComprobanteEgreso.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"  type="text/css" />      
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        COMPROBANTE EGRESO</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    REGISTRO DE COMPROBANTE DE EGRESO
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="550">
                      <tr  style="display:none;">
                            <td style="font-weight: bold">
                                Empresa
                            </td>
                       
                                        <td style="padding-left: 4px;">
                                            <div id="div_Empresa">
                                                <asp:DropDownList ID="ddlEmpresa" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="533" Font-Size="Medium">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                   
                            
                           
                        </tr>
                        <tr>
                            <td style="font-weight: bold; width: 75px">
                                Tipo Doc
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_TipoDoc">
                                                <asp:DropDownList ID="ddlTipoDoc" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="110px">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            Proveedor
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNroRuc" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="11" onblur="F_ValidaRucDni(); return false;"></asp:TextBox>
                                        </td>
                                        <td id="td_loading" style="font-weight: bold; padding-left: 5px; display: none">
                                            <img src="../Asset/images/loading.gif" />
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtProveedor" runat="server" Width="295px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Distrito
                                        </td>
                                        <td style="padding-left: 1px">
                                            <asp:TextBox ID="txtDistrito" runat="server" Width="297px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Direccion
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox Style="width: 508px; position: absolute; color: blue; font-family: Arial;
                                                font-weight: bold; background: rgb(255, 255, 224);" ID="txtDireccion" runat="server"
                                                autocomplete="off"></asp:TextBox>
                                            <asp:DropDownList ID="ddlDireccion" Style="width: 529px" runat="server">
                                            </asp:DropDownList>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Serie
                                        </td>
                                        <td style="padding-left: 1px">
                                            <div id="div_serie" style="display: block">
                                                <asp:DropDownList ID="ddlSerie" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="50">
                                                </asp:DropDownList>
                                            </div>
                                            <div id="div_txtSerie" style="display: none">
                                                <asp:TextBox ID="txtSerie" runat="server" Width="50" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" MaxLength="4"></asp:TextBox>
                                            </div>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNumero" runat="server" Width="45" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue" MaxLength="8"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Emision
                                        </td>
                                        <td style="padding-left: 1px; font-weight: bold">
                                            <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp" ForeColor="Blue"
                                                Font-Names="Arial" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                         <td style="font-weight: bold">
                                            Imp. (%)
                                        </td>
                                        <td>
                                            <div id="div_igv">
                                                <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="90">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        
                                        
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Tipo EGRESO
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_tipoingreso">
                                                <asp:DropDownList ID="ddlTipoIngreso" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    Width="130px" ForeColor="Blue">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Condicion Pago
                                        </td>
                                        <td style="padding-left: 3px">
                                            <div id="div_FormaPago">
                                                <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="78">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            MONEDA
                                        </td>
                                        <td>
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    ForeColor="Blue" Width="80">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <asp:Label ID="Label1" runat="server" Text="T.C." Font-Bold="True"></asp:Label>
                                        </td>
                                        <td>
                                            <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                        </td>
                                         <td style="font-weight: bold">
                                            Sub Total
                                        </td>
                                        <td style="padding-left: 10px;">
                                            <asp:TextBox ID="txtsubtotal" runat="server" Width="90px" Font-Names="Arial" Font-Bold="True"
                                                CssClass="Derecha" ForeColor="Blue" Text="0.00"></asp:TextBox>
                                        </td>
                                         <td style="font-weight: bold">
                                            IGV
                                        </td>
                                        <td style="padding-left: 10px;">
                                            <asp:TextBox ID="txtigv" runat="server" Width="90px" Font-Names="Arial" Font-Bold="True"
                                                CssClass="Derecha" ForeColor="Blue" Text="0.00"></asp:TextBox>
                                        </td>
                                       
                                        <td style="font-weight: bold">
                                            total
                                        </td>
                                        <td style="padding-left: 10px;">
                                            <asp:TextBox ID="txtTotal" runat="server" Width="78px" Font-Names="Arial" Font-Bold="True"
                                                CssClass="Derecha" ForeColor="Blue" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">
                                Caja
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_CajaFisica">
                                                <asp:DropDownList ID="ddlCajaFisica" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="130px">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            MEDIO PAGO
                                        </td>
                                        <td style="padding-left: 27px;">
                                            <div id="div_MedioPago">
                                                <asp:DropDownList ID="ddlMedioPago" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    ForeColor="Blue" Width="115">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            Banco
                                        </td>
                                        <td style="font-weight: bold; padding-left: 10px;">
                                            <div id="div_Banco">
                                                <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="133px">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Cuenta
                                        </td>
                                        <td style="font-weight: bold; padding-left: 9px;">
                                            <div id="div_Cuenta">
                                                <asp:DropDownList ID="ddlCuenta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="107px">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            Operacion
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtOperacion" runat="server" Width="148px" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">
                                Observacion
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtObservacion" runat="server" Width="908px" Font-Names="Arial"
                                                Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                                        </td>
                                        <td style="display:none;">
                                            <asp:CheckBox ID="chkImpresion" runat="server" Text="Impresion" Font-Bold="True"
                                              />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Limpiar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />

                    <%--<asp:Button ID="btnAgregarFactura" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />--%>

                    <asp:Button ID="btnEliminarFactura" runat="server" Text="Eliminar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div style="padding-top: 5px;display:none;">
            </div>
            <div  class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                style="width: 598px;display:none;">
                Facturas | COMPROBANTES INGRESOS
            </div>
            <div id="div_grvFactura" style="display:none;">
                <asp:GridView ID="grvFactura" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="600px">
                    <Columns>
                   
                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">

                        <HeaderTemplate>
                                                                <asp:CheckBox ID="checkAll" runat="server" onclick="checkAll(this);" />
                                                            </HeaderTemplate>
                            <ItemTemplate>
                                
                                        <ItemTemplate>
                                            <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                <asp:HiddenField ID="hfSoles" runat="server" Value='<%# Bind("Soles") %>' />
                                <asp:HiddenField ID="hfDolares" runat="server" Value='<%# Bind("Dolares") %>' />
                                <asp:HiddenField ID="hfxSoles" runat="server" Value='<%# Bind("xSoles") %>' />
                                <asp:HiddenField ID="hfxDolares" runat="server" Value='<%# Bind("xDolares") %>' />
                                <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                <asp:HiddenField ID="hfID" runat="server" Value='<%# Bind("Detalle") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="TipoDoc" HeaderText="Tipo DOC">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Numero">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Emision" HeaderText="Emision">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="xSoles" HeaderText="Saldo S/." Visible="false">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="xDolares" HeaderText="Saldo $" Visible="false">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Soles" HeaderText="TOTAL" DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="MONTO" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtMontoObligacion" Width="80px" Font-Bold="true"
                                    Style="text-align: center;" CssClass="ccsestilo" ReadOnly="True" Font-Names="Arial" ForeColor="Blue"
                                    Text='<%# Bind("xSoles") %>' onblur="F_ActualizarMonto(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
        <div id="tabConsulta" style="display: none;">
            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Criterio de busqueda
                </div>
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tbody>
                            <tr>
                              <td style="font-weight: bold">
                                    empresa
                                </td>
                                <td>
                                <table cellpadding="0" cellspacing="0">
                                <tr>
                                   <td>
                                    <div id="div_EmpresaConsulta">
                                        <asp:DropDownList ID="ddlEmpresaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="200" Enabled="False">
                                        </asp:DropDownList>
                                    </div>
                                </td>

                                <td style="font-weight: bold">
                                    Tipo Doc
                                </td>
                                <td>
                                    <div id="div_TipoDocConsulta">
                                        <asp:DropDownList ID="ddlTipoDocConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="170px">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold; display: none">
                                    Serie
                                </td>
                                <td style="display: none">
                                    <div id="div_serieconsulta">
                                        <asp:DropDownList ID="ddlSerieConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="70" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold">
                                    Formato
                                </td>
                                 <td style="">
                                                            <div id="div_FormatoImpresion">
                                                                <asp:DropDownList ID="ddlFormatoImpresion2" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                    Font-Bold="True" Width="65px">
                                                                    <asp:ListItem Value="1">A4</asp:ListItem>
                                                                    <asp:ListItem Value="2">A5</asp:ListItem>
                                                                    <asp:ListItem Value="3">TICKET</asp:ListItem>
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                </tr>
                                </table>
                                </td>
                          
                               
                            </tr>
                            <tr>
   <td>
                                    <asp:CheckBox ID="chkCliente" runat="server" Text="Proveedor" Font-Bold="True" />
                                </td>
                            <td>
                            <table cellpadding="0" cellspacing="0">
                            <tr>
                          
                                <td>
                                    <asp:TextBox ID="txtProveedorConsulta" runat="server" Width="421" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                 <td>
                                    <asp:CheckBox ID="chkfactura" runat="server" Text="Factura" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtfacturaconsulta" runat="server" Width="70" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                            </table>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div style="padding-top: 5px;">
               <table cellpadding="0" cellspacing="0" align="center">
                                    <tr>
                                        <td style="font-weight: bold">
                                           Cantidad de Registros:
                                        </td>
                                        <td style="font-weight: bold">
                                            <label id="lblNumeroConsulta"></label>
                                        </td>                                
                                    </tr>
                                </table>
            </div>
            <div id="div_consulta" style="padding-top: 5px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    OnRowDataBound="grvConsulta_RowDataBound" CellPadding="0" CellSpacing="1" CssClass="GridView"
                    GridLines="None" Width="1005px" >
                    <Columns>
                        <asp:TemplateField Visible="false">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="~/Asset/images/btnEdit.gif"
                                    ToolTip="Editar Registro" OnClientClick="F_EditarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/Eliminar.jpg"
                                    ToolTip="ELIMINAR DOCUMENTO" OnClientClick="F_AnularPopUP(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField Visible="false">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgDocumento" ImageUrl="../Asset/images/add_small.png"
                                    ToolTip="ADJUNTAR DOCUMENTO" OnClientClick="F_Direccion(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="" Visible="true">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgPdf" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                    OnClientClick="F_ImprimirFacturaPDF(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgImpresion" ImageUrl="~/Asset/images/imprimir.gif"
                                    ToolTip="IMPRIMIR" OnClientClick="F_Imprimir(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField >
                            <ItemTemplate >
                                <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                    title="Ver Detalle" / >
                                <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                        AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="Numero" HeaderText="Numero">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="CLIENTE" HeaderText="CLIENTE">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Emision" HeaderText="Emision">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Center" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Total" HeaderText="Total">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Comision" HeaderText="Comision">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Vendedor" HeaderText="Vendedor">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
            <asp:TemplateField HeaderText="O">
                            <ItemTemplate>
                                <img id="imgMasObservacion" alt="" style="cursor: pointer" src="../Asset/images/plus.gif"
                                    onclick="imgMasObservacion_Click(this);" title="OBSERVACION" />
                                <asp:Panel ID="pnlOrdersObservacion" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalleObservacion" runat="server" border="0" CellPadding="0"
                                        CellSpacing="1" AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="Observacion" HeaderText="Observacion">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="A">
                            <ItemTemplate>
                                <img id="imgMasAuditoria" alt="" style="cursor: pointer" src="../Asset/images/plus.gif"
                                    onclick="imgMasAuditoria_Click(this);" title="Auditoria" />
                                <asp:Panel ID="pnlOrdersAuditoria" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalleAuditoria" runat="server" border="0" CellPadding="0"
                                        CellSpacing="1" AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="Auditoria" HeaderText="Auditoria">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="TipoDoc" HeaderText="Tipo">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Numero">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>' CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="lblID" runat="server" Value='<%# Bind("ID") %>' />
                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                <asp:HiddenField ID="hfCodEstado" runat="server" Value='<%# Bind("CodEstado") %>' />
                                <asp:HiddenField ID="hfCodCtaCte" runat="server" Value='<%# Bind("CodCtaCte") %>' />
                                <asp:HiddenField ID="hfTipoDocumento" runat="server" Value='<%# Bind("TipoDocumento") %>' />
                                <asp:HiddenField ID="hfTipoDoc" runat="server" Value='<%# Bind("TipoDoc") %>' />
                                <asp:HiddenField ID="hfCodMotivo" runat="server" Value='<%# Bind("CodMotivo") %>' />
                                <asp:HiddenField ID="hfDetalleCargado" runat="server" Value='0' />
                                <asp:HiddenField ID="hfDetalleCargadoAuditoria" runat="server" Value='0' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Razon Social" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblRazonSocial" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Monto">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblMonto" Text='<%# Bind("Monto") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Saldo">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblSaldo" Text='<%# Bind("Saldo") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="MedioPago" HeaderText="Medio Pago">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TipoCambio" HeaderText="TC">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Estado">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Motivo" HeaderText="Motivo">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="div_ComprobanteCaja" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold">
                        Tipo Documento
                    </td>
                    <td colspan='4'>
                        <div id="div_TipoDocumento">
                            <asp:DropDownList ID="ddlTipoDocumento" runat="server" ForeColor="Blue" Font-Bold="True"
                                Font-Names="Arial" Width="151">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Serie
                    </td>
                    <td>
                        <asp:TextBox ID="txtSerieFactura" runat="server" Width="30px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="font-weight: bold; padding-left: 2px;">
                        Numero
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumeroFactura" runat="server" Width="60px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="padding-left: 11px;">
                        <asp:Button ID="btnBuscarFactura" runat="server" Text="BUSCAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120px" />
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        SALDO COMPROBANTE
                    </td>
                    <td colspan='4'>
                        <asp:TextBox ID="txtSaldo" runat="server" Width="147px" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Saldo Venta
                    </td>
                    <td colspan='4'>
                        <asp:TextBox ID="txtSaldoVenta" runat="server" Width="147px" ReadOnly="True" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Moneda
                    </td>
                    <td colspan='4'>
                        <div id="div_MonedaComision">
                            <asp:DropDownList ID="ddlMonedaComision" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="151">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan='5' style="padding-top: 5px;" align="right">
                        <asp:Button ID="btnGrabarComision" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120px" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divConsultaFactura" style="display: none;">
        <div class="ui-jqdialog-content">
            <table width="360">
                <tr>
                    <td>
                        <asp:Button ID="btnAgregar" runat="server" Text="Agregar" Width="120px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="div_grvConsultaFactura">
                            <asp:GridView ID="grvConsultaFactura" runat="server" AutoGenerateColumns="False"
                                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                Width="460">
                                <Columns>
                                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                        <ItemTemplate>
                                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Factura">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                                            <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                            <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                                            <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                            <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Emision">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Total">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Moneda">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblMoneda" Text='<%# Bind("Moneda") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Monto">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:TextBox runat="server" ID="txtMontoObligacion" Text='<%# Bind("MontoObligacion") %>'
                                                Width="55px" Font-Bold="true" ReadOnly="True" Style="text-align: right;" Font-Names="Arial" ForeColor="Blue"
                                                Enabled="True" CssClass="ccsestilo"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                </Columns>
                            </asp:GridView>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
     <div id="div_Anulacion" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td style="font-weight: bold">
                        ¿ PORQUE LO ESTAS ANULANDO ?
                    </td>
                  
                </tr>
                <tr>
                  <td>
                           <asp:TextBox ID="txtObservacionAnulacion" runat="server" Width="450px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True" TextMode="MultiLine" Rows="10"  Height="80"></asp:TextBox>
                    </td>
                 
                </tr>
                <tr>
                   <td style="font-weight: bold;padding-top:5px;"  align="right">
                        <asp:Button ID="btnAnular" runat="server" Text="Anular" class="ui-button ui-widget
    ui-state-default ui-corner-all ui-button-text-only" Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
            </table>
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
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodProducto" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodMotivo" type="hidden" value="0" />
    <input id="hfCodTipoCliente" type="hidden" value="2" />
    <input id="hfCodDepartamento" type="hidden" value="0" />
    <input id="hfCodProvincia" type="hidden" value="0" />
    <input id="hfCodDistrito" type="hidden" value="0" />
    <input id="hfCodDireccion" type="hidden" value="0" />
    <input id="hfNroRuc" type="hidden" value="" />
    <input id="hfDistrito" type="hidden" value="" />
    <input id="hfDireccion" type="hidden" value="" />
    <input id="hfCliente" type="hidden" value="" />
    <input id="hfCodTipoDoc2" type="hidden" value="2" />
    <input id="hfCodDireccionDefecto" type="hidden" value="0" />
    <input id="hfMoneda" type="hidden" value="0" />
     <input id="hfCodEmpresa" type="hidden" value="0" />
     <input id="hfNumeroAnulacion" type="hidden" value="0" />
    <input id="hfClienteAnulacion" type="hidden" value="0" />
    <input id="hfCodDocumentoVentaAnulacion" type="hidden" value="0" />
    <input id="hfid" type="hidden" value="0" />
    <input id="hfCodTipoDoc_grilla" type="hidden" value="0" />
    <input id="hfurlapisunat" type="hidden" value="0" />
    <input id="hftokenapisunat" type="hidden" value="0" />

</asp:Content>
