<%@ Page Language="VB" AutoEventWireup="false" StylesheetTheme="" Theme="" EnableViewState="false" EnableTheming="false" Inherits="EngageWebLibrary.clsExportToExcel" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script type="text/javascript" language="javascript">
        function OnLoad() {
            var gridId = $get("hdnGridId").value;
            var exportObj = $get("hdnExportToExcel");
            exportObj.value = parent.$get(gridId).innerHTML;
            document.frmExportToExcel.submit();
        }
    </script>
</head>
<body onload="OnLoad();">
    <form id="frmExportToExcel" runat="server" method="post">
        <asp:ScriptManager ID="smExportToExcel" runat="server" />
        <asp:HiddenField ID="hdnGridId" runat="server" Value="" />
        <asp:HiddenField ID="hdnExportToExcel" runat="server" Value="" />
    </form>
</body>
</html>