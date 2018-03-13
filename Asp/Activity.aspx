<%@ OutputCache Location="None" NoStore="true" %>
<%@ Page Language="VB" AutoEventWireup="false" EnableEventValidation="false" Inherits="EngageWebLibrary.clsActivity" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script type="text/javascript" language="javascript" src="./../../Global.js"></script>
    <script type="text/javascript" language="javascript" src="./../../TabFrames.js"></script>
	<script type="text/javascript" language="javascript" src="./../js/SharedFunctions.js"></script>
	<script type="text/javascript" language="javascript" src="./../js/Activity.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/Buttons.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/HtmlGrids.js"></script>
	<script type="text/javascript" language="javascript" src="./../js/Cancel.js"></script>
	<script type="text/javascript" language="javascript" src="./../js/CloseActivity.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/GoogleMaps.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/flotr2.min.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/Graph.js"></script>
    <!-- script type="text/javascript" language="javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script -->
    <link rel="stylesheet" href="./../css/HtmlGrid.css" type="text/css"/>
	<link rel="stylesheet" href="./../css/Cancel.css" type="text/css"/>
	<link rel="stylesheet" href="./../css/CloseActivity.css" type="text/css"/>
</head>
<body style="background-color:#ffffff;" onload="OnLoad();">
    <form id='pantalla' name='pantalla' runat='server'>
        <asp:ScriptManager ID="smActivity" runat="server" />
        <telerik:RadWindowManager id="ActivityAlerts" runat="server"></telerik:RadWindowManager>
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndActivityHandler);
        </script>
        <telerik:RadAjaxManager runat="server" ID="ramActivity">
            <ClientEvents OnRequestStart="AjaxRequestStart" />
            <AjaxSettings>
                <telerik:AjaxSetting AjaxControlID="lnkPostBack">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="lnkPostBack" />
                        <telerik:AjaxUpdatedControl ControlID="hdnButtonPostingEnabled" />
                        <telerik:AjaxUpdatedControl ControlID="divActivity" LoadingPanelID="ralpActivity" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
            </AjaxSettings>
        </telerik:RadAjaxManager>
        <telerik:RadAjaxLoadingPanel ID="ralpActivity" IsSticky="true" style="position:absolute;left:0px;top:0px;margin:0px;padding:0px;height:100%;width:100%;z-index:99999;" Transparency="20" BackColor="#E0E0E0" runat="server" EnableTheming="False" EnableViewState="False">
            <div class="LoadingImage"></div>
        </telerik:RadAjaxLoadingPanel>
        <asp:HiddenField runat="server" id="hdnCaller" Value="" />
        <asp:HiddenField runat="server" id="hdnIsFirstAjaxPostBack" Value="" />
        <asp:HiddenField runat="server" id="hdnButtonPostingEnabled" Value="" />
        <a id="lnkPostBack" runat="server" style="display: none;"></a>
        <div id="divActivity" runat="server" style="position: absolute; top: 0px; left: 0px; height: 100%; width: 100%;"></div>
    </form>
    <iframe id="iframeSaveDocument" width="0" height="0" frameborder="0"></iframe>
    <iframe width="174" height="189" name="gToday:Calendar:AgendaCalendario.js" id="gToday:Calendar:AgendaCalendario.js" 
        src="./../html/ipopengClear.htm" scrolling="no" frameborder="0" 
        style="visibility: visible; z-index: 9999; position: absolute; left: -500px; top: 0px;" />
</body>
</html>