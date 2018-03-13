<%@ Page Language="VB" AutoEventWireup="false" Inherits="EngageWebLibrary.clsOnDemandEmail" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script language="javascript" type="text/javascript" src="./../../Global.js"></script>
    <script language="javascript" type="text/javascript" src="./../../TabFrames.js"></script>
    <script language="javascript" type="text/javascript" src="./../js/SharedFunctions.js"></script>
    <script language="javascript" type="text/javascript" src="./../js/OnDemandEmail.js"></script>
    <link href="./../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <style type="text/css">
        body
        {
            height: 100%;
            width: 100%;
            margin: 0px;
            background-color: #ffffff;
        }
    </style>
</head>
<body onload="OnLoad();">
    <form id="frmOnDemandEmail" runat="server" method="post" action="">
    <div style="width: 100%; height: 100%; background-color: #ffffff">
        <asp:ScriptManager ID="smOnDemandEmail" runat="server" />
        <telerik:RadWindowManager ID="OnDemandEmailAlerts" runat="server"></telerik:RadWindowManager>
        <telerik:RadToolBar ID="tbOnDemandEmail" Runat="server" style="display: none;" />
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        </script>
        <div id="divOnDemandEmail" runat="server"></div>
        <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal"
            style="clear: both; margin: 0px 0px 0px 20px;">
            <div class="rtbOuter">
                <div class="rtbMiddle">
                    <div class="rtbInner">
                        <ul class="rtbUL">
                            <li class="rtbItem">
                                <a id="lnkValidar" href="javascript:ValidateDataToSend();" style="width: 70px; text-align: center;" class="ovalbutton" name="lnkValidar"><span>Enviar</span></a>
                                <a id="lnkEnviar" runat="server" style="display: none;" name="lnkEnviar"></a>
                            </li>
                            <li class="rtbItem">
                                <a id="lnkClear" href="javascript:Clear();" style="width: 60px; text-align: center;" class="ovalbutton" name="lnkClear"><span>Limpiar</span> </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
