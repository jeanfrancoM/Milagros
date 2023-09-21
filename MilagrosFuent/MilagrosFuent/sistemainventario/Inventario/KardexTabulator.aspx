<%@ Page Title="KardexTabulator" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="KardexTabulator.aspx.cs" Inherits="SistemaInventario.Compras.KardexTabulator" %>
  
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="KardexTabulator.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"  type="text/css" />      
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>


     <script src="../Asset/fontawesome-free-6.2.1/js/fontawesome.js" type="text/javascript"></script>
    <script src="../Asset/fontawesome-free-6.2.1/js/regular.js" type="text/javascript"></script>
    <script src="../Asset/fontawesome-free-6.2.1/js/solid.js" type="text/javascript"></script>
    <link href="../Asset/tabulator-master/dist/css/tabulator.min.css" rel="stylesheet"
        type="text/css" />

         <script src="../Asset/tabulator-master/dist/js/tabulator.js" type="text/javascript"></script>
    <script src="../Asset/tabulator-master/dist/others/sheetjs.js" type="text/javascript"></script>
    <script src="../Asset/tabulator-master/dist/others/jspdf.js" type="text/javascript"></script>
    <script src="../Asset/tabulator-master/dist/others/jspdf-autotable.js" type="text/javascript"></script>
    <link href="../Asset/css/divResponsive.css" rel="stylesheet" type="text/css" />
    <script src="../Componentes/TabulatorComponent.js" type="text/javascript"></script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 1000px">
        Kardex</div>
    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 1000px">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
            style="width: 1000px">
            Criterio de busqueda
        </div>
     

    </div>

   


    <div id="div_tabulatorContainer1" class="row" style="margin-top: 10px; 
        background-color: #edf2ff;">
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
  
</asp:Content>
