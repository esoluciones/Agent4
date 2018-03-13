<%@ Page Language="VB" AutoEventWireup="false" EnableEventValidation="false" Inherits="EngageWebLibrary.clsSql" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script type="text/javascript" language="javascript" src="../../Global.js"></script>
    <script type="text/javascript" language="javascript" src="../js/SharedFunctions.js"></script>
    <script type="text/javascript" language="javascript" src="../js/Sql.js"></script>
    <link href="../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <link rel="stylesheet" href="./../css/Sql.css" type="text/css"/>
</head>
<body style="background-color:#ffffff;" onload="OnLoad();">
    <form id='pantalla' name='pantalla' runat='server'>
        <asp:ScriptManager ID="smSql" runat="server" />
        <telerik:RadWindowManager ID="SqlAlerts" runat="server"></telerik:RadWindowManager>
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        </script>
        <telerik:RadAjaxManager runat="server" ID="ramSql">
            <AjaxSettings>
                <telerik:AjaxSetting AjaxControlID="lnkPostBack">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="lnkPostBack" />
                        <telerik:AjaxUpdatedControl ControlID="hdnPageTitle" />
                        <telerik:AjaxUpdatedControl ControlID="hdnMetadataPkey" />
                        <telerik:AjaxUpdatedControl ControlID="hdnParentPkey" />
                        <telerik:AjaxUpdatedControl ControlID="hdnCustPkey" />
                        <telerik:AjaxUpdatedControl ControlID="hdnProcessPkey" />
                        <telerik:AjaxUpdatedControl ControlID="divSql" LoadingPanelID="ralpSql" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
            </AjaxSettings>
        </telerik:RadAjaxManager>
        <telerik:RadAjaxLoadingPanel ID="ralpSql" Transparency="20" BackColor="#E0E0E0" runat="server" EnableTheming="False" EnableViewState="False">
            <div class="LoadingImage"></div>
        </telerik:RadAjaxLoadingPanel>
        <asp:HiddenField runat="server" id="hdnIsFirstAjaxPostBack" Value="" />
        <asp:HiddenField runat="server" id="hdnPageTitle" Value="" />
        <asp:HiddenField runat="server" id="hdnMetadataPkey" Value="" />
        <asp:HiddenField runat="server" id="hdnParentPkey" Value="" />
        <asp:HiddenField runat="server" id="hdnCustPkey" Value="" />
        <asp:HiddenField runat="server" id="hdnProcessPkey" Value="" />
        <asp:HiddenField runat="server" id="hdnUnidad" Value="" />
        <asp:HiddenField runat="server" id="hdnAgente" Value="" />
        <asp:HiddenField runat="server" id="hdnQue" Value="" />
        <asp:HiddenField runat="server" id="hdnKey" Value="" />
        <asp:HiddenField runat="server" id="hdnTodoJobKey" Value="" />
        <asp:HiddenField runat="server" id="hdnAttKey" Value="" />
        <asp:HiddenField runat="server" id="hdnCustPrimaryId" Value="" />
        <asp:HiddenField runat="server" id="hdnCustCode" Value="" />
        <asp:HiddenField runat="server" id="hdnPhyKey" Value="" />
        <asp:HiddenField runat="server" id="hdnPhyStepKey" Value="" />
        <asp:HiddenField runat="server" id="hdnLastStep" Value="" />
        <asp:HiddenField runat="server" id="hdnLastCnv" Value="" />
        <asp:HiddenField runat="server" id="hdnEntidadKey" Value="" />
        <a id="lnkPostBack" runat="server" style="display: none;"></a>
        <div id="divSql" runat="server" style="position: absolute; overflow: hidden; top: 0px; left: 0px; height: 100%; width: 100%;"></div>
    </form>
</body>
</html>
