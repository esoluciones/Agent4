<%@ Page Language="VB" AutoEventWireup="false" EnableEventValidation="false" Inherits="EngageWebLibrary.clsMailClient" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8 " />
    <title>Engage WebAgent</title>
    <script type="text/javascript" language="javascript" src="./../../Global.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/SharedFunctions.js"></script>
    <script type="text/javascript" language="javascript" src="./../js/MailClient.js"></script>
    <link href="../Css/MailClient.css" rel="stylesheet" type="text/css" />
    <link href="../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <style type="text/css">
        .RadToolBar .rtbInner {
            height: 24px;
        }
        .RadListBox .rlbList {
            width: 100%;
        }
        .RadListBox .rlbCheck {
            float: left;
        }
    </style>
</head>
<body onload="OnLoad();">
    <div>
        <form id='frmMailClient' runat='server'>
        <asp:ScriptManager ID="smMailClient" runat="server" />
        <telerik:RadWindowManager ID="wmMailClient" runat="server">
            <Windows>
                <telerik:RadWindow ID="wndMailsTo" runat="server" OpenerElementID="lnkMailTo" Height="400px" Width="500px" Modal="true" KeepInScreenBounds="true" Animation="None"
                 Behaviors="None" OnClientBeforeShow="openMailsTo" EnableEmbeddedSkins="True" DestroyOnClose="False" VisibleStatusbar="False" EnableViewState="False" Title="Selección de correos de destino">
                    <ContentTemplate>
                        <div id="divWndMailsTo" style="background-color: #DCDCDC; width: 100%; height: 100%; background-repeat: repeat-y; overflow-x: hidden; white-space: nowrap; overflow-y: auto">
                            <div style="margin-left: 10px; margin-top: 10px;">
                                <telerik:RadListBox RenderMode="Lightweight" ID="cmbMailTo" runat="server" CheckBoxes="true" ShowCheckAll="true" Width="465px" Height="300px">
                                    <ItemTemplate>
                                        <%#DataBinder.Eval(Container, "Text")%>
                                    </ItemTemplate>
                                    <Items />
                                </telerik:RadListBox>
                            </div>
                            <div runat="server" style="width: 100%; margin-left: 134px; margin-top: 10px;">
                                <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal">
                                    <div class="rtbOuter">
                                        <div class="rtbMiddle">
                                            <div class="rtbInner">
                                                <ul class="rtbUL">
                                                    <li class="rtbItem">
                                                        <a id="lnkSaveTo" runat="server" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:addMailsTo();">
                                                            <span>Agregar</span>
                                                        </a>
                                                    </li>
                                                    <li class="rtbItem">
                                                        <a id="lnkCloseTo" runat="server" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:closeMailsTo();">
                                                            <span>Cerrar</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentTemplate>
                </telerik:RadWindow>
                <telerik:RadWindow ID="wndMailsCC" runat="server" OpenerElementID="lnkMailCC" Height="400px" Width="500px" Modal="true" KeepInScreenBounds="true" Animation="None"
                 Behaviors="None" OnClientBeforeShow="openMailsCC" EnableEmbeddedSkins="True" DestroyOnClose="False" VisibleStatusbar="False" EnableViewState="False" Title="Selección de copias">
                    <ContentTemplate>
                        <div id="divWndMailsCC" style="background-color: #DCDCDC; height: 100%; background-repeat: repeat-y; white-space: nowrap; overflow-x: hidden; overflow-y: auto">
                            <div style="margin-left: 10px; margin-top: 10px;">
                                <telerik:RadListBox RenderMode="Lightweight" ID="cmbCCTo" runat="server" CheckBoxes="true" ShowCheckAll="true" Width="465px" Height="300px">
                                    <ItemTemplate>
                                        <%#DataBinder.Eval(Container, "Text")%>
                                    </ItemTemplate>
                                    <Items />
                                </telerik:RadListBox>
                            </div>
                            <div runat="server" style="width: 100%; margin-left: 134px; margin-top: 10px;">
                                <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal">
                                    <div class="rtbOuter">
                                        <div class="rtbMiddle">
                                            <div class="rtbInner">
                                                <ul class="rtbUL">
                                                    <li class="rtbItem">
                                                        <a id="lnkSaveCC" runat="server" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:addMailsCC();">
                                                            <span>Agregar</span>
                                                        </a>
                                                    </li>
                                                    <li class="rtbItem">
                                                        <a id="lnkCloseCC" runat="server" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:closeMailsCC();">
                                                            <span>Cerrar</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentTemplate>
                </telerik:RadWindow>
                <telerik:RadWindow ID="wndAttachments" Runat="server" OpenerElementID="lnkAttach" Height="400px" Width="800px" Modal="True" KeepInScreenBounds="True"  Animation="None"
                 NavigateUrl="" Behaviors="None" EnableEmbeddedSkins="True" DestroyOnClose="False" VisibleStatusbar="False" EnableViewState="False">
                </telerik:RadWindow>
            </Windows>
        </telerik:RadWindowManager>
        <telerik:RadToolBar ID="tbMailClient" Runat="server" style="display: none;" />
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        </script>
        <telerik:RadAjaxManager runat="server" ID="ramMailClient">
            <AjaxSettings>
                <telerik:AjaxSetting AjaxControlID="lnkSend">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="lnkSend" />
                        <telerik:AjaxUpdatedControl ControlID="divMailClient" LoadingPanelID="ralpMailClient" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
            </AjaxSettings>
        </telerik:RadAjaxManager>
        <telerik:RadAjaxLoadingPanel ID="ralpMailClient" Transparency="20" BackColor="#E0E0E0" runat="server" EnableTheming="false" EnableViewState="false">
            <div class="LoadingImage"></div>
        </telerik:RadAjaxLoadingPanel>
        <asp:HiddenField ID="hdnCustomerKey" runat="server" />
        <asp:HiddenField ID="hdnProcessKey" runat="server" />
        <asp:HiddenField ID="hdnAttPkey" runat="server" />
        <asp:HiddenField ID="hdnEmailInDataKey" runat="server" />
        <asp:HiddenField ID="hdnAttachments" runat="server" />
        <asp:HiddenField ID="hdnCallbackFunction" runat="server" />
        <div id="divMailClient" runat="server" style="position: absolute; top: 0px; left: 0px; height: 100%; width: 100%;">
            <telerik:RadSplitter ID="splitterMailClient" runat="server" ResizeMode="AdjacentPane" Orientation="Horizontal" Enabled="True" 
                ResizeWithBrowserWindow="true" ResizeWithParentPane="false" EnableEmbeddedSkins="false" EnableViewState="false" VisibleDuringInit="false" 
                Width="100%" Height="100%" OnClientLoad="OnMailMessageSplitterLoad">
                <telerik:RadPane ID="paneCommands" runat="server" Height="29px" MinHeight="29" EnableViewState="false" Scrolling="None">
                    <div runat="server" id="divCommands" style="text-align: left;">
                        <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal">
                            <div class="rtbOuter">
                                <div class="rtbMiddle">
                                    <div class="rtbInner">
                                        <ul class="rtbUL">
                                            <li class="rtbItem">
                                                <a id="lnkSend" runat="server" style="width: 90px; text-align: center;" class="ovalbutton">
                                                    <span>Enviar</span>
                                                </a>
                                            </li>
                                            <li class="rtbItem">
                                                <a id="lnkDiscard" runat="server" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:Discard();">
                                                    <span>Descartar</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </telerik:RadPane>
                <telerik:RadPane ID="paneMailComponents" runat="server" Height="160px" MinHeight="160" MinWidth="800" EnableViewState="false" Scrolling="None" Collapsed="false">
                    <div class="FilterMenu" style="height: 100%; width: 100%; min-width: 800px; padding-top: 2px; left: 0px;">
                        <div class="busquedaclass" align="left" style="width: 100%; padding-left: 5px;">
                            <div class="FilterElement">
                                <a id="lnkFrom" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:return true;">
                                    <span>De :</span>
                                </a>
                                <telerik:RadTextBox ID="txtMailFrom" runat="server" EnableEmbeddedSkins="false" Width="500px" CssClass="riTextBox_bs" EnableViewState="False" Enabled="false" />
                            </div>
                            <div class="FilterElement">
                                <a id="lnkMailTo" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:return true;">
                                    <span>Para :</span>
                                </a>
                                <telerik:RadTextBox ID="txtMailTo" runat="server" EnableEmbeddedSkins="false" Width="500px" CssClass="riTextBox_bs" EnableViewState="False" />
                            </div>
                            <div class="FilterElement">
                                <a id="lnkMailCC" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:return true;">
                                    <span>CC :</span>
                                </a>
                                <telerik:RadTextBox ID="txtMailCC" runat="server" EnableEmbeddedSkins="false" Width="500px" CssClass="riTextBox_bs" EnableViewState="False" />
                            </div>
                            <div class="FilterElement">
                                <a id="lknSubject" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:return true;">
                                    <span>Asunto :</span>
                                </a>
                                <telerik:RadTextBox ID="txtSubject" runat="server" EnableEmbeddedSkins="false" Width="500px" CssClass="riTextBox_bs" EnableViewState="False" />
                            </div>
                            <div class="FilterElement">
                                <a id="lnkAttach" style="width: 90px; text-align: center;" class="ovalbutton" href="javascript:return true;">
                                    <span>Adjuntos :</span>
                                </a>
                                <telerik:RadTextBox ID="txtAttachmentsList" runat="server" EnableEmbeddedSkins="false" Width="500px" CssClass="riTextBox_bs" EnableViewState="False" Enabled="false" />
                            </div>
                        </div>
                    </div>
                </telerik:RadPane>
                <telerik:RadPane ID="paneMailMessage" runat="server" Height="100%" MinHeight="100" EnableViewState="false" Scrolling="None" OnClientResized="OnMailMessagePaneResized">
                    <telerik:RadEditor runat="server" ID="rdeMailMessage" Height="100%" Width="100%" EditModes="Design" EnableViewState="False" StripFormattingOptions="All" OnClientLoad="OnMailMessageEditorLoad">
                        <Content></Content>
                    </telerik:RadEditor>
                </telerik:RadPane>
                <telerik:RadSplitBar CollapseMode="Forward" ID="splitbarMailMessage" runat="server" EnableResize="true" EnableViewState="false" Visible="false"/>
                <telerik:RadPane ID="paneMailConversation" runat="server" Height="150px" MinHeight="100" EnableViewState="false" Visible="false">
                    <div id="txtMailConversation" contenteditable="false" runat="server" style="width: 100%; height: 100%;"/>
                </telerik:RadPane>
            </telerik:RadSplitter>
        </div>
        </form>
    </div>
</body>
</html>
