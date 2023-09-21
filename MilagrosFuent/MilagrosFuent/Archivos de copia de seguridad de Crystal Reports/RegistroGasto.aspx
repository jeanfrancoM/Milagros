﻿<%@ Page Title="Gastos" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"   CodeBehind="RegistroGasto.aspx.cs" Inherits="SistemaInventario.Compras.RegistroGasto" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>  
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="RegistroGasto.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />       
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        Gastos</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    REGISTRO DE Gastos
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="550">
                        <tr>
                            <td style="font-weight: bold">
                                proveedor
                                <asp:HiddenField ID="hdnCodEmpresa" runat="server" />
                                <asp:HiddenField ID="hdnCodSede" runat="server" />
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtProveedor" runat="server" Width="350px" ForeColor="Blue" Font-Names="Arial"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:ImageButton ID="imgAddScop" runat="server" Style="display: none;" ImageUrl="~/Asset/images/add_small.png"
                                                ImageAlign="AbsMiddle" ToolTip="Agregar Proveedor" />
                                        </td>
                                        <td style="font-weight: bold">
                                            Serie
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtSerie" runat="server" Width="100" ForeColor="Blue" Font-Names="Arial"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNumero" runat="server" Width="100" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Igv
                                        </td>
                                        <td style="padding-left: 13px;">
                                            <div id="div_igv">
                                                <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    Width="60" ForeColor="Blue">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <asp:Label ID="Label1" runat="server" Text="T.C." Font-Bold="True"></asp:Label>
                                        </td>
                                        <td>
                                            <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Tipo doc
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_tipodocumento">
                                                <asp:DropDownList ID="ddlTipoDocumento" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    Width="160" ForeColor="Blue">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 86px; font-weight: bold">
                                            Emision
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp" ForeColor="Blue"
                                                Font-Names="Arial" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 5px; font-weight: bold">
                                            cond.
                                        </td>
                                        <td>
                                            <div id="div_formapago">
                                                <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    Width="103px" ForeColor="Blue">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 16px; font-weight: bold">
                                            vcto
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtVencimiento" runat="server" Width="55px" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            PERIODO
                                        </td>
                                        <td style="padding-left: 17px;">
                                            <asp:TextBox ID="txtPeriodo" runat="server" Width="38px" ForeColor="Blue" Font-Names="Arial"
                                                Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                clasificacion
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_clasificacion">
                                                <asp:DropDownList ID="ddlClasificacion" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    Width="160" ForeColor="Blue">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 84px; font-weight: bold">
                                            Moneda
                                        </td>
                                        <td>
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" Font-Bold="True"
                                                    ForeColor="Blue" Width="59">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 4px; font-weight: bold">
                                            SubTotal
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtSubTotal" runat="server" Width="70px" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 0px; font-weight: bold">
                                            Igv
                                        </td>
                                        <td style="padding-left: 16px;">
                                            <asp:TextBox ID="txtIgv" runat="server" Width="70px" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 4px; font-weight: bold">
                                            total
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtTotal" runat="server" Width="70px" Font-Names="Arial" Font-Bold="True"
                                                ForeColor="Blue" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Descuento
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtDsctoTotal" runat="server" Width="73px" Font-Names="Arial" Font-Bold="True"
                                                Text="0.00" CssClass="Derecha" ForeColor="Blue"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                codigos faltantes
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtCodigosFaltantes" runat="server" Width="750px" Font-Names="Arial"
                                                Font-Bold="True" ForeColor="Blue" TextMode="MultiLine" ReadOnly="true"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarFacturaExterno" runat="server" Text="Buscar Documento" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="160" />
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnEliminar" runat="server" Text="Eliminar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div id="divConsultaArticulo" style="display: none;">
                <div id='div1' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                    <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                        Criterio de busqueda
                    </div>
                    <div class="ui-jqdialog-content">
                        <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tbody>
                                <tr>
                                    <td style="padding-left: 5px; font-weight: bold">
                                        <asp:CheckBox ID="chkDescripcion" runat="server" Text="descripcion" Font-Bold="True" />
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtArticulo" runat="server" Width="650px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <asp:CheckBox runat="server" ID="chKConIgv" Text="Con Igv" onclick="F_ValidarCheckSinIgv(this.id);"
                                            Checked="True" Font-Bold="True" />
                                    </td>
                                    <td>
                                        <asp:CheckBox runat="server" ID="chkSinIgv" Text="Sin Igv" onclick="F_Prueba();"
                                            Font-Bold="True" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="linea-button">
                        <asp:Button ID="btnBuscarArticulo" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                        <asp:Button ID="btnAgregar" runat="server" Text="Agregar (F5)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </div>
                </div>
                
                <%--<div id="div_grvConsultaArticulo" style="padding-top: 5px;">
                    <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                        border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                        Width="980px">
                        <Columns>
                            <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheck(this.id);" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="CodigoProducto" HeaderText="Codigo">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:TemplateField HeaderText="Descripcion">
                                <ItemStyle HorizontalAlign="Left" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Descripcion") %>'></asp:Label>
                                   <asp:HiddenField ID="hfCodUnidadVenta" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                                    <asp:HiddenField ID="hfCosto" runat="server" Value='<%# Bind("Costo") %>' />
                                    <asp:HiddenField ID="hfCodProducto" runat="server" Value='<%# Bind("CodProducto") %>' />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="ADespacho">
                                <ItemStyle HorizontalAlign="Right" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblDespacho" Text='<%# Bind("ADespacho") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Pre-2" Visible="false">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblPrecio2" Text='<%# Bind("Precio2") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Pre-3" Visible="false">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblPrecio3" Text='<%# Bind("Precio3") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="Moneda" HeaderText="Mon." Visible="false">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:TemplateField HeaderText="UM">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblUM" Text='<%# Bind("UM") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Style="text-align: center;"
                                        onblur="F_ValidarStockGrilla();" Font-Names="Arial" ForeColor="Blue" Font-Bold="True"
                                        CssClass="ccsestilo" Enabled="False"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Precio Unit." ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="txtPrecioLibre" Width="80px" Style="text-align: center;"
                                        CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Font-Bold="True" onblur="F_ValidarImporteGrilla(this.id); return false;"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>--%>
                 <div id="div_grvConsultaArticulo" style="padding-top: 5px;">
            <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                Width="975px">
                <Columns>
                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheck(this.id);" />
                            <asp:HiddenField ID="hfCodProducto" runat="server" Value='<%# Bind("ID") %>' />
                            <asp:HiddenField ID="hfDescripcion" runat="server" Value='<%# Bind("Descripcion") %>' />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Codigo">
                        <ItemStyle Font-Bold="true" HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:HyperLink runat="server" ID="hlkCodigo" Font-Underline="true" ForeColor="Blue"
                                Style="cursor: hand" Text='<%# Bind("Codigo") %>' onclick="F_VerUltimoPrecio(this.id); return false;"
                                ToolTip="Ver Series">
                            </asp:HyperLink>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Descripcion">
                        <ItemStyle HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Descripcion") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Precio" Visible = "false">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioDolares" Text='<%# Bind("Precio") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Stock">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblDespacho" Text='<%# Bind("StockActual") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>   
                    
                    <asp:TemplateField HeaderText="Moleta">
                        <ItemStyle HorizontalAlign="Center"   BackColor="LightGreen" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblMoleta" Text='<%# Bind("Moleta") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                          
                    <asp:TemplateField HeaderText="UM">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblUM" Text='<%# Bind("UM") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Style="text-align: center;"
                                Font-Names="Arial" ForeColor="Blue" Font-Bold="True" Enabled="False" CssClass="ccsestilo"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center" >
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtPrecio" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarPrecioGrilla(this.id);"
                                CssClass="ccsestilo"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
            </div>
            <div style="text-align: center; width: 100%; color: Black; font-weight: bold">
                Cantidad de registros
                <asp:Label ID="lblNumRegistros" runat="server" Text="0"></asp:Label>
            </div>
            <div id="div_grvDetalleArticulo" style="padding-top: 5px;">
                <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="1013px">
                    <Columns>
                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="CodigoProducto" HeaderText="Codigo">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Producto">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtCantidad" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Cantidad") %>'
                                    onblur="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="UM" HeaderText="UM">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtPrecio" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    Font-Names="Arial" CssClass="ccsestilo" ForeColor="Blue" Text='<%# Bind("Precio") %>'
                                    onblur="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>
                      <asp:TemplateField HeaderText="Importe">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblImporte" Text='<%# Bind("Importe") %>' CssClass='csimp'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
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
                                <td>
                                    <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="70" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
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
                                <td>
                                    <asp:CheckBox ID="chkCliente" runat="server" Text="Proveedor" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtClienteConsulta" runat="server" Width="535" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
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
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1005px"
                    OnRowDataBound="grvConsulta_RowDataBound">
                    <Columns>
           <%--             <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="~/Asset/images/btnEdit.gif"
                                    ToolTip="Editar Registro" OnClientClick="F_EditarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>--%>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                    ToolTip="ELIMINAR GASTOS" OnClientClick="F_AnularRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>

                                <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgReemplazar" ImageUrl="~/Asset/images/Reemplazo.png"
                                    ToolTip="MODIFICAR DOCUMENTO" OnClientClick="F_ReemplazarDocumento(this); return false;" />
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

                        <asp:TemplateField>
                            <ItemTemplate>
                                <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                    title="Ver Detalle" />
                                <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                    <asp:GridView runat="server" ID="grvDetalle" border="0" CellPadding="0" CellSpacing="1"
                                        GridLines="None" class="GridView" />
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="ID">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblcodigo" Text='<%# Bind("Codigo") %>' CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hfID" runat="server" Value='<%# Bind("Codigo") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Numero">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblnumero" Text='<%# Bind("Numero") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Proveedor" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblcliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Emision" HeaderText="Emision">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Condicion" HeaderText="Condicion">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Vcto" HeaderText="Vcto">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Total" HeaderText="Total">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Saldo" HeaderText="Saldo">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TipoCambio" HeaderText="TC">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Estado" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Periodo" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblPeriodo" Text='<%# Bind("Periodo") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="div_Mantenimiento" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td colspan="2">
                        <asp:Button ID="btnGrabarEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 10px;" colspan='2'>
                        <table>
                            <tr>
                                <td style="font-weight: bold">
                                    Periodo
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPeriodoConsulta" runat="server" Width="75px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="true"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divSeleccionarEmpresa" style="display:none;">
        <asp:GridView ID="grvEmpresas" runat="server" AutoGenerateColumns="False" border="0"
            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="400px">
            <Columns>
                <asp:TemplateField HeaderText="Nombre">
                    <ItemTemplate>
                        <asp:Label ID="lblRazonSocial" runat="server" Text='<%# Bind("RazonSocial") %>' Font-Size="Medium"></asp:Label>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Left" Width="100px" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Sede">
                    <ItemTemplate>
                        <asp:DropDownList ID="ddlSede" runat="server">
                        </asp:DropDownList>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Center" Width="70px" />
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <asp:ImageButton ID="imgSelecEmpresa" runat="server" ImageUrl="~/Asset/images/ok.gif"
                            OnClientClick="F_ElegirEmpresa(this); return false;" ToolTip="Elegir" />
                        <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                    </ItemTemplate>
                    <ItemStyle Width="20px" />
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
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
    <input id="hfCodEmpresa" type="hidden" value="0" />
    <input id="hfCodAlmacen" type="hidden" value="0" />
       <input id="hfCodFacturaAnterior" type="hidden" value="0" />
</asp:Content>
