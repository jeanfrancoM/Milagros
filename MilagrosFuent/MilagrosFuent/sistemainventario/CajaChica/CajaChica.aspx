<%@ Page Title="Cierre Caja" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"  CodeBehind="CajaChica.aspx.cs" Inherits="SistemaInventario.CajaChica.CajaChica" %>
  
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript" charset="UTF-8"></script>
    <script type="text/javascript" language="javascript" src="CajaChica.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"  type="text/css" />      
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server" >
    <div class='overlay' >
        <div class="titulo">
            CIERRE CAJA</div>
        <div id="divTabs">
            <ul>
                <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
              <%--  <li id="liLiquidacion"><a href="#tabLiquidacion" onclick="getContentTab2();">Liquidacion</a></li>--%>
            </ul>
            <div id="tabRegistro" style="width: 510px">
                <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                    <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                        REGISTRO</div>
                    <div id="divConsultaArticulo">
                        <div class="ui-jqdialog-content">
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                                  <tr style="display:none;">
                            <td style="font-weight: bold">
                                Empresa
                            </td>
                       
                                        <td>
                                            <div id="div_Empresa">
                                                <asp:DropDownList ID="ddlEmpresa" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="250" >
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                   
                            
                           
                        </tr>
                            <tr>
                                    <td style="font-weight: bold">
                                        Caja
                                    </td>
                                         <td>
                                            <div id="div_CajaFisica">
                                                <asp:DropDownList ID="ddlCajaFisica" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="115">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                </tr>
                                   <tr>
                                    <td style="font-weight: bold;">
                                        Usuario
                                    </td>
                                         <td>
                                            <div id="div_Usuario">
                                                <asp:DropDownList ID="ddlUsuario" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="115">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold">
                                        Fecha
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDesde" runat="server" Width="55px" Font-Names="Arial" CssClass="Jq-ui-dtp"
                                            ReadOnly="true" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>

                                      <tr style="display: none;" >
                                    <td style="font-weight: bold">
                                        Fecha Saldo
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFechaSaldo" runat="server" Width="55px" Font-Names="Arial" CssClass="Jq-ui-dtp"
                                            ReadOnly="true" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                                 
                               
                            </table>
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                                 <tr >
                                        <td style="font-weight: bold">
                                           Observacion
                                        </td>
                                   
                                    </tr>
                                    <tr>
                                     <td>
                                        <asp:TextBox ID="txtObservacion" runat="server" Width="380px" Height="100px" Font-Names="Arial" 
                                            ReadOnly="true" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan='2' style="font-weight: bold">
                                       PARA VER LA CAJA EN EL TRANSCURSO DEL DIA DAR CLICK A VISTA PRELIMINAR
                                    </td>
                              
                                </tr>

                                <tr>
                                   <td colspan='2' style="font-weight: bold">
                                       LA GENERACION DE LA CAJA DEBE SER AL FINALIZAR EL DIA
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="linea-button">
                            <asp:Button ID="btnGenerarCaja" runat="server" Text="VISTA PRELIMINAR" Font-Names="Arial"
                                        Width="200px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" />                                
                            <asp:Button ID="btnReGenerarCaja" runat="server" Text="GENERAR CAJA" Font-Names="Arial"
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                Width="200px" />
                            <asp:Button ID="btnReporteDetalle" runat="server" Text="REPORTE DETALLE" Font-Names="Arial"
                                Style="display: none;" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                Width="200px" />
                            <asp:Button ID="btnReporteResumido" runat="server" Text="REPORTE RESUMIDO" Font-Names="Arial"
                                Style="display: none;" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                Width="200px" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="tabConsulta">
                <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                    <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                        Criterio de busqueda
                    </div>
                    <div class="ui-jqdialog-content">
                        <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tbody>
                                <tr>
                                <td style="font-weight: bold">
                                EMPRESA
                                </td>
                                 <td >
                                    <div id="div_EmpresaConsulta">
                                        <asp:DropDownList ID="ddlEmpresaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="200" Enabled="False">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                   <td>
                                        <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                    </td>
                                                                   <td>
                                        <asp:TextBox ID="txtFechaDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </td>
                               
                                    <td>
                                        <asp:TextBox ID="txtFechaHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold">
                                     SUCURSAL
                                    </td>
                                                                    <td>
                                       <div id="div_Sucursal">
                                                <asp:DropDownList ID="ddlSucursal" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="120">
                                                </asp:DropDownList>
                                            </div>
                                </td>
                                  <td style="font-weight: bold">
                                     DOC.
                                    </td>
                                <td>
                                       <div id="div_Doc">
                                                <asp:DropDownList ID="ddlDocumento" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="45">
                                                    <asp:ListItem Value="0" Selected>Todos</asp:ListItem>
                                        <asp:ListItem Value="1" >F</asp:ListItem>
                                        <asp:ListItem Value="2">NV</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                </td>
                                 <td style="font-weight: bold">
                                     Caja
                                    </td>
                                                                    <td>
                                       <div id="div_CajaFisicaConsulta">
                                                <asp:DropDownList ID="ddlCajaFisicaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="120">
                                                </asp:DropDownList>
                                            </div>
                                </td>
                                  <td style="font-weight: bold">
                                        Reporte
                                    </td>
                                    <td>
                                      <div id="div_Reporte">
                                         <asp:DropDownList runat="server" ID="ddlReporte" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" CssClass="ccsestilo">
                                <asp:ListItem Value="0">TODO</asp:ListItem>
                                <asp:ListItem Value="2">CREDITO</asp:ListItem>
                                <asp:ListItem Value="3">DEPOSITO</asp:ListItem>
                                <asp:ListItem Value="1">EFECTIVO</asp:ListItem>
                                <asp:ListItem Value="10">TARJETA</asp:ListItem>
                                <asp:ListItem Value="5">FACTURA</asp:ListItem>
                                <asp:ListItem Value="6">NOTA VENTA</asp:ListItem>
                            </asp:DropDownList>
                                </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="linea-button">
                   <%-- <asp:Button ID="btnPDF" runat="server" Text="Grupal" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120"/>--%>
                    <%--<asp:Button ID="btnLiquidacion" runat="server" Text="Liquidacion" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />--%>
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
                        CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1013px"
                        OnRowDataBound="grvConsulta_RowDataBound">
                        <Columns>
                         <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                         <HeaderTemplate>
                                                                <asp:CheckBox ID="checkAll" runat="server" onclick="checkAll(this);" />
                                                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkLiquidacion" CssClass="chkDelete" Text="" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                                        <ItemTemplate>
                                            <asp:ImageButton runat="server" ID="imgEliminar" ImageUrl="~/Asset/images/EliminarBtn.png"
                                                ToolTip="ELIMINAR CAJA" OnClientClick="F_Eliminar(this); return false;" />
                                        </ItemTemplate>
                                    </asp:TemplateField>

                            <asp:TemplateField ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgAbrir" ImageUrl="~/Asset/images/refresh-icon.png"
                                        ToolTip="ABRIR CAJA" OnClientClick="F_Abrir(this); return false;" Width="16px" Height="16px" />
                                </ItemTemplate>
                            </asp:TemplateField>

                            <asp:TemplateField ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgCerrar" ImageUrl="~/Asset/images/ok.gif" ToolTip="CERRAR CAJA"
                                        OnClientClick="F_Cerrar(this); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgImprimirExcel" ImageUrl="~/Asset/images/excel.gif" ToolTip="VISUALIZAR Excel"
                                        OnClientClick="F_ReporteIndividual_excel(712, this,0); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField> 
                            <asp:TemplateField ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgImprimirIndividual" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                        OnClientClick="F_ReporteIndividual(701, this,0); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>     
                   <%--            <asp:TemplateField HeaderText="C" ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgImprimirIndividualCredito" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                        OnClientClick="F_ReporteIndividual(701, this,2); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField >     
                               <asp:TemplateField HeaderText="D" ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgImprimirIndividualDeposito" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                        OnClientClick="F_ReporteIndividual(701, this,3); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>   
                              <asp:TemplateField HeaderText="E" ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgImprimirIndividualEfectivo" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                        OnClientClick="F_ReporteIndividual(701, this,1); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>       
                             <asp:TemplateField HeaderText="">
                                 <ItemTemplate>
                                     <asp:ImageButton runat="server" ID="imgPdf" ImageUrl="~/Asset/images/imprimir.gif"
                                         ToolTip="IMPRIMIR CAJA" OnClientClick="F_Imprimir(this); return false;" />
                                 </ItemTemplate>
                             </asp:TemplateField> --%>    
                               <asp:BoundField DataField="Empresa" HeaderText="EMP">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>     
                            <asp:TemplateField HeaderText="Desde">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblFecha" Text='<%# Bind("Fecha") %>' CssClass="detallesart"></asp:Label>
                                    <asp:HiddenField ID="hfCodEstado" runat="server" Value='<%# Bind("CodEstado") %>' />
                                    <asp:HiddenField ID="hfCodUsuario" runat="server" Value='<%# Bind("CodUsuario") %>' />
                                    <asp:HiddenField ID="hfCodCajaFisica" runat="server" Value='<%# Bind("CodCajaFisica") %>' />
                                    <asp:HiddenField ID="lblCodigo" runat="server" Value='<%# Bind("CodCajaChica") %>' />
                                    <asp:HiddenField ID="hfCodAlmacen" runat="server" Value='<%# Bind("CodAlmacen") %>' />
                                </ItemTemplate>
                            </asp:TemplateField>
                              <asp:TemplateField HeaderText="Hasta">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblFechaSaldo" Text='<%# Bind("FechaSaldo") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                             <asp:BoundField DataField="Caja" HeaderText="Caja">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Usuario" HeaderText="Usuario">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Sede" HeaderText="Sede">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>          
                            <asp:BoundField DataField="Estado" HeaderText="Estado">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>
                            <asp:BoundField DataField="UsuarioLiquidacion" HeaderText="Usuario Cierre">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:BoundField DataField="FechaLiquidacion" HeaderText="Fecha Cierre">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>
                        </Columns>
                    </asp:GridView>
                </div>
            </div>
            <div id="tabLiquidacion" style="display: none;" >
                <div id='DivLiquidacionConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                    <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                        Criterio de busqueda
                    </div>
                    <div class="ui-jqdialog-content">
                        <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tbody>
                                <tr>
                                <td style="font-weight: bold">
                                EMPRESA
                                </td>
                                 <td>
                                    <div id="div_EmpresaLiquidacion">
                                        <asp:DropDownList ID="dllEmpresaLiquidacion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="200" Enabled="False">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                   <td>
                                        <asp:CheckBox ID="chkRangoLiquidacion" runat="server" Text="Fecha" Font-Bold="True" />
                                    </td>
                                    <td style="padding-left: 5px; font-weight: bold">
                                        Desde
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFechaDesdeLiquidacion" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <td style="padding-left: 5px; font-weight: bold">
                                        Hasta
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFechaHastaLiquidacion" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <%--<td style="font-weight: bold">
                                     SUCURSAL
                                    </td>
                                                                    <td>
                                       <div id="div4">
                                                <asp:DropDownList ID="DropDownList2" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="120">
                                                </asp:DropDownList>
                                            </div>
                                </td>--%>
                                 <td style="font-weight: bold">
                                     Caja
                                    </td>
                                                                    <td>
                                       <div id="div_CajaFisicaLiquidacion">
                                                <asp:DropDownList ID="ddlCajaFisicaLiquidacion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="120">
                                                </asp:DropDownList>
                                            </div>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="linea-button">
                    
                        <asp:Button ID="btnBuscarLiquidacion" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
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
                                            <label id="CantidadRegistroLiquidacion"></label>
                                        </td>                                
                                    </tr>
                                </table>
            </div>
                <div id="div_LiquidacionConsulta" style="padding-top: 5px;">
                    <asp:GridView ID="grvLiquidacionConsulta" runat="server" AutoGenerateColumns="False" border="0"
                        CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1013px"
                        OnRowDataBound="grvLiquidacionConsulta_RowDataBound">
                        <Columns>
                                     <asp:TemplateField>
                                        <ItemTemplate>
                                            <asp:ImageButton runat="server" ID="imgEliminar" ImageUrl="~/Asset/images/EliminarBtn.png"
                                                ToolTip="ELIMINAR CAJA" OnClientClick="F_EliminarLiquidacion(this); return false;" />
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
                                    <asp:TemplateField HeaderText="C">
                                        <ItemTemplate>
                                            <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                                title="Ver Detalle" />
                                            <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                                <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                                    AutoGenerateColumns="False" GridLines="None" class="GridView">
                                                    <Columns>
                                                  <asp:TemplateField HeaderText="ID" ItemStyle-Width="50px">
                                                    <ItemStyle HorizontalAlign="Center" />
                                                    <ItemTemplate>
                                                        <asp:Label runat="server" ID="lblCodCajaChica" Text='<%# Bind("CodCajaChica") %>' ></asp:Label>
                                                       
                                                    </ItemTemplate>
                                                    </asp:TemplateField>
                                                        <asp:BoundField DataField="FECHA" HeaderText="FECHA">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="center" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="CAJA" HeaderText="CAJA">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Left" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="TOTALSOLES" HeaderText="TOTALSOLES">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Right" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="TOTALDOLARES" HeaderText="TOTALDOLARES">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Right" />
                                                        </asp:BoundField>
                                                        
                                                    </Columns>
                                                </asp:GridView>
                                            </asp:Panel>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="D">
                                        <ItemTemplate>
                                            <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_ClickLiquidacion(this);"
                                                title="Ver Detalle" />
                                            <asp:Panel ID="pnlOrdersliquidacion" runat="server" Style="display: none">
                                                <asp:GridView ID="grvDetalleliquidacion" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                                    AutoGenerateColumns="False" GridLines="None" class="GridView">
                                                    <Columns>
                                                    
                                                        <asp:BoundField DataField="FECHA" HeaderText="FECHA">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="center" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="RazonSocial" HeaderText="RazonSocial">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Left" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="Documento" HeaderText="Documento">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Left" />
                                                        </asp:BoundField>
                                                        <asp:BoundField DataField="SolesAplicado" HeaderText="Soles">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Right" />
                                                        </asp:BoundField>
                                                            <asp:BoundField DataField="DolaresAplicado" HeaderText="Dolares">
                                                            <HeaderStyle HorizontalAlign="Center" />
                                                            <ItemStyle HorizontalAlign="Right" />
                                                        </asp:BoundField>
                                                    </Columns>
                                                </asp:GridView>
                                            </asp:Panel>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                         <asp:TemplateField ItemStyle-Width="20px">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgImprimirIndividualLiquidacion" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                        OnClientClick="F_ReporteIndividualLiquidacion(711, this,0);return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>  
                            <asp:TemplateField HeaderText="Liquidacion" ItemStyle-Width="50px">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblFecha" Text='<%# Bind("Fecha") %>' CssClass="detallesart"></asp:Label>
                                    <asp:HiddenField ID="lblCodigo" runat="server" Value='<%# Bind("CodLiquidacionCajaCab") %>' />
                                    <asp:HiddenField ID="hfDetalleCargado" runat="server" Value='0' />
                                    <asp:HiddenField ID="hfDetalleCargadoObservacion" runat="server" Value='0' />
                                    <%--<asp:HiddenField ID="hfCodUsuario" runat="server" Value='<%# Bind("CodUsuario") %>' />
                                    <asp:HiddenField ID="hfCodCajaFisica" runat="server" Value='<%# Bind("CodCajaFisica") %>' />
                                    <asp:HiddenField ID="lblCodigo" runat="server" Value='<%# Bind("CodCajaChica") %>' />
                                    <asp:HiddenField ID="hfCodAlmacen" runat="server" Value='<%# Bind("CodAlmacen") %>' />--%>
                                </ItemTemplate>
                            </asp:TemplateField>
                             <asp:BoundField DataField="SOLES" HeaderText="SOLES">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Right" />
                            </asp:BoundField>
                           
                            <asp:BoundField DataField="CUENTASOLES" HeaderText="CUENTA SOLES">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>
                            <asp:BoundField DataField="NROSOLES" HeaderText="NRO OP SOLES">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="RIGHT" />
                            </asp:BoundField> 
                             <asp:BoundField DataField="DOLARES" HeaderText="DOLARES">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Right" />
                            </asp:BoundField>        
                            <asp:BoundField DataField="CUENTADOLARES" HeaderText="CUENTA DOLARES">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>
                            
                            <asp:BoundField DataField="NRODOLARES" HeaderText="NRO OP DOLARES">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="RIGHT" />
                            </asp:BoundField>
                            <asp:BoundField DataField="RESPONSABLE" HeaderText="RESPONSABLE">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>                 
                        </Columns>
                    </asp:GridView>
                </div>
            </div>
        </div>
    </div>
     <div id="divLiquidacion" style="display: none;">
         <div class="ui-jqdialog-content">
                
      
            <table cellpadding="0" cellspacing="0">
            <tr>
            <td>
            <div id="div_Liquidacion">
                     <asp:GridView ID="grvLiquidacion" runat="server" AutoGenerateColumns="False"
                                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                Width="655">
                                <Columns>
                                    
                                    <asp:TemplateField>
                                                <ItemStyle Font-Bold="true" />
                                                <ItemTemplate>
                                                    <asp:ImageButton runat="server" ID="imgAgregar" ImageUrl="~/Asset/images/ok.gif"
                                                        ToolTip="Agregar" OnClientClick="F_AplicarSoles(this.id,1); return false;" />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Fecha">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblFecha" Text='<%# Bind("Fecha") %>'  CssClass="detallesart"></asp:Label>
                                            <asp:HiddenField ID="hfCodCajaChica" runat="server" Value='<%# Bind("CodCajaChica") %>' />
                                            <asp:HiddenField ID="hfEFECTIVOSOLES" runat="server" Value='<%# Bind("EFECTIVOSOLES") %>' />
                                            <asp:HiddenField ID="hfEFECTIVODolares" runat="server" Value='<%# Bind("EFECTIVODOLARES") %>' />
                                            <asp:HiddenField ID="lblCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                                            <asp:HiddenField ID="hfFlagcantidadcajasliquidadas" runat="server" Value='<%# Bind("Flagcantidadcajasliquidadas") %>' />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="CAJA">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblCAJA" Text='<%# Bind("CAJA") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="CAJA SOLES">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEFECTIVOSOLES" Text='<%# Bind("SolesCaja") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="CAJA DOLARES">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEFECTIVODOLARES" Text='<%# Bind("DolaresCaja") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="SALDO SOLES">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblSaldoSoles" Text='<%# Bind("SaldoSoles") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                     <asp:TemplateField HeaderText="SALDO DOLARES">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblSaldoDolares" Text='<%# Bind("SaldoDolares") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                     <asp:TemplateField HeaderText="APLICAR S/.">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtTotalSoles" Width="75px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo tprecio" Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("SaldoSoles") %>'
                                                    onblur="F_ActualizarTotalSoles(this.id); return false;" ReadOnly=true></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                     <asp:TemplateField HeaderText="APLICAR $">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtTotalDolares" Width="75px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo tprecio" Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("SaldoDolares") %>'
                                                     onblur="F_ActualizarTotalDolares(this.id); return false;" ReadOnly=true></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                </Columns>
                            </asp:GridView>
            </div>
            </td>
            </tr>

            <tr>
            <td>
            <table cellpadding="0" cellspacing="0">

            <tr>
            
            <td style="font-weight: bold; padding-top: 5px;">
                        Fecha Liq.
                    </td>
                    <td>
                    <table cellpadding="0" cellspacing="0">
                    <tr>
                       <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="TxtLiquidacionSoles" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Responsable
                    </td>
                      <td style="padding-left: 5px; padding-top: 5px;">
                    <div id="div_Responsable">
                                        <asp:DropDownList ID="ddl_responsable" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="435"  >
                                        </asp:DropDownList>
                                    </div>
                    </td>
                    </tr>
                 
                    </table>
                    </td>
            </tr>
                    
                    <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        OBSERVACION
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtObservacionLiquidacion" runat="server" Width="570px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                    </tr>
                    </table>
            </td>
            </tr>
                <tr>
                  <td style="font-weight: bold; padding-top: 5px;">
                      <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 650px">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                Soles</div>
                                <div>
             <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold;">
                        Moneda
                    </td>
                    <td style="padding-left: 5px;">
                    <div id="div_monedasoles">
                                        <asp:DropDownList ID="ddlMonedaSoles" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="90"  Enabled="False">
                                        </asp:DropDownList>
                                    </div>
                    </td>
                    <td style="font-weight: bold; padding-left: 5px;">
                        Banco
                    </td>
                    <td style="padding-left: 5px;">
                      <div id="div_BancoSoles">
                                                            <asp:DropDownList ID="ddlBancoSoles" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="130px">
                                                            </asp:DropDownList>
                                                        </div>

                    </td>
                    <td style="font-weight: bold; ">
                        Cuenta
                    </td>
                    <td style="padding-left: 5px;">
                       <div id="div_CuentaSoles">
                                                            <asp:DropDownList ID="ddlCuentaSoles" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="150px">
                                                            </asp:DropDownList>
                                                        </div>
                    </td>
                 </tr>
                  <tr>
                    <td style="font-weight: bold; ">
                        Nro Operacion
                    </td>
                    <td style="padding-left: 5px; ">
                        <asp:TextBox ID="txtNroSoles" runat="server" Width="147px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="font-weight: bold; padding-left: 5px;">
                        Monto
                    </td>
                    <td style="padding-left: 5px; ">
                        <asp:TextBox ID="txtMontoSoles" runat="server" Width="70px" Font-Names="Arial"
                           CssClass="Derecha" ForeColor="Blue" Font-Bold="True" Enabled="False"></asp:TextBox>
                    </td>
                </tr>
                </table>
                </div>
                      </div>
                   </td>
                </tr>

                <tr>
                   <td style="padding-top: 5px;">
                       <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 650px;">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                Dolares</div>
                                <div>
             <table cellpadding="0" cellspacing="0"  class="form-inputs">
                <tr>

                    <td style="font-weight: bold;padding-left: 5px;">
                        Moneda
                    </td>
                    <td style="padding-left: 5px;">
                    <div id="div_monedadolares">
                                        <asp:DropDownList ID="ddlMonedaDolares" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="90"  Enabled="False">
                                        </asp:DropDownList>
                                    </div>
                    </td>
                    <td style="font-weight: bold;padding-left: 5px;">
                        Banco
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                      <div id="div_bancoDolares">
                                                            <asp:DropDownList ID="ddlBancoDolares" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="130px">
                                                            </asp:DropDownList>
                                                        </div>

                    </td>
                    <td style="font-weight: bold;padding-left: 5px;">
                        Cuenta
                    </td>
                    <td style="padding-left: 5px;">
                       <div id="div_cuentadolares">
                                                            <asp:DropDownList ID="ddlCuentaDolares" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="150px">
                                                            </asp:DropDownList>
                                                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;padding-left: 5px;">
                        Nro Operacion
                    </td>
                    <td style="padding-left: 5px;">
                        <asp:TextBox ID="txtnopDolares" runat="server" Width="147px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="font-weight: bold;padding-left: 5px;">
                        Monto
                    </td>
                    <td style="padding-left: 5px;">
                        <asp:TextBox ID="txtMontoDolares" runat="server" Width="70px" Font-Names="Arial"
                          CssClass="Derecha"  ForeColor="Blue" Font-Bold="True" Enabled="False"></asp:TextBox>
                    </td>
                </tr>
                  <tr>
                    <td align="right" style="padding-top: 10px;" colspan="2">
                    
                    </td>
                </tr>
                </table>
                </div>
                 <div class="linea-button">
                        <asp:Button ID="btnGrabar" runat="server" Text="GRABAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </div>
                        </div>
                        
                 </td>  
                </tr>
                   
             
                 
              
             </table>
        </div>
           <div>
   
                </div>
    </div>

    <div id="div_DetalleLiquidacion" style="display: none;">
          
            <div id="div_tab3" style="width: 1050px;">
              <div class="linea-button" >
                
                               
                                <asp:CheckBox runat="server" ID="chkNotaVenta" Text="Solo Facturas" onclick="F_ValidarDocumentoFomarles(this.id);"
                                                            Font-Bold="True" />


                             <asp:Label runat="server" style="font-size: medium; color: #000000" ID="Label1" Text='S/. '></asp:Label>
                                <asp:Label runat="server" ID="lblSoles" Text=' ' style="font-size: medium; color: #000000"></asp:Label>
                           <asp:Label runat="server" style="font-size: medium; color: #000000" ID="Label3" Text='US$ '></asp:Label>
                                <asp:Label runat="server" ID="lblDolares" Text='' style="font-size: medium; color: #000000"></asp:Label>
                          
                        <asp:Button ID="btnAplicar" runat="server" Text="GRABAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                  
                    </div >
            <div id="tabLiquidacionDetalle">
                <div id="div_grvDetalleLiquidacion" style="padding-top: 5px;">
                    <asp:GridView ID="grvDetalleLiquidacion" runat="server" AutoGenerateColumns="False"
                        border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                        Width="1050px">
                        <Columns>
                           
                             <asp:TemplateField HeaderText="Emision">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'  CssClass="detallesart"></asp:Label>
                                            <asp:HiddenField ID="hfCodCajaChicaDocumento" runat="server" Value='<%# Bind("CodCajaChicaDocumento") %>' />
                                            <asp:HiddenField ID="hfCajaSoles" runat="server" Value='<%# Bind("Caja_Soles") %>' />
                                            <asp:HiddenField ID="hfCajaDolares" runat="server" Value='<%# Bind("Caja_Dolares") %>' />
                                            <asp:HiddenField ID="hfSolesAplicado" runat="server" Value='<%# Bind("SolesAplicado") %>' />
                                            <asp:HiddenField ID="hfDolaresAplicado" runat="server" Value='<%# Bind("DolaresAplicado") %>' />
                                            <asp:HiddenField ID="hfSaldoSoles" runat="server" Value='<%# Bind("SaldoSoles") %>' />
                                            <asp:HiddenField ID="hfSaldoDolares" runat="server" Value='<%# Bind("SaldoDolares") %>' />
                                            <asp:HiddenField ID="hfCodCajaChica" runat="server" Value='<%# Bind("CodCajaChica") %>' />
                                            <asp:HiddenField ID="hfcoddetalle" runat="server" Value='<%# Bind("coddetalle") %>' />
                                            <asp:HiddenField ID="hfcodtipodoc" runat="server" Value='<%# Bind("Codtipodoc") %>' />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                            <asp:BoundField DataField="RazonSocial" HeaderText="Razon Social">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Documento" HeaderText="TD">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                         
                            <asp:BoundField DataField="Caja_Soles" HeaderText="Caja S/.">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Right" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Caja_Dolares" HeaderText="Caja US$">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Right" />
                            </asp:BoundField>
                             <asp:TemplateField HeaderText="SALDO S/.">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblSaldoSolesDetallado" Text='<%# Bind("SaldoSoles") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                     <asp:TemplateField HeaderText="SALDO US$">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblSaldoDolaresDetallado" Text='<%# Bind("SaldoDolares") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                             <asp:TemplateField HeaderText="APLICAR S/.">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtTotalSoles" Width="75px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo tprecio" Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("SolesAplicado") %>'
                                                    onblur="F_ActualizarDetalladoSoles(this.id); return false;"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                     <asp:TemplateField HeaderText="APLICAR US$">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtTotalDolares" Width="75px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo tprecio" Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("DolaresAplicado") %>'
                                                     onblur="F_ActualizarDetalladoDolares(this.id); return false;"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
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
     <input id="hfCodAdministrador" type="hidden" value="0" />
     <input id="hfCodUsuario" type="hidden" value="0" />
     <input id="hfPermisoApertura" type="hidden" value="0" />
     <input id="hfCodAlmacen" type="hidden" value="0" />
      <input id="hfCodEmpresa" type="hidden" value="0" />
      <input id="hfTotalSoles" type="hidden" value="0" />
      <input id="hfTotalDolares" type="hidden" value="0" />
      <input id="hfDetalleLiquidacion" type="hidden" value="0" />
      <input id="hfcantidadcajasliquidar" type="hidden" value="0" />
</asp:Content>
