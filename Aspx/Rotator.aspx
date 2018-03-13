<%@ Page Language="VB" AutoEventWireup="false" Inherits="EngageWebLibrary.clsRotator" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script type="text/javascript" language="javascript" src="./../../Global.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/SharedFunctions.js"></script>
    <script language="javascript" type="text/javascript">
        function OnLoad() {
            window.setTimeout("__doPostBack('rttrRotator','');$get('divLoading').style.display='none';$get('divRotator').style.display='block';", 1000);
        }
    </script>
</head>
<body onload="OnLoad()">
    <form id="frmRotator" runat="server">
        <div style="width: 100%; height: 100%; background-color: #ffffff; position: absolute; top: 0px; right: 0px;">
            <asp:ScriptManager ID="smRotator" runat="server" />
            <telerik:RadWindowManager ID="RotatorAlerts" runat="server"></telerik:RadWindowManager>
            <script type="text/javascript" language="javascript">
                Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
            </script>
            <telerik:RadAjaxManager runat="server" ID="ramRotator">
                <AjaxSettings>
                    <telerik:AjaxSetting AjaxControlID="rttrRotator">
                        <UpdatedControls>
                            <telerik:AjaxUpdatedControl ControlID="rttrRotator" LoadingPanelID="ralpRotator" />
                        </UpdatedControls>
                    </telerik:AjaxSetting>
                </AjaxSettings>
            </telerik:RadAjaxManager>
            <telerik:RadAjaxLoadingPanel ID="ralpRotator" Transparency="20" BackColor="#E0E0E0" runat="server" EnableTheming="false" EnableViewState="false">
                <div class="LoadingImage"></div>
            </telerik:RadAjaxLoadingPanel>   
            <asp:SqlDataSource ID="dsRotator" runat="server" 
                ConnectionString="Data Source=STI-SVR-X64;Initial Catalog=ENGAGE_GM;Persist Security Info=True;User ID=ENGAGE_GM;Password=@SAENG@2008"
                ProviderName="System.Data.SqlClient" SelectCommand="SELECT USER_NAME, UNIT_CODE FROM AGENTE">
            </asp:SqlDataSource>
            <div id="divLoading" style="display: block; width: 100%; height: 100%; background-color: #ffffff; position: absolute; top: 0px; right: 0px;">
                <div class="LoadingImage"></div>
            </div>
            <div id="divRotator" style="display: none; width: 100%; height: 100%; background-color: #ffffff; position: absolute; top: 0px; right: 0px;">
                <telerik:RadRotator ID="rttrRotator" runat="server" DataSourceID="dsRotator" ScrollDirection="Left" ScrollDuration="1000" Width="700px" Height="120px" EnableViewState="false">
                    <ItemTemplate>
                        <div style="width: 350px; height: 120px; overflow: hidden;" >
                            <table>
                                <tr>
                                    <td rowspan="3">
                                        <asp:Image ID="user_image" runat="server" ImageAlign="left" AlternateText="user image" ImageUrl="~/App_Themes/Default/images/engagelogo.gif" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="user_name" runat="server"><%#DataBinder.Eval(Container.DataItem, "USER_NAME")%></asp:Label><br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="unit_code" runat="server"><%#DataBinder.Eval(Container.DataItem, "UNIT_CODE")%></asp:Label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </ItemTemplate>
                </telerik:RadRotator>
            </div>
        </div>
    </form>
</body>
</html>